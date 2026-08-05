interface TeamMember {
    name: string
    title?: string
    headshot?: string
    bio?: string
    email?: string
    linkedin?: string
    github?: string
}

const teamModules = import.meta.glob('../../src/_data/team/*.json', { eager: true, import: 'default' })
const guestModules = import.meta.glob('../../src/_data/guests/*.json', { eager: true, import: 'default' })

function keyFor(path: string): string {
    return path.split('/').pop()!.replace(/\.json$/, '')
}

const people: Record<string, TeamMember> = {}
for (const [path, mod] of Object.entries({ ...teamModules, ...guestModules })) {
    people[keyFor(path)] = mod as TeamMember
}

export function useTeam() {
    return people
}

export function useAuthorMembers(authors?: string[]): TeamMember[] {
    const team = useTeam()
    return (authors || []).map(username => team[username]).filter(Boolean)
}

export function useAuthorNames(authors?: string[]): string {
    return useAuthorMembers(authors).map(member => member.name).join(', ')
}
