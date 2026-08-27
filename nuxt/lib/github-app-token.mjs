// Mints a short-lived GitHub App installation token so a build can clone a private repo
// without a long-lived PAT. Uses @octokit/auth-app (GitHub's own library) rather than
// hand-rolled JWT signing - it already handles PEM key formats, clock skew, and caching.

import { createAppAuth } from '@octokit/auth-app'

/**
 * Mint an installation access token (valid ~1 hour) for the GitHub App installed on
 * `owner/repo`. Uses the same App credentials (GH_BOT_APP_ID / GH_BOT_APP_KEY) the
 * `Build Site` Actions workflow already uses to push blueprint updates, so Netlify's
 * production build can clone the private blueprint-library repo the same way.
 */
export async function mintInstallationToken ({ appId, privateKey, owner, repo }) {
    const auth = createAppAuth({ appId, privateKey })

    // auth-app only mints installation tokens by id, so look the installation up first
    // using app-level (JWT) auth - the same two-step flow GitHub's REST API requires.
    const { token: appJwt } = await auth({ type: 'app' })
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/installation`, {
        headers: {
            Authorization: `Bearer ${appJwt}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })
    if (!res.ok) {
        throw new Error(`Failed to look up the GitHub App installation for ${owner}/${repo}: ${res.status} ${res.statusText}`)
    }
    const { id: installationId } = await res.json()

    const { token } = await auth({ type: 'installation', installationId })
    return token
}
