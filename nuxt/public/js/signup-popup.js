// Opens the sign-up page in a small popup window on desktop/tablet, centered
// over the visible page content, with a dark overlay behind it.
// On mobile, leaves the link's default navigation untouched.
document.addEventListener('DOMContentLoaded', () => {
    // Tracks the one popup/overlay pair that can be open at a time, so
    // there's a single thing to clean up instead of separate mutable
    // variables that a second click could overwrite and orphan.
    let session = null

    function closeSession () {
        if (!session) {
            return
        }
        if (!session.popup.closed) {
            session.popup.close()
        }
        clearInterval(session.pollClosed)
        session.overlay.remove()
        session = null
    }

    function openPopup (href) {
        if (session) {
            if (!session.popup.closed) {
                // Already have one open - bring it forward instead of
                // opening a second popup and orphaning this one's overlay.
                session.popup.focus()
                return
            }
            closeSession()
        }

        const width = 420
        const height = Math.min(900, window.innerHeight * 0.75)

        // outerWidth/outerHeight include browser chrome (toolbars, a
        // vertical tab strip, etc). Subtracting innerWidth/innerHeight
        // estimates that chrome so we can center over the visible page
        // content instead of the full browser window.
        const chromeWidth = window.outerWidth - window.innerWidth
        const chromeHeight = window.outerHeight - window.innerHeight
        const viewportLeft = window.screenX + chromeWidth
        const viewportTop = window.screenY + chromeHeight

        const left = viewportLeft + (window.innerWidth - width) / 2
        const top = viewportTop + (window.innerHeight - height) / 2

        const popup = window.open(
            href,
            'flowfuse-signup',
            `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
        )

        if (!popup) {
            return
        }

        const overlay = document.createElement('div')
        overlay.setAttribute('id', 'signup-popup-overlay')
        overlay.style.position = 'fixed'
        overlay.style.inset = '0'
        overlay.style.background = 'rgba(0, 0, 0, 0.45)'
        overlay.style.zIndex = '9999'
        overlay.addEventListener('click', closeSession)
        document.body.appendChild(overlay)

        const pollClosed = setInterval(() => {
            if (popup.closed) {
                closeSession()
            }
        }, 100)

        session = { popup, overlay, pollClosed }
        popup.focus()
    }

    // Delegated on `document` (rather than binding each matching link once)
    // so this also catches anchors rendered after this script ran - e.g.
    // Nuxt's client-side route navigation swapping in a new CtaSignUp link
    // without a full page load.
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href*="/account/create"]')
        if (!link) {
            return
        }

        const isDesktopOrTablet = window.matchMedia('(min-width: 768px)').matches
        if (!isDesktopOrTablet) {
            return
        }

        event.preventDefault()

        // Explicit signal for the product to key its popup-specific
        // layout off, instead of `window.opener` — that's also set for
        // an ordinary ctrl/cmd-click "open in new tab", which isn't
        // this popup at all.
        const popupUrl = new URL(link.href)
        popupUrl.searchParams.set('context', 'popup')

        openPopup(popupUrl.href)
    })

    // Deliberate trade-off, not an oversight: closing on any window focus
    // (e.g. switching tabs/apps and coming back) can cancel an in-progress,
    // not-yet-submitted sign-up. That's judged preferable to the
    // alternative - the popup falling behind this window with no auto-close,
    // which leaves the overlay covering the page with no visible popup and
    // no clear reason why, reading as the site being stuck rather than a
    // sign-up that's still open one window over. Nothing of substance is
    // lost by closing early here: this only ever covers the initial,
    // unsubmitted form step. Added once (not per click) so listeners don't
    // accumulate across retries.
    window.addEventListener('focus', closeSession)
})
