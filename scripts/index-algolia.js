#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const algoliasearch = require("algoliasearch");

const BATCH_SIZE = 1000;
const MAX_RECORD_BYTES = 9800;

function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

function normalizeRecord(record) {
    const normalized = {
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

    // Algolia hard-limits record size to 10KB. Keep a small safety margin.
    return shrinkRecordToByteLimit(normalized, MAX_RECORD_BYTES);
}

function sameRecord(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function recordBytes(record) {
    return Buffer.byteLength(JSON.stringify(record), "utf8");
}

function trimToLength(value, targetLength) {
    if (typeof value !== "string") {
        return "";
    }
    if (targetLength <= 0) {
        return "";
    }
    if (value.length <= targetLength) {
        return value;
    }
    return value.slice(0, targetLength);
}

function shrinkRecordToByteLimit(record, maxBytes) {
    if (recordBytes(record) <= maxBytes) {
        return record;
    }

    const candidate = { ...record };

    // First and most impactful: trim content.
    if (candidate.content) {
        let low = 0;
        let high = candidate.content.length;
        while (low < high) {
            const mid = Math.floor((low + high + 1) / 2);
            candidate.content = trimToLength(record.content, mid);
            candidate.contentLength = candidate.content.length;
            if (recordBytes(candidate) <= maxBytes) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        candidate.content = trimToLength(record.content, low);
        candidate.contentLength = candidate.content.length;
    }

    if (recordBytes(candidate) <= maxBytes) {
        return candidate;
    }

    // Fallback: trim description if still over limit.
    if (candidate.description) {
        let low = 0;
        let high = candidate.description.length;
        while (low < high) {
            const mid = Math.floor((low + high + 1) / 2);
            candidate.description = trimToLength(record.description, mid);
            if (recordBytes(candidate) <= maxBytes) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        candidate.description = trimToLength(record.description, low);
    }

    return candidate;
}

function getTaskIDs(response) {
    if (!response) {
        return [];
    }
    if (Array.isArray(response.taskIDs)) {
        return response.taskIDs.filter((taskID) => taskID !== undefined && taskID !== null);
    }
    if (response.taskID !== undefined && response.taskID !== null) {
        return [response.taskID];
    }
    return [];
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
        for (const taskID of getTaskIDs(response)) {
            await index.waitTask(taskID);
        }
    }

    for (const deleteBatch of chunk(toDelete, BATCH_SIZE)) {
        const response = await index.deleteObjects(deleteBatch);
        for (const taskID of getTaskIDs(response)) {
            await index.waitTask(taskID);
        }
    }

    console.log(
        `Algolia sync complete. Current: ${currentById.size}, saved: ${toSave.length}, deleted: ${toDelete.length}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
