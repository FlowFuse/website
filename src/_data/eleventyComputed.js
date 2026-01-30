// Generate a description from the handbook page path
function handbookDescriptionFromPath(data) {
    if (!data.page.url || !data.page.url.match(/\/handbook\/.+/)) return null;

    const pathParts = data.page.url.split('/').filter(p => p && p !== 'handbook');
    if (pathParts.length > 0) {
        const section = pathParts[0];
        const pageName = data.navTitle || data.title || pathParts[pathParts.length - 1];
        return `${pageName} - FlowFuse ${section.charAt(0).toUpperCase() + section.slice(1)} Handbook`;
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

            // For handbook pages, generate from page path
            if (data.page.url && data.page.url.match(/\/handbook\/.+/)) {
                return handbookDescriptionFromPath(data);
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

        // For handbook pages without an image, generate dynamic OG image
        if (data.page.url && data.page.url.match(/\/handbook\/.+/)) {
            const title = encodeURIComponent(data.navTitle || data.title || 'Handbook');
            const description = encodeURIComponent(
                data.description ||
                handbookDescriptionFromPath(data) ||
                ''
            );

            // Extract section from URL (e.g., "product", "sales", "design")
            const pathParts = data.page.url.split('/').filter(p => p && p !== 'handbook');
            const section = pathParts.length > 0 ? encodeURIComponent(pathParts[0]) : '';

            // Construct edge function URL
            return `/og-image?title=${title}&description=${description}&section=${section}`;
        }

        // Otherwise, let base.njk handle the fallback
        return null;
    },
    people: (data) => {
        return {...data.team, ...data.guests}
    }
}
