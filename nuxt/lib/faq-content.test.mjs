import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const nuxtDir = fileURLToPath(new URL('..', import.meta.url))

const filesIn = (dir, ext) => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (['.nuxt', '.output', 'node_modules', 'public'].includes(name)) return []
    return statSync(path).isDirectory() ? filesIn(path, ext) : path.endsWith(ext) ? [path] : []
})

const offendingLines = (files, pattern) => files.flatMap(file => readFileSync(file, 'utf8').split('\n')
    .flatMap((line, i) => pattern(line) ? [`${relative(nuxtDir, file)}:${i + 1}`] : []))

test('FAQ structured data gets the answer as plain text', () => {
    const offenders = offendingLines(filesIn(nuxtDir, '.vue'), line => line.includes('defineQuestion(') && !line.includes('faqAnswerText('))
    assert.deepEqual(offenders, [], 'Pass faqAnswerText(item.answer) from lib/faq-answer.mjs to defineQuestion, so the JSON-LD carries no markdown.')
})

test('no page still renders the retired <BlogFaq>', () => {
    const offenders = offendingLines(filesIn(nuxtDir, '.vue'), line => line.includes('<BlogFaq'))
    assert.deepEqual(offenders, [], 'BlogFaq was renamed to Faq. An unknown component renders nothing and the build still passes, so that FAQ would be empty.')
})
