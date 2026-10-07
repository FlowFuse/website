---
title: "Internal Websites"
---
# Internal Websites

Internal Websites is where team members publish static web pages for each other:
reports, dashboards, one-pagers, journey maps and small tools. Each site gets its
own address:

`https://internal-websites.flowfuse.cloud/sites/{site-name}/`

It runs on a FlowFuse Hosted Node-RED instance in our own FlowFuse team. The upload
page is called the Dropzone.

## Who can see a site

A site opens only for people who are logged in to FlowFuse Cloud and are members of
the FlowFuse team. Anyone else is sent to the FlowFuse login page. Links to a site
will not work for customers, partners or the public.

Every team member can open every site. Before you publish, check the page against
the [data management policy](/handbook/company/security/data-management/): Public and
Internal data can go on Internal Websites. Critical data, such as personal data or
credentials, and Confidential data, such as HR data, cannot.

## Publish with Claude

Claude has a **Dropzone Upload** skill that publishes to Internal Websites. Ask Claude
to build a page and publish it, for example:

- "Build a one-page summary of these call notes and publish it to internal websites."
- "Upload this HTML file to the Dropzone as `quarterly-review`."

Claude uploads the files and replies with the site's address. If Claude does not use
the skill on its own, name it: "Use the Dropzone Upload skill to publish this."

## Publish by hand

1. Put the page and everything it loads (styles, scripts, images) in one folder, with
   the main page named `index.html`.
2. Name the folder after the site you want. The folder name becomes the site name.
3. Open the [Dropzone](https://internal-websites.flowfuse.cloud/dropzone) and drag the
   folder onto it.

The Dropzone shows the new site's address when the upload finishes, and lists all
published sites below the drop area. Large files, such as videos, upload fine.

## Good to know

- **Name the main page `index.html`.** The site address opens `index.html`. A page with
  any other name only opens at its full address, such as
  `/sites/quarterly-review/report.html`. When Claude uploads a single file, it names
  it `index.html` for you.
- **Use lowercase site names with dashes**, such as `quarterly-review`. The name is part
  of the link people share, so make it describe the page.
- **Pick a name that is not taken.** Uploading to an existing site name replaces the
  files at the same path, so a reused name can overwrite someone else's page. Check
  the list on the Dropzone first.
- **Keep your own copy.** Site files are not part of the instance's snapshots, so
  Internal Websites is not a backup. Keep the source in Google Drive or a repository.
- **A page does not update itself.** It shows the data it was built with. For numbers
  that need to stay current, build a dashboard in the tool that holds the data, such as
  PostHog or HubSpot.
