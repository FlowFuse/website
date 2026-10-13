---
title: "Quality Assurance vs Quality Control: Fixing the Process or Checking the Product"
metaTitle: "Quality Assurance vs Quality Control: What's the Difference?"
subtitle: "QA prevents defects by improving processes; QC detects them through inspection and testing."
description: "Learn the difference between quality assurance and quality control, with examples of QA and QC activities, roles, and how manufacturers use QC data to prevent recurring defects."
date: 2026-10-13
authors: ["sumit-shinde"]
image: /blog/2026/10/images/quality-assurance-vs-quality-control.png
tags:
  - flowfuse
  - posts
cta:
  type: contact
  title: "Get Your QC Results Out of Spreadsheets"
  description: "Talk to our team about bringing inspection results, gauge readings, and machine data into one place, so your quality engineers can spot patterns across lines and shifts instead of piecing them together by hand."
tldr:
  - "Quality assurance prevents defects by improving the process; quality control detects defects by checking the product."
  - "QC data, such as measurements charted over time, shows QA where the process is drifting and whether corrective actions are working."
  - "Manufacturers need both: QC protects customers from defects that get through, and QA reduces how often they occur."
meta:
  faq:
    - question: "What is the main difference between quality assurance and quality control?"
      answer: "Quality assurance is process-oriented and aims to prevent defects. Quality control is product-oriented and aims to detect defects through inspection and testing before products reach customers."
    - question: "Is quality control part of quality assurance?"
      answer: "In most frameworks, yes. [ASQ](https://asq.org/quality-resources/quality-assurance-vs-control) treats QC as a subset of QA, and ISO 9000 defines both as parts of quality management. Some companies still use \"quality control\" as the name for their whole quality department."
    - question: "Is inspection QA or QC?"
      answer: "Inspection is QC, because it checks whether a product meets its specification. Deciding what to inspect, how often, and with which [calibrated instruments](/blog/2026/07/what-is-instrument-calibration/) is QA."
    - question: "Which comes first, QA or QC?"
      answer: "QA starts first, because procedures, training, and supplier controls are set up before production begins. QC runs during and after production. The two then operate as a loop, with QC results showing QA where the process needs to improve."
    - question: "Can a factory have QC without QA?"
      answer: "It can, but QC on its own only detects defects; it doesn't reduce how often they occur. Without QA, the same defects tend to recur, and scrap, rework, and inspection costs stay high."
---

Quality assurance (QA) and quality control (QC) are often used interchangeably, but they do different jobs. QA prevents defects by making the process reliable. QC detects defects by checking the product before it ships.

The difference matters most when the same defect keeps coming back. If inspectors on a bottling line keep finding underfilled bottles, QC is catching bad product before it reaches customers. The filling process is still producing those bottles, though, and stopping that requires changes to the process, which is the role of QA.

A factory needs both. This guide covers how they differ, which activities belong to each, and how QC data helps QA stop defects from recurring.

::cta-image{src="/blog/2026/10/images/quality-assurance-vs-quality-control-cta.png" alt="Monitor manufacturing processes and production data with FlowFuse" cta="demo"}
::

## What Is the Difference Between Quality Assurance and Quality Control?

[ISO 9000:2015](https://www.iso.org/obp/ui/#iso:std:iso:9000:ed-4:v1:en) distinguishes the two by describing QA in terms of providing confidence that quality requirements will be fulfilled, while QC focuses on fulfilling those requirements.

| Aspect | Quality Assurance (QA) | Quality Control (QC) |
|---|---|---|
| Main focus | The process | The product |
| Primary goal | Prevent defects | Detect defects |
| Timing | Before and during production | During production and before release |
| Typical activities | Training, process audits, supplier qualification | Inspections, sample testing, measurements |
| Bottling-line example | Establishing reliable filling procedures | Weighing bottles to check fill volume |
| Desired result | Fewer defects produced | Fewer defective products reaching customers |

## How QA and QC Work on a Production Line

Before a bottling line starts production, QA work includes qualifying suppliers, writing operating procedures, training operators, and maintaining equipment. [Calibration](/blog/2026/07/what-is-instrument-calibration/) keeps measuring instruments reliable. [Process audits](/blog/2026/08/layered-process-audit/) check whether the system is being followed and working as intended.

QC takes place as bottles move through production and before the batch is released. Checks cover fill volume, cap placement, seal integrity, and other product specifications. If results fall outside acceptable limits, the team holds the affected products and investigates.

### Examples of QA and QC Activities

| Quality Assurance | Quality Control |
|---|---|
| Writing standard operating procedures and [work instructions](/blog/2026/07/digital-work-instruction/) | [First-article](/blog/2026/09/first-pass-inspection-fpa/) and in-process inspection |
| Operator training and qualification | Final inspection and batch release testing |
| [Supplier qualification](/blog/2026/09/ppap/) and audits | Incoming material inspection |
| Process validation and capability studies | Dimensional, weight, and visual checks |
| [Calibration programs](/blog/2026/07/calibration-management-dashboard/) | Sampling plans and lab testing |
| Internal and [layered process audits](/blog/2026/08/layered-process-audit/) | Nonconformance reporting and product holds |
| [Mistake-proofing](/blog/2025/09/poka-yoke-mistake-proofing/) and design reviews | [Recording and charting measurement results](/blog/2025/07/quality-control-automation-spc-charts/) |

::cta-image{src="/blog/2026/10/images/lpa-checklist-cta-dark.png" alt="Free download: layered process audit checklist template covering standard work, equipment and tooling, error-proofing, and traceability" cta="custom" destination-key="lpaChecklistTemplate"}
::

## Using QC Data to Improve the Process

QC also produces data that is useful beyond the pass/fail decision. A single result tells you whether one bottle is acceptable; a record of fill weights over time shows how the process behaves.

This is the idea behind [control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc31.htm). Plotting measurements against time, with limits based on the process's normal variation, separates the routine scatter every process has from shifts that point to a specific cause. If fill weights start drifting downward across a shift, the chart shows it while the bottles are still within specification. The team can then adjust the filler before it produces rejects.

Used this way, QC measurements support QA. [Statistical process control](/blog/2026/08/statistical-process-control/) is how many manufacturers make that link systematic.

FlowFuse helps manufacturers put this into practice. It connects PLCs, sensors, test stations, and other industrial systems over protocols such as OPC UA, Modbus, and MQTT, so measurement data from across a plant is collected in one place. Teams then build dashboards that chart key quality characteristics, alerts that flag a drift before it produces rejects, and records that show whether corrective actions are holding. The same setup makes [recurring deviations easier to monitor](/blog/2026/07/defect-and-quality-monitoring/) across lines, shifts, and sites.

FlowFuse also connects AI agents to industrial systems, letting teams build applications from plain-language prompts. In this example, we used Claude and FlowFuse to build a torque traceability application that checks each tightening result against its required limit.

<lite-youtube
  videoid="kPBLW-kMfsg"
  params="rel=0"
  style="height: auto; aspect-ratio: 16/9; background-image: url('https://i.ytimg.com/vi/kPBLW-kMfsg/maxresdefault.jpg'); background-size: cover; background-position: center;"
  title="Building a torque traceability application with FlowFuse">
</lite-youtube>

## Why Finding Defects Late Costs More

An underfilled bottle discovered at final inspection has already consumed product, packaging, machine time, and labor. Some bottles can be reworked; others are scrapped along with their contents.

If the defect reaches a customer, the business also faces complaints, replacements, investigations, or a recall.

The [**1-10-100 rule**](/blog/2026/10/automotive-quality-control/) illustrates how the cost of a problem grows: preventing it at the source costs \$1, correcting it inside the factory \$10, and addressing it after it reaches a customer \$100 or more. These figures are illustrative ratios, not universal costs.

Detecting a defect late doesn't recover the resources already spent producing it. Prevention avoids both the defect and the downstream work required to contain it.

## Why Manufacturers Need Both QA and QC

QC remains necessary, because even a well-designed process can fail. Materials vary, equipment wears, and operating conditions change. Process controls reduce risk, but they can't guarantee that every product will meet its specifications.

QC provides an essential check on the output. It identifies nonconforming products before they move further through production or reach customers. In regulated and safety-critical industries, testing and inspection are required safeguards.

The important distinction is between using inspection to manage risk and relying on it to compensate for process problems. W. Edwards Deming made this point in the third of his [14 points for management](https://deming.org/explore/fourteen-points/): "Cease dependence on inspection to achieve quality."

On the bottling line, repeated underfills could come from a filling-system fault, incorrect settings, changing product characteristics, or a problem that occurs when production restarts. QA finds and fixes the cause; QC confirms whether the fix reduced the failures. Each relies on the other: QA needs QC data to know whether its changes work, and QC on its own does not reduce how often defects occur.

## Is It QA or QC? Classifying Overlapping Activities

Some activities overlap, so the easiest way to distinguish them is to ask what they're intended to achieve.

Calibration is a useful edge case. Calibrated instruments are used during QC inspections, but the calibration process establishes confidence in the measurements themselves, which makes it a QA activity.

Regulated industries draw the same line. In pharmaceuticals, [process validation](https://www.fda.gov/files/drugs/published/Process-Validation--General-Principles-and-Practices.pdf) and deviation management are QA, while testing a batch against [release specifications](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211/subpart-I/section-211.165) is QC.

The department's name doesn't settle the question. Some manufacturers use *quality control* as a broad term for their entire quality function. [ASQ describes QC as a subset of QA](https://asq.org/quality-resources/quality-assurance-vs-control), reflecting how product checks fit within the wider quality system.

What matters is whether the activity checks an output, strengthens the process, or does both.

## QA vs QC Roles: Quality Engineer vs QC Inspector

The split shows up in job titles too, although the exact responsibilities vary by company.

A QC inspector or QC technician measures and tests product: checking incoming materials, performing in-process and final inspections, recording results, and flagging nonconforming product.

A QA engineer or quality engineer works on the system: writing procedures, running audits, leading root cause investigations, managing corrective actions, and analyzing quality data to find where the process needs to change.

In smaller plants, one person often does both. It still helps to be clear which task is which, because inspecting a part and improving the process that made it involve different questions.

## How to Measure Whether Quality Is Improving

When defects appear, adding an inspection is often a sensible short-term response, because it protects customers while the team investigates. Over the longer term, though, the process itself needs to change, or the extra inspection becomes permanent.

Prevention is also harder to measure. A rejected batch is visible and needs immediate action, while a process improvement shows up only as problems that no longer occur. As a result, adding inspections can look like progress even when the underlying process hasn't changed.

A stronger quality system tracks whether recurring defects are declining, scrap and rework are falling, and [corrective actions](/blog/2026/09/capa-corrective-preventive-action/) are keeping problems from returning.

A practical starting point is to review recent rejects. For each one, ask [what allowed it to happen](/blog/2025/12/five-whys-root-cause-analysis-definition-examples/), where the process could have prevented it, and what change would stop it happening again.

Inspection will remain part of any quality system. The goal is for it to find fewer problems over time as the process improves.
