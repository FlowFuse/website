// Docs and handbook pages turn on Nuxt's view transitions (definePageMeta), so their search
// field can move between the docs home's hero and a page's sidebar. The rest of the page
// swaps at once, as it does without a transition: assets/css/style.css drops the page-wide
// cross-fade while <html> carries `ff-section-transition`, and draws the moving field's frame
// while it carries `ff-search-transition`.
import { SEARCH_TRANSITION_NAME, isInViewport } from '~/utils/viewTransition'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:view-transition:start', (transition) => {
        const html = document.documentElement
        html.classList.add('ff-section-transition', 'ff-search-transition')

        // The outgoing page is captured on the next frame, after this hook. A search field
        // scrolled out of view would fly in from off screen, so it is left out.
        const offscreen = [...document.querySelectorAll<HTMLElement>('[data-ff-search-morph]')]
            .filter(el => el.style.viewTransitionName === SEARCH_TRANSITION_NAME && !isInViewport(el))
        offscreen.forEach(el => { el.style.viewTransitionName = 'none' })

        transition.finished.catch(() => {}).finally(() => {
            html.classList.remove('ff-section-transition', 'ff-search-transition')
            offscreen.forEach(el => { el.style.viewTransitionName = SEARCH_TRANSITION_NAME })
        })
    })
})
