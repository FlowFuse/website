const path = require("path")
const fs = require("fs")

const eleventyImage = require("@11ty/eleventy-img")

const processedImages = new Set()
const IMAGE_BUILD_PROFILE = process.env.IMAGE_BUILD_PROFILE || "full"

/**
 * Is a particular string a URL
 * @param {string} url
 * @returns boolean
 */
function isURL(url) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

/**
 * Resolve a file path relative to the input path or eleventy root
 * @param {string} filePath File to try and find
 * @param {string} workingFilePath File that is currently being parsed
 * @param {string} inputFolderPath Input folder directory
 * @returns
 */
function resolvedImagePath(filePath, workingFilePath, inputFolderPath) {
    // Skip URLs
    if (isURL(filePath)) {
        return filePath
    }

    // Handle both relative to current file and relative to input folder
    try {
        const resolvedRelativePath = path.resolve(
            path.dirname(workingFilePath),
            filePath
        )
        if (fs.existsSync(resolvedRelativePath)) {
            return resolvedRelativePath
        }

        const resolvedAbsolutePath = path.resolve(inputFolderPath, filePath)
        if (fs.existsSync(resolvedAbsolutePath)) {
            return resolvedAbsolutePath
        }
    } catch {}

    return filePath
}

/**
 * Only copy across file if it is newer than the destination file
 * @param {*} srcPath
 * @param {*} destPath
 * @returns boolean True if file was copiedo
 */
async function copyNewerFile(
    srcPath,
    destPath,
    { verbose, interval } = { verbose: false, interval: 1000 }
) {
    const stat = fs.statSync(srcPath)
    if (!stat.isFile()) {
        // Not a file.
        throw new Error(`Not supported ${srcPath}`)
    }

    const srcMTime = stat.mtime
    let destMTime
    try {
        destMTime = (await fs.statSync(destPath)).mtime
    } catch (err) {
        // path does not exist
    }

    if (destMTime !== undefined && srcMTime - destMTime <= interval) {
        // destPath does not exist or mtime is equal, return.
        if (verbose) {
            console.log(`${srcPath} == ${destPath}`)
        }
        return false
    }

    // Commence copying.
    let rs = fs.createReadStream(srcPath)
    let ws = fs.createWriteStream(destPath)
    rs.pipe(ws)
    await waitForStreamEnd(ws)

    // Set mtime to be equal to the source file.
    fs.utimesSync(destPath, new Date(), stat.mtime)

    if (verbose) {
        console.log(`${srcPath} -> ${destPath}`)
    }
    return true
}

async function waitForStreamEnd(stream) {
    await new Promise((resolve, reject) => {
        stream.on("error", reject)
        stream.on("finish", resolve)
    })
}

/**
 * Converts an image into multiple formats and returns a Picture tag containing those formats]
 * Automatically:
 *  - Generates retina and non-retina size images for use on supported screens
 *  - Converts files to avif and webp
 *  - Converts gifs to webp
 * @param {string} imgSrc Relative path (from folder or input directory) to
 * @param {string} imgAlt Required alt tag describing the image
 * @param {string} imgTitle Title of the image tag
 * @param {array<integer>} widths Array of widths (in px) to resize image to
 * @param {array<string>} sizes Picture tag sizes
 * @param {string} currentFilePath Will search for image relative to this path
 * @param {boolean} async Set false to ryn synchronously
 * @returns {string} HTML Tag
 */
module.exports = function imageHandler(
    imgSrc,
    imgAlt,
    imgTitle = null,
    widths = ["auto"],
    sizes = null,
    currentFilePath = null,
    eleventyConfig = null,
    async = true,
    DEV_MODE = false
) {
    const eleventyInputFolderPath = eleventyConfig.dir.input
    const eleventyOutputFolderPath = eleventyConfig.dir.output

    // Image formats to generate
    // Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
    // Warning: Avif can be resource-intensive so take care!
    let formats = ["avif", "webp", "jpeg"]
    let extraOpts = {}
    if (imgSrc.includes(".gif")) {
        formats = ["webp", "gif"]
        extraOpts = {
            sharpOptions: {
                animated: true,
                limitInputPixels: false
            },
        }
    }

    // Warm profile for first cold builds: fewer variants, faster completion, cache still populated.
    const warmBuild = IMAGE_BUILD_PROFILE === "warm"
    if (warmBuild && !imgSrc.includes(".gif")) {
        formats = ["webp", "jpeg"]
    }

    // Generate retina images in full profile only
    const imgWidths = warmBuild
        ? widths
        : widths.concat(widths.map((w) => (isNaN(w) ? w : w * 2))) // generate 2x sizes (retina)
    const htmlSizes =
        sizes ||
        widths
            .filter((w) => !isNaN(w))
            .map(
                (width) =>
                    `(min-device-pixel-ratio: 1.25) ${width * 2}px, (min-resolution: 120dpi) ${width * 2}px, ${width}px`
            )

    // Skip image parsing if flag is set (@skip in title)
    const parsedTitle = (imgTitle || '').match(
        /^(?<skip>@skip ?)?(?<title>.*)/
    ).groups

    const htmlOpts = {
        ...(parsedTitle.title && { title: parsedTitle.title }), // skip if null
        alt: imgAlt,
        sizes: htmlSizes.join(", "),
        loading: "lazy",
        decoding: "async",
    }

    if (parsedTitle.skip || imgSrc.startsWith('http')) {
        const options = { ...htmlOpts }
        const metadata = { img: [{ url: imgSrc }] }

        return eleventyImage.generateHTML(metadata, options)
    }

    // Options for conversion
    const imgPath = resolvedImagePath(
        imgSrc,
        currentFilePath,
        eleventyInputFolderPath
    )
    const imgOpts = {
        widths: imgWidths,
        formats,
        outputDir: path.join(eleventyOutputFolderPath, "img"),
        cacheOptions: {
            directory: ".cache/images",
        },
        filenameFormat: function (hash, src, width, format, options) {
            const { name } = path.parse(src)
            return `${name}-${hash}-${width}.${format}`
        },
        svgShortCircuit: true,
        ...extraOpts,
    }

    // In dev mode the image pipeline doesn't actually run
    // Instead it generates HTML picture tags are equivalent of how the pipeline would work
    // But containing only one, non-converted, resized or compressed, image
    if (DEV_MODE) {
        // Naive copy of the image to the output folder
        const imgOutputPath = path.join(
            imgOpts.outputDir,
            path.basename(imgPath)
        )
        const imgOutputURL = path.join(
            "/",
            path.relative(eleventyOutputFolderPath, imgOutputPath)
        )

        // Copy image if it hasn't been copied already
        if (!processedImages.has(imgOutputPath)) {
            processedImages.add(imgOutputPath)

            // Copying can all happen async, build doesn't need to wait for it to complete
            new Promise(async (resolve, reject) => {
                if (!fs.existsSync(imgOpts.outputDir)) {
                    fs.mkdirSync(imgOpts.outputDir)
                }

                await copyNewerFile(imgPath, imgOutputPath)

                resolve()
            }).catch((e) => {
                console.warn(`Failed copying ${imgPath} to ${imgOutputPath}`)
            })
        }

        const singleImageMetadata = {
            url: imgOutputURL,
            sourceType: "image/jpeg", // sourceType is not important for us, but it is for eleventyImage
        }

        const htmlMetadata = {
            jpeg: [singleImageMetadata], // tag name must be one of the format understood by eleventyImage
            img: [singleImageMetadata], // tag name is not important, this is faking a second source
        }

        htmlOpts.sizes = "100vw, 100vw" // use any source (all have src as undefined so will use IMG tag only)

        return eleventyImage.generateHTML(htmlMetadata, htmlOpts)
    }

    // In async mode, image is generated, then stats are read and used to generate HTML
    if (async) {
        return eleventyImage(imgPath, imgOpts).then((htmlMetadata) => {
            return eleventyImage.generateHTML(htmlMetadata, htmlOpts)
        })
    }

    // In sync mode, while image is generating in a separate thread, stats are estimated synchronously
    eleventyImage(imgPath, imgOpts)

    let htmlMetadata
    if (isURL(imgSrc)) {
        throw new Error(
            `Currently remote images are not supported as they cannot be loaded synchronously, please copy ${imgPath} to the local file system`
        )
    } else {
        htmlMetadata = eleventyImage.statsSync(imgPath, imgOpts)
    }

    return eleventyImage.generateHTML(htmlMetadata, htmlOpts)
}
