---
eleventyNavigation:
  key: Depth Estimation
  parent: AI
meta:
  title: Depth Estimation
  description: The Depth Estimation node estimates the distance of objects in an image and creates a depth map using an ONNX model.
---

# {{ meta.title }}

The **Depth Estimation** node allows you to estimate the relative distance of objects within an image using an ONNX model. It generates a depth map that represents how far each pixel is from the camera and can optionally create a visual image of the depth map using different color styles.

## Inputs

### General

- **Property:** `input`
- **Type:** `object`, `buffer`, `string` or tensor. 
- **Description:** The input image or tensor to classify. See the **Details** section for supported input formats.

##### Supported Input Formats
Typically, the input would be an image which could be:
- A `Buffer` object containing the binary image data (e.g. from a `file` node or `http request` node)
- A base64-encoded string.
- A Jimp image object (e.g, output from `node-red-contrib-image-tools`).

##### Tensor input
Alternatively, you can supply a pre-processed tensor in the following format:

```json
{
  "data": [0.0, 0.1, 0.2, ...],
  "type": "float32",
  "dim": [1, 3, 224, 224]
}
```

This represents a flat array of pixel values, the data type of the tensor, and its dimensions (for example, `[batch_size, channels, height, width]`).

> TIP: If the model supports batching, the input can be an array of images in one of the supported formats.

## Model Selection

You can specify the model in two ways:

- Provide a **local path** (for example, `/data/models/resnet50.onnx`), or
- Specify a **model name** available on **[Hugging Face](https://huggingface.co/models?pipeline_tag=depth-estimation&library=transformers.js,onnx&sort=trending)** (for example, [Xenova/depth-anything-small-hf](https://huggingface.co/Xenova/depth-anything-small-hf)).

When specifying a model by name, you can define the data type to use when loading it. Supported types include:

- `auto` — Automatically selects the most suitable type.
- `fp32` — Standard 32-bit floating-point model.
- `fp16` — Half-precision 16-bit floating-point model.
- `int8` — 8-bit integer quantized model.
- `uint8` — 8-bit unsigned integer model.
- `q8` — Quantized Int8 model (default).
- `q4` — Quantized Int4 model.
- `q4f16` — Quantized Int4 with Float16 model.
- `bnb4` — BNB4 quantized model.

## Configuration

### Output Image

If enabled, the node generates a visual representation of the depth map based on the selected style and alpha values.
The output will include both the raw depth data and a generated image:

```json
{
  "data": { ... },
  "image": "Buffer",
  "width": 640,
  "height": 480
}
```

If disabled, only the raw depth data will be included in the output.

### style

Specifies the color map used when creating the depth visualization.

Available options include:
`grayscale`, `jet`, `hot`, `hsv`, `spring`, `summer`, `autumn`, `winter`, `bone`, `copper`, `viridis`, `inferno`, `magma`, `plasma`, `rainbow`, `cool`, `warm`, `earth`, `blackbody`, `electric`, `velocity-blue`, `velocity-green`, and many more.

These styles correspond to common colormaps used in computer vision to represent depth or heat data.

### alpha

Defines the transparency of the generated depth image.
You can use either a single value or an array of two values:

- A single value (e.g., `0.5`) applies a uniform transparency.
- An array `[0.3, 0.8]` defines a transparency range from the nearest (0.3) to farthest (0.8) objects.

## Example Flow

{% renderFlow 400 %}
[{"id":"5f4317fdaae093fa","type":"image-depth","z":"e1ceeedf31ce1ebd","name":"","property":"image","propertyType":"msg","model":"Xenova/depth-anything-small-hf","modelType":"name","dtype":"fp16","generateImage":"true","generateImageType":"bool","alpha":"alpha","alphaType":"msg","style":"imageStyle","styleType":"msg","x":830,"y":2440,"wires":[["86d79d2fe917c839"]]},{"id":"6c6723ad96d0592f","type":"inject","z":"e1ceeedf31ce1ebd","name":"football (hot A1>0)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg/1920px-Football_in_Bloomington%2C_Indiana%2C_1995.jpg","vt":"str"},{"p":"imageStyle","v":"hot","vt":"str"},{"p":"alpha","v":"[1,0]","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":370,"y":2420,"wires":[["91f63424a0d29cbc"]]},{"id":"f0c3d67e58965419","type":"http request","z":"e1ceeedf31ce1ebd","name":"","method":"GET","ret":"bin","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":730,"y":2380,"wires":[["a18b3a2b995d44a3"]]},{"id":"6dfc1deb6464d48a","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"","width":"300","data":"image","dataType":"msg","active":true,"x":650,"y":2440,"wires":[["5f4317fdaae093fa"]]},{"id":"86d79d2fe917c839","type":"image viewer","z":"e1ceeedf31ce1ebd","name":"payload.image","width":"300","data":"payload.image","dataType":"msg","active":true,"x":1020,"y":2440,"wires":[["15eb62db5c6df5b0"]]},{"id":"15eb62db5c6df5b0","type":"debug","z":"e1ceeedf31ce1ebd","name":"data","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1190,"y":2440,"wires":[]},{"id":"fb988c7f2b5e7ebd","type":"inject","z":"e1ceeedf31ce1ebd","name":"tree (1ch greyscale)","props":[{"p":"url","v":"https://www.jotform.com/blog/wp-content/uploads/2022/02/niko-photos-tGTVxeOr_Rs-unsplash.jpg","vt":"str"},{"p":"imageStyle","v":"greyscale","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":370,"y":2380,"wires":[["91f63424a0d29cbc"]]},{"id":"1276ae55440d8971","type":"inject","z":"e1ceeedf31ce1ebd","name":"bird (viridis)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg","vt":"str"},{"p":"imageStyle","v":"viridis","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":350,"y":2500,"wires":[["91f63424a0d29cbc"]]},{"id":"2d346c4a2bd33b35","type":"inject","z":"e1ceeedf31ce1ebd","name":"cave (density)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/f/f4/Hawaiian_lava_tube.jpg","vt":"str"},{"p":"imageStyle","v":"density","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":350,"y":2580,"wires":[["91f63424a0d29cbc"]]},{"id":"80a435f3656d71c3","type":"inject","z":"e1ceeedf31ce1ebd","name":"octopus (jet A0.9>0.3)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/1920px-Octopus2.jpg","vt":"str"},{"p":"imageStyle","v":"jet","vt":"str"},{"p":"alpha","v":"[0.5,0.9]","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":380,"y":2700,"wires":[["91f63424a0d29cbc"]]},{"id":"f6e800ce3399cb5f","type":"inject","z":"e1ceeedf31ce1ebd","name":"cave (grayscale)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/4/4e/HallOfTheMountainKings.jpg","vt":"str"},{"p":"imageStyle","v":"grayscale","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":360,"y":2620,"wires":[["91f63424a0d29cbc"]]},{"id":"0f4eaaa7bf1dd22e","type":"inject","z":"e1ceeedf31ce1ebd","name":"plane (rainbow)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Spitfire_-_Season_Premiere_Airshow_2018_%28cropped%29.jpg/1920px-Spitfire_-_Season_Premiere_Airshow_2018_%28cropped%29.jpg","vt":"str"},{"p":"colormap","v":"rainbow","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":360,"y":2460,"wires":[["91f63424a0d29cbc"]]},{"id":"2f20edfb8190e918","type":"inject","z":"e1ceeedf31ce1ebd","name":"castle (greys)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/5/50/Bodiam-castle-10My8-1197.jpg","vt":"str"},{"p":"imageStyle","v":"greys","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":350,"y":2540,"wires":[["91f63424a0d29cbc"]]},{"id":"c8f48da588d9c9ce","type":"inject","z":"e1ceeedf31ce1ebd","name":"monkey (rdbu A0>1)","props":[{"p":"url","v":"https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg","vt":"str"},{"p":"imageStyle","v":"rdbu","vt":"str"},{"p":"alpha","v":"[0,1]","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":370,"y":2660,"wires":[["91f63424a0d29cbc"]]},{"id":"814e081d13eb58f6","type":"comment","z":"e1ceeedf31ce1ebd","name":"Image Depth","info":"","x":330,"y":2340,"wires":[]},{"id":"a18b3a2b995d44a3","type":"change","z":"e1ceeedf31ce1ebd","name":"","rules":[{"t":"move","p":"payload","pt":"msg","to":"image","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":855,"y":2380,"wires":[["6dfc1deb6464d48a"]],"l":false},{"id":"91f63424a0d29cbc","type":"junction","z":"e1ceeedf31ce1ebd","x":580,"y":2380,"wires":[["f0c3d67e58965419"]]},{"id":"2eab771c6086f708","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-ai-nodes":"0.1.6","node-red-contrib-image-tools":"2.1.1"}}]
{% endrenderFlow %}
