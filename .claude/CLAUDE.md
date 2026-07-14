# FlowFuse Website — Codebase Guide

## Architecture (Nuxt-first, 11ty being phased out)

The site is migrating from Eleventy (11ty) to Nuxt 3. Nuxt is the primary framework going forward; 11ty is being phased out section by section using a strangler-fig pattern.

- **Primary framework**: Nuxt 3 (`nuxt/`) with `@nuxt/content` v3 for content-driven pages
- **Legacy SSG**: Eleventy (11ty) v3, source in `src/`, output to `_site/` — being phased out
- **Strategy**: Nuxt is the front door. In dev, Nuxt proxies un-migrated routes to 11ty (port 8080). In production, `nuxt generate` produces the final output.
- **CSS**: Tailwind v3 via PostCSS → `_site/css/style.css` (shared between both)
- **Templates (legacy)**: Nunjucks (`.njk`) + Markdown (11ty only)
- **Search**: Algolia (`scripts/index-algolia.js`)
- **Hosting**: Netlify; final output from `nuxt generate`

### Migration status

| Section | Status |
|---------|--------|
| `/handbook/**` | **Migrated** — served by Nuxt (`nuxt/content/handbook/`) |
| All other routes | Still on 11ty, proxied through Nuxt in dev |

### Production build order

```
clean:nuxt → build:js:nuxt → prod:postcss-nuxt → prod:eleventy-nuxt → prod:nuxt
```

11ty outputs to `nuxt/public/` so Nuxt can serve 11ty-generated assets. `nuxt/public/` is gitignored (fully build-generated).

## Dev commands

```bash
npm start              # all watchers in parallel (11ty + nuxt + postcss + docs + blueprints)
npm run dev            # eleventy + postcss + nuxt only
npm run dev:eleventy   # 11ty only, port 8080 (legacy; most work doesn't need this)
npm run dev:nuxt       # Nuxt only, port 3000 — use this for handbook and migrated pages
npm run docs           # sync docs from external source once
npm run build          # production build
```

> When working on the handbook or other migrated sections, `npm run dev:nuxt` is sufficient. `npm start` is only needed when also touching 11ty-served pages.

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

**Source:** `nuxt/content/handbook/{department}/{slug}.md` ← edit here  
**URL:** `/handbook/{department}/{slug}/`  
**Rendered by:** Nuxt — `nuxt/pages/handbook/[...slug].vue` + `HandbookLeftNav` component

```yaml
---
title: "Page title (shown in browser tab and sidebar nav)"
navigation:            # optional — only needed on top-level section index.md files
  group: "Company"     # groups this section under a heading in the left nav
---
```

**Fields:**
- `title` — required; used as the page title and sidebar nav label
- `navigation.group` — only set on top-level section `index.md` files to group sections in the left nav (e.g. "Company", "Engineering & Design Practices", "Internal Operations", "Sales department")

**Nav grouping:** `nuxt/composables/useHandbookNav.ts` reads all pages via `queryCollection('handbook').all()` and builds the sidebar tree. The `navigation.group` on each section's `index.md` controls which sidebar group the section appears under.

Department folders: `company/`, `design/`, `engineering/`, `marketing/`, `operations/`, `peopleops/`, `sales/`  
Collection config: `nuxt/content.config.ts` (defines the `handbook` collection)

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
