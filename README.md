# FlowFuse Website

[![Build Site](https://github.com/FlowFuse/website/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/FlowFuse/website/actions/workflows/build.yml)

This repository contains the source of the FlowFuse website.

It is hosted on Netlify, which watches the `main` branch directly and deploys on every commit to it.
Netlify's own build resolves everything it needs at build time — product documentation from `main` of
[FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse), and blueprints from
[FlowFuse/blueprint-library](https://github.com/FlowFuse/blueprint-library) (see `npm run blueprints` /
`nuxt/lib/blueprints-sync.mjs`) — so nothing needs to be pre-fetched and committed to a separate branch first.

A commit to `flowfuse/flowfuse` or `blueprint-library` doesn't push anything to this repo, so it wouldn't otherwise
trigger a Netlify rebuild on its own. The [Build Site](.github/workflows/build.yml) action covers that gap: it's
dispatched by `flowfuse/flowfuse`'s `Publish Documentation` workflow after a docs PR merges, and also runs on a
schedule to pick up blueprint-library changes — either way it just calls a Netlify build hook to rebuild `main`.

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

Nothing needs configuring for that to happen. Every build resolves the docs in this order, and logs which one it used:

| Order | Source | Used when |
|-------|--------|-----------|
| 1 | `FLOWFUSE_DOCS_LOCAL=/path/to/flowfuse` | The env var is set. A path that does not exist is an error, not a fallback. |
| 2 | A sibling checkout: `../flowfuse`, `../flowforge` or `../dev-env/packages/flowfuse` | One of those has a `docs/` directory. This is what CI relies on. |
| 3 | A clone of `FLOWFUSE_DOCS_REF` (default `main`) | Nothing above applied. This is what Netlify production deploys use. |

`npm run docs` runs that resolution on its own, without a full build, writing `nuxt/content/docs` and `nuxt/public/docs`. Both are generated, and neither is committed on `main`.

`npm run dev` and `npm start` also watch the resolved docs and re-sync each file as it changes, so an edit appears without restarting. `npm run dev:nuxt` on its own does not include that watcher; run `npm run dev:docs` beside it if you want one.

### Running Blueprints

Blueprints are maintained in the (private) [FlowFuse/blueprint-library](https://github.com/FlowFuse/blueprint-library) repo. To work with them locally, clone that repository alongside this one, the same way as `flowfuse` above:

```
/<parent_directory>
    /website
    /blueprint-library
```

Every build resolves blueprints in this order, and logs which one it used:

| Order | Source | Used when |
|-------|--------|-----------|
| 1 | `BLUEPRINTS_LOCAL=/path/to/blueprint-library` | The env var is set. A path that does not exist is an error, not a fallback. |
| 2 | A sibling checkout: `../blueprint-library` | It exists. This is what local development relies on. |
| 3 | A clone, authenticated with a minted GitHub App installation token (`GH_BOT_APP_ID`/`GH_BOT_APP_KEY`) | Nothing above applied, and those env vars are set. This is what Netlify production deploys use — `blueprint-library` is private, so this can't clone anonymously the way docs does. |
| 4 | Skipped | Nothing above applied. Matches the previous behaviour for contributors without access to the private repo. |

`npm run blueprints` runs that resolution on its own, writing `src/blueprints`, which is gitignored. `npm start` re-runs it whenever the resolved source changes (`scripts/watch_blueprints.js`), but only when it found a source to watch in the first place — no sibling checkout means no watching.

## llms.txt

`/llms.txt` (and `/llms-full.txt`) are generated by the [`nuxt-llms`](https://github.com/nuxtlabs/nuxt-llms) module, configured in `nuxt/nuxt.config.ts` under the `llms` key. Sections are built from `@nuxt/content` collections (`docs`, `blog`, `changelog`, `ebooks`, `whitepapers`) plus a small hardcoded list of standalone Nuxt routes (pricing, integrations, etc.) that aren't backed by a collection.

The `handbook` collection is deliberately excluded — it's internal company documentation, not product content, so it has no `contentCollection` section here. Content still served by the legacy Eleventy site (customer-stories, use-cases, platform, etc.) is invisible to `@nuxt/content` and so is also absent from `llms.txt` until those pages are migrated to Nuxt.

## How to add blog posts

See the [Blog section of the Marketing Handbook](https://flowfuse.com/handbook/marketing/content-strategy/blog/) for instructions on writing and publishing blog posts.

## Updating the FlowFuse Documentation

When the website is built it will include the documentation
from the `main` branch of the [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
repository.

To make a documentation update *and* make it live on the website:

1. PR the documentation update to the `main` branch of [FlowFuse/flowfuse](https://github.com/FlowFuse/flowfuse)
2. Get the PR reviewed and merged in the normal manner.

That repository's `Publish Documentation` workflow builds this site against the PR's docs before it can merge, then
triggers a website rebuild once it lands. A rebuild can also be started by hand with 'Run workflow' on
[this page](https://github.com/FlowFuse/website/actions/workflows/build.yml).

## Acknowledgements

This setup was inspired by:

 - [Eleventy Base Blog starter repository](https://github.com/11ty/eleventy-base-blog)
 - [Oxide.Computer's website setup](https://github.com/oxidecomputer/website)
