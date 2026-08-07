const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

/*
    Exposes the curated FlowFuse Certified Nodes bundles (Hub / Edge) to Eleventy
    so the 11ty product pages can render the same toggle the Nuxt pricing page
    shows. Single source of truth is nuxt/content/certified-nodes.yml — the Nuxt
    `certifiedNodes` content collection reads the same file, so both stay in sync.
*/
module.exports = function () {
    const file = path.join(__dirname, "../../nuxt/content/certified-nodes.yml");
    try {
        return yaml.load(fs.readFileSync(file, "utf8")) || { bundles: [] };
    } catch (err) {
        console.warn(`[certifiedBundles] could not read ${file}: ${err.message}`);
        return { bundles: [] };
    }
};
