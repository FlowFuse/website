/*
 * Nav highlight cards - one per top-nav dropdown.
 *
 * Marketing owns this file: each entry below is the promo card shown at the
 * left of the corresponding mega dropdown on xl+ screens. Swap any entry to
 * feature a campaign, webinar, customer story or launch. Keep titles short
 * (2 lines max) and descriptions to one sentence.
 *
 * Card image: set `image` to a site-absolute path to override. Without it,
 * the card uses the linked page's `image:` front matter (the marketing image
 * every linkable page should carry, as blog posts do for the blog index),
 * falling back to /images/og-blog.jpg.
 *
 * NOTE: the Nuxt header (nuxt/components/AppHeader.vue) carries a hardcoded
 * copy of these cards for the handbook/legal pages; keep both in sync.
 */
module.exports = {
    platform: {
        eyebrow: "Learning resources",
        title: "Master the Unified Namespace",
        description: "Guides and reference architectures for every capability, from UNS to MES.",
        cta: "Start learning",
        link: "/use-cases/uns/"
    },
    solutions: {
        eyebrow: "Customer story",
        title: "See how teams ship with FlowFuse",
        description: "Real production deployments across the industries we serve.",
        cta: "Read customer stories",
        link: "/customer-stories/"
    },
    resources: {
        eyebrow: "Node-RED Academy",
        title: "Free Node-RED training",
        description: "Structured courses that take you from first flow to production.",
        cta: "Enroll for free",
        link: "https://node-red-academy.learnworlds.com/",
        image: "/images/education/education_hero.jpg"
    },
    company: {
        eyebrow: "Careers",
        title: "We're hiring",
        description: "Help industrial teams own their data and applications.",
        cta: "See open roles",
        link: "https://boards.greenhouse.io/flowfuse",
        image: "/images/careers/hiring.jpeg"
    }
};
