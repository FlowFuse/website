class SearchIndexPage {
    data() {
        return {
            permalink: "/search-index.json",
            eleventyExcludeFromCollections: true,
        };
    }

    render(data) {
        const records = (data.collections.searchIndex || [])
            .map((item) => {
                let htmlContent = "";
                try {
                    htmlContent = item.templateContent || "";
                } catch (error) {
                    htmlContent = item.data?.page?.rawInput || "";
                }

                return {
                    objectID: item.url,
                    title: item.data?.title || "",
                    url: item.url,
                    content: htmlContent
                        .replace(/<script[\s\S]*?<\/script>/gi, " ")
                        .replace(/<style[\s\S]*?<\/style>/gi, " ")
                        .replace(/<[^>]+>/g, " ")
                        .replace(/&nbsp;/gi, " ")
                        .replace(/&amp;/gi, "&")
                        .replace(/&lt;/gi, "<")
                        .replace(/&gt;/gi, ">")
                        .replace(/&#39;/gi, "'")
                        .replace(/&quot;/gi, "\"")
                        .replace(/\s+/g, " ")
                        .trim(),
                    category: item.data?.category || "",
                };
            });

        return JSON.stringify(records, null, 2);
    }
}

module.exports = SearchIndexPage;
