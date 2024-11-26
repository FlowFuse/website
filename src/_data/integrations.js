const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
    return [{
        "module": "@flowfuse/node-red-dashboard",
        "name": "FlowFuse Dashboard",
        "url": "https://dashboard.flowfuse.com",
        "img": "https://dashboard.flowfuse.com/logo.png"
    }]
}