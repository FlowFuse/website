const nodemon = require('nodemon');
const { existsSync } = require('fs');

const pathToBlueprints = '../blueprint-library';

if (!existsSync(pathToBlueprints)) {
    console.log('Blueprints not found - skipping');
    process.exit(0);
}

nodemon(`-w ${pathToBlueprints} -e md --exec "npm run blueprints"`);

nodemon.on('start', () => {
    console.log('Blueprints change detected - copying files over');
}).on('exit', () => {
    console.log('Blueprint copy complete');
});
