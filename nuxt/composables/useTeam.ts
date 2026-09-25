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
    // Read by /about/: `order` sorts the grid, `facts` is the hover panel, `blog` is one
    // more social link. Declared here so that page is typed rather than casting.
    order?: number
    facts?: string[]
    blog?: string
}

const teamModules = import.meta.glob('../data/team/*.json', { eager: true, import: 'default' })
const guestModules = import.meta.glob('../data/guests/*.json', { eager: true, import: 'default' })

function keyFor(path: string): string {
    return path.split('/').pop()!.replace(/\.json$/, '')
}

function index(modules: Record<string, unknown>): Record<string, TeamMember> {
    const out: Record<string, TeamMember> = {}
    for (const [path, mod] of Object.entries(modules)) {
        const slug = keyFor(path)
        out[slug] = { slug, ...(mod as Omit<TeamMember, 'slug'>) }
    }
    return out
}

const staff = index(teamModules)
const people: Record<string, TeamMember> = { ...staff, ...index(guestModules) }

/** Everyone who can be named as an author: current staff and guest writers alike. */
export function useTeam() {
    return people
}

/**
 * Current staff only, for /about/'s "Meet the Team" grid.
 *
 * A guest file is not only an outside writer: three of them are former team members, and
 * they keep the `order` field they had while they were staff. Reading the merged map here
 * put all three back on the page.
 */
export function useStaff() {
    return staff
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
