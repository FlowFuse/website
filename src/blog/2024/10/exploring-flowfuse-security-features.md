---
title: Exploring FlowFuse Security Features You Didn’t Know You Needed 
subtitle: Explore the hidden security features that enhance your FlowFuse experience.
description: Discover essential FlowFuse security features that enhance protection and ensure secure Node-RED deployments. Explore tools you didn't know you needed for robust security.
date: 2024-10-21
authors: ["sumit-shinde"]
image: 
tags:
   - node-red devops
---

When it comes to securing Node-RED applications and its editor to prevent unauthorized access to data and changes to the flows, you may have experienced just how much effort it can take. Sometimes, even after spending a significant amount of time, it still feels difficult to achieve the desired level of security.

FlowFuse takes care of all your security concerns. In this blog, we’ll dive into security features FlowFuse offers to simplify and strengthen your Node-RED deployments, ensuring you’re fully protected without the hassle.

## Security as a Foundation

At FlowFuse, security is a core part of our platform. In a world where digital threats are prevalent, protecting your Node-RED applications is essential. That’s why robust security measures are in place from the moment you start using FlowFuse. We ensure that your data is encrypted during transmission, implement rate limiting to prevent traffic overloads, and employ secure tunneling for safe communication between your edge devices and the FlowFuse platform.

But here’s the best part: we don’t just provide default protections; we also empower you to fine-tune your security defenses. FlowFuse offers a user-friendly interface that allows you to customize your security settings and craft your ideal security strategy. So go ahead—rest easier knowing we’ve established a solid foundation while you have the power to tailor your security features.

If you're interested in how we safeguard your data privacy and security, we invite you to read our detailed [security statement](/product/security/). Moreover, we are proud to announce that [FlowFuse has achieved SOC 2 Type 1 compliance](/blog/2024/01/soc2/), demonstrating our commitment to maintaining the highest standards of security and data protection.

## Unlocking FlowFuse's Security Features: Control You Didn't Know You Had

### Single Sign-On (SSO) Integration

Nowadays, every organization relies on various tools and platforms to enhance productivity and efficiency, and FlowFuse is a key player in this landscape. Providing seamless access to these resources is vital for optimizing workflows. That’s where Single Sign-On (SSO) comes in—it simplifies the onboarding and offboarding processes, and FlowFuse proudly supports SSO login.

With SSO, team members can log in using their existing credentials, eliminating the hassle of remembering multiple passwords. This not only streamlines their login experience but also enables them to be productive from day one.

To implement SSO for your self-hosted FlowFuse, refer to the following resources:

- [How to Set Up SSO SAML for Node-RED](/blog/2024/07/how-to-setup-sso-saml-for-the-node-red/)
- [How to Set Up SSO LDAP for Node-RED](/blog/2024/07/how-to-setup-sso-ldap-for-the-node-red/)

If you are using FlowFuse Cloud, please contact us for configuration assistance.

### Two-Factor Authentication (2FA)

We've all been there—managing countless passwords, hoping they're strong enough to protect against security threats. But in today’s digital world, passwords alone aren’t enough. That’s why Two-Factor Authentication (2FA) has become essential.

FlowFuse understands this need. By enabling 2FA, even if someone gets hold of your password, they'll still require a second form of verification—like a code sent to your phone—to access your account. This simple yet powerful layer of security ensures your data is much safer from unauthorized access.

To set up 2FA in FlowFuse, you’ll just need to head over to **User Settings > Security > Two-Factor Authentication**. It’s as simple as clicking the "Enable Two-Factor Authentication" button, scanning the QR code displayed on the platform with your authenticator app, and then entering the code from your app back into FlowFuse. Once you've done that, 2FA will be up and running, adding that extra layer of security to your account!

### Secure HTTP Nodes Endpoints

HTTP is one of the most widely used protocols for enabling communication between different applications and services. In Node-RED, you can quickly create these connections using HTTP nodes, which allows you to set up APIs on the fly. However, while this convenience is great, it’s essential to ensure that only authorized users can access your APIs.

FlowFuse provides robust options for securing your HTTP endpoints. To manage this, each instance has a dedicated interface that you can access by navigating to **your instance -> Settings -> Security**. Here, you’ll find several options for securing your APIs:

1. **None (Default)**: By default, no authentication is enabled, which means anyone can access your endpoints.

2. **Basic Authentication**: By selecting this option, two input fields will appear where you can enter a username and password. This ensures that only users with the correct credentials can access your APIs.

3. **FlowFuse User Authentication**: This option allows all team members to use their unique usernames and passwords when requesting to API.

4. **Bearer Tokens**: For more advanced users, there’s also an interface to generate bearer tokens, which can be used for secure API access without needing to send usernames and passwords. You can also set expiration times for these tokens, ensuring that access is time-limited and reducing the risk of unauthorized use.

For more information, refer to [HTTP Authentication in Node-RED with FlowFuse](/blog/2024/03/http-authentication-node-red-with-flowfuse/).

With these features, FlowFuse gives you complete control over who can access your APIs created in the Node-RED instance.

### API Token Management for Secure Platform Interactions

We understand that organizations need to create integrations for automation, monitoring, and efficient workflows. FlowFuse provides REST APIs that allow easy interaction with various parts of the platform, including users, instances, teams, devices, and more. However, security settings are protected to ensure they can only be updated by admins or authorized team members directly on the platform, not via APIs.

Protecting against unauthorized access is crucial, especially since your entire factory and production lines are monitored and controlled through these integrations. To safeguard this, we offer an interface similar to the one used for bearer tokens. You can access this by navigating to **User Settings > Security > Tokens**.

For more information, refer to the [FlowFuse Platform API docs](/docs/api/).

## Granular Role-Based Access Management

FlowFuse is an IoT platform designed for collaboration, easy deployment, scaling, and strong security in Node-RED solutions. With collaboration at its core, FlowFuse enables you to create teams and invite members to work together on projects. However, not everyone needs access to every feature. Without proper management, some team members might feel overwhelmed by unnecessary options or, worse, accidentally modify critical flows and configurations.

To address this, FlowFuse offers [Role-Based Access Control (RBAC)](/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse/). When inviting team members, you can assign specific roles that provide the appropriate level of access for their work. Higher roles grant more permissions, while lower roles limit access. This helps prevent accidental changes and keeps everything streamlined and secure.

### Instance Protection Mode

Imagine your Node-RED application running smoothly on the production line, seamlessly handling critical tasks and data flows. Now, picture the chaos that could ensue if someone accidentally modified a crucial flow—disruption and downtime become inevitable. While we offer the [snapshot](/blog/2024/09/node-red-version-control-with-snapshots/) feature to recover previous changes, accidental modifications may not be identified quickly. Even when they are discovered and the snapshot is used to restore the previous state, it can still take seconds or even minutes to recover, resulting in costly downtime.

To prevent such scenarios, we provide a feature called **Instance Protection Mode**. This mode allows you to set flows within your Node-RED instances to read-only, ensuring that modifications can only occur through a [DevOps pipeline](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/). This process guarantees that even the most critical flows cannot be altered without thorough testing and approval.

With Instance Protection Mode activated, team members can still view flows but any attempts to modify them are blocked, providing an additional layer of security. This approach not only protects the integrity of your applications but also fosters a controlled environment for making changes safely.

### Comprehensive Activity Audit Logs

Today, many organizations prioritize a culture of openness and transparency, but security remains a top concern. Our **Audit Logs** feature supports this dual focus by maintaining a comprehensive record of all actions in the platform. These logs detail who made changes, what was changed, and when it occurred, ensuring accountability and enabling teams to quickly identify any unauthorized access or mistakes that could jeopardize security.

We provide audit logs at three different levels: **instance level**, where all action logs related to a specific instance are recorded; **application level**, which groups logs from instances created within a specific application; and **team level**, where all platform activities are documented but visible only to admins. This layered approach not only helps organizations maintain secure workflows but also demonstrates their commitment to transparency, ensuring that security concerns are effectively addressed without sacrificing openness.

To access the audit logs:  
- For **application-level logs**, select the application you want to view and navigate to **Audit Logs**.  
- For **instance-level logs**, choose the specific instance you want to see and go to **Audit Logs**.  
- For **team-level logs**, there will be an option labeled **"Audit Logs"** in the left sidebar, accessible only to admins.

For more information refer to the [Documentation](/docs/user/logs/#audit-log)


In conclusion, FlowFuse offers a comprehensive suite of security features designed to empower you with the tools needed to protect your Node-RED applications effectively. Understanding and utilizing these security features will help you maintain a secure and efficient environment for your Node-RED applications. With FlowFuse, you can confidently safeguard your deployments, ensuring robust protection against unauthorized access while enhancing collaboration within your team.

## Get Started with FlowFuse Today!

Don't wait any longer to enhance the security of your Node-RED applications. [Sign up](/account/create) for FlowFuse now and discover how our powerful security features can protect your data and streamline your workflows. Experience peace of mind with every deployment!