---
navTitle: Release Blogs
---

# Writing Release Blogs

The [FlowFuse blog](/blog/releases/) is where users, customers, and the broader Node-RED community go to understand what has changed in a release. A release blog is published on release day and covers the full scope of a release at a level of depth the changelog does not.

A release blog is not a changelog, a PR description, or a feature list. It is a short, narrative announcement aimed at FlowFuse users who want to understand what improved for them and why it matters.

## When to write one

Write a release blog for every numbered release. It publishes on release day, after the changelog entries for that release are live.

The release wrangler owns the first draft. Engineers who shipped features in the release should review their sections for accuracy before the post goes live.

## Creating the file

Posts live in the [website repository](https://github.com/FlowFuse/website/tree/main/src/blog). Navigate to the correct year and month folder and create a new `.md` file.

```
src/blog/YYYY/MM/flowfuse-release-X-YY.md
```

If the folder for that month does not yet exist, create it.

## Frontmatter

Every post requires the following fields:

| Field | Notes |
|---|---|
| `title` | Format: "FlowFuse X.Y: [Short theme]". Title case. The subtitle after the colon should name the one or two most significant things in the release. |
| `subtitle` | One sentence expanding on the title. Names the next tier of features if the title does not cover them. |
| `description` | One sentence for link previews and search results. Should make sense without surrounding context. |
| `date` | Release date in `YYYY-MM-DD` format. |
| `authors` | Your handle from `src/_data/team`. |
| `image` | Path to the hero image. Coordinate with design. |
| `tags` | Always include `flowfuse`, `news`, and `releases`. |
| `release` | The release number as a string, e.g. `"2.29"`. |
| `features` | List of feature anchors for the in-page navigation. Each entry needs a `heading` and, where a changelog entry exists, an `id` matching the feature catalog slug. |

## Structure

### Title and subtitle

The title names the release and leads with the one or two most significant things in it. The subtitle adds the next tier of detail. Do not use the title to list every feature — if there are more than two things worth naming, find the theme that connects them.

**Example:**
> **FlowFuse 2.27: Integrated Editor in Remote Instances & Context-Aware FlowFuse Expert**
> A more consistent Node-RED experience across environments and deeper live context for FlowFuse Expert.

### Intro paragraph

2–3 sentences. State what the release does for users — not what it contains. Lead with the theme or outcome, not a feature list.

**Wrong:**
> FlowFuse 2.29 brings three capabilities that our enterprise users have been asking for: Azure DevOps as a supported Git provider, clearer snapshot comparisons that show exactly what changed, and FlowFuse Expert for self-hosted enterprise FlowFuse instances.

**Right:**
> FlowFuse 2.29 gives teams more control over how flows move through their stack, makes it easier to understand what changed between versions, and brings FlowFuse Expert to self-hosted enterprise customers.

### H2 sections

Group features under outcome-oriented H2 headings, not feature names or product labels. Two features that solve the same user problem belong in the same section. A release with three features might need two H2 sections, not three.

| Wrong | Right |
|---|---|
| `## Azure DevOps Git Integration` | `## More Visibility and Control Across Your Deployment Workflow` |
| `## FlowFuse Expert` | `## FlowFuse Expert, Available to More Teams and More Capable` |

Each H2 section contains:

**1. Problem framing (1–2 sentences)**
What was the friction or gap before this? Write it as a user experience.

> Managing flows across environments means tracking what changed, when, and by whom. When tooling gaps introduce friction here — or leave your version control workflow fragmented — they slow teams down at exactly the wrong moment.

**2. Feature content**
Use H3 headings when multiple features are grouped under one H2. Each feature gets 1–2 factual paragraphs. No preamble. No "we're excited to announce."

**3. `### In practice`**
Three bullet points, each starting with "You." Describe user outcomes, not feature capabilities.

| Wrong (capability) | Right (outcome) |
|---|---|
| **Push and pull snapshots** directly from your repositories | Your Node-RED flows participate in the same version control workflow as the rest of your stack |
| **Use Azure Personal Access Tokens** for authentication | You authenticate with Azure Personal Access Tokens, with no secondary tooling required |

### `## What else is new?`

Bullet list of smaller improvements, fixes, and Node-RED updates. No "In practice" needed. One sentence per item. Group fixes under a `### Fixes` subheading.

### One CTA only

Keep the post to a single, well-defined call to action. Multiple CTAs split the reader's attention and reduce the effectiveness of each.

The CTA is already handled via front matter — that is where it should be tailored if you need to customise it for a release. Do not add a `## Try FlowFuse` block manually in the body. It will render twice on the published page.

## Writing style

Write for the user, not the engineer. Every release blog can tell two stories — what changed in the product, and what improved for the person using it. Always tell the second one.

Write in _active voice_. The user is doing something, or something is now possible for them. Write with "you" as the subject where it fits.

| Instead of this | Write this |
|---|---|
| Snapshot restore logic has been updated | You can now restore snapshots without leaving developer mode |
| FlowFuse Expert is now available for self-hosted | Self-hosted enterprise teams get Expert without routing operational data through cloud infrastructure |
| A property-level diff sidebar has been added | You can now see exactly which properties changed, not just which nodes |

Be specific. Vague sections are useless.

**Weak:** Improvements to the snapshot comparison view.

**Strong:** The compare dialog now includes a property-level diff sidebar: structural property changes old to new at a glance, and git-style line diffs for function code, template HTML, and JSON.

Keep paragraphs short. One idea per sentence. If a sentence contains more than one clause joined by "and," it probably needs to be two sentences.

Sentence case everywhere — headings, bullets, captions.

Do not bold feature names mid-sentence. Use plain prose or `code style` for technical terms.

Do not repeat in "In practice" what you already said in the prose above it.

Avoid marketing language. Do not use: exciting, powerful, seamless, robust, game-changing, best-in-class. If the feature is good, the outcome statement will demonstrate it.

## Drafting with AI

Give an AI tool your feature list — not a written draft. If you hand it a draft, it will polish rather than restructure. A bullet list of what shipped forces the grouping and framing work to happen from scratch.

Paste the following prompt along with your feature list:

> You are writing a FlowFuse release blog. The audience is FlowFuse users — cloud customers, self-hosted admins, and the broader Node-RED community. They care what improved for them, not what changed in the code.
>
> Using the feature list I paste below, write a blog post that:
> - Opens with a 2–3 sentence outcome-led intro. Do not list features. State what the release improves for users.
> - Groups features under thematic H2 headings oriented around user outcomes, not product names or feature labels. Two features that solve the same user problem belong in the same section.
> - Opens each H2 section with 1–2 sentences of problem framing — what was the friction before this?
> - Uses H3 headings for individual features within a section when grouped. Each feature gets 1–2 factual paragraphs with no preamble.
> - Ends each H2 section with an "### In practice" subheading containing exactly three bullet points. Each bullet starts with "You" and describes a user outcome, not a feature capability.
> - Closes with a "## What else is new?" section as a bullet list covering smaller improvements and fixes.
>
> Rules:
> - Active voice, second person throughout
> - Sentence case for all headings and bullets
> - No bold mid-sentence for feature names
> - No marketing language (exciting, powerful, seamless, etc.)
> - Do not repeat in "In practice" what you already said in the prose above it
> - Short paragraphs — one idea per sentence
> - Do not include a "Try FlowFuse" section — the CTA is injected automatically and must not appear in the post body
>
> Reference example: https://flowfuse.com/blog/2026/02/flowfuse-release-2-27/
>
> Here is the feature list:
> [paste here]

Always review and edit the output before publishing.

## Examples

### Outcome-led intro

> FlowFuse 2.27 tightens the development loop for Remote instances and makes FlowFuse Expert more aware of what is actually running in your Node-RED environment. It also improves availability for High Availability hosted deployments.

Gets to the point in two sentences. No feature list, no "we're excited."

*Source: [FlowFuse 2.27](/blog/2026/02/flowfuse-release-2-27/)*

---

### Thematic H2 with problem framing and "In practice"

> ## A More Integrated Remote Development Workflow
>
> Teams run production and edge workloads in Remote instances. When tooling behaves differently across environments, it slows debugging and increases risk during active changes.
>
> ### Immersive Editor & Snapshot Restore
>
> FlowFuse now brings the integrated editor experience to Remote instances. Clicking **Open Editor** provides the same FlowFuse capabilities regardless of where your instance runs.
>
> Device Agent v3.8.0 also allows you to restore snapshots while remaining in developer mode. You no longer need to exit developer mode to roll back changes.
>
> ### In practice
>
> - You move between hosted and remote environments without changing your workflow
> - You restore snapshots without interrupting active debugging
> - You reduce friction while iterating on live systems

Two features grouped under one outcome. Problem framing before the feature content. "In practice" bullets written from the user's perspective.

*Source: [FlowFuse 2.27](/blog/2026/02/flowfuse-release-2-27/)*

## Raising a PR

Follow the standard [Git workflow](/handbook/company/guides/git/) to raise a PR against the website repository.

Marketing must review every post before it goes live. The release wrangler is responsible for getting at least one of Product or Engineering to review for accuracy.

The post should be in review by the Wednesday before release day and ready to publish by 15:30 GMT on release day (Thursday).
