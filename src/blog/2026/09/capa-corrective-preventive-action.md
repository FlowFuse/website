---
title: "CAPA: Corrective and Preventive Action Process, Examples, and Effectiveness"
metaTitle: "CAPA: Corrective and Preventive Action Guide"
subtitle: "What CAPA means, how corrective and preventive action differ, and how to verify an action actually worked."
description: "Learn what CAPA means, how corrective and preventive actions work, common CAPA process steps and examples, and how to verify that an action was effective."
date: 2026-09-01
authors: ["sumit-shinde"]
image:
tags:
  - flowfuse
tldr:
  - "CAPA stands for Corrective Action and Preventive Action: corrective action fixes the cause of a problem that already happened, preventive action addresses the cause of one that hasn't happened yet."
  - "Both processes depend on a real root cause investigation, not just the first plausible explanation, and neither is complete until effectiveness is verified with evidence."
meta:
  faq:
  - question: "What does CAPA stand for?"
    answer: "CAPA stands for Corrective Action and Preventive Action."
  - question: "What is a CAPA in quality management?"
    answer: "In quality management, a CAPA is a documented process for investigating a nonconformity or potential nonconformity, identifying its root cause, implementing an action that addresses that cause, and verifying that the action was effective before closing it out."
  - question: "What are the 7 steps of CAPA?"
    answer: "Frameworks number the steps differently, but a common 7-step breakdown is: identify and describe the nonconformance, contain the immediate problem, investigate the root cause, determine the corrective or preventive action, implement the action, verify its effectiveness, and document and close the CAPA. This article's corrective action process covers the same ground in five steps, treating containment as a separate activity rather than a formal CAPA step."
  - question: "Is CAPA part of Six Sigma?"
    answer: "CAPA isn't a Six Sigma tool itself, but the two overlap heavily. Six Sigma's DMAIC framework and root cause tools like 5 Whys and fishbone diagrams are commonly used during a CAPA investigation, and Six Sigma improvement projects often produce corrective actions as an output."
  - question: "How does FlowFuse support CAPA?"
    answer: "FlowFuse connects data from machines, PLCs, databases, and quality systems so manufacturers can use production data as part of their existing CAPA process. It helps standardize data collection and quality-event workflows, automate routine steps like detecting production events and sending notifications, and support investigations and effectiveness checks with production data linked to the quality issue."
---

Quality problems cost time and money, and quality teams need a structured way to address problems that have already occurred and risks that could lead to future problems. Corrective and Preventive Action (CAPA) provides that structure.

<!--more-->

It's a core part of quality management in standards such as [ISO 9001](https://www.iso.org/standard/62085.html) and [ISO 13485](https://www.iso.org/standard/59752.html), but determining whether an action actually worked can be difficult when teams rely on manually updated records. Connecting shop-floor data to quality workflows, with platforms like [FlowFuse](/), can give teams objective production data to support investigations and effectiveness checks.

This article explains the difference between corrective and preventive action, how each process works, where CAPA systems break down, and how [FlowFuse supports CAPA](#how-flowfuse-supports-capa) with connected production data.

## What Is Corrective Action and Preventive Action?

Corrective action is the action taken to eliminate the cause of an existing nonconformity and prevent it from recurring.

Preventive action is the action taken to address the cause of a potential nonconformity before it occurs.

Under ISO 9001:2015, corrective action is addressed in **Clause 10.2**. Preventive action is no longer a standalone requirement; the 2015 revision incorporated prevention into the standard's risk-based thinking approach. Quality teams may still use preventive action as part of their risk management practices.

### A Simple Example

Say a machine's cutting tool wears down and starts producing parts outside tolerance. Replacing the worn tool and changing the maintenance interval to prevent the same failure from recurring is corrective action because it addresses an actual defect and its cause.

If a technician notices during a routine check that a different tool on a similar machine is wearing faster than expected and replaces it before it produces a bad part, that's preventive action. No defect has occurred; the action addresses a potential failure.

This is the same logic behind [preventive maintenance programs](/blog/2025/09/preventive-maintenance-equipment-failure/) and [poka-yoke, or mistake-proofing](/blog/2025/09/poka-yoke-mistake-proofing/): both aim to prevent a failure before it produces a defect.

Fixing the immediate bad parts, such as scrapping them or sorting the batch, is neither. That's [containment](/blog/2026/08/containment-action/). Containment limits the immediate impact, while corrective and preventive actions address the cause.

## Root Cause Analysis

Corrective and preventive actions depend on understanding why a problem occurred or could occur. Stopping at the first plausible explanation can result in a fix that addresses the symptom while leaving the underlying cause in place.

A few methods cover most cases:

* **[5 Whys](/blog/2025/12/five-whys-root-cause-analysis-definition-examples/):** Ask "why" repeatedly, with each answer guiding the next question, until you reach an actionable cause rather than restating the symptom.
* **[Fishbone (Ishikawa) diagram](/blog/2026/07/ishikawa-fishbone-diagram/):** Maps potential causes across categories such as people, methods, materials, and equipment. It's useful when a problem may have several contributing causes.
* **Fault tree analysis:** Works backward from a failure, breaking it into the combination of conditions that had to be present for it to occur. It's commonly used for complex or safety-critical processes; NASA's [Fault Tree Handbook](https://s3vi.ndc.nasa.gov/ssri-kb/static/resources/Fault%20Tree%20Handbook_NASA.pdf) is a widely cited reference for the method.

The investigation should draw on multiple sources of evidence, including process records, operator interviews, maintenance logs, and inspection results. A problem can have more than one contributing cause, so addressing only one may not prevent recurrence.

## Corrective Action vs. Preventive Action: Comparison

| Aspect        | Corrective Action                                    | Preventive Action                            |
| ------------- | ---------------------------------------------------- | -------------------------------------------- |
| Trigger       | A nonconformity has occurred                         | A potential nonconformity is identified      |
| Objective     | Prevent recurrence                                   | Prevent occurrence                           |
| Timing        | Reactive                                             | Proactive                                    |
| Common inputs | Nonconformities, complaints, defects, audit findings | FMEA, risk assessments, trends, near misses  |
| Common tools  | 5 Whys, root cause analysis                          | FMEA, risk assessment, trend analysis        |
| Example       | Investigating and fixing a failed batch              | Replacing a fixture before it causes defects |

The key difference is **when the action is taken**: corrective action responds to an existing problem, while preventive action addresses a potential one.

## The Corrective Action Process

A corrective action process typically follows these five steps:

1. **Identify and document the nonconformance.** Record what happened, when it happened, and any immediate containment taken.

2. **Investigate the cause.** Use an appropriate root cause analysis method and gather enough evidence to understand why the nonconformity occurred.

3. **Determine the appropriate response.** The severity and impact of the problem determine the response, which can range from changing a process to scrapping product, notifying customers, or initiating a recall.

4. **Implement the action.** Address the identified cause rather than only correcting the defective output.

5. **Verify effectiveness.** Monitor the relevant process or quality indicator to confirm that the action achieved its intended result before closing the CAPA.

## The Preventive Action Process

Preventive action follows a similar structure, but starts with a potential failure rather than an existing nonconformity:

1. **Identify potential failure points.** Use FMEA, near-miss trends, maintenance logs, or process capability data to identify where a nonconformity could occur.

2. **Assess and prioritize risk.** Evaluate likelihood and severity to determine which risks require action.

3. **Implement the preventive measure.** This might mean changing a maintenance schedule, modifying a process, updating work instructions, or adding mistake-proofing.

4. **Monitor the result.** Track the relevant process or risk indicator to determine whether the preventive measure achieved its intended result.

5. **Document the action.** Record the identified risk, action taken, and evidence that the measure was effective.

Both processes can follow the **Plan-Do-Check-Act (PDCA)** cycle: plan and investigate, implement the action, check whether it worked, then apply what was learned.

## Where CAPA Systems Break Down

A CAPA process can look complete on paper and still fail to solve the underlying problem. One common issue is that teams focus on forms and approval chains instead of collecting enough evidence during the investigation. Another is stopping at the first plausible cause and moving directly to a fix.

Even when the right action is identified, closing the CAPA without objective evidence can make it difficult to determine whether the change actually worked.

A strong CAPA process needs clear ownership, an evidence-based investigation, and a defined effectiveness check. Production data can support this. For example, [SPC charts](/blog/2025/07/quality-control-automation-spc-charts/) built from live process data can show whether a corrective action actually shifted a process back into control.

## How FlowFuse Supports CAPA

CAPA work can involve data from machines, PLCs, databases, and quality systems. [FlowFuse](/) connects these systems so manufacturers can use production data as part of their existing quality processes.

Manufacturers can use FlowFuse to:

- **Connect production and quality data** across machines, [PLCs](/landing/plc/), [databases](/node-red/database/), and other factory systems.
- **Standardize workflows** for [collecting data](/use-cases/data-integration/), handling quality events, and following up on corrective actions.
- **Automate routine steps** such as [detecting production events](/use-cases/production-monitoring/), sending [notifications](/node-red/notification/), and passing data between systems.
- **Support investigations and effectiveness checks** with production data linked to the quality issue.
- **Scale across lines and plants** by reusing integrations and workflows instead of creating separate solutions for each operation.
- **Build custom applications** for [quality dashboards](/blog/2026/08/manufacturing-dashboard-examples/#_4-quality-dashboard-defect-quality-monitoring), alerts, forms, and other workflows without replacing existing manufacturing systems.

This lets manufacturers connect CAPA processes to the systems already running their production operations, while keeping the same approach across different lines and plants.

## Tracking CAPA Effectiveness

Closing a CAPA does not mean the problem is solved. Teams need to check whether the action actually worked.

Useful measures include CAPA cycle time, recurrence rate, overdue actions, and recurring root causes. A [Pareto chart](/blog/2025/08/pareto-chart-manufacturing-guide/) can help identify which causes need attention, while [MTTF, MTBF, and MTTR](/blog/2025/12/mttf-vs-mtbf-vs-mttr/) can help measure the effect of corrective actions on equipment reliability.

The quality of these measures depends on the data behind them. Production records, process measurements, machine states, and maintenance history can give teams the evidence they need to investigate a problem and confirm that the action was effective.

## CAPA in Regulated Industries

In medical device, pharmaceutical, and aerospace manufacturing, CAPA is an important part of quality management and regulatory compliance. The specific requirements vary by industry and standard.

For medical device manufacturers, ISO 13485 includes requirements for corrective and preventive action within the quality management system.

In the United States, the FDA's **Quality Management System Regulation (QMSR)** became effective on February 2, 2026. The QMSR incorporates ISO 13485:2016 by reference into 21 CFR Part 820, aligning the FDA's medical device quality system requirements more closely with the international standard.

For regulated manufacturers, CAPA activities should connect to appropriate risk management, documented investigations, and objective evidence. Effectiveness checks should demonstrate that an action achieved its intended result rather than simply showing that the action was completed.
