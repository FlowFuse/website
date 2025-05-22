---
title: The Future of Textile Manufacturing Powered with Node-RED
description: Learn how Node-RED transforms textile manufacturing at STFI's Model Factory with seamless integration and advanced applications. 
image: /images/stories/stfi-future-textile.jpg
date: 2023-11-14
logo:
hubspot:
    formId: 04a5843c-1d39-4410-8727-af15b42108d1
story:
    brand: STFI
    url: https://stfi.de/
    logo: /images/stories/logos/stfi.jpeg
    quote: Node-RED allows you to focus on developing the important things you want to create and not worry about a lot of the lower level infrastructure you need to connect data from different sources.
    challenge: Connect to, combine, and enrich data from sources to build applications to modernize textile industries.
    solution: Adopt Node-RED to extract data from various sources and combine data from different streams.
    products:
        - Node-RED
        - FlowFuse
    results:
        - Various process have now unlocked potential for the industry to adopt.
        - Dynamic applications can now access and utilize data streams through Node-RED.
---

Sächsisches Textilforschungsinstitut e.V. ([STFI](https://www.stfi.de/en/)) in Chemnitz is a German non-profit research institute that undertakes R&D projects on topics such as technical textiles, nonwovens, lightweight textile engineering, functionalization, recycling, digitalisation and Industry 4.0. STFI recently led [futureTEX](https://youtu.be/RL8QJWuY10c?feature=shared), a German funded research consortium, which explored the future of textile products and manufacturing. As part of the research consortium, STFI created a [Model Factory](https://my.matterport.com/show/?m=e6XJvoLS6mv&sr=-.95,1.4&ss=60) to demonstrate end-to-end future textile manufacturing operations.  

<!--more-->

!["The textile model factory for automated, networked and low-code-based digital production"](images/stories/stfi-future-textile.jpg "The textile model factory for automated, networked and low-code-based digital production") (ⒸSTFI/D. Hanus)_

The Model Factory consists of a number of different manufacturing applications, including for instance a product configurator, systems for job control, and [location based carrier management](https://youtu.be/yzK7vo6VpNU?si=YFhiaJTZpgmreU0c). Node-RED has been used for these applications to provide back end integration to different systems. For instance, the [Product Configurator](https://youtu.be/cgtHO1OVkV8?si=CmbDHoMzlkAS6Siu) uses Node-RED to manage the login information and to forward a product definition to the control system and/or the ERP system. The ability to forward the product definition to different systems makes the application flexible enough to support different types of applications.

![State-Machine and OPC-UA-Connection to the machines](images/stories/stfi-node-red-flow-opcua.png "State-Machine and OPC-UA-Connection to the machines"){data-zoomable}
_Figure 2: [Job Control](https://youtu.be/cgtHO1OVkV8?si=oTpLigbmfqlZ-8Bi&t=98) with State-Machine and OPC-UA-Connection to the machines like a [laser cutter](https://youtu.be/eUkZ8R1tNM4?si=uOwL-XGf0uKkXdVL) (ⒸSTFI)_

The [job control system](https://youtu.be/cgtHO1OVkV8?si=oTpLigbmfqlZ-8Bi&t=98) is a set of state machines built in Node-RED, see figure 2. Each state machine represents a different machine like a [mobile robot](https://youtu.be/Z_e6EcT2mQs?si=DfxQS0K16bcrpixi) and includes different communication nodes to the different pieces of equipment in the factory line. Node-RED was well suited for developing these state machines since state machines are well represented in flow based programming and also Node-RED provides support for the different communication protocols like OPC UA. Node-RED was also used to control  the automated guided vehicle and the collaborative robot UR10e within the mobile robot, see figure 3.

!["Control the Automated Guided Vehicle and the Universal Robot via OPC UA and Real-Time Data Exchange"](images/stories/stfi-mobile-robot.png "Control the Automated Guided Vehicle and the Universal Robot via OPC UA and Real-Time Data Exchange"){data-zoomable}
_Figure 3: Within the [mobile Robot](https://youtu.be/Z_e6EcT2mQs?si=DfxQS0K16bcrpixi), control the Automated Guided Vehicle and the Universal Robot via OPC UA and Real-Time Data Exchange (ⒸSTFI)_

The Model Factory also consists of a number of different pieces of equipment. Unfortunately, not all the equipment was able to communicate with the standard protocol. Equipment like a laser cutter and a 3D printing machine are connected to the network with a proprietary protocol. The Model Factory team wanted to use OPC-UA as the standard protocol to allow for flexibility and future integration to other equipment. To overcome this problem, the research team used Node-RED to convert proprietary protocols to OPC-UA. Node-RED was deployed to the equipment desktop control machine so that it could convert the protocol inbound and outbound into OPC-UA.

With Node-RED, it is also possible to create a mobile dashboard for machines with just a few clicks and watch it within a [Hololens](https://youtu.be/T5BNb0-2D7o?feature=shared). Furthermore, systems for [process declaration input](https://youtu.be/rNAgmsZoh7g?t=243) (such as setup, cleaning, repair) can be implemented to increase transparency on machine states in production. Furthermore, based on Node-RED you can develop [Augmented Reality Application](https://youtu.be/jElLfvJUpH0?feature=shared&t=303) and system for [worker assistance](https://youtu.be/jElLfvJUpH0?feature=shared&t=348) with the help of cordova.

!["Augmented Reality Application based on Node-RED and cordova"](images/stories/stfi-augmented-reality.jpg "Augmented Reality Application based on Node-RED and cordova")
_Figure 4: Augmented Reality Application based on Node-RED and cordova (ⒸSTFI)_

Andreas Boehm, industrial engineer and lead researcher for the Model Factory comments on why they use Node-RED, “Node-RED is very easy to use and quick to develop. The low-code interface makes it possible for a non-professional developer to quickly start building applications. However, the ability to drop into the function node to write JavaScript makes it very powerful for a professional developer. Node-RED allows you to focus on developing the important things you want to create and not worry about a lot of the lower level infrastructure you need to connect data from different sources.”

STFI and the Model Factory are motivated to encourage textile manufacturers to modernize their operations with automation and Industry 4.0 technologies. Their use of Node-RED has demonstrated to different companies how easy it is to get started on small focused applications and grow their digitalization strategy over time. This is an important message to encourage these companies to start today implementing the systems that will make them more competitive in the future. The model factory can be visited as part of [lab tours](https://www.digitalzentrum-smarte-kreislaeufe.de/wissen-werkzeuge/angebote.html) or simply contact Mr. Böhm.

Contact for the Model Factory: [Andreas Böhm](mailto:andreas.boehm@stfi.de), +49 371 5274 272

Note: The linked YouTube videos are in German. YouTube offers automatically translated subtitles.