---
eleventyNavigation:
  key: Object Detection
  parent: AI
meta:
  title: Object Detection
  description: The Object Detection node identifies and locates objects within images using ONNX models such as YOLO and DETR, enabling real-time computer vision directly in Node-RED without external AI services.
---

# {{ meta.title }}

The **Object Detection** node enables detection of objects within images using **ONNX models**.
It supports a wide range of architectures, including **DETR** and **YOLO**, and accepts image data in multiple formats such as Buffers, base64 strings, or tensors.

This node is ideal for computer vision use cases like identifying objects in images, counting items, or performing scene analysis directly within **Node-RED**.

## Inputs

### General

- **Property:** `input`
- **Type:** `object`, `buffer`, `string` or tensor.
- **Description:** The input image or tensor to classify. See the *Details* section for supported formats.

### Model Selection

- **model:** Path to a local ONNX model file or the name of a model to download from Hugging Face.
- **type:** Data type for the model when using a model name. Supported values include `q8` (default), `fp16`, `fp32`, `int8`, and others.

> **Note:**
> When a model name is provided, the node automatically downloads and caches it locally if it is not already available.

### Configuration

- **threshold:** Minimum confidence score (0.0–1.0) required for a prediction to be included in the output.
  This can also be passed dynamically via `msg.threshold`.

## Outputs

- **payload:** Contains the detection results.
  Depending on the model type and processing support, the output can be an array or an object.

## Details

### Supported Input Formats

The node supports multiple input formats depending on the model’s requirements:

- **Buffer** — Binary image data, typically from a file or camera input.
- **Base64 string** — Base64-encoded image data.
- **Jimp Image Object** — An image object (e.g, output from `node-red-contrib-image-tools`).
- **Tensor** — A pre-processed tensor object in the following format:

  ```json
  {
    "data": [0.0, 0.1, 0.2, ...],
    "type": "float32",
    "dim": [1, 3, 224, 224]
  }
  ```

> TIP: If the model supports batching, the input can be an array of images in one of the supported formats.

### Model Selection

The `model` property defines which ONNX model to use. You can either:

- Provide a **local path** (for example, `/data/models/yolov5.onnx`), or
- Specify a **model name** available on **[Hugging Face](https://huggingface.co/models?pipeline_tag=object-detection&library=transformers.js,onnx&sort=trending)** (for example, [Xenova/detr-resnet-50](https://huggingface.co/Xenova/detr-resnet-50)).

When a model name is provided, it is automatically fetched and cached locally for reuse.

#### Model Type Options

- `auto` — Automatically selects the most suitable type.
- `fp32` — Standard 32-bit floating-point model.
- `fp16` — Half-precision 16-bit floating-point model.
- `int8` — 8-bit integer quantized model.
- `uint8` — 8-bit unsigned integer model.
- `q8` — Quantized Int8 model (default).
- `q4` — Quantized Int4 model.
- `q4f16` — Quantized Int4 with Float16 model.
- `bnb4` — BNB4 quantized model.

### Output Format

#### When Supported (YOLO/DETR Models)

If the model output is recognized by the node, `msg.payload` contains structured detection results:

```json
[
  {
    "label": "dog",
    "score": 0.9796,
    "bbox": [130, 218, 309, 538]
  },
  {
    "label": "person",
    "score": 0.9451,
    "bbox": [420, 110, 640, 520]
  }
]
```

Each object includes:

- **label:** Detected class name (for example, dog, person, car)
- **score:** Confidence score for the detection
- **bbox:** Bounding box coordinates `[x_min, y_min, x_max, y_max]`

#### When Not Supported (Raw Output)

If the node cannot interpret the model output automatically, it returns the raw response:

```json
{
  "result": [...],
  "labels": {
    "0": "person",
    "1": "bicycle",
    "2": "car"
  }
}
```

You can then use a **Function** node for custom post-processing.

## Notes

- The node currently supports **DETR** and **YOLO**-style object detection models.
- YOLO models currently accept **only single-image input** (batching support will be added in future releases).
- Ensure that your model is compatible with **ONNX Runtime** and designed for **object detection** tasks.
- For improved performance on devices with limited resources, use **quantized models** such as `q8`.

## Example Flow

{% renderFlow %}
[{"id":"6a3ca8414acfad34","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":610,"y":1180,"wires":[["f4998c6a9004a6ba"]]},{"id":"f4998c6a9004a6ba","type":"change","z":"e1ceeedf31ce1ebd","name":"","rules":[{"t":"set","p":"image","pt":"msg","to":"payload","tot":"msg","dc":true}],"action":"","property":"","from":"","to":"","reg":false,"x":620,"y":1240,"wires":[["d902ee154cb6ceac"]]},{"id":"b1a008f95453208e","type":"inject","z":"e1ceeedf31ce1ebd","name":"people on bikes","props":[{"p":"url","v":"https://learnopencv.com/wp-content/uploads/2021/04/vehicle-traffic-object-detection-test-image.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":380,"y":1240,"wires":[["47d587d70bac373c"]]},{"id":"8d18b7c3c2197981","type":"inject","z":"e1ceeedf31ce1ebd","name":"dog bike truck","props":[{"p":"url","v":"https://djl.ai/examples/src/test/resources/dog_bike_car.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":370,"y":1200,"wires":[["47d587d70bac373c"]]},{"id":"86693a849586867a","type":"inject","z":"e1ceeedf31ce1ebd","name":"desk","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Schreibtisch.2.JPG/450px-Schreibtisch.2.JPG","vt":"str"},{"p":"threshold","v":"0.85","vt":"num"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":350,"y":1160,"wires":[["47d587d70bac373c"]]},{"id":"9113dce8475110f5","type":"object-detection","z":"e1ceeedf31ce1ebd","name":"","property":"image","propertyType":"msg","model":"Xenova/detr-resnet-50","modelType":"name","dtype":"fp16","threshold":"threshold","thresholdType":"msg","x":590,"y":1300,"wires":[["2ccb4544d3d5188d"]]},{"id":"2ccb4544d3d5188d","type":"change","z":"e1ceeedf31ce1ebd","name":"","rules":[{"t":"set","p":"result","pt":"msg","to":"payload","tot":"msg"},{"t":"set","p":"payload","pt":"msg","to":"image","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":800,"y":1300,"wires":[["385ba9c93695c86b"]]},{"id":"a2ef9dc6bf6007e2","type":"debug","z":"e1ceeedf31ce1ebd","name":"debug 15","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"result","targetType":"msg","statusVal":"","statusType":"auto","x":1100,"y":1360,"wires":[]},{"id":"385ba9c93695c86b","type":"function","z":"e1ceeedf31ce1ebd","name":"Pascal VOC to COCO bbox","func":"const annotations = msg.result.slice(0,20)\n// convert Pascal VOC Format bbox to coco format\nconst bboxes = []\nfor (const annotation of annotations) {\n    const [ xmin, ymin, xmax, ymax ] = annotation.bbox\n    const width = xmax - xmin\n    const height = ymax - ymin\n    const percent = annotation.score * 100\n    bboxes.push({\n        label: `${annotation.label} (${percent.toFixed(1)}%)`,\n        bbox: [xmin, ymin, width, height]\n    })\n}\nmsg.annotations = bboxes\nreturn msg\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1040,"y":1300,"wires":[["da4063f9d3a2548b"]]},{"id":"da0ae2dfd2df248f","type":"inject","z":"e1ceeedf31ce1ebd","name":"football","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg/500px-Football_in_Bloomington%2C_Indiana%2C_1995.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":350,"y":1120,"wires":[["47d587d70bac373c"]]},{"id":"f23ba6823adaab87","type":"comment","z":"e1ceeedf31ce1ebd","name":"Object Detection","info":"","x":360,"y":1080,"wires":[]},{"id":"d902ee154cb6ceac","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"240","data":"image","dataType":"msg","active":true,"x":350,"y":1300,"wires":[["9113dce8475110f5"]]},{"id":"d75c7f464cca14c1","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"720","data":"payload","dataType":"msg","active":true,"x":830,"y":1360,"wires":[["a2ef9dc6bf6007e2"]]},{"id":"da4063f9d3a2548b","type":"annotate-image","z":"e1ceeedf31ce1ebd","name":"","fill":"","stroke":"#ffA000","lineWidth":"3","fontSize":24,"fontColor":"#ffA000","x":660,"y":1360,"wires":[["d75c7f464cca14c1"]]},{"id":"47d587d70bac373c","type":"junction","z":"e1ceeedf31ce1ebd","x":500,"y":1180,"wires":[["6a3ca8414acfad34"]]},{"id":"8ee41c61e110e410","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-ai-nodes":"0.1.6","node-red-contrib-image-tools":"2.1.1","node-red-node-annotate-image":"0.2.0"}}]
{% endrenderFlow %}
