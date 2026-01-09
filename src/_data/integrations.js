const EleventyFetch = require("@11ty/eleventy-fetch");
const certifiedNodes = require("./certifiedNodes");

module.exports = async () => {
    console.log("Loading Integrations...");
    const api = "https://ff-integrations.flowfuse.cloud/api/nodes";

    // Use longer cache durations to avoid heavy API calls on every build
    // In development: 1 day cache (can be overridden with ELEVENTY_ENV)
    // In production: 1 week cache for stability
    const isDev = process.env.ELEVENTY_ENV !== "production";
    const catalogueCacheDuration = isDev ? "1d" : "1w";
    const npmCacheDuration = isDev ? "1d" : "1w";
    const githubCacheDuration = isDev ? "3d" : "2w";

    console.log(`Cache durations - Catalogue: ${catalogueCacheDuration}, NPM: ${npmCacheDuration}, GitHub: ${githubCacheDuration}`);

    const response = await EleventyFetch(api, {
        duration: catalogueCacheDuration,
        type: "json"
    });

    // Get certified nodes first
    const nodes = await certifiedNodes();
    const ffNodesMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {});

    // Sort by weekly downloads and get top 50 nodes
    const topNodes = response.catalogue
        .sort((a, b) => b.downloads.week - a.downloads.week)
        .slice(0, 50); // Limit to top 50 downloaded nodes

    // Create a map of top nodes by ID for quick lookup
    const topNodesMap = topNodes.reduce((acc, node) => {
        acc[node._id] = node;
        return acc;
    }, {});

    // Merge: ensure all certified nodes are included
    // Add any certified nodes that aren't in the top 50
    const certifiedNodeIds = Object.keys(ffNodesMap);
    certifiedNodeIds.forEach(certifiedId => {
        if (!topNodesMap[certifiedId]) {
            // Find the certified node in the full catalogue
            const certifiedNode = response.catalogue.find(n => n._id === certifiedId);
            if (certifiedNode) {
                topNodes.push(certifiedNode);
            }
        }
    });

    const data = Promise.all(
        topNodes.map(async (node) => {
            // Mark FlowFuse certified nodes
            if (ffNodesMap[node._id]) {
                node.ffCertified = true;
            }

            // Ensure categories exist
            if (!node.categories) {
                node.categories = [];
            }

            // Ensure unique catalogue-based collection names
            node.categories = node.categories.map(category =>
                category.includes("catalogue")
                    ? category
                    : "catalogue_" + category
            );

            if (!node.categories.includes("catalogue")) {
                node.categories.push("catalogue");
            }

            // Fetch full npm node details (readme, etc.)
            try {
                const nodeDetails = await EleventyFetch(
                    `https://registry.npmjs.org/${node._id}`,
                    {
                        duration: npmCacheDuration,
                        type: "json"
                    }
                );

                // Extract additional metadata
                node.author = nodeDetails.author;
                node.maintainers = nodeDetails.maintainers || [];
                node.homepage = nodeDetails.homepage;
                node.bugs = nodeDetails.bugs;
                node.repository = nodeDetails.repository;
                node.time = nodeDetails.time;
                node.lastUpdated = nodeDetails.time?.modified || nodeDetails.time?.[node.version];
                node.created = nodeDetails.time?.created;
                // Extract license from npm registry
                node.license = nodeDetails.license || nodeDetails.versions?.[node.version]?.license;
                
                // Extract GitHub info if repository is GitHub
                if (nodeDetails.repository?.url) {
                    const repoUrl = nodeDetails.repository.url
                        .replace('git+', '')
                        .replace('.git', '')
                        .replace('git://', 'https://');
                    
                    const githubMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                    if (githubMatch) {
                        node.githubOwner = githubMatch[1];
                        node.githubRepo = githubMatch[2];
                        
                        // Try to fetch examples from GitHub
                        try {
                            const examplesUrl = `https://api.github.com/repos/${node.githubOwner}/${node.githubRepo}/contents/examples`;
                            const examplesResponse = await EleventyFetch(examplesUrl, {
                                duration: githubCacheDuration,
                                type: "json",
                                fetchOptions: {
                                    headers: {
                                        'User-Agent': 'FlowFuse-Website'
                                    }
                                }
                            });
                            
                            // Filter for .json files (Node-RED flows)
                            if (Array.isArray(examplesResponse)) {
                                const exampleFiles = examplesResponse
                                    .filter(file => file.name.endsWith('.json') && file.type === 'file');
                                
                                // Fetch the actual flow content for each example
                                node.examples = await Promise.all(
                                    exampleFiles.map(async (file) => {
                                        try {
                                            // Fetch the raw flow JSON content
                                            const flowContent = await EleventyFetch(file.download_url, {
                                                duration: githubCacheDuration,
                                                type: "text",
                                                fetchOptions: {
                                                    headers: {
                                                        'User-Agent': 'FlowFuse-Website'
                                                    }
                                                }
                                            });
                                            
                                            return {
                                                name: file.name.replace('.json', ''), // Remove .json extension for display
                                                path: file.path,
                                                url: file.html_url,
                                                downloadUrl: file.download_url,
                                                flow: flowContent // Store the actual flow JSON as string
                                            };
                                        } catch (err) {
                                            console.error(`Failed to fetch flow content for ${file.name}:`, err.message);
                                            // Return without flow content if fetch fails
                                            return {
                                                name: file.name.replace('.json', ''),
                                                path: file.path,
                                                url: file.html_url,
                                                downloadUrl: file.download_url
                                            };
                                        }
                                    })
                                );
                            }
                        } catch (err) {
                            // Examples folder doesn't exist or API error - this is fine, just skip
                            node.examples = [];
                        }
                    }
                }

                if (nodeDetails.readme) {
                    // Fix relative image paths to use GitHub raw content
                    node.readme = nodeDetails.readme
                        // Fix relative image paths in markdown style
                        .replace(
                            /!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g,
                            (match, alt, imagePath) => {
                                // If we have GitHub info, construct the raw GitHub URL
                                if (node.githubOwner && node.githubRepo && imagePath) {
                                    // Clean up the path - remove leading ./ or ../
                                    const cleanPath = imagePath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
                                    // Use the default branch (usually main or master)
                                    const rawUrl = `https://raw.githubusercontent.com/${node.githubOwner}/${node.githubRepo}/master/${cleanPath}`;
                                    return `![${alt}](${rawUrl})`;
                                }
                                // If no GitHub info, return the match as-is (will be broken, but at least visible)
                                return match;
                            }
                        )
                        // Fix relative image paths in HTML img tags
                        .replace(
                            /<img([^>]*?)src=["']((?!https?:\/\/)(\.\.\/)?(\.\/)?[^"']+)["']([^>]*?)>/gi,
                            (match, before, src, after) => {
                                // If we have GitHub info, construct the raw GitHub URL
                                if (node.githubOwner && node.githubRepo) {
                                    // Clean up the path - remove leading ./ or ../
                                    const cleanPath = src.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
                                    // Use the default branch (usually main or master)
                                    const rawUrl = `https://raw.githubusercontent.com/${node.githubOwner}/${node.githubRepo}/master/${cleanPath}`;
                                    return `<img${before}src="${rawUrl}"${after}>`;
                                }
                                // If no GitHub info, return the match as-is
                                return match;
                            }
                        );
                } else {
                    node.readme = "";
                }

                console.log(`Loaded readme for ${node._id}`);
            } catch (err) {
                // Only log non-404 errors to avoid cluttering console with missing packages
                if (!err.message || !err.message.includes('404')) {
                    console.error(`Failed to load readme for ${node._id}`, err);
                }
                node.readme = "";
            }

            return node;
        })
    ).then((nodes) =>
        nodes
            .sort((a, b) => {
                // Certified nodes first
                if (a.ffCertified && !b.ffCertified) return -1;
                if (!a.ffCertified && b.ffCertified) return 1;

                // Then by weekly downloads (descending)
                return b.downloads.week - a.downloads.week;
            })
    );

    console.log("Loaded Integrations.");
    return data;
};
