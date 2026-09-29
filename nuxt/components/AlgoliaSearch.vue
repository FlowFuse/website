<script setup lang="ts">
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
}>(), {
    placeholder: 'Search...',
    sourceId: 'content',
    detached: false,
    shortcut: false,
    size: 'md',
})

const isMac = ref(true)

// Autocomplete arrives from a CDN after the page has rendered. Until it has mounted, a
// detached search shows a stand-in button of the same size, so the field is there from the
// first paint instead of popping in; a click or Cmd+K before then opens the dialog as soon
// as it can.
const ready = ref(false)
let openWhenReady = false

function openDialog () {
    if (!ready.value) {
        openWhenReady = true
        return
    }
    searchContainer.value?.querySelector<HTMLElement>('.aa-DetachedSearchButton')?.click()
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
})

const searchContainer = ref<HTMLElement>()

onMounted(async () => {
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
  <div class="ff-algolia" :class="{ 'ff-algolia--detached': detached, 'ff-algolia--lg': detached && size === 'lg' }">
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
    padding: 0 4rem 0 0.5rem;
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

/* Stands in for the search button until autocomplete has mounted (see `ready`). */
.ff-algolia__standin {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    height: 2.5rem;
    padding: 0 4rem 0 0.75rem;
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
