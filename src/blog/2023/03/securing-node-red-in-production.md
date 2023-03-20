---
title: Securing Node-RED in production environments
subtitle: In this blog post, I will cover some of the key steps to securing your Node-RED projects.
description: In this blog post, I will cover some of the key steps to securing your Node-RED projects.
date: 2023-03-24
authors: ["rob-marcer"]
image: /blog/2023/03/images/function-nodes.png
tags:
    - posts
---

Node-RED is a powerful and flexible tool for building Internet of Things (IoT) applications. It allows you to easily connect and manage devices, APIs, and services in a visual way. However, as with any tool that exposes a web interface, it is important to take steps to secure Node-RED to prevent unauthorized access and protect sensitive data.

<!--more-->

In this blog post, we will cover several steps you can take to secure Node-RED, including using a reverse proxy to protect web access, using Let's Encrypt to secure HTTPS connections, updating the default credentials, turning off the web user interface, and protecting access to dashboards.

## Using a Reverse Proxy to Protect Web Access

By default, Node-RED listens on port 1880 for HTTP connections. This means that anyone who knows the IP address of your Node-RED server can access the web interface and potentially modify your flows or access sensitive data.

To protect your Node-RED instance, you can use a reverse proxy to redirect traffic from a public-facing web server to your Node-RED server. A reverse proxy acts as an intermediary between the client and the server, forwarding requests to the server and returning the server's response to the client.

One popular reverse proxy server is NGINX, which can be installed on the same machine as Node-RED or on a separate machine. To set up a reverse proxy with NGINX, you can follow these steps:

1. Install NGINX on your server using your package manager of choice (e.g. apt-get, yum, etc.).
2. Configure NGINX to listen on port 80 (HTTP) and forward requests to your Node-RED server on port 1880. Here is an example NGINX configuration file:

```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:1880;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
3. Restart NGINX to apply the configuration changes.

Now, when someone visits yourdomain.com in their web browser, NGINX will forward the request to your Node-RED server and return the response to the client. This way, your Node-RED server is not directly accessible from the internet, and you can control access to it through the NGINX configuration.


## Using Let's Encrypt to Secure HTTPS Connections

HTTP traffic is not secure and can be intercepted and modified by attackers. To protect your Node-RED traffic, you should use HTTPS, which encrypts traffic between the client and server.

One way to obtain an SSL/TLS certificate for your domain is to use Let's Encrypt, a free and open certificate authority. Let's Encrypt provides a tool called Certbot that can automatically obtain and install a certificate for your domain.

To use Certbot with NGINX, you can follow these steps:

1. Install Certbot on your server using your package manager of choice (e.g. apt-get, yum, etc.).
2. Run Certbot and specify NGINX as the web server. Certbot will automatically obtain and install a certificate for your domain and configure NGINX to use HTTPS. Here is an example command:

```
sudo certbot --nginx -d yourdomain.com
```
3. Restart NGINX to apply the configuration changes.

Now, when someone visits yourdomain.com in their web browser, their connection will be encrypted using HTTPS, and they will see a green padlock icon in their browser's address bar.

## Updating the Default Credentials

When you first install Node-RED, it creates a default user account with the username admin and a blank password. This is obviously not secure and should be changed immediately.

To update the default credentials, you can follow these steps:

1. Open the Node-RED editor in your web browser.
2. Click on the hamburger menu icon in the top right corner and select "Settings".
3. Click on the "Admin Auth" tab.
4. Click on the pencil icon next to the "Users" field to edit the list of users.
5. Delete the default admin user and add a new user with a strong password.
6. Click "Done" to save the changes.

Now, when you try to access the Node-RED editor, you will be prompted to enter your new credentials.

## Turning Off the Web User Interface

If you do not need to access the Node-RED editor from a web browser, you can turn off the web user interface entirely to reduce the attack surface of your Node-RED server.

To turn off the web user interface, you can follow these steps:

1. Open the Node-RED editor in your web browser.
2. Click on the hamburger menu icon in the top right corner and select "Settings".
3. Click on the "User Interface" tab.
4. Uncheck the "Enable Projects" and "Enable Editor" checkboxes.
5. Click "Done" to save the changes.

Now, when you try to access the Node-RED editor, you will see a message saying that the editor is disabled.

## Protecting Access to Dashboards

Node-RED allows you to create dashboards that display data from your IoT devices and services. However, these dashboards are publicly accessible by default, which may not be desirable if you want to restrict access to certain users or devices.

To protect access to your dashboards, you can use Node-RED's built-in authentication and authorization features. Here is an example flow that demonstrates how to protect a dashboard with a username and password:

```
[{"id":"e4c4e4b4.5c9d28","type":"ui_template","z":"d5c5f3c5.5c8f","group":"f5c9d9a5.5d8c38","name":"Protected Dashboard","order":0,"width":"6","height":"6","format":"<div ng-if=\"!authenticated\">\n    <form ng-submit=\"submit()\">\n        <label for=\"username\">Username:</label>\n        <input type=\"text\" id=\"username\" ng-model=\"username\">\n        <br>\n        <label for=\"password\">Password:</label>\n        <input type=\"password\" id=\"password\" ng-model=\"password\">\n        <br>\n        <button type=\"submit\">Login</button>\n    </form>\n</div>\n<div ng-if=\"authenticated\">\n    <h1>Protected Dashboard</h1>\n    <p>Welcome, {{username}}!</p>\n</div>","storeOutMessages":true,"fwdInMessages":true,"templateScope":"local","x":440,"y":480,"wires":[[]]},{"id":"e3f2c5e1.5f5c08","type":"function","z":"d5c5f3c5.5c8f","name":"Authenticate","func":"if (msg.payload.username === 'user' && msg.payload.password === 'password') {\n    msg.authenticated = true;\n    msg.username = msg.payload.username;\n}\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":410,"y":540,"wires":[["e4c4e4b4.5c9d28"]]},{"id":"6bf9a6c5.5f5c08","type":"http in","z":"d5c5f3c5.5c8f","name":"","url":"/dashboard","method":"get","upload":false,"swaggerDoc":"","x":230,"y":480,"wires":[["e4c4e4b4.5c9d28"]]},{"id":"a7f4b4c4.5f5c08","type":"http response","z":"d5c5f3c5.5c8f","name":"","statusCode":"","headers":{},"x":740,"y":480,"wires":[]},{"id":"f5c9d9a5.5d8c38","type":"ui_group","name":"Protected Dashboard","tab":"b8f1a0f2.5e7c6","order":1,"disp":true,"width":"6","collapse":false},{"id":"b8f1a0f2.5e7c6","type":"ui_tab","name":"Protected Dashboard","icon":"dashboard","order":2,"disabled":false,"hidden":false}]
```

This flow creates a simple login form that prompts the user for a username and password. When the form is submitted, the flow checks the credentials and sets a flag indicating whether the user is authenticated. If the user is authenticated, the dashboard is displayed; otherwise, the login form is shown again.

To use this flow in your own Node-RED instance, you can import it using the "Import" button in the Node-RED editor. You can then modify the username and password in the "Authenticate" function to match your desired credentials.

## Conclusion

Securing Node-RED is an important step in protecting your IoT applications and data. By using a reverse proxy, Let's Encrypt, updated credentials, and other security measures, you can reduce the risk of unauthorized access and ensure that your Node-RED instance is only accessible to trusted users and devices.