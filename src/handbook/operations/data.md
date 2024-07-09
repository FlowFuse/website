---
navTitle: Data at FlowFuse
---

# Data at FlowFuse

At FlowFuse we're trying to leverage data obtained to make better decisions.

### Data sources

1. Telemetry from self-managed installations
2. [Hubspot](https://app-eu1.hubspot.com/reports-dashboard/26586079/view/106501027)
3. Analytics - [Google Analytics](https://analytics.google.com/analytics/web/#/) and [PostHog](https://eu.posthog.com/project/2209)

### Data visualization

FlowFuse uses [our own Dashboard](https://dashboard.flowfuse.com) to obtain insights
from the data.


### Determine which Instances are on which Kubernetes Nodes

From time to time it will be required to migrate Instances from certain Kubernetes nodes as we 
upgrade the cluster. The following command can be run by a cluster admin to get the list of 
Instances on a given node group (in this case the node group name is `instance-t4g-static-23`).

```
for node in $(kubectl get nodes -l alpha.eksctl.io/nodegroup-name=instance-t4g-static-23 --no-headers | cut -d " " -f1) ; do   kubectl get pods -n flowforge --no-headers --field-selector spec.nodeName=${node} -o json | jq '.items[].spec | .containers[].env[] | select(.name == "FORGE_PROJECT_ID") | .value' ; done
```