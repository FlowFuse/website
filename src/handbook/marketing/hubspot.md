---
navTitle: HubSpot
---

# HubSpot

We use [HubSpot](https://www.hubspot.com/) to track and manage all of our customer interactions.
It enables the creation of customer contacts, and then logging of emails/notes associated to that customer.

## Creating Contacts

Given that we have multiple client-facing roles within FlowFuse, it's important to document those that
we talk to to ensure no crossover in sales and conversations.

### Lifecycle Stage

All contacts in HubSpot need to have a defined lifecycle. It is required that all contacts pass through each lifecycle stage at the appropriate time based on their interaction with FlowFuse marketing and sales. Contacts should not skip a stage. It is up to the contact owner to ensure their contacts have the appropriate lifecycle stage set.

The folowing is a description of each stage. 

| Lifecycle Stage|Description
| - | - |
| Subscriber | Contact has signed up to hear more information, when it is available, about FlowFuse, e.g. newsletter subscriber |
| Lead | Contact that has converted on our website, or through some other interaction, with our organisation beyond a subscription sign up. For example, registered for a webinar, signed up for a free trial, etc.|
| Marketing Qualified Lead | The contact has requested to talk to someone directly at FlowFuse about the product/services of FlowFuse, either through book a demo, contact us, or direct outreach to a FlowFuse employee. Support requests are not considered MQL. |
| Product Qualified Lead | The Customer success team identifies a contact that they believe is a candidate for an upsell opportunity. Customer success will identify an PQL by monitoring FlowFuse Cloud usage and engaging with these users in a consultative manner. Any contact already identified as an MQL, SQL or Opportunity should not be a candidate for PQL. |
| Sales Qualified Lead | After the initial discussion with an MQL, the sales team will qualify if the contact is a potential customer by changing the lifecycle stage to SQL. This status of this stage is then further qualified in the [Lead Status](#lead-status) property. |
| Opportunity | A contact becomes an Opportunity once a Deal has been opened. The [3 W's need to be answered before opening a deal](../sales/leads/#from-sql-to-opportunity)  |
| Customer | An active, paying, user of FlowFuse. |
| Evangelist | FlowFuse will not actively use Evangelist lifecycle stage. |
| Other | Does not fit into any of the other descriptions, likely someone we are talking to about FlowFuse, but will never be a paying customer, .e.g. Partners |

### Lead Status

When defining a new contact in HubSpot, an option exists to define the "Lead Status", this section
details your options here, and when to use the respective value:

| Lead Status | Description |
| - | - |
| None | - |
| Attempted to Contact | A member of FlowFuse has reached out to this contact, but is yet to receive a response. |
| Connected | Two-way conversation has undertaken, but not yet qualified as a Lead. A lead with this status may still be waiting on a booked meeting with a decision-maker on their team or may still be working to establish a budget. |
| Open Deal | Contact has expressed interest in buying FlowFuse, and negotiations are actively open. |
| Unqualified | Contact is no longer interested in FlowFuse. |

### Outbound

`Activation Outbound` is a custom property that's set to `Yes` when the first meeting with the contact came through outbound
drip campaigns or other outbound lead-gen actions. This property will be set to `Yes` when the contact was in HubSpot
through other marketing activities too, but wasn't nurtured to the point of a meeting yet.

## Importing Contacts Into HubSpot

If you import contacts into HubSpot, it is important that the First Name and Last Name are populated correctly. Currently the FlowFuse Cloud database stores first and last name in a single field called Name. If you import this field into HubSpot the default is set to populate the Last Name field. The First Name field will not be populated so any email personalization with First Name will not be effective.  

The ideal process for importing FlowFuse Cloud contacts is that you first split the Name field into a First Name and Last Name. Google Sheets has the ability to split a column of text into two columns based on the delimiter of a space. Once that is completed then you can import the list into HubSpot.

## Recommended Apps

We have several extension applications for HubSpot, these are a few that can be beneficial if you're interacting with customers:

- **G-Mail Extension ([link](https://app-eu1.hubspot.com/ecosystem/26586079/marketplace/apps/sales/sales-enablement/gmail))** - Automatically creates contacts when you e-mail them for the first time, and logs e-mail activity against that contact in HubSpot.