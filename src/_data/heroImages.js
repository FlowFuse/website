const path = require('path');
const fs = require('fs');
const config = require('../images/home/hero/config.json');

module.exports = () => config
    .filter(({ file }) => fs.existsSync(path.join(__dirname, '../images/home/hero', file)))
    .map(({ file, alt, mobileOverlay }) => ({
        src: `./images/home/hero/${file}`,
        alt,
        mobileOverlay: !!mobileOverlay
    }));
