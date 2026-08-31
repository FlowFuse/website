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
| `/docs/**` | **Migrated** — served by Nuxt; source resolved from `flowfuse/flowfuse` at build time |
| All other routes | Still on 11ty, proxied through Nuxt in dev |

### New pages belong in Nuxt

Never create a new `.njk` page under `src/` — even a landing/marketing page that looks like the fastest way to match an existing 11ty page's pattern. Build it in Nuxt (`nuxt/pages/`, `.vue`/`.md`) instead; only edits to already-existing 11ty pages belong in `src/`. `nuxt/lib/legacy-pages.test.mjs` enforces this with no allowlist to maintain: it fetches main and fails `npm test` (and therefore the required `test_website / Build and check` PR check) if any `.njk` file under `src/` didn't already exist there — i.e. a brand-new `.njk` file, anywhere in `src/`, on any route. Editing an existing `.njk` file is unaffected.

This is scoped to `.njk` on purpose and does not extend to `.md`: new content in `src/blog/`, `src/changelog/`, `src/customer-stories/`, `src/webinars/`, and `src/blueprints/` (new posts, entries, blueprints) is expected routine work and must keep landing there unchanged, no matter how this section reads out of context. The gap this leaves — a brand-new page built as a bare `.md` file against an *existing* layout, with no new `.njk` involved — is real and not caught by the test; avoiding that is a matter of following this rule, not something enforced automatically. See `/handbook/marketing/website#new-pages-must-be-built-in-nuxt` for the non-engineer-facing explanation.

### Production build order

```
clean:nuxt → build:js:nuxt → prod:postcss-nuxt → prod:eleventy-nuxt → prod:nuxt
```

The `docs-source` Nuxt module runs automatically during `prod:nuxt` and calls `nuxt/lib/docs-sync.mjs` to resolve `docs/` from `flowfuse/flowfuse` (see **Local docs development** below). 11ty outputs to `nuxt/public/` so Nuxt can serve 11ty-generated assets. `nuxt/public/` is gitignored (fully build-generated).

## Dev commands

```bash
npm start              # all watchers in parallel (11ty + nuxt + postcss + blueprints)
npm run dev            # eleventy + postcss + nuxt only
npm run dev:eleventy   # 11ty only, port 8080 (legacy; most work doesn't need this)
npm run dev:nuxt       # Nuxt only, port 3000 — use this for handbook, docs, and migrated pages
npm run docs           # resolve product docs into nuxt/content/docs, no build
npm run build          # production build
```

> When working on the handbook, docs, or other migrated sections, `npm run dev:nuxt` is sufficient. `npm start` is only needed when also touching 11ty-served pages. For product docs, add `npm run dev:docs` beside it: that watcher re-syncs each edited page, and without it a docs edit only appears after a restart. `npm run dev` and `npm start` already include it.
>
> **Local docs development:** a checkout of `flowfuse/flowfuse` sitting next to this repo (`../flowfuse`) is picked up automatically, with no configuration. Full resolution order, which every build logs: `FLOWFUSE_DOCS_LOCAL` (explicit path, and a path that does not exist is an error), then a sibling checkout, then a clone of `FLOWFUSE_DOCS_REF` (default `main`) — this is what Netlify production deploys use. CI relies on the sibling rule: `FlowFuse/flowfuse`'s `Publish Documentation` workflow checks itself out next to the website so a docs PR is validated against its own changes.

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
├── css/               # Tailwind + custom CSS
├── images/            # Static images
└── public/            # Pass-through static files
nuxt/
├── content/
│   ├── handbook/      # Handbook pages (edit here)
│   └── docs/          # Product docs (build-generated, gitignored — do not edit)
├── modules/
│   └── docs-source.ts # Wires docs into Nuxt; resolution lives in nuxt/lib/docs-sync.mjs
├── composables/
│   ├── useHandbookNav.ts
│   └── useDocsNav.ts
├── components/
│   ├── HandbookLeftNav.vue
│   └── DocsLeftNav.vue
└── pages/
    ├── handbook/[...slug].vue
    └── docs/[...slug].vue
scripts/               # Build-time scripts (copy_blueprints.js, etc.)
lib/                   # Shared helpers used by .eleventy.js and scripts
.eleventy.js           # Main Eleventy config
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

#### Inline Image CTAs (`CtaImage`)

`nuxt/components/content/CtaImage.vue` — a clickable, tracked image usable inside a post's markdown body via `::cta-image{src="..." alt="..." cta="..."}`. Renders through `<ContentRenderer>` on `nuxt/pages/blog/[...slug].vue`, same as any other MDC content component (unlike `nuxt/components/BlogPostCta.vue`, which is a normal template component the page passes `page.title` to directly).

- `cta` is required on every instance, one of `sign-up` | `demo` | `contact` | `pricing` — no fallback to the post's frontmatter `cta.type` (that one only drives `BlogPostCta` at the end of the article). An invalid value throws a descriptive error at render time instead of a bare `Cannot read properties of undefined`.
- `position` isn't a prop — it's hardcoded to `'inline-image'`, since every instance shares the same placement semantics.
- Fires the same `blog-cta` event as `BlogPostCta` (not a dedicated `cta-sign-up`/`cta-book-demo`/etc. event) — `cta_type` alone distinguishes the destination, so both the end-of-article CTA and inline image CTAs land in one PostHog series, filterable by `cta_type`/`position`.
- The article title can't be passed as a prop from markdown (MDC only forwards literal `{...}` attributes), so `nuxt/pages/blog/[...slug].vue` does `provide('blogPostTitle', pageTitle)` and the component `inject()`s it — the only reason this indirection exists here and not on `BlogPostCta`.

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

**Source:** `flowfuse/flowfuse` repo, `docs/` directory — **do not edit in this repo**; cloned automatically at build time by `nuxt/modules/docs-source.ts`.  
**URL:** `/docs/{section}/{slug}/`  
**Rendered by:** Nuxt — `nuxt/pages/docs/[...slug].vue` + `DocsLeftNav` component  
**Local content:** `nuxt/content/docs/` (gitignored, build-generated)  
**Local assets:** `nuxt/public/docs/` (images, etc.)

```yaml
---
navTitle: "Page title for sidebar"
navGroup: "Section heading"   # set on section index pages only
navOrder: 3
meta:
  description: "Page description"
# optional redirect (section index pages):
redirect:
  to: /docs/section/first-page
layout: redirect
---
```

**Nav groups** (in order): FlowFuse User Manuals · Device Agent · FlowFuse Cloud · FlowFuse Self-Hosted · Support · Contributing  
**Nav composable:** `nuxt/composables/useDocsNav.ts`  
**Collection config:** `nuxt/content.config.ts` (defines the `docs` collection)

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
| `layouts/documentation.njk` | Node-RED learning resources (with sidebar nav) |
| `layouts/story.njk` | Customer stories |
| `layouts/nohero.njk` | General pages without hero |

## Redirects

**Add new redirects to `nuxt/redirects.ts`, not `netlify.toml`.** Nuxt is the front door for every route now, so retired-route redirects are handled as native Nitro route rules (`{ redirect: { to, statusCode: 301 } }`) keyed by the old path. `netlify.toml`'s `[[redirects]]` blocks are legacy and reserved for edge-level concerns that predate Nuxt (domain aliasing: `flowforge.com`/`flowfuze.com`/`flowfuse.io` → `flowfuse.com`) — don't add page-to-page redirects there.

This also covers old `/docs/**` paths left behind by a rename in `flowfuse/flowfuse`'s `docs/` tree (e.g. a doc file renamed to fix a `nuxt-link-checker` `no-underscores` warning) — add the old path here so bookmarks/indexed links 301 instead of 404ing once the rename ships.

## Call-to-Action components

**Nuxt only** — 11ty pages still use hand-written `<a class="ff-btn ...">` links; these components have no 11ty equivalent yet.

There are exactly five CTA destinations, each with its own component with **fixed copy and href** (a PostHog audit found dozens of different button texts pointing at the same handful of URLs, which made it impossible to tell which copy converted best — see `/handbook/marketing/website#call-to-action-buttons` for the non-engineer-facing explanation and a live gallery of every variant):

| Component | href | Fixed label |
|---|---|---|
| `nuxt/components/CtaSignUp.vue` | `{site.appURL}/account/create` | "Free Trial" on `position="main-nav"`/`"mobile-cta-bar"`, else "Try it out" |
| `nuxt/components/CtaSignIn.vue` | `site.appURL` | "Sign In" |
| `nuxt/components/CtaContactUs.vue` | `/contact-us/` | "Contact Us" |
| `nuxt/components/CtaBookDemo.vue` | `/book-demo/` | "Book a Demo" |
| `nuxt/components/CtaPricing.vue` | `/pricing/` | "View Pricing" |

All five are thin wrappers around `nuxt/components/cta/CtaButton.vue`, which does the actual styling/tracking and isn't meant to be used directly. If a page needs different wording, that's a sign a sixth destination-specific component is needed — not a prop that lets callers override copy on these five.

**Props** (all optional except `variant`/`position`): `variant` (`primary` | `primary-outlined` | `highlight` | `highlight-outlined` | `ghost` | `nav-text`), `position` (free string, sent to PostHog — describes *where on the page* the button sits, e.g. `hero`, `footer`, `pricing-card` — never which page; PostHog already captures the page URL on every event, so encoding the page into `position` too would just duplicate that and make it look like a placement dimension when it isn't one), `plan` (e.g. `edge`/`hub`/`fleet`, sent to PostHog), `color` (`primary`|`highlight`|`white`, only for `variant="ghost"`, which has no background of its own), `icon` (Nuxt Icon name for a trailing icon — not a `→`/`←` character baked into `label` itself, which every fixed component's copy avoids), `uppercase`, `padded` (only for `variant="nav-text"` — whether it has the header-`<ul>` link padding or is true zero-padding inline text), `target` (passed straight through to the underlying link; none of the five fixed destinations need it, it exists for `CtaCustom` linking off-site), `preview` (renders identically but doesn't navigate or call `capture()` — used by the handbook's live example gallery so clicking a doc example can't send a real event or leave the page).

### CtaCustom — one-off destinations

`nuxt/components/CtaCustom.vue` is the escape hatch for a CTA that doesn't fit one of the five fixed destinations above — it takes `label` and (usually) `href` directly from the caller. What it does NOT take is a free-form `event` string: the event (and, for a genuinely fixed URL, the `href` too) comes from a `destinationKey` prop that looks up an entry in `nuxt/lib/custom-cta-destinations.ts`.

This exists because a raw `event` prop would let two different `CtaCustom` instances pointed at the same URL drift onto two different PostHog events with nothing to catch it — exactly the fragmentation this whole system exists to prevent, just one level down from the five reserved destinations. Keying off a shared registry entry instead makes "this destination has exactly one event" structural: there's one place it's decided, not N call sites each typing a string by hand.

- **Fixed-URL destinations** (e.g. `hubspotMeeting`, `communityForum`, `homepage`) store both `href` and `event` in the registry; `CtaCustom` reads the href from there and rejects a caller-supplied `href` that conflicts with it. The registry file also self-checks on load for a second key reusing an href already claimed by another key — checked against both other entries in this same file and the five reserved destinations in `cta-destinations.ts` — so that mistake fails immediately at build/dev-start rather than only when (and if) some page actually renders the offending `<CtaCustom>`.
- **Dynamic-URL destinations** (e.g. `latestWebinar`, whose target is whichever webinar is currently most-recently-dated; `agentSetupClientOpen`, whose target varies per AI client) have no `href` in the registry — only the event is pinned there, and the caller still supplies `href` each time. This is a real, accepted limit: nothing can statically verify that two different call sites' *dynamic* hrefs never coincidentally collide, since the actual value only exists at render time and can change over time (this session's design discussion concluded that's fine — a coincidental runtime overlap between two conceptually different destinations, like "always show the newest webinar" vs. "a blog post links to this specific one," isn't the same kind of drift as two call sites hand-typing the same static URL with different event names).
- `destinationKey` is required and its TS type is `keyof typeof CUSTOM_CTA_DESTINATIONS` — there's no way to point `CtaCustom` at a URL without first adding an entry to that file, by design.
- Like the five fixed components, `CtaCustom` throws a descriptive error (same convention as `CtaImage.vue`'s invalid-`cta` check) if pointed at one of the five *reserved* destinations' hrefs — use the matching fixed component instead.

`nav-text` is deliberately not called `text` — it's the plain, no-underline treatment used for "Free Trial" (main nav) and "Sign In" (utility bar) specifically, not a general-purpose inline link. A future `text` variant (styled like a normal paragraph link — the site's blue-700, underline-on-hover convention) is reserved for that.

There's no `size` prop — every real-button variant's padding/font-size is hardcoded to match `.ff-btn` exactly (see the Computed-tab note in the gotchas below), so a size knob would only ever have affected icon dimensions. It was removed once confirmed nothing used a non-default value.

Click tracking: `capture(event, { position, variant, plan? })` via `nuxt/composables/useCapture.ts`, which wraps the global `window.capture()` from `src/_includes/analytics/body.html` (shared with 11ty, no-ops without analytics consent). Event names: `cta-sign-up`, `cta-sign-in`, `cta-contact-us`, `cta-book-demo`, `cta-pricing`.

### Gotchas already solved here (don't re-discover them)

- **Vue auto-defaults unspecified `boolean` props to `false`, not `undefined`.** Any prop typed as `boolean` in a type-only `defineProps<{...}>()` needs `withDefaults(defineProps<...>(), { theProp: undefined })` if the code distinguishes "not passed" from "explicitly false" (e.g. via `??`) — otherwise the `??` fallback never triggers, since `false ?? x` is `false`.
- **Nuxt UI's `ui` prop REPLACES a slot's class string, it doesn't merge with it.** `:ui="{ base: 'normal-case' }"` on a `UButton` wipes out app.config's `'uppercase font-semibold no-underline'` entirely rather than just adding `normal-case`. `CtaButton.vue`'s `uiOverrides` computed always builds the *complete* class string for whichever branch applies, never a partial diff.
- **`.light` scoping silently overrides the brand color override.** Nuxt UI's colors runtime plugin (`@nuxt/ui/dist/runtime/plugins/colors.js`) injects its own `<style>` tag on every page load with `@layer theme { :root, :host, .light { --ui-primary: var(--ui-color-primary-500); ... } }` — shade 500/400 is hardcoded there, not configurable via `app.config.ts`. The handbook layout wraps content in a `.light` div, which matches that rule *directly* (a direct match always beats an inherited value), silently downgrading every button inside handbook prose from the brand's indigo-600/red-600 to indigo-500/red-500. Fixed in `nuxt/assets/css/theme.css` with an unlayered `.handbook-content, .handbook-content.light { --ui-primary: ...; --ui-highlight: ...; }` (unlayered so it can't lose to `@layer theme` regardless of specificity).
- **`.handbook-content a` must exclude Nuxt UI components, or use `:where()`.** A plain `.handbook-content a { color: ... }` rule (even layered) beats a `UButton`'s own utility classes if it has higher specificity, flattening any Cta* button rendered inside handbook markdown to a plain link color. Fixed by moving the rule into `@layer base` and using `:where(a)` to zero out its added specificity, so any component's own classes win normally (same file as above).
- **`not-prose` on a wrapper also strips Tailwind Typography's code-block styling** (the dark background on `<pre>`) for anything nested inside it, not just its own prose text styling. `nuxt/components/content/CtaExample.vue` (the handbook's live example gallery) doesn't use `not-prose` for this reason, even though it also renders non-prose button/grid markup.
- **The `ui` prop override doesn't reach compoundVariants-driven classes.** The gotcha above (full-string replacement) only applies to the app.config-level base extension; UButton's own `variant`/`color`-driven classes (e.g. `ghost`'s `hover:bg-{color}/10`) are computed separately and still get merged in via `tv()` regardless of what `ui.base` says. `CtaButton.vue`'s ghost color classes explicitly add `hover:bg-transparent` to cancel that default hover background, since a ghost CTA should have none at all.
- **UButton's `to` prop treats any same-origin-looking path as a Nuxt route, even if Nuxt doesn't serve it.** `CtaButton.vue` takes a fixed (non-caller-configurable) `external` prop per destination, set by each `Cta*` wrapper — `true` when the href still points at an 11ty-served route (would otherwise 404 via client-side Vue Router instead of reaching the 11ty proxy), `false` once that route is served by Nuxt. `CtaContactUs`/`CtaBookDemo` now set `false` — `/contact-us` and `/book-demo` are Nuxt routes (`nuxt/pages/contact-us/index.vue`, `nuxt/pages/book-demo/index.vue`). `CtaSignUp`/`CtaSignIn` set `false` too, moot since those hrefs are already cross-origin.

## Naming conventions

- All slugs: **kebab-case**
- Blog/changelog: folder path mirrors publish date (`YYYY/MM/`)
- Images for a post live alongside it: `src/blog/YYYY/MM/images/`
- Author usernames must match a file in `src/_data/team/` or `src/_data/guests/`
