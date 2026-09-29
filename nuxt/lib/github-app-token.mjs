// Mints a short-lived GitHub App installation token so a build can clone a private repo
// without a long-lived PAT. Uses @octokit/auth-app (GitHub's own library) rather than
// hand-rolled JWT signing - it already handles PEM key formats, clock skew, and caching.

import { createAppAuth } from '@octokit/auth-app'

/**
 * Mint an installation access token (valid ~1 hour) for the GitHub App installed on
 * `owner/repo` (GH_BOT_APP_ID / GH_BOT_APP_KEY - a dedicated App with read-only access to
 * blueprint-library, installed in the FlowFuse org), so Netlify's production build can
 * clone the private repo without a long-lived PAT.
 *
 * Netlify's env var UI doesn't accept multiline values, so the PEM is stored there
 * Base64-encoded and decoded back to real PEM text here. A raw, already-PEM key decodes
 * to garbage that createAppAuth would reject anyway, so this never silently double-reads
 * a key that was somehow stored unencoded.
 */
export async function mintInstallationToken ({ appId, privateKey, owner, repo }) {
    const pem = Buffer.from(privateKey, 'base64').toString('utf8')
    const auth = createAppAuth({ appId, privateKey: pem })

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
