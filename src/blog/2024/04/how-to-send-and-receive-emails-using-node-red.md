---
title: How to Send and Receive Emails using Node-RED
subtitle: Step-by-step Guide for Sending and Receiving Emails using Node-RED
description: Learn how to send and receive emails using Node-RED, along with best practices for sending email notifications.
date: 2024-04-03
authors: ["sumit-shinde"]
image: 
tags:
   - posts
   - gmail
---

We recently published an article on [sending Telegram messages using Node-RED](https://flowfuse.com/blog/2024/04/sending-and-receiving-telegram-messages-with-node-red/). However, in IoT, it's not the only option we utilize for sending notifications. We employ numerous other approaches, and email notification is one popular approach. In this guide, we will cover how you can send and receive emails using Node-RED. Additionally, we will discuss some of the best practices that should be followed when sending email notifications.

<!--more-->

## When to Use Email for IoT Notification

Understanding when to utilize email notifications in IoT is essential. With numerous communication approaches available, each offering unique benefits, it's crucial to explore the scenarios where email fits best for integrating it with IoT:

- For Non-Urgent Notifications: Emails are great for sending updates or notifications that don't require an immediate response. They're perfect for IoT situations where real-time reactions aren't necessary.
- For Compliance and Documentation: Emails provide a clear record of communication, which is essential for meeting compliance requirements and audit standards in regulated IoT industries.
- For Sending Detailed Information: Emails support longer messages and file attachments, making them ideal for sharing comprehensive reports, logs, or documents in IoT applications.
- Broad Notification Reach: Emails enable notifications to be delivered to multiple recipients simultaneously, ensuring that IoT messages can reach users across different locations efficiently.

## Installing Email Custom Node

1. Click the Node-RED Settings (top-right).
2. Click "Manage Palette."
3. Switch to the "Install" tab.
4. Search for `node-red-contrib-email`.

## Understanding Configurations

### Custom Email Node Configuration

1. **Server:**
   - This is the mail server address of your email service provider. It typically looks like `smtp.example.com` for outgoing emails and `imap.example.com` or `pop.example.com` for incoming emails.

2. **Port:**
   - The port number to use for connecting to the mail server. Common ports include:
     - 465: This is the SMTP port for SSL-encrypted connections.
     - 587: This is the SMTP port for TLS encrypted connections (STARTTLS).
     - 25: This is the default SMTP port, but it's often blocked by ISPs for security reasons.
   - For incoming emails, the default ports are:
     - 993: IMAP port for SSL-encrypted connections.
     - 143: IMAP port for plain TCP connections.
     - 995: POP3 port for SSL-encrypted connections.
     - 110: POP3 port for plain TCP connections.

3. **Use Secure Connection:**
   - Enabling this option ensures that the connection to the mail server is encrypted using Transport Layer Security (TLS). It's recommended to enable this option whenever possible to secure your email communications.
   - For ports 587 or 25, if the mail server supports the STARTTLS extension (which upgrades a plain text connection to an encrypted one), you should leave this option disabled.

4. **Auth Type:**
   - Choose the authentication method required by your email service provider:
     - **Basic:** This method requires a username and password to authenticate with the mail server.
     - **XOAuth:** This method requires a username and access token, typically used for OAuth authentication.
     - **None:** Use this option if your mail server does not require authentication. However, this is rare and generally not recommended for outgoing mail servers.

5. **TLS Option:**
   - Checking this option ensures that the email node verifies the validity of the server's SSL/TLS certificate. It's recommended to enable this option to ensure secure communication with the mail server.

6. **Format to SASL:**
   - SASL (Simple Authentication and Security Layer) XOAuth2 tokens are used for authentication when using the XOAuth authentication method.
   - If this option is ticked, the email node will automatically format the XOAuth2 token by combining the username and token, encoding it in base64, and passing it to the mail server in the correct format.
   - If this option is unticked, you'll need to manually format the token before passing it to the email node.

7. **Protocols:**
    - POP3 (Post Office Protocol version 3): Downloads messages to the client, typically deleting from the server.
    - IMAP (Internet Message Access Protocol): Access and manage email directly on the server, syncing across devices.

### Gmail Configuration Details

Throughtout this guide, we will demonstrate how to send emails using Node-RED with Gmail as a third-party email service provider. To connect our Gmail account with the Node-RED application, it is essential to understand the following Gmail-specific configuration details.

- **Server:** For outgoing emails `smtp.gmail.com` and for incoming emails `imap.gmail.com`. 
- **Userid:** Your Gmail address, e.g., example@gmail.com.
- **Port:** Either 465 (SSL) or 587 (TLS).
- **Password:** To connect to Google, you'll need to enable and generate an app password to connect your Gmail account with your apps or devices. For more information, refer to [Sign in with app passwords](https://support.google.com/mail/answer/185833?hl=en). Make sure to generate a separate app password for each of your Node-RED applications.

## Creating Environment Variables for Secure Email Configuration

Configuring your email account within Node-RED involves handling sensitive data such as your login credentials. To ensure the security of your information, it's essential to utilize environment variables. This approach prevents your sensitive data from being directly exposed within your flow. For more information refer to the [Using Environemnt varriable with Node-RED].

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-node-red_setting_environment_variables.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

1. Navigate to the instance's “setting” and then go to the “environment” tab.
2. Click on the add variable button and add variables for userid and password.
3. Click on the save button and restart the instance by clicking on the top right Action button and selecting the restart option.

## Configuring Email Node for Sending Emails

1. Drag an email node onto the canvas and click on it.
2. Enter the email address to which you want to send emails. You can also set "cc" and "bcc" with `msg.cc` and `msg.bcc`, respectively. The primary recipient can be set with `msg.to`. For more information, refer to the [Node README](https://flows.nodered.org/node/node-red-node-email).
3. Enter the server address as `smtp.gmail.com` into the server input field.
4. Enter the port as 465 to use SSL-encrypted connections and 587 for TLS-encrypted connections. You can use either of them.
5. Select the auth type as basic and enter the environment variable set for the user id and password in the corresponding input fields as shown below.
6. Enable the "use secure connection" option.

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-e-mail-in-node-configuration.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

## Sending email to Gmail

1. Drag an inject node onto the canvas.
2. To set the email body content and to set the body in HTML, use `msg.html`. You can use `msg.payload`. To send an attachment, set `msg.attachments`, which should contain an array of one or more attachments in [Nodemailer](https://nodemailer.com/message/attachments/) format.
3. To set the subject of the email, use `msg.topic`.

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-inject-node.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

## Receiving Email from Gmail

1. Drag an email node onto the canvas.
2. Select the "Get mail" option according to your preference.
3. Select Protocol as "IMAP," which is recommended when you are connecting your third-party app for receiving emails.
4. Enter the environment variable set for user id and password in the corresponding field as shown below.
5. Drag a debug node onto the canvas and connect the debug node input to the email node output.

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-e-mail-node-configuration.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

## Deploying the Flow

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-node-red-flow.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

!["Screenshot of Dashboard displaying logged in user information"](./images/sending-and-receiving-email-with-node-red-gmail-inbox.png "Screenshot of Dashboard displaying logged in user information"){data-zoomable}

- With your flow updated to include the above, click the "Deploy" button in the top-right of the Node-RED Editor.
- Locate the 'Open Dashboard' button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now, to send an email, you can either click the inject button or trigger it on critical events.


## Best practices to follow while sending notifcations or email

- Clear and Concise Messaging: Keep notification messages clear, concise, and action-oriented. Clearly communicate the purpose of the notification and any necessary next steps that recipients should tak
- Manage Email Frequency: Avoid sending too many email notifications within a short period, as this can trigger spam filters. Instead, maintain a consistent sending frequency and provide valuable content to recipients.
- Maintain a Clean Email List: Regularly clean your email list by removing invalid or inactive email addresses. High bounce rates and spam complaints can negatively impact your sender reputation.
- Monitor Sending Reputation: Monitor your sender reputation using tools like SenderScore or Postmaster Tools. A poor sender reputation can result in email deliverability issues and increased spam filtering.
- Configure SMTP Correctly: Ensure that SMTP configurations are accurate and up-to-date to establish secure and reliable email communication. Consider using third-party mail servers like Gmail for enhanced security and reliability.

## Conclusion



