import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import jsYaml from 'js-yaml'

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

const HTML_TAG = /<\/?(a|br|p|ul|ol|li|strong|em|b|i|span|div)\b[^>]*>/i

const faqItems = (value) => {
    if (Array.isArray(value)) return value.flatMap(faqItems)
    if (!value || typeof value !== 'object') return []
    const own = typeof value.question === 'string' && typeof value.answer === 'string' ? [value] : []
    return own.concat(Object.values(value).flatMap(faqItems))
}

test('FAQ answers are markdown, not HTML', () => {
    const content = filesIn(join(nuxtDir, 'content'), '').filter(file => /\.(md|ya?ml)$/.test(file)).flatMap((file) => {
        const source = readFileSync(file, 'utf8')
        const data = file.endsWith('.md') ? source.match(/^---\n([\s\S]*?)\n---/)?.[1] : source
        return faqItems(data ? jsYaml.load(data) : undefined)
            .filter(item => HTML_TAG.test(item.answer))
            .map(item => `${relative(nuxtDir, file)}: ${item.question}`)
    })
    const pages = offendingLines(filesIn(nuxtDir, '.vue'), line => /\banswer:\s*['"`]/.test(line) && HTML_TAG.test(line))
    assert.deepEqual([...content, ...pages], [], 'Faq shows HTML in an answer as literal text. Write links as [label](url), paragraphs as a blank line, and lists as "- item" lines.')
})
