// Serves the customer logo list for the social-proof carousel, mirroring the
// `homeLogos` Eleventy collection (.eleventy.js) — reads straight from
// src/images/home-logos/ so the logo files themselves are never duplicated
// into nuxt/, only this listing of filenames. The images resolve at
// /images/home-logos/* in both dev (proxied to the 11ty dev server) and
// production (11ty's `prod:eleventy-nuxt` copies them into nuxt/public/
// before the Nuxt build runs).
import { readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

// Resolve the monorepo root via git so this works regardless of the cwd
// Nitro runs in — same approach as nuxt/server/lib/handbookChanges.mjs.
function resolveRepoRoot (cwd = process.cwd()) {
    try {
        return execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd }).toString().trim() || cwd
    } catch {
        return cwd
    }
}

function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export default defineEventHandler(() => {
    const logosDir = join(resolveRepoRoot(), 'src/images/home-logos')

    const logos = readdirSync(logosDir)
        .filter(file => file.endsWith('.svg') || file.endsWith('.png'))
        .map(file => `/images/home-logos/${file}`)

    return shuffle(logos)
})
