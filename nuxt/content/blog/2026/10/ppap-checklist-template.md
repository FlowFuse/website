---
title: "PPAP Checklist: Free Template and How to Review a Submission"
metaTitle: "PPAP Checklist: Free Template and Review Guide"
subtitle: "What to verify in a PPAP package before it goes to the customer, from the production run to capability studies and open gaps."
description: "Download a free PPAP checklist template based on the AIAG 4th Edition, with Level 3 requirements, acceptance criteria, and how to review a submission."
date: 2026-10-05
authors: ["sumit-shinde"]
image: /blog/2026/10/images/ppap-checklist-template.png
tags:
  - posts
  - flowfuse
cta:
  type: contact
  title: "Build Your PPAP From the Data, Not Copies of It"
  description: "FlowFuse connects your CMM, SPC system, PLCs, and MES so run-at-rate counts, dimensional results, and capability studies come straight from production instead of copied workbooks."
meta:
  faq:
    - question: "What should a PPAP checklist include?"
      answer: "A PPAP checklist should cover the significant production run and all 18 PPAP elements, with a way to record whether each element applies, the evidence behind it, and any open items. It should also check that documents agree with each other, such as special characteristics carried from the drawing into the PFMEA, control plan, and capability studies."
    - question: "What is required for a Level 3 PPAP?"
      answer: "Level 3 requires the Part Submission Warrant, product samples, and complete supporting data to be submitted to the customer. The master sample, checking aids, and the design record for proprietary components are retained at the supplier and made available on request."
    - question: "What is the difference between PPAP Level 3 and Level 4?"
      answer: "Level 3 has a fixed list of what is submitted: the PSW, samples, and the complete supporting data. Level 4 requires the PSW plus whatever other requirements the customer defines, so its contents vary from customer to customer."
    - question: "Is there an AIAG PPAP template?"
      answer: "The AIAG PPAP Manual defines the submission requirements and includes forms such as the Part Submission Warrant, but many suppliers build their own checklist or use the one their customer provides. The free checklist on this page follows the AIAG PPAP Manual, 4th Edition."
    - question: "Who completes the PPAP checklist?"
      answer: "The supplier completes the checklist, usually a supplier quality engineer, before the PSW is signed by an authorized supplier representative. The customer reviews the submission and records the approval decision. Some customers also require their own forms as part of their customer-specific requirements."
tldr:
  - "Review the run first: Dimensional results, capability studies, and samples all come from the significant production run, so a run that doesn't qualify invalidates them."
  - "Check the documents against each other: Special characteristics and step numbers have to match from the drawing through the PFMEA, control plan, MSA, and capability studies."
  - "Retained isn't the same as not applicable: The submission level decides what is sent, but every applicable element still has to be complete at the supplier."
---

A PPAP package can contain every required document and still be rejected, because the documents disagree with each other or with what happened on the line. The [PPAP elements](/blog/2026/09/ppap/) define what goes into the package. This guide is for supplier quality engineers reviewing it while problems are still cheap to fix, and follows the AIAG PPAP Manual, 4th Edition.

*Running every part number through the same questions makes gaps easier to spot. Download the free PPAP checklist template (Word) below to use on your next submission.*

::hub-spot-form{form-id="8165e9c0-2cd0-4103-a16f-0376ecd6fd14" cta="cta-ppap-checklist-template" reference="ppap-checklist-template"}
::
<!--more-->

## The Significant Production Run

Start with the significant production run, not with element 1. Most of the evidence in the package is generated during it, so confirm the run meets the [AIAG definition](/blog/2026/09/ppap/#the-significant-production-run) before reviewing anything that came out of it. Where the customer requires it, check that [run-at-rate](/blog/2026/08/run-at-rate/) output was recorded against quoted capacity too.

A run on prototype tooling, or measured with a gauge borrowed from another line, can't be fixed with paperwork. The data has to be collected again.

## Special Characteristics and Process Steps

Confirming that each document exists is the easy part. The harder part is confirming they agree.

Pick each critical or significant characteristic on the drawing and follow it:

1. Is it in the DFMEA, if you are design-responsible?
2. Is it carried into the PFMEA?
3. Does the [control plan](/blog/2026/08/control-plans/) give it a measurement method, sample size, frequency, and reaction plan?
4. Is the gauge that measures it covered by an acceptable Gage R&R?
5. Does it have a capability study?

A characteristic that drops out at any step is uncontrolled, even if every document looks complete on its own.

Do the same with process steps. Step numbers in the process flow diagram should match the PFMEA and control plan one for one, and the flow should run from receiving to shipping. Rework loops, inspection points, and storage areas are easy to leave off because they sit outside the main production route.

Finally, compare the process parameters in the control plan with what the equipment actually ran during the trial. If the plan was written before the run and never revisited, the two may not match.

## Acceptance Criteria

Several checks have a numeric pass criterion. Customer-specific requirements can override these, so confirm them against the supplier manual first.

| Check | Common criterion |
|---|---|
| Gage R&R, gauges on special characteristics | Under 10% acceptable; 10 to 30% may be acceptable with customer approval; ndc of 5 or more |
| [Gauge calibration](/blog/2026/07/what-is-instrument-calibration/) | Every gauge used in the run within its calibration date |
| Initial process studies | Ppk above 1.67 meets the criteria; 1.33 to 1.67 may be acceptable after customer review; below 1.33 does not |
| Dimensional results | Every ballooned characteristic, from each cavity, die, mold, line, or spindle |
| Material certifications | Within the customer's age limit |
| Part weight on the PSW | Actual weight in kilograms, to four decimal places |

A Ppk value also means little if the process isn't stable, so include the [control charts](/blog/2026/08/statistical-process-control/) with the capability study.

## PPAP Submission Levels

The customer sets the submission level. If it doesn't specify one, Level 3 is the default. The level decides what is sent to the customer, not what the supplier has to complete.

The table below follows Table 4.2 of the AIAG PPAP Manual, 4th Edition. **S** means submit to the customer and keep a copy, and **R** means retain at the supplier and make available on request. At Level 4, the supplier submits the PSW and whatever else the customer defines, so the other elements are marked **\***. Level 5 is all **R** because the customer reviews the package at the supplier's site. Customer-specific requirements override the table.

| # | Element | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|---|
| 1a | Design record: proprietary components | R | R | R | * | R |
| 1b | Design record: all other components | R | S | S | * | R |
| 2 | Engineering change documents | R | S | S | * | R |
| 3 | Customer engineering approval | R | R | S | * | R |
| 4 | Design FMEA | R | R | S | * | R |
| 5 | Process flow diagram | R | R | S | * | R |
| 6 | Process FMEA | R | R | S | * | R |
| 7 | Control plan | R | R | S | * | R |
| 8 | Measurement system analysis | R | R | S | * | R |
| 9 | Dimensional results | R | S | S | * | R |
| 10 | Material / performance test results | R | S | S | * | R |
| 11 | Initial process studies | R | R | S | * | R |
| 12 | Qualified laboratory documentation | R | S | S | * | R |
| 13 | Appearance approval report | S | S | S | * | R |
| 14 | Sample production parts | R | S | S | * | R |
| 15 | Master sample | R | R | R | * | R |
| 16 | Checking aids | R | R | R | * | R |
| 17 | Records of compliance with customer-specific requirements | R | R | S | * | R |
| 18 | Part submission warrant | S | S | S | S | R |

Reserve N/A for elements that genuinely don't apply to the part: no DFMEA when the customer owns the design, no appearance approval report for a part without appearance requirements. Record the reason. Marking an element N/A only because it isn't being sent hides a gap.

## Handling Failed Checks

If a dimensional result is out of tolerance or Ppk falls short, re-measuring the parts is the obvious response and often the wrong first step.

Verify the measurement system before anything else. A gauge with poor repeatability can make a capable process look incapable, or hide a real problem. Once the measurement is trusted, decide whether parts from the run need [containment](/blog/2026/08/containment-action/) before anything ships, then address the process through [corrective action](/blog/2026/09/capa-corrective-preventive-action/).

Each failed check needs an action, an owner, and a due date. If something is still open when the submission is due, raise it with the customer as a deviation or interim approval request first. Declaring a gap up front gives the customer the chance to agree on an action plan instead of rejecting the submission.

## PPAP Checklist Example

Consider a supplier preparing a Level 3 submission for a molded connector housing made in a four-cavity mold. The drawing marks the width of the latch window as a significant characteristic.

Following that characteristic through the package:

- **DFMEA:** The customer owns the design, so it is marked N/A with that reason recorded.
- **PFMEA:** The latch window appears, with short shots and sink identified as failure modes.
- **Control plan:** It calls for a digital caliper check at the press every hour.
- **MSA:** The Gage R&R was done on the lab CMM, not on the caliper the operators use. That is a gap, because the gauge on the control plan has no study behind it.
- **Capability:** The study from the production run shows a Ppk of 1.45, which falls in the range that needs customer review.
- **Dimensional results:** Only cavities 1 and 2 were measured.

The quality engineer logs three open items. The caliper gets its own Gage R&R before anything else, so the capability result can be trusted. Retained samples from cavities 3 and 4, identified by cavity during the run, are measured to complete the dimensional results. The Ppk of 1.45 is raised with the customer, along with an improvement plan, before the PSW is signed.

None of these gaps show up by checking that each document exists. They appear when the documents are checked against each other and against the run.

## Collecting PPAP Data From Production

Many of the checks above depend on production data: run-at-rate counts, process parameters, gauge status, dimensional results, and capability. In most plants, those numbers are exported from the CMM, SPC system, PLCs, and [MES](/blog/2025/06/what-is-mes/), then copied into a workbook. Each copy is a chance for the package to drift from what the line produced.

[FlowFuse](/) connects to those sources directly, so the values in the submission come from the run itself and stay [tied to each part](/blog/2026/08/automotive-traceability/). After approval, through [safe launch](/blog/2026/08/safe-launch/) and beyond, the same connections keep special characteristics monitored and alert the team when capability starts to slip. Quality engineers can spend more of their time on the parts of the package that need judgement: the FMEAs and the control plan.