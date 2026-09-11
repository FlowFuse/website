<script setup lang="ts">
// The schematic that fills each capability's media well on /ai.
//
// Shared three-column spine - something goes in, the platform does something to
// it, something comes out - because that is genuinely the shape of every
// capability on the page, and eleven unrelated drawings would undercut the
// section's own argument that these all run on one platform.
//
// What makes them not-flat is per-column iconography: each column carries a glyph
// drawn for its subject (a camera for RTSP ingest, a chip for a model, a shield
// for RBAC). Neutral card for the parts that are yours, accent card for the
// FlowFuse piece. Connectors are static arrows - eleven of these scroll past on
// one page, so nothing here moves.
const props = defineProps<{ kind: string }>()

// Marker ids are document-global and eleven of these render on one page, so each
// instance needs its own or they would collide.
const uid = useId()
const arrowId = computed(() => `aidiag-arrow-${uid}`)

// A wide, short frame: 720x150. The width is deliberate - the well spans its
// column, so the viewBox has to be wide enough that the cards fill that width
// rather than being scaled up to reach it. The earlier 480-wide frame stretched by
// ~1.4x at column width and took its type up with it, which is what made the
// labels look oversized; at 720 the scale factor is roughly 1.
const COLS = [
    { x: 34, w: 180 },
    { x: 270, w: 180 },
    { x: 506, w: 180 },
]
const CARD_Y = 20
const CARD_H = 110
const FLOW_Y = CARD_Y + CARD_H / 2
const GLYPH_Y = CARD_Y + 32
const LABEL_MID = CARD_Y + 78
const LINE_H = 17

// Line glyphs on a 24x24 grid, scaled and centred into each card. Stroke-only, so
// they inherit the card's colour and turn indigo on the accent column for free.
const GLYPHS: Record<string, string[]> = {
    prompt: ['M3 5h18v11H8l-5 4z'],
    answer: ['M3 5h18v11H8l-5 4z', 'M7 9h10', 'M7 12.5h6'],
    expert: ['M10 3l1.5 4.2L15.7 8.7l-4.2 1.5L10 14.4 8.5 10.2 4.3 8.7l4.2-1.5z', 'M17.5 14l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z'],
    flow: ['M3 5.5h5v4H3z', 'M16 14.5h5v4h-5z', 'M8 7.5h3a2 2 0 012 2v5a2 2 0 002 2h1'],
    app: ['M3 4h18v16H3z', 'M3 9h18', 'M9 9v11'],
    blueprint: ['M4 4h16v16H4z', 'M8.5 8.5h7v7h-7z'],
    agent: ['M6.5 8h11v8h-11z', 'M12 4.5V8', 'M9.8 11.8h.01', 'M14.2 11.8h.01'],
    tools: ['M14.5 5.5a4 4 0 105 5l-9.2 9.2-3-3z'],
    docs: ['M6 3h9l4 4v14H6z', 'M15 3v4h4', 'M9 12h7', 'M9 15.5h5'],
    approve: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M8 12l3 3 5-6'],
    machine: ['M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z', 'M12 2.5v3.5', 'M12 18v3.5', 'M2.5 12H6', 'M18 12h3.5', 'M5.2 5.2l2.5 2.5', 'M16.3 16.3l2.5 2.5', 'M18.8 5.2l-2.5 2.5', 'M7.7 16.3l-2.5 2.5'],
    live: ['M3 17l4.5-6.5L12 14l4-8 5 11'],
    camera: ['M3 8h4l2-2h6l2 2h4v12H3z', 'M12 12.5a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z'],
    inspect: ['M4 8.5V4h4.5', 'M15.5 4H20v4.5', 'M20 15.5V20h-4.5', 'M8.5 20H4v-4.5', 'M9 10h6v4H9z'],
    model: ['M6.5 6.5h11v11h-11z', 'M9.5 3v3.5', 'M14.5 3v3.5', 'M9.5 17.5V21', 'M14.5 17.5V21', 'M3 9.5h3.5', 'M3 14.5h3.5', 'M17.5 9.5H21', 'M17.5 14.5H21'],
    key: ['M15 6.5a4 4 0 11-3.8 5.2H8.5l-2.5 2.5v3H3.5v-3l4-4h3.7A4 4 0 0115 6.5z'],
    plug: ['M9 3v6', 'M15 3v6', 'M6 9h12v2.5a6 6 0 01-12 0z', 'M12 17.5V21'],
    shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4.5'],
    platform: ['M3 5h18v5H3z', 'M3 14h18v5H3z', 'M6.5 7.5h.01', 'M6.5 16.5h.01'],
    terminal: ['M3.5 4.5h17v15h-17z', 'M8 9.5l2.5 2.5L8 14.5', 'M12.5 14.5h4'],
}

type Col = { glyph: string, lines: string[], accent?: boolean }
type Spec = { alt: string, cols: [Col, Col, Col] }

const SPECS: Record<string, Spec> = {
    'assisted-engineering': {
        alt: 'Plain language goes to FlowFuse Expert, which produces a working Node-RED flow.',
        cols: [
            { glyph: 'prompt', lines: ['Plain', 'language'] },
            { glyph: 'expert', lines: ['FlowFuse', 'Expert'], accent: true },
            { glyph: 'flow', lines: ['Working', 'flow'] },
        ],
    },
    'prompt-to-app': {
        alt: 'A described application goes to FlowFuse Expert, which builds a draft in your workspace.',
        cols: [
            { glyph: 'prompt', lines: ['Describe', 'the app'] },
            { glyph: 'expert', lines: ['Expert', 'builds it'], accent: true },
            { glyph: 'app', lines: ['Draft in your', 'workspace'] },
        ],
    },
    'build-agents': {
        alt: 'An agent blueprint becomes your own agent, grounded in your data and tools.',
        cols: [
            { glyph: 'blueprint', lines: ['Agent', 'blueprint'] },
            { glyph: 'agent', lines: ['Your', 'agent'], accent: true },
            { glyph: 'tools', lines: ['Your data', 'and tools'] },
        ],
    },
    'product-knowledge': {
        alt: 'Your question is answered from FlowFuse and Node-RED documentation, without leaving the workspace.',
        cols: [
            { glyph: 'prompt', lines: ['Your', 'question'] },
            { glyph: 'docs', lines: ['FlowFuse and', 'Node-RED docs'], accent: true },
            { glyph: 'answer', lines: ['Answer in', 'context'] },
        ],
    },
    'governed-operations': {
        alt: 'AI proposes a change, a person approves it, and only then does it reach the machine.',
        cols: [
            { glyph: 'agent', lines: ['AI', 'proposes'], accent: true },
            { glyph: 'approve', lines: ['A person', 'approves'] },
            { glyph: 'machine', lines: ['Change', 'lands'] },
        ],
    },
    'ask-your-plant': {
        alt: 'A natural language question is answered from live machine state, alarms and logs.',
        cols: [
            { glyph: 'prompt', lines: ['Your', 'question'] },
            { glyph: 'live', lines: ['Live machine', 'state'], accent: true },
            { glyph: 'answer', lines: ['Answer,', 'grounded'] },
        ],
    },
    'visual-inspection': {
        alt: 'A camera feed over RTSP runs through an ONNX model at the edge, producing a pass or fail.',
        cols: [
            { glyph: 'camera', lines: ['Camera', 'over RTSP'] },
            { glyph: 'model', lines: ['ONNX model', 'at the edge'], accent: true },
            { glyph: 'inspect', lines: ['Pass', 'or fail'] },
        ],
    },
    'any-model': {
        alt: 'Your flow calls a certified LLM node, using your own model and your own key.',
        cols: [
            { glyph: 'flow', lines: ['Your', 'flow'] },
            { glyph: 'model', lines: ['Certified', 'LLM node'], accent: true },
            { glyph: 'key', lines: ['Your model,', 'your key'] },
        ],
    },
    'bring-your-agent': {
        alt: 'Copilot, ChatGPT or Claude connects over MCP and reaches your teams and instances.',
        cols: [
            { glyph: 'agent', lines: ['Copilot, ChatGPT', 'or Claude'] },
            { glyph: 'plug', lines: ['MCP', 'connector'], accent: true },
            { glyph: 'platform', lines: ['Your teams', 'and instances'] },
        ],
    },
    'you-decide': {
        alt: 'Your agent is held to the permissions and role-based access control you granted it.',
        cols: [
            { glyph: 'agent', lines: ['Your', 'agent'] },
            { glyph: 'shield', lines: ['Permissions', 'and RBAC'], accent: true },
            { glyph: 'approve', lines: ['Only what', 'you allowed'] },
        ],
    },
    'your-tools': {
        alt: 'Your flows become an MCP server, and an agent calls the tools you registered.',
        cols: [
            { glyph: 'flow', lines: ['Your', 'flows'] },
            { glyph: 'platform', lines: ['MCP', 'server'], accent: true },
            { glyph: 'terminal', lines: ['Agent calls', 'your tools'] },
        ],
    },
}

const spec = computed(() => SPECS[props.kind])

// 24x24 glyph scaled to 26 and centred over its card.
const GLYPH_SCALE = 26 / 24
function glyphTransform (i: number) {
    const cx = COLS[i].x + COLS[i].w / 2
    return `translate(${cx - 13}, ${GLYPH_Y - 13}) scale(${GLYPH_SCALE})`
}

function labelY (lineCount: number, index: number) {
    const top = LABEL_MID - ((lineCount - 1) * LINE_H) / 2
    return top + index * LINE_H + 5
}
</script>

<template>
  <svg v-if="spec" class="ff-aidiag" viewBox="0 0 720 150" role="img" :aria-label="spec.alt">
    <defs>
      <marker :id="arrowId" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 1l7 4-7 4z" class="ff-aidiag__arrowhead" />
      </marker>
    </defs>

    <!-- Connectors first, so each card paints over their ends. -->
    <line
      v-for="gap in [0, 1]"
      :key="`flow-${gap}`"
      class="ff-aidiag__flow"
      :x1="COLS[gap].x + COLS[gap].w + 8"
      :y1="FLOW_Y"
      :x2="COLS[gap + 1].x - 12"
      :y2="FLOW_Y"
      :marker-end="`url(#${arrowId})`"
    />

    <g v-for="(col, i) in spec.cols" :key="`col-${i}`" :class="{ 'is-accent': col.accent }">
      <rect
        class="ff-aidiag__card"
        :x="COLS[i].x"
        :y="CARD_Y"
        :width="COLS[i].w"
        :height="CARD_H"
        rx="14"
      />
      <g class="ff-aidiag__glyph" :transform="glyphTransform(i)">
        <path v-for="(d, pi) in GLYPHS[col.glyph]" :key="`g-${pi}`" :d="d" />
      </g>
      <text
        v-for="(line, li) in col.lines"
        :key="`line-${li}`"
        class="ff-aidiag__label"
        :x="COLS[i].x + COLS[i].w / 2"
        :y="labelY(col.lines.length, li)"
        text-anchor="middle"
      >{{ line }}</text>
    </g>
  </svg>
</template>
