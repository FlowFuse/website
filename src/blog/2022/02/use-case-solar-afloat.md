---
title: Using Node-RED to keep Solar PV afloat
subtitle: How spb sonne used Node-RED with a renewable energy solution
description: How spb sonne used Node-RED with a renewable energy solution
date: 2022-02-09 09:26:00.0
authors: ["zeger-jan-van-de-weg"]
tags:
    - posts
    - node-red
    - community
---

[Krisnan Ravichandran](https://www.linkedin.com/in/krishnanravichandran/) works
for [spb sonne](https://www.sbp.solar), a engineering consultancy for renewable
energy. Within the company he is part of the engineering effort on the
[Gömbhal](https://www.sbp.de/en/news/goembhal-sbp-sonnes-pioneering-floating-pv-system/)
project, creating a floatation device for solar panels.

In this post, he shares his experiences of using Node-RED.

<!--more-->

Currently there’s a prototype deployed in Hungary, while the company is located
in Stuttgart: “We’re remotely monitoring the installation. There are over 40
sensors that all connect to an ADAM-6717, Compact Intelligent Gateway. When the
data is acquired we leverage Node-RED flows that maintain the structure, monitor
performance, and provide reporting back to our offices.

Node-RED is embedded in the ADAM 6717, it was very new to me. I was already
experienced in programming, mainly Python, and within a month I felt very
comfortable and productive in Node-RED. Understanding programming is useful,
though not a necessity.

Building and improving flows I did on my own through trial-and-error, as well
as a lot of times through help on the [Node-RED Forum](https://discourse.nodered.org/).
The community is helpful and welcoming to new users. Now I maintain multiple
flows with very different purposes. Some track temperature,
irradiation wind-speed, direction, tilt and wave height; to ensure the floating
PV installation remains floating. Other sensors are connected to actuators
through flows that control pressure.

We do have some challenges; the ADAM 6717 contained an older version of Node-RED.
This raised questions around security and maintenance, as our Node-RED version
isn’t updated to a newer version in an easy manner. It also hampers training a
bit because documentation might reference an API or node for a flow that’s just
not the same on older versions.

However, I’d choose Node-RED again, it’s well known as well as easy to learn.
Furthermore I found it very versatile.”

---

Thanks to Krisnan for sharing his story. If you have a Node-RED story for us
to share, please get in touch via [contact@flowforge.com](mailto:contact@flowforge.com).
