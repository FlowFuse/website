const path = require("path");
const util = require("util");
const fs = require("fs");

const { EleventyRenderPlugin } = require("@11ty/eleventy");

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require('markdown-it-attrs');
const spacetime = require("spacetime");
const { minify } = require("terser");
const codeowners = require('codeowners');
const pluginTOC = require('eleventy-plugin-toc');
const imageHandler = require('./lib/image-handler.js')
const site = require("./src/_data/site");
const coreNodeDoc = require("./lib/core-node-docs.js");
const yaml = require("js-yaml");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


// Skip slow optimizations when developing i.e. serve/watch or Netlify deploy preview
const DEV_MODE = process.env.ELEVENTY_RUN_MODE !== "build" || process.env.CONTEXT === "deploy-preview" || process.env.SKIP_IMAGES === 'true'
const DEPLOY_PREVIEW = process.env.CONTEXT === "deploy-preview";

module.exports = function(eleventyConfig) {
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents)); // Add support for YAML data files
    eleventyConfig.setUseGitIgnore(false); // Otherwise docs are ignored
    eleventyConfig.setWatchThrottleWaitTime(500); // in milliseconds

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
        
        // Convert relative links in README to absolute links
        const matcher = /((href|src)="([^"]*))"/g;
        let match;
        const result = str.replace(matcher, (fullMatch, group1, attr, url) => {
            // Skip absolute URLs and mailto links
            if (/^(http|https|mailto:)/.test(url)) {
                return fullMatch;
            }
            
            // Skip pure anchors (same-page links)
            if (url.startsWith('#')) {
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
        const split = text.split(" ");
        if (split.length <= maxWordCount) {
            return text;
        }
        return text.split(" ").splice(0, maxWordCount).join(" ") + "..."
    });


    eleventyConfig.addFilter("excerpt", function(str) {
        const content = new String(str);
        return content.split("\n<!--more-->\n")[0]
    });

    eleventyConfig.addFilter("restoreParagraphs", function(str) {
        const content = new String(str);
        return "<p>"+content.split(/\.\n/).join(".</p><p>")+"</p>"
    });

    eleventyConfig.addFilter("toAbsoluteUrl", function(url) {
        return new URL(url, site.baseURL).href;
    })

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
        // If page.inputPath looks like: ./src/handbook/abc/def.md
        // then the url of the page will be `/handbook/abc/def/`
        // links of the form `./` or `[^/]` must be prepended with `../`
        // to ensure it links to the right place

        const isIndexPage = /(README.md|index.md)$/i.test(page.inputPath)

        const matcher = /((href|src)="([^"]*))"/g
        let match
        while ((match = matcher.exec(str)) !== null) {
            let url = match[3]
            if (/^(http|#|mailto:)/.test(url)) {
                // Do not rewrite absolute urls, in-page anchors or emails
                continue
            }
            // */abc.md#anchor => */abc/#anchor
            url = url.replace(/.md(#.*)?$/, '$1')
            // */README#anchor => */#anchor
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

    eleventyConfig.addShortcode("hubspotForm", function(formId, cta, reference, functionName = 'displayHubSpotForm') {
      return `
        <script>
            function ${functionName}() {
                hbspt.forms.create({
                    region: "eu1",
                    portalId: "26586079",
                    formId: "${formId}",
                    onFormSubmit: function ($form) {
                        capture('${cta}', {
                            'page': '${reference}'
                        })
                    }
                });
            }
        </script>
        <script async type="text/javascript" charset="utf-8" src="//js-eu1.hsforms.net/forms/embed/v2.js" onload="${functionName}()" onerror="hsFallback(this)"></script>
      `;
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
    if (DEV_MODE) {
        console.info(`[11ty] Image pipeline is enabled in dev mode, copying images without any conversion or resizing`)
    } else {
        console.info(`[11ty] Image pipeline is enabled in prod mode, expect a wait for first build while images are converted and resized`)
    }

    eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes) {
        const title = null
        const currentWorkingFilePath = this.page.inputPath

        return await imageHandler(src, alt, title, widths, sizes, currentWorkingFilePath, eleventyConfig, async=true, DEV_MODE)
    });

    eleventyConfig.addAsyncShortcode("tileImage", async function(item, image, defaultImage, defaultDescription, imageSize, title = null) {
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

        return await imageHandler(imageSrc, imageDescription, title, [imageSize], null, currentWorkingFilePath, eleventyConfig, async=true, DEV_MODE);
    });
    
    // Create a collection for sidebar navigation
    eleventyConfig.addCollection('nav', function(collection) {
        let nav = {}

        createNav('handbook')
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
                    // create a nested object detailing the full handbook hierarchy
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

            // not req'd to have handbook in Website build, so this may be empty
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
                        // capture & flag top-level handbook docs, that haven't had a group assigned
                        groups['Other'].children.push(child)
                    }
                }

                function sortChildren (a, b) {
                    // sort children by 'order', then alphabetical
                    return (a.order - b.order) || a.name.localeCompare(b.name)
                }

                nav[tag].groups = Object.values(groups).sort(sortChildren)

                nav[tag].groups.forEach((group) => {
                    if (group.children) {
                        group.children.forEach((child) => {
                            if (child.children) {
                                child.children.sort(sortChildren)
                            }
                        })
                        group.children.sort(sortChildren)
                    }
                })
            }
        }

        return nav;
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
            let imageHtml = imageHandler(imgSrc, imgAlt, imgTitle, widths, htmlSizes, folderPath, eleventyConfig, async, DEV_MODE)

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
        eleventyConfig.addTransform("htmlmin", function (content) {
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                let minified = htmlmin.minify(content, {
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