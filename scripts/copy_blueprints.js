const fs = require('fs/promises');
const { existsSync, readdirSync } = require('fs');

const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function copyFiles(src, dest) {
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const file of files) {
        if (!file.name.startsWith('.')) {
            if (file.isDirectory()) {
                const newSrc = path.join(src, file.name);
                const newDest = path.join(dest, file.name);
                await fs.mkdir(newDest, { recursive: true });
                await copyFiles(newSrc, newDest);
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
                        `updated: ${stdout}\n` +
                        '---\n';
                    let content = await fs.readFile(srcFile, 'utf-8');
                    let body = header + content;
                    if (/^---/.test(content)) {
                        // The original file starts with yaml front-matter, so
                        // remove the double-delimter we've just introduced
                        body = body.replace(/---\r?\n---\r?\n/s, '');
                    }
                
                    // Use a regular expression to find the "image" key in the front matter
                    // that is not commented out and has a non-space value
                    const imageRegex = /^image:\s*(\S.+)$/m;

                    // If the "image" key is found, replace its value with the new relative path
                    if (imageRegex.test(body)) {
                        body = body.replace(imageRegex, (match, p1) => {
                            // Remove "./ and the " from the end
                            p1 = p1.replace(/^"\.\//, '').replace(/"$/, '');
                            return `image: ${path.join(dest.replace('src/', ''), p1)}`;
                        });
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
                const dest = 'src/blueprints';
                await copyFiles(element, path.join(dest, path.basename(element)));
            } catch (error) {
                console.error('Error reading or copying files:', error);
            }
        });

})();
