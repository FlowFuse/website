---
title: "What is a PLC ? History, How It Works, Types & Applications (2026)"
subtitle: "How Dick Morley's New Year's Day Hangover Changed Manufacturing Forever"
description: "Discover what PLCs are, how they work, and why 80% of global manufacturing still runs on Dick Morley's 1968 hungover invention. Plus: solving vendor lock-in"
date: 2025-12-26
keywords: what is plc, programmable logic controller, history of plc, father of plc, plc inventor, plc communication, 
authors: ["sumit-shinde"]
image: 
tags:
  - flowfuse
meta:
  faq:
    - question: "What is a PLC in simple terms?"
      answer: "A PLC (Programmable Logic Controller) is a rugged industrial computer used to control machines and processes. It reads signals from sensors, makes decisions based on a program, and turns equipment like motors, valves, or lights on and off automatically."

    - question: "Who invented PLC?"
      answer: "The PLC was invented in 1969 by a team led by Dick Morley at Bedford Associates. They developed the first PLC, known as the Modicon 084, in response to General Motors’ need for a programmable replacement for relay-based control systems."

    - question: "What are the types of PLC?"
      answer: "The main types of PLCs include micro PLCs for small tasks, compact PLCs with fixed I/O for simple machines, modular PLCs for large and complex systems, and safety PLCs designed specifically for safety-critical applications like emergency stops and machine guarding."

    - question: "Why use a PLC instead of a PC?"
      answer: "PLCs are used instead of PCs because they are built for real-time control and extreme industrial environments. They are more reliable, deterministic, resistant to heat, vibration, and electrical noise, and can run continuously for decades without crashes or unexpected updates."

    - question: "Where are PLCs used?"
      answer: "PLCs are used across a wide range of industries including automotive assembly, pharmaceuticals, food and beverage processing, water treatment, power generation, chemical plants, mining, distribution centers, and airport baggage systems. Essentially, any place where machines and processes need reliable, real-time automation relies on PLCs."

    - question: "What are the 7 main parts of a PLC?"
      answer: "The 7 main parts of a PLC are: 1) Power Supply – provides stable power; 2) Central Processing Unit (CPU) – executes the control program; 3) Input Modules – read signals from sensors and switches; 4) Output Modules – control actuators like motors and valves; 5) Programming Device – used to write and upload programs; 6) Communication Interface – allows the PLC to connect with other PLCs, HMIs, or SCADA systems; 7) Memory – stores the program and runtime data."
---


On New Year's Day 1968, [Dick Morley](https://en.wikipedia.org/wiki/Dick_Morley), also known as the “Father of the PLC,” woke up with a brutal hangover and did what any reasonable engineer might do: he invented the future of manufacturing. That morning, nursing what he later described as "a wicked headache," Morley wrote the complete specifications for the Programmable Logic Controller—a device that would replace entire relay-based control systems and become the invisible brain running modern industry.


<!--more-->

Before that hungover epiphany, changing how a factory operated meant physically rewiring thousands of electromagnetic relays. General Motors was bleeding money—weeks of downtime and millions in labor costs every time they needed to retool a production line. Morley's Modicon 084 replaced 20,000 mechanical components with a single box that could be reprogrammed in hours.

Today, PLCs control everything from the jet engines on your flight to the insulin in your pharmacy. They manage power grids, traffic lights, water treatment plants, and semiconductor fabs. Eighty percent of industrial automation worldwide runs on PLCs. It's a [$13 billion market](https://www.mordorintelligence.com/industry-reports/programmable-logic-controller-plc-market). And yet, most of us have never heard of them.

This article breaks down what PLCs actually are, traces their evolution from Morley's specs to modern systems, explains how they work under the hood, explores their real-world applications, and tackles the biggest challenge facing industrial automation today: getting PLCs from different manufacturers to actually talk to each other.

## What is a PLC (Programmable Logic Controller) ?

A Programmable Logic Controller is an industrial computer built for one job: controlling machines and processes in real-time with rock-solid reliability. Unlike your laptop or the servers running cloud applications, PLCs thrive in environments that would kill standard computers—extreme temperatures, constant vibration, electrical noise, dust, and humidity.

The concept is elegant in its simplicity. A PLC continuously monitors inputs from sensors and switches, executes control logic from its stored program, and updates outputs that control motors, valves, lights, and equipment. This happens in a repeating "scan cycle," typically thousands of times per second. Read inputs. Run logic. Update outputs. Repeat. Forever.

What sets PLCs apart isn't computing power—your phone vastly outperforms them. It's their deterministic behavior. When a PLC runs a program, it executes exactly the same way every single time. No operating system randomly running updates. No background processes stealing resources. No crashes. No reboots. In industries where failure means explosions, contaminated products, or fatalities, this predictability isn't a nice-to-have. It's survival.

The hardware reflects this zero-compromise approach. Industrial-grade components handle extreme temperatures and electrical interference. Power supplies absorb voltage swings that would fry consumer electronics. Input and output modules interface directly with industrial sensors and actuators at various voltages. The programming uses ladder logic and function blocks—visual languages mirroring the relay systems they replaced, designed for electricians and plant engineers rather than software developers.

This design has barely changed since Morley's 1968 specifications, and there's a reason: it works. When Siemens installs a PLC in a chemical plant, that system runs continuously for decades. When Rockwell Automation deploys controllers in automotive assembly, they execute millions of flawless cycles. Industrial automation doesn't embrace Silicon Valley's "move fast and break things." The motto here is simpler: never break.

## History of PLCs: From Relay Rooms to Smart Controllers

Before PLCs, factories were wired nightmares. Control logic lived in walls of electromagnetic relays—thousands of mechanical switches wired together to define how a machine behaved. Changing a production process meant physically rewiring control panels. Every model change brought weeks of downtime, armies of electricians, and staggering costs. One wrong wire could halt an entire plant.

![Pre-PLC industrial relay control cabinet used in factories before programmable logic controllers replaced hard-wired relay logic
](./images/pre-plc-relay-cabinet.jpg){data-zoomable}
_Pre-PLC industrial relay control cabinet used in factories before programmable logic controllers replaced hard-wired relay logic_

By the late 1960s, this inflexibility was becoming fatal—especially for automotive manufacturers. General Motors was bleeding money on production line retooling. Meanwhile, a young engineer named Dick Morley was running a small consulting company called Bedford Associates, helping machine tool firms upgrade to solid-state controls. The work paid well, but it was monotonous—each project essentially the same as the last.

On New Year's Day 1968, nursing a hangover and running two weeks late on yet another proposal, Morley decided there had to be a better way. That morning, he wrote a complete specification for what he called a "Programmable Controller"—a device that could replace relay logic, survive factory conditions, and be reprogrammed without rewiring. His specs were specific: no processing interrupts, direct memory mapping, rugged sealed design with heat sinks instead of fans, and a proprietary programming language (which would become ladder logic). One specification he'd later regret: he wanted it to operate slowly.

Morley took his memo to his team at Bedford Associates—Mike Greenberg, Jonas Landau, and Tom Boissevain. They got to work immediately, with one iron rule: never call it a computer. If Morley saw that word on any document, he'd throw it away. They built a rugged unit with metal fin heat sinks, completely sealed against factory environments. They named it the Model 084—Bedford's 84th project.

To commercialize the design, they needed investors. The team formed a new company in October 1968, calling it **Modicon**—short for Modular Digital Controller. Morley was never technically an employee, but he ran engineering. The Model 084 shipped in 1969, followed quickly by the Model 184, which fixed issues found in the original.

General Motors heard about Modicon's work and placed a million-dollar order. In November 1969, GM's Hydramatic Division took delivery of the first batch. General Electric followed with their own million-dollar order, planning to rebrand and sell the controllers as OEM units. Within a year of Modicon's founding, the PLC had gone from hungover memo to production deployment at the world's largest automaker.

![PLC Pioneers Richard Morley, Tom Bossevain, George Schwenk and Jonas Landau
](./images/First-modicon-084.png){data-zoomable}
_PLC Pioneers Richard Morley, Tom Bossevain, George Schwenk and Jonas Landau_

Morley always called himself the "Father" of the PLC rather than its "Inventor"—he knew others were working on similar solutions and believed the technology "invented itself out of necessity." Bedford Associates eventually dissolved to avoid tax complications after Modicon's success. Modicon was later acquired and is now owned by Schneider Electric, which still occasionally uses the number 84 on products as a tribute.

## How PLCs Work: Inside the Industrial Computer

Open a PLC cabinet on a factory floor and you'll find a metal box covered in wire terminals, mounted on a DIN rail, silently controlling millions of dollars of equipment. No monitor. No keyboard. No fan. Just a microprocessor executing the same loop it's been running since installation—sometimes for decades.

The entire operating model fits in one sentence: read sensors, run program, control outputs, repeat. That loop executes thousands of times per second with mechanical precision. It's not elegant. It's not exciting. But it's exactly what keeps production lines moving and chemical reactors stable.

### What's Actually Inside a PLC

**The CPU** runs your control program. Modern units use industrial microprocessors—nothing exotic, just chips designed for temperature extremes and long-term reliability. They're slower than your phone but infinitely more predictable. The CPU executes code the same way every single time. No background processes. No operating system deciding to update drivers mid-cycle. Just pure determinism.

**Input modules** interface with sensors. A temperature probe sends a 4-20mA signal. A limit switch closes a 24V circuit. A pressure transducer outputs 1-5V DC. The input module converts these industrial signals into numbers the CPU can process, while providing electrical isolation to prevent ground loops and noise from corrupting data.

**Output modules** control physical equipment. The CPU decides a motor should run, and the output module closes a relay or sends a signal to a motor starter. It translates digital logic into the industrial voltages needed to activate contactors, solenoids, and valves. Like inputs, isolation protects the CPU from the electrical violence of switching inductive loads.

**The power supply** handles whatever garbage voltage the plant feeds it—sags during motor starts, spikes from switching, harmonics from variable frequency drives—and outputs clean DC. It's rated for abuse because industrial power is chaos.

If you’re curious what this looks like in practice, this short video walks through it.

<lite-youtube videoid="ygd7JICvYYo" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="What's Inside PLC"></lite-youtube>

### The Scan Cycle

Every PLC runs the same four-step loop:

1. **Input scan**: Copy all sensor states into memory. This creates a snapshot—every input frozen at one moment in time.

2. **Program execution**: Run the control logic from start to finish using that snapshot. If temperature > 250°F, open cooling valve. If part detected AND quality check passed, advance conveyor.

3. **Output update**: Write all calculated outputs to physical modules. Motors start or stop. Valves open or close. But only after the entire program runs—no partial updates.

4. **Housekeeping**: Handle communications, diagnostics, error checking. Then start over immediately.

The full cycle typically takes 1-50 milliseconds depending on program complexity. A 10ms scan cycle means the PLC makes 100 complete decisions per second. It's been doing this in some facilities since the 1980s.

This approach eliminates entire classes of software bugs. Inputs can't change mid-program. Outputs can't update while logic is executing. Race conditions don't exist. The program runs in strict sequential order, identically, every scan.

### Programming Languages

PLCs don't use Python or C++. They use [IEC 61131-3](https://en.wikipedia.org/wiki/IEC_61131-3) languages designed for industrial electricians and control engineers.

**Ladder Logic** looks like relay wiring diagrams because it replaced relay logic. Horizontal lines represent power. Contacts (inputs) and coils (outputs) sit between them. An electrician who understood relay panels could program a PLC immediately. It's clunky for complex math but perfect for discrete control—if sensor A triggers and valve B is closed, start pump C.

**Function Block Diagrams** connect boxes representing timers, counters, math operations, and PID controllers. Data flows between blocks. It works well for process control where analog signals need continuous manipulation.

**Structured Text** handles complex calculations and algorithms. It looks like Pascal. Modern applications increasingly need it—ladder logic becomes unmanageable for sophisticated control strategies.

Each vendor implements these standards differently. Siemens uses TIA Portal. Rockwell has Studio 5000. Schneider offers Unity Pro. The languages are theoretically portable. The reality is vendor lock-in.

### Why PLCs Haven't Changed

Your phone has more processing power than any PLC in existence. Yet every new factory, water treatment plant, and production line still installs PLCs. Why?

Because reliability beats performance in industrial automation. A PLC controlling a gas turbine or pharmaceutical batch doesn't need gigahertz processors or gigabytes of RAM. It needs to execute the same logic flawlessly for 20 years while operating at 140°F in an environment with electrical noise, vibration, and dust.

Consumer computing optimizes for speed and features. Industrial computing optimizes for never failing. Ever. The scan cycle, the isolated I/O, the deterministic execution—these aren't limitations. They're the exact solution the problem requires.

That's why Morley's 1968 architecture still dominates. Not because the industry is conservative or backwards. Because he solved the problem correctly the first time.

## Types of PLCs: Picking the Right Controller

Not all PLCs are created equal. Walk through a factory and you’ll see shoebox-sized controllers running a single machine right next to rack-mounted systems managing entire production lines. While they all execute the same basic scan cycle, the hardware differs dramatically based on what they control.

### Compact PLCs

Compact PLCs integrate the CPU, I/O, and power supply into a single fixed unit. They typically handle 10–100 I/O points, making them ideal for packaging machines, pump stations, and HVAC systems. They are simple, cost-effective, and quick to deploy. Some models allow limited expansion through add-on I/O modules, but scalability is constrained. Once that limit is reached, upgrading to a modular PLC is usually required.  

**Examples:** Siemens S7-1200, Rockwell Micro800, Schneider Modicon M221

### Modular PLCs

Modular PLCs separate the CPU from the I/O modules, which are installed on expandable racks. Need hundreds of I/O points? Add modules. Need motion control, high-speed counting, or specialized communications? There is a dedicated module. This flexibility makes modular PLCs the standard for complex automation such as automotive assembly, chemical processing, and large material-handling systems. Costs typically range from $10,000 to well into six figures depending on scale and redundancy.  

**Examples:** Siemens S7-1500, Rockwell ControlLogix, Schneider Modicon M580

### Safety PLCs

Safety PLCs are designed to protect people and equipment. They control emergency stops, light curtains, safety interlocks, and other safety-critical functions using redundant processors and continuous self-diagnostics. Certified safety architectures achieve reliability levels as high as 10⁻⁸ failures per hour (SIL 3 / PLe). In most systems, safety PLCs operate alongside standard PLCs: production logic runs on the normal controller, while the safety PLC can override everything instantly when a hazard is detected. 

**Examples:** Pilz PNOZmulti, Siemens F-series, Rockwell GuardLogix

### Micro PLCs

Micro PLCs handle very small automation tasks, typically 8–20 I/O points, such as a single conveyor, pump, or sorter. They usually cost between $100 and $500 and are common in car washes, vending machines, irrigation systems, and compact OEM equipment. Programming is often simplified and focused on basic control logic rather than advanced automation features.

**Examples:** Unitronics, AutomationDirect CLICK, IDEC SmartRelay

### Choosing the Right PLC

Selecting a PLC comes down to I/O count, system complexity, safety requirements, and future expansion. Simple machines with fewer than 20 I/O points are well served by micro or compact PLCs. Production lines with hundreds of I/O points, motion control, or advanced networking typically require modular PLCs. Any application involving human safety must use a safety-rated controller, without exception. Most companies standardize on a single vendor—commonly Siemens or Rockwell—and stay with that ecosystem for decades, as switching platforms later is costly and disruptive.

## Where PLCs Actually Run: Real-World Applications

PLCs control processes where reliability isn't negotiable. They're not exciting. They're not visible. But they're running constantly in factories, utilities, and infrastructure—often for decades without replacement.

Automotive assembly lines use PLCs to coordinate welding robots, conveyors, and quality systems. A body shop might run 50+ PLCs managing hundreds of welds per vehicle. When manufacturers retool for new models, they reprogram the controllers instead of rewiring entire panels—exactly what GM needed in 1968.

Pharmaceutical production relies on PLCs for batch reactors where temperature and timing must stay within tight tolerances. Every parameter gets logged for regulatory compliance. If conditions drift outside specifications, the PLC flags the batch automatically. Food and beverage plants use them for mixing, cooking, and packaging lines. A bottling line coordinates filling, capping, labeling, and case packing—all controlled by PLCs running the same programs they've executed millions of times.

Water treatment plants use PLCs to manage pumps, chemical dosing, and filtration based on flow rates and quality sensors. These systems often run for 20-30 years, handling daily demand variations and responding to system changes automatically. Power substations rely on PLCs for load monitoring, breaker control, and grid coordination. When generation or demand shifts, controllers adjust in milliseconds to maintain stability.

Refineries and chemical plants use them in environments where control failures create safety hazards—managing temperatures, pressures, and emergency shutdown sequences. Distribution centers use PLCs to run conveyor networks, sorting systems, and automated storage. A package gets scanned, routed through the optimal path, and diverted to the correct lane—all coordinated by controllers managing thousands of decision points per hour.

Airport baggage systems are entirely PLC-controlled. Bags move from check-in through security screening to the correct carousel, sorted by destination and flight timing. Mining operations use PLCs for conveyors, crushers, and material separation running continuously with minimal supervision. The controllers monitor equipment health, adjust speeds based on material flow, and shut down automatically when sensors detect problems.

The common thread is long-term reliability in demanding environments. PLCs installed in the 1990s are still operating in many facilities. They execute the same control logic, respond to the same sensors, and drive the same equipment—scan after scan, year after year, exactly as designed.

## The Interoperability Problem: When PLCs Won't Talk

Dick Morley solved factory automation in 1968. But as PLC manufacturers raced to capture the market he created, they built incompatible proprietary ecosystems—and vendor lock-in became the industry's unintended legacy.

Every major PLC manufacturer built their own proprietary ecosystem. Siemens controllers speak different protocols than Rockwell. Schneider systems don't natively understand Mitsubishi. Walk into any facility and you'll find a mix of PLCs—legacy systems, new equipment, different vendors. They all need to exchange data. Temperature from the Siemens PLC needs to trigger an action on the Rockwell controller. Production counts need to feed from one system into another.

The traditional solution? Custom integration work. Hire specialized engineers. Write gateway applications. Deploy protocol converters. Maintain separate codebases for each connection. When something breaks, troubleshoot across multiple proprietary systems while production sits idle.

The cost isn't just technical debt. It's strategic paralysis. Companies stick with a single vendor not because they offer the best solution, but because switching is too painful.

## FlowFuse: Breaking the Integration Barrier

[FlowFuse](/), built on [Node-RED](/node-red/), solves the protocol chaos that vendor lock-in created. Node-RED emerged from IBM in 2013, created by [Nick O'Leary](https://www.linkedin.com/in/nickoleary/) (now CTO of FlowFuse) and [Dave Conway-Jones](https://github.com/dceejay) as a visual programming tool for connecting devices and APIs—drag nodes onto a canvas, wire them together, deploy. The industrial community built protocol nodes for Modbus, Profinet, EtherNet/IP, S7comm, OPC UA, and more. It became the universal translator for industrial systems.

![FlowFuse platform for industrial data integration connecting PLCs, Node-RED, and enterprise systems
](./images/flowfuse-platform.png){data-zoomable}
_FlowFuse platform for industrial data integration connecting PLCs, Node-RED, and enterprise systems_

A single Node-RED instance can simultaneously communicate with Siemens S7 PLCs, Rockwell ControlLogix systems, Modbus devices, MQTT brokers, and IT systems like databases, APIs, and cloud platforms. The data flows visually. Changes deploy instantly. No compilation. No downtime. It bridges the operational technology (OT) on the factory floor with information technology (IT) systems—connecting PLCs not just to each other, but to ERP systems, historians, dashboards, and analytics platforms.

FlowFuse adds the enterprise infrastructure: centralized management across hundreds of edge devices, version control and rollback, role-based access, audit logging, and security at every layer. Build one flow that reads from Siemens PLCs and deploy it to every facility. When something changes, update once and push the change everywhere. Edge instances run locally even if network connections drop.

FlowFuse doesn't replace your PLCs. It connects them. That Rockwell controller keeps running its proven logic. The Siemens system continues its scan cycle. What changes is the integration layer that lets isolated systems finally communicate.

A [large US manufacturing company](/customer-stories/manufacturing-digital-transformation/) with over 10,000 employees uses FlowFuse to manage thousands of Node-RED instances deployed across global facilities. These instances collect data from sensors, PLCs, and cameras on production lines, enabling them to transition from paper-based operations to real-time data visibility. A team of five developers—former manufacturing engineers, not software specialists—built hundreds of applications using Node-RED's visual programming. FlowFuse now manages deployment to thousands of remote devices and maintains multiple versions across all instances, solving what had become an unmanageable tracking challenge as they scaled.

Start small. Node-RED is open source. Connect two different PLC brands as a proof of concept. FlowFuse scales from there—one production line, then more sites, running on-premises or in the cloud as needs dictate.

Want to see how FlowFuse handles PLC integration in your environment? [Book a demo](/book-demo/) with our team—we'll connect to your mixed-vendor systems and show you what's possible in under an hour.

Dick Morley's hungover epiphany gave us PLCs that could be reprogrammed without rewiring. FlowFuse extends that flexibility to integration—connecting different systems without vendor permission and finally breaking the proprietary barriers Morley never intended to create.
