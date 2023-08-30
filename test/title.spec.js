const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe("Page titles", async function() {
	it("displays the homepage title", async function() {
		const data = fs.readFileSync(path.resolve(__dirname, "../_site/index.html"), 'utf8');

		const xpath = require('xpath');
    const dom = require('@xmldom/xmldom').DOMParser;

		const doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
    }).parseFromString(data);

		var nodes = xpath.select("//title", doc)

		assert.equal(nodes[0].firstChild.data, "FlowFuse • DevOps for Node-RED")
	})
})
