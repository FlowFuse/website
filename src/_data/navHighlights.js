/*
 * Nav highlight cards - one per top-nav dropdown.
 *
 * Marketing owns this file: each entry below is the promo card shown at the
 * left of the corresponding mega dropdown on xl+ screens. Swap any entry to
 * feature a campaign, webinar, customer story or launch. Each card renders
 * as the image plus the title (which also serves as the link's accessible
 * name); keep titles short (2 lines max).
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
        title: "Industrial AI, governed and built in",
        link: "/ai/",
        image: "/images/ai/ai-hero.png"
    },
    solutions: {
        title: "Scale automotive operations",
        link: "/industries/automotive/",
        image: "/images/industries/automotive.jpg"
    },
    resources: {
        title: "Free Node-RED training",
        link: "https://node-red-academy.learnworlds.com/",
        image: "/images/education/education_hero.jpg"
    },
    company: {
        title: "See how teams ship with FlowFuse",
        link: "/customer-stories/",
        image: "/images/stories/arch_systems.jpeg"
    }
};
