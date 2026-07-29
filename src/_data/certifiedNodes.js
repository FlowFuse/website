const EleventyFetch = require("@11ty/eleventy-fetch");

/*
    Build-time mirror of the FlowFuse Certified Nodes catalogues.

    These are the same two feeds the Nuxt /integrations page reads (see
    CERTIFIED_HUB_API / CERTIFIED_EDGE_API in nuxt/types/integrations.ts). While
    the site is mid-migration the two halves have separate data layers, so this
    file deliberately duplicates the fetch rather than importing across the
    boundary. Keep the URLs and the docs-path rules below in sync with
    nuxt/utils/integrations.ts.
*/
const CATALOGUES = [
    {
        collection: "hub",
        label: "Hub",
        url: "https://ff-certified-nodes.flowfuse.cloud/ff-it.json",
    },
    {
        collection: "edge",
        label: "Edge",
        url: "https://ff-certified-nodes.flowfuse.cloud/ff-ot.json",
    },
];

/*
    Mirrors DOCS_URL_OVERRIDES in nuxt/utils/integrations.ts. A catalogue entry's
    `url` is whatever the publisher set, which for opcua is Sterfive's repository
    rather than the FlowFuse documentation page. Entries here win over `url`.
*/
const DOCS_PATH_OVERRIDES = {
    "@flowfuse-certified-nodes/opcua": "/node-red/flowfuse/edge/opcua/",
};

/*
    The catalogues do not currently carry a display `name`, and the ids are
    lowercase slugs, so title-casing alone produces "Opcua" and "Rtsp". Acronyms
    cannot be inferred, so they are spelled out here. A node missing from this map
    still renders, using the title-cased slug, which reads correctly for names
    that are ordinary words ("Redis", "Modbus", "Kafka").
*/
const NAME_OVERRIDES = {
    "@flowfuse-certified-nodes/opcua": "OPC UA",
    "@flowfuse-certified-nodes/rtsp": "RTSP",
    "@flowfuse-certified-nodes/cip-suite": "CIP Suite",
};

// Last resort when there is neither an override nor a catalogue `name`:
// "@flowfuse-certified-nodes/cip-suite" becomes "Cip Suite".
function displayNameFromId(id) {
    return id
        .split("/")
        .pop()
        .split("-")
        .map((word) => word.replace(/^\w/, (c) => c.toUpperCase()))
        .join(" ");
}

// Only flowfuse.com links become on-site paths. Anything else (a GitHub repo, a
// vendor site) is not a documentation page we control, so it is discarded and
// the collection index is used instead.
function docsPathFromCatalogueUrl(url) {
    if (!url) {
        return undefined;
    }
    try {
        const parsed = new URL(url);
        if (parsed.hostname !== "flowfuse.com" && parsed.hostname !== "www.flowfuse.com") {
            return undefined;
        }
        return parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
    } catch {
        return undefined;
    }
}

module.exports = async function () {
    const byId = {};
    const all = [];

    for (const catalogue of CATALOGUES) {
        let data;
        try {
            data = await EleventyFetch(catalogue.url, {
                duration: "4h",
                type: "json",
            });
        } catch (error) {
            // A catalogue being unreachable must not fail the build. Callouts for
            // its nodes simply do not render until the next successful fetch.
            console.warn(`[certifiedNodes] skipping ${catalogue.url}: ${error.message}`);
            continue;
        }

        for (const module of data.modules || []) {
            const node = {
                id: module.id,
                name: NAME_OVERRIDES[module.id] || module.name || displayNameFromId(module.id),
                description: module.description,
                version: module.version,
                collection: catalogue.collection,
                collectionLabel: catalogue.label,
                collectionIndex: `/node-red/flowfuse/${catalogue.collection}/`,
                docsPath:
                    DOCS_PATH_OVERRIDES[module.id] ||
                    docsPathFromCatalogueUrl(module.url) ||
                    `/node-red/flowfuse/${catalogue.collection}/`,
            };
            byId[node.id] = node;
            all.push(node);
        }
    }

    all.sort((a, b) => a.name.localeCompare(b.name));

    return { byId, all };
};
