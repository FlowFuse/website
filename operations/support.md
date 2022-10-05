# Support

## Customer type
The level of support provided to a customer will depend on the tier of our product they are using:

- *FlowForge Cloud* customers can raise a support ticket by emailing support@flowforge.com
- *Self Managed - Community Edition* users should be directed to raise a GitHub issue in the main flowforge repository (https://github.com/flowforge/flowforge) 
- *Enterprise* customers will have their own custom arrangements, TBC



## Support Tickets

### Freshdesk
We use freshdesk to manage our customer support tickets for FlowForge Cloud, there is currently a single login for the support user in the Support Vault of 1Password.

Whenever a customer raises a new ticket or replies with an update a message is posted into slack #support-tickets.
This will allow the whole team visibility of customer issues, comments on the slack thread will be added to the ticket as notes. _Note: because of the way the slack integration works freshdesk won't show who has made the comment, so please add your name_

When you reply to a customer via the Freshdesk UI the ticket will be automatically marked as resolved. If the customer responds back the ticket will be marked as open again. If you don't need to respond to the customer and you feel the ticket is resolved please manually set the ticket status to be resolved in the Freshdesk UI.

Initially the Product Manager will monitor and respond to customer tickets, however if they are out for some reason anyone can take over.

Freshdesk uses notes and responses within the thread, notes are internal and not sent to the customer, responses are sent to the customer.


### Scope of Support

Initially FlowForge Cloud customers will only get support for issues relating to the flowforge application or their account & billing. Any questions around Node-RED itself or their flows should be redirected to the usuall Node-RED community channels, eg Discourse, Slack etc. It is reasonable to also point a customer direct to a repo for a 3rd party node question.

### SLA

Support will be avaible between 0900-1700 UK Time Monday to Friday, with anything outside of those times on a 'best effort' basis. We aim to provide an initial response or acknowledgement to a customers ticket within 4 hours during those times. No further commitments are made in terms of resolution times at this stage.

### Escalation

Where the issue relates to a bug in the flowforge application then the person dealing with the ticket should aim to reproduce that bug and then raise an appropriate issue in GitHub, The issue should reference the support ticket but not mention the customer by name. Once raised the issue url should be added to the ticket and shared with the customer for visibility. The ticket should not be closed until the bug is resolved.

