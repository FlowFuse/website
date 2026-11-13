// The homepage's wireframe scenes, drawn with the IsoScene primitives in home-iso.ts.
// Coordinates are world units; render() fits the viewBox, so a scene's absolute
// scale doesn't matter, only its proportions.
import { IsoScene, project } from './home-iso'

export type SceneName = 'hero' | 'sites' | 'foundation' | 'operations' | 'maintenance' | 'automation' | 'digital' | 'quality' | 'delivery' | 'cost' | 'uptime'

// Flow lines are drawn above every solid, so data reads as travelling over the plant.
const OVER = 1e5

// The six solution areas the hero steps through. Each is a tagged group in the hero
// scene; the page highlights one at a time and shows its readout (HomeHero.vue).
export const HERO_GROUPS = ['cnc', 'packaging', 'inspection', 'vibration', 'well', 'energy'] as const
export type HeroGroup = typeof HERO_GROUPS[number]

// A plant floor: a PLC cabinet with an edge gateway, three machining centres, a
// packaging conveyor with a vision camera over it, a pump, a tank battery, and every
// source wired up to one hub above. The base drawing is all indigo, so the orange
// highlight the page puts on one solution at a time is the only warm colour. Each
// solution's group includes its own riser to the data bus, so its data path lights too.
function hero () {
    const s = new IsoScene()
    s.floor(0, 0, 64, 44, 4)
    const bus = 21
    const riser = (x: number, y: number, z: number) =>
        s.line([[x, y, z], [x, y, bus], [x, 6, bus]], 'line', 'flow', OVER + 1)

    // Three machining centres, each with a screen, a door and a status light.
    // The first is the CNC performance group.
    for (let i = 0; i < 3; i++) {
        const x = 9 + i * 13
        const draw = () => {
            s.box(x, 8, 0, 10, 8, 9)
            s.panelY(16, x + 1.5, x + 4.5, 4, 7.5, 'line', x + 8 + 9.1)
            s.panelY(16, x + 5.5, x + 9, 1, 7.5, 'muted', x + 8 + 9.1)
            s.dot(x + 8.5, 9.5, 9, 0.6, 'muted', x + 20)
            riser(x + 5, 12, 9)
        }
        if (i === 0) s.tag('cnc', draw)
        else draw()
    }

    // Packaging conveyor: legs, belt, rollers, product, and a riser off the end
    s.tag('packaging', () => {
        for (let k = 0; k < 6; k++) {
            s.box(7 + k * 8, 24.4, 0, 0.8, 0.8, 2)
            s.box(7 + k * 8, 28, 0, 0.8, 0.8, 2)
        }
        s.box(6, 24, 2, 44, 5, 1.2)
        for (let k = 0; k < 22; k++) {
            const x = 7 + k * 2
            s.line([[x, 24, 3.2], [x, 29, 3.2]], 'muted', 'none', 6 + 24 + 30)
        }
        // Product rides on the belt, so it's drawn after the belt and its rollers
        for (let k = 0; k < 5; k++) s.box(9 + k * 7.5, 25, 3.2, 3, 3, 2.4, 'line', 61 + k)
        riser(49, 26.5, 3.2)
    })

    // Vision inspection: a gantry over the belt with a camera looking down at it.
    // The back post sits behind the belt; the beam, camera and front post in front.
    s.tag('inspection', () => {
        s.box(30, 22.6, 0, 0.6, 0.6, 9)
        s.box(30, 29.6, 0, 0.6, 0.6, 9, 'line', 70)
        s.box(30, 22.6, 9, 0.6, 7.6, 0.6, 'line', 71)
        s.box(29.4, 25.8, 6.8, 1.6, 1.6, 2.2, 'line', 72)
        s.dot(31, 26.6, 7.6, 0.45, 'muted', 73)
        riser(30.3, 26.2, 9.6)
    })

    // Pump and motor at the end of the line: vibration condition monitoring
    s.tag('vibration', () => {
        s.cylinder(54, 31, 0, 2.4, 3.4, 'line', 1)
        s.box(57, 29.8, 0, 3.6, 2.4, 2.4)
        s.line([[56.3, 31, 1.4], [57, 31, 1.4]], 'line', 'none', 92)
        riser(54, 31, 3.4)
    })

    // Tank battery and the pipe that feeds the line: well and plunger-lift optimisation
    s.tag('well', () => {
        s.cylinder(56, 9, 0, 4, 15, 'line', 2)
        s.cylinder(56, 20, 0, 3, 10, 'line', 1)
        s.line([[53.5, 20, 3], [52, 20, 3], [52, 24, 3]], 'line', 'none', 74)
        riser(56, 9, 15)
    })

    // PLC cabinet with an edge gateway antenna and I/O modules: remote energy service
    s.tag('energy', () => {
        s.box(2, 30, 0, 3, 9, 8)
        s.line([[3.5, 38, 8], [3.5, 38, 11]], 'line', 'none', 42)
        s.dot(3.5, 38, 11, 0.6, 'muted', 43)
        for (let m = 0; m < 4; m++) s.panelX(5, 31 + m * 2, 32.4 + m * 2, 2, 6.5, 'muted', 40)
        s.line([[3.5, 30, 8], [3.5, 30, bus], [3.5, 6, bus]], 'line', 'flow', OVER + 1)
    })

    // The data bus and the hub every source feeds
    s.line([[3.5, 6, bus], [56, 6, bus]], 'muted', 'none', OVER)
    s.line([[30, 6, bus], [30, 6, 26]], 'line', 'flow', OVER + 1)
    s.box(27, 3, 26, 6, 6, 3, 'line', OVER + 2)
    s.dot(30, 6, 29, 0.8, 'accent', OVER + 3)
    return s
}

// One plant tile for the sites diagram: slab, main hall, annex and a silo.
function plant (s: IsoScene, ox: number, oy: number, tone: 'line' | 'accent') {
    // The slab sits under the whole tile, so it's painted before anything on it
    s.box(ox, oy, 0, 12, 10, 0.6, 'muted', ox + oy - 1)
    s.box(ox + 1, oy + 1, 0.6, 6, 5, 4, tone)
    s.box(ox + 7.5, oy + 1.5, 0.6, 3, 3, 2.5, tone)
    s.cylinder(ox + 9.2, oy + 7.2, 0.6, 1.3, 4.5, tone)
}

// One plant on the left, proven; four on the right, each receiving the same solution.
function sites () {
    const s = new IsoScene()
    const source: [number, number] = [2, 26]
    const targets: [number, number][] = [[38, 30], [46, 16], [47, -5], [37, -31]]
    plant(s, ...source, 'accent')
    for (const t of targets) plant(s, ...t, 'line')
    // Every site has a short mast on its roof. The links run mast-top to mast-top,
    // high enough that they pass above the buildings rather than through them.
    const mast = 9
    const [fx, fy] = [source[0] + 4, source[1] + 3.5]
    for (const [tx, ty] of [source, ...targets]) {
        s.line([[tx + 4, ty + 3.5, 4.6], [tx + 4, ty + 3.5, mast]], 'line', 'none', tx + ty + 60)
        s.dot(tx + 4, ty + 3.5, mast, 0.6, 'accent', OVER + 1)
    }
    for (const [tx, ty] of targets) {
        s.line([[fx, fy, mast], [tx + 4, ty + 3.5, mast]], 'accent', 'flow', OVER)
    }
    return s
}

// The Foundation Partnership, as four sites in a row. Each site is a stack: four
// foundation layers (integrations, data model, deployment pattern, governance) under
// the solution itself. At site 1 every layer is built new (accent). Every later site
// reuses the whole stack (line) and only adds a thin cap of site-specific work, which
// is the picture of "faster with each one". Links carry the foundation along the row.
export const FOUNDATION_SITES = 4
const STACK = { step: 15, size: 8, layer: 1.1, gap: 0.35, block: 3.4 }

function foundationOrigin (i: number): [number, number] {
    return [i * STACK.step, -i * STACK.step]
}

function foundation () {
    const s = new IsoScene()
    const { size, layer, gap, block } = STACK
    const top = 4 * (layer + gap)
    for (let i = 0; i < FOUNDATION_SITES; i++) {
        const [ox, oy] = foundationOrigin(i)
        const built = i === 0
        const tone = built ? 'accent' : 'line'
        // Stacks sit side by side on screen, so each gets its own depth band
        const base = i * 10
        for (let k = 0; k < 4; k++) s.box(ox, oy, k * (layer + gap), size, size, layer, tone, base + k)
        s.box(ox + 1.5, oy + 1.5, top, size - 3, size - 3, block, tone, base + 5)
        // Site-specific work at every later site: a thin cap on the reused solution
        if (!built) s.box(ox + 1.5, oy + 1.5, top + block, size - 3, size - 3, 0.7, 'accent', base + 6)
    }
    // The foundation travels from each site to the next, at the height of the layers
    for (let i = 0; i + 1 < FOUNDATION_SITES; i++) {
        const [ax, ay] = foundationOrigin(i)
        const [bx, by] = foundationOrigin(i + 1)
        // From this stack's right-most edge to the next stack's left-most edge: a level,
        // horizontal run through the gap that touches neither stack's faces
        s.line([[ax + size, ay, 2.9], [bx, by + size, 2.9]], 'accent', 'flow', i * 10 + 8)
    }
    return s
}

// Where each foundation site sits across the rendered picture, as a fraction of its
// width, so the page can set a label under each one.
export function foundationSiteCenters () {
    const [minX, , width] = renderScene('foundation').viewBox.split(' ').map(Number)
    return Array.from({ length: FOUNDATION_SITES }, (_, i) => {
        const [ox, oy] = foundationOrigin(i)
        const [sx] = project(ox + STACK.size / 2, oy + STACK.size / 2, 0)
        return (sx - minX) / width
    })
}

function operations () {
    const s = new IsoScene()
    for (let k = 0; k < 3; k++) {
        s.box(0.5 + k * 6.5, 0.3, 0, 0.6, 0.6, 1.6, 'line', k)
        s.box(0.5 + k * 6.5, 3.1, 0, 0.6, 0.6, 1.6, 'line', 10 + k)
    }
    // Belt over the legs, product over the belt
    s.box(0, 0, 1.6, 16, 4, 0.9, 'line', 20)
    for (let k = 0; k < 3; k++) s.box(1.5 + k * 5, 0.6, 2.5, 2.6, 2.6, 2.2, k === 1 ? 'accent' : 'line', 30 + k)
    return s
}

function maintenance () {
    const s = new IsoScene()
    s.box(0, 0, 0, 12, 6, 1.2, 'muted', -1)
    s.cylinder(3.5, 3, 1.2, 2.3, 5, 'line', 1)
    s.cylinder(8.5, 3, 1.2, 1.6, 3.2, 'line')
    // Discharge pipe: up off the pump, across, and down into the base
    s.line([[8.5, 3, 4.4], [8.5, 3, 6.5], [11, 3, 6.5], [11, 3, 1.2]], 'line', 'none', 30)
    s.dot(3.5, 3, 6.2, 0.7, 'accent', 40)
    return s
}

function automation () {
    const s = new IsoScene()
    s.box(0, 0, 0, 1, 12.5, 8, 'muted', -1)
    for (let i = 0; i < 5; i++) {
        const y = 0.5 + i * 2.4
        s.box(1, y, 0.6, 3.4, 2, 6.6, i === 0 ? 'accent' : 'line')
        s.dot(4.4, y + 1, 5.6, 0.32, i === 0 ? 'accent' : 'muted', 100 + i)
    }
    return s
}

function digital () {
    const s = new IsoScene()
    // Plants, then the links off their roofs, then the hub on top of the links
    const plants: [number, number][] = [[0, 12], [12, 0], [12, 12]]
    for (const [x, y] of plants) {
        s.box(x, y, 0, 4, 4, 3.5)
        s.line([[x + 2, y + 2, 3.5], [7.5, 7.5, 8]], 'accent', 'flow', 50)
    }
    s.box(5.5, 5.5, 8, 4, 4, 2, 'accent', 60)
    return s
}

// Scorecard scenes: one picture per card on the "Results you can measure" section.
// Accent always marks the signal FlowFuse raises: the caught defect, the current
// hour, the stop being costed, the warning.

// Quality: parts travel under an inspection camera; the defective one is flagged
// mid-line, before it reaches the end.
function quality () {
    const s = new IsoScene()
    for (let k = 0; k < 3; k++) {
        s.box(0.5 + k * 8, 0.3, 0, 0.6, 0.6, 1.6, 'line', k)
        s.box(0.5 + k * 8, 3.1, 0, 0.6, 0.6, 1.6, 'line', 10 + k)
    }
    s.box(0, 0, 1.6, 19, 4, 0.9, 'line', 20)
    // Camera gantry: far post behind the belt, near post and beam in front
    s.box(9, -1, 0, 0.7, 0.7, 7.5, 'line', 15)
    s.box(1.5, 0.7, 2.5, 2.6, 2.6, 2.2, 'line', 30)
    s.box(8.2, 0.7, 2.5, 2.6, 2.6, 2.2, 'accent', 31)
    s.box(14.5, 0.7, 2.5, 2.6, 2.6, 2.2, 'line', 32)
    s.box(9, 4.3, 0, 0.7, 0.7, 7.5, 'line', 40)
    s.box(9, -1, 7.5, 0.7, 6, 0.8, 'line', 41)
    // Camera head on the beam, looking down at the flagged part
    s.box(8.8, 1.6, 6.3, 1.1, 1.1, 1.2, 'line', 42)
    s.line([[9.35, 2.15, 6.3], [9.5, 2, 4.9]], 'accent', 'flow', 43)
    return s
}

// Delivery: a box truck on the road, the load it carries in orange: the order being
// tracked. Facing down-right, so the cab front and the near side both show.
function delivery () {
    const s = new IsoScene()
    // The stretch of road it stands on, under everything
    s.box(-1, -0.8, 0, 18.6, 7.4, 0.3, 'muted', -100)
    // Chassis rail, then the cargo box (the order) and its rear door
    s.box(0.4, 0.8, 1.1, 15.2, 3.4, 0.6, 'line', 10)
    s.box(0, 0, 1.7, 10.2, 5, 5.4, 'accent', 20)
    s.panelY(5, 0.8, 9.4, 2.4, 6.4, 'accent', 21)
    // Cab: the cabin, a lower hood in front of it, windscreen and side window
    s.box(10.6, 0.3, 1.7, 3.4, 4.4, 3.8, 'line', 30)
    s.box(14, 0.5, 1.7, 1.8, 4, 1.9, 'line', 31)
    s.panelX(14, 0.9, 4.3, 3.9, 5.1, 'line', 32)
    s.panelY(4.7, 11.2, 13.4, 3.7, 5.1, 'line', 33)
    // Wheels on the near side, each a tyre with a hub
    for (const x of [2.6, 6.8, 12.6]) {
        s.disc(x, 5.05, 1.35, 1.05, 'line', 'left', 50 + x)
        s.disc(x, 5.1, 1.35, 0.45, 'line', 'top', 51 + x)
    }
    return s
}

// Cost: three coin stacks, each lower than the last.
function cost () {
    const s = new IsoScene()
    s.box(-2, -2, 0, 18, 7, 0.5, 'muted', -10)
    const stacks: [number, number][] = [[0, 8], [6, 5.2], [12, 2.6]]
    stacks.forEach(([x, h], i) => {
        s.cylinder(x + 1.5, 1.5, 0.5, 2, h, i === 2 ? 'accent' : 'line', Math.round(h / 1.3) - 1)
    })
    return s
}

// Uptime: a machine with a stack light on top; the top segment is lit, the warning
// that comes before a failure.
function uptime () {
    const s = new IsoScene()
    s.box(-1, -1, 0, 11, 9, 0.5, 'muted', -10)
    s.box(0, 0, 0.5, 8, 6.5, 6.5, 'line', 1)
    s.panelY(6.5, 1, 4.2, 2.5, 5.5, 'muted', 2)
    s.panelY(6.5, 5, 7, 1.2, 5.5, 'muted', 2)
    // Stack light: pole, two unlit segments, the lit one on top
    s.cylinder(6, 2, 7, 0.35, 1.2, 'line')
    s.cylinder(6, 2, 8.2, 1, 1.4, 'line')
    s.cylinder(6, 2, 9.6, 1, 1.4, 'line')
    s.cylinder(6, 2, 11, 1, 1.4, 'accent')
    return s
}

const BUILDERS: Record<SceneName, () => IsoScene> = { hero, sites, foundation, operations, maintenance, automation, digital, quality, delivery, cost, uptime }

const cache = new Map<SceneName, ReturnType<IsoScene['render']>>()

export function renderScene (name: SceneName) {
    if (!cache.has(name)) cache.set(name, BUILDERS[name]().render(name === 'hero' ? 3 : 1.5))
    return cache.get(name)!
}
