---
title: Let's Encrypt Support in FlowForge Docker
subtitle: Support for Let's Encrypt is coming to FlowForge 1.0
description: Support for Let's Encrypt is coming to FlowForge 1.0
date: 2022-10-21
authors: ["rob-marcer"]
---

This is our second article discussing running FlowForge Docker on Google Cloud Platform (GCP). This time we are going to look at how to use an alternative Docker Compose file to build Let's Encrypt support directly into FlowForge. Although the focus of this series of articles is GCP in most cases the steps disucssed should work in most environments.

You can read the first article which explained how to setup a FlowForge Docker install on GCP [here](https://flowforge.com/blog/2022/10/ff-docker-gcp/).
<!--more-->

# What is Let's Encrypt?

In their own words, 'Let's Encrypt is a non-profit certificate authority run by Internet Security Research Group that provides X.509 certificates for Transport Layer Security encryption at no charge'.

This in practice allows web service operators to create SSL certificates for their domains at no cost. Let's Encrypt also has the added benefit of automated renewal of certificates as needed.

# Prerequisites

- A domain name - We've registered flowforge-demo.com to demonstrate these steps
- A DNS provider - Our Domain registrar provides a basic DNS service for free

# Replace the existing docker-compose.yml

The Docker compose file defines one or more Docker containers which will run a service. In our compose file, alongside the main FlowForge application we have containers running an Nginx reverse proxy, a Postgres database server and a MQTT broker. We are going to edit the file to add in another container which will manage the certificates we need and make them available to the Nginx reverse proxy.

To add Let's Encrypt support we are using the fantastic [ACME Companion](https://github.com/nginx-proxy/acme-companion) project.

We will backup the old docker-compose.yml first.

`sudo mv /opt/flowforge/docker-compose-0.10.1/docker-compose.yml /opt/flowforge/docker-compose-0.10.1/docker-compose.yml.bck`

Next we will create the new docker-compose.yml file which includes support for Let's Encrypt.

`sudo nano /opt/flowforge/docker-compose-0.10.1/docker-compose.yml`

Now past in the following Code. 

```
version: "3.3"
services:
  nginx:
    image: nginxproxy/nginx-proxy
    networks:
      - flowforge 
    restart: always
    volumes:
      - "/var/run/docker.sock:/tmp/docker.sock:ro"
      - "./nginx/vhost.d:/etc/nginx/vhost.d"
      - "./nginx/html:/usr/share/nginx/html"
      - "./certs:/etc/nginx/certs"
    ports:
      - "80:80"
      - "443:443"
    environment:
      - "HTTPS_METHOD=redirect"
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
  postgres:
    image: postgres:14
    networks: 
      - flowforge
    restart: always
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_USER: root
    volumes:
      - "./db:/var/lib/postgresql/data"
      - "./setup-db.sh:/docker-entrypoint-initdb.d/setup-db.sh"
  flowforge-broker:
    image: "iegomez/mosquitto-go-auth"
    networks:
      - flowforge
    restart: always
    ulimits:
      nofile: 2048
    environment:
      - "VIRTUAL_HOST=mqtt.example.com"
      - "VIRTUAL_PORT=1884"
      - "LETSENCRYPT_HOST=mqtt.example.com"
    volumes:
      - "./broker/mosquitto.conf:/etc/mosquitto/mosquitto.conf"
  forge:
    build:
      context: "./flowforge-docker"
    image: "flowforge/forge-docker"
    networks: 
      - flowforge
    restart: always
    environment:
      - "VIRTUAL_HOST=forge.example.com"
      - "LETSENCRYPT_HOST=forge.example.com"
    volumes:
      - "/var/run/docker.sock:/tmp/docker.sock"
      - "./etc/flowforge.yml:/usr/src/forge/etc/flowforge.yml"
    depends_on:
      - "postgres"
      - "nginx"
      - "flowforge-broker"

networks:
  flowforge:
```

You will need to edit various sections of this file to make it work with your domain.

ADD EMAIL FOR ACME

SET       - "VIRTUAL_HOST=mqtt.example.com"

SET      - "LETSENCRYPT_HOST=mqtt.example.com"

SET       - "VIRTUAL_HOST=forge.example.com"

SET      - "LETSENCRYPT_HOST=forge.example.com"

You can now save and close that file, in Nano you can do that by pressing ‘control x’ then ‘y’ then the Return key.

# EDIT FLOWFORGE.YML to to use the public URL wss for public_url: wss://mqtt.flowforge-demo.com

# Reload the Docker Compose file

We now need to stop all the Docker containers which are already running using the following command.

`sudo docker compose down`

And then start the comainers using the new compose file.

`sudo docker compose -p flowforge up -d`

# Check everything worked.

You should now be able to access your FlowForge installation using both HTTP and HTTPS.



