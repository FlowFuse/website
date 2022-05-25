const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const spacetime = require("spacetime");
const heroGen = require("./lib/post-hero-gen.js");
const countryFlag = require("./lib/country-flag-emoji");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const { stringify } = require("postcss");


module.exports = function(eleventyConfig) {
    eleventyConfig.setWatchThrottleWaitTime(200); // in milliseconds
    eleventyConfig.setUseGitIgnore(false);

    // TODO: when we move to 11ty v1.0, use the following
    // rather than ignoring git ignore
    //eleventyConfig.ignores.delete("src/handbook");

    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    eleventyConfig.addLayoutAlias('nohero', 'layouts/nohero.njk');
    eleventyConfig.addLayoutAlias('redirect', 'layouts/redirect.njk');
    eleventyConfig.addPassthroughCopy("src/images");
    // eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy({"src/favicon/*":"/"});
    eleventyConfig.addPassthroughCopy("src/.well-known")
    eleventyConfig.addPassthroughCopy("src/**/images/*");


    eleventyConfig.addFilter("head", (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter('shortDate', dateObj => {
        return spacetime(dateObj).format('{date} {month-short}, {year}')
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

    eleventyConfig.addFilter("countryFlag", function(country) {
        return countryFlag(country)
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
            // console.log(" rewrite link:", match[3],'=>',url)
            str = str.substring(0, match.index) + `${match[2]}="${url}"` + str.substring(match.index+match[1].length)
        }
        return str;
    })
    eleventyConfig.addFilter("handbookEditLink", (page, originalPath) => {
        let baseUrl
        let filePath = page.filePathStem
        if (/^\/docs/.test(page.url)) {
            baseUrl = 'https://github.com/flowforge/flowforge/edit/main/docs/'
        } else if (/^\/handbook/.test(page.url)) {
            baseUrl = 'https://github.com/flowforge/handbook/edit/main/'
            // Handbook files are at the root of their repo - so strip the prefix
            filePath = filePath.substring('/handbook'.length)
        }
        return baseUrl+originalPath.replace(/^.\//,'')
    })
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))
    eleventyConfig.addPlugin(pluginMermaid);

    const markdownItOptions = {
        html: true,
    }

    // Options for the `markdown-it-anchor` library
    const markdownItAnchorOptions = {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: `#&nbsp;`,
            placement: 'before'
        })
    }

    const markdownLib = markdownIt(markdownItOptions).use(
        markdownItAnchor,
        markdownItAnchorOptions
    )

    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setLibrary("md", markdownLib)

    return {
        dir: {
            input: "src"
        }
    }
};
