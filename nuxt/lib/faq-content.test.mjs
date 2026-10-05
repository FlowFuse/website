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

// The argument of each defineQuestion(...) call in a file, up to its closing parenthesis.
const defineQuestionCalls = source => [...source.matchAll(/defineQuestion\(/g)].map(({ index }) => {
    let depth = 0
    for (let i = index + 'defineQuestion'.length; i < source.length; i++) {
        if (source[i] === '(') depth++
        else if (source[i] === ')' && --depth === 0) return { index, argument: source.slice(index, i + 1) }
    }
    return { index, argument: source.slice(index) }
})

test('FAQ structured data gets the answer as plain text', () => {
    const offenders = filesIn(nuxtDir, '.vue').flatMap((file) => {
        const source = readFileSync(file, 'utf8')
        return defineQuestionCalls(source)
            .filter(({ argument }) => !/\b(answer|text):\s*faqAnswerText\(/.test(argument))
            .map(({ index }) => `${relative(nuxtDir, file)}:${source.slice(0, index).split('\n').length}`)
    })
    assert.deepEqual(offenders, [], 'Pass faqAnswerText(item.answer) from lib/faq-answer.mjs to defineQuestion, so the JSON-LD carries no markdown.')
})

test('no page still renders the retired <BlogFaq>', () => {
    const offenders = offendingLines(filesIn(nuxtDir, '.vue'), line => line.includes('<BlogFaq'))
    assert.deepEqual(offenders, [], 'BlogFaq was renamed to Faq. An unknown component renders nothing and the build still passes, so that FAQ would be empty.')
})

// Synced in from other repositories at build time, and not rendered by Faq.
const SYNCED = ['content/docs', 'content/blueprints'].map(dir => join(nuxtDir, dir) + '/')

const HTML_TAG = /<\/?(a|br|p|ul|ol|li|strong|em|b|i|span|div)\b[^>]*>/i

const faqItems = (value) => {
    if (Array.isArray(value)) return value.flatMap(faqItems)
    if (!value || typeof value !== 'object') return []
    const own = typeof value.question === 'string' && typeof value.answer === 'string' ? [value] : []
    return own.concat(Object.values(value).flatMap(faqItems))
}

test('FAQ answers are markdown, not HTML', () => {
    const content = filesIn(join(nuxtDir, 'content'), '').filter(file => /\.(md|ya?ml)$/.test(file) && !SYNCED.some(dir => file.startsWith(dir))).flatMap((file) => {
        const source = readFileSync(file, 'utf8')
        const data = file.endsWith('.md') ? source.match(/^---\n([\s\S]*?)\n---/)?.[1] : source
        let parsed
        try {
            parsed = data ? jsYaml.load(data) : undefined
        } catch (error) {
            throw new Error(`${relative(nuxtDir, file)}: ${error.message}`)
        }
        return faqItems(parsed)
            .filter(item => HTML_TAG.test(item.answer))
            .map(item => `${relative(nuxtDir, file)}: ${item.question}`)
    })
    const pages = offendingLines(filesIn(nuxtDir, '.vue'), line => /\banswer:\s*['"`]/.test(line) && HTML_TAG.test(line))
    assert.deepEqual([...content, ...pages], [], 'Faq shows HTML in an answer as literal text. Write links as [label](url), paragraphs as a blank line, and lists as "- item" lines.')
})
