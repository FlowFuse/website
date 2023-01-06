const fs = require('fs/promises');
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function copyFiles (src, dest) {
    const files = await fs.readdir(src, {withFileTypes: true})
    for (const file of files) {
        if (!file.name.startsWith('.')) {   
            if (file.isDirectory()) {
                const newSrc = path.join(src,file.name)
                const newDest = path.join(dest, file.name)
                fs.mkdir(newDest, {recursive: true})
                await copyFiles(newSrc, newDest)
            } else {
                const srcFile = path.join(src, file.name)
                const destFile = path.join(dest, file.name.replace(/README/,"index"))
                if (!file.name.endsWith('.md')) {
                    await fs.copyFile(srcFile, destFile)
                } else {
                    const { stdout } = await exec(`git log -1 --pretty=format:%ci ${file.name}`, {
                        cwd: src 
                    })
                    const header = '---\n' +
                        `originalPath: ${path.join(src, file.name).replace(/^..\/handbook\//,'')}\n` +
                        `updated: ${stdout}\n` +
                        '---\n'
                    const content = await fs.readFile(srcFile, 'utf-8')
                    let body = header + content
                    if (/^---/.test(content)) {
                        // The original file starts with yaml front-matter, so
                        // remove the double-delimter we've just introduced
                        body = body.replace('---\n---\n', '')
                    }
                    await fs.writeFile(destFile, body)
                }
            }
        }
    }
}

(async () => {
    try {
        await fs.access('../handbook')
    } catch (err) {
        console.log('FlowForge Docs not found (../handbook)')
        process.exit(-1)
    }

    try {
        await fs.access('src')
    } catch (err) {
        console.log('Run this from the top of the website repository')
        process.exit(-1)
    }

    const src = '../handbook'
    const dest = 'src/handbook'
    await copyFiles(src, dest)
})()