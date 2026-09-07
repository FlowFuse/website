---
title: FlowFuse AI Nodes
navTitle: AI
navOrder: 1
meta:
  description: A set of Node-RED nodes for AI and machine learning, including ONNX model inference and LLM nodes for OpenAI, Anthropic, Google Gemini, and Ollama.
---

# FlowFuse AI Nodes

The **FlowFuse AI** Nodes package adds AI capabilities to Node-RED. It includes nodes for running local ONNX models for image classification, object detection, depth estimation, and custom inference, as well as LLM nodes for sending text prompts to hosted and local large language models from OpenAI, Anthropic, Google Gemini, and Ollama.

## Nodes

- [LLM Nodes](/docs/flowfuse-nodes/ai/llm-nodes/): Send text prompts to hosted and local large language models from OpenAI, Anthropic, Google Gemini, and Ollama directly within Node-RED flows.
- [Depth Estimation](/docs/flowfuse-nodes/ai/depth-estimation/): The Depth Estimation node estimates the distance of objects in an image and creates a depth map using an ONNX model.
- [Image Classification](/docs/flowfuse-nodes/ai/image-classification/): Classify images using ONNX models directly in Node-RED. Supports pre-trained and custom models for tasks like labeling, content moderation, and object recognition.
- [Object Detection](/docs/flowfuse-nodes/ai/object-detection/): The Object Detection node identifies and locates objects within images using ONNX models such as YOLO and DETR, enabling real-time computer vision directly in Node-RED without external AI services.
- [ONXX](/docs/flowfuse-nodes/ai/onxx/): The ONNX node allows you to perform AI inference directly in Node-RED using ONNX models, supporting image, object, and numeric predictions without external AI services.
