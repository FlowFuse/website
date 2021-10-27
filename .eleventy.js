const spacetime = require("spacetime");
const heroGen = require("./lib/post-hero-gen.js");
const { minify } = require("terser");

module.exports = function(eleventyConfig) {

    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js");
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

    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))

    eleventyConfig.addTransform("jsmin", async function(content, outputPath) {
        // Eleventy 1.0+: use this.inputPath and this.outputPath instead
        if( outputPath && outputPath.endsWith(".js") ) {
            let minified = await minify(content)
            return minified;
        }

        return content;
    });


    return {
        dir: {
            input: "src"
        }
    }
};
