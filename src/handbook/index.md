---
navTitle: Handbook
---

## Introduction

This handbook contains all the information about how FlowForge Inc. is run.

It's a living set of documents - they will evolve with time and expand as we learn
and discover new things.

The handbook is here for the whole company to help maintain. Pull-requests are welcome
and strongly encouraged.

### Company

 - [Values](./company/values.md)
 - [Vision](./company/vision.md)
 - [Operations](./operations)
 - [Product](./product)

### Development & Design Practices

 - [Design](./design)
 - [Development](./development)
 - [Videos](./marketing/videos.md)

### Sales and Marketing

 - [Sales](./sales/)
 - [Marketing & Communication](./marketing)

### Internal Operations

 - [Communication](./company/communication.md)
 - [PeopleOps](./peopleops)
 - [Security](./company/security.md)
 
### About the Handbook

The FlowForge handbook is inspired by the [GitLab handbook](https://about.gitlab.com/handbook/about/).
As an all-remote company, we share [their rationale](https://about.gitlab.com/handbook/about/#advantages) for having a handbook.

The aim is to avoid institutional knowledge building up inside our heads without
also being written down for others to share. We could do that all on the internal
Google Drive, but by publishing in the handbook it allows for an open and honest
conversation about what we do.


#### Contributing

The handbook is maintained on [GitHub](https://github.com/flowforge/website/tree/main/src/handbook) and contributions can be made through pull-requests.

All changes merged to the `main` branch will be automatically deployed to the handbook on the
[FlowForge website](https://flowforge.com/handbook).

#### Private information

Whilst instinctively we want to be open in all we do, there will inevitably by content that is not appropriate
to make public. That content should be shared on the FlowForge Google Drive.

## Building the site locally

To run the handbook locally, follow the instructions on the [website repository](https://github.com/flowforge/website).

You can access the Handbook at http://localhost:8080/handbook. This will automatically reload whenever any content is changed.

**Note:** if you modify any of the Handbook's CSS, it may take a while for the website to recognise the changes. As a shortcut, you can run `npm run tailwind` to rebuild the CSS content.
