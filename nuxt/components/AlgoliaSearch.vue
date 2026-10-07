<script setup lang="ts">
import { SEARCH_TRANSITION_NAME, canViewTransition, isInViewport } from '~/utils/viewTransition'

// Algolia autocomplete over the shared `prod_netlify` index. The index is built by
// scripts/index-algolia.js, which scans nuxt/dist after the Nuxt build and derives
// `category` from the first path segment, so /handbook/* and /docs/* are both covered.
const props = withDefaults(defineProps<{
    /** Algolia filter expression, e.g. `category:docs`. Omit to search everything. */
    indexFilter?: string
    placeholder?: string
    sourceId?: string
    /** Render a search button that opens the results in a dialog, at every screen width. */
    detached?: boolean
    /** Open it with Cmd+K / Ctrl+K and from a `ff-docs-search:open` window event. Needs `detached`. */
    shortcut?: boolean
    /** `lg` is the taller search field of a landing page's hero. Needs `detached`. */
    size?: 'md' | 'lg'
    /**
     * Move the field with a view transition: it grows into the search dialog when that opens
     * and back when it closes, and moves between pages that turn view transitions on. Needs
     * `detached`.
     */
    morph?: boolean
}>(), {
    placeholder: 'Search...',
    sourceId: 'content',
    detached: false,
    shortcut: false,
    size: 'md',
    morph: false,
})

const root = ref<HTMLElement>()
const canMorph = () => props.detached && props.morph && canViewTransition() && !!root.value && isInViewport(root.value)

/** Resolves to what `find` returns once it returns something, or to null after about half a second. */
async function waitFor<T> (find: () => T | null | undefined): Promise<T | null> {
    for (let i = 0; i < 30; i++) {
        const found = find()
        if (found) return found
        await new Promise(resolve => setTimeout(resolve, 16))
    }
    return null
}

// Our own clicks on autocomplete's buttons pass straight through the capturing listeners below.
let passThrough = false
function press (button: HTMLElement) {
    passThrough = true
    try { button.click() } finally { passThrough = false }
}

const isMac = ref(true)

// Autocomplete arrives from a CDN after the page has rendered. Until it has mounted, a
// detached search shows a stand-in button of the same size, so the field is there from the
// first paint instead of popping in; a click or Cmd+K before then opens the dialog as soon
// as it can.
const ready = ref(false)
let openWhenReady = false

// The field and the floating dialog take turns carrying the shared view-transition-name, so
// the browser grows one into the other; only the dimmed backdrop fades in around it. Autocomplete adds and removes the dialog in an
// animation frame, and frames do not run while a transition holds the page, so the dialog is
// opened (unseen) before the transition starts and only hidden inside it; it is removed after.
// <html> carries `ff-search-opening` / `ff-search-closing` for that (styles below), and
// `ff-search-transition` while the field moves (assets/css/style.css draws its frame).
function setNames (field: string, box: HTMLElement | null, boxName: string) {
    root.value!.style.viewTransitionName = field
    if (box) box.style.viewTransitionName = boxName
}

async function openWithMorph (button: HTMLElement) {
    const html = document.documentElement
    html.classList.add('ff-search-opening')
    press(button)
    const box = await waitFor(() => document.querySelector<HTMLElement>('.ff-search-dialog'))
    if (!box) {
        html.classList.remove('ff-search-opening')
        return
    }
    html.classList.add('ff-search-transition')
    const transition = document.startViewTransition(() => {
        html.classList.remove('ff-search-opening')
        setNames('none', box, SEARCH_TRANSITION_NAME)
    })
    transition.finished.catch(() => {}).finally(() => {
        html.classList.remove('ff-search-transition')
        setNames(SEARCH_TRANSITION_NAME, box, '')
    })
}

function closeWithMorph (box: HTMLElement, cancel: HTMLElement) {
    const html = document.documentElement
    setNames('none', box, SEARCH_TRANSITION_NAME)
    html.classList.add('ff-search-transition')
    const transition = document.startViewTransition(() => {
        html.classList.add('ff-search-closing')
        setNames(SEARCH_TRANSITION_NAME, box, '')
    })
    transition.finished.catch(() => {}).finally(async () => {
        html.classList.remove('ff-search-transition')
        press(cancel)
        await waitFor(() => !document.querySelector('.ff-search-dialog'))
        html.classList.remove('ff-search-closing')
    })
}

function openDialog () {
    if (!ready.value) {
        openWhenReady = true
        return
    }
    const button = searchContainer.value?.querySelector<HTMLElement>('.aa-DetachedSearchButton')
    if (!button) return
    if (canMorph()) openWithMorph(button)
    else press(button)
}

// A click on the field itself opens the dialog through openDialog, so it can morph.
function onFieldClick (e: MouseEvent) {
    if (passThrough || !(e.target as Element).closest('.aa-DetachedSearchButton')) return
    e.preventDefault()
    e.stopImmediatePropagation()
    openDialog()
}

// Closing the dialog (its X, a click beside it, or Escape) morphs it back into the field.
// Choosing a result leaves the page, so that is not caught here.
function onDialogClose (e: Event) {
    const dialog = document.querySelector<HTMLElement>('.ff-search-dialog')
    if (passThrough || !dialog || !canMorph()) return
    const target = e.target as Element
    const closing = (e.type === 'click' && (target.closest('.aa-DetachedCancelButton') || target.classList.contains('aa-DetachedOverlay')))
        || (e.type === 'keydown' && (e as KeyboardEvent).key === 'Escape')
    const cancel = dialog.querySelector<HTMLElement>('.aa-DetachedCancelButton')
    if (!closing || !cancel) return
    e.preventDefault()
    e.stopImmediatePropagation()
    closeWithMorph(dialog, cancel)
}

function onKeydown (e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openDialog()
    }
}

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('ff-docs-search:open', openDialog)
    searchContainer.value?.removeEventListener('click', onFieldClick, true)
    document.removeEventListener('click', onDialogClose, true)
    document.removeEventListener('keydown', onDialogClose, true)
})

const searchContainer = ref<HTMLElement>()

onMounted(async () => {
    if (props.detached && props.morph && root.value) {
        root.value.style.viewTransitionName = SEARCH_TRANSITION_NAME
        searchContainer.value?.addEventListener('click', onFieldClick, true)
        document.addEventListener('click', onDialogClose, true)
        document.addEventListener('keydown', onDialogClose, true)
    }

    if (props.detached && props.shortcut) {
        isMac.value = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
        window.addEventListener('keydown', onKeydown)
        window.addEventListener('ff-docs-search:open', openDialog)
    }

    const loadScript = (src: string, integrity?: string): Promise<void> =>
        new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
            const script = document.createElement('script')
            script.src = src
            if (integrity) { script.integrity = integrity; script.crossOrigin = 'anonymous' }
            script.onload = () => resolve()
            script.onerror = reject
            document.head.appendChild(script)
        })

    const loadLink = (href: string, integrity?: string) => {
        if (document.querySelector(`link[href="${href}"]`)) return
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        if (integrity) { link.integrity = integrity; link.crossOrigin = 'anonymous' }
        document.head.appendChild(link)
    }

    loadLink('https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/reset-min.css', 'sha256-KvFgFCzgqSErAPu6y9gz/AhZAvzK48VJASu3DpNLCEQ=')
    loadLink('https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic@1.6.1')

    await loadScript(
        'https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch-lite.umd.js',
        'sha256-b2n6oSgG4C1stMT/yc/ChGszs9EY/Mhs6oltEjQbFCQ='
    )
    await loadScript('https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.6.1')

    const win = window as any
    const { autocomplete, getAlgoliaResults } = win['@algolia/autocomplete-js']
    const searchClient = win.algoliasearch('ISKYOHIT7D', '68d4032f487d66423c37e6483e067272')

    const initialHitsPerPage = 5
    let hitsPerPage = initialHitsPerPage
    let prevQuery = ''
    let totalHits = 0

    autocomplete({
        container: searchContainer.value!,
        placeholder: props.placeholder,
        // An empty media query matches every width, so the input is always a button that
        // opens the dialog: centred on wide screens, full screen on narrow ones (the theme's
        // --aa-detached-modal-media-query decides which).
        // The dialog carries its own class, so its styles below leave the other searches'
        // phone dialogs alone. Its close button reads "Close" to a screen reader and shows an X.
        ...(props.detached ? {
            detachedMediaQuery: '',
            classNames: { detachedContainer: 'ff-search-dialog' },
            translations: { detachedCancelButtonText: 'Close' },
        } : {}),
        getSources ({ query }: { query: string }) {
            if (query !== prevQuery) {
                prevQuery = query
                hitsPerPage = initialHitsPerPage
            }
            return [{
                sourceId: props.sourceId,
                getItems: () => getAlgoliaResults({
                    searchClient,
                    queries: [{
                        indexName: 'prod_netlify',
                        params: { query, hitsPerPage, attributesToSnippet: ['content:50'] },
                        attributesToHighlight: '*',
                        filters: props.indexFilter
                    }],
                    transformResponse ({ hits, results }: any) {
                        totalHits = results[0].nbHits
                        return hits
                    }
                }),
                templates: {
                    item ({ item, components, html }: any) {
                        return html`
                            <a href="#" data-href="${item.url}" class="aa-ItemWrapper">
                                <div class="aa-ItemContent">
                                    ${item.image ? html`<div class="aa-ItemIcon aa-ItemIcon--alignTop">
                                        <img src="#" data-src="${item.image}" alt="${item.name}" width="40" height="40" />
                                    </div>` : ''}
                                    <div class="aa-ItemContentBody">
                                        <div class="aa-ItemContentTitle">
                                            ${components.Highlight({ hit: item, attribute: ['hierarchy', 'lvl0'] })}
                                        </div>
                                        <div class="aa-ItemContentSubTitle ${item.type === 'lvl0' ? 'hidden' : ''}">
                                            ${components.Highlight({ hit: item, attribute: ['hierarchy', item.type] })}
                                        </div>
                                        <div class="aa-ItemContentDescription">
                                            ${item.content?.trim().length > 0
                                                ? components.Snippet({ hit: item, attribute: 'content' })
                                                : components.Snippet({ hit: item, attribute: 'description' })}
                                        </div>
                                    </div>
                                </div>
                            </a>`
                    },
                    footer ({ items, html }: any) {
                        if (!items.length || items.length >= totalHits) return null
                        return html`<button type="button" class="aa-LoadMore load-more-btn">Load more...</button>`
                    }
                }
            }]
        },
        onStateChange ({ refresh }: any) {
            document.querySelectorAll('.aa-Panel a').forEach((el: any) => {
                el.href = el.getAttribute('data-href')
            })
            document.querySelectorAll('.aa-Panel img').forEach((img: any) => {
                img.src = img.getAttribute('data-src')
            })
            const btn = document.querySelector<HTMLElement>('.load-more-btn')
            if (btn) {
                btn.onclick = (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    hitsPerPage += initialHitsPerPage
                    refresh()
                }
            }
        }
    })

    ready.value = true
    if (openWhenReady) {
        openWhenReady = false
        // Autocomplete renders its button a frame or two after it is set up.
        for (let i = 0; i < 30 && !searchContainer.value?.querySelector('.aa-DetachedSearchButton'); i++) {
            await new Promise(resolve => requestAnimationFrame(resolve))
        }
        openDialog()
    }
})
</script>

<template>
  <div
    ref="root"
    class="ff-algolia"
    :class="{ 'ff-algolia--detached': detached, 'ff-algolia--lg': detached && size === 'lg' }"
    :data-ff-search-morph="detached && morph ? '' : undefined"
  >
    <div ref="searchContainer" id="algolia-search" :class="detached ? '' : 'border border-gray-200 rounded'"></div>
    <button v-if="detached && !ready" type="button" class="ff-algolia__standin" @click="openDialog">
      <svg class="ff-algolia__standin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <span>{{ placeholder }}</span>
    </button>
    <kbd v-if="detached && shortcut" class="ff-algolia__kbd" aria-hidden="true">{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
  </div>
</template>

<style scoped>
.ff-algolia--detached {
    position: relative;
}

/* The search button reads as a search field, with the shortcut shown at its right edge.
   The id is in the selector because src/css/algolia-theme.css strips the border and padding
   from `#algolia-search .aa-DetachedSearchButton`, and an id outranks the classes alone. */
.ff-algolia--detached :deep(#algolia-search .aa-DetachedSearchButton) {
    width: 100%;
    height: 2.5rem;
    /* Room on the right for the shortcut hint ("Ctrl K" is the wider one). */
    padding: 0 3.5rem 0 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #fff;
    font-size: 0.875rem;
    color: #6b7280;
    cursor: pointer;
}

.ff-algolia--detached :deep(#algolia-search .aa-DetachedSearchButton:hover) {
    border-color: #a5b4fc;
}

/* One line in a narrow sidebar: a placeholder too long for it ends in an ellipsis rather
   than wrapping inside the field. */
.ff-algolia--detached :deep(.aa-DetachedSearchButtonPlaceholder),
.ff-algolia__standin span {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

/* Stands in for the search button until autocomplete has mounted (see `ready`). */
.ff-algolia__standin {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    height: 2.5rem;
    padding: 0 3.5rem 0 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #fff;
    font-size: 0.875rem;
    color: #6b7280;
    text-align: left;
    cursor: pointer;
}

.ff-algolia__standin-icon {
    width: 1rem;
    height: 1rem;
    color: #777;
    flex-shrink: 0;
}

.ff-algolia--lg .ff-algolia__standin {
    height: 3rem;
    padding-left: 1.25rem;
    gap: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
}

.ff-algolia--lg :deep(#algolia-search .aa-DetachedSearchButton) {
    height: 3rem;
    padding-left: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
}

.ff-algolia__kbd {
    position: absolute;
    top: 50%;
    right: 0.625rem;
    transform: translateY(-50%);
    pointer-events: none;
    font-family: inherit;
    font-size: 0.7rem;
    line-height: 1;
    color: #6b7280;
    padding: 0.25rem 0.375rem;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    background: #f9fafb;
}
</style>

<style>
/* The dialog is appended to <body>, outside this component, so this is not scoped. */
/* Opened unseen just before the field morphs into it, and hidden while it morphs back
   (see openWithMorph and closeWithMorph). Opacity, not visibility, so its input can still
   take focus. */
html.ff-search-opening .aa-DetachedOverlay {
    opacity: 0;
}

html.ff-search-closing .aa-DetachedOverlay {
    display: none;
}

/* While the dialog is open the field has become its search box, so it is not also left behind
   on the page. It shows again for the moments it morphs from and back to. */
body.aa-Detached [data-ff-search-morph] {
    visibility: hidden;
}

html.ff-search-opening body.aa-Detached [data-ff-search-morph],
html.ff-search-closing body.aa-Detached [data-ff-search-morph] {
    visibility: visible;
}

.ff-search-dialog.aa-DetachedContainer--modal {
    top: 12vh;
}

/* The input sits flat in the dialog header, above the header's own divider: no box and no
   focus ring around it, since the caret already shows where typing goes. */
.ff-search-dialog .aa-Form,
.ff-search-dialog .aa-Form:focus-within {
    border: 0;
    box-shadow: none;
}

.ff-search-dialog .aa-SubmitIcon {
    color: #6b7280;
}

/* The close X is the only X in the header, so the input's own clear button stays out. */
.ff-search-dialog .aa-ClearButton {
    display: none;
}

.ff-search-dialog .aa-DetachedCancelButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    margin: auto 0 auto 0.25rem;
    padding: 0;
    border-radius: 6px;
    color: #374151;
    /* The word stays for screen readers; the X below is what shows. */
    font-size: 0;
}

.ff-search-dialog .aa-DetachedCancelButton::before {
    content: '';
    width: 1.25rem;
    height: 1.25rem;
    background: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M18 6 6 18M6 6l12 12'/%3E%3C/svg%3E") center / contain no-repeat;
}

.ff-search-dialog .aa-DetachedCancelButton:hover {
    background: #f3f4f6;
}

.ff-search-dialog .aa-DetachedCancelButton:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}
</style>
