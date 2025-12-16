---
title: Scaling Industrial IoT Operations While Maintaining Competitive Edge
description: Discover how Walter built a future-proof industrial application platform with FlowFuse—connecting machines, unifying data, and scaling operations without increasing IT overhead.
image: /images/stories/walter.png
date: 2025-12-16
logo:
hubspot:
    formId: 1cab86cb-5c81-40ab-be4b-a6ae94f38ac8
story:
    brand: Walter
    url: https://www.walter-tools.com/
    logo: /images/stories/logos/walter-logo.png
    quote: Without FlowFuse, I would be able to support maybe one production unit, but that's it. FlowFuse gives us the chance to deliver what the business asks us for while maintaining our small team size. It's not just about connecting machines - it's about creating the foundation that makes everything else possible
    challenge: Fragmented systems and no unified machine connectivity left teams without critical production visibility and created heavy IT workload.
    solution: A single FlowFuse-based IoT platform with standardized Node-RED flows enabled secure, scalable machine connectivity across all sites.
    products:
        - Node-RED
        - FlowFuse
        - FlowFuse Dashboard
    results:
        - Scaled from 1 to 130+ instances with same IT team
        - Unified 5 siloed systems into one platform
        - Gained real-time visibility across all facilities
        - Engineers self-serve data with FlowFuse Dashboards
        - Faster onboarding by reusing flows across units
---

For more than 100 years, Walter has stood for expertise and quality in machining technology. The company was founded in 1919 by Richard Walter and is headquartered in Tübingen, Germany. The portfolio includes precision tools for Milling, Turning, Grooving, Holemaking and Threading as well as customised Special tools and technology solutions along the process chain. Another building block is Walter Tool Management Solutions, which offer customers cost planning security, continuous productivity improvements and faster amortisation of their investments in addition to cutting tools. With production facilities in North and South America, Europe and Asia, numerous subsidiaries and Channel Partners as well as 3,800 employees worldwide, Walter has a global presence and customers in more than 80 countries around the world. In addition to Engineering Kompetenz, a sustainable corporate strategy and a diversity approach are part of the corporate culture.

## The Challenge
Walter faced a critical operational challenge that threatened their ability to maintain competitive advantage across their global production network:

**Fragmented Production Intelligence:** Each of Walter’s production units had developed individual solutions for machine connectivity and data collection. The inserts, round tool and tool body facilities each used different systems - and in some cases, no system at all. This fragmentation created silos, requiring the central IT Team to build custom interfaces for every production area just to access basic data. Even more challenging, some units lacked any machine connectivity or dashboarding capabilities, leaving them completely in the dark about their production performance.

**Scalability Constraints with Limited Resources:** As a lean IT team of seven people responsible for MES, IoT, tool management systems, production planning, and CAD solutions, Walter IT couldn't support the growing demand for production connectivity and transparency. Across all their systems, the team was managing approximately 10 different solutions, with 5 specifically dedicated to dashboarding and machine connectivity. The situation was even more problematic because these 5 solutions were distributed unevenly across production units - not every facility had access to them, leaving some locations without any connectivity solution whatsoever. The team was spending all their time maintaining these disparate systems instead of driving innovation.

**Missing Critical Production Intelligence:** Many production units couldn't provide essential data like machine runtime, downtime periods, or downtime reasons to the central MES system. This lack of visibility created inefficiencies and made it impossible to measure and improve productivity against other internal production units.

## The FlowFuse Solution
Walter leveraged FlowFuse as the foundation of their standardized IoT infrastructure, creating a scalable platform that addresses their operational challenges through strategic implementation:

### Unified IoT Backbone Architecture
FlowFuse serves as the central nervous system for Walter's entire production data ecosystem. Rather than maintaining 20+ separate solutions, the team now deploys standardized Node-RED flows that can connect to any machine configuration. This unified approach enables consistent data collection, transformation, and routing across all production facilities while requiring minimal local customization.

![Standardized Node-RED flows](./images/stories/walter-flow.png "Standardized Node-RED flows"){data-zoomable}

### Cloud-First Security and Scalability
The team leveraged FlowFuse's Software-as-a-Service model to eliminate infrastructure management overhead. Device agents run securely at the shop floor level next to machines, with encrypted connections to the cloud platform. This approach enables their small IT team to manage 130+ Node-RED instances across multiple global locations without requiring dedicated infrastructure teams at each site. The best part: they still don't experience any bottlenecks, allowing them to continue scaling with the same team size.

### Industrial Application Platform
FlowFuse processes and routes production data to multiple systems including:

- **MES Integration:** Providing real-time machine status, runtime data, and downtime analysis
- **SAP Connectivity:** Enabling bidirectional data exchange for production planning and resource management
- **InfluxDB Storage:** Long-term historical data storage for trend analysis and optimization
- **Live Dashboards:** Real-time production visualization and monitoring for operators and management
- **Custom HMI Systems:** User interfaces for machine operators to input process parameters and quality data
- **SaaS Energy Management System:** Optenda collects power consumption of some machines directly from the FlowFuse Broker 

## Key Results

### Operational Efficiency

- **Scaled from 1 to 130+ Instances:** Achieved 13,000% growth in deployed Node-RED instances while maintaining the same IT team size
- **Unified Platform Architecture:** Replaced 5 fragmented dashboarding and machine connectivity solutions with a single, maintainable platform - more importantly, giving production units without any solution the ability to participate and benefit from the collective knowledge
- **Enabled Knowledge Sharing:** Onboarding new machines is often as simple as copying flow logic from one production unit and applying it to identical machines in another facility
- **Enabled Innovation Focus:** Freed IT team from pure maintenance mode to drive new capabilities and improvements

### Empowering Engineers with data access

- With FlowFuse, Walter IT can easily provide production engineers with direct access to their data. Using FlowFuse Dashboard they can visualize and explore the data by themselves, without additional effort from IT
- Engineers from different production units now exchange ideas and support each other in a collaborative way
<lite-youtube videoid="7nceTJrDnIo" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

### Competitive Advantage

- **Production Transparency:** Achieved full visibility into machine runtime, downtime, and performance metrics across all facilities
- **Benchmarking Capability:** Allows comparison and optimization of productivity across multiple production units within the organization
- **Rapid Deployment:** New production units can be connected and standardized in hours instead of months

### Resource Optimization

- **Team Efficiency:** Small IT team can now support global operations instead of being limited to single production units
- **Standardized Operations:** Consistent data collection and reporting across all facilities enables better decision-making
- **Business Responsiveness:** Can quickly respond to business requests for production connectivity and dashboards

## Technical Architecture

The solution architecture includes:

- **Device Agent Deployment:** Shop floor-level agents connecting directly to manufacturing equipment via OPC-UA and other industrial protocols
- **Encrypted Cloud Connectivity:** Secure communication between edge devices and FlowFuse cloud platform
- **Data Processing Pipelines:** Node-RED flows handling data transformation, validation, and routing to multiple downstream systems
- **Multi-System Integration:** Connections to MES, SAP, InfluxDB, custom dashboards, and HMI systems
- **Centralized Management:** Single platform for deploying, monitoring, and maintaining flows across 130+ instances globally
- **FlowFuse MQTT Broker** as a central Datahub for other systems (MES, SAP, InfluxDB, Energy Management System, Dashboards)
![Technical Architecture](./images/stories/waler-architecture.png "Technical Architecture"){data-zoomable}

## Looking Forward
Walter continues to expand their FlowFuse implementation, with plans to present their complete use case at Node-RED Conference, showcasing how they've built a measurement machine integration that demonstrates the full potential of their unified IoT platform for complex manufacturing workflows.