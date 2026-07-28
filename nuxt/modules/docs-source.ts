import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { execFileSync } from 'node:child_process'
import { mkdirSync, cpSync, writeFileSync, readFileSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { join, basename, relative, dirname } from 'node:path'
import { tmpdir } from 'node:os'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { processMarkdown } from '../lib/docs-markdown.mjs'

const logger = useLogger('docs-source')

const CLONE_ATTEMPTS = 3
const CLONE_BACKOFF_MS = 2000

const GROUP_ORDER = [
    'FlowFuse User Manuals',
    'Device Agent',
    'FlowFuse Cloud',
    'FlowFuse Self-Hosted',
    'Support',
    'Contributing',
]

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Sparse-clone the docs from FlowFuse/flowfuse into a temp dir and return its path.
 *
 * A transient network failure here would otherwise fail the entire production deploy, so
 * each attempt gets a clean temp dir and the network steps are retried with backoff. The
 * caller owns cleanup of the returned dir.
 */
async function cloneDocs(): Promise<string> {
    const repoUrl = 'https://github.com/FlowFuse/flowfuse.git'
    let lastError: unknown

    for (let attempt = 1; attempt <= CLONE_ATTEMPTS; attempt++) {
        const tmpDir = join(tmpdir(), `flowfuse-docs-${process.pid}-${attempt}`)
        if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

        try {
            execFileSync('git', ['clone', '--filter=blob:none', '--no-checkout', '--depth=1', repoUrl, tmpDir], { stdio: 'pipe' })
            execFileSync('git', ['sparse-checkout', 'set', 'docs'], { cwd: tmpDir, stdio: 'pipe' })
            execFileSync('git', ['checkout'], { cwd: tmpDir, stdio: 'pipe' })
            return tmpDir
        } catch (err) {
            lastError = err
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

            if (attempt === CLONE_ATTEMPTS) break

            const wait = CLONE_BACKOFF_MS * attempt
            logger.warn(`Docs clone attempt ${attempt}/${CLONE_ATTEMPTS} failed, retrying in ${wait}ms`)
            await sleep(wait)
        }
    }

    const reason = lastError instanceof Error ? lastError.message : String(lastError)
    throw new Error(`Failed to clone FlowFuse docs from ${repoUrl} after ${CLONE_ATTEMPTS} attempts: ${reason}`)
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
                // Argument array, not a shell string: relFromRepo comes from filenames in the
                // cloned repo, so quoting it into a shell command would be an injection path.
                updated = execFileSync('git', ['log', '-1', '--pretty=format:%ci', '--', relFromRepo], {
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
            const tmpDir = await cloneDocs()
            try {
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
