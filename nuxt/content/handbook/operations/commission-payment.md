---
title: "Commission and Bonus Payment"
---

# Commission and Bonus Payment

FlowFuse has some employees that are compensated through a bonus or commission
structure. This structure reduces their base compensation, and rewards them when
goals are met and for taking a risk with their base compensation.

How each commission or bonus is calculated depends on the role, and is described
in [Processing Sales Commission](#processing-sales-commission) and
[Processing Bonuses](#processing-bonuses). Verifying the numbers, getting the
team member's agreement, the payout currency and wiring the money work the same
for every role, and are described once in
[Shared steps for commissions and bonuses](#shared-steps-for-commissions-and-bonuses).

## Processing Sales Commission

The company processes the commission payment for sales reps on a monthly basis
to create a short feedback loop between closing and the reward. Follow the
next steps to process the commission calculations and setup for payment.

Note: all sales commissions are advances under the assumption customers pay the
invoice. FlowFuse might withhold commission payments or claw back payments if
payments aren't made within 60 days after the
[deal was closed](/handbook/sales/engagements/#closing-a-deal).

### Calculating Team Commissions

In the first week after the month has passed, commission payments are
calculated. Only closed won deals that have gone through the full process of
closing a deal are considered.

Download all the deals from hubspot by going to the
[deal board](https://app-eu1.hubspot.com/contacts/26586079/objects/0-3/views/all/list),
confirm that under the "Pipelines" list you are looking at the "Sales Pipeline" (not All Pipeline or other options),
and add two filters:

1. Closed "Last Month"
1. Deal stage is "All closed won"; note: there is a different stage called Closed won. This is not that.
   
You need to have the following columns enabled:
   * Deal Name
   * Deal Stage
   * Close Date
   * Deal owner
   * Amount
   * Is Closed Won
   * Deal Type
   * Annual recurring revenue
   * Annual contract value
   * Contract Term (months)
   * Payment Terms

Contract Term and Payment Terms are required to apply the multi-year commission
tiering from the [Sales Compensation Plan](/handbook/sales/commission-plan/)
(Exhibit A, Sections 10-11). Without them in the export, the sheet cannot tell
a multi-year deal from a standard 1-year term, which has caused at least one
overpayment.

When the deal board is updated with on the won deals of last month, 
click "Export View" and export as CSV. Download this file
to your machine.

Make a copy of
[this Google Sheet template](https://docs.google.com/spreadsheets/d/1fBq4g4W26M3k-uUOg5p4D2mYUyBPP8EbdtPLwuQ5RPI/)
and import the CSV just downloaded from HubSpot into the "All Deals" sheet.
"File" -> "Import" -> "Upload" -> "Replace Current Sheet".

Now "All Deals" have been listed, that adds all the deal closers to the "Team"
tab. Column A (Name) should be automatically updated from the "All Deals" sheet. 
You can fill in Column B to D if you have the information at hand. 
Column E (Commission %) should be automatically filled in from "Check" sheet. Please double check if this rate has changed in the recent months before proceeding. 
Column F (Withholdings) should be filled in only if we find deals that haven't been paid by the customer. Or else, enter 0. 
Column G (Deal Closers apply) should match the information from Column A for all team members outside of the manager. For the manager, fill in the cell with the manager's name and all the other team members that have closed a deal in that current month. This may be a little bit more difficult in months where not everyone closes a deal.

You will also need to update the template if any new sales folks have started
in the last month.

Finally, go to the "Commissions" tab and select the employee to calculate the
payment for.

Do not manually override any formulas in the commission tab, make sure that all calculations should be driven by the sheet's logic.

Copy the relevant details for the employee into an email using the
[template below](#email-template-that-should-be-used), telling them what their
performance was like and what commission they'll receive, and get their
agreement as described in [Getting agreement](#getting-agreement).

### Additional Notes for Commission Processing

After processing commission, update the Ops Plan spreadsheet (AE productivity tab) with the finalized commission details.

Add this task as a recurring calendar reminder on the first Monday or Tuesday of each month.

### Email template that should be used:

Subject line: `Commission for [Month] [YYYY]`.

```
Dear [first_name],

This email is to confirm your estimated commissions for [Month and Year]. 
Your commission percentage for this quarter is [X]. 

In the aforementioned period, you closed:

- [Y] number of deals
- [cARR] new Contracted ARR

Your commission is [currency] [XX].

Please remember: FlowFuse might withhold commission payments, or claw back
payments if payments aren't made within 60 days after the quote is signed.

Please confirm the numbers in this email for the commission payment to be issued.

Best,

[Manager sending email]
```

### Update Sales Representative Productivity

Once commission numbers are finalized for the month, rep productivity should be
updated in the Ops Plan spreadsheet using the finalized data.

Once the sales rep has agreed, pay the commission as described in
[Wiring the money](#wiring-the-money).

## Processing Bonuses

A bonus isn't a commission. A commission is a percentage of the value of a
deal that's booked and yielding revenue, and only sales reps earn one, under the
terms of the [Sales Compensation Plan](/handbook/sales/commission-plan/). A bonus
is paid for reaching goals agreed up front, and its amount follows from how far
those goals were reached rather than from the value of any single deal. As the
goals differ per role, so do the period a bonus is calculated over and the
numbers needed to verify it:

| Bonus | Based on | Period |
| ----- | -------- | ------ |
| [CSM bonus](#processing-the-csm-bonus) | Total portfolio performance (NRR), see [Customer Success Bonus Structure](/handbook/sales/customer-success/#customer-success-bonus-structure) | Quarterly |
| SDR bonus | First Meetings, see [SDR Bonus Structure](/handbook/marketing/sdr/#bonus-structure) | Monthly |
| [MBO bonus](#mbo-bonuses) | Goals agreed between the employee and their manager | Quarterly |

### MBO Bonuses

MBO bonuses are agreed upon between the employee and their manager.

At the start of each quarter, the employee should send an email to both their manager and the CEO outlining the agreed goals and bonus structure. The manager must reply to that email confirming the agreement. This ensures that all parties have written confirmation of the goals and conditions.

All goals must be achieved within the agreed quarter. Data or outcomes generated outside of the quarter will not be counted toward the results, even if reports need to be finalized or generated after the quarter has ended. Some reporting may require data collection after the quarter, but this does not extend the performance period.

When the quarter has ended, the Chief of Staff and the Operations team verify the
achieved outcome against the agreed goals, and send the bonus calculation to the
employee for agreement, following the
[shared steps](#shared-steps-for-commissions-and-bonuses). The bonus is paid in
the next payroll after the employee has agreed to the calculation.

### Processing the CSM Bonus

Following the end of each quarter, the Operations team processes CSM bonuses
based on the portfolio performance metrics outlined in the
[CS Handbook](/handbook/sales/customer-success/#customer-success-bonus-structure).

#### Verifying Deals Before Handoff
 
Before passing the bonus workbook to the CSM for confirmation, verify
each deal in the workbook against HubSpot. Complete the following checks:
 
1. **Account name** - Confirm the account name matches between the workbook and HubSpot.
2. **Close date** — Confirm the deal's qualifying date falls within the quarter being evaluated.
Deals are counted by signing date only; a deal signed outside the evaluation quarter must not be included,
even if other activity falls within it.
3. **Amount** — Confirm the deal amount matches between the workbook and HubSpot.
4. **Deal type** — Keep renewals separate from expansion deals. These are classified and paid
differently and must not be combined in a single line.
Flag any figure that isn't shown in HubSpot (e.g., highlight the cell) and confirm
it with the relevant sales team member before finalizing sheet.

#### Payout Timeline & Submission

1. Calculation: by the 5th business day of the new quarter, the Operations team completes the Bonus Calculation [Template](https://docs.google.com/spreadsheets/d/1QruPv_EmC3o0OPTipSxqKIWy0mMxMB8asWupdA8N_X8/edit?gid=1622984334#gid=1622984334) for each CSM. Duplicate the workbook and complete the necessary fields following the legend.
2. Validation: the Chief of Staff and the Operations team cross-reference the template against HubSpot data, specifically verifying the Effective Dates for all transactions, then send it to the CSM for [agreement](#getting-agreement).
3. Payment: Once agreed, the bonus is [wired](#wiring-the-money) with the next available payroll cycle.

#### Data Requirements
The calculation template must include:
- Company Name & Transaction Amount (ARR Delta).
- Notice Date: When the customer informed us of the change. Or when we actually closed won the change in HubSpot
- Effective Date: When the change actually takes place in the contract.

## Shared steps for commissions and bonuses

These steps apply to every commission and bonus, whichever role it's for.

### Independent verification

Every commission and bonus FlowFuse pays, for any role, is verified
independently before it's paid:

1. After the period a commission or bonus is calculated over ends, the Chief of
   Staff and the Operations team independently verify the numbers for every
   achieved commission and bonus.
1. The Operations team then reaches out to each team member with their
   commission or bonus calculation, and asks for their agreement in writing.
1. Once the team member agrees, the payment is filed in Deel and paid out as
   expected.

It's important for the company to validate these numbers independently, rather
than starting from numbers reported by the person being paid. There's no need
for a sales rep, or anyone else in a role with a commission or bonus, to send
their own numbers ahead of this to preempt the discussion: wait for the
calculation, and raise anything that doesn't match your own records when
replying to it.

The role-specific sections above describe which numbers are verified for each
type of commission and bonus.

### Getting agreement

Send the calculation to the team member by email, and get their agreement to the
numbers in writing before anything is paid.

- Send it to the team member's personal email address, so they retain access to
  the confirmation after their employment ends, as compensation records are
  considered personal.
- Include the CEO and the team member's manager in cc.
- To avoid errors, copy and paste all numerical amounts directly from the
  spreadsheet whenever possible instead of typing them manually. Carefully
  double-check all details before saving the email as a draft. Once the draft is
  finalized and verified, inform the CEO that it's ready for review and sending.
- If nothing was achieved in the period, still send the zero calculation for
  confirmation.

### Currency of payout

Commissions and bonuses are paid in the currency specified in the team member's
initial employment contract (e.g., USD or EUR). _Note: team members should
confirm their specific payout currency with the Operations team during their
first period._

### Wiring the money

Once the team member has agreed, process the payment in Deel, in the
[payout currency](#currency-of-payout). Sign into Deel and browse to the profile
of the receiver. For contractors, a commission is a **Payment Adjustment** marked
as a **commission** payment, and a bonus is added under **Bonuses and
Incentives**.
For EOR team members, you'll need to add an item under "Payments and Submissions" manually.
For PEO team members, include them in the next regular payroll cycle. 
1. Go to Payroll in the left navigation menu and select Payroll cycles.
2. Under the Active tab, locate the relevant pay period and click Review on the cycle row. If the most active payroll is already completed, go to the upcoming payroll cycle. 
3. In the employee pay review table, find the employee, click the three dots, and click "add item"
4. Pick commission or bonus from the drop-down, matching the payment, and enter the amount. 
5. Complete the review steps and select Submit Report before the cut-off date (5 days prior to payday).

In all cases be explicit about this being a bonus or commission for achievements
for a certain time period and what the achievement was.
