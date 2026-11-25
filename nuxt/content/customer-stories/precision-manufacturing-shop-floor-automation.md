---
title: How a Precision Manufacturer Tripled Shop Floor Automation With One Engineer
description: How Abrasive Technology, a precision manufacturer that builds its own production lines, builds and manages its shop floor software on FlowFuse across two plants.
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
    challenge: Custom-built production lines across two plants ran in-house software that was updated machine by machine, reached over a VPN under CMMC rules and maintained by one automation engineer.
    solution: FlowFuse became the platform where Abrasive builds and manages its production applications, with snapshot deployments to identical machines, one integration layer to the ERP and secure remote access without a VPN.
    products:
        - FlowFuse
        - FlowFuse Device Agent
        - FlowFuse Dashboard
        - FlowFuse Project Nodes
        - Node-RED
    results:
        - Fixes deployed while production runs, with one-step rollback
        - One update reaches every identical machine
        - One engineer covers the work of about three developers
        - ERP migration delivered across two plants with no new hires
        - New team members self-sufficient in about a month
---

Abrasive Technology, a precision manufacturer of superabrasive tools, builds its own production lines and writes the software that runs them. By building and managing that software on FlowFuse, it now updates every machine of a type in one step, fixes production issues without stopping the line and supports its UK plant from Ohio, with one engineer covering work that once took about three developers.

<!--more-->

## The company

[Abrasive Technology](https://www.abrasive-tech.com/) has made superabrasive tools and coatings for more than five decades. Brazed dental tools are its highest-volume product, and its precision grinding and coating work goes into aerospace engine programs at companies such as Rolls-Royce, Pratt & Whitney and GE. About 400 people work at its headquarters in Lewis Center, Ohio, and its plant in the UK.

Off-the-shelf equipment rarely fits its processes, so Abrasive designs and builds its own plating, brazing and masking lines, alongside a machine shop of around 50 CNCs. Each line runs on applications that control the equipment, drive the operator screens and exchange data with the ERP. Josh Dudley, who has automated Abrasive's processes for about 20 years, is responsible for all of them.

One masking machine, for example, uses a camera to look at each tool and sets its own program from what it sees.

![Operator screen on one of Abrasive's masking machines, with a live camera view of the tool being masked](./images/stories/abrasive-tech-dashboard.png "Operator screen on one of Abrasive's masking machines, with a live camera view of the tool being masked"){data-zoomable}

## The challenge

Abrasive has written its own automation software since 2012, when Dudley started running Node.js on Raspberry Pis. Node-RED followed in 2019, for control screens on robotic equipment. Those applications ran as standalone Node.js apps and Node-RED projects synced through GitHub. Each one worked, but managing them did not scale.

Updates went out one machine at a time. Dudley had just put seven identical dental tool masking machines into production, and every change had to be made on each one separately. A small miss on one machine meant mixed versions across the seven, and a bad update to a production machine can cost hours of output.

Remote access was harder still. Abrasive's aerospace work requires a CMMC-compliant network, which made VPN access to plant equipment difficult to run, and the UK plant needed regular support from Ohio. Connections between systems relied on credentials that had to be tracked down and fixed whenever something changed.

And all of it sat with one engineer. Adding people was not a quick fix.

> It's one thing to be able to hire a body. It's another thing to hire someone you can drop in. We do a lot of custom, niche work, and you don't just find somebody for that. I wouldn't have been able to get anyone up to speed in time.

## Why FlowFuse

Abrasive adopted FlowFuse in 2023. The alternative was to keep assembling separate tools for development, deployment, remote access and integration. FlowFuse put them in one place: applications built and run in one platform, central management of every device, snapshots that deploy to a group of identical machines and roll back when needed, secure remote access without a VPN, and applications that connect to each other inside one account.

Because FlowFuse runs Node-RED, Abrasive brought its existing applications across instead of starting over, and anyone with some coding background can learn it quickly.

## How it works today

Today 27 devices across both plants connect to PLCs, robots and machine controls over Modbus, TCP and serial, all managed through the [FlowFuse Device Agent](/docs/device-agent/introduction/) from one account. Many sit in sealed enclosures in the plating labs, where humidity and corrosion are constant, and updates reach them without anyone opening a box. Dashboards run on hosted instances in FlowFuse Cloud, managed in the same place.

Each device runs the application for its machine and talks to the equipment directly. On the Y-Press, the operator works from the current work order and sees live vacuum, temperature and pressure readings from the PLC over Modbus, with every run written to a log file.

![Y-Press machine screen showing the work order, live vacuum, temperature and pressure readings from the PLC over Modbus, and the process log](./images/stories/abrasive-tech-dashboard-2.png "Y-Press machine screen showing the work order, live vacuum, temperature and pressure readings from the PLC over Modbus, and the process log"){data-zoomable}

### Identical machines, one update

Each change is now made once. It's finished on one machine, saved as a [snapshot](/docs/user/snapshots/) and deployed to every machine of that type, so all seven masking machines get the same update without anyone logging into each one.

### Recipes in one place

Abrasive built an integration layer on FlowFuse between its ERP, Microsoft Dynamics Business Central, and the production applications. It holds the plating recipes and the calculations behind them, such as nickel deposition rates and how long each part stays in a tank. Every application works from the same values, and the plating applications use them to drive the equipment supplying current to each tank. Changes to this layer are made remotely in a weekend slot, when the lines are down.

### Both plants in one view

The timer applications that run Abrasive's electroplating processes publish their status through [Project Nodes](/docs/user/projectnodes/) and MQTT, so machine status and the current step of every running process, at either site, show up in one live view. Applications in the same account connect without credentials, so nobody has to chase passwords when something changes.

### Remote support under CMMC

FlowFuse connects securely to each device, so reaching plant equipment no longer depends on a VPN. The UK plant is supported day to day from Ohio, without travel: Dudley finds the device in one place and works on it directly.

## The test: a new ERP

The setup was put to the test when Abrasive moved to Business Central. Because the floor applications exchange data with the ERP every day, every one of them had to be reworked and redeployed before the switch, across both plants. With snapshots, a long list of manual updates became a handful of deployments, and the migration was delivered without a single new hire.

> When we moved to a new ERP, every application on our floor had to be updated to talk to it. FlowFuse let me roll those changes out across every device from one place, on my own and on schedule. Without it, this would have been nearly impossible.

## The results

Changing production software no longer puts output at risk. A recent bug in a plating timer application was fixed and deployed mid-shift, without stopping the line.

> I can fix an issue while the line is running, push the same update to every identical machine at once, and roll back in seconds if something's off. It turns changes on the plant floor from a risk into routine.

One engineer now builds and supports the applications on all 27 devices across both plants.

> There were about three developers here historically working on all the things I do by myself now.

That is two developer roles Abrasive didn't have to fill. At roughly $120,000 per role in salary and overhead, that comes to close to a quarter of a million dollars a year.

Less time goes into upkeep. With deployment, remote access and connections between systems handled by the platform, more of the week goes into using the data the machines already produce.

New people get productive quickly. Two interns who joined last summer were working independently within about a month.

FlowFuse is now the platform Abrasive's production runs on. Every shop floor application, in both plants, is built, deployed and supported through it.

## What's next

With the ERP migration behind it, Abrasive is turning to the data its plants already produce. It plans to bring process data now held in CSV files and Power BI reports onto the same platform, then build a production quality module and start applying AI to the data its applications collect.
