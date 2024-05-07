# FlowFuse Website

[![Build Site](https://github.com/FlowFuse/website/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/FlowFuse/website/actions/workflows/build.yml)

This repository contains the source of the FlowFuse website.

It is built using [Tailwind CSS](https://tailwindcss.com/) and [Eleventy](https://www.11ty.dev/).

It is hosted on Netlify with each commit to the `main` branch being automatically deployed to the live site.

This works by a GitHub action automatically updating the `live` branch to includes documentation pulled from the `main` branch of the [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
repository, when changes are pushed to `main`.

Netlify is then configured to watch the `live` branch for any changes, once detected, it will automatically pull the contents of this branch (docs included) and deploy to our production site.

## Prerequisites 

### Linux/MacOS
* `git` ([download](https://git-scm.com/downloads))
* `nodejs` ([download](https://nodejs.org/en/download/))
   * IMPORTANT: Developer tools should also be installed
* `jq` ([download](https://stedolan.github.io/jq/))

### Windows
* `git` and `gitbash` ([download](https://git-scm.com/downloads))
* `nodejs` ([download](https://nodejs.org/en/download/))
   * IMPORTANT: Select the [x] checkbox to install developer tools when asked
* `choco` 
   * Installed as part of the Node JS installer
   * Needed for installing `jq`
* `jq` ([download](https://stedolan.github.io/jq/))
   * From a administrator terminal, run `choco install jq`

## Building the site locally

First clone the repository with `git clone https://github.com/FlowFuse/website.git` or
using a Git client like VS Code. After cloning the repository, open a
terminal inside the newly cloned `website` directory and install the project dependencies, then run the build and the website
(driven by eleventy) server:

```bash
npm install

npm start
```

This will start a server on http://localhost:8080 that will automatically reload whenever
any content is changed. 

**Note**: the first time running this, it may take a little while as it
needs to parse all images in the `/docs` and `/handbook` folders. You will
see a `404` at `localhost:8080` during this time.

**Note**: If running from within VS Code, you may be prompted with the following:

```
Would you like to configure VS Code to use Edge Functions? (Y/n) 
A new VS Code settings file will be created at /Users/joepavitt/Documents/FlowFuse/development/FlowFuse/website/.vscode/settings.json
```

It is recommended to response `y` to both of these questions.


### Running FlowFuse Documentation

Much like our Handbook, the documentation for FlowFuse are also maintained in a separate repository. Our docs are maintained in the core [FlowFuse repo](https://github.com/FlowFuse/flowfuse).

If you want to run a local version of the documentation, you'll need to clone the FlowFuse repository alongside the website, e.g.:

```
/<parent_directory>
    /website
    /flowfuse
```

The `npm run start` command that starts the Website server will retrieve the documentation from that folder, and automatically inject them into the website for your viewing. Any changes made to the documentation in the `/flowfuse/docs` folder, will automatically refresh the website. The docs will be available at http://localhost:8080/docs.

## How to add blog posts

Add a new markdown file to `src/blog/` with the following metadata in the top:

```
---
title: My post title
subtitle: A subtitle
description: A short description of the post
date: 2020-04-06
authors: ["nick-oleary"]
---
```

The `authors` list should correspond to an entry under `src/_data/team`.

## Updating the FlowFuse Documentation

When the website is built it will include the documentation
from the `main` branch of the [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
repository.

To make a documentation update *and* make it live on the website:

1. PR the documentation update to the `main` branch of [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
2. Get the PR reviewed and merged in the normal manner.
3. Manually kick-off a website rebuild by clicking 'Run workflow' on [this page](https://github.com/FlowFuse/website/actions/workflows/build.yml).

## Acknowledgements

This setup was inspired by:

 - [Eleventy Base Blog starter repository](https://github.com/11ty/eleventy-base-blog)
 - [Oxide.Computer's website setup](https://github.com/oxidecomputer/website)

## Troubleshooting

### `This edge function has crashed`

If you see this error, and it is the first ever time you have run the website, this [is expected](https://github.com/FlowFuse/website/pull/577#issuecomment-1491934272). You can stop the web server (`ctrl + c` from the terminal) and restart it. Following which, it should work. 
