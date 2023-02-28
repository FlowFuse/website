# FlowForge Website

[![Build Site](https://github.com/flowforge/website/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/flowforge/website/actions/workflows/build.yml)

This repository contains the source of the FlowForge website.

It is built using [Tailwind CSS](https://tailwindcss.com/) and [Eleventy](https://www.11ty.dev/).
It is hosted on GitHub Pages and every commit to the `main` branch is automatically
deployed using GitHub Actions.

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

After cloning the repository, open a **bash** terminal and install the 
project dependencies, then run the build and the website (driven by eleventy) server:

```bash
npm install

npm start
```

This will start a server on http://localhost:8080 that will automatically reload whenever
any content is changed. 

Note, the first time running this, may take a little while as it needs to parse all
images in the `/docs` and `/handbook` folders.

**Note:** if you modify `src/css/style.css` you will need
to run `npm run tailwind` to rebuild the CSS content.

### Running FlowForge Handbook

Our Handbook is stored and maintained in a [separate repository](https://github.com/flowforge/handbook). In order to run the Handbook locally, you do so via the Website. To do this, you'll need to clone a copy of the Handbook alongside your Website repository, e.g.:

```
/<parent_directory>
    /website
    /handbook
```

Once this is the case, you can run the ["Building the site locally"](#building-the-site-locally) instructions above as normal, and the handbook will then be available at http://localhost:8080/handbook

### Running FlowForge Documentation

Much like our Handbook, the documentation for FlowForge are also maintained in a separate repository. Our docs are maintained in the core [FlowForge repo](https://github.com/flowforge/flowforge).

If you want to run a local version of the documentation, you'll need to clone the FlowForge repository alongside the website, e.g.:

```
/<parent_directory>
    /website
    /flowforge
```

The `npm run start` command that starts the Website server will retrieve the documentation from that folder, and automatically inject them into the website for your viewing. Any changes made to the documentation in the `/flowforge/docs` folder, will automatically refresh the website. The docs will be available at http://localhost:8080/docs.

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

## Updating the FlowForge Documentation

When the website is built via GitHub Action, it will include the documentation
from the `maintenance` branch of the [flowforge/flowforge](https://github.com/flowforge/flowforge)
repository.

To make a documentation update *and* make it live on the website:

1. PR the documentation update to the `main` branch of [flowforge/flowforge](https://github.com/flowforge/flowforge)
2. Attach the `backport` label to the PR
3. Get the PR reviewed and merged in the normal manner.
4. A new PR will get automatically raised that backports the change to the `maintenance` branch
5. Review and merge the PR to that branch.
6. Manually kick-off a website rebuild by clicking 'Run workflow' on [this page](https://github.com/flowforge/website/actions/workflows/build.yml).

## Acknowledgements

This setup was inspired by:

 - [Eleventy Base Blog starter repository](https://github.com/11ty/eleventy-base-blog)
 - [Oxide.Computer's website setup](https://github.com/oxidecomputer/website)

