const fs = require('fs/promises');
const { watch, existsSync, statSync, readdirSync, rmSync, mkdirSync } = require('fs')
const WATCHMODE = process.argv.includes('--watch')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const watched = {}

async function ensureFlowFuseRepo() {
    const repoPaths = ['../dev-env/packages/flowfuse', '../flowfuse', '../flowforge'];
    
    let ffRepo = repoPaths.find(p => existsSync(path.join(p, 'docs')))
    
    if (!ffRepo) {
        console.log('FlowFuse repository not found locally - cloning...')
        const clonePath = '../flowfuse'
        
        try {
            await exec(`git clone --depth 1 https://github.com/FlowFuse/flowfuse.git ${clonePath}`)
            ffRepo = clonePath
            console.log('Successfully cloned FlowFuse repository')
        } catch (error) {
            console.error('Failed to clone FlowFuse repository:', error.message)
            process.exit(-1)
        }
    }
    
    return ffRepo
}

async function copyFile(src, dest, filename, version) {
    const srcFile = path.join(src, filename)
    const destFile = path.join(dest, filename.replace(/README/,"index"))
    if (!filename.endsWith('.md')) {
        await fs.copyFile(srcFile, destFile)
    } else {
        const { stdout } = await exec(`git log -1 --pretty=format:%ci ${filename}`, {
            cwd: src 
        })
        const header = '---\n' +
            `originalPath: ${path.join(src, filename).replace(/^..\/(flowforge|flowfuse)\/docs\//,'')}\n` +
            `updated: ${stdout}\n` +
            `version: ${version}\n` +
            '---\n'
        const content = await fs.readFile(srcFile, 'utf-8')
        let body = header + content
        if (/^---/.test(content)) {
            // The original file starts with yaml front-matter, so
            // remove the double-delimter we've just introduced
            body = body.replace(/---\r?\n---\r?\n/s, '')
        }
        await fs.writeFile(destFile, body)
    }
}

async function copyFiles (src, dest, version) {
    const files = await fs.readdir(src, {withFileTypes: true})
    for (const file of files) {
        if (!file.name.startsWith('.')) {
            if (file.isDirectory()) {
                const newSrc = path.join(src,file.name)
                const newDest = path.join(dest, file.name)
                await fs.mkdir(newDest, {recursive: true})
                await copyFiles(newSrc, newDest, version)
            } else {
                await copyFile(src, dest, file.name, version)
            }
        }
    }
}

(async () => {
    // Check we are in the root of the website repo
    if (!existsSync('src')) {
        console.log('Run this from the top of the website repository')
        process.exit(-1)
    }

    const ffRepo = await ensureFlowFuseRepo()

    const docsDir = path.join(ffRepo, 'docs')
    if (!existsSync(docsDir)) {
        console.log(`FlowFuse Docs folder not found ${docsDir} - skipping`)
        process.exit(-1)
    }

    const packFile = await fs.readFile(path.join(ffRepo, 'package.json'))
    const version = JSON.parse(packFile).version
    const dest = 'src/docs'
    if (!WATCHMODE) {
        await copyFiles(docsDir, dest, version)
    } else {
        console.log('Running in watch mode - skipping initial copy')
        const watcher = new Watcher(docsDir, (updates) => {
            updates.forEach(filename => {
                const srcFile = path.join(docsDir, filename)
                const destFile = path.join(dest, filename)
                if (!existsSync(srcFile)) {
                    // src deleted
                    console.log('Docs content removed:', destFile)
                    rmSync(destFile, { force: true, recursive: true})
                } else {
                    const stat = statSync(srcFile)
                    if (stat.isDirectory()) {
                        console.log('Docs directory created:', destFile)
                        mkdirSync(destFile)
                    } else {
                        console.log('Docs file updated:', destFile)
                        copyFile(docsDir, dest, filename, version)
                    }
                }
            })
        })
        setInterval(() => {}, 1 << 30);
    }
})()


class Watcher {
    constructor(rootPath, callback) {
        this.watched = {}
        this.callback = callback
        this.rootPath = rootPath
        this.watch(rootPath)
        this.pendingUpdates = new Set()
        this.updateTimeout = null
    }

    queueFileChange(filename) {
        this.pendingUpdates.add(filename)
        clearTimeout(this.updateTimeout)
        this.updateTimeout = setTimeout(() => {
            const updates = Array.from(this.pendingUpdates)
            this.pendingUpdates.clear()
            this.callback(updates)
        }, 300)
    }

    watch(filePath) {
        const stats = statSync(filePath)
        const isDir = stats.isDirectory()
        if (isDir) {
            const files = readdirSync(filePath)
            for (let i = 0, len = files.length; i < len; i++) {
                this.watch(path.join(filePath, files[i]))
            }
            this.watched[filePath] = watch(filePath, (eventType, filename) => {
                if (!filename.startsWith('.')) {
                    const fullPath = path.join(filePath, filename)
                    if (existsSync(fullPath)) {
                        if (!this.watched[fullPath]) {
                            this.watch(fullPath)
                        }
                    }
                    this.queueFileChange(path.relative(this.rootPath, fullPath))
                }
            })
        }
    }
}
