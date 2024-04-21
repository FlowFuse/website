const EleventyFetch = require("@11ty/eleventy-fetch");
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;

module.exports = async function (cat, node) {
    let page = "";
    try {
        const url = `https://raw.githubusercontent.com/node-red/node-red/master/packages/node_modules/%40node-red/nodes/locales/en-US/${cat}/${node.file}.html`
        let data = await EleventyFetch(url, { type: "text" });

        const doc = new dom({
            locator: {},
            errorHandler: {
                warning: function (w) { },
                error: function (e) { },
                fatalError: function (e) { console.error(e) }
            }
            // As there's a few nodes that have multiple docs in one file, we wrap it to make it
            // valid XML
        }).parseFromString("<scripts>" + data.toString() + "</scripts>", 'text/xml');

        return xpath.select(`/scripts/script[starts-with(@data-help-name, "${node.xpath}")]/*`, doc).join(" ")
    } catch (e) {
        console.error(e);
        return null;
    }
};
