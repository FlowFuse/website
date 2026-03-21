const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    const dataFile = path.join(__dirname, "certifiedIntegrations.yaml");
    const data = yaml.load(fs.readFileSync(dataFile, "utf8"));
    const integrations = data.integrations;

    const pairs = [];

    for (let i = 0; i < integrations.length; i++) {
        for (let j = 0; j < integrations.length; j++) {
            if (i !== j) {
                const from = integrations[i];
                const to = integrations[j];
                pairs.push({
                    slug: `${from.slug}-and-${to.slug}`,
                    from: from,
                    to: to,
                    title: `Connect ${from.name} to ${to.name}`,
                    description: `Learn how to connect ${from.name} to ${to.name} using FlowFuse and Node-RED. Bridge ${from.shortName} data to ${to.shortName} systems seamlessly.`,
                    meta: {
                        title: `Connect ${from.name} to ${to.name} | FlowFuse`,
                        description: `How to connect ${from.name} to ${to.name} using FlowFuse. Build data pipelines between ${from.shortName} and ${to.shortName}.`,
                        keywords: `${from.name}, ${to.name}, integration, FlowFuse, Node-RED, connect ${from.shortName} to ${to.shortName}`
                    }
                });
            }
        }
    }

    return pairs;
};
