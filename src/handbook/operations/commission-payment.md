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
invoice. FlowFuse might withhold commission payments, or claw back payments if
payments aren't made within 60 days after the quote is signed.

### Calculating Team Commissions

Make a copy of this
[template Google Sheet](https://docs.google.com/spreadsheets/d/1fBq4g4W26M3k-uUOg5p4D2mYUyBPP8EbdtPLwuQ5RPI/).

Download all the deals from hubspot by going to the deal board and filter 2
ways:

1. Closed "Last Month"
1. Deal stage is "All Closed Won"

When the deal board is updated with on the won deals of last month, click
"Export View" and export as CSV. Download this file to your machine.

Make a copy of [this Google Sheet template](#TODO) and import the CSV just
downloaded from Hubspot into the "All Deals" sheet. "File" -> "Import" ->
"Upload" -> "Replace Current Sheet".

Now "All Deals" have been listed, that adds all the deal closers to the "Team"
tab. Fill out all the cells for team members with their OTE, accellerators, etc,
etc.

Lastly go to the "Commissions" tab and select the employee to calculate the
payment for.

Copy the relevant details for the employee into an email and tell them what
their performance was like and what commission they'll receive. It's important
to get a written agreement to the commission number.

### Wiring the money

If the employee agrees with the commission, process the payment in Deel.
