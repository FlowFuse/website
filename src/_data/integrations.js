const EleventyFetch = require("@11ty/eleventy-fetch");
const certifiedNodes = require("./certifiedNodes");

module.exports = async () => {
    const api = "https://flows.nodered.org/things?format=json&type=node&per_page=200";

    const response = await EleventyFetch(api, {
        duration: "4h", // ensure we've gathered new data every 4 hours
        type: "json"
    });

    const nodes = await certifiedNodes();
    const ffNodesMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {});
    // TODO: Overlap certified nodes here
    const data = response.data.map((node) => {
        if (ffNodesMap[node._id]) {
            node.ffCertified = true
        }
        return node        
    })

    return data
}