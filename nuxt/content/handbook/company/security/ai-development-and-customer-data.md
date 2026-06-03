---
navTitle: AI Development and Customer Data Policy
---

# AI Development and Customer Data Policy

| Policy owner | Effective date |
| ------------ | -------------- |
| @knolleary   | 2026-02-18     |

## Purpose

This policy describes how AI-enabled functionality is designed, developed, and used within FlowFuse, both in the product and internally by FlowFuse team members.

Its purpose is to protect customer data, maintain trust, and ensure responsible, transparent, and secure use of AI technologies.

## Scope

This policy applies to:

- AI functionality shipped as part of the FlowFuse product
- Internal use of AI tools by FlowFuse employees and contractors
- Integrations with third-party AI services

## Guiding Principles

1. AI is assistive, not autonomous.
2. Humans remain accountable for decisions and outcomes.
3. Customer trust and data protection take precedence over experimentation speed.
4. AI usage must be intentional, scoped, and reversible.
5. FlowFuse does not train AI models on customer data or company data.

## Internal Use of AI by FlowFuse Team Members

FlowFuse supports and encourages responsible use of AI tools by team members to improve development velocity, quality, and operational effectiveness.

When using AI internally:

1. Do not share customer data with AI tools except as explicitly permitted by this policy.
2. Use internal, synthetic, or publicly available data for experimentation whenever possible.
3. Review AI-generated output before relying on it or including it in the product.
4. Do not use AI tools to bypass security controls, access restrictions, or approval processes.
5. Never give credentials to AI tools or agents. This covers Personal Access Tokens, API keys, passwords, and any other secret, whether you're pasting it into a chat or handing it to an agent to act with. Admin-scoped FlowFuse Cloud and Dedicated Instance PATs are the highest-risk case: an agent holding one can take destructive, account-wide actions.

Apply the same data protection, security, and review standards to internal AI usage as to AI functionality shipped within the product.

### Approved AI Tools

FlowFuse provides the following AI tools to team members:

- **Claude** (via Claude Team) — general-purpose AI assistant for writing, analysis, coding support, and research.
- **Gemini** (via Google Workspace) — AI features built into Gmail, Docs, Meet, and other Workspace apps.

AI features built into other approved tools (for example, summarization, drafting assistance, or transcription) are covered by the existing approval of the underlying tool and the principles in this policy.

Other AI tools may be approved on a case-by-case basis through the vendor approval process. The full list of approved vendors and software is maintained in Vanta and via approved Vendor & Software Checklist issues in the admin repo on GitHub.

### Requesting a New AI Tool

To request approval for a new AI tool, open a [Vendor & Software Checklist](https://github.com/FlowFuse/admin/issues/new?template=vendor-process.md) issue in the admin repo on GitHub. The request is reviewed for security, data handling, and budget before approval.

To request access to an already-approved AI tool, open an [Access / Permission Request](https://github.com/FlowFuse/admin/issues/new?template=access-request.md) issue in the admin repo on GitHub.

## Customer Data Usage

Customer data may be used with AI systems only under the following conditions:

1. Use customer data solely to provide the requested product functionality.
2. Ensure all AI processing of customer data follows existing access controls, logging, and security policies.

Customer data is not used for the following purposes:

1. Do not use customer data to train shared, public, or cross-customer AI models.
2. FlowFuse does not train AI models on customer data.
3. Do not use customer data for internal experimentation unrelated to a customer’s use case.
4. Do not use customer data to improve general-purpose AI model behavior.

Customer data remains owned and controlled by the customer at all times.

## Internal Data vs Customer Data

1. Internal, synthetic, or anonymized data may be used for:
   - Prototyping and experimentation
   - Prompt development
   - Evaluation and testing of AI features

2. Do not repurpose customer data for internal AI development or testing, even if anonymized, without explicit approval.

## Third-Party AI Services

Third-party AI providers may be used within the FlowFuse product only when:

1. Appropriate contractual data protection terms are in place.
2. The provider does not retain or reuse customer data for model training.
3. Data shared is limited to the minimum required to provide the feature.

Review new AI provider integrations prior to use and assess them for:

1. Data handling and retention practices.
2. Security posture.
3. Compliance and risk implications.

FlowFuse maintains a documented inventory of approved third-party AI services used within the product that may process customer data. This inventory includes references to each provider’s relevant data handling and security policies. The inventory is reviewed as part of the vendor risk management process and is available upon request.

## Product Transparency

1. Clearly identify AI-assisted functionality in the product and/or documentation.
2. Do not present AI outputs as authoritative or decision-final.
3. Inform users when AI is involved and ensure they understand that human judgment is required.

## Prohibited AI Use Cases

Do not use AI for:

1. Fully autonomous decision-making affecting customers.
2. Safety-critical or high-risk operational decisions.
3. Surveillance, behavioral profiling, or user scoring.
4. Legal, medical, or employment decision-making.

## Review and Oversight

1. Require new AI-enabled features to undergo review that considers:
   - Data inputs and outputs
   - Customer impact and potential failure modes
   - Third-party dependencies

2. Restrict, modify, or disable AI functionality if risks or assumptions change.

## Exceptions and Enforcement

1. Require explicit review and approval for any exception to this policy.
2. Violations may result in feature rollback or removal of integrations.
