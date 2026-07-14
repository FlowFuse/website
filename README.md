# FlowFuse Website

[![Build Site](https://github.com/FlowFuse/website/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/FlowFuse/website/actions/workflows/build.yml)

This repository contains the source of the FlowFuse website.

It is hosted on Netlify with each commit to the `main` branch being automatically deployed to the live site.
This works by a GitHub action automatically updating the `live` branch to includes documentation pulled from the `main` branch of the [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
repository, when changes are pushed to `main`.

Netlify is then configured to watch the `live` branch for any changes, once detected, it will automatically pull the contents of this branch (docs included) and deploy to our production site.

## Repository structure

This repository is an **npm workspace** containing two projects:

| Directory | Purpose |
|-----------|---------|
| *(root)* | Legacy [Eleventy](https://www.11ty.dev/) site — all existing content lives here |
| `nuxt/` | New [Nuxt 3](https://nuxt.com/) frontend — pages are migrated here incrementally |

### Nuxt migration

The site is being migrated from Eleventy (11ty) to Nuxt 3 using the [Strangler Fig pattern](https://martinfowler.com/bliki/StranglerFigApplication.html). Nuxt acts as the front door on port 3000: pages that have been migrated are served directly by Nuxt; all other routes are transparently proxied to the legacy 11ty server on port 8080.

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

## Running locally

Clone the repository, then install all dependencies (workspace packages are included automatically):

```bash
npm install
```

### Start both servers (recommended)

```bash
npm run dev
```

This starts three watchers concurrently:

| Process | URL | Description |
|---------|-----|-------------|
| Nuxt dev server | http://localhost:3000 | Front door — serves migrated pages and proxies everything else |
| 11ty dev server | http://localhost:8080 | Legacy site (proxied through Nuxt) |
| PostCSS watcher | — | Compiles Tailwind CSS for the legacy site |

**Use http://localhost:3000** as your development URL. The legacy 11ty server on port 8080 is also accessible directly if needed.

**Note**: the first time running this, 11ty may take a little while to process all images in the `/docs` and `/handbook` folders.

**Note**: if you have previously run `npm run build:nuxt`, clean the generated directories before starting dev or you will get a `spawn EBADF` error:

```bash
npm run clean:nuxt
```

### Legacy-only mode

To run just the legacy 11ty stack (equivalent to the old `npm start`):

```bash
npm start
```

This starts the full legacy stack on http://localhost:8080 including docs, blueprints, and PostCSS.

### Running FlowFuse Documentation

The documentation for FlowFuse is maintained in the core [FlowFuse repo](https://github.com/FlowFuse/flowfuse). To run a local version of the documentation, clone that repository alongside this one:

```
/<parent_directory>
    /website
    /flowfuse
```

The `npm run dev` (and `npm start`) commands will retrieve the documentation from that folder and inject them into the site automatically. The docs will be available at http://localhost:3000/docs.

## How to add blog posts

See the [Blog section of the Marketing Handbook](https://flowfuse.com/handbook/marketing/content-strategy/blog/) for instructions on writing and publishing blog posts.

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
