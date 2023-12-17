const nodemon = require('nodemon');
const fs = require('fs');

const pathToModulesJson = '../certified-nr-nodes/modules.json';

if (!fs.existsSync(pathToModulesJson)) {
    console.log('modules.json not found - skipping');
    process.exit(0);
}

nodemon(`-w ${pathToModulesJson} -e md --exec "npm run certifiedNodes"`); 
// nodemon(`-w ${pathToBlueprints} -e md --exec "npm run blueprints"`);

nodemon.on('start', () => {
    console.log('Started watching modules.json for changes.');
}).on('exit', () => {
    console.log('Stopped watching modules.json for changes.');
});