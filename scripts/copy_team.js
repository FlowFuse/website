#!/usr/bin/env node
// Bundle the team member data (src/_data/team/*.json) into nuxt/team.json for
// the About page's team grid. Sorted by `order` like the legacy dictsortBy.
const fs = require('fs')
const path = require('path')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/_data/team')
const OUT = path.join(REPO, 'nuxt/team.json')

const cleanEmail = (v) => {
    if (!v) return ''
    const m = String(v).match(/mailto:([^)]+)\)/) || String(v).match(/^([^[\]()\s]+@[^[\]()\s]+)$/)
    return m ? m[1] : ''
}

const team = []
for (const name of fs.readdirSync(SRC)) {
    if (!name.endsWith('.json')) continue
    const d = JSON.parse(fs.readFileSync(path.join(SRC, name), 'utf-8'))
    team.push({
        slug: name.replace(/\.json$/, ''),
        order: d.order ?? 999,
        name: d.name || '',
        title: d.title || '',
        headshot: d.headshot || '',
        facts: d.facts || [],
        email: cleanEmail(d.email),
        twitter: d.twitter || '',
        github: d.github || '',
        linkedin: d.linkedin || '',
        blog: d.blog || '',
    })
}
team.sort((a, b) => a.order - b.order)
fs.writeFileSync(OUT, JSON.stringify({ team }, null, 2) + '\n')
console.log(`copy_team: ${team.length} members -> nuxt/team.json`)
