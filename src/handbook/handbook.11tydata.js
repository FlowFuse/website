const codeowners = require('codeowners');

module.exports = {
    eleventyComputed: {
        maintainer: data => new codeowners().getOwner(data.filePath)
    }
};
