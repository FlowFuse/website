---
title: Send a File to Node-RED
subtitle: A guide to sending a csv file to Node-RED and start interacting with it.
date: 2024-01-03
authors: ["grey-dziuba"]
image: /blog/2023/12/images/uns-data-modeling.png
tags:
    - posts
    - flowfuse
    - how-to
---

Have you ever needed to send a csv file to your Node-RED instance.  This file can go on to populating a shift schedule, product specifications, or some other configuration file that is used.  In this guide we are leveraging a simple python script to post the file to a Node-RED instance and organized the data to be sent on or used.
<!--more-->

## Why would you need to send a file to Node-RED?

Often times it is necessary to update lookup tables in a sql database, but you don't necessarily want to give access to everyone to edit the database, nor do you want to have to do it all yourself.  This can often be seen when new products are introduced in to a manufacturing facility.  It may not be often, but enough that it warrants its own application.  This process will guide you in a way that it will enable your teammates to upload the files to the system themselves.

