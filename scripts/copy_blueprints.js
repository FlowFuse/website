const fs = require('fs/promises');
const { existsSync, readdirSync } = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function copyFiles(src, dest, version) {
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const file of files) {
        if (!file.name.startsWith('.')) {
            if (file.isDirectory()) {
                const newSrc = path.join(src, file.name);
                const newDest = path.join(dest, file.name);
                await fs.mkdir(newDest, { recursive: true });
                await copyFiles(newSrc, newDest, version);
            } else {
                const srcFile = path.join(src, file.name);
                const destFile = path.join(dest, file.name.replace(/README/, 'index'));
                if (!file.name.endsWith('.md')) {
                    await fs.copyFile(srcFile, destFile);
                } else {
                    const { stdout } = await exec(`git log -1 --pretty=format:%ci ${file.name}`, {
                        cwd: src,
                    });
                    const header = '---\n' +
                        `originalPath: ${path.join(src, file.name).replace(/^.*\/blueprint-library\//, '')}\n` +
                        `updated: ${stdout}\n` +
                        `version: ${version}\n` +
                        '---\n';
                    const content = await fs.readFile(srcFile, 'utf-8');
                    let body = header + content;
                    if (/^---/.test(content)) {
                        // The original file starts with yaml front-matter, so
                        // remove the double-delimter we've just introduced
                        body = body.replace(/---\r?\n---\r?\n/s, '');
                    }
                    await fs.writeFile(destFile, body);
                }
            }
        }
    }
}

(async () => {
    // Check we are in the root of the website repo
    if (!existsSync('src')) {
        console.log('Run this from the top of the website repository');
        process.exit(-1);
    }

    // Go find the blueprint-library folder
    const blueprintsDir = '../blueprint-library'; // Blueprints repository
    if (!existsSync(blueprintsDir)) {
        console.log(`Blueprint library not found ${blueprintsDir} - skipping`);
        process.exit(-1);
    }

      readdirSync(blueprintsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join (blueprintsDir, dirent.name))
        .forEach(element => { 
            console.log(element)})

    const packFile = await fs.readFile('package.json');
    const version = JSON.parse(packFile).version;
    const dest = 'src/blueprints';
    await copyFiles(blueprintsDir, dest, version);
})();
