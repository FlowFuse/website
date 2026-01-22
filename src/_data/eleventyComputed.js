// Helper function to extract first paragraph from HTML content
function extractFirstParagraph(content) {
    if (!content) return null;

    // Match first <p> tag content
    const match = content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (match) {
        // Strip HTML tags and clean up
        let text = match[1].replace(/<\/?[^>]+>/gi, '').trim();
        // Limit to reasonable length (160 chars is optimal for meta descriptions)
        if (text.length > 160) {
            text = text.substring(0, 157) + '...';
        }
        return text;
    }

    return null;
}

module.exports = {
    meta: {
        title: (data) => {
            const title = data.title || data.meta?.title || data.page.fileSlug
            if (title) {
                return title[0].toUpperCase() + title.substring(1)
            } else {
                return title
            }
        },
        description: (data) => {
            // If description is already set, use it
            if (data.description || data.meta?.description) {
                return data.description || data.meta?.description;
            }

            // For handbook pages, try to extract first paragraph
            if (data.page.url && data.page.url.match(/\/handbook\/.+/) && data.content) {
                // Extract first paragraph from rendered content
                const firstParagraph = extractFirstParagraph(data.content);
                if (firstParagraph) {
                    return firstParagraph;
                }

                // Fallback: generate from page path
                const pathParts = data.page.url.split('/').filter(p => p && p !== 'handbook');
                if (pathParts.length > 0) {
                    const section = pathParts[0];
                    const pageName = data.navTitle || data.title || pathParts[pathParts.length - 1];
                    return `${pageName} - FlowFuse ${section.charAt(0).toUpperCase() + section.slice(1)} Handbook`;
                }
            }

            // Return null to let base.njk use site subtitle
            return null;
        }
    },
    image: (data) => {
        // If image is already set in frontmatter, use it
        if (data.image) {
            return data.image;
        }

        // For handbook pages without an image, use handbook logo
        if (data.page.url && data.page.url.match(/\/handbook\/.+/)) {
            return '/handbook/images/logos/ff-logo--square--dark.png';
        }

        // Otherwise, let base.njk handle the fallback
        return null;
    },
    people: (data) => {
        return {...data.team, ...data.guests}
    }
}
