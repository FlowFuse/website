function decodeEntities(text = "") {
    return text
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&#39;/gi, "'")
        .replace(/&quot;/gi, "\"")
        .replace(/&#(\d+);/g, (_match, num) => String.fromCharCode(Number(num)))
        .replace(/&#x([0-9a-f]+);/gi, (_match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function stripHtmlToText(html = "") {
    return decodeEntities(
        html
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
    ).trim();
}

function getCategoryFromUrl(url = "") {
    const parts = url.split("/").filter(Boolean);
    return parts[0] || "";
}

const ALLOWED_ROOT_SCOPES = new Set([
    "blog",
    "changelog",
    "customer-stories",
    "docs",
    "ebooks",
    "handbook",
    "node-red",
    "webinars",
]);

function isAllowedScope(url = "") {
    const root = getCategoryFromUrl(url);
    return ALLOWED_ROOT_SCOPES.has(root);
}

function isPaginationUrl(url = "") {
    return (
        /^\/blog\/\d+\/$/.test(url) ||
        /^\/blog\/[^/]+\/\d+\/$/.test(url) ||
        /^\/blog\/page\/\d+\/$/.test(url) ||
        /^\/changelog\/\d+\/$/.test(url) ||
        /^\/changelog\/page\/\d+\/$/.test(url)
    );
}

function isCatalogPage(url = "") {
    return (
        url === "/blog/" ||
        url === "/changelog/" ||
        url === "/customer-stories/" ||
        url === "/webinars/" ||
        url === "/webinar/"
    );
}

function isExcludedUrl(url = "") {
    return (
        url === "/404.html" ||
        url === "/404/" ||
        isCatalogPage(url) ||
        isPaginationUrl(url)
    );
}

function isSearchPage(item) {
    const url = item?.url || "";
    if (!url || !item?.outputPath) {
        return false;
    }
    if (!item.outputPath.endsWith(".html")) {
        return false;
    }
    if (item?.data?.excludeFromSearch === true) {
        return false;
    }
    if (isExcludedUrl(url)) {
        return false;
    }
    return true;
}

function isSearchUrl(url = "") {
    if (!url) {
        return false;
    }
    if (!isAllowedScope(url)) {
        return false;
    }
    if (isExcludedUrl(url)) {
        return false;
    }
    return true;
}

function getHeadingId(attributes = "") {
    const quoted = attributes.match(/\sid=(["'])(.*?)\1/i);
    if (quoted?.[2]) {
        return quoted[2].trim();
    }
    const unquoted = attributes.match(/\sid=([^\s>]+)/i);
    if (unquoted?.[1]) {
        return unquoted[1].trim();
    }
    return "";
}

function slugify(text = "") {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function makeUniqueId(candidate, usedIds) {
    let id = candidate || "section";
    let suffix = 2;
    while (usedIds.has(id)) {
        id = `${candidate || "section"}-${suffix}`;
        suffix += 1;
    }
    usedIds.add(id);
    return id;
}

function extractHeadingRecords({
    url,
    html,
    category = "",
    pageTitle = "",
    pageDescription = "",
    pageImage = "",
    origin = "",
    lang = "en",
    keywords = [],
    datePublished = null,
    dateModified = null,
}) {
    if (!html || !url) {
        return [];
    }

    const headingRegex = /<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(html)) !== null) {
        const level = match[1].toLowerCase();
        const attrs = match[2] || "";
        const innerHtml = match[3] || "";
        const headingText = stripHtmlToText(innerHtml);
        if (!headingText) {
            continue;
        }
        headings.push({
            level,
            attrs,
            headingText,
            start: match.index,
            end: match.index + match[0].length,
        });
    }

    if (headings.length === 0) {
        return [];
    }

    const firstH1 = headings.find((h) => h.level === "h1");
    const lvl0Base = firstH1?.headingText || pageTitle || "";
    const records = [];
    const usedIds = new Set();
    let context = {
        lvl0: lvl0Base,
        lvl1: null,
        lvl2: null,
        lvl3: null,
        lvl4: null,
        lvl5: null,
        lvl6: null,
    };

    const pathname = url;
    const urlDepth = pathname.split("/").filter(Boolean).length;
    const safeDescription = pageDescription || "";
    const safeImage = pageImage || "";
    const safeTitle = pageTitle || lvl0Base || "";
    const safeKeywords = Array.isArray(keywords) ? keywords : [];
    const safeOrigin = origin || "";
    const safeCategory = category || getCategoryFromUrl(pathname);

    let position = 0;
    for (let i = 0; i < headings.length; i += 1) {
        const heading = headings[i];
        const nextHeading = headings[i + 1];
        const sectionHtml = html.slice(heading.end, nextHeading ? nextHeading.start : html.length);
        const content = stripHtmlToText(sectionHtml);
        const explicitId = getHeadingId(heading.attrs);
        const isFirstH1 = i === 0 && heading.level === "h1";
        const rawId = explicitId || slugify(heading.headingText) || String(i);
        const sectionId = makeUniqueId(rawId, usedIds);

        const headingLevel = Number(heading.level.substring(1));
        const targetLvl = `lvl${Math.max(0, headingLevel - 1)}`;
        context[targetLvl] = heading.headingText;
        for (let j = headingLevel; j <= 6; j += 1) {
            context[`lvl${j}`] = null;
        }

        const hierarchy = {
            lvl0: context.lvl0 || lvl0Base || null,
            lvl1: context.lvl1,
            lvl2: context.lvl2,
            lvl3: context.lvl3,
            lvl4: context.lvl4,
            lvl5: context.lvl5,
            lvl6: context.lvl6,
        };

        const compactHierarchy = Object.values(hierarchy).filter(Boolean);
        const hierarchicalCategories = {};
        for (let k = 0; k < compactHierarchy.length; k += 1) {
            hierarchicalCategories[`lvl${k}`] = compactHierarchy.slice(0, k + 1).join(" > ");
        }

        let type = "content";
        for (let l = 6; l >= 0; l -= 1) {
            if (hierarchy[`lvl${l}`]) {
                type = `lvl${l}`;
                break;
            }
        }

        const isSyntheticH1 = heading.level === "h1" && !explicitId;
        const shouldCreateRecord = Boolean(explicitId) || (!isSyntheticH1) || isFirstH1;
        if (!shouldCreateRecord) {
            continue;
        }

        records.push({
            objectID: `${pathname}#${position}`,
            hierarchy,
            content,
            urlDepth,
            position,
            dateModified,
            datePublished,
            keywords: safeKeywords,
            lang,
            url: explicitId ? `${pathname}#${sectionId}` : pathname,
            origin: safeOrigin,
            pathname,
            title: safeTitle,
            description: safeDescription,
            image: safeImage,
            type,
            hierarchicalCategories,
            contentLength: content.length,
            category: safeCategory,
        });
        position += 1;
    }

    return records;
}

module.exports = {
    isSearchPage,
    isSearchUrl,
    extractHeadingRecords,
};
