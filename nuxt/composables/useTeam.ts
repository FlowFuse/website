interface TeamMember {
    // The data-file basename (e.g. 'sumit-shinde'), which is also the author page slug
    slug: string
    name: string
    title?: string
    headshot?: string
    bio?: string
    email?: string
    linkedin?: string
    github?: string
    twitter?: string | null
    knowsAbout?: string[]
}

const teamModules = import.meta.glob('../../src/_data/team/*.json', { eager: true, import: 'default' })
const guestModules = import.meta.glob('../../src/_data/guests/*.json', { eager: true, import: 'default' })

function keyFor(path: string): string {
    return path.split('/').pop()!.replace(/\.json$/, '')
}

const people: Record<string, TeamMember> = {}
for (const [path, mod] of Object.entries({ ...teamModules, ...guestModules })) {
    const slug = keyFor(path)
    people[slug] = { slug, ...(mod as Omit<TeamMember, 'slug'>) }
}

export function useTeam() {
    return people
}

export function useTeamMember(slug?: string): TeamMember | null {
    return (slug && people[slug]) || null
}

export function useAuthorMembers(authors?: string[]): TeamMember[] {
    const team = useTeam()
    return (authors || []).map(username => team[username]).filter((member): member is TeamMember => Boolean(member))
}

export function useAuthorNames(authors?: string[]): string {
    return useAuthorMembers(authors).map(member => member.name).join(', ')
}

export function authorPath(slug: string): string {
    return `/blog/author/${slug}/`
}

// Person node shared by the blog post byline (article author) and the author page itself,
// so both resolve to the same @id and Google can join them up.
export function authorSchema(member: TeamMember) {
    const sameAs = [
        member.linkedin && `https://www.linkedin.com/in/${member.linkedin}`,
        member.github && `https://github.com/${member.github}`,
        member.twitter && `https://twitter.com/${member.twitter}`,
    ].filter(Boolean) as string[]

    const url = `https://flowfuse.com${authorPath(member.slug)}`

    return {
        '@type': 'Person',
        '@id': url,
        name: member.name,
        url,
        ...(member.title ? { jobTitle: member.title } : {}),
        ...(member.headshot ? { image: `https://flowfuse.com/images/team/headshot-${member.headshot}` } : {}),
        ...(member.bio ? { description: member.bio } : {}),
        ...(member.knowsAbout?.length ? { knowsAbout: member.knowsAbout } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        worksFor: { '@id': 'https://flowfuse.com/#identity' },
    }
}
