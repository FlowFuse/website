---
navTitle: Billing
---

# Billing

We use Stripe to bill our customers and to manage subscriptions for FlowFuse.
Team members will be given a login to the  Stripe dashboard as required for
their role with an appropriate level of access.

We also contract with Formation Financial to help assist with business administration and billing support. You can direct any billing related requests to billing@flowfuse.com for their assistance if preferred.

You should first get approval from the CEO or CTO to make any changes to existing subscriptions. Use coupons as described below when providing customer access to resources subscribed to through pre-paid deals.

## Providing support

The main use of the Stripe dashboard will be to answer queries on a customers subscription, this should only be in relation to a ticket raised by the customer and we *must* confirm that the customer team in question on the support ticket is the same one you are looking at it Stripe. Remember that the email address in Stripe may not match that of the FlowFuse user as this is a "billing email". You should use the team ID numbers in the metadata field to confirm.

The customer must first configure their billing details within their FlowFuse account for Stripe to recognize that the customer exists in the system.

## Invoices

For all monthly recurring invoices Stripe will automatically generate an invoice
and charge customers based on their payment method filed with Stripe.

For annual subscriptions, which could also be self-managed, invoices are created
in Stripe. These invoices are created manually *after* the customer has agreed
on the [quote](/handbook/customer/sales/engagements#generating-a-quote-and-order-form) and
[terms](/handbook/customer/legal/#subscription-agreement).

### Creating an invoice

1. Log into Stripe
1. Click `Billing` in the nav bar, followed by going to the invoices tab
1. Click the `Create invoice` button
1. Select the customer the invoice is for, or create one.
1. Add the line items with the right pricing
1. Ensure customers can pay with ACH and Credit card
1. Mention the accepted quote in the memo
1. Review the invoice and send it to the customer for payment

When the invoice is generated and send to the customer you can go ahead with
providing them they [license for self-managed](/handbook/customer/sales/meetings/poc#generating-a-license),
or [create a coupon](#coupons) and apply that to the FlowFuse Cloud team.

## Coupons

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

## Credits

Occasionally we may need to apply a credit to a customers account as a goodwill gesture to cover an issue they have experienced, this should be the exception and must be approved by either CTO or CEO. We will also check to see if the customer has received any previous credits on their account.
