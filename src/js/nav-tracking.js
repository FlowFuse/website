/**
 * Navigation click tracking.
 *
 * Autocapture cannot answer the questions we actually ask about the nav:
 *
 *   - It has no notion of zone, so "header or footer or utility bar?" is only
 *     answerable by pattern-matching Tailwind class names in elements_chain,
 *     which breaks on every markup rewrite.
 *   - It normalises an `https://app.flowfuse.com` href to an empty path, so a
 *     Sign In click is indistinguishable from a click on a non-link element.
 *     Free Trial (`/account/create`) and Sign In therefore cannot be told apart
 *     without hand-parsing hrefs.
 *
 * This emits one explicit `nav-click` event per navigation-chrome link, carrying
 * the zone, the mega-panel/footer section, and the resolved destination. The
 * zone and section come from `data-nav-zone` / `data-nav-section` attributes
 * rather than styling classes, so the instrumentation survives a restyle.
 *
 * Served at /js/nav-tracking.js on both stacks from this single source: 11ty
 * passes it through, and the Nuxt build copies the 11ty output into
 * nuxt/public/ (see the prod:eleventy-nuxt script).
 */
(function () {
    'use strict'

    // Matches the md: breakpoint at which the header collapses into the drawer.
    var MOBILE_BREAKPOINT = 768

    // A single scripted session once moved a headline nav metric by 30
    // percentage points through autocapture alone. Capping the explicit event
    // means no one visitor can dominate a nav insight; nav_click_index below
    // lets a query tighten the cap further without a code change.
    var MAX_PER_PAGEVIEW = 25

    var emitted = 0

    function inheritedAttr (el, name) {
        var owner = el.closest('[' + name + ']')
        return owner ? owner.getAttribute(name) : null
    }

    function destinationOf (link) {
        // Resolve against the current page so a bare path, a protocol-relative
        // href and a fully-qualified URL all normalise the same way. Host and
        // path stay separate: that is what keeps Sign In (app.flowfuse.com + /)
        // distinct from Free Trial (app.flowfuse.com + /account/create).
        var href = link.getAttribute('href') || ''
        try {
            var url = new URL(href, window.location.href)
            return {
                host: url.host,
                path: url.pathname + url.hash,
                external: url.host !== window.location.host
            }
        } catch (e) {
            return { host: '', path: href, external: false }
        }
    }

    document.addEventListener('click', function (event) {
        // capture() is consent-gated and defined in analytics/body.html; it is a
        // no-op without analytics consent and may not exist at all.
        if (typeof capture !== 'function') return
        if (emitted >= MAX_PER_PAGEVIEW) return

        var target = event.target
        if (!target || typeof target.closest !== 'function') return

        var link = target.closest('a[href]')
        if (!link) return

        var zone = inheritedAttr(link, 'data-nav-zone')
        if (!zone) return

        // The mobile drawer reuses the header markup, so viewport width is the
        // only thing separating a drawer tap from a desktop nav click.
        var position = (zone === 'header' && window.innerWidth < MOBILE_BREAKPOINT) ? 'mobile' : zone

        var destination = destinationOf(link)
        emitted++

        capture('nav-click', {
            position: position,
            section: inheritedAttr(link, 'data-nav-section'),
            destination: destination.path,
            destination_host: destination.host,
            external: destination.external,
            label: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
            nav_click_index: emitted,
            page: window.location.pathname
        })
    }, true)
})()
