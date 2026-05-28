---
title: "NIS2 Compliance for Manufacturers: Why IEC 62443 Is the Missing Standard"
subtitle: "A practical starting point for mid-market manufacturers stuck on Article 21"
description: "NIS2 tells you what to do, not how. IEC 62443 is the technical standard regulators, accredited bodies, and auditors keep pointing to. Here is where to start."
date: 2026-05-28
keywords: NIS2, IEC 62443, OT security, industrial cybersecurity, Article 21, ICS security, SL2, SCADA security, audit logging, access control
authors: ["sumit-shinde"]
image: /blog/2026/05/images/nis2-complience-manufacturing.png
tags:
    - flowfuse
tldr:
  - NIS2 Article 21 tells you what to achieve, not how — and that is where mid-market manufacturers stall.
  - IEC 62443 is the standard regulators, accredited bodies, and ENISA guidance keep pointing to for OT. "Aligned to 62443-3-3 at SL2" is the answer auditors recognise.
  - Start by scoping your System under Consideration, inventorying every piece of OT software, and closing gaps against Foundational Requirements 1, 2, and 6: access control, use control, and audit logging.
  - The custom industrial applications running alongside SCADA are the layer most assessments flag and most teams have no clean answer for.
cta:
    type: contact
    title: "Closing the application-layer gap on your 62443 assessment?"
    description: "Talk to us about how FlowFuse adds SSO, RBAC, audit logging, and governed deployments to the custom industrial applications most NIS2 assessments flag."
---

Mid-market manufacturers are squarely in scope of the [NIS2 Directive](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive), now being transposed and enforced across the EU. Under [Article 34](https://eur-lex.europa.eu/eli/dir/2022/2555/oj), fines reach €10 million or 2% of global turnover for essential entities, and €7 million or 1.4% for important entities, whichever is higher. [Article 20](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) adds personal liability for senior management.

<!--more-->

So manufacturers open [Article 21](https://eur-lex.europa.eu/eli/dir/2022/2555/oj), find ten categories of measures in legal language with no implementation detail, and stall on the only question that matters: *where do we actually start?*

This article is about the standard that answers it. **NIS2 tells you what to do. IEC 62443 tells you how.**

## NIS2 is deliberately vague, and that is the problem

NIS2 is outcome-based. It tells you what to achieve, not how to achieve it. That is a feature, not a bug. The same rules cover sectors as different as healthcare, energy, water, transport, and manufacturing, each with its own technical reality.

But the gap is real. Article 21 requires you to manage cyber risk "appropriately and proportionately." It does not define what appropriate access control looks like on a plant floor. It does not tell you how to segment an OT network from IT. It does not specify what an incident response plan should contain for an industrial control system.

That gap is where most compliance projects stall. You cannot engineer compliance from a legal document. Lawyers write directives. Engineers need technical standards. Until someone names the standard to point at, every meeting ends with "let's get another quote."

DNV, one of the world's largest accredited certification bodies, frames it the same way. The directive describes what needs to be achieved without prescribing how to achieve it — and for critical infrastructure in the operational technology space, the IEC 62443 set of standards helps asset owners implement the right controls to secure their operations.

## IEC 62443 is the bridge

[IEC 62443](https://www.iec.ch/blog/understanding-iec-62443) is a family of international standards for the cybersecurity of industrial automation and control systems. It was built for OT environments, not retrofitted from IT security. The [IEC](https://www.iec.ch/) and [ISA](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) have developed it over more than a decade with industrial operators, vendors, and regulators.

For NIS2 purposes, three parts of the family matter most.

**[IEC 62443-2-1](https://webstore.iec.ch/en/publication/62883)** defines the requirements for a cybersecurity management system at the asset owner: policies, roles, risk assessment, training, incident response. This is the organisational layer. It maps directly to the governance and risk management requirements in NIS2 Article 21.

**[IEC 62443-3-3](https://webstore.iec.ch/publication/7033)** specifies the technical system requirements: identification and authentication, use control, system integrity, data confidentiality, restricted data flow, timely response to events, and resource availability. These are the seven Foundational Requirements (FR1 to FR7) that every industrial control system needs to implement. Each requirement has a Security Level (SL1 to SL4). [SL2 is the practical floor most mid-market manufacturers aim for](https://www.isasecure.org/hubfs/The-Case-for-ISA-IEC-62443-Security-Level-2-as-a-Minimum-FINAL.pdf): high enough to defend against casual or opportunistic attackers, achievable without nation-state-grade controls.

**[IEC 62443-4-1 and 4-2](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards)** cover the secure development lifecycle for product suppliers and the technical security requirements for components. If you build PLCs, HMIs, sensors, or industrial software, your customers will increasingly demand these in purchase orders. They are also what the [EU Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) effectively requires.

The mapping between NIS2's ten Article 21 categories and 62443's controls is direct and well documented. Access control under NIS2 maps to FR1 and FR2 in 62443-3-3. Incident handling maps to FR6 and the management system requirements in 2-1. Supply chain security maps to 4-1 certification of your suppliers.

This convergence is visible across European guidance. ENISA's NIS2 implementation guidance references IEC 62443 alongside ISO 27001, NIST CSF, BSI Grundschutz, and ANSSI guidelines as relevant standards for industrial environments. National regulators have followed. France's ANSSI updated its industrial cybersecurity guidance in 2025 to explicitly strengthen alignment with IEC 62443, using a four-class system that draws on 62443's concepts of zones, conduits, and security levels. Germany's BSI, the Netherlands' NCSC, and other national authorities reference the same family. When an auditor asks how you are implementing NIS2, "we are aligned to 62443-3-3 at SL2" is an answer they will recognise.

Be honest about the cost. A full certification effort is a multi-month engagement with an accredited [ISASecure](https://www.isasecure.org/) certification body, and costs scale with system complexity. Accredited bodies do not publish public pricing, so plan to get quotes early. Most mid-market manufacturers do not need to certify. They need to *align*. That is a much shorter path, and it is where the real compliance value lives.

## Why mid-market manufacturers stall

If 62443 is the answer, why is not every manufacturer using it? Two honest reasons.

**The standard is hard to navigate, and OT expertise is scarce.** The 62443 family runs to more than a dozen documents in formal standards language. The people who understand both PLCs and identity management — both ladder logic and SAML — are rare and expensive. Most plant IT teams were built to keep the ERP running, not to harden an industrial control system against a determined attacker.

**The gap between current reality and an auditable environment feels too large to start.** Look at the plant floor. Engineers share logins. Scripts run on unmanaged laptops. No audit trail of who changed what. The distance to "62443-aligned" looks impossible, so the project never gets a kickoff date.

Neither is unsolvable. They are just rarely named honestly in vendor marketing.

## The industrial software layer most assessments overlook

When you scope your 62443 work, you will define what the standard calls the System under Consideration: the boundary of what is being secured. The usual candidates make the list immediately. SCADA, historians, PLCs, HMIs, the engineering workstations.

What often gets missed is the layer of custom industrial applications running alongside that core stack. Dashboards built by a plant engineer to surface OEE data. Edge integrations pulling sensor readings into the cloud. Data transformation flows connecting an old line to a new MES. This software runs production-critical workloads, and it almost always lives outside any formal access control or audit regime.

In a typical setup, that software has shared logins, no role-based access, no version control on changes, no audit trail of who deployed what, and ad-hoc deployment processes that vary by site. Against 62443-3-3 at SL2 — particularly FR1 (identification and authentication), FR2 (use control), and FR6 (timely response to events through audit logging) — this layer is one of the largest gaps on the assessment.

This is the gap [FlowFuse](https://flowfuse.com/) closes. FlowFuse is a managed industrial application platform that adds the controls 62443 expects to environments where engineers are already building production applications:

- Enterprise SSO and role-based access control
- Full audit logging of changes and deployments
- Version control with rollback
- Fleet management across sites
- Governed deployment pipelines

It is one piece of the 62443 scope, not the whole thing. But it is the piece most assessments flag and most teams do not have a clean answer for.

## Where to start this quarter

If NIS2 is on your roadmap and you have been waiting for a starting point, here is a sequence that works:

1. **Define your System under Consideration.** Use IEC 62443-2-1 to scope what is in and what is out. Include remote access, IIoT sensors, and any custom industrial applications running on the plant floor.
2. **Inventory your OT software stack.** Not just the PLCs and HMIs. Every dashboard, every data integration, every edge script. If you cannot list it, you cannot secure it.
3. **Map gaps against 62443-3-3 SL2.** Foundational Requirements 1, 2, and 6 are usually where mid-market manufacturers find the most exposure.
4. **Prioritise by risk and effort.** Fix shared logins and missing audit trails before you tackle network segmentation. The low-hanging fruit is the controls auditors will check first.

You do not need to certify. You need to show, with evidence, that your controls map to a recognised standard. 62443 is the standard auditors recognise.

## What is next

NIS2 is not the end of this. The [EU Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) brings product-side obligations into force on 11 December 2027 for any manufacturer who builds something with digital elements. The first vulnerability reporting requirements kick in earlier, on 11 September 2026. The compliance path is the same standard family: 62443-4-1 for secure development lifecycle, 4-2 for component requirements.

The manufacturers who start now will be ready. The ones who wait will be answering auditor questions under deadline pressure.

For now: stop waiting for NIS2 to tell you how. It will not. 62443 will.
