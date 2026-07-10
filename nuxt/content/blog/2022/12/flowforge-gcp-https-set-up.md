---
title: Configure FlowFuse in Docker to secure all traffic
subtitle: Use Let's Encrypt and Acme Companion to quickly set up FlowFuse to encrypt all traffic
description: Discover how to effortlessly secure all web traffic for your FlowFuse server using Let's Encrypt and Acme Companion with Docker. Encrypt HTTP traffic for secure communication.
date: 2022-12-09
authors: ["rob-marcer"]
tags:
    - posts
    - flowfuse
    - how-to
    - Acme Companion
    - Let's Encrypt
---

Following on from our [previous article](/blog/2022/10/ff-docker-gcp/) in which we covered how to run FlowFuse in Docker on Google’s Cloud Platform, today we are going to look at how to secure HTTP traffic to your FlowFuse server.

<!--more-->

### Introduction

When we wrote the first part of this series FlowFuse didn't have an easy path to secure HTTP traffic. Happily, two versions of FlowFuse later and at least partially inspired by these blogs, we have added the configuration you need in Docker to use HTTPS with minimal work.

That addition makes our job of explaining this setup a lot easier, credit to our developers for seeing the value of having an easy implementation of HTTPS in FlowFuse as part of our [1.0 build](/blog/2022/10/flowforge-1-released/).

To achieve secure HTTPS traffic we are employing a great service called [Let's Encrypt](https://letsencrypt.org/). In their own words, "Let’s Encrypt is a free, automated, and open certificate authority (CA), run for the public’s benefit". In practice Let's Encrypt will allow us to easily secure HTTPS traffic.

We are also utilising a Docker image called [acme-companion](https://github.com/nginx-proxy/acme-companion) which makes the configuration of Let's Encrypt a breeze. To quote the project's own Github page "acme-companion is a lightweight companion container for nginx-proxy. It handles the automated creation, renewal and use of SSL certificates for proxied Docker containers through the ACME protocol". It's a great project and credit to the team over there for making it a lot easier to secure the internet.

Now we've covered our goals and the tools we are going to use let's configure our existing GCP VM to secure all web traffic.

### Prerequisites 

As mentioned above, you will need to be running FlowFuse version 1.0 or higher to follow this guide. If you are using an older version you can upgrade now using the [instructions here](/docs/upgrade/).

### Update Docker Compose

The first step is to edit our Docker compose file. We're using Nano again to edit files so we will run this command:

```
sudo nano /opt/flowforge/docker-compose-1.1.1/docker-compose.yml
```

In the docker-compose.yml file, un-comment the following lines:

```yaml
- "./certs:/etc/nginx/certs"
```
```yaml
- "443:443"
```
```yaml
 acme:
    image: nginxproxy/acme-companion
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./acme:/etc/acme.sh"
    volumes_from:
      - nginx:rw
    environment:
      - "DEFAULT_EMAIL=mail@example.com"
    depends_on:
      - "nginx"
```


We should also redirect all traffic to use HTTPS, to do that un-comment the following in the nginx service section:


```yaml
Environment:
      - "HTTPS_METHOD=redirect"
```

We now need to add the configuration for LetsEncrypt, edit the following lines to include a valid email address and the correct domain for where you are hosting your FlowFuse server:

```yaml
- "DEFAULT_EMAIL=mail@example.com"
```
```yaml
- "LETSENCRYPT_HOST=mqtt.example.com"
```
```yaml
- "LETSENCRYPT_HOST=forge.example.com"
```

Save and exit from that file, in Nano you can do that by pressing ‘control x’ then ‘y’ then the Return key.

### Update flowforge.yml

Next, we need to edit the public_url for the MQTT broker:
```
sudo nano /opt/flowforge/docker-compose-1.1.1/docker-compose.yml
```
Then replace ws:// with wss://
```yaml
public_url: wss://mqtt.flowforge-demo.com
```
Save and exit from that file, in Nano you can do that by pressing ‘control x’ then ‘y’ then the Return key.

### Restart your Docker containers

OK, we should be ready to restart the Docker containers, run the command:

```
sudo docker compose -p flowforge up -d
```

If you reload your FlowFuse root directory in a web browser you should now see that your traffic is encrypted using LetsEncypt.

![A screenshot from Safari web browser showing that the traffic to FlowFuse is encrypted](./images/https-working.png "A screenshot from Safari web browser showing that the traffic to FlowFuse is encrypted")

Nice! That’s it, you can now access your FlowFuse installation securely. 

In the next and final part of this series of articles, we are going to look at how we can actually use FlowFuse including how to build flows and deploy and update them on Devices linked to a project.
