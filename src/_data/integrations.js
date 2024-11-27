const EleventyFetch = require("@11ty/eleventy-fetch");
const certifiedNodes = require("./certifiedNodes");

module.exports = async () => {
    console.log("Loading Integrations...")
    const api = "https://ff-integrations.flowfuse.cloud/api/nodes";

    const response = await EleventyFetch(api, {
        duration: "4h", // ensure we've gathered new data every 4 hours
        type: "json"
    });

    const nodes = await certifiedNodes();
    const ffNodesMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {});
    console.log(response.catalogue.length + " integrations loaded.")
    // TODO: Overlap certified nodes here
    const data = response.catalogue.map((node) => {
        if (ffNodesMap[node._id]) {
            node.ffCertified = true
        }
        if (!node.categories) {
            node.categories = []
        }
        // map to ensure we have unique collection names
        node.categories = node.categories.map(category => {
            return category.includes('catalogue') ? category : 'catalogue_' + category
        })
        if (node.categories.indexOf("catalogue") === -1) {
            node.categories.push("catalogue")
        }
        return node        
    }).sort((a, b) => {
        if (a.ffCertified && !b.ffCertified) {
            return -1
        }
        if (!a.ffCertified && b.ffCertified) {
            return 1
        }
        return a.name.localeCompare(b.name)
    })
    console.log("Loaded Integrations.")

    return data
}