const fs = require('fs/promises');
const { existsSync, readdirSync } = require('fs');

const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const yaml = require('js-yaml');

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
                    let content = await fs.readFile(srcFile, 'utf-8');
                    let body = header + content;
                    if (/^---/.test(content)) {
                        // The original file starts with yaml front-matter, so
                        // remove the double-delimter we've just introduced
                        body = body.replace(/---\r?\n---\r?\n/s, '');
                    }
                
                    // Find the front matter in the body
                    const frontMatterMatch = body.match(/---\r?\n([\s\S]*?)\r?\n---/);
                    if (frontMatterMatch) {
                        // Parse the front matter as YAML
                        const frontMatter = yaml.safeLoad(frontMatterMatch[1]);
                
                        // If the "image" key exists and its value is not empty, modify its value
                        if (frontMatter.image && frontMatter.image.trim() !== '') {
                            frontMatter.image = `/${path.join(dest.replace('src/', ''), frontMatter.image)}`;
                        }

                        // Write the front matter back as a string and replace the original front matter in the body
                        const frontMatterString = yaml.safeDump(frontMatter, { lineWidth: -1 });
                        body = body.replace(/---\r?\n[\s\S]*?\r?\n---/, `---\n${frontMatterString}---`);
                    }
                
                    await fs.writeFile(destFile, body);
                }
            }
        }
    }
};

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
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
        .map(dirent => path.join (blueprintsDir, dirent.name))
        .forEach(async element => {
            console.log(element);
            try {
                const packFile = await fs.readFile('package.json');
                const version = JSON.parse(packFile).version;
                const dest = 'src/blueprints';
                await copyFiles(element, path.join(dest, path.basename(element)), version);
            } catch (error) {
                console.error('Error reading or copying files:', error);
            }
        });

})();
