---
title: "CQI-9 Heat Treat System Assessment: What Auditors Look For"
metaTitle: "A Practical Guide To Passing Your CQI-9 Heat Treat Audit"
subtitle: "The process tables, job audits, and calibration records a CQI-9 heat treat assessment reviews, and how CQI-9 fits into the AIAG special process family."
description: "FlowFuse breaks down what a CQI-9 heat treat system assessment reviews, from process tables and job audits to the calibration records auditors verify."
date: 2026-10-05
authors: ["sumit-shinde"]
image: /blog/2026/10/images/cqi-9.png
keywords: "cqi-9, cqi-9 heat treat system assessment, cqi-9 audit, heat treat audit, aiag cqi-9"
tags:
  - flowfuse
  - posts
tldr:
  - "Documentation Drives Audit Readiness: A CQI-9 heat treat assessment reviews calibration records, system accuracy tests, and temperature uniformity surveys alongside the physical process."
  - "Related Standards Overlap: Facilities running plating, coating, soldering, or molding alongside heat treat may need to satisfy CQI-11, CQI-12, CQI-17, or CQI-23 in addition to CQI-9."
  - "Consistency Across Sites Matters: Multi-plant manufacturers need consistent documentation and process controls across the facilities performing heat treat."
meta:
  faq:
    - question: "What is a CQI-9 assessment?"
      answer: "CQI-9 is the AIAG Special Process: Heat Treat System Assessment. It provides a common approach for evaluating heat treat management systems and covers the most common heat treat processes used in the automotive industry. The 4th Edition also includes additional best practices, modified requirements, and clarifications for organizations conducting their own self-assessments."
    - question: "What does a CQI-9 assessment cover?"
      answer: "A CQI-9 assessment evaluates heat treat processes and the systems used to control them. Depending on the process, this includes applicable process tables, pyrometry, calibration, system accuracy testing, temperature uniformity surveys, and other process controls. The 4th Edition specifically updated requirements related to pyrometry, calibration, SAT, and TUS."
    - question: "How often does a CQI-9 assessment need to be performed?"
      answer: "CQI-9 is intended for organizations to conduct self-assessments of their heat treat management systems. The specific frequency can depend on customer-specific requirements and the organization's quality system, so manufacturers should confirm the applicable interval for their operations."
    - question: "Who can conduct a CQI-9 assessment?"
      answer: "CQI-9 includes requirements for assessor qualifications. The 4th Edition specifically refined the qualifications for conducting a Heat Treat System Assessment, so organizations should use the current CQI-9 requirements when determining who can perform the assessment."
    - question: "Is CQI-9 mandatory for all automotive suppliers?"
      answer: "No. CQI-9 is a special process assessment for automotive heat treat operations, but whether a supplier is required to complete it depends on applicable customer and contractual requirements. Suppliers should confirm the specific requirements that apply to their operations and customers."
    - question: "Does CQI-9 apply to service parts?"
      answer: "Yes. AIAG describes CQI-9 as a common approach to a heat treat management system for automotive production and service part organizations."
    - question: "What records should be available for a CQI-9 assessment?"
      answer: "Records should demonstrate that applicable heat treat processes and supporting controls are being maintained. Depending on the process, this can include calibration records, system accuracy tests, temperature uniformity surveys, pyrometry records, process documentation, and job audit records."
cta:
  type: demo
  title: "Stop Rebuilding Audit Evidence From Spreadsheets"
  description: "See how FlowFuse captures furnace data, calibration status, and process records during normal production, so every site has the evidence ready before the auditor asks."
---

A CQI-9 assessment looks beyond final part quality. Auditors review whether heat treat processes are controlled as documented, including process tables, job audits, system accuracy tests, temperature uniformity surveys, and calibration records. For manufacturers running heat treat across multiple plants, those records also need to remain consistent and traceable to specific equipment and dates.

<!--more-->

This article breaks down what a CQI-9 heat treat system assessment reviews, which records auditors scrutinize most, and how CQI-9 fits into the broader family of AIAG special process assessments.

## What A CQI-9 Heat Treat Assessment Actually Reviews

A CQI-9 heat treat audit does not stop at final part inspection. Auditors walk through process tables for the specific method in use, whether that is carburizing, nitriding, or induction hardening, and check that documented parameters match what the equipment is actually running. Job audits follow individual parts through the process to confirm that time, temperature, and atmosphere controls hold up in practice, not just on paper. The assessment itself was developed by the [Automotive Industry Action Group](https://www.aiag.org/) with input from OEMs, Tier 1 suppliers, and heat treat and calibration companies, specifically to give the industry one common way to audit these processes rather than a different checklist at every plant.

Instrumentation gets equal scrutiny. Auditors expect to see system accuracy tests and temperature uniformity surveys performed on schedule, with records that trace back to specific furnaces and dates. For automotive manufacturers running the same heat treat process across multiple sites, maintaining consistent production and quality records becomes part of the broader challenge of meeting audit and [traceability](/blog/2026/08/automotive-traceability/) requirements. FlowFuse connects to furnace controllers and PLCs over protocols such as OPC UA and Modbus. It logs each setpoint and actual reading against the furnace ID and a timestamp, so a job audit can compare what ran with what the process table says. It can do this across [automotive](/industries/automotive/) plants that run different equipment.

This scope is narrower than it might first appear. A CQI-11 plating assessment centers on coating thickness and adhesion, while CQI-9 stays focused on thermal process control from furnace load to final output.

::cta-image{src="/blog/2026/10/images/cqi-9-lpa-cta.png" alt="Free download: layered process audit checklist template covering standard work, equipment and tooling, error-proofing, and traceability" cta="custom" destination-key="lpaChecklistTemplate"}
::

## Instrumentation, Calibration, And Documentation Auditors Scrutinize

A CQI-9 assessment puts as much weight on paperwork as it does on the furnace itself. Auditors need proof that every instrument reading is accurate, every calibration cycle was completed on time, and every corrective action left a clear, traceable record across the facility. Three areas of documentation tend to draw the closest attention.

### System Accuracy And Uniformity Testing

Auditors verify that system accuracy tests and temperature uniformity surveys were performed at the required frequency and by qualified personnel. Missing or late testing is one of the most common findings in a heat treat audit. Manufacturers that treat this as a scheduled operational task, not a once-a-year scramble, consistently pass this section with fewer corrective actions noted. A FlowFuse flow can work out the next SAT and TUS due date for each furnace and alert the quality team before a test lapses, instead of relying on someone to check a spreadsheet.

### Instrument Calibration Records

Every thermocouple, controller, and recording device tied to the heat treat process needs a documented calibration history: the recorded comparison of an instrument against a reference of known accuracy to identify measurement drift, as [ASQ defines calibration](https://asq.org/quality-resources/glossary). For that comparison to serve as audit evidence, it should have a documented traceability chain to recognized measurement standards, such as [NIST](https://www.nist.gov/calibrations/traceability) for U.S. manufacturers. Auditors trace these records back to specific equipment and dates, making strong [instrument calibration](/blog/2026/07/what-is-instrument-calibration/) practices essential to maintaining audit-ready records.

### Traceability Across Sites

For manufacturers running the same heat treat process across multiple plants, auditors expect consistent documentation practices everywhere, not just at headquarters. A [calibration management dashboard](/blog/2026/07/calibration-management-dashboard/) built in FlowFuse can bring calibration due dates, overdue instruments, and compliance status into one view. Because the same application can be deployed to every plant, each site tracks calibration the same way.

## How CQI-9 Fits Into The Broader CQI Special Process Family

CQI-9 is one of several AIAG special process assessments, with each assessment focused on a different manufacturing process. Understanding the differences helps manufacturers determine which assessments apply when multiple special processes are performed across the same facility or supply chain. Here is how the related standards break down.

### Welding System Assessments

CQI-15 is the Welding System Assessment, which applies to organizations performing applicable ferrous and non-ferrous metallic welding. Like CQI-9, it provides a common approach to assessing a specific special process within automotive production and service part organizations.

### Soldering System Assessments

CQI-17 applies the same self-assessment structure to soldering operations, with process tables built around flux control, solder temperature, and joint inspection instead of furnace parameters. A facility running both heat treat and soldering lines needs to satisfy both standards independently, since neither audit covers the other's scope, and treating them as one review would leave gaps in both process records.

### Molding System Assessments

CQI-23 covers molding system assessments. A facility that performs both heat treat and molding needs to address the requirements of each applicable assessment separately. For manufacturers managing quality across multiple sites, [defect and quality monitoring](/blog/2026/07/defect-and-quality-monitoring/) can help teams track quality trends and recurring defects across production operations.

## Final Thoughts

Passing a heat treat audit comes down to proving that what happens on the furnace matches what is written in the procedure, every time, at every site. That means accurate instrumentation records, calibration history that traces back to specific equipment, and job audits that hold up under scrutiny. None of that is achievable with manual tracking spread across spreadsheets and site-specific habits, especially for manufacturers running heat treat processes at scale across a brownfield environment.

Audit readiness is easier when the process data an assessment needs is captured during normal production, not reconstructed from spreadsheets before an audit. With FlowFuse, teams can build a [production monitoring](/use-cases/production-monitoring/) application once and deploy it to every heat treat site. It collects furnace readings, alarms, and calibration status in the same structure at each plant, so the evidence is already there when the auditor asks for it.