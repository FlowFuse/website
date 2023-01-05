const fs = require('fs/promises');
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function copyFiles (src, dest, version) {
    const files = await fs.readdir(src, {withFileTypes: true})
    for (const file of files) {
        if (!file.name.startsWith('.')) {
            if (file.isDirectory()) {
                const newSrc = path.join(src,file.name)
                const newDest = path.join(dest, file.name)
                fs.mkdir(newDest, {recursive: true})
                await copyFiles(newSrc, newDest, version)
            } else {
                const srcFile = path.join(src, file.name)
                const destFile = path.join(dest, file.name)
                if (!file.name.endsWith('.md')) {
                    await fs.copyFile(srcFile, destFile)
                } else {
                const { stdout } = await exec(`git log -1 --pretty=format:%ci ${file.name}`, {
                    cwd: src 
                })
                const header = '---\n' +
                `originPath: ${path.join(src, file.name)}\n` +
                `updated: ${stdout}\n` +
                `version: ${version}\n` +
                '---\n'
                const content = await fs.readFile(srcFile)
                await fs.writeFile(destFile, header + content)
                }
            }
        }
    }
}

(async () => {
    try {
        await fs.access('../flowforge/docs')
    } catch (err) {
        console.log('FlowForge Docs not found (../flowforge/docs)')
        process.exit(-1)
    }

    try {
        await fs.access('src')
    } catch (err) {
        console.log('Run this from the top of the website repository')
        process.exit(-1)
    }

    const packFile = await fs.readFile('../flowforge/package.json')
    const version = JSON.parse(packFile).version
    const src = '../flowforge/docs'
    const dest = 'src/docs'
    await copyFiles(src, dest, version)
})()