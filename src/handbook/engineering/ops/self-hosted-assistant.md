---
navTitle: Self Hosted Assistant
---

# FlowFuse Expert

FlowFuse Expert is a collection of LLM based resources provided on FlowFuse Cloud.

Access to these features is also available to Enterprise Licensed Self Hosted and Dedicated Customers.

Self Hosted customers are directed to contact support to request the necessary authentication tokens to enable the features.

The FlowFuse Expert consists of two internal components that each need to be enabled with their own token. We are working to consolidate and simplify this configuration, but this is how it needs to be done for FlowFuse 2.28.

## Process

1. Customer emails `support@flowfuse.com`
2. Support/Sales needs to verify that the customer has a current Enterprise License
3. Once confirmed, they raise a [Production Change Request](https://github.com/FlowFuse/CloudProject/issues/new?assignees=&labels=change-request&projects=&template=change-request.yml&title=Change%3A+) providing details of the Customer and post a message to `#dept-engineering` with a link.
4. Engineering needs to create **two** access tokens for the customer.
   1. **Assistant**: Open the Instance Settings for the `flow-gen` instance in the `Internal Tools` Application. Under the Security settings create a new HTTP Bearer Token using the customer name as the token name. The token will only be displayed once, so make a note of it - this is the **Assistant Token**.
   2. **Expert**: Open the Instance Settings for the `flowfuse-expert-api` instance in the `Internal Tools` Application. Under the Security settings create a new HTTP Bearer Token using the customer name as the token name. The token will only be displayed once, so make a note of it - this is the **Expert Token**.
5. Engineering will provide the tokens to the Support/Sales person who raised the request.
6. Support/Sales then provide both tokens to the customer along with instructions on how and where to include this in the configuration - details below.

## Configuration

### Docker

The feature is enabled by editing the `configs.flowfuse.content` section at the top of the `docker-compse.yml` file.
Add the following after the end of the `npmRegistry` section. The `assistant` and `expert` keys should be indented 6 spaces to match.

Insert the two tokens

```
      assistant:
        enabled: true
        service:
          url: https://expert.flowfuse.com/v1/openai
          token: <Assistant Token>
      expert:
        enabled: true
        service:
          url: https://expert.flowfuse.com/v4/expert
          token: <Expert Token>
```



### Kubernetes

The feature is enabled by adding the tokens to the values passed to the Helm chart.

 - `forge.assistant.enabled` should be set to `true`
 - `forge.assistant.service.url` should be set to `https://expert.flowfuse.com/v1/openai`
 - `forge.assistant.service.token` should be set to the provided Assistant Token
 - `forge.expert.enabled` should be set to `true`
 - `forge.expert.service.url` should be set to `https://expert.flowfuse.com/v4/expert`
 - `forge.expert.service.token` should be set to the provided Expert Token
