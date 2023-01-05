const fs = require('fs/promises');

(async () => {
    try {
        await fs.access(process.argv[2])
        // console.log(`${process.argv[2]} exists`)
        process.exit(0)
    } catch (err) {
        // console.log('not found')
        process.exit(-1)
    }
})()