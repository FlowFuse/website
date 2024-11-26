const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
    const api = "https://flows.nodered.org/things?format=json&type=node";

    const response = await EleventyFetch(api, {
        duration: "4h", // ensure we've gathered new data every 4 hours
        type: "json"
    });

    const data = response.data.map((node) => {
        return node        
    })

    return data
}