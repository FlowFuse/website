const { readFileSync, readdirSync, access, F_OK, statSync} = require('fs');
const { marked } = require('marked');
const htmlLinkExtractor = require('html-link-extractor');
const url = require("url");
const axios = require('axios');
const path = require('path');

marked.setOptions({
    mangle: false, // don't escape autolinked email address with HTML character references.
});

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RED = '\x1b[31m'
const RESET = '\x1b[0m'

const ignoreFolders = [
    '.github'
]

// URLs we expect to be invalid, and that's okay
const exceptions = [
    'forge.example.com',
    'github.com/FlowFuse/admin',
    'github.com/FlowFuse/docker-compose',
    'github.com/FlowFuse/nodered.snap',
    'github.com/FlowFuse/flowforge-data',
    'github.com/FlowFuse/ctrlx-node-red-example',
    'github.com/FlowFuse/CloudProject',
    'github.com/FlowFuse/content',
    'github.com/FlowFuse/security',
    'github.com/orgs/FlowFuse/projects'
]

const isUrlException = function (link) {
    for (let i = 0; i < exceptions.length; i++) {
        if (link.includes(exceptions[i])) {
            return true
        }
    }
    return false
}

const getAllMdFiles = function(dirPath, arrayOfFiles) {
    files = readdirSync(dirPath)
  
    var arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
        if (!ignoreFolders.includes(file)) {
            if (statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllMdFiles(dirPath + "/" + file, arrayOfFiles)
              } else {
                if (file.endsWith('.md')) {
                    arrayOfFiles.push(path.join(dirPath, "/", file))
                }
              }
        }
      
    })
  
    return arrayOfFiles
}

var linkCount = 0

// track details of any errors found for nicer reporting at the end
var errorRecords = {
    'internal': [],
    'external': []
}

/*
 * Given a file path, read it, and check the validity of any links
*/
async function testLinks (fileUri) {
    // ensure it's a markdown file
    if (!fileUri.endsWith('.md')) {
        throw Error(`${fileUri} is not an .md file`)
    }

    const markdown = readFileSync(fileUri, {encoding: 'utf8'});
    const html = marked(markdown);
    var links = htmlLinkExtractor(html);

    let errors = 0
    let promises = []

    // remove localhost links - they're generally just instructional, not live links
    // remove # anchor links, not sure how to test these at the moment
    // remove email links
    // remove exceptions - links we now are broken
    links = links.filter((link) => {
        const linkData = url.parse(link)
        return linkData.hostname !== 'localhost' && !link.includes('#') && !link.includes('mailto') && !isUrlException(link)
    })

    linkCount += links.length

    console.log(`\n\n\x1b[33m Running Link Tests: ${fileUri}`)

    links.forEach(async (link) => {
        const linkData = url.parse(link)
        if (!linkData.protocol) {
            // internal links - validate via file system
            promises.push(new Promise((resolve, reject) => {
                const localDir = fileUri.substr(0, fileUri.lastIndexOf('/'))
                var uri = ''
                if (link.startsWith('/')) {
                    // absolute path from /src
                    uri = path.join(__dirname, '../src/', link)
                } else {
                    // link defined as relative to fileUri
                    uri = path.join(__dirname, '../', localDir, link)
                }
                access(uri, F_OK, (err) => {
                    if (err) {
                        console.error(`${RED} X Invalid Link: ${link}`)
                        errorRecords['internal'].push({
                            source: fileUri,
                            target: link,
                            uri: uri,
                            reason: 404
                        })
                        errors += 1
                    } else {
                        console.log(`${GREEN} /   Valid Link: ${link}`)
                    }
                    resolve()
                })
            }))
        } else {
            // external link - let's validate using HTTP request
            promises.push(axios.get(link)
                .then(() => {
                    console.log(`${GREEN} /   Valid Link: ${link}`)
                })
                .catch(err => {
                    if (err.response) {
                        const status = err.response.status
                        if ([404, 410].includes(status)) {
                            console.error(`${RED} X Invalid Link: ${err.response.status} ${link}`)
                            errorRecords['external'].push({
                                source: fileUri,
                                target: link,
                                reason: err.response.status
                            })
                            errors += 1
                        }
                    } else {
                        // not an error triggered by the HTTP response
                        console.error(`Error Retrieving: ${link}`)
                        throw Error(err)
                    }
                })
            )
        }
    })

    return Promise.all(promises).then(() => {
        console.log(`\n${YELLOW}------ REPORT ------`)
        console.log(`${YELLOW} TESTED:` + `${links.length}`.padStart(12))
        console.log(`${GREEN}  VALID:` + `${links.length - errors}`.padStart(12))
        console.log(`${RED} ERRORS:` + `${errors}`.padStart(12))
    });
}

async function parseDirectory(dir) {
    let handbook = getAllMdFiles(dir)
    
    for (let i = 0; i < handbook.length; i++) {
        const file = handbook[i]
        await testLinks(file)
    }
}

async function runReport (dir) {
    await parseDirectory(dir)
    const errorCount = errorRecords.internal.length + errorRecords.external.length
    console.log(`\n\n${RED}------ INTERNAL ERRORS ------${RESET}`)
    console.log(errorRecords.internal)
    console.log(`\n${RED}------ EXTERNAL ERRORS ------${RESET}`)
    console.log(errorRecords.external)
    console.log(`\n${YELLOW}------ FINAL REPORT ------`)
    console.log(`${YELLOW} TESTED:` + `${linkCount}`.padStart(20))
    console.log(`${GREEN}  VALID:` + `${linkCount - errorCount}`.padStart(20))
    console.log(`${RED} ERRORS:` + `${errorCount}`.padStart(20))

    if (errorCount > 1) {
        // ensure process fails for reporting in GH Action
        process.exitCode = 1
    }
}

// take file directory as argument
if (!process.argv[2]) {
    throw Error('please pass a directory to search through and test, e.g. node valid-links.js /my-dir/')
} else {
    runReport(process.argv[2])
}

return;