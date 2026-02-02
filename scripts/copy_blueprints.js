const fs = require('fs/promises');
const { existsSync, readdirSync } = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ensureBlueprintLibrary() {
    const blueprintsDir = '../blueprint-library';
    
    if (!existsSync(blueprintsDir)) {
        console.log('Blueprint library not found locally - cloning...');
        
        try {
            await exec(`git clone --depth 1 https://github.com/FlowFuse/blueprint-library.git ${blueprintsDir}`);
            console.log('Successfully cloned blueprint library');
        } catch (error) {
            console.error('Failed to clone blueprint library:', error.message);
            process.exit(-1);
        }
    }
    
    return blueprintsDir;
}

async function copyFiles(src, dest) {
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const file of files) {
        if (!file.name.startsWith('.')) {
            if (file.isDirectory()) {
                const lowerCaseFileName = file.name.toLowerCase();
                const newSrc = path.join(src, file.name);
                const newDest = path.join(dest, lowerCaseFileName);
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
}

(async () => {
    // Check we are in the root of the website repo
    if (!existsSync('src')) {
        console.log('Run this from the top of the website repository');
        process.exit(-1);
    }

    const blueprintsDir = await ensureBlueprintLibrary();

    const directories = readdirSync(blueprintsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
        .map(dirent => path.join(blueprintsDir, dirent.name));

    for (const element of directories) {
        console.log(element);
        try {
            const dest = 'src/blueprints';
            await copyFiles(element, path.join(dest, path.basename(element)));
        } catch (error) {
            console.error('Error reading or copying files:', error);
        }
    }
})();
