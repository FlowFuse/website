const assert = require('assert');
const fs = require('fs');
const path = require('path');


describe("Page titles", async function() {
	it("displays the homepage title", async function() {
		var data;
		data = fs.readFileSync(path.resolve(__dirname, "../_site/index.html"), 'utf8');

		var xpath = require('xpath');
		var dom = require('xmldom').DOMParser;

		var doc = new dom().parseFromString(data)
		var nodes = xpath.select("//title", doc)

		assert.equal(nodes[0].firstChild.data, "FlowForge • DevOps for Node-RED")
	})
})
