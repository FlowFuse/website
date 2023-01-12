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

 - [Values](./company)
 - [Strategy](./company/strategy.md)
 - [Operations](./operations)
 - [Product](./product)

### Development & Design Practices

 - [Design](./design)
 - [Development](./development)
 - [Videos](./marketing/videos.md)

### Sales and Marketing

 - [Sales](./sales)
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

The handbook is maintained on [GitHub](https://github.com/flowforge/handbook) and contributions can be made through pull-requests.

All changes merged to the `main` branch will be automatically deployed to the handbook on the
[FlowForge website](https://flowforge.com/handbook).

#### Private information

Whilst instinctively we want to be open in all we do, there will inevitably by content that is not appropriate
to make public. That content should be shared on the FlowForge Google Drive.

## Building the site locally

To run a local copy of the handbook you first need to clone the website and the handbook into side by side directories.

Once you have them both cloned, open a **bash** terminal in the website root directory and install the project dependencies. Then, run the website's eleventy server:

From the website directory:

```bash
npm install

npm start
```

This will run the website on http://localhost:8080, and then you can access the Handbook at http://localhost:8080/handbook. This will automatically reload whenever any content is changed.

**Note:** if you modify any of the Handbook's CSS, it may take a while for the website to recognise the changes. As a shortcut, you can run `npm run tailwind` to rebuild the CSS content.
