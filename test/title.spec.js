const assert = require('assert');
const fs = require('fs');
const path = require('path');
describe("Page titles", async function() {
	it("displays the homepage title", async function() {
		const data = fs.readFileSync(path.resolve(__dirname, "../_site/index.html"), 'utf8');

		const xpath = require('xpath');
		const dom = require('xmldom').DOMParser;

		var nodes = xpath.select("//title", new dom().parseFromString(data))

		assert.equal(nodes[0].firstChild.data, "FlowForge • DevOps for Node-RED")
	})
})
