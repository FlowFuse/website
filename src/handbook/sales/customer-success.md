---
navTitle: Customer Success
---

# Customer Success

FlowFuse CSMs are to drive adoption and expansion within accounts. Customers
should be provided help and support to connect their assets, build applications
for their organisation, and automate workflows. To do so, a playbook is created
to build one way we do things and have one asset to update with the learnings.
The purpose of this playbook is to ensure FlowFuse customers build applications
to optimize their operations, thereby positioning FlowFuse as the platform over
traditional Manufacturing Execution Systems (MES) and Supervisory Control and
Data Acquisition (SCADA) systems. FlowFuse is focussed on
farming/growing/cultivation. We're a hunter organization at first, though, the
market currently accepts our product mostly through internal growth.

## Engagement and Responsibilities

CSM should be involved as soon as account executives **commit to a deal**. This
is before a deal closes and is signed. From the moment an AE commits to a deal
onboarding starts for CSM. To understand what their high-level goals are with
our product, and what the company as vendor can provide soon to a new customer.
The AE will
[close the deal](/handbook/sales/engagements/#closing-a-deal), at which
point CSM takes over.

Onwards, CSM is responsible for the full customer lifecycle, from establishing
onboarding progress and completing this process, managing and tracking what's
being built on our platform and the strategic significance, and ensuring
inspiration to build new things right after. Throughout having customers achieve
value and Return on Investment (ROI), cultivating internal champions, and
driving strategic expansion (horizontal and vertical). CSMs are also the primary
FlowFuse contact that can establish and accelerate the pace of replacing or
augmenting legacy MES/SCADA systems with our product. In turn resulting in
higher net revenue retention (NRR) rates, and the development of strong customer
advocacy that will further fuel FlowFuse's growth.

## Customer Success Methodology

The basic principal of CS is to help customers succeed in their goals by getting
value from our services. The assumption is, where customers get value they are
likely to consciously recognize that value, be open to gaining more value, and
recommending FlowFuse to potential customers. This should in turn result in
customers remaining with FlowFuse for longer, delivering greater revenue, and
encouraging more of their professional and personal networks to join FlowFuse.

FlowFuse has a diverse customer-base. When devising a strategy to deliver CS it
is important to recognise the key cohorts within our customers. They are grouped
as follows:


| Cohort     | Key Traits                                                     |
| ---------- | -------------------------------------------------------------- |
| Trial      | Not paying for services                                        |
| Starter    | Low number of Node-RED instances                               |
| Pro        | Smaller applications, collaboration on applications            |
| Enterprise | Large scale applications, extensive use of FlowFuse's features |

You can view our current customer-base and their cohorts in
[this report](https://main.flowforge.cloud/ui/#!/7?socketid=reLw4efoWf45RfOsAACH){rel="nofollow}.

CS activity is planned to manage each of the cohorts with appropriate support &
communications. The support and communications will be in some cases fully
automated and in others will involve individual actions by our CS team, such as
holding regular review meetings with customers.

The key goal of CS is to migrate customers from the trial status, down the table
of cohorts above, and where appropriate onto being an Enterprise customer. It is
however important to consider that some customers would not benefit from our
broadest offerings of services. Appropriate resources should be put into
customers who have found lasting value further up the cohorts table.

To ensure a smooth onboarding experience and long-term success for our customers, we follow a structured [Customer Success Playbook](https://docs.google.com/document/d/1LqttB5AWueJfahdCciqloS4MSRhDZQRVHjla5xR4toU/edit?tab=t.0#heading=h.rwalcx5xuqez) for our Pro and Enterprise customers. This playbook outlines key activities, engagement points, and best practices that guide our Customer Success team in supporting each customer’s goals throughout their journey with FlowFuse.

## Playbooks

- [Onboarding Playbook](https://docs.google.com/document/d/1yxO53QHwBChNAoERLlB0kGRCNdPJzzHV9X0aLZKX8HU/edit?tab=t.0)
- [CS health score](https://docs.google.com/document/d/1zdbhuljqM9AU5ok9Mq24xOiD7-YUHJunO3NNYLcdtZM/edit?tab=t.0)
- [Churn Playbook](https://docs.google.com/document/d/1jrtTNEFgiY3NTHMBMm67y2P1Pm3qeIsxy8mckOEg9s4/)
- [Expansion & Growth](https://docs.google.com/document/d/1MPgtKuI3pSD5yIgWaSfywxP8YrqAdFjgmfLPB7V9sGE/edit?tab=t.0)
- [Meeting structures](https://docs.google.com/document/d/1_s9JW-cD9yuRKS1Ztcc29wtxGIrdmhKjwZyoDIkkMRE/edit?tab=t.5xzj4a2p6zxn)

## Customer Success Tools

### Data Sources

To drive CS, we need to utilise data across various platforms to understand what
our customers need from us to succeed. the main platforms we use are as follows:

| Platform                  | Key Data                                                                    |
| ------------------------- | --------------------------------------------------------------------------- |
| FlowFuse Cloud's Database | Current usage of the platform and uptake of features                        |
| Stripe                    | Expenditure                                                                 |
| Hubspot                   | Interaction with support and marketing content on our website and in emails |
| GitHub                    | Record of upcoming and shipped features                                     |

### Useful Customer Data

- [Team, User, Instances & Devices Growth](https://main.flowforge.cloud/ui/#!/0?socketid=LPUnOyHnjGM_GqrnAAAd)
- [Customer Cohorts](https://main.flowforge.cloud/ui/#!/1?socketid=LPUnOyHnjGM_GqrnAAAd)
- [Device Agent Adoption](https://main.flowforge.cloud/ui/#!/2?socketid=LPUnOyHnjGM_GqrnAAAd)
- [User Audit Interactions](https://main.flowforge.cloud/ui/#!/4?socketid=zuEy1h2ZhTjyhCnuAABB)

### Communication

To deliver automated and manual communication with customers, we use Hubspot
CRM. Hubspot allows us to collaborate as a team. This is vital when manually
communicating with customers as well as operating automated email campaigns
based on a customer's current cohort and interaction with their account.

We have built an integration in Node-RED which can extract data from our
platforms then append it to a customer's record in Hubspot. The integration as
well as any other CS resources built in Node-RED are hosted on FlowFuse Cloud
and can be
[accessed in this application](https://main.flowforge.cloud/){rel="nofollow}.

## Shipped Feature Updates

Customer success contacts FlowFuse customers and prospective customers (anyone we have had in a sales cycle who has requested a feature) when a requested feature is shipped. To facilitate this, there is a view in the Development board on GitHub called ["CS View"](https://github.com/orgs/FlowFuse/projects/1/views/61). It filters to all issues marked Done by the Engineering team, and those with the label Sales Request or Customer Request. The Customer Success Manager will review this board upon each release and contact customers or prospects who requested a feature to inform them that it has shipped, and invite a conversation or feedback.

All team members are asked to identify customer and prospect requests in the following way:
- On a GitHub issue, use the label Sales Request or Customer Request, as appropriate. (A request is a Sales Request when a member of the Sales team learns that a prospect is interested in a feature. It is a Customer Request when an existing customer makes a request. An issue can be both a Customer Request and a Sales Request.)
- On the main issue, list the customer record in HubSpot. Do this on the main issue rather than a comment, as these can be lost.
- If an issue already exists and a new request is made, add this information to the existing issue. This helps keep a comprehensive record of how many requests of a feature there are, and by whom.


### Hubspot Properties

For FlowFuse Cloud customers, we add various useful data to our CRM records to
help us better understand who each customer is and how they are using FlowFuse.
They are as follows:

| Field name  | Description | 
|----------- | ---- |
| FFC-Tier    | This links each contact on Hubspot to the tier their team is currently associated with. Where a contact is in more than one team with different tiers we will show the tier which is expected to deliver the highest ARR. You can view the current contacts by tier in [this report](https://app-eu1.hubspot.com/reports-list/26586079/182668969/){rel="nofollow"}. |
| FFC-Actions | This shows actions which have been taken by someone on a team this contact is on. To see a full list of available actions view [this report](https://app-eu1.hubspot.com/reports-list/26586079/182831966/){rel="nofollow"} in Hubspot |                                                                                                                               |
| FFC-Usage | This field shows a contact's answer to how they are planning to use FlowFuse Cloud, you can view the options and current data on [this report](https://app-eu1.hubspot.com/reports-list/26586079/182851924/){rel="nofollow"}.|
| FFC-Events (deprecated) | This legacy field showed email campaigns which had been triggered to be sent to each contact. For example, after 24 hours if a user had not used out snapshots feature the integration between FlowFuse Cloud and Hubspot would add the relevant tag to this user. Hubspot would in turn send the email to the contact. This way of working is being replaced by FFC-Actions as that field can triggered email campaigns based on action or inaction as well as adding value to our CRM. |

## Inbound Support

For FlowFuse customers, there are two ways to get support, through support
tickets or go to the community forum. Where to go when is described below.

| Topic                     | Support venue                                                      |
| ------------------------- | ------------------------------------------------------------------ |
| Billing                   | [Support ticket][support-tickets]                                  |
| FlowFuse Application      | [Support ticket][support-tickets]                                  |
| FlowFuse Feature Requests | [FlowFuse repository](https://github.com/FlowFuse/flowfuse/issues) |
| Node-RED Application      | [Community Forum][support-forum]                                   |
| Node-RED flows            | [Community Forum][support-forum]                                   |
| Custom nodes              | [Community Forum][support-forum]                                   |

If you're not a FlowFuse customer, or in your trial phase, please go to the
[community forum][support-forum].

### Support Tickets

#### HubSpot

We use HubSpot to manage our customer support tickets for the managed FlowFuse
platform. We can give each FlowFuse team member access to HubSpot by assigning
them a seat.

If you wish to be granted access to HubSpot please post in the FlowFuse
[#support-tickets](https://flowfuse.slack.com/archives/C031K13FLDD)
Slack channel.

Whenever a customer raises a new ticket, a message is posted into slack
#support-tickets.

This will allow the whole team visibility of a new ticket, to reply to a ticket
we need to use the Help
[Desk UI in Hubspot](https://app-eu1.hubspot.com/help-desk/26586079/view/233410279/list-view).
Once you reply to a ticket (if nobody in our team has already replied) you will
be assigned as a ticket owner. Once you are a ticket owner you will get alerts
via the Hubspot Slack app each time a customer replies. You are the only person
who gets these alerts so it's important you deal with them in a timely manner.
You can assign the ticket to someone you feel is a more appropriate owner using
the Hubspot interface in the top right corner of the help desk. You may want to
assign a ticket to a team member if you are out of office due to holidays, time
zones etc so that the customer continues to get the support they need.

When replying to a ticket, you can either send a message to a customer via live
chat or an email. Please ensure you check if the customer is still online before
using live chat, that can be checked by looking for a green circle next to their
avatar on each post. If you don't see the green circle you should switch to
emailing the customer.

You can also add comments to a ticket which will only be visible to our team.
This is a great place to add more context for other team members and ask for
help. You can send an alert to a team member by adding @teammembername to your
comments.

When replying to the ticket one should have the intent to always reply with
links to FlowFuse articles or documentation. If these resources are missing,
please start or update where applicable.

Where a conversation needs to happen with regards to a ticket between FlowFuse
team members, we should use the comments feature in the ticket rather than
having a parallel conversation in Slack. This allows anyone who wants to help
with the ticket can see all relevant information in one place.

Where you can help by replying to a customer you should do so rather than asking
the ticket owner to relay messages. Working this way saves time, reduces the
chance of the wrong information being passed to the customer, and shows that our
wider team is invested in tickets which should have a positive impact on
customer satisfaction.

When a ticket is assigned to you please monitor it for a conclusion. If it's
unclear to you if the customer's request was satisfied please ask the customer
to confirm they don't need any further help. Once the customer doesn't need any
more help on the ticket please close it using the info bar on the right side of
the ticket inbox. Look for the 'Ticket status' section and change the drop down
to closed.

#### Scope of Support

FlowFuse customers will only get support for issues relating to the FlowFuse
application or their account & billing. Any questions around Node-RED itself or
their flows should be redirected to the
[FlowFuse Community forum][support-forum].

3rd party nodes are not supported at this time. It is reasonable to point a
customer direct to a repo for a 3rd party node question.

#### SLA

Support availability and response times are defined by the customer’s subscription level:

- Pro (Standard Support) 
  - Support available 24 × 5 (Monday to Friday, UTC-2 timezone)
  - First Response SLA: Next business day (within 24 hours)  
  - Support tickets can be submitted at [our Support Form](https://flowfuse.com/support/)

- Enterprise (Enterprise Support)
  - Support available 24 × 5 (Monday to Friday, UTC-2 timezone)
  - First Response SLA: 4 hours  
  - Support tickets can be submitted at [https://flowfuse.com/support/](https://flowfuse.com/support/)

#### Escalation

Where the issue relates to a bug in the FlowFuse application then the person
dealing with the ticket should aim to reproduce that bug and then raise an
appropriate issue in GitHub, The issue should reference the support ticket but
not mention the customer by name. Once raised the issue URL should be added to
the ticket and shared with the customer for visibility. The ticket should not be
closed until the bug is resolved.

## Community Forum

As the Node-RED forums are intended to be vendor neutral, FlowFuse has a
[community forum][support-forum] too.

#### Scope of Support

FlowFuse customers will only get support for issues relating to the FlowFuse
application or their account & billing. Any questions around Node-RED itself or
their flows should be redirected to the
[FlowFuse Community forum][support-forum].

3rd party nodes are not supported at this time. It is reasonable to point a
customer direct to a repo for a 3rd party node question.

[support-tickets]: ../../support/
[support-forum]: https://discourse.nodered.org/c/vendors/flowfuse/24

## Quarterly Business Review

For all customers that are over $10k ARR, or are manually nominated because of
their growth potential to the company, a quarterly business review is offered to
them and scheduled. FlowFuse offers these meetings each quarterly, hence the
name Quarterly Business Review (QBR). By meeting, FlowFuse can understand,
pro-actively, how the customer is progressing with their adoption.

Record customer calls using Fathom per the [Sales Meetings guide](/handbook/sales/meetings/).

For each meeting, the goals are:

1. Relationship building -- By having a conversation instead of email, we hope
   there's more space for in-depth discussion and candor in the conversation.
1. Assess Problem-Value alignment -- Understand if the problem the customer felt
   before buying FlowFuse has been mitigated, or what FlowFuse needs to do to
   further mitigate this.
1. Issue prevention -- By proactively reviewing progress, potential roadblocks
   or challenges can be identified and addressed early, preventing customer
   dissatisfaction or churn.
1. Broader feature adoption -- Often customers are paying for a package that
   includes more value than they're currently extracting. Help the customer with
   adoption and getting more value from the product
1. Data collection -- Provide space and time for the customer to provide
   feedback on the product and experience. Allow them to request feature ideas,
   or ask for bug fixes.

## Procedure for Handling a Churned Customer

The Customer Success manager is responsible for executing the following steps
when an annually-billed customer chooses not to renew their subscription:

1. **Update Contracted Customer Tracker** Access the
   [CS Customer tracking](https://docs.google.com/spreadsheets/d/1R7OpMxg-PzXiU1gbh17QaquiQ6bQRQ3gpK1M2LNeVac/edit?gid=0#gid=0)
   and move the churned customer to the "Churned" tab. Add the churn date and the reason for churning. 

2. **Cancel Subscription in Hubspot** Cancel the subscription on their account page in Hubspot, to ensure no further invoices are
   sent.
   
3. **Close Opportunities in Hubspot** In Hubspot, locate any open Growth and
   Renewal opportunities related to the churned customer. Move these
   opportunities to "Closed Lost" to reflect the customer's decision not to
   renew.

4. **Announce Churn in Slack** Post an announcement in the Slack channel
   #dept-sales, summarizing the reasons for the churn. Encourage the team to ask
   questions or suggest ways to learn from the situation.

5. **Send Customer Acknowledgment and Learning Questions** Send an
   acknowledgment email to the churned customer. Include any relevant questions
   aimed at understanding their reasons for churn and gathering feedback for
   internal improvement.

## Notifying Customers of Downtime for FlowFuse Cloud Kubernetes Migrations

Occasionally, we need to restart customer instances of Node-RED on FlowFuse
Cloud to migrate them to a new server at AWS. To manage this, we inform
customers in advance, giving them time to restart their instances. If they don’t
do so within that time, we’ll restart the instances for them. Sometimes, an
instance might not restart properly, so we need to ensure everything works
smoothly and notify the customer with instructions if any issues arise.

Our goal is to minimize the number of customers needing to restart their
instances and reduce how many we need to handle manually. Ideally, the migration
should happen without customers even noticing.

### Steps

1. **Set Up the New Server Early:**\
   The new server should be ready at least 90 days before the migration
   deadline. This ensures any new instances or manual restarts automatically
   move to the new server.

2. **Notify Customers 30 Days Before:**\
   Create a list of instances that need to be migrated 30 days before the
   deadline. Send an email to each team, explaining which instances need to be
   restarted. Make sure the email is clear, concise, and easy to follow.

3. **Review 7 Days Before Deadline:**\
   A week before the deadline, review any remaining instances. If a customer is
   particularly important or has many instances left to migrate, consider
   providing personalized help to ensure a smooth process.

## Handling Requests from Self-Hosted Customers to Enable FlowFuse Assistant
The [FlowFuse Assistant](https://flowfuse.com/handbook/development/ops/self-hosted-assistant/#flowfuse-assistant-plugin) is enabled by default for Cloud customers. Self-hosted customers can use it, too, but must request access through support. 

When a customer requests access to the FlowFuse Assistant, do the following:
1. Route the request to Engineering
2. Note in the customer's page on HubSpot that the customer is using the FlowFuse Assistant. This will enable Customer Success to discuss the feature with the customer and adds to our holistic understanding of the customer.

5. **Handle Final Restarts on Deadline Day:**\
   On the deadline day, go through the remaining instances and restart them.
   Check that each one comes back online properly, and assist customers with any
   issues that come up.
