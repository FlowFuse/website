#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const algoliasearch = require("algoliasearch");

const BATCH_SIZE = 1000;

function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

function normalizeRecord(record) {
    return {
        objectID: String(record.objectID),
        hierarchy: {
            lvl0: record.hierarchy?.lvl0 || null,
            lvl1: record.hierarchy?.lvl1 || null,
            lvl2: record.hierarchy?.lvl2 || null,
            lvl3: record.hierarchy?.lvl3 || null,
            lvl4: record.hierarchy?.lvl4 || null,
            lvl5: record.hierarchy?.lvl5 || null,
            lvl6: record.hierarchy?.lvl6 || null,
        },
        content: record.content || "",
        urlDepth: Number.isFinite(record.urlDepth) ? record.urlDepth : 0,
        position: Number.isFinite(record.position) ? record.position : 0,
        dateModified: Number.isFinite(record.dateModified) ? record.dateModified : null,
        datePublished: Number.isFinite(record.datePublished) ? record.datePublished : null,
        keywords: Array.isArray(record.keywords) ? record.keywords : [],
        lang: record.lang || "en",
        url: record.url || "",
        origin: record.origin || "",
        pathname: record.pathname || "",
        title: record.title || "",
        description: record.description || "",
        image: record.image || "",
        type: record.type || "",
        hierarchicalCategories: {
            lvl0: record.hierarchicalCategories?.lvl0 || null,
            lvl1: record.hierarchicalCategories?.lvl1 || null,
            lvl2: record.hierarchicalCategories?.lvl2 || null,
            lvl3: record.hierarchicalCategories?.lvl3 || null,
            lvl4: record.hierarchicalCategories?.lvl4 || null,
            lvl5: record.hierarchicalCategories?.lvl5 || null,
            lvl6: record.hierarchicalCategories?.lvl6 || null,
        },
        contentLength: Number.isFinite(record.contentLength) ? record.contentLength : 0,
        category: record.category || "",
    };
}

function sameRecord(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

async function main() {
    const {
        ALGOLIA_APP_ID,
        ALGOLIA_ADMIN_KEY,
        ALGOLIA_INDEX_NAME,
    } = process.env;

    if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY || !ALGOLIA_INDEX_NAME) {
        throw new Error(
            "Missing env vars: ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME"
        );
    }

    const searchIndexPath = process.argv[2]
        ? path.resolve(process.argv[2])
        : path.join(process.cwd(), "_site", "search-index.json");

    const raw = await fs.readFile(searchIndexPath, "utf8");
    const currentRecords = JSON.parse(raw).map(normalizeRecord);

    const currentById = new Map();
    for (const record of currentRecords) {
        if (!record.objectID) {
            continue;
        }
        currentById.set(record.objectID, record);
    }

    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const existingById = new Map();
    await index.browseObjects({
        query: "",
        attributesToRetrieve: [
            "objectID",
            "hierarchy",
            "content",
            "urlDepth",
            "position",
            "dateModified",
            "datePublished",
            "keywords",
            "lang",
            "url",
            "origin",
            "pathname",
            "title",
            "description",
            "image",
            "type",
            "hierarchicalCategories",
            "contentLength",
            "category",
        ],
        batch(hits) {
            for (const hit of hits) {
                const normalized = normalizeRecord(hit);
                existingById.set(normalized.objectID, normalized);
            }
        },
    });

    const toSave = [];
    for (const [objectID, current] of currentById.entries()) {
        const existing = existingById.get(objectID);
        if (!existing || !sameRecord(current, existing)) {
            toSave.push(current);
        }
    }

    const toDelete = [];
    for (const objectID of existingById.keys()) {
        if (!currentById.has(objectID)) {
            toDelete.push(objectID);
        }
    }

    for (const saveBatch of chunk(toSave, BATCH_SIZE)) {
        const response = await index.saveObjects(saveBatch);
        await index.waitTask(response.taskID);
    }

    for (const deleteBatch of chunk(toDelete, BATCH_SIZE)) {
        const response = await index.deleteObjects(deleteBatch);
        await index.waitTask(response.taskID);
    }

    console.log(
        `Algolia sync complete. Current: ${currentById.size}, saved: ${toSave.length}, deleted: ${toDelete.length}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
