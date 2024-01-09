---
title: Opto 22 Embraces Node-RED to Drive Customer Innovation
image: /images/stories/opto22.jpg
date: 2023-06-01
# This "logo" is for the main page
logo: 
hubspot:
    formId: ef2e9c57-df05-456e-a612-0531c3241002
story:
    brand: Opto 22
    # This "logo" goes inside the article
    logo: /images/stories/logos/logo_opto22_red.png
    url: https://opto22.com/
    quote: ‘We love Node-RED,’ explains Benson Hougland. ‘We continue to win new customers based on our commitment to providing a first-class Node-RED experience. We think it is the right tool for our customers who are transforming their operations to be more digitally connected.’
    challenge: Make it easier to connect Opto 22 hardware with other devices, sensors, and actuators, in addition to connecting with emerging data services in the cloud. 
    solution: Using Node-RED low-code visual programming environment.
    results:
        - All Opto 22 groov hardware ships with Node-RED
        - 30-40% of Opto 22 customers use Node-RED
        - Customers building amazing applications to drive innovation in industry
---

Opto 22 is a US-based industrial automation hardware and software manufacturer based in Temecula, California. The company specializes in providing high-quality, ruggedized hardware to a wide range of industries, including Manufacturing, Process Control, Oil & Gas, Water / Waste Water, Utilities, etc.  

<!--more-->

Opto 22 has a history of innovation in the industrial hardware industry, being the first vendor to standardize on Ethernet and TCP/IP connections, being one of the original vendors behind the OPC standard, and participating in the steering committee of the more recent Sparkplug standard.

In 2014, Opto 22 was introducing its first Linux-based hardware called the Opto groov Appliance. At this time, Benson Hougland, VP of Marketing and Product Strategy at Opto 22, and Ben Orchard, Application Engineer at Opto 22 saw a need to make it easier to connect Opto 22 hardware with other devices, sensors, and actuators, in addition to connecting with emerging data services in the cloud. Through lots of research and experimentation, they discovered Node-RED and found it a natural fit for process control engineers who were used to ‘programming’ with flowcharts and diagrams. When Opto 22 introduced its groov EPIC edge programmable industrial controller platform to market in 2018, Node-RED came pre-installed on the device. 

After the launch of the groov EPIC, Opto 22 began developing Node-RED nodes to make the interfacing the two products seamless. Nodes were created to make it easier to communicate with the groov View software, the groov hardware industrial controllers, and the I/O signals on the hardware platform. Opto 22 also heavily invested in creating a [series of videos](https://opto22.com/support/resources-tools/videos/playlist-node-red-workshops) showing how to use Node-RED to build industrial automation solutions. The goal of the videos was to showcase the power of Node-RED in the industrial automation industries. 

The result of Opto 22’s investment in Node-RED has been a huge success. According to Benson Hougland, “We now have customers all across the world building amazing applications with Node-RED that really demonstrates the innovation and creativity of combining easy-to-use software and hardware at the edge.”  Today, Node-RED is shipped pre-installed on every groov EPIC and groov RIO (remote I/O) from Opto 22. According to Hougland, an estimated 30-40% of their customers have deployed Node-RED applications on Opto 22 hardware.

Node-RED is being used by Opto 22 customers in a range of use cases. Some of the more common examples are:

1. **Collecting operational data and storing this data in a SQL database**. According to Hougland, ‘The ability to collect sensor data, control variables, etc., and store this data in a SQL database is very easy with Node-RED. There are other middleware solutions available but Node-RED makes it dead simple.’
2. **Accessing external data from the control system to make control decisions**. It is often the case that industrial equipment needs access to external data to make control system decisions. For example, weather data is used in lots of applications to determine the efficiency of machinery. Opto 22 has a customer that manages wind turbines in California. The electrical utility will charge a negative tariff if the turbines generate power for the grid when the grid is over-saturated. Therefore, the Opto 22 customer has deployed Opto groov hardware at each turbine that uses Node-RED to access, every 5 minutes, the spot price for the grid, to determine if the turbine should be generating power or not. The customer realized immediate ROI by reducing their negative tariff charges.
3. **Creating alerts and notifications for industrial events**. Manufacturers often need to send alerts or notifications when a piece of equipment fails or needs servicing. Node-RED makes it very easy to send an alert or notification to any communication channel. Node-RED nodes are available for sending notifications via email, text, text-to-speech, Slack, changing stack lights, etc.
4. **Reading Modbus data.** Modbus is a widely used protocol for industrial devices that is supported on groov EPIC. Opto 22 customers are using Node-RED to transform Modbus registry data into human-readable, contextual data that can be used by other applications on the EPIC or sent to the cloud for processing. 
5. **Bridging new equipment with legacy equipment.** Manufacturing plants have significant investments in legacy equipment that sometimes isn’t easy to access. This makes it difficult to introduce new technologies, like vision analytics, into a manufacturing line. Opto 22 customer, [Intrinsics](https://opto22.com/products/groov-case-studies/case-study-intrinsics) wanted to improve their quality control using cameras and vision analytics. They added a camera to the manufacturing line that sent images directly to a cloud vision analytics service that evaluates a pass or fail. However, the PLC controlling the line could not receive the pass/fall notification. Therefore, they added a groov Rio, running Node-RED that received the pass/fail message from the analytics service and was able to connect with the legacy PLC to forward the control decision.

‘Node-RED makes it so easy to extend and innovate on a hardware platform,’ comments Ben Orchard. ‘The industrial automation industry has a history of offering proprietary drivers to add functionality to a hardware platform. People are tired of this approach. Using Node-RED only requires that you have a web browser to get access to your data and put the data anywhere. It really promotes a lot of freedom and innovation. Node-RED’s open approach is definitely the present and the future for our industry.’

Opto 22 early adoption of Node-RED has certainly proven the correct choice. Opto 22 customers benefit from an open, low-code platform for creating innovative new industrial applications. Opto 22 has attracted a wider community of industrial engineers who are interested in using modern, open tools. Opto 22 continues to be an innovator in the industrial hardware industry.

‘We love Node-RED,’ explains Benson Hougland. ‘We continue to win new customers based on our commitment to providing a first-class Node-RED experience. We think it is the right tool for our customers who are transforming their operations to be more digitally connected.’
