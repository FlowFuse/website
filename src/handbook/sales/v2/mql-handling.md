---
navTitle: MQL Handling
---

# MQL Handling Process

A Marketing Qualified Lead (MQL) represents a contact that marketing has evaluated and determined ready for direct sales engagement.
Before acting, understand why: the [lifecycle stages table](/handbook/sales/hubspot/#lifecycle-stage)
defines the exact criteria that elevate a contact to MQL status — this is not a cold lead.
Marketing has already done the work to confirm fit signals.

The goal of the process is to convert MQLs into first meetings with prospective buyers
and further into qualified pipeline.

Speed is of the essence. Same-day follow-up is **required**. Research and
outreach should happen on the day the MQL lands. Every hour of delay reduces conversion probability.

## Step by Step Plan

### Step 1: Review the MQL in HubSpot

Open the contact record in HubSpot as soon as you are notified of a new MQL.

- Check the `Lead Status` field — it should be set **Open**.
- Review the activity timeline: what triggered the MQL? (form submission, trial sign-up, contact request, webinar registration, etc.)
- Check and update the [activation category](/handbook/marketing/lead-activation/) applies: inbound, intent outbound, warm outbound, or cold outbound. This shapes your messaging angle.
- Check if there is an existing deal or prior contact history.
   - If so, understand investigate if this is a stakeholder in a current deal or expension opportunity.

### Step 2: Research the Contact

Spend approximately 5 minutes researching the person before reaching out.
Do not skip this step — personalization depends on it.

Find and update Hubspot with:
- Their LinkedIn profile
   - Investigate their current role, tenure, background, recent activity or posts
- What they likely care about given their title (operations, IT/OT, engineering, management)
- Any shared context: mutual connections, events, content they engaged with
- Request Clay to update the fields in Hubspot if needed.

Research the account the contact is employed at. Update the Account fields where needed.
- Company size, industry, and geography
- Technology stack or known operational setup (relevant to Node-RED / OT/IT use cases)
- Recent news, funding, growth signals, or hiring patterns
- Whether they are likely an ICP match (manufacturing, industrial automation, OT/IT convergence)

### Step 3: Assess Fit Before Reaching Out

Before writing the email, make a quick fit assessment:

- Does the company match the [Ideal Customer Profile](/handbook/marketing/messaging/#ideal-customer-profile-(icp))
- Is the contact title aligned to a buying role or influencer role?
- Is this an **education** contact? (university, school, academic institution)

If the contact is clearly from an **education institution**, move directly to Step 4b.

## Step 4a: Send a Personalized Follow-Up Email (Commercial MQLs)

Send the first email **the same day** the MQL lands. Use a HubSpot sequence to
automate delivery timing and follow-up steps, while keeping the content personal.

What each email must include:
1. A personal opener — reference something specific: their role, the company, what they signed up for, or a relevant industry challenge. Do not use a generic opener.
2. A short, relevant question about their problem or use case — ask about what they are trying to solve, not about FlowFuse. Examples:
   - "Are you looking to connect OT data across multiple sites, or is this more of a single-plant initiative?"
   - "What does your current setup look like for managing Node-RED deployments?"
   - "Is this for a production environment or still exploratory at this point?"
3. A meeting booking link — include your HubSpot meetings link to make it easy for them to book time directly.

Use the approved HubSpot email templates as a starting point, then personalize based on your research.
Templates handle structure; your job is to make it feel like a 1:1 message.

Log the email in HubSpot and update `Lead Status` to **In Progress**.

## Step 4b: Send a Standard Template (Education MQLs)

For contacts from educational institutions (universities, colleges, schools), a
standard follow-up template is sufficient. Personalization effort beyond the
basics is not required.

- Use the designated education follow-up template in HubSpot.
- Include a brief acknowledgement of their context (student, researcher, educator).
- Include a meeting booking link.
- Log in HubSpot and update `Lead Status` to **Unqualified**.

## Step 5: Schedule a Follow-Up Call Task

Immediately after sending the email, create a HubSpot task on the contact record:

- **Type:** Call
- **Due date:** 1 business day after the email was sent
- **Title:** "Follow-up call — [Contact Name]"
- **Notes:** Include the email angle used and any open questions to explore on the call.

This ensures no MQL falls through the cracks. The call is the second touch.
The goal is to have a live conversation, confirm interest, and begin qualifying toward SQL.

## Step 6: Execute the Follow-Up Call

On the scheduled day, call the MQL. If no answer, leave a brief voicemail and
log the attempt in HubSpot.

On the call, aim to:
- Reference the email you sent
- Ask the open questions prepared during research
- Begin the qualifying conversation (see [MQL to SQL qualifying questions](/handbook/sales/hubspot/#from-mql-to-sql---qualifying-questions))

If the contact is ready to move forward, schedule a discovery meeting and update the lifecycle stage to **SQL**.

## Summary Checklist

| Step | Action | Timing |
|------|--------|--------|
| 1 | Review MQL in HubSpot, check trigger and history | Day 0 (same day) |
| 2 | Research contact and company (~5 min), update Clay/HubSpot fields | Day 0 |
| 3 | Assess ICP fit and contact type (commercial vs. education) | Day 0 |
| 4a/4b | Send personalized email (or standard education template) with meeting link | Day 0 |
| 5 | Create HubSpot call task due next business day | Day 0 |
| 6 | Execute follow-up call; qualify or log attempt | Day 1 |
