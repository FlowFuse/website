# FlowFuse Website — Codebase Guide

## Stack

- **SSG**: Eleventy (11ty) v3, source in `src/`, output to `_site/`
- **CSS**: Tailwind v3 via PostCSS → `_site/css/style.css`
- **Templates**: Nunjucks (`.njk`) + Markdown
- **Search**: Algolia (`scripts/index-algolia.js`)
- **Hosting**: Netlify; publish dir = `_site`
- **Nuxt migration**: parallel Nuxt 3 project lives in `nuxt/` (see [nuxt/CLAUDE.md](nuxt/CLAUDE.md))

## Dev commands

```bash
npm start              # all watchers in parallel (11ty + nuxt + postcss + docs + blueprints)
npm run dev            # eleventy + postcss + nuxt only
npm run dev:eleventy   # 11ty only, port 8080
npm run dev:nuxt       # Nuxt only, port 3000/3001
npm run docs           # sync docs from external source once
npm run build          # production build
```

## Directory layout

```
src/
├── _data/             # Global data files (authors, tags, site config, etc.)
├── _includes/
│   ├── layouts/       # Nunjucks layout templates
│   └── components/    # Reusable partials
├── blog/              # Blog posts  →  /blog/YYYY/MM/slug/
├── changelog/         # Changelog entries  →  /changelog/YYYY/MM/slug/
├── customer-stories/  # Case studies  →  /customer-stories/slug/
├── docs/              # Product docs  →  /docs/section/slug/  (synced from external)
├── handbook/          # Employee handbook  →  /handbook/section/slug/
├── css/               # Tailwind + custom CSS
├── images/            # Static images
└── public/            # Pass-through static files
scripts/               # Build-time scripts (copy_docs.js, copy_blueprints.js, etc.)
lib/                   # Shared helpers used by .eleventy.js and scripts
.eleventy.js           # Main Eleventy config (1100+ lines)
```

---

## Content types

### Blog posts

**Source:** `src/blog/YYYY/MM/{slug}.md`  
**URL:** `/blog/YYYY/MM/{slug}/`  
**Layout:** `layouts/post.njk`

```yaml
---
title: "Post title"
subtitle: "Optional subtitle"
description: "SEO meta description"
date: 2026-04-09
authors: ["username"]        # must match an entry in src/_data/team/ or guests/
image: /blog/YYYY/MM/images/hero.png
video: "youtube_id"          # optional
tags:
  - flowfuse
  - releases
keywords: "kw1, kw2"         # optional
release: "2.29"              # for release posts
features:                    # optional release feature list
  - id: feature-slug
    heading: "Feature Name"
cta:                         # optional call-to-action block
  type: sign-up              # or: contact
  title: "CTA Title"
  description: "CTA body"
---
```

Tag options are defined in `src/_data/blogTags.json`. Future-dated posts are excluded from collections until their date arrives.

---

### Changelog entries

**Source:** `src/changelog/YYYY/MM/{slug}.md`  
**URL:** `/changelog/YYYY/MM/{slug}/`  
**Layout:** `layouts/post-changelog.njk`

```yaml
---
title: "Feature Name"
description: "One-line summary of what changed"
date: 2026-04-07 12:00:00
authors: ['username']
tags:
  - changelog
issues:                      # optional GitHub issue links
  - https://github.com/FlowFuse/flowfuse/issues/1234
---
```

Each year has a `src/changelog/YYYY/YYYY.json` that tags the collection.

---

### Handbook pages

**Source:** `src/handbook/{department}/{slug}.md`  
**URL:** `/handbook/{department}/{slug}/`  
**Layout:** `layouts/documentation.njk` (shared with docs)

```yaml
---
navTitle: "Title shown in sidebar nav"
navGroup: "Optional group heading"
---
```

Department folders: `company/`, `design/`, `engineering/`, `marketing/`, `operations/`, `peopleops/`, `sales/`  
Collection config: `src/handbook/handbook.json`

---

### Product docs

**Source:** `src/docs/{section}/{slug}.md` — **do not edit directly**; synced via `node scripts/copy_docs.js` from the external `flowfuse/flowfuse` monorepo.  
**URL:** `/docs/{section}/{slug}/`  
**Layout:** `layouts/documentation.njk`

```yaml
---
navTitle: "Page title for sidebar"
navGroup: "Section heading"
navOrder: 3
meta:
  description: "Page description"
# optional redirect:
redirect:
  to: https://example.com
layout: redirect
---
```

Collection config: `src/docs/docs.json`

---

### Customer stories

**Source:** `src/customer-stories/{slug}.md`  
**URL:** `/customer-stories/{slug}/`  
**Layout:** `layouts/story.njk`

```yaml
---
title: "Story title"
description: "SEO meta description"
image: /images/stories/hero.jpeg
date: 2025-09-29
logo: /images/stories/logos/company-logo.png
hubspot:
  formId: "uuid"
story:
  brand: "Company Name"
  url: "https://company.com"
  logo: /images/stories/logos/company-logo.png
  quote: "Customer quote"
  challenge: "Problem statement"
  solution: "How FlowFuse solved it"
  products:
    - Node-RED
    - FlowFuse
  results:
    - Measurable outcome 1
---
```

Collection config: `src/customer-stories/customer-stories.json`

---

## Global data (`src/_data/`)

| File | Purpose |
|------|---------|
| `site.json` | Global site config (URL, name, etc.) |
| `blogTags.json` | Valid blog tag values |
| `team/` | Staff author profiles |
| `guests/` | Guest author profiles |
| `companies/` | Customer company records |
| `testimonials.json` | Pull-quote testimonials |
| `events.yaml` | Event calendar |
| `features.json` | Product feature catalog |
| `integrations.js` | Integration listings |
| `eleventyComputed.js` | Dynamic computed properties |

## Layouts

| Layout | Used by |
|--------|---------|
| `layouts/base.njk` | HTML shell |
| `layouts/post.njk` | Blog posts |
| `layouts/post-changelog.njk` | Changelog entries |
| `layouts/documentation.njk` | Docs + handbook (with sidebar nav) |
| `layouts/story.njk` | Customer stories |
| `layouts/nohero.njk` | General pages without hero |

## Naming conventions

- All slugs: **kebab-case**
- Blog/changelog: folder path mirrors publish date (`YYYY/MM/`)
- Images for a post live alongside it: `src/blog/YYYY/MM/images/`
- Author usernames must match a file in `src/_data/team/` or `src/_data/guests/`
