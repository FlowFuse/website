---
title: How a Precision Manufacturer Tripled Shop Floor Automation With One Engineer
description: How Abrasive Technology, a precision manufacturer, runs shop floor automation across two plants with one engineer, and moved to a new ERP without hiring.
image: /images/stories/abrasive_tech.jpg
date: 2026-11-25
usecase:
  - production-monitoring
logo:
hubspot:
    formId: 8569c8e2-ceca-4817-98bf-4d6cc591e93d
story:
    brand: Abrasive Technology
    url: https://www.abrasive-tech.com/
    logo: /images/stories/logos/abrasive-tech-logo-4.png
    quote: "FlowFuse gives our plants one place to build, deploy and manage the applications that run all of it. I could build out a bigger team to keep up, or I can deliver what the business needs right now with FlowFuse."
    quoteAuthor: Josh Dudley
    quoteRole: Manufacturing and Automation Engineer
    challenge: A move to Microsoft Dynamics Business Central meant reworking every production application across two plants, with one automation engineer, no time to hire and machine-by-machine updates.
    solution: FlowFuse became the control layer for Abrasive's production applications, with snapshot deployments to identical machines, a single integration layer to the ERP and secure remote access that fits CMMC.
    products:
        - FlowFuse
        - FlowFuse Device Agent
        - FlowFuse Dashboard
        - FlowFuse Project Nodes
        - Node-RED
    results:
        - One engineer covers the work of about three developers
        - Close to $250,000 a year in developer costs avoided
        - ERP migration delivered across two plants with no new hires
        - Fixes deployed while production runs, with one-step rollback
        - New team members self-sufficient in about a month
---

Abrasive Technology, a precision manufacturer with plants in Ohio and the UK, had one automation engineer when it replaced its ERP. Every application connecting its shop floor to the old system had to be reworked. Using FlowFuse, that engineer did it without new hires, and today he covers work that once needed about three developers.

<!--more-->

## The company

[Abrasive Technology](https://www.abrasive-tech.com/) is a mid-sized manufacturer that has made superabrasive tools and coatings for more than five decades. The company was built around a niche market and a specific patent. Brazed dental tools are its highest-volume product, and its precision grinding and coating work goes into aerospace engine programs at companies such as Rolls-Royce, Pratt & Whitney and GE. It also serves medical, industrial, oil and gas and automotive customers. Abrasive employs about 400 people across its headquarters in Lewis Center, Ohio, and a plant in the UK.

Its processes are specialized enough that off-the-shelf equipment rarely fits. Alongside a machine shop of around 50 CNCs, Abrasive designs and builds its own plating, brazing and masking lines. Each line depends on applications that control the equipment, give operators their screens and exchange data with the ERP. Josh Dudley, who has spent about 20 years automating Abrasive's processes, is responsible for all of them.

Among that equipment is a masking machine that uses a camera to look at each tool and sets its own program from what it sees. Its operator screen shows the camera view beside the machine controls.

![Operator screen on one of Abrasive's masking machines, with a live camera view of the tool being masked](./images/stories/abrasive-tech-dashboard.png "Operator screen on one of Abrasive's masking machines, with a live camera view of the tool being masked"){data-zoomable}

## The ERP migration

The applications on the floor exchange data with the ERP every day, so the move to Microsoft Dynamics Business Central was not only an office project. Each application had to be reworked and redeployed before the switch, and a bad update to a production machine can cost hours of output.

Bringing in more developers was not an option, as Dudley explains.

> It's one thing to be able to hire a body. It's another thing to hire someone you can drop in. We do a lot of custom, niche work, and you don't just find somebody for that. I wouldn't have been able to get anyone up to speed in time.

Updates were also going out one machine at a time. Dudley had just put seven identical dental tool masking machines into production, and each change had to be applied to each machine separately. It was easy to overlook a small detail on one of them and end up with mixed versions across the seven.

Remote access was a separate problem. Abrasive's aerospace work requires a CMMC-compliant network, which made VPN access to plant equipment harder to run. The UK plant still needed regular support from Ohio.

## Why FlowFuse

Abrasive has written its own automation software for years. Dudley started running Node.js on Raspberry Pis for machine automation and monitoring in 2012, and Node-RED arrived in 2019 with a project to build control screens for robotic automation equipment.

Before FlowFuse, those production applications ran as standalone Node.js web apps and Node-RED projects synced through GitHub. Each piece worked, but keeping them in step was manual. Updates meant logging into each device, remote access depended on a VPN, and connections between systems relied on credentials that had to be tracked down and fixed whenever something changed. That was manageable with a handful of machines. By the time the ERP project arrived, Abrasive had outgrown it.

Abrasive adopted FlowFuse in 2023, just as the ERP rework began. The alternative was to keep assembling separate tools for deployment, remote access and integration. FlowFuse put them in one place: central management of every device, snapshots that can be deployed to a group of identical machines and rolled back, secure remote access without a VPN, and applications that connect to each other inside one account. Because FlowFuse runs Node-RED, Abrasive brought its existing applications with it instead of starting over, and anyone with some coding background can learn it quickly.

## How it works today

Today 27 devices across both plants are connected to PLCs, robots and machine controls over Modbus, TCP and serial, and all of them are managed through the [FlowFuse Device Agent](/docs/device-agent/introduction/) from one account. Many sit in sealed enclosures in the plating labs, where humidity and corrosion are constant, and updates reach them without anyone opening a box. Abrasive also runs hosted instances in FlowFuse Cloud for its dashboards, managed in the same place.

Each device runs the application for its machine and talks to the equipment directly. On the Y-Press, the operator works from the current work order and sees live vacuum, temperature and pressure readings pulled from the PLC over Modbus, with every run written to a log file.

![Y-Press machine screen showing the work order, live vacuum, temperature and pressure readings from the PLC over Modbus, and the process log](./images/stories/abrasive-tech-dashboard-2.png "Y-Press machine screen showing the work order, live vacuum, temperature and pressure readings from the PLC over Modbus, and the process log"){data-zoomable}

### Identical machines, one update

Abrasive now makes each change once. The change is finished on one machine, saved as a [snapshot](/docs/user/snapshots/) and deployed to every machine of the same type, so all seven masking machines get the same update without anyone logging into each one. During the ERP rework, this turned a long list of manual updates into a single deployment. For Dudley, that is what made the migration possible.

> When we moved to a new ERP, every application on our floor had to be updated to talk to it. FlowFuse let me roll those changes out across every device from one place, on my own and on schedule. Without it, this would have been nearly impossible.

### Recipes in one place

Abrasive built an integration layer on FlowFuse between Business Central and the production applications. It holds the plating recipes and the calculations behind them, such as nickel deposition rates and how long each part stays in a tank. Every application works from the same values, and the plating applications use them to drive the equipment supplying current to each tank. Changes to this layer are made from home in a weekend slot, when the lines are down.

### Both plants in one view

The timer applications that run Abrasive's electroplating processes publish their status through [Project Nodes](/docs/user/projectnodes/) and MQTT. Machine status and the current step of every running process, at either site, show up in one live view. Applications in the same account connect to each other without credentials, so nobody has to track down and fix passwords when something changes.

### Remote support under CMMC

FlowFuse provides a secure connection to each device, so reaching plant equipment no longer depends on a VPN. The UK plant is supported day to day from Ohio without travel. Dudley finds the device he needs in one place and works on it directly.

## The results

Abrasive delivered the ERP migration without a single new hire. One engineer reworked and redeployed every affected application across both plants, and the same engineer now supports all 27 devices day to day. Dudley compares that with how the work used to be staffed.

> There were about three developers here historically working on all the things I do by myself now.

That is two developer roles Abrasive did not have to fill. At roughly $120,000 per role in salary and overhead, that comes to close to a quarter of a million dollars a year.

Changing production software no longer puts output at risk. A recent bug in a plating timer application, for example, was fixed and deployed mid-shift without stopping the line. Dudley sums up the difference.

> I can fix an issue while the line is running, push the same update to every identical machine at once, and roll back in seconds if something's off. It turns changes on the plant floor from a risk into routine.

Less engineering time goes into upkeep. With deployment, remote access and connections between systems handled by the platform, more of the week goes into using the data the machines already produce and less into keeping applications running.

New people get productive quickly. Two interns who joined last summer were working independently within about a month.

FlowFuse is now the platform Abrasive's production runs on. Every application on the shop floor, in both plants, is deployed, updated and supported through it.

## What's next

With the ERP migration behind it, Abrasive is turning to the data its plants already produce. It plans to bring process data now held in CSV files and Power BI reports onto the same platform, then build a production quality module and start applying AI to the data its applications collect.
