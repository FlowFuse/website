---
title: Self Hosted Assistant
description: FlowFuse Expert is a collection of LLM based resources provided on FlowFuse Cloud.
---

# FlowFuse Expert

FlowFuse Expert is a collection of LLM based resources provided on FlowFuse Cloud.

Access to these features is also available to Enterprise Licensed Self Hosted and Dedicated Customers.

Self Hosted customers are directed to contact support to request the necessary authentication tokens to enable the features.

The FlowFuse Expert consists of two internal components that each need to be enabled with their own token. We are working to consolidate and simplify this configuration, but this is how it needs to be done for FlowFuse 2.28.

## Process

1. Customer emails `support@flowfuse.com`
2. Support/Sales needs to verify that the customer has a current Enterprise License
3. Once confirmed, they raise a [Production Change Request](/handbook/operations/change/#flowfuse-cloud-change-control) providing details of the Customer and post a message to `#dept-engineering` with a link.
4. Engineering needs to create **two** access tokens for the customer.
   1. **Assistant**: Open the Instance Settings for the `flow-gen` instance in the `Internal Tools` Application. Under the Security settings create a new HTTP Bearer Token using the customer name as the token name. The token will only be displayed once, so make a note of it - this is the **Assistant Token**.
   2. **Expert**: Open the Instance Settings for the `flowfuse-expert-api` instance in the `Internal Tools` Application. Under the Security settings create a new HTTP Bearer Token using the customer name as the token name. The token will only be displayed once, so make a note of it - this is the **Expert Token**.
5. Engineering will provide the tokens to the Support/Sales person who raised the request.
6. Support/Sales then provide both tokens to the customer along with instructions on how and where to include this in the configuration - details below.

## Configuration

### Docker

::note
Please ensure you are using the latest version of the Docker Compose file for your FlowFuse Platform installation. Check the [upgrade procedure](/docs/install/docker/#upgrade) if needed.
::


The feature is enabled by adding valid tokens to the `.env` file used to configure a FlowFuse Platform.
Tokens should be added to the `ASSISTANT_TOKEN` and `EXPERT_TOKEN` environment variables (find and replace the `<Assistant Token>` and `<Expert Token>` placeholders with the actual tokens provided by FlowFuse Support/Sales).

```yaml
ASSISTANT_TOKEN="<Assistant Token>"

EXPERT_TOKEN="<Expert Token>"
```

Restart the core application containers for the changes to take effect:

```bash
docker compose stop forge
docker compose up -d forge
```

#### Broker configuration

Expert chat is delivered over the platform's Team Broker, which bridges chat requests to the central Expert broker on FlowFuse Cloud. The latest Docker Compose template already enables the Team Broker and pre-configures this bridge, so no changes to the compose file are needed. A valid `EXPERT_TOKEN` in `.env` is all that is required.

Do not edit the broker or expert configuration inside the compose file directly. Those values are managed by the template and any manual changes are overwritten on the next upgrade.

If you need to override a default, use these `.env` variables. Leave them unset to keep the template defaults:

| Variable | Purpose |
| --- | --- |
| `EXPERT_BROKER_SERVER` | Central Expert broker host (defaults to `expert-broker.flowfuse.com`) |
| `BROKER_API_KEY` / `BROKER_API_SECRET` | Local EMQX admin API credentials used to provision the bridge |

None of these changes should be made without updating to the latest release of the `docker-compose.yml` file first.

### Kubernetes

The feature is enabled by adding the tokens to the values passed to the Helm chart.

- `forge.assistant.enabled` should be set to `true`
- `forge.assistant.service.url` should be set to `https://expert.flowfuse.com/v1/openai`
- `forge.assistant.service.token` should be set to the provided Assistant Token
- `forge.expert.enabled` should be set to `true`
- `forge.expert.service.url` should be set to `https://expert.flowfuse.com/v4/expert`
- `forge.expert.service.token` should be set to the provided Expert Token
- `forge.broker.enabled` should be set to `true` (the Team Broker requires the EMQX operator to be installed)
- `forge.broker.teamBroker.enabled` should be set to `true` (required for Expert chat)

Example:

```yaml
forge:
   assistant:
     enabled: true
     service:
       url: https://expert.flowfuse.com/v1/openai
       token: Provided-Assistant-Token
   expert:
     enabled: true
     service:
       url: https://expert.flowfuse.com/v4/expert
       token: Provided-Expert-Token
   broker:
     enabled: true
     teamBroker:
       enabled: true
```

NOTE: For FlowFuse Helm chart v2.84.0 and onward the Expert central broker address is configured by default, so `forge.expert.broker.address` and `forge.expert.broker.port` no longer need to be set.

NOTE: For FlowFuse v2.33.2 and onward the urls (`forge.assistant.service.url` & `forge.expert.service.url`) can be omitted from the configuration as they have preset defaults
