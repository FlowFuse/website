// The homepage's wireframe scenes, drawn with the IsoScene primitives in home-iso.ts.
// Coordinates are world units; render() fits the viewBox, so a scene's absolute
// scale doesn't matter, only its proportions.
import { IsoScene } from './home-iso'

export type SceneName = 'hero' | 'sites' | 'operations' | 'maintenance' | 'automation' | 'digital'

// Flow lines are drawn above every solid, so data reads as travelling over the plant.
const OVER = 1e5

// A plant floor: edge gateway, PLC cabinet, three machines, a conveyor carrying
// product to a robot cell, two tanks, and every source wired up to one hub above.
function hero () {
    const s = new IsoScene()
    s.floor(0, 0, 64, 44, 4)


    // Three machining centres, each with a screen, a door and a status light
    for (let i = 0; i < 3; i++) {
        const x = 9 + i * 13
        s.box(x, 8, 0, 10, 8, 9)
        s.panelY(16, x + 1.5, x + 4.5, 4, 7.5, 'accent', x + 8 + 9.1)
        s.panelY(16, x + 5.5, x + 9, 1, 7.5, 'muted', x + 8 + 9.1)
        s.dot(x + 8.5, 9.5, 9, 0.6, i === 1 ? 'muted' : 'accent', x + 20)
    }

    // Conveyor: frame, legs, rollers and product
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
    for (let k = 0; k < 5; k++) s.box(9 + k * 7.5, 25, 3.2, 3, 3, 2.4, k === 2 ? 'accent' : 'line', 61 + k)

    // Robot cell at the end of the line
    s.cylinder(55, 31, 0, 2.6, 3)
    s.line([[55, 31, 3], [55, 31, 10], [50.5, 28, 12.5], [47, 26.5, 7.5]], 'accent', 'none', 88)
    s.dot(55, 31, 10, 0.6, 'accent', 89)
    s.dot(50.5, 28, 12.5, 0.6, 'accent', 89)

    // Tanks and the pipe that feeds the line
    s.cylinder(56, 9, 0, 4, 15, 'line', 2)
    s.cylinder(56, 20, 0, 3, 10, 'line', 1)
    s.line([[53.5, 20, 3], [52, 20, 3], [52, 24, 3]], 'line', 'none', 74)

    // PLC cabinet with edge gateway antenna, front left, I/O modules on its face
    s.box(2, 30, 0, 3, 9, 8)
    s.line([[3.5, 38, 8], [3.5, 38, 11]], 'line', 'none', 42)
    s.dot(3.5, 38, 11, 0.6, 'accent', 43)
    for (let m = 0; m < 4; m++) s.panelX(5, 31 + m * 2, 32.4 + m * 2, 2, 6.5, m === 0 ? 'accent' : 'muted', 40)

    // Data: every source rises to a shared bus, and the bus feeds the hub
    const bus = 21
    s.line([[3.5, 6, bus], [56, 6, bus]], 'muted', 'none', OVER)
    const risers: [number, number, number][] = [[14, 12, 9], [27, 12, 9], [40, 12, 9], [56, 9, 15]]
    for (const [x, y, z] of risers) s.line([[x, y, z], [x, y, bus], [x, 6, bus]], 'accent', 'flow', OVER + 1)
    s.line([[3.5, 30, 8], [3.5, 30, bus], [3.5, 6, bus]], 'accent', 'flow', OVER + 1)
    s.line([[30, 6, bus], [30, 6, 26]], 'accent', 'flow', OVER + 1)
    s.box(27, 3, 26, 6, 6, 3, 'accent')
    s.shapes[s.shapes.length - 1].depth = OVER + 2
    s.shapes[s.shapes.length - 2].depth = OVER + 2
    s.shapes[s.shapes.length - 3].depth = OVER + 2
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

const BUILDERS: Record<SceneName, () => IsoScene> = { hero, sites, operations, maintenance, automation, digital }

const cache = new Map<SceneName, ReturnType<IsoScene['render']>>()

export function renderScene (name: SceneName) {
    if (!cache.has(name)) cache.set(name, BUILDERS[name]().render(name === 'hero' ? 3 : 1.5))
    return cache.get(name)!
}
