---
navTitle: Access Control Policy
---

# Access Control Policy

| Policy owner   | Effective date |
| -------------- | -------------- |
| @knolleary     | 2023-05-01     |

## Purpose

This policy describes how FlowFuse controls access to information and systems. Its purpose is to ensure only authorized parties can access data and systems in line with business objectives.

## Scope 

This policy applies to all FlowFuse systems that handle confidential data. The [Data Management Policy](./data-management.md) defines what counts as confidential data.

It also applies to all FlowFuse employees and to any external partners who have access to FlowFuse systems or resources.

## Access Control Policy

1. Protect all computing resources—such as servers, user devices, network equipment, services, and applications—with strong authentication, authorization, and auditing.

2. Each user is responsible for using their own unique account for interactive access. Users must not share accounts.

3. The organization enforces industry best practices for passwords, service accounts, and access keys, including requirements for length, complexity, and rotation. See the [Password Policy[(#password-policy) for details.

4. The organization requires the use of strong passwords and multi-factor authentication (MFA) wherever supported.

5. The organization requires MFA for all critical systems and resources, including all production environments.

6. The organization removes unused accounts, passwords, and access keys within 30 days.

7. The organization assigns unique access keys or service accounts for each application or system process.

8. Authenticated sessions must time out after a defined period of inactivity.


### How to Request Access or Permission to a System

If you require access or permissions (e.g., for AWS, GitHub, HubSpot), please [raise a Ticket/Issue](https://github.com/FlowFuse/admin/issues/new?assignees=ZJvandeWeg%2C+knolleary&labels=&projects=&template=access-request.md) in our admin repository.

### Access Authorization and Termination

1. Access authorization shall be implemented using role-based access control
(RBAC) or similar mechanism.

2. Standard access based on a user's job role may be pre-provisioned during
employee onboarding. All subsequent access requests to computing resources must
be approved by the requestor’s manager, prior to granting and provisioning of
access.

3. Access to critical resources, such as production environments, must be
approved by the CTO in addition to the requestor’s manager.

4. Access must be reviewed on a regular basis and revoked if no longer needed.

5. Upon termination of employment, all system access must be revoked and user
accounts terminated within 24 hours or one business day.

6. All system access must be reviewed at least annually and whenever a user's
job role changes.

### Shared Secrets Management

1. Use of shared credentials/secrets must be minimized and approved on an
exception basis.

2. If required by business operations, secrets/credentials must be shared
securely and stored in the company provided password manager, 1Password.

3. Usage of a shared secret to access a critical system or resource must be
supported by a complimenting solution to uniquely identify the user.

## Privileged Access Management

1. Users must not log in directly to systems as a privileged user.

  * A privileged user is someone who has administrative access to critical
    systems, such as a Active Directory Domain Administrator, root user to a
    Linux/Unix system, and Administrator or Root User to an AWS account.

2. Privilege access must only be gained through a proxy, or equivalent, that
supports strong authentication (such as MFA) using a unique individual account
with full auditing of user activities.

3. Direct administrative access to production systems must be kept to an
absolute minimum.

## Access to Source Code

FlowFuse defaults to developing in the open, without restriction on who can
view the source code.

Exceptions will be made for business reasons to keep particular repositories
private. Access to private repositories on GitHub will be based on business need
and role.

## Password Policy

All FlowFuse system passwords must meet industry standards and best practices.
Where possible, systems shall be configured to enforce these standards.

 - Minimum length of 8 characters, with a mix of letters, numbers, symbols and case.
 - Passwords must not be reused between systems
 - Passwords may only be stored in the company provided password vault, 1Password.


## Programmaticaly Accessible Resources

When programmatic access to resources is required, the following guidelines must
be followed:

1. Use of API keys or access tokens (secrets) is preferred over username/password
combinations

2. Whenever possible, secrets shouldn't be shared between environments

3. Secrets must be stored securely in 1Password and not shared in
plaintext

4. Secrets must be rotated on a regular basis - at least annually, follow [internal 
guidelines](https://docs.google.com/document/d/1bFBaVWNYKjPSMefn5drkElwM-nk06ilCrtH88ZtTjAo)
for details

5. Secrets should follow least privilege principle - only provide access to the
resources that are required for the application to function

6. Secrets must not be hardcoded in the source code 


--- 
Policy derived from [JupiterOne/security-policy-templates](https://github.com/JupiterOne/security-policy-templates) ([CC BY-SA 4 license](https://creativecommons.org/licenses/by-sa/4.0/)) and [Vanta](https://vanta.com)
