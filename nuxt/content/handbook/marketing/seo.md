---
## title: SEO
---

# SEO

Organic search is our biggest source of new visitors, so everything we publish should be optimized for it. This page covers how we plan, write, publish, and maintain content for search, from keyword research through content clusters and ongoing optimization.

## Keyword Research

This isn't a one-off step done only when a piece needs one. The SEO lead runs keyword research daily, so new opportunities and pillar/cluster candidates surface continuously. Several tools can help, including Google Keyword Planner and Semrush's Keyword Overview tool, but keep the current marketing strategy in mind while researching, not just the raw numbers:

- Search volume: Is anyone actually searching for this?
- Intent: Does the keyword match the [funnel stage](/handbook/marketing/content-strategy/#content-funnel-stages) the piece would be written for (TOFU/educational vs. BOFU/comparison)?
- Difficulty & SERP: Who already ranks, and can we add something they don't?

Log keywords with good volume, low difficulty (KD), and clear intent in the [keyword tracker](https://docs.google.com/spreadsheets/d/1NPL5gosTJ2iR8l-wdzO4gJ-cNAbYXPa-GsQ_5Gsm7t8/edit?gid=1699082531#gid=1699082531) as they're found.

## Content Clusters

A cluster is a pillar page on a broad topic, supported by several narrower posts that each target a related long-tail keyword and link back to the pillar. The pillar covers the highest-volume, broadest keyword in the topic, while its supporting posts cover more specific questions around it.

Build clusters from the [keyword tracker](https://docs.google.com/spreadsheets/d/1NPL5gosTJ2iR8l-wdzO4gJ-cNAbYXPa-GsQ_5Gsm7t8/edit?gid=1699082531#gid=1699082531), not from scratch. Since keyword research already runs daily, group a logged pillar candidate with its related supporting keywords, then plan each new piece as part of that cluster before it's scheduled. A stream of unconnected, one-off posts doesn't build the same lasting authority as a cluster. Plan and track clusters in the [cluster planner](https://docs.google.com/spreadsheets/d/1NPL5gosTJ2iR8l-wdzO4gJ-cNAbYXPa-GsQ_5Gsm7t8/edit?gid=633081379#gid=633081379).

## On-Page SEO

Once a target keyword and content cluster have been chosen, optimize the page around the search intent and what people expect to find. SEO should be considered throughout the writing process, not added at the end.

Blog posts are published as Markdown under [src/blog](https://github.com/FlowFuse/website/tree/main/src/blog). Read the [blog writing guide](/handbook/marketing/content-strategy/blog) for how to write and format one.

### Analyze the SERP

Before creating the outline, search the target keyword and review the top-ranking results. Look at:

- Search intent: What is the searcher trying to find or accomplish?
- Content format: What types of pages rank, such as guides, tutorials, comparisons, or product pages?
- Topics and questions: What important subjects and questions do the strongest results cover?
- Content gaps: What is missing, outdated, unclear, or poorly explained?
- SERP features: Are there featured snippets, People Also Ask, related searches, images, or videos?

Use this research to understand what a strong result should provide, not to copy competing pages.

### Keyword Optimization

Choose one primary keyword and relevant secondary keywords for the page. Use them naturally in the following areas:

- Title / H1: Clearly communicate the main topic and include the primary keyword.
- Introduction: Mention the primary keyword naturally and quickly establish what the page covers.
- H2s/H3s: Use primary or secondary keywords when they accurately describe the section.
- Body content: Use primary, secondary, and related terms naturally while covering the topic. Avoid unnecessary repetition.
- URL: Keep it short and descriptive, and include the primary keyword when practical.
- Meta title: Accurately describe the page, include the primary keyword, and aim for 50 to 60 characters.
- Meta description: Clearly summarize the page, include the primary keyword naturally, and aim for 150 to 160 characters.
- TL;DR (blog posts only): Summarize the main answer or key takeaways near the beginning when useful.
- FAQ (blog posts and other website pages): Answer genuine questions relevant to the topic, phrased close to how people actually search.
- How-To Schema (blog posts and customer stories only, for now): Add it when the page walks through sequential, step-by-step instructions.

## Interlinking

Link to other blog posts, docs pages, changelog entries, or customer stories whenever there's a genuine opportunity. This helps search engines discover and understand our content and gives readers useful next steps. Only link where the target page actually explains or expands on the point being made. Never insert a link just to have one in a section.

Cluster content has one extra requirement: every supporting post should link back to its pillar page, and the pillar should link out to its supporting posts as they're published.

For the full interlinking rules used on blog posts, including one link per keyword and first occurrence only, see the [blog writing guide](/handbook/marketing/content-strategy/blog#interlinking).

Before publishing, whether it's a blog post or a website page, check the content for interlinking opportunities and apply them. Don't leave this for after it's live.

## External Linking

Link out to credible, authoritative sources, such as official documentation, specifications, research, and industry publications, when they explain a claim better than we can ourselves.

Never link to a competitor's page, even if their content is genuinely the best explanation available. Use a neutral, non-competing source instead.

## Technical SEO

Run a [Semrush Site Audit](https://www.semrush.com/siteaudit/#sorting/update_asc/page/1/) regularly to find technical issues that can prevent search engines from crawling, indexing, and correctly understanding our pages.

Prioritize issues based on how much they affect search visibility and how many pages they affect:

- Errors first: Fix issues that can prevent a page from being crawled or indexed. Check for broken pages and links, server errors, redirect loops or chains, incorrect canonical tags, and unintended noindex directives.

- High-impact issues next: Fix problems that affect many pages or important pages, such as pillar pages and high-traffic articles. Look for indexing problems, duplicate or near-duplicate pages, and issues that make important pages harder for search engines to discover or understand.

- High-impact issues next: Fix problems that affect many pages or important pages, such as pillar pages and high-traffic articles. Look for indexing problems, duplicate or near-duplicate pages, and issues that make important pages harder for search engines to discover or understand.
 Warnings and notices last: Address issues that are less likely to prevent crawling or indexing but can still improve the site's technical quality. Examples include missing image alt text, slow pages, and minor markup or performance issues. Group similar fixes together rather than handling them individually.

After making a set of fixes, re-run the audit to confirm that the issues were resolved. If an issue remains, investigate why before marking it as complete. Also check that the changes have not created new technical problems.

## SEO Review

Every page and blog post must go through SEO review before it publishes. This applies to marketing pages as well as blog posts. Currently, the Technical Writer holds this role.

When requesting an SEO review, share the content as a Google Doc rather than only a GitHub PR. GitHub's suggestion feature gets unwieldy once a piece needs heavy changes, whereas a Google Doc lets the reviewer comment and edit directly.

Request the SEO review at least two days before the page or post is due to publish, so there's time to make the requested edits without delay.

## Post-Publish SEO

SEO work continues after a page goes live. Check newly published pages to make sure they are accessible to search engines and performing as expected.

After publishing:

- Confirm the page is live and accessible.
- Check that the page can be indexed and has the correct canonical URL.
- Verify the title, meta description, structured data, and internal links.
- Confirm the page is indexed in Google Search Console.
- Monitor rankings, impressions, clicks, and organic traffic over time.

If a page does not get indexed or shows unexpected performance, investigate the issue and make the necessary changes rather than leaving it unresolved.

## Content Freshness and Updates

SEO doesn't end when a page is published. Review existing content regularly to keep it accurate, useful, and aligned with current search intent.

Check organic performance weekly and add pages to the [content refresh bucket](https://docs.google.com/spreadsheets/d/1NPL5gosTJ2iR8l-wdzO4gJ-cNAbYXPa-GsQ_5Gsm7t8/edit?gid=602480083#gid=602480083) when they show a significant drop in rankings or organic traffic.

Prioritize updates when:

- Search rankings or organic traffic decline significantly.
- Information, product details, screenshots, examples, or links become outdated.
- Search results change and the page no longer matches the current search intent or content format.
- New information or better examples can make the page more useful.
- An existing page is already ranking for a related keyword that could be improved instead of creating a new page.

When refreshing a page, review the existing content rather than simply adding new text. Remove outdated or unnecessary sections, update facts and examples, improve the structure where needed, and check that the target keyword and search intent are still appropriate.

After significant updates, re-check internal links, metadata, structured data, and technical issues before republishing.

## Content Consolidation and Retiring Content

When multiple pages target the same search intent, evaluate whether they should be consolidated into the strongest page. Before removing or consolidating a page, review its organic traffic, rankings, backlinks, conversions, and overall SEO value.

If there is a relevant replacement, move valuable content to the replacement page and implement a **301 redirect** from the old URL to the most relevant replacement. Do not redirect to an unrelated page or the homepage.

If there is no relevant replacement and the content is permanently removed, return a **410 (Gone)** status rather than redirecting the URL to an unrelated page.

Before implementation, review the final changes to ensure valuable pages, content, and backlinks are not lost. Afterward, monitor traffic, rankings, indexing, and crawl errors for any unexpected impact.

## Backlinks

Monitor the backlink profile regularly for spammy, artificial, or potentially harmful links. To monitor the backlink profile, you can use [Google Search Console](https://search.google.com/u/1/search-console/links?resource_id=sc-domain%3Aflowfuse.com) or [Semrush Backlink Audit](https://www.semrush.com/backlink_audit/30516465/overview) to check for toxic links.

Review the backlinks carefully and add only the links that require action to the [Disavow List](https://docs.google.com/spreadsheets/d/1NPL5gosTJ2iR8l-wdzO4gJ-cNAbYXPa-GsQ_5Gsm7t8/edit?gid=2050772890#gid=2050772890).

Do not disavow links simply because they are low-quality or unfamiliar. Only disavow links when there is a clear risk from spammy or artificial links.

Before submitting, review the list carefully to ensure that no legitimate links have been included. Submit the final file through the [Google Search Console Disavow Links Tool](https://search.google.com/search-console/disavow-links) and keep the disavow list updated regularly.