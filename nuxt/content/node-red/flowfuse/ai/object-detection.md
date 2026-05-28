---
title: "Object Detection"
description: "The Object Detection node identifies and locates objects within images using ONNX models such as YOLO and DETR, enabling real-time computer vision directly in Node-RED without external AI services."
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



::render-flow
---
height: 200
flow: "W3siaWQiOiI2YTNjYTg0MTRhY2ZhZDM0IiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6ImJpbiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiIiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6NjEwLCJ5IjoxMTgwLCJ3aXJlcyI6W1siZjQ5OThjNmE5MDA0YTZiYSJdXX0seyJpZCI6ImY0OTk4YzZhOTAwNGE2YmEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiaW1hZ2UiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZCIsInRvdCI6Im1zZyIsImRjIjp0cnVlfV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NjIwLCJ5IjoxMjQwLCJ3aXJlcyI6W1siZDkwMmVlMTU0Y2I2Y2VhYyJdXX0seyJpZCI6ImIxYTAwOGY5NTQ1MzIwOGUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoicGVvcGxlIG9uIGJpa2VzIiwicHJvcHMiOlt7InAiOiJ1cmwiLCJ2IjoiaHR0cHM6Ly9sZWFybm9wZW5jdi5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjEvMDQvdmVoaWNsZS10cmFmZmljLW9iamVjdC1kZXRlY3Rpb24tdGVzdC1pbWFnZS5qcGciLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjozODAsInkiOjEyNDAsIndpcmVzIjpbWyI0N2Q1ODdkNzBiYWMzNzNjIl1dfSx7ImlkIjoiOGQxOGI3YzNjMjE5Nzk4MSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsIm5hbWUiOiJkb2cgYmlrZSB0cnVjayIsInByb3BzIjpbeyJwIjoidXJsIiwidiI6Imh0dHBzOi8vZGpsLmFpL2V4YW1wbGVzL3NyYy90ZXN0L3Jlc291cmNlcy9kb2dfYmlrZV9jYXIuanBnIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MzcwLCJ5IjoxMjAwLCJ3aXJlcyI6W1siNDdkNTg3ZDcwYmFjMzczYyJdXX0seyJpZCI6Ijg2NjkzYTg0OTU4Njg2N2EiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiZGVzayIsInByb3BzIjpbeyJwIjoidXJsIiwidiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvMi8yMi9TY2hyZWlidGlzY2guMi5KUEcvNDUwcHgtU2NocmVpYnRpc2NoLjIuSlBHIiwidnQiOiJzdHIifSx7InAiOiJ0aHJlc2hvbGQiLCJ2IjoiMC44NSIsInZ0IjoibnVtIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjM1MCwieSI6MTE2MCwid2lyZXMiOltbIjQ3ZDU4N2Q3MGJhYzM3M2MiXV19LHsiaWQiOiI5MTEzZGNlODQ3NTExMGY1IiwidHlwZSI6Im9iamVjdC1kZXRlY3Rpb24iLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsIm5hbWUiOiIiLCJwcm9wZXJ0eSI6ImltYWdlIiwicHJvcGVydHlUeXBlIjoibXNnIiwibW9kZWwiOiJYZW5vdmEvZGV0ci1yZXNuZXQtNTAiLCJtb2RlbFR5cGUiOiJuYW1lIiwiZHR5cGUiOiJmcDE2IiwidGhyZXNob2xkIjoidGhyZXNob2xkIiwidGhyZXNob2xkVHlwZSI6Im1zZyIsIngiOjU5MCwieSI6MTMwMCwid2lyZXMiOltbIjJjY2I0NTQ0ZDNkNTE4OGQiXV19LHsiaWQiOiIyY2NiNDU0NGQzZDUxODhkIiwidHlwZSI6ImNoYW5nZSIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InJlc3VsdCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiaW1hZ2UiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6ODAwLCJ5IjoxMzAwLCJ3aXJlcyI6W1siMzg1YmE5YzkzNjk1Yzg2YiJdXX0seyJpZCI6ImEyZWY5ZGM2YmY2MDA3ZTIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsIm5hbWUiOiJkZWJ1ZyAxNSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InJlc3VsdCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExMDAsInkiOjEzNjAsIndpcmVzIjpbXX0seyJpZCI6IjM4NWJhOWM5MzY5NWM4NmIiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsIm5hbWUiOiJQYXNjYWwgVk9DIHRvIENPQ08gYmJveCIsImZ1bmMiOiJjb25zdCBhbm5vdGF0aW9ucyA9IG1zZy5yZXN1bHQuc2xpY2UoMCwyMClcbi8vIGNvbnZlcnQgUGFzY2FsIFZPQyBGb3JtYXQgYmJveCB0byBjb2NvIGZvcm1hdFxuY29uc3QgYmJveGVzID0gW11cbmZvciAoY29uc3QgYW5ub3RhdGlvbiBvZiBhbm5vdGF0aW9ucykge1xuICAgIGNvbnN0IFsgeG1pbiwgeW1pbiwgeG1heCwgeW1heCBdID0gYW5ub3RhdGlvbi5iYm94XG4gICAgY29uc3Qgd2lkdGggPSB4bWF4IC0geG1pblxuICAgIGNvbnN0IGhlaWdodCA9IHltYXggLSB5bWluXG4gICAgY29uc3QgcGVyY2VudCA9IGFubm90YXRpb24uc2NvcmUgKiAxMDBcbiAgICBiYm94ZXMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBgJHthbm5vdGF0aW9uLmxhYmVsfSAoJHtwZXJjZW50LnRvRml4ZWQoMSl9JSlgLFxuICAgICAgICBiYm94OiBbeG1pbiwgeW1pbiwgd2lkdGgsIGhlaWdodF1cbiAgICB9KVxufVxubXNnLmFubm90YXRpb25zID0gYmJveGVzXG5yZXR1cm4gbXNnXG4iLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjEwNDAsInkiOjEzMDAsIndpcmVzIjpbWyJkYTQwNjNmOWQzYTI1NDhiIl1dfSx7ImlkIjoiZGEwYWUyZGZkMmRmMjQ4ZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsIm5hbWUiOiJmb290YmFsbCIsInByb3BzIjpbeyJwIjoidXJsIiwidiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvNC80Mi9Gb290YmFsbF9pbl9CbG9vbWluZ3RvbiUyQ19JbmRpYW5hJTJDXzE5OTUuanBnLzUwMHB4LUZvb3RiYWxsX2luX0Jsb29taW5ndG9uJTJDX0luZGlhbmElMkNfMTk5NS5qcGciLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjozNTAsInkiOjExMjAsIndpcmVzIjpbWyI0N2Q1ODdkNzBiYWMzNzNjIl1dfSx7ImlkIjoiZjIzYmE2ODIzYWRhYWI4NyIsInR5cGUiOiJjb21tZW50IiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiT2JqZWN0IERldGVjdGlvbiIsImluZm8iOiIiLCJ4IjozNjAsInkiOjEwODAsIndpcmVzIjpbXX0seyJpZCI6ImQ5MDJlZTE1NGNiNmNlYWMiLCJ0eXBlIjoiaW1hZ2Ugdmlld2VyIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiIiwid2lkdGgiOiIyNDAiLCJkYXRhIjoiaW1hZ2UiLCJkYXRhVHlwZSI6Im1zZyIsImFjdGl2ZSI6dHJ1ZSwieCI6MzUwLCJ5IjoxMzAwLCJ3aXJlcyI6W1siOTExM2RjZTg0NzUxMTBmNSJdXX0seyJpZCI6ImQ3NWM3ZjQ2NGNjYTE0YzEiLCJ0eXBlIjoiaW1hZ2Ugdmlld2VyIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiIiwid2lkdGgiOiI3MjAiLCJkYXRhIjoicGF5bG9hZCIsImRhdGFUeXBlIjoibXNnIiwiYWN0aXZlIjp0cnVlLCJ4Ijo4MzAsInkiOjEzNjAsIndpcmVzIjpbWyJhMmVmOWRjNmJmNjAwN2UyIl1dfSx7ImlkIjoiZGE0MDYzZjlkM2EyNTQ4YiIsInR5cGUiOiJhbm5vdGF0ZS1pbWFnZSIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwibmFtZSI6IiIsImZpbGwiOiIiLCJzdHJva2UiOiIjZmZBMDAwIiwibGluZVdpZHRoIjoiMyIsImZvbnRTaXplIjoyNCwiZm9udENvbG9yIjoiI2ZmQTAwMCIsIngiOjY2MCwieSI6MTM2MCwid2lyZXMiOltbImQ3NWM3ZjQ2NGNjYTE0YzEiXV19LHsiaWQiOiI0N2Q1ODdkNzBiYWMzNzNjIiwidHlwZSI6Imp1bmN0aW9uIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJ4Ijo1MDAsInkiOjExODAsIndpcmVzIjpbWyI2YTNjYTg0MTRhY2ZhZDM0Il1dfSx7ImlkIjoiOGVlNDFjNjFlMTEwZTQxMCIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJAZmxvd2Z1c2Utbm9kZXMvbnItYWktbm9kZXMiOiIwLjEuNiIsIm5vZGUtcmVkLWNvbnRyaWItaW1hZ2UtdG9vbHMiOiIyLjEuMSIsIm5vZGUtcmVkLW5vZGUtYW5ub3RhdGUtaW1hZ2UiOiIwLjIuMCJ9fV0="
---
::


