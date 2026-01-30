const fs = require('fs');

// Extract the first meaningful paragraph from a markdown file's raw source
function extractFirstParagraph(inputPath) {
    try {
        const content = fs.readFileSync(inputPath, 'utf-8');
        // Strip frontmatter
        const withoutFrontMatter = content.replace(/^---[\s\S]*?---/, '').trim();
        // Split into blocks by double newlines
        const blocks = withoutFrontMatter.split(/\n\n+/);
        // Find the first block that looks like a paragraph (not a heading, list, image, code fence, or nunjucks tag)
        const paragraph = blocks.find(b => {
            const trimmed = b.trim();
            return trimmed &&
                !trimmed.startsWith('#') &&
                !trimmed.startsWith('- ') &&
                !trimmed.startsWith('* ') &&
                !trimmed.match(/^\d+\.\s/) &&
                !trimmed.startsWith('![') &&
                !trimmed.startsWith('```') &&
                !trimmed.startsWith('{%') &&
                !trimmed.startsWith('|');
        });
        if (!paragraph) return null;
        // Strip markdown syntax
        return paragraph
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\n/g, ' ')
            .trim()
            .substring(0, 200);
    } catch (e) {
        return null;
    }
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

            // For handbook pages, extract first paragraph from markdown source
            if (data.page.url && data.page.url.match(/\/handbook\/.+/)) {
                return extractFirstParagraph(data.page.inputPath);
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
                extractFirstParagraph(data.page.inputPath) ||
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
