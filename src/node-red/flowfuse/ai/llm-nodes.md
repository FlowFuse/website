---
eleventyNavigation:
  key: LLM Nodes
  parent: AI
  order: 5
meta:
  title: LLM Nodes
  description: Send text prompts to hosted and local large language models from OpenAI, Anthropic, Google Gemini, and Ollama directly within Node-RED flows.
---

# {{ meta.title }}

The **LLM nodes** send a text prompt to a large language model and return the model's text response. Four provider nodes are included: **OpenAI**, **Anthropic (Claude)**, **Google Gemini**, and **Ollama**. They share a common configuration and message contract so they can be used interchangeably in a flow.

> **Note:** Multi-modality support for the LLM nodes is being explored. Please reach out if you have such requirements.

## Configuration

All four nodes share the same configuration fields:

- **Model:** The model name to call (for example, `gpt-4.1-mini`, `claude-opus-4-6`, `gemini-3.1-flash-lite`, `llama3.2`).
- **System:** An optional system prompt that sets the model's behaviour.
- **Temperature:** Sampling temperature controlling response randomness (default: `0.7`).
- **Max Tokens:** The maximum number of tokens to generate in the response.
- **Timeout:** How long to wait for a response before aborting the request.
- **API Key:** Supplied via credential override or a provider environment variable. The Ollama node can also run against a local endpoint without a key.

### API Key Environment Variables

| Provider | Environment Variable |
|----------|---------------------|
| OpenAI | `OPENAI_API_KEY` |
| Anthropic | `ANTHROPIC_API_KEY` |
| Gemini | `GEMINI_API_KEY` |
| Ollama | `OLLAMA_API_KEY` (optional, not required for local endpoints) |

## Input

The node expects a text prompt in the configured input property (default: `msg.payload`). Non-string values are coerced to a string before being sent.

## Output

- **`msg.payload`** - The model's text response.
- **`msg.ai_meta`** - Normalised response metadata, including `provider`, `model`, `request_id`, `usage` (input/output/total tokens), and `rate_limits` where the provider exposes them.

> **Note:** The Ollama node returns its native response details on `msg.ollama` in addition to the normalised `msg.ai_meta`.

## Example Flow

The following example sends the same prompt to OpenAI, Anthropic, and Gemini in parallel. It expects the relevant API keys to be available as environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `GEMINI_API_KEY`). Each provider branch runs independently, so the flow works with only one or two keys configured.

{% renderFlow %}
[{"id":"e4180867a7047b1f","type":"group","z":"6ab76a52887948e7","style":{"stroke":"#555555","stroke-opacity":"1","fill":"rgba(255, 255, 255, 0.03)","fill-opacity":"1","label":true,"label-position":"nw","color":"#f0f0f0"},"nodes":["35993459d37b6f93","152c15fad2618e06","d31647cc21cfb203","810f53d0e1fd9948","8fc45bb0b9dd8aea","0268271895881e33","a8ae18854eb8b60f","28e9d111cbe9274f","cdc5f07bfba274e9","8df6bcc3d93baa32","937896ec93065516"],"x":114,"y":99,"w":652,"h":362},{"id":"35993459d37b6f93","type":"ff-ai-openai","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"","apiKeyEnv":"OPENAI_API_KEY","apiKeyEnvType":"env","model":"gpt-4.1-mini","modelType":"str","temperature":"0.7","temperatureType":"num","maxTokens":"1024","maxTokensType":"num","timeoutMs":"30000","timeoutMsType":"num","system":"","systemType":"str","organization":"","project":"","sendClientRequestId":false,"x":410,"y":140,"wires":[["d31647cc21cfb203"]]},{"id":"152c15fad2618e06","type":"inject","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"ISS info","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"what speed does the ISS orbit the earth and how many times does it orbit in 24h?","payloadType":"str","x":210,"y":140,"wires":[["35993459d37b6f93"]]},{"id":"d31647cc21cfb203","type":"debug","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"openai response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":630,"y":140,"wires":[]},{"id":"810f53d0e1fd9948","type":"ff-ai-anthropic","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"","apiKeyEnv":"ANTHROPIC_API_KEY","apiKeyEnvType":"env","model":"claude-haiku-4-5","modelType":"str","temperature":"0.7","temperatureType":"num","maxTokens":"512","maxTokensType":"num","timeoutMs":"30000","timeoutMsType":"num","system":"","systemType":"str","endpoint":"https://api.anthropic.com/v1/messages","anthropicVersion":"2023-06-01","sendClientRequestId":false,"x":420,"y":220,"wires":[["28e9d111cbe9274f"]]},{"id":"8fc45bb0b9dd8aea","type":"inject","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"ISS info","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"what speed does the ISS orbit the earth and how many times does it orbit in 24h?","payloadType":"str","x":210,"y":220,"wires":[["810f53d0e1fd9948"]]},{"id":"0268271895881e33","type":"ff-ai-gemini","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"","apiKeyEnv":"GEMINI_API_KEY","apiKeyEnvType":"env","model":"gemini-3.1-flash-lite","modelType":"str","temperature":"0.7","temperatureType":"num","maxTokens":"1024","maxTokensType":"num","timeoutMs":"30000","timeoutMsType":"num","system":"","systemType":"str","endpointTemplate":"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent","sendClientRequestId":false,"x":410,"y":300,"wires":[["cdc5f07bfba274e9"]]},{"id":"a8ae18854eb8b60f","type":"inject","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"ISS info","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"what speed does the ISS orbit the earth and how many times does it orbit in 24h?","payloadType":"str","x":210,"y":300,"wires":[["0268271895881e33"]]},{"id":"28e9d111cbe9274f","type":"debug","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"claude response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":620,"y":220,"wires":[]},{"id":"cdc5f07bfba274e9","type":"debug","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"gemini response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":620,"y":300,"wires":[]},{"id":"8df6bcc3d93baa32","type":"catch","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"","scope":"group","uncaught":false,"x":230,"y":420,"wires":[["937896ec93065516"]]},{"id":"937896ec93065516","type":"debug","z":"6ab76a52887948e7","g":"e4180867a7047b1f","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":590,"y":420,"wires":[]}]
{% endrenderFlow %}