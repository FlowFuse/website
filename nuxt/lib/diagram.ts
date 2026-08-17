// Brand-owned diagram renderer for the Application Guide.
//
// Authors describe a diagram as data — boxes (with names), lines/arrows (with a
// direction), and optional grouping — and this builds a deterministic, on-brand
// inline SVG. Two layout modes: 'flow' (a left→right lane, Node-RED style) and
// 'grid' (place boxes on a small grid by col/row, architecture style).
//
// Kept framework-free so it can be unit-tested and imported by the MDC wrappers
// (FlowDiagram.vue / ArchDiagram.vue).

export interface DiagramNode {
    id: string
    label: string
    sub?: string
    accent?: string
    col?: number
    row?: number
    // Widen a box across N columns (default 1).
    span?: number
    // Render as a stacked "deck" to signal one-or-many (e.g. many instances).
    many?: boolean
}
export interface DiagramEdge {
    from: string
    to: string
    label?: string
    dir?: 'to' | 'both' | 'none'
    dashed?: boolean
    // Colour the connector (maps to an accent); pairs with a legend entry.
    accent?: string
}
export interface DiagramGroup {
    id?: string  // lets an edge connect to the whole group box
    label?: string
    accent?: string
    nodes: string[]
}
export interface DiagramLegendItem {
    label: string
    swatch?: string  // accent name → coloured square
    line?: string    // accent name → short line sample
    dashed?: boolean
}
export interface DiagramSpec {
    layout?: 'flow' | 'grid'
    nodes: DiagramNode[]
    edges?: DiagramEdge[]
    groups?: DiagramGroup[]
    legend?: DiagramLegendItem[]
}

interface Box { x: number, y: number, w: number, h: number }

const ACCENTS: Record<string, { stroke: string, fill: string, text: string }> = {
    indigo: { stroke: '#4f46e5', fill: '#eef2ff', text: '#3730a3' }, // brand primary (indigo-600)
    red: { stroke: '#da3d0b', fill: '#fff6f4', text: '#b91c1c' }, // brand highlight (red-600)
    teal: { stroke: '#0e9aa7', fill: '#e6fbfc', text: '#0e7490' },
    green: { stroke: '#16a34a', fill: '#ecfdf5', text: '#065f46' },
    blue: { stroke: '#2563eb', fill: '#eff4ff', text: '#1e40af' },
    slate: { stroke: '#334155', fill: '#f1f5f9', text: '#1e293b' },
    neutral: { stroke: '#94a3b8', fill: '#ffffff', text: '#334155' },
}
const accent = (name?: string) => ACCENTS[name || 'neutral'] || ACCENTS.neutral

// Layout metrics
const W = 176, H = 66, GX = 74, GY = 84
const MARGIN = 28, ZPAD = 18, ZTOP = 28

const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Connector geometry: a smooth path from box a to box b, entering the target edge
// perpendicular. (Ported from the original guide's edge() helper.)
function edge(a: Box, b: Box): string {
    const acx = a.x + a.w / 2, acy = a.y + a.h / 2
    const bcx = b.x + b.w / 2, bcy = b.y + b.h / 2
    let vert: boolean
    if (b.y >= a.y + a.h || b.y + b.h <= a.y) vert = true
    else if (b.x >= a.x + a.w || b.x + b.w <= a.x) vert = false
    else vert = Math.abs(bcy - acy) >= Math.abs(bcx - acx)
    let sx: number, sy: number, tx: number, ty: number
    if (vert) {
        const down = bcy >= acy
        if (down) { sx = acx; sy = a.y + a.h; tx = bcx; ty = b.y + 2 }
        else { sx = acx; sy = a.y; tx = bcx; ty = b.y + b.h - 2 }
        const run = Math.min(12, Math.abs(ty - sy) * 0.5)
        const ky = down ? ty - run : ty + run
        const m = (sy + ky) / 2
        return `M${sx},${sy} C${sx},${m} ${tx},${m} ${tx},${ky} L${tx},${ty}`
    } else {
        const right = bcx >= acx
        if (right) { sx = a.x + a.w; sy = acy; tx = b.x + 2; ty = bcy }
        else { sx = a.x; sy = acy; tx = b.x + b.w - 2; ty = bcy }
        const run = Math.min(12, Math.abs(tx - sx) * 0.5)
        const kx = right ? tx - run : tx + run
        const m = (sx + kx) / 2
        return `M${sx},${sy} C${m},${sy} ${m},${ty} ${kx},${ty} L${tx},${ty}`
    }
}

export function buildDiagramSvg(spec: DiagramSpec): string {
    const layout = spec.layout || 'flow'
    const nodes = spec.nodes || []

    // Assign grid positions: flow auto-lanes (col = order); grid uses col/row.
    const pos = new Map<string, { col: number, row: number, span: number }>()
    nodes.forEach((n, i) => {
        const col = n.col ?? (layout === 'flow' ? i + 1 : 1)
        const row = n.row ?? 1
        pos.set(n.id, { col, row, span: Math.max(1, n.span || 1) })
    })

    // Widen the horizontal gap so the longest edge label fits between two boxes
    // instead of overlapping them.
    const maxLabel = Math.max(0, ...(spec.edges || []).map(e => (e.label ? e.label.length : 0)))
    const gx = maxLabel ? Math.max(GX, Math.round(maxLabel * 6.4 + 26)) : GX

    const maxCol = Math.max(1, ...[...pos.values()].map(p => p.col + p.span - 1))
    const maxRow = Math.max(1, ...[...pos.values()].map(p => p.row))
    const fullW = maxCol * W + (maxCol - 1) * gx

    // Auto-center each row: a row that doesn't span the full width is centered,
    // so e.g. a 4-box platform row sits centered over a 5-box edge row.
    const baseX = (col: number) => (col - 1) * (W + gx)
    const rowShift = new Map<number, number>()
    for (const r of new Set([...pos.values()].map(p => p.row))) {
        const inRow = [...pos.values()].filter(p => p.row === r)
        const left = Math.min(...inRow.map(p => baseX(p.col)))
        const right = Math.max(...inRow.map(p => baseX(p.col) + p.span * W + (p.span - 1) * gx))
        rowShift.set(r, (fullW - (right - left)) / 2 - left)
    }

    const box = (id: string): Box => {
        const p = pos.get(id)!
        return {
            x: MARGIN + baseX(p.col) + (rowShift.get(p.row) ?? 0),
            y: MARGIN + ZTOP + (p.row - 1) * (H + GY),
            w: p.span * W + (p.span - 1) * gx,
            h: H,
        }
    }

    const hasLegend = !!(spec.legend && spec.legend.length)
    const legendH = hasLegend ? 30 : 0
    // +20 room so a "many" deck peeking down-right of a last-row/col node isn't clipped.
    const width = MARGIN * 2 + fullW + 20
    const height = MARGIN * 2 + ZTOP + maxRow * H + (maxRow - 1) * GY + 20 + legendH

    const parts: string[] = []

    // ---- Groups (behind everything) ----
    const groupBox = new Map<string, Box>()
    for (const g of spec.groups || []) {
        const boxes = g.nodes.map(box).filter(Boolean)
        if (!boxes.length) continue
        const x = Math.min(...boxes.map(b => b.x)) - ZPAD
        const y = Math.min(...boxes.map(b => b.y)) - ZTOP
        const x2 = Math.max(...boxes.map(b => b.x + b.w)) + ZPAD
        const y2 = Math.max(...boxes.map(b => b.y + b.h)) + ZPAD
        if (g.id) groupBox.set(g.id, { x, y, w: x2 - x, h: y2 - y })
        const a = accent(g.accent)
        parts.push(`<rect x="${x}" y="${y}" width="${x2 - x}" height="${y2 - y}" rx="16" fill="${a.fill}" fill-opacity="0.5" stroke="${a.stroke}" stroke-width="1.5" stroke-dasharray="7,5"/>`)
        if (g.label) parts.push(`<text x="${x + 14}" y="${y + 17}" font-size="11" font-weight="700" letter-spacing="0.04em" fill="${a.text}">${esc(g.label)}</text>`)
    }

    // An edge endpoint can be a node id or a group id.
    const boxOf = (ref: string): Box | null => pos.has(ref) ? box(ref) : (groupBox.get(ref) ?? null)

    // ---- Edges ----
    for (const e of spec.edges || []) {
        const ba = boxOf(e.from), bb = boxOf(e.to)
        if (!ba || !bb) continue
        const d = edge(ba, bb)
        const dir = e.dir || 'to'
        const dash = e.dashed ? ' stroke-dasharray="6,5"' : ''
        const stroke = e.accent ? accent(e.accent).stroke : '#94a3b8'
        const me = dir === 'to' || dir === 'both' ? ' marker-end="url(#ag-arrow)"' : ''
        const ms = dir === 'both' ? ' marker-start="url(#ag-arrow-start)"' : ''
        parts.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.8"${dash}${me}${ms}/>`)
        if (e.label) {
            const mx = (ba.x + ba.w / 2 + bb.x + bb.w / 2) / 2
            const my = (ba.y + ba.h / 2 + bb.y + bb.h / 2) / 2
            const lw = e.label.length * 6.2 + 10
            parts.push(`<rect x="${mx - lw / 2}" y="${my - 9}" width="${lw}" height="18" rx="4" fill="#ffffff"/>`)
            parts.push(`<text x="${mx}" y="${my + 4}" text-anchor="middle" font-size="11" fill="#6b7280">${esc(e.label)}</text>`)
        }
    }

    // ---- Nodes ----
    const R = 13 // card corner radius
    nodes.forEach((n, idx) => {
        const b = box(n.id)
        const a = accent(n.accent)
        const hasAccent = !!n.accent && n.accent !== 'neutral'
        // "many": two cards peeking behind, drawn first, to read as a deck.
        if (n.many) {
            parts.push(`<rect x="${b.x + 16}" y="${b.y + 16}" width="${b.w}" height="${b.h}" rx="${R}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`)
            parts.push(`<rect x="${b.x + 8}" y="${b.y + 8}" width="${b.w}" height="${b.h}" rx="${R}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`)
        }
        // White card, soft gray border + shadow.
        parts.push(`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${R}" fill="#ffffff" stroke="#e5e7eb" stroke-width="1.3" filter="url(#ag-shadow)"/>`)
        // Accent header: a full-width bar clipped to the card's rounded shape, so its
        // top corners match the card and it spans edge to edge.
        if (hasAccent) {
            const clip = `agc${idx}`
            parts.push(`<clipPath id="${clip}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${R}"/></clipPath>`)
            parts.push(`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="5" fill="${a.stroke}" clip-path="url(#${clip})"/>`)
        }
        const cy = n.sub ? b.y + b.h / 2 - 4 : b.y + b.h / 2 + 4.5
        parts.push(`<text x="${b.x + b.w / 2}" y="${cy}" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">${esc(n.label)}</text>`)
        if (n.sub) parts.push(`<text x="${b.x + b.w / 2}" y="${b.y + b.h / 2 + 13}" text-anchor="middle" font-size="11" fill="#6b7280">${esc(n.sub)}</text>`)
    })

    // ---- Legend ----
    if (hasLegend) {
        let lx = MARGIN
        const ly = height - 12
        for (const item of spec.legend!) {
            if (item.swatch) {
                const a = accent(item.swatch)
                parts.push(`<rect x="${lx}" y="${ly - 10}" width="12" height="12" rx="3" fill="${a.fill}" stroke="${a.stroke}" stroke-width="1.5"/>`)
                lx += 18
            } else {
                const c = item.line ? accent(item.line).stroke : '#94a3b8'
                const dash = item.dashed ? ' stroke-dasharray="5,4"' : ''
                parts.push(`<line x1="${lx}" y1="${ly - 4}" x2="${lx + 20}" y2="${ly - 4}" stroke="${c}" stroke-width="2"${dash}/>`)
                lx += 26
            }
            parts.push(`<text x="${lx}" y="${ly}" font-size="11" fill="#6b7280">${esc(item.label)}</text>`)
            lx += item.label.length * 6.2 + 22
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" font-family="Heebo, Helvetica, Arial, sans-serif" style="width:100%;height:auto;display:block">`
        + `<defs>`
        // context-stroke → the arrowhead inherits its edge's stroke colour.
        + `<marker id="ag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker>`
        + `<marker id="ag-arrow-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M10,0 L0,5 L10,10 z" fill="context-stroke"/></marker>`
        + `<filter id="ag-shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#0f172a" flood-opacity="0.10"/></filter>`
        + `</defs>`
        + parts.join('')
        + `</svg>`
}
