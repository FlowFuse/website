---
title: OT architectures
navTitle: OT architectures
navOrder: 9
guide: flowfuse
slug: ot-architectures
---

# OT architectures

:::guide-tabs
::guide-tab{label="Edge · server in IT"}
![Edge · server in IT — diagram](/images/application-guide/flowfuse/ot-architectures-edge-it.svg)

The FlowFuse server lives up in the IT infrastructure; the Remote Instances live down in the OT environment on the equipment. The server deploys to and manages them across the IT/OT boundary, while each Remote Instance keeps running locally if the link drops.

**Use it when** — IT owns and hosts the platform, but execution must sit next to the machines in OT.

::
::guide-tab{label="Edge · server in OT / DMZ"}
![Edge · server in OT / DMZ — diagram](/images/application-guide/flowfuse/ot-architectures-edge-dmz.svg)

The FlowFuse server sits inside the plant, firewall-segregated in a DMZ, with a controlled uplink to corporate systems and Remote Instances on IPCs and embedded hardware in the OT network below. Nothing reaches OT except through the firewalls.

**Use it when** — Security policy keeps the platform inside the plant boundary, exposed only through a DMZ.

::
::guide-tab{label="Air-gapped"}
![Air-gapped — diagram](/images/application-guide/flowfuse/ot-architectures-airgap.svg)

The DMZ pattern taken to its extreme: a self-managed FlowFuse runs on a server inside an isolated OT network with no internet at all. It manages that site's instances and devices entirely within the OT boundary — nothing goes in or out.

**Use it when** — Site security policy forbids any internet traffic in or out of the OT network.

::
::guide-tab{label="Edge · hardware-saving"}
![Edge · hardware-saving — diagram](/images/application-guide/flowfuse/ot-architectures-edge-save.svg)

Instead of a Remote Instance on every device, deploy one FlowFuse server close to the line and run several Hosted Instances on it — each doing the work an edge device would have done, talking to its equipment directly. Fewer physical boxes to buy and maintain, same separation of concerns.

**Use it when** — You want the edge workloads consolidated onto nearby server hardware to cut device count.

::
:::
