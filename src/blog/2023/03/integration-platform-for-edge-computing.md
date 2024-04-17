---
title: 'Node-RED: The Integration Platform for IIoT Edge Computing & PLCs'
subtitle: Node-RED's Role in IIoT Edge Computing & PLC Integration
description: Discover why Node-RED is the go-to integration platform for IIoT edge computing and PLCs, embraced by leading vendors for its versatility and ease of use.
date: 2023-03-06
authors: ["ian-skerrett"]
image: /blog/2023/03/images/integration-platform-blog-image.jpg
tags:
    - posts
    - node-red
    - community
---

Node-RED has become a widely adopted integration platform for IoT edge computing and PLCs. Discover why!

<!--more-->


## The Integration Platform for IIoT Edge Computing & PLCs

Node-RED is a widely adopted open-source low-code development tool that makes it easy to connect and integrate different sources of data. With a visual programming interface and drag-and-drop functionality, [Node-RED](/node-red/) makes it possible for software developers and non-professional software developers to create sophisticated applications. 

In the manufacturing and industrial automation industry, the focus of the Industrial Internet of Things (IIoT) has been on integrating industrial processes and equipment to enable real-time monitoring, control, and analysis of data. For many use cases, instead of sending all the data to the cloud, the best practice for processing industrial data is to deploy the application to the edge of the network, referred to as edge computing. By processing the data closer to the data source, edge computing has many benefits, including reduced latency, limited downtime, conserving bandwidth, and increased privacy, and security.


## How Node-RED fits into IIoT Edge Computing

A key challenge for IIoT edge computing is the wide variety of different hardware platforms, protocols and sources of data and processes. Over the years, the Node-RED community has built [thousands of nodes and flow](https://flows.nodered.org/)s to support a wider range of these sources of data, including support for [Modbus](https://flows.nodered.org/node/node-red-contrib-modbus), [OPC-UA](https://flows.nodered.org/node/node-red-contrib-opcua), [S7](https://flows.nodered.org/node/node-red-contrib-s7), [MQTT](https://cookbook.nodered.org/mqtt/), etc. Node-RED also has nodes for graphics and dashboards to make it trivial to visualize industrial data. 

Node-RED’s visual programming environment makes it accessible to non-developers. Manufacturing, mechanical, and electrical engineers in the factories are typically the domain experts in understanding the existing systems and often lead IIoT initiatives. Node-RED enables these engineers to quickly innovate and create real value for their organizations. This makes it a popular choice for engineers looking to create edge computing solutions.


## PLC and IoT Gateway Vendors Embrace Node-RED

PLC and IoT Gateway vendors are at the forefront of promoting edge computing. They see edge computing as a way to modernize hardware in the factory and for remote asset management. PLC and IoT gateways often sit in front of old legacy systems that don’t have the connectivity or compute platform to enable IIoT applications. 

Many of these hardware vendors realized they need an application delivery platform for their devices. Traditional OT hardware vendors often implement proprietary software stacks that are often difficult to use and closed to integrating with other hardware and software. Forward thinking hardware vendors realized having an open platform is the future of their industry and customers have begun to demand more open platforms. Node-RED’s ease of use, open community and open source license provided the solution many of these hardware vendors were looking for. 


## The Standard for Edge Computing and PLCs

Today, Node-RED has been adopted by some of the leading PLC and IoT Gateway vendors. The hardware vendor community appears to have standardized on Node-RED as being the edge computing platform for IIoT.

Below is a sample of the vendors offering a Node-RED solution:
1. [Advantech](https://www.advantech.com/en-eu/products/node-red-gateways/sub_fb7246cc-cc10-486f-806b-30bb50a90f28) Node-RED Field Gateway
2. [Bechhoff](https://infosys.beckhoff.com/english.php?content=../content/1033/tf6720_tc3_iot_data_agent/3260672139.html&id=) TwinCAT
3. [Bivocom](https://www.bivocom.com/products/iot-gateways/edge-iot-gateway-tg452) TG452 IoT Edge Gateway
4. [BLIIOT Edge Computing Gateway](https://www.bliiot.com/edge-computing-gateway-p00359p1.html) EdgeCom BL302
5. [Bosch CtrlX Core](https://developer.community.boschrexroth.com/t5/Store-and-How-to/ctrlX-CORE-Node-RED-App/ba-p/22366)
5. [Broadsens](https://www.broadsens.com/wireless-gateway/) GU200 & GU 200S
6. [Emerson](https://www.emerson.com/documents/automation/product-datasheet-pacedge-software-computing-devices-pacsystems-en-7205588.pdf) PACEdge
7. [Hilscher Automation](https://github.com/HilscherAutomation/netPI-nodered)
8. [Opto22](https://developer.opto22.com/nodered/general/) groov RIO & EPIC
9. [Parallax AV](https://www.parallaxav.com/controlsystem/) Control System
10. [Particle.io](https://docs.particle.io/reference/cloud-apis/node-red/) Particle
11. [Pepperl+Fuchs](https://www.pepperl-fuchs.com/usa/en/classid_199.htm?view=productdetails&prodid=93839) AS-Interface gateway
12. [Raspberry Pi](https://projects.raspberrypi.org/en/projects/getting-started-with-node-red)
13. [Renesas](https://www.renesas.com/us/en/products/programmable-mixed-signal-asic-ip-products/mixed-signal-asics/communication-asics/ftclick-mikrobus-compatible-interface-module) FT Click
14. [Revolution Pi](https://revolutionpi.com/revpi-connect/) RevPi Connect
15. [Schneider Electric](https://shop.exchange.se.com/en-US/apps/59823/ecostruxure-plant-data-expert/features) ExoStructure Plant Data Expert
15. [Siemens](https://github.com/SIMATICmeetsLinux/IOT2050-NodeRed-OPCUA-Server) S7 PLC
15. [ST-One](https://st-one.io/en/hardware/)
16. [Tulip](https://support.tulip.co/docs/using-node-red-with-edge-mc) Edge MC & Edge IO
17. [Wago](https://www.wago.com/us/edge-devices) Edge Controller & Computer
18. [Weidmueller](https://catalog.weidmueller.com/procat/Group.jsp;jsessionid=C885C404E7B4B798B23B8A9BB2200513?groupId=(%22group14048963834797%22)&page=Group) control web

There are several key reason Node-RED is so popular for IIoT edge computing, including:
* Easy User-friendly interface that makes it accessible to manufacturing engineers that might not have a lot of programming experience.
* Large community of open source nodes that integrate with many different OT hardware and protocols.
* Open source community and license making it vendor neutral so competing hardware vendors feel comfortable embracing the platform.


## Conclusion

IIoT and edge computing is making software more critical to the manufacturing industry. The flexibility to integrate data from different sources to create innovative data centric solutions is primarily software driven. In partnership with OT hardware vendors, Node-RED’s flexible and easy to use environment provides the platform for manufacturing companies to embrace software to develop IIoT solutions. 
