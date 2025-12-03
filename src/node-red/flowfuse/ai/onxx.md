---
eleventyNavigation:
  key: ONXX
  parent: AI
meta:
  title: ONXX
  description: The ONNX node allows you to perform AI inference directly in Node-RED using ONNX models, supporting image, object, and numeric predictions without external AI services. 
---

# {{ meta.title }}

The **ONNX** node allows you to perform AI inference directly in **Node-RED** using **ONNX models**.
It can run a wide range of pre-trained or custom models, including image classification, object detection, and numeric prediction tasks.

**ONNX (Open Neural Network Exchange)** is an open standard for representing machine learning models.
With this node, you can load an ONNX model and run predictions locally or on the edge without requiring a separate AI service.

## Inputs

### General

- **Property:** `input`
- **Type:** object, buffer, or tensor
- **Description:** The input data to process. It can be an image, array, or tensor. See the **Input Formats** section below for supported structures.

### Model Selection

- **Property:** `model`
- **Type:** string
- **Description:** Path to the ONNX model file. It can be a direct file path (for example, `/data/models/model.onnx`) or an environment variable (for example, `${MODEL_PATH}`).

## Outputs

- **Property:** `payload`
- **Type:** object or array
- **Description:** Contains the model’s output after inference. Depending on the model, this may include predictions, probabilities, or other structured results.

## Input Formats

The input format depends on what your ONNX model expects.
You can check the model’s input names, types, and shapes by clicking the **Model Info** button in the node configuration panel.

### 1. Tensor Format

Use this format when the model expects a single tensor input.

```json
{
  "data": [0.0, 0.1, 0.2, ...],
  "type": "float32",
  "dim": [1, 3, 224, 224]
}
```

- **data:** Flat array of numerical values (for example, pixel data).
- **type:** Data type of the tensor (for example, `float32`, `int8`).
- **dim:** Tensor dimensions in `[batch_size, channels, height, width]` format.

### 2. Array of Tensors

Used when the model expects multiple input tensors.

```json
[
  {
    "data": [0.0, 0.1, ...],
    "type": "float32",
    "dim": [1, 3, 224, 224]
  },
  {
    "data": [0, 1, 2, ...],
    "type": "int8",
    "dim": [1, 10]
  }
]
```

### 3. Named Tensor Properties

Used when the model defines multiple named input tensors.

```json
{
  "input_1": {
    "data": [0.0, 0.1, 0.2, ...],
    "type": "float32",
    "dim": [1, 3, 224, 224]
  },
  "input_2": {
    "data": [0.0, 0.1, 0.2, ...],
    "type": "float32",
    "dim": [1, 10]
  }
}
```

### 4. Array-like Input

If the model expects a single flat array, you can provide it directly:

```json
[0.0, 0.1, 0.2, ...]
```

For batch inputs, use an array of arrays:

```json
[
  [0.0, 0.1, 0.2, ...],
  [0.0, 0.1, 0.2, ...]
]
```

## Configuration

- The model must be in the **ONNX (.onnx)** format.
- Ensure your input format matches the model’s expected input definition.
- Use the **Model Info** button in the configuration panel to inspect model input and output specifications before wiring it into your flow.
- The result of the inference is available in `msg.payload` for further processing or visualization.

## Example Flow

{% renderFlow %}
[{"id":"239b5347fce92ca9","type":"function","z":"e1ceeedf31ce1ebd","name":"load labels","func":"// flag to let the node know we are handling preprocessing\nmsg.noPreprocessorConfig = true\n\nmsg.config = {\n    label2id : {\n        \"apple\": 0,\n        \"kiwi\": 1,\n        \"mango\": 2\n    },\n    id2label : {\n        \"0\": \"apple\",\n        \"1\": \"kiwi\",\n        \"2\": \"mango\"\n    }\n}\nreturn msg\n\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":810,"y":5860,"wires":[["117470780ea20643"]]},{"id":"117470780ea20643","type":"function","z":"e1ceeedf31ce1ebd","name":"preprocessing","func":"// ImageNet normalization values\nconst IMG_MEAN = [0.485, 0.456, 0.406]\nconst IMG_STD = [0.229, 0.224, 0.225]\n\n// The width and height expected by the model\nconst WIDTH = 224\nconst HEIGHT = 224\n\n/**\n * Load and preprocess image for PyTorch ONNX model\n * @param {Buffer} buffer - an image\n * @returns {Promise<Float32Array>} - Tensor ready for ort.run\n */\nasync function preprocessImage(buffer) {\n    // Load and resize image\n    const resolved = await sharp(buffer)\n        .resize(WIDTH, HEIGHT)\n        .raw()\n        .toBuffer({ resolveWithObject: true });\n\n    const { data, info } = resolved; // data = Uint8Array, info = {width, height, channels}\n    const { width, height, channels } = info;\n\n    if (channels !== 3) {\n        throw new Error(`Expected 3 channels (RGB), got ${channels}`);\n    }\n\n    // Convert to float32 and normalize\n    const floatData = new Float32Array(width * height * channels);\n    for (let i = 0; i < width * height; i++) {\n        for (let c = 0; c < 3; c++) {\n            // data is 0..255, convert to 0..1\n            const v = data[i * 3 + c] / 255.0;\n            floatData[c * width * height + i] = (v - IMG_MEAN[c]) / IMG_STD[c];\n            // Notice: channel-first layout (C,H,W)\n        }\n    }\n\n    return floatData;\n}\n\nmsg.payload = {\n    type: 'float32',\n    dims: [1, 3, HEIGHT, WIDTH], // 1 image, 3 chanels, HEIGHT, WIDTH\n    data: await preprocessImage(msg.payload)\n}\n// msg.payload = await preprocessImage(msg.payload)\nreturn msg\n\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[{"var":"sharp","module":"sharp"}],"x":1020,"y":5860,"wires":[["36477656b418b6f7"]]},{"id":"36477656b418b6f7","type":"advanced-ai","z":"e1ceeedf31ce1ebd","name":"fruit_classifier","property":"payload","propertyType":"msg","model":"C:/Users/sdmcl/repos/node-red/model_cache/flowfuse/fruit_classifier/onnx/model.onnx","modelType":"path","x":900,"y":5920,"wires":[["aa2b68b2ca30ee34"]]},{"id":"aa2b68b2ca30ee34","type":"function","z":"e1ceeedf31ce1ebd","name":"Sort and Label","func":"/*\nData arrives like so:\nmsg.payload.output.cpuData: {\"0\":1.7446770668029785, 1: -2.4252512454986572, 2: 2.786302089691162}\n*/\nconst cpuData = msg.payload.output.cpuData\nconst labels = []\nconst ids = Object.keys(msg.config.id2label).forEach(id => {\n    labels.push(msg.config.id2label[id])\n})\n\n// Convert cpuData to logits array\nconst logits = Object.values(cpuData)\n\n// Softmax function\nfunction softmax(arr) {\n    const exp = arr.map(x => Math.exp(x))\n    const sum = exp.reduce((a, b) => a + b, 0)\n    return exp.map(x => x / sum)\n}\n\nconst probs = softmax(logits)\n\n// Build sorted array of results with labels and probabilities\nconst resultArray = probs\n    .map((prob, idx) => ({\n        classIndex: idx,\n        className: labels[idx] || 'Unknown',\n        confidence: prob\n    }))\n    .filter(item => item.confidence > 0)\n    .sort((a, b) => b.confidence - a.confidence)\n\nmsg.payload = resultArray\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1080,"y":5920,"wires":[["f3b605669eb8b00b"]]},{"id":"f3b605669eb8b00b","type":"debug","z":"e1ceeedf31ce1ebd","name":"","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload[0].className & \" (\" & $round(payload[0].confidence * 100, 2) & \"%)\"","statusType":"jsonata","x":1070,"y":5980,"wires":[]},{"id":"114028180bd0659b","type":"inject","z":"e1ceeedf31ce1ebd","name":"apple","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/1200px-Honeycrisp-Apple.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":5800,"wires":[["bc8648c963842493"]]},{"id":"709d0cacee000fde","type":"inject","z":"e1ceeedf31ce1ebd","name":"apple","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Fuji_apple.jpg/1200px-Fuji_apple.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":5840,"wires":[["bc8648c963842493"]]},{"id":"bc8648c963842493","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":630,"y":5800,"wires":[["e6c4bc36b25440e5"]]},{"id":"38ce06ccd2500c74","type":"inject","z":"e1ceeedf31ce1ebd","name":"kiwi","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kiwi_%28Actinidia_chinensis%29_2_Luc_Viatour.jpg/250px-Kiwi_%28Actinidia_chinensis%29_2_Luc_Viatour.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":5880,"wires":[["bc8648c963842493"]]},{"id":"8c2a2e98a21f319b","type":"inject","z":"e1ceeedf31ce1ebd","name":"mango","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/500px-Mangos_-_single_and_halved.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":5920,"wires":[["bc8648c963842493"]]},{"id":"e6c4bc36b25440e5","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"224","data":"payload","dataType":"msg","active":true,"x":610,"y":5860,"wires":[["239b5347fce92ca9"]]},{"id":"5711f41ecfe998d6","type":"comment","z":"e1ceeedf31ce1ebd","name":"Using a re-trained resnet model trained to recognise apples, kiwis and mangos \\n See info in the INFO panel on the sidebar","info":"This Node-RED demo flow requires you to have trained a model to recognize fruit types (apple, kiwi, mango) using a labeled image dataset.\n\nThe process involves:\n1. Setting up your Python environment with PyTorch, TorchVision, ONNX, and ONNX Runtime.\n1. Organizing your dataset into train, validation, and test folders for each class.\n1. Using transfer learning with a pre-trained ResNet18 model, fine-tuned on your images.\n1. Training the model and evaluating its accuracy.\n1. Exporting the trained PyTorch model to ONNX format for interoperability.\n1. Optionally, testing the ONNX model with ONNX Runtime to verify predictions.\n\nOnce you have the exported ONNX model (e.g., fruit_classifier.onnx), you can use it with this demo flow for inference.","x":630,"y":5740,"wires":[]},{"id":"dcc5015a105e33bb","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-ai-nodes":"0.1.6","node-red-contrib-image-tools":"2.1.1"}}]
{% endrenderFlow %}