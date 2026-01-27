---
navTitle: Hubspot
---

We use [HubSpot](https://www.hubspot.com/) to track and manage all of our customer interactions.
It enables the creation of customer contacts, and then logging of emails/notes associated to that customer.

## Contact Management

Given that we have multiple client-facing roles within FlowFuse, it's important to document those that
we talk to to ensure no crossover in sales and conversations.

### Lifecycle Stage

All contacts in HubSpot need to have a defined lifecycle. It is required that all contacts pass through each lifecycle stage at the appropriate time based on their interaction with FlowFuse marketing and sales. Contacts should not skip a stage.
It is up to the contact owner to ensure their contacts have the appropriate lifecycle stage set.

<div class="table-wrapper" markdown="block">

| Stage Name | Lifecycle Stage | Owner | Deal Stage | Deal Probability | Requirements for this Stage | Supporting Materials | KPIs |
| :---- | :---: | :---: | :---: | :---: | :---- | :---- | :---- |
| Subscriber | Subscriber | Marketing | N/A | 0% | <ul><li>Email known in Hubspot</li><li> Aware of FlowFuse</li></ul> | N/A | <ul><li> Total contacts in Database </li><li>Social Media Company Followers</li></ul> |
| Lead | Lead | Marketing | N/A | 0% | <ul><li>Demonstrated insterest in FlowFuse</li><li>Started trial on FlowFuse Cloud OR filled another form on the marketing website</li></ul> | N/A | N/A | # new leads |
| Marketing Qualified Lead | MQL | Sales | N/A | 0% | <ul><li>Requested a quote or trial license through the website</li><li>Is a business user on FlowFuse Cloud</li><li>Requested to be contacted via a website or other marketing activity</li><li>Confirmation for First Meeting</li><li>Technical Fit and Pain is very probable</li></ul><br>See [Lead Activation](/handbook/marketing/lead-activation/) for inbound vs. outbound definitions. | <ul><li>Lead Scoring</li><li>Sequences & Templates</li></ul> | # new MQLs |
| Sales Qualified Lead | SQL | Sales | N/A | 0% | <ul><li>SPICED Discovery done</li><li>Customer Pain Identified</li><li>Confirmed Critical Event</li><li>Timeline PoC and Purchase known</li><li>Stakeholders Identified</li></ul> | <ul><li>Intro meeting Deck</li><li>Customer Success Stories</li></ul> | # New SQLs & # First Meetings Occurred |
| Opportunity | Opportunity | Sales | Opportunity | 10% | <ul><li>Poc / Trial Requestments Documented</li><li>Deal Sheet Completed</li></ul> | <ul><li>PoC Document</li><li>Deal Sheet Template</li></ul> | Pipeline Forecast Sheet |
| Value Identified | Opportunity | Sales | Value Identified | 30% | <ul><li>PoC / Trial started</li><li>Check in call scheduled</li><ul> | TODO: Account Mapping sheet |
| Value Validated |  Opportunity | Sales | Value Validated | 50% | N/A | N/A | Pipeline Forecast Sheet |
| Procurement | Opportunity | Sales | Procurement | 70% | N/A | N/A | Pipeline Forecast Sheet |
| Closed Won | Customer | CSM / Sales | Customer | 100% | N/A | N/A | N/A |

</div>
#### MQL follow-up expectations

Marketing Qualified Leads (MQLs) should be engaged by a Sales Representative, according with the appropriate geographic region of the contact. Sales reps are encouraged to reserve time on a daily basis to review new and existing MQLs, reach out to them, and understand the nature of their interest in FlowFuse. The primary goals of this engagement are to clarify context, identify potential opportunities early, and, where appropriate, manually update lifecycle stage and lead status so that only genuine opportunities move forward in the pipeline within the first 24hours since the MQL has landed.

#### Lifecycle changes

##### From MQL to SQL - Qualifying questions

- Is there a use case FlowFuse can solve?
- Is there a need, now or in the near future, for 10 or more instances?
- Is there a timeline for implementation within the next 6 months?

### Lead Status

For leads who are [MQLs or SQLs](#lifecycle-stage) the `Lead status`
field is used to mark what the status is. Even though they're beyond being a lead.
This field is maintained by the primary contact owner, likely the account executive.

At this stage we're using the default set of status's in HubSpot:

| Lead status | When to use |
| :---------: | :---------- |
| New | The contact in question has had only _marketing_ contact (E-mails, etc). |
| Open | In the stage where a contact is assigned to a Account exec, but no official connection has be made. Usually contacts are only in this stage for a short while.|
| In Progress | After contact has been made, this status captures the nurturing process toward an opportunity. |
| Open Deal | When a deal is on the board, and the opportunity is real, this is the status! |
| Unqualified | Either this contact specifically cannot lead the sales process, or the account itself has been found unqualified. |
| Unresponsive | We have not received a reply in 2 weeks, they are ghosting us. |
| Bad timing | FlowFuse was, for whatever reason, not a great fit right now. However, it's potentially a good fit later. |

### Outbound

`Activation Outbound` is a custom property that's set to `Yes` when the first meeting with the contact came through outbound
drip campaigns or other outbound lead-gen actions. This property will be set to `Yes` when the contact was in HubSpot
through other marketing activities too, but wasn't nurtured to the point of a meeting yet.

## Importing Contacts Into HubSpot

If you import contacts into HubSpot, it is important that the First Name and Last Name are populated correctly. Currently the FlowFuse Cloud database stores first and last name in a single field called Name. If you import this field into HubSpot the default is set to populate the Last Name field. The First Name field will not be populated so any email personalization with First Name will not be effective.  

The ideal process for importing FlowFuse Cloud contacts is that you first split the Name field into a First Name and Last Name. Google Sheets has the ability to split a column of text into two columns based on the delimiter of a space. Once that is completed then you can import the list into HubSpot.

## Recommended Apps

Extension applications for HubSpot that can be beneficial if you're interacting with customers:

- **G-Mail Extension ([link](https://app-eu1.hubspot.com/ecosystem/26586079/marketplace/apps/sales/sales-enablement/gmail))** - Automatically creates contacts when you e-mail them for the first time, and logs e-mail activity against that contact in HubSpot.
    - **Enhance your meeting invites by following these steps:**
        1. After installing the extension, click on `Meetings` in the toolbar that appears in Gmail.
        2. Pick at least three of your available timeslots to be added as options to your e-mail message.
        3. HubSpot will automatically generate three buttons in the email, each corresponding to one of the proposed times. Take into consideration that the displayed time will correspond with the host's timezone.
        ![E-mail message with options](./images/hs-email-message.png){ width=600 }
        4. If none of the options work for the recipient, an additional link to your calendar will also be included.
