---
title: "Implementing Oauth2 for your Node-RED flows with FlowFuse"
subtitle: Add OAuth2 authentication to your Node-RED flows using FlowFuse for secure and controlled access.
description: Learn how to add OAuth2 authentication to your Node-RED flows using FlowFuse for secure access to services like Google. Step-by-step guide with best practices.
date: 2025-05-23
authors: ["sumit-shinde"]
image: 
keywords: node-red, flowfuse, oauth2, google cloud console
tags:
   - flowfuse
---

If you want your Node-RED flows to connect securely to popular services like Google, Microsoft, or Spotify, implementing OAuth2 authentication is essential. OAuth2 is the industry-standard protocol these services use to protect user data and manage access.

Today, OAuth2 is widely adopted—not just for integrating with third-party APIs, but also as a robust authorization mechanism across modern platforms and applications. In the context of Node-RED, OAuth2 can be used to secure dashboards, ensuring that only authorized users can view or interact with the data being displayed.

However, setting up OAuth2 can be complex. It involves managing authorization flows, handling access and refresh tokens, and ensuring secure storage and renewal of credentials.

This guide walks you through how to integrate OAuth2 authentication into your Node-RED flows using FlowFuse. You will learn how to securely access external services and restrict dashboard access to specific users, all with minimal configuration and maximum control.

## What is OAuth2?

Before we dive into implementation, let's first understand what OAuth2 actually is and why it matters.

OAuth2 is a secure authorization framework that allows applications to access user data from another service—like Google, Microsoft, or Spotify—without needing the user's password. Instead of credentials, OAuth2 uses tokens. When a user approves access, the application receives an access token: a temporary, limited-permission key that enables it to call specific APIs on the user’s behalf.

**These tokens are:**

- Short-lived for security
- Scoped to limit what they can access
- Refreshable, so the app does not need to ask the user every time

For example, if your Node-RED flow needs to upload a file to Google Drive, send an email through Gmail, or retrieve your latest calendar events, you will need to go through the OAuth2 flow to obtain a valid access token. That token is then used to make secure API requests to the service.

In short: OAuth2 is what allows your flows to access protected data and services in a secure, user-consented, and controlled way.

### Prerequisites

Before you begin, make sure you have the following:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create) and learn how to create an instance in FlowFuse.
- @flowfuse/node-red-dashboard
- **node-red-contrib-oauth2:** Ensure you have [node-red-contrib-oauth2](https://flows.nodered.org/node/@flowfuse/node-red-contrib-oauth2) installed.

## Getting Started

This section guides you through setting up OAuth2 authentication for your Node-RED flows. You will learn the essential configuration steps, including how to connect to your OAuth2 provider and enter your client credentials.

For demonstration purposes, this guide uses Google as the OAuth2 provider. We will build a simple demo that shows how to obtain user information via OAuth2. Later, we will explore additional scopes and APIs.

The `node-red-contrib-oauth2` node handles the complex processes behind the scenes — such as requesting access tokens, refreshing them automatically, and securely passing tokens to other nodes in your flows.

By the end of this section, you will be able to securely connect your Node-RED flows to external services and manage dashboard access confidently and easily.

### Step 1: Create OAuth2 Credentials with Your Provider

Before you can connect your Node-RED flows via OAuth2, you need to set up OAuth2 credentials with the service you want to integrate—whether it's Google, Microsoft, Spotify, or another provider.

The general steps are:

- **Create a new application/project** in the provider’s developer or API console.
- **Configure the consent screen or app details**, where you specify what data and permissions your app will request from users.
- **Register your Node-RED instance URL or IP address** as an authorized domain or trusted origin.
- **Add the Redirect URI**—this is where the OAuth2 provider will send users after they approve access. For Node-RED, this is usually:

```
https://<your-node-red-instance>/oauth2/redirect
```

> The `/oauth2/redirect` endpoint is the default path where the OAuth2 node listens for the authorization response.

- **Select the scopes or permissions** your flow needs. Scopes define what your app can access—examples include email, profile information, calendar events, or file storage.

These steps vary slightly depending on the provider, so always check their official documentation for specifics.

Following this setup ensures your Node-RED flows can securely authenticate and access external services on behalf of your users.

### Step 2: Configure the OAuth2 Node in Node-RED

1. Open the Node-RED editor inside FlowFuse.

2. Drag the **oauth2** node into your flow.

3. Double-click the node to open its settings.

4. Select the **Grant Type** based on your application:

   - **Authorization Code**:  
     Best for server-side applications. The user logs in and authorizes access, and your app receives an authorization code, which it exchanges for an access token. Supports refresh tokens for long-term access without repeated logins. Recommended for most cases.

   - **Implicit**:  
     Used mainly by client-side apps (e.g., browser-only single-page apps). The access token is returned directly after user authorization. Simpler but less secure because the token is exposed to the browser.

   - **Password**:  
     The app collects the user’s username and password directly to request an access token. Not recommended for most apps due to security risks and limited support by providers like Google.

   - **Client Credentials**:  
     Used for machine-to-machine communication without user involvement. The app uses its own credentials to get an access token.

   - **Refresh Token**:  
     Used to renew access tokens automatically without user interaction. you just have to include access token of first authorizee code grant recived

5. Set the **Access Token URL** to:  
   `https://oauth2.googleapis.com/token`

6. Set the **Authorization Endpoint** to:  
   `https://accounts.google.com/o/oauth2/v2/auth`

7. Enter your **Client ID** (from OAuth2 provider).

8. Enter your **Client Secret** (from OAuth2 provider).

9. Specify **Scope** for permissions your flow requires.

10. Set **Redirect URL** to:  
    `https://<your-node-red-instance>/oauth2/redirect`  
    (Must exactly match what you configured in Google Cloud Console.)

### Hands-On: Use OAuth2 to Access Google Profile Data

Now that the groundwork is in place, let us put everything together in a practical example. In this section, you will build a simple flow that authenticates a user via Google and fetches their basic profile information—such as name, email, and profile picture.

This is a great way to understand how the OAuth2 flow works in practice and how tokens are handled within Node-RED. You will see how the node-red-contrib-oauth2 node manages the authorization process, retrieves tokens, and allows your flows to make authenticated API calls to Google's services.

By the end of this hands-on section, you will have a fully working example that you can expand into more advanced use cases like accessing Google Drive, Calendar, or Gmail APIs.

1. Drag an *inject* node onto the canvas. This node will act as the manual trigger for the flow.

2. Drag an *oauth2* node onto the canvas and configure it:  
   - *Client ID* and *Client Secret*: Use the credentials from your Google Cloud Console project.  
   - *Redirect URL*: `https://<your-node-red-instance>/oauth2/redirect`  
   - *JavaScript Origin*: Should match the base URL of your Node-RED instance.  
   - *Scope*: Use `openid email profile`  
   - *Authorization URL*: `https://accounts.google.com/o/oauth2/v2/auth`  
   - *Token URL*: `https://oauth2.googleapis.com/token`  
   - *Grant Type*: Select `Authorization Code`  
   - *Custom Redirect URI Path*: Leave as default unless customized in your Google Cloud project.

3. Connect the *inject* node to the *oauth2* node.

4. Add an *http request* node and connect it after the *oauth2* node.  
   - Configure it with:
     - Method: `GET`
     - URL: `https://www.googleapis.com/oauth2/v3/userinfo`
     - Bearer Token: Use `msg.access_token`

5. Add a *debug* node after the *http request* node to view the user profile data.  

6. Deploy the flow.

{% renderFlow 300 %}
[{"id":"cf51e08399720d2f","type":"oauth2","z":"d15d33a4fa9a8ad9","name":"Authorization Code","container":"oauth2Response","grant_type":"refresh_token","access_token_url":"","authorization_endpoint":"","redirect_uri":"https://fierce-surf-scoter-6915.flowfuse.cloud/oauth2/redirect","open_authentication":"","username":"","password":"","client_id":"","client_secret":"","response_type":"","access_type":"","refresh_token":"","prompt":"","scope":"","resource":"","state":"","proxy":"","debug":false,"force":true,"senderr":true,"client_credentials_in_body":true,"rejectUnauthorized":true,"headers":{},"x":310,"y":1040,"wires":[["a8531dbde8b7919e"]]},{"id":"c5abb3f87a0883d5","type":"inject","z":"d15d33a4fa9a8ad9","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":1040,"wires":[["cf51e08399720d2f"]]},{"id":"60ca7db255161008","type":"http request","z":"d15d33a4fa9a8ad9","name":"","method":"GET","ret":"obj","paytoqs":"ignore","url":"https://www.googleapis.com/oauth2/v3/userinfo","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"basic","senderr":false,"headers":[],"x":890,"y":1040,"wires":[["a1fea96a2338f96a"]]},{"id":"a1fea96a2338f96a","type":"debug","z":"d15d33a4fa9a8ad9","name":"debug 7","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1060,"y":1040,"wires":[]},{"id":"a8531dbde8b7919e","type":"change","z":"d15d33a4fa9a8ad9","name":"Set 'Access_token'","rules":[{"t":"set","p":"access_token","pt":"global","to":"oauth2Response.access_token","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":510,"y":1040,"wires":[["f64cbb75bce6485f"]]},{"id":"f64cbb75bce6485f","type":"change","z":"d15d33a4fa9a8ad9","name":"Set 'headers'","rules":[{"t":"set","p":"headers.Authorization","pt":"msg","to":"\"Bearer \" & $globalContext('accessToken')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":690,"y":1040,"wires":[["60ca7db255161008"]]}]
{% endrenderFlow %}

Once done, double-click the *code* button on the *oauth2* node. A browser window will open, prompting the user to log in and authorize the app. Upon successful login, Google will redirect the user back to your Node-RED instance using the configured redirect URL. The *oauth2* node will then exchange the authorization code for an access token.

Next, click the *inject* node to trigger the request. The access token will be passed to the *http request* node, which will use it to make an authenticated API call to Google’s userinfo endpoint. The resulting user profile — including the user’s full name, email address, and profile picture URL — will be displayed in the *debug* panel.

### Using More Scopes and APIs

Once you have set up OAuth2 to get basic profile information, you can go further and connect to more services using additional **scopes**. Scopes tell the OAuth2 provider what kind of access your app needs—like reading emails, accessing calendars, sending messages, or managing files.

But keep in mind: **some scopes need extra approval** from the provider, especially when they involve sensitive user data or actions like sending emails or changing files.

#### When You Might Need Approval

You may run into issues or warnings if:

- Your flow asks for access to personal data (like email or contacts).
- You want to do things on behalf of the user (like posting messages or changing settings).
- Your app is meant for users **outside your organization**.

In these cases, the provider may require you to go through an **app verification process** to make sure your app is safe and trustworthy.

#### Types of Scopes

Most providers group scopes like this:

- **Open scopes** – No approval needed. Great for testing and basic access (e.g., profile, email).
- **Sensitive scopes** – Need approval if used in public or production apps.
- **Restricted scopes** – High-level access. Often need a full security review.

> 💡 Tip: Check the provider’s documentation to know which scopes are allowed and what steps are needed for approval.

### Best Practices

- **Begin with simple scopes:** Start by requesting only the basic permissions your flow needs. This keeps setup easy and helps you test quickly without extra hurdles.
- **Plan for sensitive access:** If your app needs to do more—like read emails or manage files—prepare for the approval process early. It may take time, but it ensures your app is trusted and secure.
- **Protect your tokens:** Treat access tokens like keys to your data. Keep them safe, never expose them in logs or public dashboards, and use token refresh features to maintain seamless, secure connections.
- **Be user-focused:** Always ask for only the permissions you truly need. This builds user trust and helps keep your app lightweight and efficient.
- **Test thoroughly:** Before going live, test your OAuth2 flows end-to-end to catch issues early and ensure smooth user experiences.

Following these practices will make your OAuth2 integration reliable, secure, and easy to manage

## Conclusion

Using OAuth2 with FlowFuse makes your Node-RED flows more secure and lets you control who can access your data. The `node-red-contrib-oauth2` node helps handle the complex parts, so you can focus on building your flows. Start simple, follow best practices, and expand your app’s access as needed. OAuth2 helps keep your integrations safe and smooth.
