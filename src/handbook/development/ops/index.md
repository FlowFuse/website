---
navTitle: Platform Ops
---

# Platform Ops

 - [Observability](./observability.md)
 - [Staging Environment](./staging.md)
 - [Production Environment](./production.md)
 - [Deployment](./deployment.md)
 - [Incident Response](./incident-response.md)
 - [FlowFuse Dedicated](./dedicated.md)
 - [Updating Stacks](./production-stack-update.md)
 - [Self Hosted Assistant](./self-hosted-assistant.md)
 

## CI/CD

As part of our CI/CD pipeline in our [@flowfuse/flowfuse](https://github.com/FlowFuse/flowfuse/) repository, we perform the following actions when code is merged to the `main` branch:
1. Several backend and UI tests are executed against the code by [this pipeline](https://github.com/FlowFuse/flowfuse/blob/main/.github/workflows/tests.yml)
2. Once all tests complete with success, [FlowFuse npm package](https://www.npmjs.com/package/@flowfuse/flowfuse) is built and published to the npm registry with a `nightly` tag by [this pipeline](https://github.com/FlowFuse/flowfuse/actions/workflows/publish.yml).
1. [FlowFuse npm package](https://www.npmjs.com/package/@flowfuse/flowfuse) is built and published to the npm registry with a `nightly` tag by [this pipeline](https://github.com/FlowFuse/flowfuse/actions/workflows/publish.yml).
2. The same pipeline triggers another action, responsible for [building a container image](https://github.com/FlowFuse/helm/actions/workflows/flowforge-container.yml) 
3. Container image build pipeline uses [flowfuse npm package](https://www.npmjs.com/package/@flowfuse/flowfuse) created in step 1 (tagged as `nightly`) to build a fresh container image
4. The resulting image is used to perform deployment on both staging and production environments.

You can read more about our various environments here:

- [Pre Staging](https://flowfuse.com/handbook/development/contributing/#test-changes-in-staging) - used for each individual pull request as part of the code review process.
- [Staging](./staging.md) - triggered by merge to `main` branch, used for testing the full application, without fear of damaging the production environment.
- [Production](./production.md) - the live environment that our customers use.