---
title: "How we Built a Smart Manufacturing Order Execution Panel with FlowFuse"
subtitle: "Control and track manufacturing orders with FlowFuse"
description: "This blog shows how I built a panel using FlowFuse to connect with Odoo ERP. It starts production, checks for raw materials, updates order status, and stops when the target is reached."
date: 2025-07-03
authors: ["sumit-shinde"]
image: /blog/2025/07/images/how-we-built-smart-order-manufacturing-system.png
keywords: manufacturing execution system, odoo erp integration, flowfuse manufacturing, smart manufacturing panel, production order tracking, connect shop floor to erp, industry 4.0, factory automation, digital manufacturing workflow, plc integration with erp, odoo node-red integration, real-time production monitoring
tags:
   - flowfuse
   - mes
---

A few days ago, I had a conversation with a solution architect about how the lack of integration between the shop floor and business systems often leads to missed opportunities and financial losses. He also mentioned that while many manufacturers want to bridge this gap, they often hesitate — mostly due to concerns about complexity of integration or fear of disrupting existing operations.

<!--more-->

But there is no need to be afraid. In this blog, I will walk you through a simple demo that shows how easy it can be to connect production systems with your ERP. With just a small integration, you can improve visibility, avoid manual errors, and prevent unnecessary losses.

To demonstrate this, I built a smart Manufacturing Order (MO) execution panel using FlowFuse, connected to ERP.

Let’s take a closer look.

## Demo: Smart Manufacturing Order Execution Panel in Action

<lite-youtube videoid="M_CIoHiSW6s" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

In this demonstration, an operator starts by selecting a Manufacturing Order (MO) from a list pulled directly from Odoo ERP. The system immediately checks if enough raw materials are available for that specific order.

If the materials are ready, production begins, and the MO status in Odoo is automatically updated to In Progress. The system then tracks the production count in real time. However, if materials are missing, production won’t start, and the operator is notified instantly. Once the produced quantity matches the target, the system automatically stops the line and marks the MO as Done in Odoo, completing the cycle without manual intervention.

## How It Works: Behind the Scenes

To build this system, I used **FlowFuse** to create a Node-RED flow that connects to **Odoo ERP** and controls a simulated production line.

### System Components

- **Odoo ERP**  
  Holds Manufacturing Orders, product details, and inventory data. This integration allows for a two-way conversation between the shop floor and the business's core planning system. For a detailed guide on how to read from and write to Odoo, you can read our article, [Connect Your Shop Floor to Your ERP – Odoo Edition](/blog/2025/06/connect-shop-floor-to-odoo-erp-flowfuse/)

- **FlowFuse**  
  Executes logic such as fetching manufacturing orders, checking material availability, updating statuses, controlling production, and building the operator interface.

- **Simulated Production Line (Factory I/O)**  
  Acts as the shop floor. Starts and stops production based on FlowFuse commands.

- **PLC**  
  Receives commands from FlowFuse and controls the actual machinery or simulated production environment.

- **S7 Protocol (S7Comm)**  
  This is the protocol used to communicate with Siemens S7 series PLCs. We use Node-RED nodes within FlowFuse to send control commands (e.g., start/stop production) and read critical data (e.g., produced quantity, machine status) directly from the PLC’s memory blocks. To learn exactly how to set this up, check out our step-by-step tutorial, [Getting Started: Integrating Siemens S7 PLCs with Node-RED](/blog/2025/01/integrating-siemens-s7-plcs-with-node-red-guide/)

Below is the full Node-RED flow that powers this smart manufacturing execution panel.



### Workflow Breakdown

```mermaid
sequenceDiagram
    participant Operator
    participant FlowFuse
    participant Odoo
    participant PLC
    Operator->>FlowFuse: Select MO
    FlowFuse->>Odoo: Fetch MO details
    Odoo-->>FlowFuse: Return MO + Material info
    alt Materials Available
        FlowFuse->>Odoo: Update MO to "In Progress"
        FlowFuse->>PLC: Start production
        loop While producing
            PLC-->>FlowFuse: Report produced quantity
        end
        FlowFuse->>PLC: Stop production
        FlowFuse->>Odoo: Update MO to "Done"
    else Materials Not Available
        FlowFuse-->>Operator: Notify: Cannot start
    end
```

1. **Fetch Manufacturing Orders**  
   The system pulls a list of *confirmed* or *in progress* MOs from Odoo using HTTP requests with help of Odoo node.

2. **Check Raw Material Availability**  
   When an operator selects an MO, FlowFuse checks if enough raw materials are available in Odoo.

3. **Start Production**  
   If materials are available:  
   - The MO status is updated to *In Progress*  
   - The simulated line starts producing

4. **Track Quantity in Real Time**  
   As the line runs, FlowFuse keeps track of the produced quantity.

5. **Stop and Complete the MO**  
   When the produced quantity matches the MO target:  
   - FlowFuse sends a stop command to the PLC  
   - The MO status in Odoo is updated to *Done*

### Why This Matters for Business

This demo might seem simple, but it solves some of the most common and expensive problems on the shop floor. Think about the daily headaches: an operator starts a big job, only to find out halfway through that a key material is missing, forcing the entire line to stop. Or, they produce 10% more than the order required, creating waste that just sits in inventory.

This smart panel is designed to prevent those exact scenarios. By connecting your production line directly to your business systems, it:

* **Prevents material shortages** by automatically checking for raw materials before a job can even start.
* **Eliminates overproduction** by stopping the line the moment the target quantity is hit.
* **Gets rid of manual data entry** by instantly updating the order status in the ERP.

This means managers get a live, accurate view of what’s happening on the floor, not data from hours ago. The best part is that you don't need to overhaul your entire operation or buy a huge, complex system to get these benefits. A smart, focused integration like this can deliver real results, quickly.

## Ready to Connect Your Shop Floor?

This demo shows how even a small, targeted integration between your production line and ERP can eliminate manual errors, reduce waste, and improve visibility — without overhauling your entire system.

If you are exploring how to bring these kinds of improvements to your manufacturing operations, let’s talk.

We’d be happy to discuss how FlowFuse can help you build custom, scalable solutions tailored to your factory’s needs.

👉 [Get in touch with us](/contact-us/)
