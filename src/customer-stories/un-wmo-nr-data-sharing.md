---
title: World Meteorological Organization (WMO) Uses Node-RED to Modernize Sharing of Earth-System Data
image: /images/stories/un-wmo.jpg
date: 2023-09-07
logo: /images/stories/logos/logo_wmo.png
hubspot:
    formId: 37f86f46-62d1-4203-bce9-0318ce993710
story:
    brand: WMO
    url:
    logo: /images/stories/logos/logo_wmo.png
    quote: Node-RED was the right platform to use to build the AntiLoop part of the Global Broker... Node-RED has proven to be a very reliable platform.
    challenge: Modernize global weather data sharing protocol to meet higher demand for real-time data
    solution: Using the Node-RED platform to address these challenges.
    products:
        - Node-RED
    results:
        - Node-RED's MQTT nodes used to implement AntiLoop part of the Global Broker
        - Pilot system handling 45,000 message / 15 minutes; Production system will handle 30,000/minute 
---

The UN World Meteorological Organization is modernizing the way weather data is shared between the 200 plus member countries. Node-RED is being used by one of the member countries to implement a key part of the new architecture.

<!--more-->

The [World Meteorological Organization (WMO)](https://public.wmo.int/en) is responsible for coordinating the sharing of weather information between countries' weather services. The sharing of data between countries makes weather forecasting more accurate and provides the data for key issues impacting the global community, such as climate change.

The current Global Telecommunication System (GTS) of sharing weather data was developed over 50 years ago and is based on a stored and forward protocol. The GTS was developed before the Internet and uses private networks and specific data exchange mechanisms. The current system is costly to operate, and not scalable to meet the needs of both the volume and variety of data.

[WMO Information System 2.0 (WIS 2.0)](https://community.wmo.int/en/WIS2_Technical_Specification_Guidance) is the new framework being put in place to replace the GTS. The goal of WIS 2.0 is to meet the demands of high data volume, the increasing variety of data and the requirement for more real time exchange of data. It is based on the principles of simple data exchange, open standards and cloud-ready solutions. The architecture of WIS 2.0 is data exchange through a  publish/subscribe protocol based on MQTT. Each country will publish notifications that their data is available and other countries will subscribe to the data that they require to do their forecasting and others weather, climate, hydrology and ocean related activities. Global Brokers and Global Caches are key centers around the world, providing a quick and reliable access to the core data. Each country, Global Cache and Global Brokers are responsible for operating their own MQTT broker.

Rémy Giraud (Météo-France) is the Chair of the WMO SC-IMT (Standing Committee on Information Management and Technology) and has played an active role in the definition and implementation of WIS 2.0. He is also Head of IT Infrastructure Department at Météo-France. Part of his responsibilities was to set up Météo-France Global Broker. The Global Broker has two components. The first one being a standard, clustered MQTT broker that subscribes to all the brokers in each country, Global Caches and other Global Brokers. The second being a feature called the AntiLoop. The AntiLoop component is checking syntactically the messages received from each remote broker and is also required to ensure there is no duplication of published messages by different countries, the Global Cache or other Global Brokers. Rémy Giraud decided to implement Météo-France Global Broker using VerneMQ as the MQTT broker and Node-RED for the AntiLoop.

‘Node-RED was the right platform to use to build the AntiLoop part of the Global Broker’, explains Rémy Giraud. ‘Node-RED has many nodes, including extremely configurable MQTT nodes, so we were able to quickly implement the checks and the deduplication code in just a few days. We have been running the Global Broker with no problems as part of a pilot phase for the best part of a year now. Node-RED has proven to be a very reliable platform.’

In the pilot phase, the Global Broker is handling more than 45,000 messages over a 15 minutes period. Once the system moves into operational mode (from 2024 onwards), the Global Broker will be responsible for coordinating the data from over 200 Member countries plus other institutions that will publish and subscribe to the data. The total message traffic for the operational system is expected to increase 10-fold, reaching more than 30000 messages per minute. 

The implementation of the Global Broker has undergone continued development and improvements. The source code has also been made available under an open source license on [Github](https://github.com/golfvert/WIS2-GlobalBroker-Redundancy) so it can be a reference implementation on how to implement the [Global Broker technical specification](https://community.wmo.int/en/WIS2_Technical_Specification_Guidance). 

Node-RED has proven to be a platform easy to use, quick to get results and reliable for running high performance applications. 
