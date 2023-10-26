### Lead status

For leads who are [MQLs or SQLs](/handbook/marketing/hubspot/) the `Lead status`
field is used to mark what the status is. Even though they're beyond being a lead.
This field is maintained by the primary contact owner, likely the account executive.

At this stage we're using the default set of status's in HubSpot:

| Lead status | When to use |
| :---------: | :---------- |
| New | The contact in question has had only _marketing_ contact (E-mails, etc). |
| Open | In the stage where a contact is assigned to a Account exec, but no official connection has be made. Usually contacts are only in this stage for a short while.|
| Attempted to contact | From the moment the AE reached out, until there's a reply from them. |
| Connected | MQLs and SQL that have replied and engaged with FlowFuse. |
| In Progress | After contact has been made, this status captures the nurturing process toward an opportunity. |
| Open Deal | When a deal is on the board, and the opportunity is real, this is the status! |
| Unqualified | Either this contact specifically cannot lead the sales process, or the account itself has been found unqualified. |
| Unresponsive | We have not received a reply in 2 weeks, they are ghosting us. |
| Bad timing | FlowFuse was, for whatever reason, not a great fit right now. However, it's potentially a good fit later. |

### From MQL to SQL - Qualifying questions

1. Have you adopted Node-RED? If so, what have you built with Node-RED?
1. How many Node Red instances do you have, and how many people are developing on Node-RED?
1. Is Node-RED used in production?	
1. What are you looking to build in the next year with Node-RED?

### From SQL to Opportunity

For each sales opportunity a clear answer for the customers needs and wants should be known. It boils down to the following questions:

| Question | |
| :------- | :------ |
| Why change? | What's the trigger to invest in FlowFuse and Node-RED? |
| Why now? | Timeline is everything! |
| Why FlowFuse? | What value does FlowFuse offer, what features are of most interest? |

If, and only if, the answers are known and added as notes to HubSpot, an
opportunity is added to the HubSpot deals board.

### HubSpot Properties

`Activation Outbound` is a custom property that's set to `Yes` when the first meeting with the contact came through outbound
drip campaigns or other outbound lead-gen actions. This property will be set to `Yes` when the contact was in HubSpot
through other marketing activities too, but wasn't nurtured to the point of a meeting yet.

See also the [stages each contact in HubSpot must go through](/handbook/marketing/hubspot.md#lifecycle-stage).
