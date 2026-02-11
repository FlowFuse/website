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
        title: record.title || "",
        url: record.url || "",
        content: record.content || "",
        category: record.category || "",
    };
}

function sameRecord(a, b) {
    return (
        a.title === b.title &&
        a.url === b.url &&
        a.content === b.content &&
        a.category === b.category
    );
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
        attributesToRetrieve: ["objectID", "title", "url", "content", "category"],
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
