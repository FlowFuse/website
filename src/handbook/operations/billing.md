---
navTitle: Billing
---

# Billing

Subscriptions and their invoices are all stored in Hubspot, and Stripe is used for payment processing for contracted
revenue. For FlowFuse's montly self-service customers Stripe also tracks the subscription instead of Hubspot.
Team members will be given a login to the relevant Stripe and Hubspot dashboard as required for
their role with an appropriate level of access.

## Providing support

The main use of the Stripe dashboard will be to answer queries on a customers subscription, this should only be in relation to a ticket raised by the customer and we *must* confirm that the customer team in question on the support ticket is the same one you are looking at it Stripe. Remember that the email address in Stripe may not match that of the FlowFuse user as this is a "billing email". You should use the team ID numbers in the metadata field to confirm.

The customer must first configure their billing details within their FlowFuse account for Stripe to recognize that the customer exists in the system.

## Invoices

Monthly subscriptions will be automatically generated in Stripe 
and charge customers based on their payment method filed with Stripe. Customers can access their invoices via the 'Stripe Customer Portal' link on their Team's billing page.

Annual subscriptions and invoices are managed in HubSpot, please see instructions below.

### Creating a subscription

To generate a subscription, the corresponding deal and quote must first be in place in HubSpot.

1. Ensure the company details are updated, and include an address and country.
1. On the Deal page, find the Subscription section on the right-hand side, then click Add and Convert Deal to Subscription.
1. Change the dates, terms, products, discounts, contact, and company information if required (most will be correct, since it is pulling from the signed quote).
1. Under Invoice Settings, uncheck the box that automatically emails customers. You will want to manually create the invoice next before sending. This is because the converted subscriptions have limitations on what discounts can be applied.
1. Click the Create button on the top right.
2. [Structuring Subscriptions and Invoicing in HubSpot](https://docs.google.com/document/d/1UtRYUv7Wjb7CjON4DnNgv-nD-Gt4Bytymgtv1y9eLWY/edit?usp=sharing)

### Creating an invoice

1. On the Deal page, find the Invoices section on the right-hand side, then click Create Blank Invoice.
1. Add the corresponding products, dates, discounts, PO number to reflect their first invoice as agreed in the order form.
1. For customers outside of North America, add the customer's VAT idenfication number to the Invoice Comments section. This number can normally be found through Internet search or requesting from the customer directly. 
1. Make sure both ACH and Credit Card options are checked for payment.
1. It will prompt to send the invoice automatically to the billing contact you designated, change date of send if needed.
1. Finalize this manual invoice, then delete the automatically created one from the subscription conversion.

### Creating a PS invoice

For new customers an invoice should be generated in [Hubspot's Invoice section](https://app-eu1.hubspot.com/contacts/26586079/objects/0-53/views/all/list).

1. Ensure the company details are updated, and include an address and country.
2. Ensure the customer provided a PO number if they require one.
3. Create a one-time invoice through Hubspot -- If the customer already is used to paying through Stripe, use best judgement when to switch them over

## Adding a Coupon

From time to time we may wish to provide a user with some free access to 
the managed FlowFuse platform. In this situation we will create a coupon code
in Stripe which can be shared with the users. You should always use list price to calculate coupons.

Please note that only 1 coupon can be applied to an account at a time, so in order to add additional coupons you need to stack their amounts into one large coupon.

To create a couple on Stripe:

1. Log into Stripe.
2. Use the top search bar to 'Create a coupon'. 
3. Give it a name you will remember, ideally descrbing the reason for issuing the coupon.
4. Select fixed amount discount.
5. Don't add more credit than you need.
6. Set the Duration as the shortest amount of time this coupon is needed.
7. Select 'Limit the total number of times this coupon can be redeemed'.
8. Input 1 time.
9. Toggle 'Use customer-facing codes'.
10. Add a code which cannot be easily guessed, ideally a password type format, at least 8 characters with a mix of upper and lower case letters, and numbers.
11. Press 'Create coupon' which is bottom right of the page.

That coupon code can now be used when you are asked to provide payment card details.

## Removing a Coupon

The preferred course of action is to create coupons that will expire on their own. However, in the event that a coupon needs to be removed manually, follow these steps.

1. Find the customer's subscription.
2. Click 'Actions' in the upper-right corner.
3. Choose 'Update a Subscription'. The customer's subscription details are now open.
4. Locate the coupon and remove it.
5. Click 'Update Subscription' to save the changes.

## Credits

Occasionally we may need to apply a credit to a customers account as a goodwill gesture to cover an issue they have experienced, this should be the exception and must be approved by either CTO or CEO. We will also check to see if the customer has received any previous credits on their account.

## Refunds

For customers using self service we will occasionally need issue a refund via Stripe. This can be done by looking the user up, normally via their email address, in the Stripe dashboard. On the customers page there is a section labelled *Payments* which will list recent payments. Select the 3 dots at the end of the last payment line and from the menu select *Refund*. This will present a dialog to adjust the value to be refunded (the last invoice for a closed team will show the remaining credit) and to initiate the refund. You will be prompted to re-enter your password to confirm the refund.

## Failed Payments

In the event that a scheduled payment does not go through, Stripe will retry collecting the payment four times within one week. After all retries fail, Stripe will automatically cancel the subscription and suspend all instances for the team. 

When a payment does not go through, an email is sent from @flowfuse.com. This also applies to cards that are on file with an upcoming expiration date.

For customers paying an invoice, once a payment has been incomplete for 15 days, the invoice is marked as uncollectible.

These settings are configurable by Stripe administrators, here: https://dashboard.stripe.com/settings/billing/automatic.
