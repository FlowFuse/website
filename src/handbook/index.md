---
navTitle: Handbook
---

# FlowFuse Handbook

This handbook contains all the information about how FlowFuse is run. It's a
living set of documents - they will evolve with time and expand as we learn
and discover new things.

Whilst instinctively we want to be open in all we do, there will inevitably be 
content that is [not appropriate to make public][data-class]. That content is not
shared in this handbook.

[data-class]: /handbook/company/security/data-management/#data-classification

The handbook is here for the whole company to help maintain. Pull-requests are welcome and [strongly encouraged](#contributing).

## How FlowFuse is run

To run our company we provide a comprehensive guide outlining policies, procedures, and expectations, fostering consistency, clarity, and effective communication within the organisation.

| | |
|:----|:----|
| [Values](/handbook/company/values.md)<br /><p>The core principles guiding and driving the whole company</p>
| [Vision](/handbook/company/vision.md)<br /><p>Where we're going with FlowFuse</p>|
| [Operations](/handbook/operations/)<br /><p>The day to day operations, tactical bizzops</p>
| [PeopleOps](/handbook/peopleops/)<br /><p>Humans aren't resources, so people ops</p> |
| [Communication](/handbook/company/communication.md)<br /><p>Increase signal, decrease noise.</p>
| <!-- placeholder for now --> |

### How we build the product

| | |
|:----|:----|
| [Product](/handbook/product/)<br /><p>Planning, scheduling, and where the product will be a year from now</p>
| [Development](/handbook/development/)<br /><p>How features are delivered with velocity and quality</p>|
| [Design](/handbook/design/)<br /><p>How information is presented through UX/UI to users, prospects, and internally.</p>
| [Security](/handbook/company/security.md)<br /><p>Keeping what's private private, and what needs protecting protected.</p>|
 

### Bringing the built product to market

| | |
|:----|:----|
| [Marketing](/handbook/marketing/)<br /><p>Keeping what's private private, and what needs protecting protected.</p>
| [Sales](/handbook/sales/)<br /><p>Meeting customer demand.</p>|
| [Customer Success](/handbook/operations/customer-success.md)<br /><p>Happy customers is what makes FlowFuse a sustainable business.</p>
| |
 
### About the Handbook

The FlowFuse handbook is inspired by the [GitLab handbook](https://about.gitlab.com/handbook/about/).
As an all-remote company, we share [their rationale](https://about.gitlab.com/handbook/about/#advantages) for having a handbook.

The aim is to avoid institutional knowledge building up inside our heads without
also being written down for others to share. We could do that all on the internal
Google Drive, but by publishing in the handbook it allows for an open and honest
conversation about what we do.

#### Contributing

The handbook is maintained on [GitHub](https://github.com/flowforge/website/tree/main/src/handbook) and contributions can be made through pull-requests.

All changes merged to the `main` branch will be automatically deployed to the handbook on the
[FlowFuse website](https://flowfuse.com/handbook).

##### Building the site locally

To run the handbook locally, follow the instructions on the [website repository](https://github.com/flowforge/website).

You can access the Handbook at [http://localhost:8080/handbook](http://localhost:8080/handbook).
This will automatically reload whenever any content is changed.

**Note:** if you modify any of the Handbook's CSS, it may take a while for the website to recognise the changes. As a shortcut, you can run `npm run tailwind` to rebuild the CSS content.
