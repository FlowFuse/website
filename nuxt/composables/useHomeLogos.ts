// Logo filenames for the social-proof carousel, mirroring the `homeLogos`
// Eleventy collection. Uses import.meta.glob (like useTeam.ts) instead of a
// runtime readdirSync, which fails once deployed (no src/ in the function bundle).
const logoModules = import.meta.glob('../../src/images/home-logos/*.{png,svg}')

const logoFiles = Object.keys(logoModules).map(path => path.split('/').pop() as string)

function shuffle<T>(array: T[]): T[] {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export function useHomeLogos(): string[] {
    return shuffle(logoFiles).map(file => `/images/home-logos/${file}`)
}
