const nodemon = require('nodemon');
const { existsSync } = require('fs')

// Docs could be in `../flowforge/docs` or `../flowfuse/docs` depending on 
// when everything was cloned.

let pathToDocs = '../flowfuse/docs'
if (!existsSync(pathToDocs)) {
    pathToDocs = '../flowforge/docs'
    if (!existsSync(pathToDocs)) {
        console.log('Docs not found - skipping')
        process.exit(0)
    }
}

nodemon(`-w ${pathToDocs} -e md --exec "npm run docs"`)

nodemon.on('start', () => {
    console.log('Docs change detected - copying files over')
}).on('exit', () => {
    console.log('Doc copy complete')
})
