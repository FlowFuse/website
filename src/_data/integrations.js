const EleventyFetch = require("@11ty/eleventy-fetch");
const certifiedNodes = require("./certifiedNodes");

module.exports = async () => {
    console.log("Loading Integrations...");
    const api = "https://ff-integrations.flowfuse.cloud/api/nodes";

    const response = await EleventyFetch(api, {
        duration: "4h",
        type: "json"
    });

    // Get certified nodes first
    const nodes = await certifiedNodes();
    const ffNodesMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {});

    // Sort by weekly downloads and get all nodes
    const topNodes = response.catalogue
        .sort((a, b) => b.downloads.week - a.downloads.week);

    // Create a map of top nodes by ID for quick lookup
    const topNodesMap = topNodes.reduce((acc, node) => {
        acc[node._id] = node;
        return acc;
    }, {});

    // Merge: ensure all certified nodes are included
    // Add any certified nodes that aren't in the top 1000
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
                        duration: "4h", // Cache for 4 hours to prevent memory exhaustion during dev
                        type: "json"
                    }
                );

                // Extract additional metadata
                node.author = nodeDetails.author;
                node.maintainers = nodeDetails.maintainers || [];
                node.homepage = nodeDetails.homepage;
                node.bugs = nodeDetails.bugs;
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
                                duration: "1d", // Cache for 1 day
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
                                                duration: "1d",
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
                    // List of valid Prism.js languages (common ones)
                    const validLanguages = new Set([
                        'markup', 'html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss',
                        'css', 'clike', 'javascript', 'js', 'abap', 'abnf', 'actionscript',
                        'ada', 'agda', 'al', 'antlr4', 'g4', 'apacheconf', 'apex', 'apl',
                        'applescript', 'aql', 'arduino', 'arff', 'asciidoc', 'adoc', 'aspnet',
                        'asm6502', 'autohotkey', 'autoit', 'bash', 'shell', 'basic', 'batch',
                        'bbcode', 'birb', 'bison', 'bnf', 'rbnf', 'brainfuck', 'brightscript',
                        'bro', 'bsl', 'oscript', 'c', 'csharp', 'cs', 'dotnet', 'cpp', 'cfscript',
                        'cfc', 'chaiscript', 'cil', 'clojure', 'cmake', 'cobol', 'coffeescript',
                        'coffee', 'concurnas', 'conc', 'csp', 'coq', 'crystal', 'css-extras',
                        'd', 'dart', 'dataweave', 'dax', 'dhall', 'diff', 'django', 'jinja2',
                        'dns-zone-file', 'dns-zone', 'docker', 'dockerfile', 'dot', 'gv',
                        'ebnf', 'editorconfig', 'eiffel', 'ejs', 'elixir', 'elm', 'etlua',
                        'erb', 'erlang', 'excel-formula', 'xlsx', 'xls', 'fsharp', 'factor',
                        'false', 'firestore-security-rules', 'flow', 'fortran', 'ftl', 'gml',
                        'gamemakerlanguage', 'gcode', 'gdscript', 'gedcom', 'gherkin', 'git',
                        'glsl', 'go', 'graphql', 'groovy', 'haml', 'handlebars', 'hbs', 'haskell',
                        'hs', 'haxe', 'hcl', 'hlsl', 'http', 'hpkp', 'hsts', 'ichigojam',
                        'icon', 'icu-message-format', 'idris', 'idr', 'ignore', 'gitignore',
                        'hgignore', 'npmignore', 'inform7', 'ini', 'io', 'j', 'java', 'javadoc',
                        'javadoclike', 'javastacktrace', 'jexl', 'jolie', 'jq', 'jsdoc', 'js-extras',
                        'json', 'webmanifest', 'json5', 'jsonp', 'jsstacktrace', 'js-templates',
                        'julia', 'keyman', 'kotlin', 'kt', 'kts', 'kumir', 'kum', 'latex', 'tex',
                        'context', 'latte', 'less', 'lilypond', 'ly', 'liquid', 'lisp', 'emacs',
                        'elisp', 'emacs-lisp', 'livescript', 'llvm', 'log', 'lolcode', 'lua',
                        'makefile', 'markdown', 'md', 'markup-templating', 'matlab', 'mel',
                        'mizar', 'mongodb', 'monkey', 'moonscript', 'moon', 'n1ql', 'n4js', 'n4jsd',
                        'nand2tetris-hdl', 'naniscript', 'nani', 'nasm', 'neon', 'nevod', 'nginx',
                        'nim', 'nix', 'nsis', 'objectivec', 'objc', 'ocaml', 'opencl', 'openqasm',
                        'qasm', 'oz', 'parigp', 'parser', 'pascal', 'objectpascal', 'pascaligo',
                        'psl', 'pcaxis', 'px', 'peoplecode', 'pcode', 'perl', 'php', 'phpdoc',
                        'php-extras', 'plsql', 'powerquery', 'pq', 'mscript', 'powershell',
                        'processing', 'prolog', 'promql', 'properties', 'protobuf', 'pug',
                        'puppet', 'pure', 'purebasic', 'pbfasm', 'purescript', 'purs', 'python',
                        'py', 'q', 'qml', 'qore', 'r', 'racket', 'rkt', 'jsx', 'tsx', 'reason',
                        'regex', 'rego', 'renpy', 'rpy', 'rest', 'rip', 'roboconf', 'robotframework',
                        'robot', 'ruby', 'rb', 'rust', 'sas', 'sass', 'scss', 'scala', 'scheme',
                        'shell-session', 'sh-session', 'shellsession', 'smali', 'smalltalk',
                        'smarty', 'sml', 'smlnj', 'solidity', 'sol', 'solution-file', 'sln',
                        'soy', 'sparql', 'rq', 'splunk-spl', 'sqf', 'sql', 'squirrel', 'stan',
                        'iecst', 'stylus', 'swift', 'systemd', 't4-templating', 't4-cs', 't4',
                        't4-vb', 'tap', 'tcl', 'tt2', 'textile', 'toml', 'tremor', 'trickle',
                        'troy', 'turtle', 'trig', 'twig', 'typescript', 'ts', 'typoscript',
                        'tsconfig', 'unrealscript', 'uscript', 'uc', 'uri', 'url', 'v', 'vala',
                        'vbnet', 'velocity', 'verilog', 'vhdl', 'vim', 'visual-basic', 'vb',
                        'vba', 'warpscript', 'wasm', 'wiki', 'xeora', 'xeoracube', 'xml-doc',
                        'xojo', 'xquery', 'yaml', 'yml', 'yang', 'zig'
                    ]);

                    // Normalize code block languages
                    // First, replace any code block with invalid or unrecognized language
                    node.readme = nodeDetails.readme
                        .replace(/```(\w+)/g, (match, lang) => {
                            const lowerLang = lang.toLowerCase();
                            
                            // Map common aliases and invalid languages to valid ones
                            const languageMap = {
                                'jsonl': 'json',
                                'jsonata': 'json',
                                'vue': 'javascript',
                                'console': 'bash',
                                'cd': 'bash',
                                'terminal': 'bash',
                                'cmd': 'bash',
                                'sh': 'bash'
                            };
                            
                            // Check if it's a mapped language
                            if (languageMap[lowerLang]) {
                                return '```' + languageMap[lowerLang];
                            }
                            
                            // Check if it's a valid Prism language
                            if (validLanguages.has(lowerLang)) {
                                return '```' + lowerLang;
                            }
                            
                            // Use no language identifier for invalid ones (renders as plain text)
                            return '```';
                        })
                        // Fix relative image paths to use GitHub raw content - markdown style
                        .replace(
                            /!\[(.*?)\]\((?!https?:\/\/)(\.\.\/|\.\/)?([^)]+)\)/g,
                            (match, alt, prefix, path) => {
                                // If we have GitHub info, construct the raw GitHub URL
                                if (node.githubOwner && node.githubRepo) {
                                    // Clean up the path - remove leading ./ or ../
                                    const cleanPath = path.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
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
                            /<img([^>]*?)src=["']((?!https?:\/\/)(\.\.\/|\.\/)?[^"']+)["']([^>]*?)>/gi,
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
                // Mark node as failed so we can skip it during page generation
                node.loadFailed = true;
            }

            return node;
        })
    ).then((nodes) =>
        nodes
            // Filter out nodes that failed to load (404 errors, etc.)
            .filter(node => !node.loadFailed)
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