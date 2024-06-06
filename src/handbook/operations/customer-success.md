---
navTitle: Customer Success
---

# Customer Success

Customer Success (CS) helps our customers get value from FlowFuse. This should result in them continuing to use, make broader use of, and become advocates of FlowFuse.

## Customer Success Methodology

The basic principal of CS is to help customers succeed in their goals by getting value from our services. The assumption is, where customers get value they are likely to consciously recognise that value, be open to gaining more value, and recommending FlowFuse to potential customers. This should in turn result in customers remaining with FlowFuse for longer, delivering greater revenue, and encouraging more of their professional and personal networks to join FlowFuse.

FlowFuse has a diverse customer-base. When devising a strategy to deliver CS it is important to recognise the key cohorts within our customers. They are grouped as follows:

|Cohort|Key Traits|
|-|-|
|Trial|Not paying for services|
|Starter|Low number of Node-RED instances|
|Premium|Team of users, collaboration on applications|
|Enterprise|Large scale applications, extensive use of FlowFuse's features|

You can view our current customer-base and their cohorts in [this report](https://main.flowforge.cloud/ui/#!/7?socketid=reLw4efoWf45RfOsAACH){rel="nofollow}.

CS activity is planned to manage each of the cohorts with appropriate support & communications. The support and communications will be in some cases fully automated and in others will involve individual actions by our CS team, such as holding regular review meetings with customers.

The key goal of CS is to migrate customers from the trial status, down the table of cohorts above, and where appropriate onto being an Enterprise customer. It is however important to consider that some customers would not benefit from our broadest offerings of services. Appropriate resources should be put into customers who have found lasting value further up the cohorts table.

## Customer Success Tools

### Data Sources

To drive CS, we need to utilise data across various platforms to understand what our customers need from us to succeed. the main platforms we use are as follows:

|Platform|Key Data|
|-|-|
|FlowFuse Cloud's Database|Current usage of the platform and uptake of features|
|Stripe|Expenditure|
|Hubspot|Interaction with support and marketing content on our website and in emails|

### Useful Customer Data

- [Team, User, Instances & Devices Growth](https://main.flowforge.cloud/ui/#!/0?socketid=LPUnOyHnjGM_GqrnAAAd)
- [Customer Cohorts](https://main.flowforge.cloud/ui/#!/1?socketid=LPUnOyHnjGM_GqrnAAAd)
- [Device Agent Adoption](https://main.flowforge.cloud/ui/#!/2?socketid=LPUnOyHnjGM_GqrnAAAd)
- [User Audit Interactions](https://main.flowforge.cloud/ui/#!/4?socketid=zuEy1h2ZhTjyhCnuAABB)

### Communication

To deliver automated and manual communication with customers, we use Hubspot CRM. Hubspot allows us to collaborate as a team. This is vital when manually communicating with customers as well as operating automated email campaigns based on a customer's current cohort and interaction with their account.

We have built an integration in Node-RED which can extract data from our platforms then append it to a customer's record in Hubspot. The integration as well as any other CS resources built in Node-RED are hosted on FlowFuse Cloud and can be [accessed in this application](https://main.flowforge.cloud/){rel="nofollow}.

### Hubspot Properties

For FlowFuse Cloud customers, we add various useful data to our CRM records to help us better understand who each customer is and how they are using FlowFuse. They are as follows:

| Field name | Description |
|--------|--------|
| FFC-Tier | This links each contact on Hubspot to the tier their team is currently associated with. Where a contact is in more than one team with different tiers we will show the tier which is expected to deliver the highest ARR. You can view the current contacts by tier in [this report](https://app-eu1.hubspot.com/reports-list/26586079/182668969/){rel="nofollow"}. |
| FFC-Actions | This shows actions which have been taken by someone on a team this contact is on. To see a full list of available actions view [this report](https://app-eu1.hubspot.com/reports-list/26586079/182831966/){rel="nofollow"} in Hubspot
 |
| FFC-Usage | This field shows a contact's answer to how they are planning to use FlowFuse Cloud, you can view the options and current data on [this report](https://app-eu1.hubspot.com/reports-list/26586079/182851924/){rel="nofollow"}. |
| FFC-Events (deprecated) | This legacy field showed email campaigns which had been triggered to be sent to each contact. For example, after 24 hours if a user had not used out snapshots feature the integration between FlowFuse Cloud and Hubspot would add the relevant tag to this user. Hubspot would in turn send the email to the contact. This way of working is being replaced by FFC-Actions as that field can triggered email campaigns based on action or inaction as well as adding value to our CRM. |

## Inbound Support

For FlowFuse customers, there are two ways to get support, through support tickets
or go to the community forum. Where to go when is described below.

| Topic | Support venue |
|---|---|
| Billing | [Support ticket][support-tickets] |
| FlowFuse Application | [Support ticket][support-tickets] |
| FlowFuse Feature Requests | [FlowFuse repository](https://github.com/FlowFuse/flowfuse/issues) |
| Node-RED Application | [Community Forum][support-forum] |
| Node-RED flows | [Community Forum][support-forum] |
| Custom nodes | [Community Forum][support-forum] |

If you're not a FlowFuse customer, or in your trial phase, please go to the
[community forum][support-forum].

### Support Tickets

#### HubSpot

We use HubSpot to manage our customer support tickets for the managed FlowFuse platform. We can give each FlowFuse team member access to HubSpot by assigning them a seat.

If you wish to be granted access to HubSpot please post in the FlowFuse [#support-tickets](https://flowforgeworkspace.slack.com/archives/C031K13FLDD) Slack channel.

Whenever a customer raises a new ticket, a message is posted into slack #support-tickets.

This will allow the whole team visibility of a new ticket, to reply to a ticket we need to use the Help [Desk UI in Hubspot](https://app-eu1.hubspot.com/help-desk/26586079/view/233410279/list-view). Once you reply to a ticket (if nobody in our team has already replied) you will be assigned as a ticket owner. Once you are a ticket owner you will get alerts via the Hubspot Slack app each time a customer replies. You are the only person who gets these alerts so it's important you deal with them in a timely manner. You can assign the ticket to someone you feel is a more appropriate owner using the Hubspot interface in the top right corner of the help desk. You may want to assign a ticket to a team member if you are out of office due to holidays, time zones etc so that the customer continues to get the support they need.

When replying to a ticket, you can either send a message to a customer via live chat or an email. Please ensure you check if the customer is still online before using live chat, that can be checked by looking for a green circle next to their avatar on each post. If you don't see the green circle you should switch to emailing the customer.

You can also add comments to a ticket which will only be visible to our team. This is a great place to add more context for other team members and ask for help. You can send an alert to a team member by adding @teammembername to your comments.

When replying to the ticket one should have the intent to always reply with links to FlowFuse articles or documentation. If these resources are missing, please start or update where applicable.

Where a conversation needs to happen with regards to a ticket between FlowFuse team members we should use the comments feature rather than having a parallel conversation is Slack so that anyone who wants to help with the ticket can see all relevant information in one place.

Where you can help by replying to a customer you should do so rather than asking the ticket owner to relay messages. Working this way saves time, reduces the chance of the wrong information being passed to the customer, and shows that our wider team is invested in tickets which should have a positive impact on customer satisfaction.

#### Scope of Support

FlowFuse customers will only get support for issues relating to the FlowFuse
application or their account & billing. Any questions around Node-RED
itself or their flows should be redirected to the
[FlowFuse Community forum][support-forum].

3rd party nodes are not supported at this time. It is reasonable to point a
customer direct to a repo for a 3rd party node question.

#### SLA

Support will be available between during business hours (Berlin time zones)
Monday to Friday, with anything outside of those hours on a 'best effort' basis
unless the customer and FlowFuse agreed otherwise.

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
application or their account & billing. Any questions around Node-RED
itself or their flows should be redirected to the
[FlowFuse Community forum][support-forum].

3rd party nodes are not supported at this time. It is reasonable to point a
customer direct to a repo for a 3rd party node question.

[support-tickets]: ../../support/
[support-forum]: https://discourse.nodered.org/c/vendors/flowfuse/24
