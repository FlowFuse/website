---
navTitle: Engagements & Pricing
---

# Engagements

Pricing is publicly available at [our pricing page](/pricing/). When discussing
pricing with enterprise customers, make a copy of
[our internal pricing template deck](https://docs.google.com/presentation/d/1kaW6aZxpnCaVuQVdVsi0RTulhRMbeqglhZHkzSP-2kM/)
to discuss.

## Creating a Deal

A deal is opened when the correct stage of the
[SPICED methodogy](https://docs.google.com/spreadsheets/d/1WKz_ll6bLxkkRlZ4K94Va1laGksHXleo8Pnv0aB08lU/)
has been achieved.

To open a deal, be sure to set the correct properties.

1. Deal Type
   - New Business - For new customers or departments
   - Expansions - Upsells that are to be booked in-term
   - Renewal - Changes to the subscription effective on renewal date

## Generating a Quote

Clearly written, easy to understand quotes are crucial for customers to
understand what they are purchasing and how much it costs. To create a quote,
combine the (1) product plan and (2) other purchased items according to the
following guide.

### What to Quote

When preparing a quote, include both the plan and any extras that go beyond what
comes with the plan at the designated tier. Include a note in the Terms section
that indicates what comes with the plan. (This will be pre-filled when using one
of the HubSpot quote templates). The product plan will be listed as its own
line, with a quantity of 1, and the minimum purchase price for that plan. The
add-on options should also be added to the product section, as referenced by the
purchase term template.

| Item & Description                   | Quantity | Unit Price  | Total  |
| ------------------------------------ | -------- | ----------- | ------ |
| FlowFuse Enterprise Platform - Cloud | 1        | $X,000/year | $X,000 |
| Enterprise - Instance Add-On         | 10       | $X,000/year | $X,000 |
| Enterprise - Remote Device Add-On    | 10       | $X,000      | $X,000 |

Annual Subtotal	 $XX,000\
**Total** $XX,000

### Creating a Quote

Follow these steps to create a quote.

1. In HubSpot, open the relevant Deal. In the Quotes area, click Add to begin a
   new quote.
   - Ensure the Deal Type is set up, "Expension" is an in-term upsel
2. Fill in the Buyer Information section. This will pre-fill with the
   information from the contact in the Deal.
3. The default Quote creator will be you. Change this if necessary.
4. Add Line Items per
   [the instructions](/handbook/sales/engagements/#what-to-quote)
   - Select the appropriate Plan that is being quoted
   - For each line item, except Professional Services, check the Billing
     frequence to `Annual` and if the terms *_ensure automatic renewal_
   - Adjust fields for Term and discount/fee/tax as needed.
   - Add Add-on line items for purchases that exceed features that are included
     with the Plan.
5. Set Signature and Payment settings as needed. Ensure a countersignature is
   required from either the CEO or Head of GTM.
6. In the Template and Details section, choose the appropriate Quote Template
   from the dropdown menu. Choosing the correct Quote Template is important
   because it will pre-fill the correct plan features onto the quote. You can
   include additional Comments to Buyer or Purchase Terms here. They will not
   overwrite the Terms and Comments included with the Quote Template.
7. Review your Quote, and when everything is correct, click Create to create the
   quote attached to the relevant Deal.

## Closing a deal

A deal is considered closed when all the outlined steps below are completed.
Starting the closing process can commence when the customer has legally
committed to purchase our products or services. This commitment must be
evidenced by one of the following:

- **Receipt of a Customer Purchase Order (PO)**: A document issued by the
  customer, authorizing the purchase of specified goods or services at a
  specified price.
- **Signed Company Quote**: A formal, written quotation provided by our company,
  which has been duly signed, indicating their acceptance of the terms and
  conditions outlined therein.
- **Note**: In the event a customer does not return a signed Company Quote,
  the PO must include the Company Quote Reference Number found in the upper
  right corner of the Company Quote (e.g. Reference: 20250820-153746396)

Important Note: Verbal agreements, informal emails, or other non-binding
expressions of interest do not constitute a closed deal. The legal commitment,
as evidenced by a PO or signed quote, is the sole determinant.

### Steps for the AE to complete

1. Verify, again, if the quote has all the right properties set according to
   [Generating a Quote](#generating-a-quote) instructions.
   - Verify the Deal amount is set correctly based on Deal Type:
     - New Business: ACV (Annual Contract Value)
     - Expansions/Renewals: Incremental ARR
   - On the Hubspot Deal view, check and update:
     - Hosting Environment
     - Contract Start Date
     - Company address
     - Renewal Date
     - Use Case
     - Spiced
     - Amount in USD based on Deal Type:
       - New Business: ACV (Annual Contract Value)
       - Expansions/Renewals: Incremental ARR
   - Under contract management; check the box for MSA if a custom subscription
     agreement is agreed upon.
1. Upload the documents to the Google Drive in the correct directory
   - [Signed quotes and P.O.'s](https://drive.google.com/drive/folders/1Nb3UqFiE56ymgQnyfkDKHMAe6L3akNzQ)
   - If negotiated custom, the
     [Subscription agreement](https://drive.google.com/drive/folders/1h6jBvkJ2oDrBL7jw751RfAzBKkkprKDc)
1. Send an email to the customer and the assigned CSM to make the introduction.
   - Also verify if a P.O. number is known for them internally, to put on the
     invoice
1. Move the deal to `Closing` in HubSpots Deal overview, update the close date
   to when the customer committed to purchasing.

### Steps for the CSM to complete

1. Check the signed quote for:
   - Start date
   - Renewal date
   - Are line items recurring, or not?
   - Is an MSA agreed upon, and stored in the Google Drive?
1. Create the
   [subscription](/handbook/operations/billing/#creating-a-subscription)
1. If the signed quote is either an upsell or renewal, update the subscription with the line items and new pricing.
1. If a P.O. number has to filed on the invoice, create invoice manually
1. Provide access to the agreed upon line items
   - _Cloud_
     - Set up a team on FlowFuse Cloud for the customer in the right tier
     - Set the customer team to
       [enter manual billing mode](/handbook/operations/accounts/#internal-teams-and-contracted-revenue)
     - Invite customer as owner to the team
     - Remove own email adress after sign up customer
   - _Self-Managed_
     - Generate a [license key](../sales/meetings/poc.md#generating-a-license)
     - Send the license key with the onboarding email to the customer, following
       this
       [Hubspot Template](https://app-eu1.hubspot.com/templates/26586079/edit/135404737?q=welco&page=1).
1. If Professional Services are included, inform the PS team of deal.
1. Add customer to onboarding stage in the CSM tracking document.
1. Move the deal to `Closed Won` stage.
1. Check if a new renewal deal is automatically generated under the correct terms and closing date.
1. Add the following to the deal: 
- Hosting Environment
- Contract Start Date
- Company address
- Renewal Date
 
## Deal Approval Process (Deal Desk)
To ensure consistency and efficiency in our deal cycles, all proposals must follow the established Deal Desk workflow. This process covers the end-to-end journey from initial proposal creation through security review and final legal/contract execution.

### Overview of the Flow

#### Proposal Stage

Sales reps create proposals and determine if the deal structure (discounts, terms, payment schedules) is standard. Non-standard deals are routed to the CEO via Slack for approval.

```mermaid
graph TD
    %% Nodes
    Start["Is the deal structure standard?"]
    AcceptProposal["Customer accepts the Proposal 'Agreed in Principle'?"]
    Negotiate["Rep must negotiate with the customer"]
    DealCriteria["Is there a discount?
                Is the term > 1 year?
                Payment terms > Net 30<br />"]
    CEO["Route to CEO for Slack approval"]
    Security["<b>Go to Security Process</b>"]

    %% Connections
    Start -- Yes --> AcceptProposal
    Start -- No --> DealCriteria

    AcceptProposal -- No --> Negotiate
    AcceptProposal -- Yes ----> Security

    Negotiate --> Start

    DealCriteria -- No --> Security
    DealCriteria -- Yes --> CEO

    CEO -- Reject --> Negotiate
    CEO -- Accept --> Security
**Security Review**: If a customer requires a security review, the AE coordinates between the customer's questionnaire and the CTO/Engineering team to provide approved answers.
**Legal & Contract Process**: This stage handles the Master Subscription Agreement (MSA). Depending on whether the customer accepts our standard MSA or requests minor/major redlines, the contract is routed to Legal (Amy) and/or the CEO for cost and term approval before final signature.

Please follow the detailed step-by-step routing and decision points outlined in the [Deal Desk Flow Document](https://docs.google.com/presentation/d/1dnv-x9YMHirI3ctVLl2paRScoTwgwWXdLn1rG3rlFbc/edit?usp=sharing)
