/**
 * Header dropdown panels: position and open state.
 *
 * Two jobs CSS alone cannot do.
 *
 * 1. ANCHORING. A panel is content-width now, so left-aligning every one of them
 *    to the nav put the Company panel most of the width of the page away from
 *    the word "Company". The panel's left edge follows its trigger instead, and
 *    is pulled back when that would push it off the right of the viewport - a
 *    clamp that needs the measured panel width, so it cannot be a stylesheet
 *    rule.
 *
 * 2. MORPHING BETWEEN MENUS. Moving from one open menu to another should carry
 *    the panel across rather than blink one out and another in. That is a
 *    View Transition, and a view transition needs a state change to animate:
 *    while the panels open on :hover there is no state, only two elements that
 *    happen to be under the pointer at different moments. So this owns the open
 *    state, and hands the swap to document.startViewTransition().
 *    Both panels take the same view-transition-name for the duration, which is
 *    what makes the browser treat them as one element and tween the box.
 *
 * Progressive enhancement: `js-nav` on <html> switches the stylesheet from
 * :hover-driven opening to class-driven opening. Without this file the panels
 * still open on hover exactly as before, just without the anchoring or the
 * morph. Below the md breakpoint none of it applies - that is the drawer.
 *
 * Served at /js/nav-panels.js on both stacks from this single source: 11ty
 * passes it through, and the Nuxt build copies the 11ty output into nuxt/public
 * (see the prod:eleventy-nuxt script), the same route nav-tracking.js takes.
 */
(function () {
    'use strict'

    var MOBILE_BREAKPOINT = 768
    var VIEWPORT_MARGIN = 16
    var TRANSITION_NAME = 'ff-nav-panel'

    var root = document.documentElement
    var nav = null
    var items = []
    var openItem = null
    var closeTimer = null

    function panelOf (item) {
        return item.querySelector('ul.mega')
    }

    function isDesktop () {
        return window.innerWidth >= MOBILE_BREAKPOINT
    }

    /**
     * Put the panel's left edge under its trigger, then pull it back inside the
     * viewport if the panel is wide enough to overhang the right edge. Measured
     * against the nav, because a mega panel's containing block is the nav (its
     * trigger li is position: static so the panel can be wider than the word
     * that opens it).
     */
    function position (item) {
        var panel = panelOf(item)
        if (!panel) return
        var trigger = item.querySelector('.ff-nav-trigger') || item
        var navBox = nav.getBoundingClientRect()
        var triggerBox = trigger.getBoundingClientRect()
        var width = panel.offsetWidth
        var left = triggerBox.left - navBox.left
        var maxLeft = window.innerWidth - VIEWPORT_MARGIN - width - navBox.left
        var minLeft = VIEWPORT_MARGIN - navBox.left
        if (left > maxLeft) left = maxLeft
        if (left < minLeft) left = minLeft
        panel.style.left = Math.round(left) + 'px'
    }

    function applyOpen (item) {
        if (openItem && openItem !== item) openItem.classList.remove('ff-nav-open')
        if (item) {
            position(item)
            item.classList.add('ff-nav-open')
        }
        openItem = item
    }

    /**
     * A swap between two already-open menus is the only case worth animating:
     * opening from nothing and closing to nothing are already a fade in the
     * stylesheet, and running those through a transition would fight it.
     */
    function setOpen (item) {
        if (item === openItem) return
        var swapping = openItem && item
        if (!swapping || !document.startViewTransition) {
            applyOpen(item)
            return
        }
        var from = panelOf(openItem)
        var to = panelOf(item)
        if (!from || !to) {
            applyOpen(item)
            return
        }
        // The same name on both is what makes this a morph rather than a
        // crossfade: the browser matches them as one element and tweens the box.
        from.style.viewTransitionName = TRANSITION_NAME
        var transition = document.startViewTransition(function () {
            from.style.viewTransitionName = ''
            to.style.viewTransitionName = TRANSITION_NAME
            applyOpen(item)
        })
        transition.finished.catch(function () {}).then(function () {
            to.style.viewTransitionName = ''
        })
    }

    function cancelClose () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
    }

    function scheduleClose () {
        cancelClose()
        // A short grace period: the pointer crosses a few pixels of header
        // between a trigger and its panel, and closing on that would make the
        // menu impossible to reach.
        closeTimer = setTimeout(function () { applyOpen(null) }, 120)
    }

    function bind (item) {
        if (!panelOf(item)) return
        item.addEventListener('pointerenter', function () {
            if (!isDesktop()) return
            cancelClose()
            setOpen(item)
        })
        item.addEventListener('pointerleave', function () {
            if (!isDesktop()) return
            scheduleClose()
        })
        item.addEventListener('focusin', function () {
            if (!isDesktop()) return
            cancelClose()
            setOpen(item)
        })
        item.addEventListener('focusout', function (event) {
            if (!isDesktop()) return
            if (!item.contains(event.relatedTarget)) scheduleClose()
        })
    }

    function init () {
        nav = document.querySelector('.ff-header nav')
        if (!nav) return
        items = Array.prototype.slice.call(
            nav.querySelectorAll('#nav-content > li.ff-nav-dropdown'))
        if (!items.length) return

        root.classList.add('js-nav')
        items.forEach(bind)

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') applyOpen(null)
        })

        // A resize can change which trigger a panel should sit under, and can
        // move the clamp. Re-measure the open one rather than leave it stale.
        var resizeTimer
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(function () {
                if (!isDesktop()) { applyOpen(null); return }
                if (openItem) position(openItem)
            }, 60)
        })
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init)
    } else {
        init()
    }
})()
