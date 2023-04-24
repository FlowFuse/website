const path = require("path")
const fs = require("fs")

const eleventyImage = require("@11ty/eleventy-img")

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
        const resolvedRelativePath = path.resolve(path.dirname(workingFilePath), filePath)
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
            },
        }
    }
    
    // Skip slow formats for local development
    if (DEV_MODE) {
        formats = formats.filter((format) => !['avif', 'webp'].includes(format))
    }

    // Generate retina images
    const imgWidths = widths.concat(widths.map((w) => (isNaN(w) ? w : w * 2))) // generate 2x sizes (retina)
    const htmlSizes =
        sizes ||
        widths
            .filter((w) => !isNaN(w))
            .map(
                (width) =>
                    `(min-device-pixel-ratio: 1.25) ${width * 2}px, (min-resolution: 120dpi) ${width * 2}px, ${width}px`
            )

    // Convert image and grab metadata
    const imgPath = resolvedImagePath(imgSrc, currentFilePath, eleventyInputFolderPath)
    const imgOpts = {
        widths: imgWidths, 
        formats,
        outputDir: path.join(eleventyOutputFolderPath, "img"),
        filenameFormat: function (hash, src, width, format, options) {
            const { name } = path.parse(src)
            return `${name}-${hash}-${width}.${format}`
        },
        svgShortCircuit: true,
        ...extraOpts,
    }

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
