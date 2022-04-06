const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const spacetime = require("spacetime");
const heroGen = require("./lib/post-hero-gen.js");
const countryFlag = require("./lib/country-flag-emoji");

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

    eleventyConfig.addFilter("rewriteHandbookLinks", (str) => {
        str = str.replace(/href="\.\/([^/]*?)\.md(#.*)?"/g,'href="../$1/$2"')
        str = str.replace(/href="(.*?)\.md(#.*)?"/g,'href="$1/$2"')
        str = str.replace(/href="(.*?)README\/?"/g, 'href="$1"')
        return str;
    })
    eleventyConfig.addFilter("handbookMapOriginalPath", (str) => {
        str = str.replace("/handbook/","");
        if (str === "index") {
            return "README.md"
        }
        return str+".md";
    })
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))

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

    eleventyConfig.setLibrary("md", markdownLib)

    return {
        dir: {
            input: "src"
        }
    }
};
