---
title: "Change Control"
---

As part of our [secure operations policies](/handbook/company/security/) we implement a Change Control process for certain operations in order to provide auditable, reviewable changes to key systems.

The following tasks should be completed under change control.

# FlowFuse Cloud Change Control

We track changes made to either the Staging or Production environments of FlowFuse Cloud
through issues on the CloudProject repository.

The issues should record the nature of the change required, which environment it applies to
and provide all of the necessary details to enact the change and to verify the change was successful.

1. Create a Change Request issue on the [CloudProject repository](https://github.com/FlowFuse/CloudProject/issues/new?assignees=&labels=change-request&template=change-request.yml&title=Change%3A+){rel="nofollow"}.
2. Obtain a review and approval to make the change from Engineering leadership
3. Assign the issue to the person making the change.
4. Once the change has been applied, verify the change is complete
5. Close the issue once verified


# FlowFuse Dedicated Instance Change Control

Changes to customer dedicated instances managed by FlowFuse should follow the same process 
as listed above for FlowFuse Cloud. The one difference is that the details of exactly which
instance the changes should be applied to.

# Access / Permission Request

Where access is required to a system, a `Access / Permission Request` issue should be created in the [admin repository](https://github.com/FlowFuse/admin/issues/new?template=access-request.md).

Note: when onboarding/offboarding a new employee, this is managed via the Onboarding/Offboarding change request.

# New GitHub Repository

If a new repository is required within our GitHub organisation, a `New Repository Checklist` issue should be created in the [admin repository](https://github.com/FlowFuse/admin/issues/new?template=new-repo.md).

# Onboarding/Offboarding

When bringing a new employee into the company, or saying goodbye to an existing one, use the appropriate `Onboarding` or `Offboarding` task template in Asana.

To create a task from the template, go to the [BizOps Departmental Project](https://app.asana.com/1/1213818720452348/project/1213831710817565) in Asana, 
click the **+** sign on Onboarding/Offboarding section, and select the `Onboarding` or `Offboarding` template. Rename the task with the employee's name and
set due dates relative to their start date (onboarding) or last working day (offboarding).

More details around Onboarding is available in the [Hiring and Onboarding](/handbook/peopleops/hiring/#onboarding) section of the handbook.
