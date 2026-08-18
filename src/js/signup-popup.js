// Opens the sign-up page in a small popup window on desktop/tablet, centered
// over the visible page content, with a dark overlay behind it.
// On mobile, leaves the link's default navigation untouched.
document.addEventListener('DOMContentLoaded', () => {
    let overlay = null

    function showOverlay (popup) {
        overlay = document.createElement('div')
        overlay.setAttribute('id', 'signup-popup-overlay')
        overlay.style.position = 'fixed'
        overlay.style.inset = '0'
        overlay.style.background = 'rgba(0, 0, 0, 0.45)'
        overlay.style.zIndex = '9999'
        overlay.addEventListener('click', () => {
            if (!popup.closed) {
                popup.close()
            }
            hideOverlay()
        })
        document.body.appendChild(overlay)
    }

    function hideOverlay () {
        if (overlay) {
            overlay.remove()
            overlay = null
        }
    }

    document.querySelectorAll('a[href*="/account/create"]').forEach((link) => {
        link.addEventListener('click', (event) => {
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
                popupUrl.href,
                'flowfuse-signup',
                `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
            )

            if (!popup) {
                return
            }

            showOverlay(popup)
            popup.focus()

            const pollClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(pollClosed)
                    hideOverlay()
                }
            }, 100)

            // On macOS (and similar window managers), the first click on an
            // unfocused window only refocuses it — it doesn't reach the
            // overlay's own click handler. That refocus fires this 'focus'
            // event immediately, so treat it as the "click outside" signal:
            // close the popup and drop the overlay right away, in one click.
            window.addEventListener('focus', () => {
                if (!overlay) {
                    return
                }
                if (!popup.closed) {
                    popup.close()
                }
                clearInterval(pollClosed)
                hideOverlay()
            })
        })
    })
})
