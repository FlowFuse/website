const EleventyFetch = require("@11ty/eleventy-fetch");
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;

module.exports = async function (cat, nodeName) {
    let page = "";
    try {
        const url = `https://raw.githubusercontent.com/node-red/node-red/master/packages/node_modules/%40node-red/nodes/locales/en-US/${cat}/${nodeName}.html`
        let data = await EleventyFetch(url, { type: "text" });

        const doc = new dom({
            locator: {},
            errorHandler: {
                warning: function (w) { },
                error: function (e) { },
                fatalError: function (e) { console.error(e) }
            }
        }).parseFromString(data.toString());

        return xpath.select("/script[@data-help-name]/*", doc).join(" ")
    } catch (e) {
        console.error(e);
        return null;
    }
};
