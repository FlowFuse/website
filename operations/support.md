# Support

## Customer type
The level of support provided to a customer will depend on the tier of our product they are using:

- *FlowForge Managed* customers can raise a support ticket by emailing support@flowforge.com
- *Self Managed - Community Edition* users should be directed to raise a GitHub issue in the main flowforge repository (https://github.com/flowforge/flowforge) 
- *Enterprise* customers will have their own custom arrangements, TBC

## Support Tickets

### Freshdesk
We use FreshDesk to manage our customer support tickets for the managed FlowForge platform. We can give each FlowForge team member access to FreshDesk by assigning them as either a full time or occasional Agent. An explanation of the Agent types can be [read here](https://support.freshdesk.com/en/support/solutions/articles/37602-understanding-full-time-vs-occasional-agents#:~:text=Agents%20in%20Freshdesk%20can%20be,CEO%20or%20your%20field%20staff.).

If you wish to be granted access to FreshDesk please post in the FlowForge support-tickets Slack channel.

Whenever a customer raises a new ticket or replies with an update a message is posted into slack #support-tickets.
This will allow the whole team visibility of customer issues, comments on the
Slack thread will be added to the ticket as notes.

When replying to the ticket one should have the intent to always reply with links
to FlowForge articles or documentation. If these resources are missing, please
start or update where applicable.

When you reply to a customer via the FreshDesk UI the ticket will be automatically marked as resolved. If the customer responds back the ticket will be marked as open again. If you don't need to respond to the customer and you feel the ticket is resolved please manually set the ticket status to be resolved in the Freshdesk UI.

Freshdesk uses notes and responses within the thread, notes are internal and not sent to the customer, responses are sent to the customer.

We monitor the time since a ticket on FreshDesk was last updated and send alerts to slack #support-tickets where those tickets have not been updated for longer than:

1 day for customer created support tickets.

7 days for tickets related to failed billing actions.

If you want to assign a ticket to be a 'failed billing action' please assign the tag 'billing' to that ticket in FreshDesk.


### Scope of Support

Initially FlowForge customers will only get support for issues relating to the
FlowForge application or their account & billing. Any questions around Node-RED
itself or their flows should be redirected to the usual Node-RED community
channels, eg Discourse, Slack etc. It is reasonable to also point a customer 
direct to a repo for a 3rd party node question.

### SLA

Support will be available between 0900-1700 UK Time Monday to Friday, with anything outside of those times on a 'best effort' basis. We aim to provide an initial response or acknowledgement to a customer's ticket within 4 hours during those times. No further commitments are made in terms of resolution times at this stage.

### Escalation

Where the issue relates to a bug in the flowforge application then the person dealing with the ticket should aim to reproduce that bug and then raise an appropriate issue in GitHub, The issue should reference the support ticket but not mention the customer by name. Once raised the issue url should be added to the ticket and shared with the customer for visibility. The ticket should not be closed until the bug is resolved.

