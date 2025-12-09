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

2. Each user must use their own unique account for interactive access. Accounts must not be shared.

3. Enforce industry best practices for passwords, service accounts, and access keys, including requirements for length, complexity, and rotation. See the Password Policy for details.

4. Require the use of strong passwords and multi-factor authentication (MFA) wherever supported.

5. Require MFA for all critical systems and resources, including all production environments.

6. Remove unused accounts, passwords, and access keys within 30 days.

7. Assign unique access keys or service accounts for each application or system process.

8. Configure authenticated sessions to time out after a defined period of inactivity.

### How to Request Access or Permission to a System

### How to Request Access or Permissions

To request access or permissions (for example: AWS, GitHub, or HubSpot), open an [Access Request issue](https://github.com/FlowFuse/admin/issues/new?assignees=ZJvandeWeg%2C+knolleary&labels=&projects=&template=access-request.md) in the admin repository.

### Access Authorization and Termination

1. Use role-based access control (RBAC) or a similar method to manage access permissions.

2. Provision standard access during employee onboarding based on the user’s job role. All additional access requests must be approved by the requester’s manager before access is granted.

3. Require CTO approval for access to critical resources, including production environments.

4. Review access on a regular basis and revoke permissions when they are no longer needed.

5. Revoke all system access and disable accounts within 24 hours (one business day) after employment ends.

6. Review all user access at least annually and whenever a user’s job role changes.

### Shared Secrets Management

1. Minimize the use of shared credentials and allow them only as an approved exception.

2. When shared credentials are required, store and share them securely using the company-provided password manager, 1Password.

3. Support any shared access to critical systems with a method that uniquely identifies the individual user.

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
