const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Blog posts are rendered by Nuxt (src/blog/**/*.md is .eleventyignore'd), so they no
// longer appear in 11ty's `collections.posts`. This reads their frontmatter directly,
// for consumers that still need blog post data at 11ty build time (e.g. related-resources.njk).
function walk(dir) {
    let results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (entry.name.endsWith('.md')) {
            results.push(fullPath);
        }
    }
    return results;
}

module.exports = () => {
    const blogDir = path.join(__dirname, '..', 'blog');
    const devModePosts = process.env.CONTEXT !== 'production';

    return walk(blogDir)
        .map((file) => {
            const raw = fs.readFileSync(file, 'utf-8');
            const match = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---/);
            if (!match) return null;
            const data = yaml.load(match[1]) || {};
            const relative = path.relative(blogDir, file).replace(/\.md$/, '').replace(/\\/g, '/');
            return {
                title: data.title,
                description: data.description,
                date: data.date ? new Date(data.date) : new Date(0),
                url: `/blog/${relative}/`
            };
        })
        .filter(Boolean)
        .filter(post => devModePosts || post.date <= new Date())
        .sort((a, b) => b.date - a.date);
};
