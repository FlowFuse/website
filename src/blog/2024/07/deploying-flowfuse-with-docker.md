---
title: Deploying FlowFuse with Docker on the Ubuntu server
subtitle: Step-by-step guide on how to Deploy FlowFuse with FlowFuse with Docker on Ubuntu server
description: Learn to deploy the FlowFuse on your Ubuntu server with Docker, from domain setup to running your app with email, SSL configurations.
date: 2024-07-08
authors: ["sumit-shinde"]
image:
tags:
 - node-red
 - flowfuse
 - self hosted
 - docker
---

With Node-RED's increasing role in IoT, FlowFuse Cloud has become a favored platform for deploying production Node-RED applications. It offers [extensive features](/product/features/) at a low cost, reducing operational overhead. However, the cloud is not the only option we provide; we also offer a self-hosted option for users who prefer to deploy FlowFuse on their servers. This guide demonstrates how to deploy FlowFuse on your Ubuntu server using Docker, covering key aspects such as domain setup, email, SSL, and more for real-world production scenarios

## What is Docker?

[Docker](https://docs.docker.com/guides/docker-concepts/the-basics/what-is-an-image/) is an open-source platform that simplifies how applications are deployed, scaled, and managed through containerization. It enables you to package all components required by your project such as code, libraries, and dependencies into a single, portable unit known as a [Docker container](https://docs.docker.com/guides/docker-concepts/the-basics/what-is-a-container/). These containers ensure consistency in application environments and ease deployment by ensuring that applications run predictably across different computing environments, whether it's on a developer's laptop, a server, or a cloud platform.

## Deploying FlowFuse on Ubuntu server with Docker

Before proceeding, ensure you have your domain and a server with Ubuntu installed. If your Ubuntu server is running without a GUI, you can connect to it from your computer using [ssh](https://itsfoss.com/set-up-ssh-ubuntu/), so that you can run the command from your local computer on the server.

### Installing Docker on the Ubuntu server.

1. Access the terminal on your Ubuntu server and execute the following commands:

```bash
sudo apt-get update
```

```bash
sudo apt-get install ca-certificates curl
```

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```bash
echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
 $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
sudo apt-get update
```

```
 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-build-plugin docker-compose-plugin
```

```bash
sudo docker run hello-world
```

Now, if you see the result similar to the below image it means the docker is installed successfully.

### Adding DNS records for your domain

To make your application accessible on the internet via your domain name, adding DNS records is crucial. These records serve as a vital link between your domain name (like example.com) and your server's IP address. They ensure that when users type your domain into their browsers, they're directed to the correct location where your application is hosted.

1. Log in to your Domain Provider's Panel and access the DNS settings of the domain you want to use for the FlowFuse platform.

2. Add entry first entry type: "A", enter "@" into the name field (it points to the domain name itself), and the public IP of your Ubuntu server into the data field.

3. Add entry second entry type: "A", enter "*" into the name field (adding * serves as the wildcard domain entry to the IP address of the host running Docker, we are doing this because the FlowFuse application will be hosted on the `forge.your-domain-name.com`) and public IP of your Ubuntu server into the data field.

4. Add the last entry type: "A", and enter "www" into the name field (we are adding this because previously domain names used to have the www prefix) and the public IP of your Ubuntu server into the data field.

### Installing and configuring FlowFuse

FlowFuse uses Docker Compose to install and manage the required components. We have built and maintaining that Docker Compose project.

1. Download the latest release `tar.gz` from our [Docker Compose project](https://github.com/FlowFuse/docker-compose/archive/refs).

2. Unpack this release with the following command. Make sure to replace the release name with the actual release name that you downloaded:

 ```bash
    tar zxf v2.6.0.tar.gz
 ```

3. Enter the folder with the following command. Again, don't forget to replace the release name with the actual release name that you downloaded:

 ```bash
    cd docker-compose-x.x.x
 ```

4. Now, update the FlowFuse configuration file `flowforge.yml` with your domain name. Currently, it is configured with `example.com`. To update it quickly, use the following command:

 ```bash
    sed -i 's/example.com/<replace-with-your-domain-name>/g' /etc/flowforge.yml
 ```

5. Next, update the Docker Compose configuration file `docker-compose.yml` with your domain:

 ```bash
    sed -i 's/example.com/<replace-with-your-domain-name>/g' /opt/docker-compose.yml
 ```

For your understanding, We updated the `flowforge.yml` file to include our domain in the following fields: `domain`, `base_url`, and `broker.public_url`. These changes ensure that instance names on Docker platforms prepend your domain, provide the correct URL to access the platform, and specify the URL for devices to connect to the broker if different from `broker.url`.

Additionally, in the docker-compose.yml file, we adjusted the `VIRTUAL_HOST` to point to our domain.

### Securing Communication with SSL

Securing communication with [SSL (Secure Sockets Layer)](https://www.youtube.com/watch?v=SJJmoDZ3il8) is crucial for protecting data transmitted between your users and the server. Adding SSL requires obtaining a certificate from a trusted certificate authority (CA) and configuring your server to use this certificate. Configuring SSL manually can be a headache, so we have provided a setup that you just need to enable.

1. Open the Docker Compose file in your editor:

    ```bash
    nano docker-compose.yml
    ```

2. Uncomment the following lines by removing the `#` symbol:

    ```yaml
    # - "./certs:/etc/nginx/certs"
    ```

    ```yaml
    # - "443:443"
    # environment:
      # - "HTTPS_METHOD=redirect"
    ```

    ```yaml
    # acme:
    #   image: nginxproxy/acme-companion
    #   restart: always
    #   volumes:
    #     - "/var/run/docker.sock:/var/run/docker.sock:ro"
    #     - "./acme:/etc/acme.sh"
    #   volumes_from:
    #     - nginx:rw
    #   environment:
    #     - "DEFAULT_EMAIL=mail@example.com"
    #   depends_on:
    #     - "nginx"
    ```

3. Update the lines with your domain and email associated with the domain, then save the file:

    ```yaml
    - "DEFAULT_EMAIL=your-email@example.com"

    - "LETSENCRYPT_HOST=mqtt.yourdomain.com"

    - "LETSENCRYPT_HOST=forge.yourdomain.com"
    ```

4. Open the `flowforge.yml` file in your editor:

    ```bash
    nano /etc/flowforge.yml
    ```

5. Update the `base_url` to start with `https://` instead of `http://` and the `broker.public_url` entry to start with `wss://` instead of `ws://`, then save the file.

    ```yaml
    base_url: https://yourdomain.com

    broker:
      public_url: wss://mqtt.yourdomain.com
    ```
Now, when we will start our application the acme container will get also start, that will will generate the certificates with lets encrypt on demand for the forge app and then for each of the instances as they are started.

### Configuring FlowFuse to Enable and Use the Email Feature

FlowFuse platform allows you to send invitations to other users within the platform and via email. It also supports receiving critical alerts and reseting password through email. To use these features, you need to enable and configure email in FlowFuse with your email address. Before you begin, make sure you have an email ID with an app password. FlowFuse supports Gmail and Outlook emails.

#### Creating an App Password for Your Email

If you're unfamiliar with generating an app password, watch these helpful videos:

- [Creating a Gmail app password](https://www.youtube.com/watch?v=hXiPshHn9Pw)
- [Creating an Outlook app password](https://www.youtube.com/watch?v=5ukSRLRDQIw)

#### Enabling and Configuring Email in FlowFuse

1. Open the `flowforge.yml` config file in your editor:

    ```bash
    nano /etc/flowforge.yml
    ```

2. Update the email configuration section with your email details:

**For Gmail:**

```yaml
email:
  enabled: true
  debug: false
  smtp:
    host: smtp.gmail.com
    port: 465
    secure: true
    auth:
      user: your-email@gmail.com
      pass: your-app-password
```

**For Outlook:**

```yml
email:
  enabled: true
  debug: false
  smtp:
    host: smtp.office365.com
    port: 587
    secure: false
    tls:
      ciphers: "SSLv3"
      rejectUnauthorized: false
    auth:
      user: your-email@outlook.com
      pass: your-app-password
```

### Running FlowFuse Application

We have completed the basic production-level configuration for running the FlowFuse application. Before running it, we need to ensure that we have the `flowfuse/node-red` container downloaded, which will use as the default Node-RED stack.

1. To download the Node-RED container, run the following command:

    ```bash
    docker pull flowfuse/node-red
    ```

2. Now, to run the FlowFuse application, execute the following command:

    ```bash
    docker compose -p flowforge up -d
    ```

If you see output similar to the following image, it indicates that all configurations and steps are correct. You can now access your self-hosted FlowFuse platform on the internet using the URL `https://forge.<yourdomain>.com`.

### Setting up the FlowFuse Platform

When you open the platform in your browser for the first time, you'll need to create an administrator account and perform initial configurations:

1. Open the platform in your browser. You'll see a screen similar to the image below.
   
2. Click on the "START SETUP" button.

3. Enter the username, full name, email, password, and confirm the password to addimistrator user account. This first user will have full access to the platform, allowing them to configure settings, manage users and teams.

4. Next, If you intend to use the FlowFuse Enterprise Edition, enter your license details. You can request a free trial from [Request a Trial Enterprise License](/docs/install/introduction/#request-a-trial-enterprise-license).

5. Alternatively, you can continue with the FlowFuse Community Edition (CE), which is free, by clicking "Continue with FlowFuse CE".

## Additional recources

- [Deploying FlowFuse with Docker Documentation](https://flowfuse.com/docs/install/docker/): This documentation covers everything in detail on how to install FlowFuse using Docker.

- [Deploying FlowFuse with Docker on Ubuntu youtube video](https://www.youtube.com/watch?v=qQwAPuz9bEk): This YouTube video demonstrates how to deploy FlowFuse using Docker on an Ubuntu server for your server's local network.