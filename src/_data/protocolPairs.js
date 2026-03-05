const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    const protocolsFile = path.join(__dirname, "protocols.yaml");
    const protocolsData = yaml.load(fs.readFileSync(protocolsFile, "utf8"));
    const protocols = protocolsData.protocols;

    const pairs = [];

    for (let i = 0; i < protocols.length; i++) {
        for (let j = 0; j < protocols.length; j++) {
            if (i !== j) {
                const from = protocols[i];
                const to = protocols[j];
                pairs.push({
                    slug: `${from.slug}-to-${to.slug}`,
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
