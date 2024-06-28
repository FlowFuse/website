const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  const url = 'https://catalog.flowfuse.com/catalogue.json';

  const data = await EleventyFetch(url, {
    duration: "4h", // save for 1 day
    type: "json"    // parse the JSON
  });

  const transformedData = data.modules.map(item => ({
    title: item.id.replace(/^(node-red-contrib-|node-red-node-|@flowfuse\/)/, '')
      .split('-')
      .map(word => word.replace(/^\w/, (c) => c.toUpperCase()))
      .join(' '),
    id: item.id,
    url: item.url || `https://flows.nodered.org/node/${item.id}`,
    description: item.description,
  }));

  return transformedData;
};