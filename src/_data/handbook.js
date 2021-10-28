const fs = require('fs').promises;

async function readdir(base) {
    const result = [];
    const files = await fs.readdir(base, {withFileTypes: true});
    for (const file of files) {
        if (file.isFile() && /.md/.test(file.name) && !/index.md/.test(file.name)) {
            result.push({name: file.name.replace(".md","")})
        } else if (file.isDirectory()) {
            result.push({name: file.name, children: await readdir(`${base}/${file.name}`)})
        }
    }
    return result;
}

module.exports = async function () {
    try {
        const data = await readdir(__dirname+"/../handbook")
        return data;
    } catch(err) {
        console.log("Error generating handbook toc:",err)
        return []
    }
};
