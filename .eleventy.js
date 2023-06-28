const path = require("path");
const util = require("util");
const fs = require("fs");

const { EleventyEdgePlugin } = require("@11ty/eleventy");
const eleventyImage = require("@11ty/eleventy-img");
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

const heroGen = require("./lib/post-hero-gen.js");
const imageHandler = require('./lib/image-handler.js')
const site = require("./src/_data/site");
const coreNodeDoc = require("./lib/core-node-docs.js");

const DEV_MODE = process.env.ELEVENTY_RUN_MODE !== "build" // i.e. serve/watch

module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false); // Otherwise docs are ignored

    eleventyConfig.addPlugin(EleventyEdgePlugin);

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    eleventyConfig.addLayoutAlias('nohero', 'layouts/nohero.njk');
    eleventyConfig.addLayoutAlias('solution', 'layouts/solution.njk');
    eleventyConfig.addLayoutAlias('redirect', 'layouts/redirect.njk');

    // Copy the contents of the `public` folder to the output folder
    eleventyConfig.addPassthroughCopy({
        "src/public/": "/",
    });

    // Naive copy of images for backwards compatibility of non short-code image handling (use of <img or in CSS)
    eleventyConfig.addPassthroughCopy("src/**/images/**/*");

    // Watch content images for the image pipeline
    eleventyConfig.addWatchTarget("src/**/*.{svg,webp,png,jpeg,gif}");

    eleventyConfig.setServerOptions({
        // Additional files to watch that will trigger server updates
        watch: ["_site/**/*.css", "_site/**/*.js"],
    })

    // make global accessible in src/_includes/layouts/base.njk for loading of PH scripts
    eleventyConfig.addGlobalData('POSTHOG_APIKEY', () => process.env.POSTHOG_APIKEY || '' )

    // Custom Tooltip "Component"
    eleventyConfig.addPairedShortcode("tooltip", function (content, text) {
        return `<span class="ff-tooltip" data-tooltip="${text}">${content}</span><span></span>`
    });

    eleventyConfig.addFilter("coreNodeName", (name) => { return name.split("-").at(-1) })
    eleventyConfig.addAsyncShortcode("coreNodeDoc", async function (category, name) {
        return await coreNodeDoc(category, name)
    });

    // Custom filters
    eleventyConfig.addFilter("json", (content) => {
        return JSON.stringify(content)
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit + 1));

    eleventyConfig.addFilter('console', function (value) {
        const str = util.inspect(value, { showHidden: false, depth: null });
        return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
    });


    eleventyConfig.addFilter('dictsortBy', function(val, reverse, attr) {
        let array = [];
        for (let k in val) {
            array.push(val[k]);
        }

        array.sort((t1, t2) => {
            var a = t1[attr];
            var b = t2[attr];
        
            return a > b ? 1 : (a === b ? 0 : -1); // eslint-disable-line no-nested-ternary
        });

        return array
    });

    eleventyConfig.addFilter('shortDate', dateObj => {
        return spacetime(dateObj).format('{date} {month-short}, {year}')
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

    eleventyConfig.addFilter("excerpt", function(str) {
        const content = new String(str);
        return content.split("\n<!--more-->\n")[0]
    });

    eleventyConfig.addFilter("restoreParagraphs", function(str) {
        const content = new String(str);
        return "<p>"+content.split(/\.\n/).join(".</p><p>")+"</p>"
    });

    eleventyConfig.addFilter("generatePostSVG", function(id) {
        return heroGen(""+id)
    })

    eleventyConfig.addFilter("toAbsoluteUrl", function(url) {
        return new URL(url, site.baseURL).href;
    })

    eleventyConfig.addFilter("handbookBreadcrumbs", (str) => {
        const parts = str.split("/");
        parts.shift();
        if (parts[parts.length-1] === "index") {
            parts.pop();
        }
        let path = "";
        return "/"+parts.map(p => {
            let url = `${path}/${p}`;
            path = url;
            return `<a class="mx-2" href="${url}">${p}</a>`
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
        let baseUrl = 'https://github.com/flowforge/website/edit/main/'
        let filePath = page.inputPath

        if (/^\/docs/.test(page.url)) {
            pathElements = page.inputPath.split(path.sep)

            if (pathElements[pathElements.length - 1] === "index.md") {
                pathElements[pathElements.length - 1] = "README.md"
            }

            filePath = path.join(...pathElements.slice(2))
            baseUrl = 'https://github.com/flowforge/flowforge/edit/main/'
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

    eleventyConfig.addShortcode("renderTeamMember", function(teamMember) {
        // When the author is no longer at FlowForge
        if (typeof teamMember === "undefined") {
            return ""
    }

        return `<div class="team-card--sm">
                    <div class="ff-headshot" style="background-image: url(/images/team/headshot-${ teamMember.headshot })"></div>
                        <div class="team-card-info">
                            <label>${ teamMember.name }</label>
                            <span>${ teamMember.title }</span>
                        </div>
                    </div>`
    });

    function loadSVG (file) {
        let relativeFilePath = `./src/_includes/components/icons/${file}.svg`;
        let data = fs.readFileSync(relativeFilePath, function(err, contents) {
            if (err) return err
            return contents
        });     
        return data.toString('utf8');
    }

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
            classes = "ff-nav-dropdown relative " + (addClasses || '')
        } else {
            classes= (addClasses || '')
        }

        if (content) {
            const chevronDown = loadSVG('chevron-down')
            return `<li class="${classes}"><a class="flex items-center gap-1">${iconSvg}${label}<span class="ff-nav-chevron">${chevronDown}</span></a>${content}</li>`
        } else if (link) {
            return `<li class="${classes}"><a class="flex items-center gap-2" href="${link}">${iconSvg}${label}</a></li>`
        } else {
            return `<li class="${classes}"><a class="flex items-center gap-2">${iconSvg}${label}</a></li>`
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

    // Create a collection for sidebar navigation
    eleventyConfig.addCollection('nav', function(collection) {
        let nav = {}

        createNav('handbook')
        createNav('docs')
        createNav('core-nodes')

        function createNav(tag) {
            collection.getFilteredByTag(tag).filter((page) => {
                return !page.url.includes('README')
            }).sort((a, b) => {
                // sort by depth, so we catch all the correct index.md routes
                const hierarchyA = a.url.split('/').filter(n => n)
                const hierarchyB = b.url.split('/').filter(n => n)
                return hierarchyA.length - hierarchyB.length
            }).forEach((page) => {
                let url = page.url
                if (tag == "core-nodes") {
                    url = page.url.replace("/node-red", "")
                }

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
                            'url': page.url,
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
                    order: -1,    // always render last
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
                                order: 0,
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
                    return b.order - a.order || a.name.localeCompare(b.name)
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

    // Plugins
    eleventyConfig.addPlugin(pluginRSS)
    eleventyConfig.addPlugin(syntaxHighlight)
    eleventyConfig.addPlugin(codeClipboard)
    eleventyConfig.addPlugin(pluginMermaid)

    const markdownItOptions = {
        html: true,
    }

    const markdownItAnchorOptions = {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: `#&nbsp;`,
            placement: 'before'
        })
    }

    const markdownLib = markdownIt(markdownItOptions)
        .use(markdownItAnchor, markdownItAnchorOptions)
        .use(markdownItFootnote)
        .use(markdownItAttrs)
        .use(codeClipboard.markdownItCopyButton)

    markdownLib.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx]

        const imgSrc = token.attrGet('src')
        const imgAlt = token.content
        const imgTitle = token.attrGet('title')

        const folderPath = env.page.inputPath
        
        const widths = [650] // maximum width an image can be displayed at as part of blog prose
        const htmlSizes = null

        const async = false // cannot run async inside markdown

        try {
            return imageHandler(imgSrc, imgAlt, imgTitle, widths, htmlSizes, folderPath, eleventyConfig, async, DEV_MODE)
        } catch (error) {
            console.error(`Image generation error while handling: ${imgSrc} in ${folderPath} - ${error}, consider using @skip`)
            throw error
        }
    }

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
                    ignoreCustomComments: [
                        /ELEVENTYEDGE.*/
                    ],
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