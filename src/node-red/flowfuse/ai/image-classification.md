---
eleventyNavigation:
  key: Image Classification
  parent: AI
meta:
  title: Image Classification
  description: Classify images using ONNX models directly in Node-RED. Supports pre-trained and custom models for tasks like labeling, content moderation, and object recognition.
---

# {{ meta.title }}

The **Image Classification** node enables you to classify images using **ONNX models** directly within **Node-RED**.
It supports both **pre-trained** and **custom** models, allowing you to identify objects, detect scenes, or categorize images without requiring an external AI service.

This node is ideal for computer vision tasks such as **image labeling**, **content moderation**, or **feature recognition** at the edge.

## Inputs

### General

- **Property:** `input`
- **Type:** `object`, `buffer`, `string` or tensor. 
- **Description:** The input image or tensor to classify. See the **Details** section for supported input formats.

### Model Selection

- **model:** Path to a local ONNX model file or the name of a model to download from **Hugging Face**.
- **type:** Data type used when loading the model (only applicable when using a model name). Supported types include `q8` (default, quantized Int8), `fp16` (Float16), `fp32` (Float32), and others.

> **Note:**
> When a model name is provided, the node automatically downloads and caches it locally if it is not already available.

### Configuration

- **topK:** The number of top predictions to return. This can be set manually or passed dynamically via a message property.
- **threshold:** Minimum confidence score (0.0–1.0) required for predictions to be included in the output. Predictions below this score are filtered out. This value can also be provided dynamically through a message property.

## Outputs

- **Property:** `payload`
- **Type:** object or array
- **Description:** Contains the classification results returned by the model. The structure of the output depends on the model used.

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

The **model** property defines which ONNX model to use. You can either:

- Provide a **local path** (for example, `/data/models/resnet50.onnx`), or
- Specify a **model name** available on **[Hugging Face](https://huggingface.co/models?pipeline_tag=image-classification&library=transformers.js,onnx&sort=trending)** (for example, [MobileNet-v3-Large](https://huggingface.co/qualcomm/MobileNet-v3-Large)).

When a model name is used, the node automatically downloads and caches it locally for reuse.

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

### Configuration Options

- **topK:** Defines how many top predictions to return in the output. Use this to limit results to the most relevant classes.
- **threshold:** Filters predictions by their confidence score. Only predictions above the threshold are included.

## Example Output

```json
[
  {
    "label": "golden retriever",
    "score": 0.9812
  },
  {
    "label": "labrador retriever",
    "score": 0.0143
  },
  {
    "label": "cocker spaniel",
    "score": 0.0021
  }
]
```

Each object in the output array includes:

- **label:** The predicted class name.
- **score:** The confidence score for that prediction.

## Notes

- The node supports any **ONNX-compatible image classification model**, such as **ResNet**, **MobileNet**, or **Vision Transformer (ViT)**.
- Quantized models (`q8`, `int8`) are recommended for **edge deployments** due to improved performance and lower memory usage.
- Ensure that your ONNX model is trained for **image classification** and compatible with **ONNX Runtime**.
- When using a Hugging Face model name, ensure network connectivity during the first run so that the model can be downloaded and cached locally.

## Example Flow

{% renderFlow 400 %}
[{"id":"80afcb4f0920c6ce","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":670,"y":3160,"wires":[["cef35d49d8f7e529"]]},{"id":"cef35d49d8f7e529","type":"change","z":"e1ceeedf31ce1ebd","name":"topK 3, thres: 5%","rules":[{"t":"move","p":"payload","pt":"msg","to":"image","tot":"msg"},{"t":"set","p":"topK","pt":"msg","to":"3","tot":"num"},{"t":"set","p":"thres","pt":"msg","to":"0.05","tot":"num"}],"action":"","property":"","from":"","to":"","reg":false,"x":850,"y":3160,"wires":[["d76d57912ca9fd3f"]]},{"id":"d76d57912ca9fd3f","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"224","data":"image","dataType":"msg","active":true,"x":1010,"y":3160,"wires":[["903b8d0c4750e324"]]},{"id":"fb880704ba86d144","type":"debug","z":"e1ceeedf31ce1ebd","name":"class","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload[0].label & \"(\" & $round(payload[0].score * 100,2)  & \"%)\"","statusType":"jsonata","x":870,"y":3220,"wires":[]},{"id":"a8e34856bea9f3cd","type":"image-classification","z":"e1ceeedf31ce1ebd","name":"","property":"images","propertyType":"msg","model":"onnx-community/resnet-50-ONNX","modelType":"name","dtype":"fp16","topK":"1","topKType":"num","threshold":"0.1","thresholdType":"num","x":1080,"y":3800,"wires":[["7bd09a7daa0d5dae","0b07230327b5689c"]]},{"id":"903b8d0c4750e324","type":"image-classification","z":"e1ceeedf31ce1ebd","name":"","property":"image","propertyType":"msg","model":"Xenova/vit-base-patch16-224","modelType":"name","dtype":"q8","topK":"topK","topKType":"msg","threshold":"thres","thresholdType":"msg","x":700,"y":3220,"wires":[["fb880704ba86d144"]]},{"id":"e21197eababa2618","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"images[0]","width":"224","data":"images[0]","dataType":"msg","active":true,"x":660,"y":3800,"wires":[["d2b756bb0a700a0e"]]},{"id":"d2b756bb0a700a0e","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"images[1]","width":"224","data":"images[1]","dataType":"msg","active":true,"x":860,"y":3800,"wires":[["a8e34856bea9f3cd"]]},{"id":"b5768dffc25bf899","type":"inject","z":"e1ceeedf31ce1ebd","name":"beer","props":[{"p":"url","v":"https://stoelzle-lausitz.com/cdn/shop/files/stoelzle-lausitz-bierglaeser-glass-mug-full-beer-foam.png","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":450,"y":3200,"wires":[["49f8de9173d09a2f"]]},{"id":"0ff2faa6328f5e8c","type":"inject","z":"e1ceeedf31ce1ebd","name":"wolf","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eurasian_wolf_2.jpg/1920px-Eurasian_wolf_2.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":450,"y":3160,"wires":[["49f8de9173d09a2f"]]},{"id":"5833b4f0c1928af6","type":"inject","z":"e1ceeedf31ce1ebd","name":"owl","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bubo_bubo_sibiricus_-_01.JPG/1024px-Bubo_bubo_sibiricus_-_01.JPG","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":450,"y":3240,"wires":[["49f8de9173d09a2f"]]},{"id":"7bd09a7daa0d5dae","type":"debug","z":"e1ceeedf31ce1ebd","name":"class","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"true","targetType":"full","statusVal":"payload[0][0].label & \"(\" & $round(payload[0][0].score * 100,2)  & \"%)\"","statusType":"jsonata","x":1270,"y":3760,"wires":[]},{"id":"0b07230327b5689c","type":"debug","z":"e1ceeedf31ce1ebd","name":"class","active":true,"tosidebar":false,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload[1][0].label & \"(\" & $round(payload[1][0].score * 100,2)  & \"%)\"","statusType":"jsonata","x":1270,"y":3820,"wires":[]},{"id":"c799ffb88823e69c","type":"comment","z":"e1ceeedf31ce1ebd","name":"Image Classification","info":"","x":470,"y":3060,"wires":[]},{"id":"99eb75b743ba98ea","type":"comment","z":"e1ceeedf31ce1ebd","name":"Batch Image Classification","info":"","x":510,"y":3700,"wires":[]},{"id":"55506dfb9dc40daf","type":"change","z":"e1ceeedf31ce1ebd","name":"move payload images array","rules":[{"t":"set","p":"images","pt":"msg","to":"[]","tot":"json"},{"t":"move","p":"payload","pt":"msg","to":"images[0]","tot":"msg"},{"t":"set","p":"url","pt":"msg","to":"urls[1]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":775,"y":3740,"wires":[["2b8af48bb3f824bc"]],"l":false},{"id":"c9b1c4ff34ec7d02","type":"change","z":"e1ceeedf31ce1ebd","name":"move payload images array","rules":[{"t":"move","p":"payload","pt":"msg","to":"images[1]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":995,"y":3740,"wires":[["e21197eababa2618"]],"l":false},{"id":"c7c8d609c2bfaffc","type":"inject","z":"e1ceeedf31ce1ebd","name":"wolf+clock","props":[{"p":"urls","v":"[]","vt":"json"},{"p":"urls[0]","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eurasian_wolf_2.jpg/1920px-Eurasian_wolf_2.jpg","vt":"str"},{"p":"urls[1]","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pendulum_clock_by_Jacob_Kock%2C_antique_furniture_photography%2C_IMG_0931_edit.jpg/250px-Pendulum_clock_by_Jacob_Kock%2C_antique_furniture_photography%2C_IMG_0931_edit.jpg","vt":"str"},{"p":"url","v":"urls[0]","vt":"msg"},{"p":"preprocessorConfigOverrides","v":"{\"size\": {\"width\":224, \"height\":224}}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":460,"y":3740,"wires":[["2dd6833f25e7a905"]]},{"id":"2dd6833f25e7a905","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":670,"y":3740,"wires":[["55506dfb9dc40daf"]]},{"id":"2b8af48bb3f824bc","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":890,"y":3740,"wires":[["c9b1c4ff34ec7d02"]]},{"id":"79f068f1e84fdef2","type":"inject","z":"e1ceeedf31ce1ebd","name":"","props":[{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":450,"y":3480,"wires":[["c7b482660e93f645"]]},{"id":"c7b482660e93f645","type":"file in","z":"e1ceeedf31ce1ebd","name":"","filename":"dog.jpg","filenameType":"str","format":"","chunk":false,"sendError":false,"encoding":"none","allProps":false,"x":660,"y":3480,"wires":[["64b15839a5d33ad4"]]},{"id":"70d9f015166b7f63","type":"comment","z":"e1ceeedf31ce1ebd","name":"Auto preprocessing: Using Image as input","info":"","x":560,"y":3120,"wires":[]},{"id":"0c1b6f94772cf829","type":"inject","z":"e1ceeedf31ce1ebd","name":"plane","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/e/eb/British_Airways_Concorde_G-BOAC_03.jpg","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":450,"y":3280,"wires":[["49f8de9173d09a2f"]]},{"id":"584b4e035f0e91dd","type":"comment","z":"e1ceeedf31ce1ebd","name":"Auto preprocessing: Using local file Image as input. \\n NOTE: You will need to add a dog.jpg image to test this","info":"","x":600,"y":3420,"wires":[]},{"id":"25a103fa3e5ced6e","type":"image-classification","z":"e1ceeedf31ce1ebd","name":"","property":"payload","propertyType":"msg","model":"onnx-community/resnet-50-ONNX","modelType":"name","dtype":"fp16","topK":"1","topKType":"num","threshold":"0.5","thresholdType":"num","x":700,"y":3540,"wires":[["7af6dd11b8160481"]]},{"id":"7af6dd11b8160481","type":"debug","z":"e1ceeedf31ce1ebd","name":"class","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload[0].label & \"(\" & $round(payload[0].score * 100,2)  & \"%)\"","statusType":"jsonata","x":870,"y":3540,"wires":[]},{"id":"64b15839a5d33ad4","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"180","data":"payload","dataType":"msg","active":true,"x":1010,"y":3480,"wires":[["25a103fa3e5ced6e"]]},{"id":"49f8de9173d09a2f","type":"junction","z":"e1ceeedf31ce1ebd","x":560,"y":3160,"wires":[["80afcb4f0920c6ce"]]},{"id":"1012c4c8ef915cdd","type":"global-config","env":[],"modules":{"node-red-contrib-image-tools":"2.1.1","@flowfuse-nodes/nr-ai-nodes":"0.1.6","@flowfuse/nr-file-nodes":"0.0.8"}}]
{% endrenderFlow %}
