const spacetime = require("spacetime");
module.exports = function(eleventyConfig) {

    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
    eleventyConfig.addPassthroughCopy({ "src/images":"images"});

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

     eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))

    return {
        dir: {
            input: "src"
        }
    }
};