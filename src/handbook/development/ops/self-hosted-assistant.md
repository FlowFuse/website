---
navTitle: Self Hosted Assistant
---

# FlowFuse Assistant

FlowFuse Assistant is a collection of LLM based resources provided on FlowFuse Cloud.

Access to these features is also available to Enterprise Licensed Self Hosted and Dedicated Customers.

Self Hosted customers are directed to contact support to request an Authentication token to enable the features.

## Process

1. Customer emails `support@flowfuse.com`
2. Support needs to verify that the customer has a current Enterprise License
3. Once confirmed open the Instance Settings for the `flow-gen` instance in the `Internal Tools` Application. Under the Security settings create a new HTTP Bearer Token using the customer name as the token name. The token will only be displayed once, so make a note of it.
4. Provide the token to the customer along with instructions on how and where to include this in the configuration.


## Configuration

### Docker

The feature is enabled by editing the `configs.flowfuse.content` section at the top of the `docker-compse.yml` file.

e.g. at line 42

```
      assistant:
        enabled: true
        service:
          url: https://flow-gen.flowfuse.cloud/v1/openai
          token: <Token>
```

The `assistant` key should be indented 6 spaces

### Kubernetes

The feature is enabled by adding the token to the values passed to the Helm chart.

 - `forge.assistant.enabled` should be set to `true`
 - `forge.assistant.service.url` should be set to `https://flow-gen.flowfuse.cloud/v1/openai`
 - `forge.assistant.service.token` should be set to the provied Token