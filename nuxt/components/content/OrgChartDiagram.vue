<template>
  <div ref="mermaidRef" class="mermaid-diagram overflow-x-auto py-4" />
</template>

<script setup>
// TODO: replace with queryCollection('team').order('order', 'ASC').all() once src/_data/team/ is migrated to a Nuxt content collection
const teamModules = import.meta.glob('../../../src/_data/team/*.json', { eager: true, import: 'default' })
const team = Object.values(teamModules).sort((a, b) => a.order - b.order)

const headTitles = new Set(['CTO', 'Engineering Manager', 'VP of Sales', 'Product Marketing Manager', 'Director of Product'])

function nodeId(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '')
}

function buildMermaid() {
    const lines = ['graph TD', '    Board[Board of Directors]']

    for (const m of team) {
        if (!m.reports_to) {
            lines.push(`    ${nodeId(m.name)}["${m.name}<br/>${m.title}"]`)
            lines.push(`    Board --> ${nodeId(m.name)}`)
        }
    }

    for (const m of team) {
        if (m.reports_to) {
            lines.push(`    ${nodeId(m.name)}["${m.name}<br/>${m.title}"]`)
            lines.push(`    ${nodeId(m.reports_to)} --> ${nodeId(m.name)}`)
        }
    }

    lines.push('    classDef executive fill:#EFF6FF,stroke:#60A5FA,stroke-width:2px,rx:6,ry:6')
    lines.push('    classDef head fill:#EEF2FF,stroke:#818CF8,stroke-width:2px,rx:6,ry:6')
    lines.push('    classDef employee fill:#F3F4F6,stroke:#9CA3AF,stroke-width:1px,rx:6,ry:6')
    lines.push('    classDef board fill:#FFEFEA,stroke:#FA9170,stroke-width:2px,rx:6,ry:6')
    lines.push('    class Board board')

    for (const m of team) {
        const id = nodeId(m.name)
        if (!m.reports_to) lines.push(`    class ${id} executive`)
        else if (headTitles.has(m.title)) lines.push(`    class ${id} head`)
        else lines.push(`    class ${id} employee`)
    }

    return lines.join('\n')
}

const mermaidRef = ref(null)

onMounted(async () => {
    if (!mermaidRef.value) return
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
    const id = `mermaid-org-${Math.random().toString(36).slice(2, 7)}`
    try {
        const { svg } = await mermaid.render(id, buildMermaid())
        if (mermaidRef.value) mermaidRef.value.innerHTML = svg
    } catch {
        if (mermaidRef.value) mermaidRef.value.textContent = buildMermaid()
    }
})
</script>
