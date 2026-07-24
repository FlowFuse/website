import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { execSync } from 'node:child_process'
import { mkdirSync, cpSync, writeFileSync, readFileSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { join, basename, relative, dirname } from 'node:path'
import { tmpdir } from 'node:os'

const logger = useLogger('docs-source')

const GROUP_ORDER = [
    'FlowFuse User Manuals',
    'Device Agent',
    'FlowFuse Cloud',
    'FlowFuse Self-Hosted',
    'Support',
    'Contributing',
]

function processMarkdown(content: string, originalPath: string, updated: string, version: string): string {
    const injected = `originalPath: ${originalPath}\nupdated: ${updated}\nversion: ${version}\n`

    if (/^---/.test(content)) {
        content = content.replace(/^---\n/, `---\n${injected}`)
    } else {
        content = `---\n${injected}---\n${content}`
    }

    // Remove Nunjucks-specific frontmatter field
    content = content.replace(/^templateEngineOverride:[^\n]*\n/m, '')

    // Convert callout shortcodes to HTML divs
    content = content
        .replace(/\{%-?\s*note\s*-?%\}([\s\S]*?)\{%-?\s*endnote\s*-?%\}/g,
            (_, body) => `<div class="ff-callout ff-callout--note"><p class="ff-callout__title">Note</p><div class="ff-callout__content">\n\n${body.trim()}\n\n</div></div>`)
        .replace(/\{%-?\s*warning\s*-?%\}([\s\S]*?)\{%-?\s*endwarning\s*-?%\}/g,
            (_, body) => `<div class="ff-callout ff-callout--warning"><p class="ff-callout__title">Warning</p><div class="ff-callout__content">\n\n${body.trim()}\n\n</div></div>`)
        .replace(/\{%-?\s*critical\s*-?%\}([\s\S]*?)\{%-?\s*endcritical\s*-?%\}/g,
            (_, body) => `<div class="ff-callout ff-callout--critical"><p class="ff-callout__title">Critical</p><div class="ff-callout__content">\n\n${body.trim()}\n\n</div></div>`)
        // Strip remaining Nunjucks tags (set, include, if, for, etc.)
        .replace(/\{%[^%]*%\}\n?/g, '')

    return content
}

function copyDocsDir(
    srcDir: string,
    repoRoot: string,
    contentDir: string,
    publicDir: string,
    version: string,
) {
    mkdirSync(contentDir, { recursive: true })
    mkdirSync(publicDir, { recursive: true })

    for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue

        const srcPath = join(srcDir, entry.name)
        const destName = entry.name === 'README.md' ? 'index.md' : entry.name

        if (entry.isDirectory()) {
            copyDocsDir(srcPath, repoRoot, join(contentDir, entry.name), join(publicDir, entry.name), version)
        } else if (entry.name.endsWith('.md')) {
            const relFromRepo = relative(repoRoot, srcPath)
            const docsRoot = join(repoRoot, 'docs')
            const originalPath = relative(docsRoot, srcPath)

            let updated = ''
            try {
                updated = execSync(`git log -1 --pretty=format:%ci -- "${relFromRepo}"`, {
                    cwd: repoRoot, encoding: 'utf8',
                }).trim()
            } catch { /* not fatal */ }

            const raw = readFileSync(srcPath, 'utf8')
            const processed = processMarkdown(raw, originalPath, updated, version)
            writeFileSync(join(contentDir, destName), processed, 'utf8')
        } else {
            cpSync(srcPath, join(publicDir, entry.name))
        }
    }
}

function collectRoutes(dir: string, basePath: string): string[] {
    const routes: string[] = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        if (entry.isDirectory()) {
            routes.push(...collectRoutes(join(dir, entry.name), `${basePath}/${entry.name}`))
        } else if (entry.name.endsWith('.md')) {
            const slug = basename(entry.name, '.md')
            routes.push(slug === 'index' ? `${basePath}/` : `${basePath}/${slug}/`)
        }
    }
    return routes
}

export default defineNuxtModule({
    meta: { name: 'docs-source' },
    async setup(_options, nuxt) {
        const nuxtRoot = nuxt.options.rootDir
        const contentDocsDir = join(nuxtRoot, 'content', 'docs')
        const publicDocsDir = join(nuxtRoot, 'public', 'docs')

        const localPath = process.env.FLOWFUSE_DOCS_LOCAL

        if (localPath) {
            logger.info(`Using local docs from ${localPath}`)
            const docsDir = localPath.endsWith('/docs') ? localPath : join(localPath, 'docs')
            if (!existsSync(docsDir)) {
                logger.warn(`FLOWFUSE_DOCS_LOCAL path not found: ${docsDir}`)
            } else {
                let version = ''
                try {
                    const pkg = JSON.parse(readFileSync(join(dirname(docsDir), 'package.json'), 'utf8'))
                    version = pkg.version || ''
                } catch { /* ignore */ }
                if (existsSync(contentDocsDir)) rmSync(contentDocsDir, { recursive: true, force: true })
                if (existsSync(publicDocsDir)) rmSync(publicDocsDir, { recursive: true, force: true })
                copyDocsDir(docsDir, dirname(docsDir), contentDocsDir, publicDocsDir, version)
                logger.success('Local docs copied')
            }
        } else if (existsSync(contentDocsDir)) {
            logger.info('Using existing content/docs (set FLOWFUSE_DOCS_LOCAL to refresh)')
        } else {
            logger.info('Cloning FlowFuse docs...')
            const tmpDir = join(tmpdir(), `flowfuse-docs-${Date.now()}`)
            try {
                const repoUrl = 'https://github.com/FlowFuse/flowfuse.git'
                execSync(`git clone --filter=blob:none --no-checkout --depth=1 ${repoUrl} "${tmpDir}"`, { stdio: 'pipe' })
                execSync('git sparse-checkout set docs', { cwd: tmpDir, stdio: 'pipe' })
                execSync('git checkout', { cwd: tmpDir, stdio: 'pipe' })

                const pkg = JSON.parse(readFileSync(join(tmpDir, 'package.json'), 'utf8'))
                const version: string = pkg.version || ''

                if (existsSync(contentDocsDir)) rmSync(contentDocsDir, { recursive: true, force: true })
                if (existsSync(publicDocsDir)) rmSync(publicDocsDir, { recursive: true, force: true })
                copyDocsDir(join(tmpDir, 'docs'), tmpDir, contentDocsDir, publicDocsDir, version)
                logger.success(`Docs cloned (version ${version})`)
            } finally {
                if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })
            }
        }

        if (!existsSync(contentDocsDir)) return

        const docsRoutes = collectRoutes(contentDocsDir, '/docs')
        nuxt.options.nitro.prerender ??= {}
        const existing = (nuxt.options.nitro.prerender.routes as string[] | undefined) ?? []
        nuxt.options.nitro.prerender.routes = [...existing, ...docsRoutes]
        logger.info(`Added ${docsRoutes.length} docs routes for prerendering`)
    },
})
