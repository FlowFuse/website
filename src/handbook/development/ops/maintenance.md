---
navTitle: Infrastructure Maintenance
---

Periodically, FlowFuse performs maintenance on FlowFuse Cloud resources. This page describes how we manage and execute maintenance tasks around the infrastructure.

# Maintenance scope

The maintenance most often involves updates to the following resources:
* underlying cluster hosts
* Kubernetes versions
* databases
* networking components

 
# Maintenance process

## Planning

The maintenance process is initiated by the Operations Team.

A new [Infrastructure task](https://github.com/FlowFuse/CloudProject/issues/new?template=infra-task.yml) is created to co-ordinate all activities regarding the task - including the technical tasks and communications with customers.

The maintenance window is scheduled to minimize the impact on the team and customers.

Where the maintenance action will cause disruption to customers, it must be scheduled with the following considerations:
* at least 45 days notice should be provided to customers
* not during the working week
* maintenance should not overlap with [scheduled release](../releases/process.md) week
## Customers communication

Once the maintenance date is set, customers should be informed about the upcoming maintenance. This must be done in co-ordination with Customer team. The communication should include:

* the scope of the maintenance
* the date and time of the maintenance
* expected duration of the maintenance
* self-care actions which customers can/should take before the maintenance date
* other relevant details to help customers to prepare for potential restart of their Node-RED instances

The e-mail template for all maintenance communication can be found in the [FlowFuse Cloud Maintenance Communication document](https://docs.google.com/document/d/1Pkd0qifjgs7xv96hfQ5OHnvX5n_WPHyA0AvPd9UUPL0). Create a copy of the template and link to from the CloudProject issue.

The notification message should be sent to all FlowFuse Cloud Team Owners who have active instances in the FlowFuse Cloud and who are affected by the maintenance. To get the contact list, please refer to the [internal documentation](https://docs.google.com/document/d/1s0mXpuuPKl-1U-YVzoTEGBhllUd-UPJjFXTqa0O481c/#heading=h.hing87m0bsmu).

The Customer team will handle sending the email once the content is agreed with engineering and the target list of customers has been provided.

The first notification should sent at least 45 days before the event. A reminder should be sent one week prior to the event.

## Infrastructure preparation

All preparations should be done before the maintenance window by the Operations team.

### FlowFuse Cloud cluster

#### Upgrading Kubernetes version - control plane

The control plane upgrade does not require a maintenance to be scheduled - the process is automated and can be executed at any time. It does not affect the running workloads.
The process is described in the [cluster upgrade documentation](https://github.com/FlowFuse/CloudProject/blob/main/UPGRADE.md#cluster-upgrade).

#### Upgrading Kubernetes version - worker nodes

The worker nodes upgrade process is described in the [cluster upgrade documentation](https://github.com/FlowFuse/CloudProject/blob/main/UPGRADE.md#node-groups-upgrade).
High-level upgrade steps are:
* create a new node group(s) with the desired Kubernetes version
* prohibit autoscaling on the old node group(s) 
* cordon the old node group(s) - this step should be performed shortly before sending the maintenance notification
See documentation for more details.

## Maintenance day

All maintenance activities should be communicated in the `#ops-cloud` slack channel.

### Kubernetes worker nodes upgrade

On the maintenance day, the Operartions Team should perform the following steps to migrate workloads to the new node group(s):
* selectively restart workloads still running on old node group(s).
* monitor the workloads and ensure that:
  * they were scheduled on correct node group
  * Node-RED flows started correctly - take corrective action (e.g., redeployment or log analysis) if issues occur

Once all workloads are migrated to the new node group(s), the old one can be safely [terminated](https://docs.aws.amazon.com/eks/latest/userguide/delete-managed-node-group.html#eksctl-delete-managed-nodegroup).
Information about the completion of migration should be shared with the team.
