const fetch = require('node-fetch');

module.exports = async function() {
  const response = await fetch('https://catalog.flowfuse.com/catalogue.json');
  const data = await response.json();

  const transformedData = data.modules.map(item => ({
    title: item.id.replace(/^(node-red-contrib-|node-red-node-|@flowfuse\/)/, '').split('-').map(word => word.toUpperCase()).join(' '),
    id: item.id,
    url: item.url,
    description: item.description,
  }));

  return transformedData;
};