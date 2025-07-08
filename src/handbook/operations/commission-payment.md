---
navTitle: Commission Payment
---

# {{ navTitle }}

FlowFuse has some employees that are compensated through a bonus or commission
structure. This structure reduces their base compensation, and rewards them when
goals are met and for taking a risk with their base compensation.

## Processesing Sales Commission

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
[deal board](https://app-eu1.hubspot.com/contacts/26586079/objects/0-3/views/all/list)
and add two filters:

1. Closed "Last Month"
1. Deal stage is "All closed won"; note: there is a different stage called Closed won. This is not that.
You need to have the following columns enabled:
* Deal Name
* Deal Stage
* Close Date
* Amount
* Deal owner
* Is Closed Won
* Deal Type
* Annual recurring revenue
* Annual contract value
Instead of the board view, select a list view, and add the ARR and ACV columns
to the view so they are included. When the deal board is updated with on the won
deals of last month, click "Export View" and export as CSV. Download this file
to your machine.

Make a copy of
[this Google Sheet template](https://docs.google.com/spreadsheets/d/1fBq4g4W26M3k-uUOg5p4D2mYUyBPP8EbdtPLwuQ5RPI/)
and import the CSV just downloaded from Hubspot into the "All Deals" sheet.
"File" -> "Import" -> "Upload" -> "Replace Current Sheet".

Now "All Deals" have been listed, that adds all the deal closers to the "Team"
tab. Fill out all the cells for team members with their yearly quota, etc.

Lastly go to the "Commissions" tab and select the employee to calculate the
payment for.

Copy the relevant details for the employee into an email and tell them what
their performance was like and what commission they'll receive. It's important
to get a written agreement to the commission number. Make sure the CEO and Head
of GTM both receive a copy through listing them as `cc` recipients.

Here is an email template that can be used:

```
Dear {{first_name}},

This email is to confirm your estimated commissions for {{Month and Year}}. Your
target amount for this quarter is {{amount}}. The end of {{Month and Year}} puts
us {{X}} weeks into the quarter.

In {{Month and Year}}, you closed:

- {{Y}} number of deals
- {{ARR}} new Contracted ARR

Please remember: FlowFuse might withhold commission payments, or claw back
payments if payments aren't made within 60 days after the quote is signed.

Please confirm the numbers in this email for quota to be issued.

Best, 
{{Manager sending email}}
```

### Wiring the money

If the employee agrees with the commission, process the payment in Deel as USD payment.
