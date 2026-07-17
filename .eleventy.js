const path = require("path");
const util = require("util");
const fs = require("fs");

const { EleventyRenderPlugin } = require("@11ty/eleventy");

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const htmlmin = require("html-minifier-terser");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require('markdown-it-attrs');
const spacetime = require("spacetime");
const { minify } = require("terser");
const codeowners = require('codeowners');
const pluginTOC = require('eleventy-plugin-toc');
const { decodeHTML } = require('entities');
const imageHandler = require('./lib/image-handler.js')
const site = require("./src/_data/site");
const coreNodeDoc = require("./lib/core-node-docs.js");
const { isSearchPage, isSearchUrl, extractHeadingRecords } = require("./lib/search-index.js");
const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Documentation alert boxes
const shortcodeMarkdown = new markdownIt()

const CALLOUT_ICONS = {
    note: `<svg class="ff-callout__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    warning: `<svg class="ff-callout__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    caution: `<svg class="ff-callout__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
}

function renderDocsAlertBox(content, tone = 'note') {
    const normalizedTone = tone.toLowerCase();
    const icon = CALLOUT_ICONS[normalizedTone] || CALLOUT_ICONS.note
    const markdownContent = shortcodeMarkdown.render(content)
    const contentWithIcon = markdownContent.replace(/^(<\w[^>]*>)/, `$1${icon}`)
    return `<div class="ff-callout ff-callout--${normalizedTone}"><div class="ff-callout__content">${contentWithIcon}</div></div>`
}

// Skip slow optimizations when developing i.e. serve/watch or Netlify deploy preview
const DEV_MODE = process.env.ELEVENTY_RUN_MODE !== "build" || process.env.CONTEXT === "deploy-preview"
// Image processing is skipped in dev mode or when explicitly requested via SKIP_IMAGES.
// Kept separate from DEV_MODE so build-time image flags never affect analytics/consent script inclusion.
const SKIP_IMAGES = DEV_MODE || process.env.SKIP_IMAGES === 'true'
const DEPLOY_PREVIEW = process.env.CONTEXT === "deploy-preview";
const IMAGE_BUILD_PROFILE = process.env.IMAGE_BUILD_PROFILE || "full";

console.info(`[11ty] Image build profile: ${IMAGE_BUILD_PROFILE}`)

module.exports = function(eleventyConfig) {

    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents)); // Add support for YAML data files
    eleventyConfig.setUseGitIgnore(false); // Otherwise docs are ignored
    eleventyConfig.setWatchThrottleWaitTime(500); // in milliseconds
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!--more-->",
        excerpt_alias: "excerpt"
    });

    // Set DEV_MODE_POSTS to true if the context is not 'production'
    const DEV_MODE_POSTS = process.env.CONTEXT !== "production";

    // The filter excludes blog posts with a date in the future for the production website.
    let processedPosts = {};
    eleventyConfig.addFilter('isFuturePost', (post) => {
        const isFuturePost = post.date && post.date > new Date();
        if (isFuturePost && !processedPosts[post.title]) {
            let text = DEV_MODE_POSTS ? 'Including' : 'Excluding';
            let formattedDate = eleventyConfig.getFilter('shortDate')(post.date);
            console.log(`[11ty/eleventy-base-blog] ${text} ${post.title} scheduled for ${formattedDate}`);
            processedPosts[post.title] = true;
        }
        return isFuturePost && !DEV_MODE_POSTS;
    });

    // Define a filter named 'isFutureDate'
    eleventyConfig.addFilter('isFutureDate', (dateString) => {
        const date = new Date(dateString);
        return date && date > new Date();
    });

    eleventyConfig.addFilter('extractH1Content', (content) => {
        if (!content) return '';

        const match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    
        if (match) {
          const textContent = match[1].replace(/<\/?[^>]+>/gi, '').trim();
          return textContent;
        }
    
        return null;
      });

    eleventyConfig.addFilter("excludeCurrent", (items, currentUrl) => {
        return items.filter(item => item.url !== currentUrl);
    });

      eleventyConfig.addFilter("shuffle", (array) => {
        return array.sort(() => Math.random() - 0.5);
    });

    // Add a global data variable for the current date
    eleventyConfig.addGlobalData("currentDateISO", new Date().toISOString());  

    // Make filters globally accessible
    global.isFuturePost = eleventyConfig.getFilter('isFuturePost');
    global.isFutureDate = eleventyConfig.getFilter('isFutureDate');
    global.extractH1Content = eleventyConfig.getFilter('extractH1Content');

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    eleventyConfig.addLayoutAlias('nohero', 'layouts/nohero.njk');
    eleventyConfig.addLayoutAlias('solution', 'layouts/solution.njk');
    eleventyConfig.addLayoutAlias('use-case', 'layouts/use-case.njk');
    eleventyConfig.addLayoutAlias('catalog', 'layouts/catalog.njk');
    eleventyConfig.addLayoutAlias('redirect', 'layouts/redirect.njk');

    // Copy the contents of the `public` folder to the output folder
    eleventyConfig.addPassthroughCopy({
        "src/public/": "/",
    });

    // Naive copy of images for backwards compatibility of non short-code image handling (use of <img or in CSS)
    eleventyConfig.addPassthroughCopy("src/**/images/**/*");
    eleventyConfig.addPassthroughCopy("src/blueprints/**/flow.json");
    eleventyConfig.addPassthroughCopy("src/events/hm25-invite.ics");
    eleventyConfig.addPassthroughCopy("src/webinars/2025/simplifying-opc-ua/opc-ua-webinar-flows.zip");
    eleventyConfig.addPassthroughCopy("src/js/ai-expert-modal.js");
    eleventyConfig.addPassthroughCopy("src/js/hm-promo-banner.js");

    // Watch content images for the image pipeline
    eleventyConfig.addWatchTarget("src/**/*.{svg,webp,png,jpeg,gif}");

    eleventyConfig.setServerOptions({
        // Additional files to watch that will trigger server updates
        watch: ["_site/**/*.css", "_site/**/*.js"],
    })

    // make global accessible in src/_includes/layouts/base.njk for loading of PH scripts
    eleventyConfig.addGlobalData('POSTHOG_APIKEY', () => process.env.POSTHOG_APIKEY || '' )
    eleventyConfig.addGlobalData('DEV_MODE', () => DEV_MODE || DEV_MODE_POSTS)
    eleventyConfig.addGlobalData('deployPreview', DEPLOY_PREVIEW)

    // Custom Tooltip "Component"
    eleventyConfig.addPairedShortcode("tooltip", function (content, text) {
        return `<span class="ff-tooltip" data-tooltip="${text}">${content}</span><span></span>`
    });

    eleventyConfig.addPairedShortcode("blueCard", function(content) {
        const md = new markdownIt();
        let markdownContent = md.render(content);
        return `<div class="ff-blue-card">${markdownContent}</div>`;
    });

    // Documentation alert boxes
    eleventyConfig.addPairedLiquidShortcode('note', function (content) {
        return renderDocsAlertBox(content, 'note')
    })

    eleventyConfig.addPairedLiquidShortcode('warning', function (content) {
        return renderDocsAlertBox(content, 'warning')
    })

    eleventyConfig.addPairedLiquidShortcode('caution', function (content) {
        return renderDocsAlertBox(content, 'caution')
    })


    let flowId = 0; // Keep a global counter to allow more than one 
    eleventyConfig.addPairedShortcode("renderFlow", function (flow, height = 200) {
        flowId++; // Increment the flowId to allow multiple flows on the same page

        return `<div id="nr-flow-${flowId}" style="height: ${height}px" data-grid-lines="true" data-zoom="true" data-images="true" data-link-lines="false" data-labels="true"></div>
        <script type="module">const flow${flowId} = ${JSON.stringify(flow).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
        new FlowRenderer().renderFlows(JSON.parse(flow${flowId}.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&')), { container: document.getElementById('nr-flow-${flowId}') })</script>`
    });

    eleventyConfig.addGlobalData("coreNodesArray", () => {
        // Read the JSON file with core nodes
        const coreNodes = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', '_data', 'coreNodes.json'), 'utf-8'));

        // Transform coreNodes object into an array
        return Object.entries(coreNodes).map(([key, nodes]) => ({ key, nodes }));		
    })

    eleventyConfig.addAsyncShortcode("coreNodeDoc", async function (category, node) {
        return await coreNodeDoc(category, node)
    });

    eleventyConfig.addFilter("filterNodeCategory", function(nodes, category) {
        if (category === "all") {
          return nodes;
        } else {
          return nodes.filter(node => node.tags.includes(category));
        }
    });

    // Custom filters
    eleventyConfig.addFilter("json", (content) => {
        return JSON.stringify(content)
    });

    eleventyConfig.addFilter("fromJson", (content) => {
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return content;
        }
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit ));

    // Marketing image for a nav highlight card: the linked page's image front matter
    eleventyConfig.addFilter("pageImageForUrl", (collection, url) => {
        const match = (collection || []).find((p) => p.url === url);
        return (match && match.data && match.data.image) || null;
    });

    eleventyConfig.addFilter('console', function (value) {
        const str = util.inspect(value, { showHidden: false, depth: null });
        return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
    });


    eleventyConfig.addFilter('dictsortBy', function(val, reverse, attr) {
        let array = [];
        for (let k in val) {
            // Preserve the key (slug) by adding it to the object
            array.push({...val[k], _key: k});
        }

        array.sort((t1, t2) => {
            var a = t1[attr];
            var b = t2[attr];

            return a > b ? 1 : (a === b ? 0 : -1); // eslint-disable-line no-nested-ternary
        });

        return array
    });

    eleventyConfig.addFilter('shortDate', dateObj => {
        return spacetime(new Date(dateObj)).format('{date} {month-short}, {year}')
    });

    // Filter to safely convert values to Date objects
    eleventyConfig.addFilter('toDate', value => {
        if (!value) return new Date();
        if (value instanceof Date) return value;
        return new Date(value);
    });

    eleventyConfig.addFilter('formatNumber', num => {
        if (num === undefined || num === null) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    eleventyConfig.addFilter('md', (content) => {
        if (!content) return '';
        const md = new markdownIt({
            html: true,
        })
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.headerLink()
        });
        return md.render(content);
    });

    eleventyConfig.addFilter('stripFirstH1', (str) => {
        if (!str) return str;
        
        // Remove the first h1 heading from the content to avoid duplicate h1 tags
        // This is typically the package name which is already shown in the page header
        return str.replace(/<h1[^>]*>.*?<\/h1>/, '');
    });

    eleventyConfig.addFilter('rewriteIntegrationLinks', (str, integration) => {
        if (!str) return str;
        
        // First pass: collect all actual anchor IDs from the HTML
        const anchorIds = new Set();
        const anchorIdRegex = /id="([^"]+)"/g;
        let anchorMatch;
        while ((anchorMatch = anchorIdRegex.exec(str)) !== null) {
            anchorIds.add(anchorMatch[1]);
        }
        
        // Convert relative links in README to absolute links
        const matcher = /((href|src)="([^"]*))"/g;
        let match;
        const result = str.replace(matcher, (fullMatch, group1, attr, url) => {
            // Skip absolute URLs and mailto links
            if (/^(http|https|mailto:)/.test(url)) {
                return fullMatch;
            }
            
            // Handle same-page anchor links - try to fix broken anchors
            if (url.startsWith('#')) {
                const targetAnchor = url.substring(1);
                
                // If the anchor doesn't exist, try to find a close match
                if (!anchorIds.has(targetAnchor)) {
                    // Try to find anchors that match if we add periods back
                    // e.g., "migration-from-012-or-earlier" -> "migration-from-0.1.2-or-earlier"
                    for (const existingAnchor of anchorIds) {
                        // Remove all periods from existing anchor and compare
                        const normalizedExisting = existingAnchor.replace(/\./g, '');
                        if (normalizedExisting === targetAnchor) {
                            // Found a match! Use the correct anchor
                            return `${attr}="#${existingAnchor}"`;
                        }
                    }
                }
                
                return fullMatch;
            }
            
            // Convert relative links to repository links if available
            if (integration.repository && integration.repository.url) {
                const repoUrl = integration.repository.url
                    .replace('git+', '')
                    .replace('.git', '')
                    .replace('git://', 'https://');
                
                // Handle different types of relative paths
                if (url.startsWith('./') || url.startsWith('../')) {
                    const cleanUrl = url.replace(/^\.\.?\//, '');
                    return `${attr}="${repoUrl}/blob/master/${cleanUrl}"`;
                } else if (url.startsWith('/')) {
                    // Repository-relative paths (e.g., /CHANGELOG.md)
                    const cleanUrl = url.replace(/^\//, '');
                    return `${attr}="${repoUrl}/blob/master/${cleanUrl}"`;
                } else if (!url.startsWith('#')) {
                    // Simple relative paths without prefix
                    return `${attr}="${repoUrl}/blob/master/${url}"`;
                }
            }
            
            return fullMatch;
        });
        
        return result;
    });


    eleventyConfig.addFilter('duration', mins => {
        if (mins > 60) {
            const hrs = Math.floor(mins/60)
            return `${hrs}h ${mins%60}m`
        }
        else {
            return `${mins} mins`
        }
    });

    eleventyConfig.addFilter('inFuture', (posts) => {
        // filter posts/webinars that only occurred in the past
        if (posts) {
            return posts.filter((post) => {
                const postDate = spacetime(post.data.date)
                return postDate.isAfter(spacetime.today()) || postDate.isSame(spacetime.today(), 'day')
            })
        } else {
            return null
        }
    });

    eleventyConfig.addFilter('inPast', (posts) => {
        // filter posts/webinars that only occured in the past
        return posts.filter((post) => {
            const postDate = spacetime(post.data.date)
            return postDate.isBefore(spacetime.today())
        })
    });

    eleventyConfig.addFilter('dateInFuture', (date) => {
        // return true is the provided date is in the past, otherwise, return false
        const postDate = spacetime(date)
        return postDate.isAfter(spacetime.today()) || postDate.isSame(spacetime.today(), 'day')
    });

    eleventyConfig.addFilter('countDays', (date) => {
        // return true is the provided date is in the past, otherwise, return false
        const postDate = spacetime(date)
        const now = spacetime.now().startOf('day')
        const days = now.diff(postDate, 'day') + 1
        if (days === 0) {
            return { value: 0, text: 'Today'}
        } else if (days === 1) {
            return { value: 1, text: 'Tomorrow'}
        } else {
            return { value: days, text: `${days} Days Away`}
        }
    });

    eleventyConfig.addFilter("truncate", function(text, maxWordCount) {
        if (text === undefined || text === null || text === "") {
            return "";
        }

        text = String(text);
        const split = text.split(" ");
        if (split.length <= maxWordCount) {
            return text;
        }
        return text.split(" ").splice(0, maxWordCount).join(" ") + "..."
    });


    eleventyConfig.addFilter("striptags", function(text) {
        return decodeHTML(String(text).replace(/<[^>]+>/g, ""));
    });

    eleventyConfig.addFilter("readingTime", function(content) {
        if (!content) {
            return 1;
        }
        const words = String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(words / 200));
    });

    eleventyConfig.addFilter("restoreParagraphs", function(str) {
        const content = new String(str);
        return "<p>"+content.split(/\.\n/).join(".</p><p>")+"</p>"
    });

    eleventyConfig.addFilter("toAbsoluteUrl", function(url) {
        return new URL(url, site.baseURL).href;
    })

    eleventyConfig.addFilter("stripLinks", function(text) {
        return String(text).replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, '$1');
    });

    eleventyConfig.addFilter("handbookBreadcrumbs", (url) => {
        let parts = url.split("/").filter(e => e !== '');
        if (parts[parts.length-1] === "index") {
            parts.pop();
        }

        let path = "";
        return "/"+parts.map(p => {
            let url = `${path}/${p}`;
            path = url;
            return `<a class="mx-2" href="${url}/">${p}</a>`
        }).join("/")
    });

    eleventyConfig.addFilter("rewriteHandbookLinks", (str, page) => {
        const isIndexPage = /(README.md|index.md)$/i.test(page.inputPath)

        const matcher = /((href|src)="([^"]*))"/g
        let match
        while ((match = matcher.exec(str)) !== null) {
            let url = match[3]
            if (/^(http|#|mailto:)/.test(url)) {
                continue
            }
            url = url.replace(/.md(#.*)?$/, '$1')
            url = url.replace(/README(#.*)?$/, '$1')
            if (url[0] !== '/' && !isIndexPage) {
                url = '../'+url
            }

            str = str.substring(0, match.index) + `${match[2]}="${url}"` + str.substring(match.index+match[1].length)
        }
        return str;
    })

    eleventyConfig.addFilter("handbookEditLink", (page) => {
        let baseUrl = 'https://github.com/FlowFuse/website/edit/main/'
        let filePath = page.inputPath

        if (/^\/docs/.test(page.url)) {
            pathElements = page.inputPath.split(path.sep)

            if (pathElements[pathElements.length - 1] === "index.md") {
                pathElements[pathElements.length - 1] = "README.md"
            }

            filePath = path.join(...pathElements.slice(2))
            baseUrl = 'https://github.com/FlowFuse/flowfuse/edit/main/'
        }

        return baseUrl+filePath.replace(/^.\//,'')
    })

    eleventyConfig.addFilter("pageOwners", (page) => {
        // Eleventy's inputPath is relative, we need to drop the './' in front
        return new codeowners().getOwner(page.inputPath.substring(2))
    });

    eleventyConfig.addFilter("ghUsersToTeamMembers", (ghUsers, team) => {
        let teamMembers = [];
        for (let i = 0; i < ghUsers.length; i++) {
            const ghUser = ghUsers[i];

            Object.keys(team).forEach(function (member) {
                if (team[member].github === ghUser.substring(1)) {
                    teamMembers.push(team[member])
                }
            })
        }

        return teamMembers
    });

    eleventyConfig.addFilter("relatedPosts", function (collection = []) {
        const { tags: requiredTags, page } = this.ctx;
        return collection
            .map(post => {
                const commonTags = requiredTags?.reduce((count, tag) => count + (post.data.tags?.includes(tag) ? 1 : 0), 0);
                return { ...post, commonTags };
            })
            .filter(post => post.url !== page.url && post.commonTags >= requiredTags.length - 1)
            .sort((a, b) => b.commonTags - a.commonTags || b.date - a.date)
            .slice(0, 5);
    });
    
    // Custom async filters
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            // Fail gracefully.
            callback(null, code);
        }
    });

    eleventyConfig.addShortcode("renderTeamMember", function (teamMember) {
        // When the author is no longer at FlowFuse
        if (typeof teamMember === "undefined" || teamMember === null) {
            return `<div class="team-card--sm">
                        <div class="ff-headshot" style="background-image: url(/images/flowfuse-icon.png)"></div>
                        <div class="team-card-info my-auto">
                            <label>FlowFuse</label>
                        </div>
                    </div>`
        }

        return `<div class="team-card--sm">
                    <div class="ff-headshot" style="background-image: url(/images/team/headshot-${teamMember.headshot})"></div>
                    <div class="team-card-info">
                        <label>${teamMember.name}</label>
                        <span>${teamMember.title}</span>
                    </div>
                </div>`
    });

    eleventyConfig.addShortcode("renderCompanyTile", function (company) {
        return `<div class="company-tile">
            <img class="company-tile-logo" src="${company.img}" />
            <a href="${company.url}" class="no-underline text-gray-700">${company.name}</a>
        </div>`
    });

    eleventyConfig.addShortcode("renderIntegration", function (integration) {
        return `<div class="integration-tile">
            <img class="integration-tile-icon" src="${integration.img}" />
            <label>${integration.name}</label>
        </div>`
    });

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Feature catalog helpers for tier badges
    const featureCatalog = yaml.load(fs.readFileSync("./src/_data/featureCatalog.yaml", "utf8"));

    function changelogTitle(url) {
        const slug = url.replace(/\/$/, '').split('/').pop();
        const parts = url.replace(/\/$/, '').split('/').filter(Boolean);
        // url: /changelog/2026/02/slug/ -> src/changelog/2026/02/slug.md
        const filePath = path.join("./src", parts.join('/') + '.md');
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const match = content.match(/^---[\s\S]*?title:\s*["']?(.+?)["']?\s*$/m);
            if (match) return match[1];
        } catch (e) { /* file not found, fall back */ }
        return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    function findFeatureById(id) {
        for (const section of featureCatalog.sections) {
            for (const feature of section.features) {
                if (feature.id === id) return feature;
            }
        }
        return null;
    }

    function getChangelogUrls(feature) {
        if (!feature.changelog) return [];
        const entries = Array.isArray(feature.changelog) ? feature.changelog : [feature.changelog];
        return entries.map(entry => typeof entry === 'string' ? entry : entry.url);
    }

    function getChangelogUrlsForRelease(feature, release) {
        if (!feature.changelog) return [];
        const entries = Array.isArray(feature.changelog) ? feature.changelog : [feature.changelog];
        return entries
            .filter(entry => typeof entry === 'object' && entry.release === release)
            .map(entry => entry.url);
    }

    function findFeatureByChangelog(changelogUrl) {
        const normalized = changelogUrl.replace(/\/$/, '') + '/';
        for (const section of featureCatalog.sections) {
            for (const feature of section.features) {
                const urls = getChangelogUrls(feature);
                for (const url of urls) {
                    if ((url.replace(/\/$/, '') + '/') === normalized) return feature;
                }
            }
        }
        return null;
    }

    function deriveTierLabel(tierData) {
        if (!tierData) return null;
        const starter = tierData.starter && tierData.starter.value;
        const pro = tierData.pro && tierData.pro.value;
        const enterprise = tierData.enterprise && tierData.enterprise.value;
        const enterpriseDimmed = tierData.enterprise && tierData.enterprise.dimmed;
        if (starter && pro && enterprise && !enterpriseDimmed) return "All tiers";
        if (pro && enterprise && !enterpriseDimmed) return "Pro+";
        if (enterprise === 'contact' || (typeof enterprise === 'string' && enterprise.toLowerCase().includes('contact'))) return "Enterprise (contact us)";
        if (enterpriseDimmed) return "Enterprise (on request)";
        if (enterprise === 'time') return "Coming soon";
        if (enterprise) return "Enterprise";
        return "Not available";
    }

    function renderTierBadges(feature) {
        if (!feature) return '';
        const cloudLabel = deriveTierLabel(feature.cloud);
        const selfHostedLabel = deriveTierLabel(feature.selfHosted);
        const showCloud = cloudLabel && cloudLabel !== 'Not available';
        const showSelfHosted = selfHostedLabel && selfHostedLabel !== 'Not available';
        if (!showCloud && !showSelfHosted) return '';
        let html = `<div class="ff-tier-badges">`;
        if (showCloud) {
            html += `<div class="ff-tier-badge ff-tier--available" onclick="capture('tier-badge-click',{hosting:'cloud',tier:'${cloudLabel}',page:location.pathname})">`;
            html += `<span class="ff-tier-badge__label">Cloud</span>`;
            html += `<span class="ff-tier-badge__value">${cloudLabel}</span>`;
            html += `</div>`;
        }
        if (showSelfHosted) {
            html += `<div class="ff-tier-badge ff-tier--available" onclick="capture('tier-badge-click',{hosting:'self-hosted',tier:'${selfHostedLabel}',page:location.pathname})">`;
            html += `<span class="ff-tier-badge__label">Self-Hosted</span>`;
            html += `<span class="ff-tier-badge__value">${selfHostedLabel}</span>`;
            html += `</div>`;
        }
        html += '</div>';
        return html;
    }

    function renderChangelogLinks(urls) {
        if (!urls || urls.length === 0) return '';
        let html = '<div class="ff-related-changelogs">Changelog: ';
        const links = urls.map(url => {
            const label = changelogTitle(url);
            return `<a href="${url}">${label}</a>`;
        });
        html += links.join(' | ');
        html += '</div>';
        return html;
    }

    function renderDocsLink(feature) {
        if (!feature || !feature.docsLink) return '';
        const label = feature.label || 'Documentation';
        return `<div class="ff-related-docs">Docs: <a href="${feature.docsLink}">${label}</a></div>`;
    }

    // Inject tier badges, changelog links, and a docs link into release blog posts based on frontmatter
    eleventyConfig.addTransform("releaseFeatures", function(content) {
        if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;

        // Transforms don't have access to template data, so parse frontmatter from source
        const inputPath = this.page.inputPath;
        if (!inputPath || !inputPath.endsWith('.md')) return content;

        let frontmatter;
        try {
            const source = fs.readFileSync(inputPath, 'utf8');
            const fmMatch = source.match(/^---\n([\s\S]*?)\n---/);
            if (!fmMatch) return content;
            frontmatter = yaml.load(fmMatch[1]);
        } catch (e) { return content; }

        const features = frontmatter.features;
        const release = frontmatter.release;
        if (!release || !features || !Array.isArray(features) || features.length === 0) return content;

        // Build injection map: heading text -> { badges HTML, changelogs HTML }
        const injections = [];
        for (const entry of features) {
            let badges = '';
            let changelogs = '';
            let docs = '';

            if (entry.id) {
                // Feature from featureCatalog
                const feature = findFeatureById(entry.id);
                if (!feature) continue;
                badges = renderTierBadges(feature);
                const changelogUrls = release ? getChangelogUrlsForRelease(feature, release) : getChangelogUrls(feature);
                changelogs = renderChangelogLinks(changelogUrls);
                docs = renderDocsLink(feature);
            } else if (entry.tiers) {
                // Inline tier specification (no feature ID)
                const inlineFeature = {};
                if (entry.tiers.cloud) {
                    // Convert shorthand ("all", "pro+", "enterprise") to tier structure
                    const t = entry.tiers.cloud;
                    inlineFeature.cloud = {
                        starter: { value: t === 'all' ? true : null },
                        pro: { value: (t === 'all' || t === 'pro+') ? true : null },
                        enterprise: { value: true }
                    };
                }
                if (entry.tiers.selfHosted) {
                    const t = entry.tiers.selfHosted;
                    inlineFeature.selfHosted = {
                        starter: { value: t === 'all' ? true : null },
                        pro: { value: (t === 'all' || t === 'pro+') ? true : null },
                        enterprise: { value: true }
                    };
                }
                badges = renderTierBadges(inlineFeature);
            }

            if (badges || changelogs || docs) {
                // Docs link sits on its own line below the changelog line
                injections.push({ heading: entry.heading, badges, related: changelogs + docs });
            }
        }

        if (injections.length === 0) return content;

        // Find all headings (h2-h6) in the HTML with their positions
        const headingRegex = /<h([2-6])\s[^>]*>.*?<\/h\1>/gs;
        const headingMatches = [];
        let match;
        while ((match = headingRegex.exec(content)) !== null) {
            // Extract text content from heading (strip HTML tags)
            const textContent = match[0].replace(/<[^>]+>/g, '').trim();
            headingMatches.push({ index: match.index, length: match[0].length, text: textContent, level: parseInt(match[1]) });
        }

        // Process injections in reverse order so indices stay valid
        const ops = []; // { index, html } — insert html at index

        for (const injection of injections) {
            // Find matching heading
            const headingIdx = headingMatches.findIndex(h => h.text === injection.heading);
            if (headingIdx === -1) continue;

            const heading = headingMatches[headingIdx];

            // Insert badges right after the heading tag, adding heading-level class for spacing
            if (injection.badges) {
                const badgesWithLevel = injection.badges.replace('class="ff-tier-badges"', `class="ff-tier-badges ff-tier-badges--h${heading.level}"`);
                ops.push({ index: heading.index + heading.length, html: badgesWithLevel });
            }

            // Insert changelog + docs links before the next heading at the same or higher level
            // H2 links go before the next H2; H3 links go before the next H2 or H3
            if (injection.related) {
                const nextPeer = headingMatches.find((h, i) => i > headingIdx && h.level <= heading.level);
                const insertBefore = nextPeer ? nextPeer.index : content.length;
                ops.push({ index: insertBefore, html: injection.related });
            }
        }

        // Sort by index descending so we can splice without shifting
        ops.sort((a, b) => b.index - a.index);
        for (const op of ops) {
            content = content.slice(0, op.index) + op.html + content.slice(op.index);
        }

        return content;
    });

    function findFeatureByDocsLink(pageUrl) {
        if (!pageUrl) return null;
        const normalizedPage = pageUrl.replace(/\/$/, '') + '/';
        for (const section of featureCatalog.sections) {
            for (const feature of section.features) {
                if (!feature.docsLink || feature.subfeature) continue;
                let link = feature.docsLink;
                // Strip full domain if present
                link = link.replace(/^https?:\/\/flowfuse\.com/, '');
                // Strip fragment
                link = link.replace(/#.*$/, '');
                const normalizedLink = link.replace(/\/$/, '') + '/';
                if (normalizedPage === normalizedLink) return feature;
            }
        }
        return null;
    }

    function findSubfeaturesForDocsPage(pageUrl) {
        if (!pageUrl) return [];
        const normalizedPage = pageUrl.replace(/\/$/, '') + '/';
        const results = [];
        for (const section of featureCatalog.sections) {
            for (const feature of section.features) {
                if (!feature.docsLink || !feature.subfeature) continue;
                let link = feature.docsLink;
                link = link.replace(/^https?:\/\/flowfuse\.com/, '');
                const fragment = (link.match(/#(.+)/) || [])[1];
                if (!fragment) continue;
                const linkPath = link.replace(/#.*/, '').replace(/\/$/, '') + '/';
                if (normalizedPage === linkPath) {
                    results.push({ feature, fragment });
                }
            }
        }
        return results;
    }

    // Inject tier badges into docs pages: parent feature after H1, subfeatures after their headings
    eleventyConfig.addTransform("docsFeatureBadges", function(content) {
        if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
        if (!this.page.url || !/^(\/docs\/|\/node-red\/)/.test(this.page.url)) return content;

        const parentFeature = findFeatureByDocsLink(this.page.url);
        const subfeatures = findSubfeaturesForDocsPage(this.page.url);

        // Parse frontmatter for features array — but skip pages with `release` (handled by releaseFeatures)
        let fmFeatures = [];
        const inputPath = this.page.inputPath;
        if (inputPath && inputPath.endsWith('.md')) {
            try {
                const source = fs.readFileSync(inputPath, 'utf8');
                const fmMatch = source.match(/^---\n([\s\S]*?)\n---/);
                if (fmMatch) {
                    const fm = yaml.load(fmMatch[1]);
                    if (fm.release) return content;
                    if (fm.features && Array.isArray(fm.features)) {
                        fmFeatures = fm.features;
                    }
                }
            } catch (e) { /* ignore */ }
        }

        if (!parentFeature && subfeatures.length === 0 && fmFeatures.length === 0) return content;

        const ops = [];

        // Inject parent feature badges after the first H1
        if (parentFeature) {
            const h1Regex = /<h1[^>]*>.*?<\/h1>/s;
            const h1Match = h1Regex.exec(content);
            if (h1Match) {
                const badges = renderTierBadges(parentFeature);
                if (badges) {
                    const wrapped = badges.replace('class="ff-tier-badges"', 'class="ff-tier-badges not-prose"');
                    ops.push({ index: h1Match.index + h1Match[0].length, html: wrapped });
                }
            }
        }

        // Scan headings for subfeature and frontmatter-based injections
        if (subfeatures.length > 0 || fmFeatures.length > 0) {
            const headingRegex = /<h([2-6])\s[^>]*id="([^"]*)"[^>]*>.*?<\/h\1>/gs;
            const headingMatches = [];
            let hmatch;
            while ((hmatch = headingRegex.exec(content)) !== null) {
                const textContent = hmatch[0].replace(/<[^>]+>/g, '').trim();
                headingMatches.push({ index: hmatch.index, length: hmatch[0].length, id: hmatch[2], text: textContent, level: parseInt(hmatch[1]) });
            }

            // Frontmatter features take priority — track handled heading IDs
            const handledHeadingIds = new Set();
            for (const entry of fmFeatures) {
                if (!entry.id || !entry.heading) continue;
                const feature = findFeatureById(entry.id);
                if (!feature) continue;
                const heading = headingMatches.find(h => h.text === entry.heading);
                if (!heading) continue;
                handledHeadingIds.add(heading.id);
                const badges = renderTierBadges(feature);
                if (badges) {
                    const wrapped = badges.replace('class="ff-tier-badges"', 'class="ff-tier-badges not-prose"');
                    ops.push({ index: heading.index + heading.length, html: wrapped });
                }
            }

            // Subfeatures matched by docsLink fragment (skip if frontmatter already handled)
            for (const { feature, fragment } of subfeatures) {
                if (handledHeadingIds.has(fragment)) continue;
                const heading = headingMatches.find(h => h.id === fragment);
                if (!heading) continue;
                const badges = renderTierBadges(feature);
                if (badges) {
                    const wrapped = badges.replace('class="ff-tier-badges"', 'class="ff-tier-badges not-prose"');
                    ops.push({ index: heading.index + heading.length, html: wrapped });
                }
            }
        }

        ops.sort((a, b) => b.index - a.index);
        for (const op of ops) {
            content = content.slice(0, op.index) + op.html + content.slice(op.index);
        }
        return content;
    });

    // Make helpers available to changelog layout via filters
    eleventyConfig.addFilter("featureForChangelog", function(url) {
        return findFeatureByChangelog(url);
    });

    eleventyConfig.addFilter("featureForDocsPage", function(url) {
        return findFeatureByDocsLink(url);
    });

    eleventyConfig.addFilter("tierLabel", function(tierData) {
        return deriveTierLabel(tierData);
    });

    function loadSVG (file) {
        let relativeFilePath = `./src/_includes/components/icons/${file}.svg`;
        let data = fs.readFileSync(relativeFilePath, function(err, contents) {
            if (err) return err
            return contents
        });     
        return data.toString('utf8');
    }

    eleventyConfig.addFilter("templateExists", function(name){
        return fs.existsSync(name)
    })

    eleventyConfig.addShortcode("ffIconLg", function(icon, isSolid) {
        const svg = loadSVG(icon)
        if (!isSolid) {
            return `<svg class="ff-icon ff-icon-lg" fill="none" viewbox="0 0 24 24">${svg}</svg>`
        } else {
            return `<svg class="ff-icon ff-icon-lg ff-icon--solid" fill="none" viewbox="0 0 24 24">${svg}</svg>`
        }
    });

    eleventyConfig.addPairedShortcode("navoption", function(content, label, link, depth, icon, iconSolid, addClasses) {
        let svg, iconSvg = '', classes, chevron
        if (icon) {
            svg = loadSVG(icon)
            if (!iconSolid) {
                iconSvg = `<svg class="ff-icon ff-icon-sm" fill="none" viewbox="0 0 24 24">${svg}</svg>`
            } else {
                iconSvg = `<svg class="ff-icon ff-icon-sm ff-icon--solid" fill="none" viewbox="0 0 24 24">${svg}</svg>`
            }
        }
        if (content) {
            classes = "ff-nav-dropdown relative hover:cursor-pointer " + (addClasses || '')
        } else {
            classes= (addClasses || '')
        }

        if (content) {
            const chevronDown = loadSVG('chevron-down')
            return `<li class="${classes}"><span class="flex items-center gap-1">${iconSvg}${label}<span class="ff-nav-chevron">${chevronDown}</span></span>${content}</li>`
        } else if (link) {
            return `<li class="${classes}"><a class="flex items-center gap-2" href="${link}">${iconSvg}${label}</a></li>`
        } else {
            return `<li class="${classes}"><span class="flex items-center gap-2">${iconSvg}${label}</span></li>`
        }
    });
    
    // Eleventy Image shortcode
    // https://www.11ty.dev/docs/plugins/image/
    if (SKIP_IMAGES) {
        console.info(`[11ty] Image pipeline is enabled in dev mode, copying images without any conversion or resizing`)
    } else {
        console.info(`[11ty] Image pipeline is enabled in prod mode, expect a wait for first build while images are converted and resized`)
    }

    eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes) {
        const title = null
        const currentWorkingFilePath = this.page.inputPath

        return await imageHandler(src, alt, title, widths, sizes, currentWorkingFilePath, eleventyConfig, async=true, SKIP_IMAGES)
    });

    eleventyConfig.addAsyncShortcode("tileImage", async function(item, image, defaultImage, defaultDescription, imageSize, title = null, priority = false) {
        let imageSrc, imageDescription;

        if (item && item.data && item.data.image) {
            // item.data.image exists
            imageSrc = `./${item.data.image}`;
            imageDescription = `Image representing ${item.data.title}`;
        } else if (image) {
            // image exists
            imageSrc = `./${image}`;
            imageDescription = `Image representing ${title}`;
        } else {
            // use default values
            imageSrc = defaultImage;
            imageDescription = defaultDescription;
        }

        const currentWorkingFilePath = this.page.inputPath;

        return await imageHandler(imageSrc, imageDescription, title, [imageSize], null, currentWorkingFilePath, eleventyConfig, async=true, SKIP_IMAGES, priority);
    });
    
    // Create a collection for sidebar navigation
    eleventyConfig.addCollection('nav', function(collection) {
        let nav = {}

        createNav('docs')

        function createNav(tag) {
            const groupOrder = {
                docs: [
                    'FlowFuse User Manuals',
                    'Device Agent',
                    'FlowFuse Cloud',
                    'FlowFuse Self-Hosted',
                    'Support',
                    'Contributing'
                ]
            }

            collection.getFilteredByTag(tag).filter((page) => {
                return !page.url.includes('README')
            }).sort((a, b) => {
                // sort by depth, so we catch all the correct index.md routes
                const hierarchyA = a.url.split('/').filter(n => n)
                const hierarchyB = b.url.split('/').filter(n => n)
                return hierarchyA.length - hierarchyB.length
            }).forEach((page) => {
                let url = page.url

                // work out ToC Hierarchy
                // split the folder URI/URL, as this defines our TOC Hierarchy
                const hierarchy = url.split('/').filter(n => n)
                // recursively parse the folder hierarchy and created our collection object
                // pass nav = {} as the first accumulator - build up hierarchy map of TOC
                hierarchy.reduce((accumulator, currentValue, i) => {
                    // create a nested object detailing the full docs hierarchy
                    if (!accumulator[currentValue]) {
                        accumulator[currentValue] = {
                            'name': currentValue,
                            'url': page.data.redirect?.to || page.data.redirect || page.url,
                            'order': page.data.navOrder || Number.MAX_SAFE_INTEGER,
                            'children': {}
                        }
                        if (page.data.navTitle) {
                            accumulator[currentValue].name = page.data.navTitle
                        }
                        // TODO: navGroup will be used in the rendering of the ToC at a later stage
                        if (page.data.navGroup) {
                            accumulator[currentValue].group = page.data.navGroup
                        }
                    }
                    return accumulator[currentValue].children
                }, nav)
            })

            // recursive functions to format our nav map to arrays
            function childrenToArray (children) {
                return Object.values(children)
            }
            function nestedChildrenToArray (value) {
                for (const [key, entry] of Object.entries(value)) {
                    if (entry.children && Object.keys(entry.children).length > 0) {
                        // ensure our grandchildren are all converted to arrays before
                        // we convert the higher level object to an array
                        nestedChildrenToArray(entry.children)
                        // now we have converted all grandchildren,
                        // we can convert our children to an array
                        entry.children = childrenToArray(entry.children)
                    } else {
                        delete entry.children
                    }
                }

            }
            // convert our objects to arrays so we can render in nunjucks
            nestedChildrenToArray(nav)

            // add functionality to group to-level items for better navigation.
            let groups = {
                'Other': {
                    name: 'Other',
                    order: Number.MAX_SAFE_INTEGER,    // always render last
                    children: []
                }
            }

            if (nav[tag]) {
                for (child of nav[tag].children) {
                    if (child.group) {
                        const group = child.group
                        if (!groups[group]) {
                            groups[group] = {
                                name: group,
                                order: groupOrder[tag] && groupOrder[tag].includes(group) ? groupOrder[tag].indexOf(group) : Number.MAX_SAFE_INTEGER,
                                children: []
                            }
                        }
                        groups[group].children.push(child)
                    } else {
                        // capture & flag top-level docs that haven't had a group assigned
                        groups['Other'].children.push(child)
                    }
                }

                function sortChildren (a, b) {
                    // sort children by 'order', then alphabetical
                    return (a.order - b.order) || a.name.localeCompare(b.name)
                }

                function sortTree (node) {
                    if (!node || !node.children || !Array.isArray(node.children)) {
                        return
                    }

                    node.children.sort(sortChildren)
                    node.children.forEach(sortTree)
                }

                nav[tag].groups = Object.values(groups).sort(sortChildren)

                nav[tag].groups.forEach((group) => {
                    if (group.children) {
                        sortTree(group)
                    }
                })
            }
        }

        return nav;
    });

    eleventyConfig.addCollection("aiBlog", function(collectionApi) {
        return collectionApi.getFilteredByTag("ai").filter(item => {
            return !item.data.tags || !item.data.tags.includes("blueprints");
        });
    });

    eleventyConfig.addCollection("homeLogos", function () {
        const logosDir = path.join(__dirname, "src/images/home-logos");
        const logos = fs.readdirSync(logosDir)
            .filter(file => file.endsWith(".svg") || file.endsWith(".png"))
            .map(file => path.join("images/home-logos", file));
    
        return logos;
    });

    eleventyConfig.addCollection("publications", function(collectionApi) {
        return collectionApi.getAll().filter(item => {
            return item.data.tags && (item.data.tags.includes("whitepaper") || item.data.tags.includes("ebook"));
        }).map(item => {
            item.data.tags = item.data.tags.map(tag => {
                if (tag.toLowerCase() === 'whitepaper') {
                    return 'Whitepaper';
                } else if (tag.toLowerCase() === 'ebook') {
                    return 'eBook';
                }
                return tag;
            });
            return item;
        });
    });



    // Plugins
    eleventyConfig.addPlugin(EleventyRenderPlugin)
    eleventyConfig.addPlugin(pluginRSS)
    eleventyConfig.addPlugin(syntaxHighlight)
    eleventyConfig.addPlugin(codeClipboard)
    eleventyConfig.addPlugin(pluginMermaid)
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(pluginTOC, {
        tags: ['h2', 'h3', 'h4'],
        wrapper: 'div',
        wrapperClass: 'toc',
        ul: true,
    });

    const markdownItOptions = {
        html: true,
    }

    const markdownItAnchorOptions = {
        permalink: markdownItAnchor.permalink.headerLink()
    }

    const markdownLib = markdownIt(markdownItOptions)
        .use(markdownItAnchor, markdownItAnchorOptions)
        .use(markdownItFootnote)
        .use(markdownItAttrs)
        .use(codeClipboard.markdownItCopyButton, {
            iconifyUrl: '',
            additionalButtonClass: 'mdi mdi-content-copy',
            iconStyle: 'background: initial',
        })

    markdownLib.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx]

        const imgSrc = token.attrGet('src')
        const imgAlt = token.content
        const imgTitle = token.attrGet('title')

        // Get all the attributes of the image
        const attributes = token.attrs.reduce((acc, attr) => {
            acc[attr[0]] = attr[1];
            return acc;
        }, {});

        const folderPath = env.page.inputPath
        
        // Check if the image has the 'data-zoomable' attribute
        const widths = 'data-zoomable' in attributes ? [1920] : [650]; // maximum width an image can be displayed at as part of blog prose

        const htmlSizes = null

        const async = false // cannot run async inside markdown

        try {
            let imageHtml = imageHandler(imgSrc, imgAlt, imgTitle, widths, htmlSizes, folderPath, eleventyConfig, async, SKIP_IMAGES)

            // Add the additional attributes to the image
            for (let attr in attributes) {
                if (attr !== 'src' && attr !== 'alt' && attr !== 'title') {
                    imageHtml = imageHtml.replace('<img', `<img ${attr}="${attributes[attr]}"`);
                }
            }

            return imageHtml;
        } catch (error) {
            console.error(`Image generation error while handling: ${imgSrc} in ${folderPath} - ${error}, consider using @skip`)
            throw error
        }
    }

    markdownLib.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const hrefIndex = tokens[idx].attrIndex('href');
        if (hrefIndex >= 0) {
            let href = tokens[idx].attrs[hrefIndex][1];
            const classIndex = tokens[idx].attrIndex('class');
    
            // Exclude the link if it has the class 'header-anchor'
            if (classIndex >= 0 && tokens[idx].attrs[classIndex][1] === 'header-anchor') {
                return self.renderToken(tokens, idx, options);
            }
    
            // Ensure the URL has a trailing slash, but do not update if it contains a '#' or ends with '.md' or https
            if (!href.endsWith('/') && !href.includes('#') && !href.endsWith('.md') && !href.endsWith('.zip') && !href.includes('https')) {
                href += '/';
            }

            tokens[idx].attrs[hrefIndex][1] = href;
        }
        return self.renderToken(tokens, idx, options);
    };

    
    eleventyConfig.setLibrary("md", markdownLib)

    if (!DEV_MODE) {
        console.info(`[11ty] Output HTML will be minified, expect a short wait`)
        eleventyConfig.addTransform("htmlmin", async function (content) {
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                let minified = await htmlmin.minify(content, {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    preserveLineBreaks: true,
                    removeComments: true,

                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                })

                return minified
            }

            return content
        })
    }

    return {
        dir: {
            input: "src"
        }
    }
};
