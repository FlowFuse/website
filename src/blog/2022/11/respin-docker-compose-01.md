---
title: "Re-spin of Docker-Compose install package"
subtitle: Adding ability to locally build file-server container
description: Details about patch release
date: 2022-11-25
authors: ["ben-hardill"]
---

After [yesterdays 1.1.0 FlowForge release](https://flowforge.com/blog/2022/11/flowforge-1-1-released/) we noticed a few minor issues with the docker-compose install instructions.

We had relied on the fact we are now publishing container images to Docker Hub to install the new `flowforge/file-server` container. At this time we are only building images for amd64 and arm64 and we had only tagged them with the current release number.

This means that 1.1.0 release of Docker Compose could not be installed on other architectures e.g. armv7.

To remedy this we tagged v1.1.1 of the docker-compose project in which we have included the required `Dockerfile` and resources to build the `flowforge/file-server` locally, updated the `build-containers.sh` script to build this container.