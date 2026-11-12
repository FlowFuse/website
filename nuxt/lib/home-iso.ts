// Isometric wireframe drawing for the homepage illustrations.
//
// Every factory picture on the homepage (the hero plant, the four "where to start"
// icons, the one-plant-to-every-site diagram) is built here from a handful of 3D
// primitives (boxes, vertical cylinders, 3D polylines) and projected to 2D, rather
// than hand-drawn as SVG paths. Moving a machine is a coordinate change, and every
// picture shares one projection, one line weight and one palette.
//
// World axes: x runs to the lower right of the screen, y to the lower left, z up.
// The viewer looks from +x/+y, so a box shows its top, its x-max face and its y-max face.

export type Tone = 'line' | 'accent' | 'muted'

export interface Shape {
    kind: 'poly' | 'path' | 'circle'
    // poly: closed polygon points; path: an SVG path string; circle: centre + r
    points?: [number, number][]
    d?: string
    cx?: number
    cy?: number
    r?: number
    // face: top/left/right fill; none: stroke only; flow: an animated data line;
    // dot: a status light
    role: 'top' | 'left' | 'right' | 'none' | 'flow' | 'dot'
    tone: Tone
    depth: number
    // explicit [minX, minY, maxX, maxY] for shapes whose path holds arcs
    bounds?: [number, number, number, number]
    // a named part of the scene (one machine, one line) that the page can highlight
    group?: string
}

// Where a named group sits in the rendered picture, as fractions of its width and height.
export interface GroupBox { x: number, y: number, w: number, h: number }

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = 0.5

export function project (x: number, y: number, z: number): [number, number] {
    return [(x - y) * COS30, (x + y) * SIN30 - z]
}

function pt ([sx, sy]: [number, number]) {
    return `${sx.toFixed(2)},${sy.toFixed(2)}`
}

export class IsoScene {
    shapes: Shape[] = []

    // Tag every shape drawn inside `draw` as part of one named group.
    tag (group: string, draw: () => void) {
        const from = this.shapes.length
        draw()
        for (let i = from; i < this.shapes.length; i++) this.shapes[i].group = group
        return this
    }

    // A solid box drawn as three outlined faces. `depth` sorts painter's-algorithm style:
    // objects further back (smaller x + y) are drawn first.
    box (x: number, y: number, z: number, w: number, d: number, h: number, tone: Tone = 'line', depthOverride?: number) {
        const depth = depthOverride ?? x + y + (w + d) / 2 + z * 0.01
        const P = (a: number, b: number, c: number) => project(a, b, c)
        this.shapes.push(
            { kind: 'poly', role: 'right', tone, depth, points: [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)] },
            { kind: 'poly', role: 'left', tone, depth, points: [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)] },
            { kind: 'poly', role: 'top', tone, depth, points: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)] },
        )
        return this
    }

    // A flat rectangle on the y-max (front-left) face of a box: a screen or a panel.
    panelY (y: number, x0: number, x1: number, z0: number, z1: number, tone: Tone = 'accent', depth = 0) {
        const P = (a: number, c: number) => project(a, y, c)
        this.shapes.push({ kind: 'poly', role: 'none', tone, depth, points: [P(x0, z0), P(x1, z0), P(x1, z1), P(x0, z1)] })
        return this
    }

    // A flat rectangle on the x-max (front-right) face of a box.
    panelX (x: number, y0: number, y1: number, z0: number, z1: number, tone: Tone = 'accent', depth = 0) {
        const P = (b: number, c: number) => project(x, b, c)
        this.shapes.push({ kind: 'poly', role: 'none', tone, depth, points: [P(y0, z0), P(y1, z0), P(y1, z1), P(y0, z1)] })
        return this
    }

    // A vertical cylinder (a tank, a pump body, a robot base). A circle in the floor
    // plane projects to an axis-aligned ellipse, rx = r·√2·cos30, ry = r·√2·sin30.
    cylinder (cx: number, cy: number, z: number, r: number, h: number, tone: Tone = 'line', rings = 0) {
        const depth = cx + cy + z * 0.01
        const rx = r * Math.SQRT2 * COS30
        const ry = r * Math.SQRT2 * SIN30
        const [bx, by] = project(cx, cy, z)
        const [tx, ty] = project(cx, cy, z + h)
        const side = `M${(bx - rx).toFixed(2)},${by.toFixed(2)} L${(tx - rx).toFixed(2)},${ty.toFixed(2)} L${(tx + rx).toFixed(2)},${ty.toFixed(2)} L${(bx + rx).toFixed(2)},${by.toFixed(2)} A${rx.toFixed(2)},${ry.toFixed(2)} 0 0 1 ${(bx - rx).toFixed(2)},${by.toFixed(2)} Z`
        const top = `M${(tx - rx).toFixed(2)},${ty.toFixed(2)} A${rx.toFixed(2)},${ry.toFixed(2)} 0 1 0 ${(tx + rx).toFixed(2)},${ty.toFixed(2)} A${rx.toFixed(2)},${ry.toFixed(2)} 0 1 0 ${(tx - rx).toFixed(2)},${ty.toFixed(2)} Z`
        const bounds: [number, number, number, number] = [bx - rx, ty - ry, bx + rx, by + ry]
        this.shapes.push({ kind: 'path', role: 'left', tone, depth, d: side, bounds })
        for (let i = 1; i <= rings; i++) {
            const [rx0, ry0] = project(cx, cy, z + (h * i) / (rings + 1))
            this.shapes.push({ kind: 'path', role: 'none', tone: 'muted', depth: depth + 0.001, d: `M${(rx0 - rx).toFixed(2)},${ry0.toFixed(2)} A${rx.toFixed(2)},${ry.toFixed(2)} 0 0 0 ${(rx0 + rx).toFixed(2)},${ry0.toFixed(2)}` })
        }
        this.shapes.push({ kind: 'path', role: 'top', tone, depth: depth + 0.002, d: top, bounds })
        return this
    }

    // An open 3D polyline: a pipe, a robot arm, a cable. `flow` animates it as data.
    line (points: [number, number, number][], tone: Tone = 'line', role: 'none' | 'flow' = 'none', depth?: number) {
        const projected = points.map(([a, b, c]) => project(a, b, c))
        const d = 'M' + projected.map(pt).join(' L')
        const avg = depth ?? points.reduce((s, [a, b]) => s + a + b, 0) / points.length
        this.shapes.push({ kind: 'path', role, tone, depth: avg, d })
        return this
    }

    // A status light at a 3D point.
    dot (x: number, y: number, z: number, r = 0.9, tone: Tone = 'accent', depth?: number) {
        const [cx, cy] = project(x, y, z)
        this.shapes.push({ kind: 'circle', role: 'dot', tone, depth: depth ?? x + y + 1000, cx, cy, r })
        return this
    }

    // The floor slab and its grid, drawn first.
    floor (x: number, y: number, w: number, d: number, step = 0) {
        const P = (a: number, b: number) => project(a, b, 0)
        this.shapes.push({ kind: 'poly', role: 'top', tone: 'muted', depth: -1e6, points: [P(x, y), P(x + w, y), P(x + w, y + d), P(x, y + d)] })
        if (step > 0) {
            const lines: string[] = []
            for (let gx = x + step; gx < x + w; gx += step) lines.push(`M${pt(P(gx, y))} L${pt(P(gx, y + d))}`)
            for (let gy = y + step; gy < y + d; gy += step) lines.push(`M${pt(P(x, gy))} L${pt(P(x + w, gy))}`)
            this.shapes.push({ kind: 'path', role: 'none', tone: 'muted', depth: -1e6 + 1, d: lines.join(' ') })
        }
        return this
    }

    // Painter's-algorithm order, a padded viewBox around everything drawn, and where
    // each named group sits inside it.
    render (pad = 2) {
        const shapes = [...this.shapes].sort((a, b) => a.depth - b.depth)
        const all = emptyBox()
        const groups = new Map<string, Box>()
        for (const s of shapes) {
            const b = shapeBox(s)
            if (!b) continue
            growBox(all, b)
            // A group's box covers its solid parts, not the data lines rising off it,
            // so a callout pointing at the group lands on the machine itself
            if (s.group && s.role !== 'flow') {
                if (!groups.has(s.group)) groups.set(s.group, emptyBox())
                growBox(groups.get(s.group)!, b)
            }
        }
        const [minX, minY] = [all[0] - pad, all[1] - pad]
        const [width, height] = [all[2] - all[0] + pad * 2, all[3] - all[1] + pad * 2]
        const viewBox = `${minX.toFixed(1)} ${minY.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`
        const groupBoxes: Record<string, GroupBox> = {}
        for (const [name, b] of groups) {
            groupBoxes[name] = { x: (b[0] - minX) / width, y: (b[1] - minY) / height, w: (b[2] - b[0]) / width, h: (b[3] - b[1]) / height }
        }
        return {
            viewBox,
            groups: groupBoxes,
            shapes: shapes.map(s => ({
                ...s,
                points: s.points ? s.points.map(pt).join(' ') : undefined,
            })),
        }
    }
}

type Box = [number, number, number, number]

function emptyBox (): Box {
    return [Infinity, Infinity, -Infinity, -Infinity]
}

function growBox (b: Box, [x0, y0, x1, y1]: Box) {
    b[0] = Math.min(b[0], x0); b[1] = Math.min(b[1], y0)
    b[2] = Math.max(b[2], x1); b[3] = Math.max(b[3], y1)
}

// The 2D extent of one shape. Paths with arcs carry explicit bounds (the arcs sit inside
// the outline already counted); every other path is read from its own "x,y" pairs.
function shapeBox (s: Shape): Box | null {
    const b = emptyBox()
    const grow = (x: number, y: number) => growBox(b, [x, y, x, y])
    if (s.points) s.points.forEach(([x, y]) => grow(x, y))
    if (s.kind === 'circle') { grow(s.cx! - s.r!, s.cy! - s.r!); grow(s.cx! + s.r!, s.cy! + s.r!) }
    if (s.bounds) growBox(b, s.bounds)
    else if (s.d && !s.d.includes('A')) {
        const nums = s.d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
        for (let i = 0; i + 1 < nums.length; i += 2) grow(nums[i], nums[i + 1])
    }
    return b[0] === Infinity ? null : b
}
