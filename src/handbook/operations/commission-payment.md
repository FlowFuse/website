---
navTitle: Commission Payment
---

# {{ navTitle }}

FlowFuse has some employees that are compensated through a bonus or commission
structure. This structure reduces their base compensation, and rewards them when
goals are met and for taking a risk with their base compensation.

## Processing Sales Commission

The company processes the commission payment for sales reps on a monthly basis
to create a short feedback loop between closing and the reward. Currently that's
a very manual process, some day to be moved to a Node-RED workflow. Follow the
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

When the deal board is updated with on the won deals of last month, 
click "Export View" and export as CSV. Download this file
to your machine.

Make a copy of
[this Google Sheet template](https://docs.google.com/spreadsheets/d/1fBq4g4W26M3k-uUOg5p4D2mYUyBPP8EbdtPLwuQ5RPI/)
and import the CSV just downloaded from Hubspot into the "All Deals" sheet.
"File" -> "Import" -> "Upload" -> "Replace Current Sheet".

Now "All Deals" have been listed, that adds all the deal closers to the "Team"
tab. Fill out all the cells for team members with their yearly quota, etc.

You will need to visually inspect that the names to ensure that the mapping 
from team member to "Deal Closers" is correct. This may be a little bit more
difficult in months where not everyone closes a deal.

You will also need to update the template if any new sales folks have started
in the last month.

Finally, go to the "Commissions" tab and select the employee to calculate the
payment for.

Copy the relevant details for the employee into an email and tell them what
their performance was like and what commission they'll receive. It's important
to get a written agreement to the commission number. 

The email should go to the team member's personal email, and make sure the CEO
and Head of GTM both receive a copy by including them in the `cc` on the email. 

Here is an email template that can be used:

Subject line: `Commission for [Month] [YYYY]`.

```
Dear [first_name],

This email is to confirm your estimated commissions for [Month and Year]. 
Your commission percentage for this quarter is [X]. 

In the aforementioned period, you closed:

- [Y] number of deals
- [cARR] new Contracted ARR

Your commission is USD $[XX].

Please remember: FlowFuse might withhold commission payments, or claw back
payments if payments aren't made within 60 days after the quote is signed.

Please confirm the numbers in this email for the commission payment to be issued.

Best,

[Manager sending email]
```

### Wiring the money

If the employee agrees to the commission, process the payment in Deel as USD payment.
Sign into Deel and browse to the profile of the commission receiver. For contractors
the commission or bonux is a **Payment Adjustment**. For EOR team members, you'll
need to add an item under "Payments and Submissions" manually.

In both cases be explicit about this being a bonus for achievements for a certain 
time period and what the achievement was.


## Processing non-commission Bonuses

FlowFuse processes other bonuses on a quarterly basis. These bonuses are agreed upon between the employee and their manager.

At the start of each quarter, the employee should send an email to both their manager and the CEO outlining the agreed goals and bonus structure. The manager must reply to that email confirming the agreement. This ensures that all parties have written confirmation of the goals and conditions.

All goals must be achieved within the agreed quarter. Data or outcomes generated outside of the quarter will not be counted toward the results, even if reports need to be finalized or generated after the quarter has ended. Some reporting may require data collection after the quarter, but this does not extend the performance period.

When the goal has been fully achieved or the quarter has ended with results within the agreed performance threshold, the employee should send a follow-up email to both their manager and the CEO summarizing the achieved outcome.

The bonus payment will be included in the next payroll after the goal completion or report is submitted.