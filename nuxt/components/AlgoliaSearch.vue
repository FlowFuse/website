<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Dimension 2 — restores the 11ty Algolia Autocomplete search box that the Nuxt
// migration dropped. The widget is the @algolia/autocomplete-js@1.6.1 widget
// (NOT @docsearch/js), section-scoped via the `scope` prop (mirrors the old
// <meta property="article:section">). It renders <div id="algolia-search"> so
// the already-shipped src/css/algolia-theme.css applies verbatim, and pulls the
// same pinned CDN scripts + base autocomplete theme the 11ty common-js.njk used.
const props = defineProps({
    scope: { type: String, default: '' },
})

const config = useRuntimeConfig()
const appId = config.public.algoliaAppId
const apiKey = config.public.algoliaApiKey
const indexName = config.public.algoliaIndexName

// Env-gate: render/boot nothing without credentials so local/static builds stay
// clean (no network, no console noise).
const enabled = Boolean(appId && apiKey)

const containerEl = ref(null)
let instance = null

// Pinned CDN URLs — identical versions to the 11ty common-js.njk loader so the
// shipped algolia-theme.css / aa-* classes line up.
const ALGOLIASEARCH_SRC =
    'https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch-lite.umd.js'
const AUTOCOMPLETE_SRC =
    'https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.6.1'
// Base autocomplete theme stylesheets the 11ty layout also loaded — without
// these the .aa-* widget renders unstyled (algolia-theme.css only overrides).
const THEME_CSS = [
    'https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/reset-min.css',
    'https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic@1.6.1',
]

function loadStyle(href) {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing) {
            if (existing.dataset.loaded === 'true') return resolve()
            existing.addEventListener('load', () => resolve())
            existing.addEventListener('error', reject)
            return
        }
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.addEventListener('load', () => {
            s.dataset.loaded = 'true'
            resolve()
        })
        s.addEventListener('error', reject)
        document.head.appendChild(s)
    })
}

const scopeTitles = {
    ama: 'Ask Me Anything',
    blog: 'Blog',
    changelog: 'Changelog',
    'customer-stories': 'Customer Stories',
    docs: 'Docs',
    ebooks: 'E-Books',
    handbook: 'Handbook',
    'node-red': 'Node-RED',
    webinars: 'Webinars',
}

function initSearchBar() {
    const searchScope = props.scope || ''
    const { autocomplete, getAlgoliaResults } =
        window['@algolia/autocomplete-js']
    // algoliasearch-lite UMD exposes a global `algoliasearch`.
    const searchClient = window.algoliasearch(appId, apiKey)

    const placeholder = Object.prototype.hasOwnProperty.call(
        scopeTitles,
        searchScope,
    )
        ? `Search in ${scopeTitles[searchScope]}...`
        : 'Search...'

    const initialHitsPerPage = 5
    const hitsPerPageMap = {}
    let initialQuery = ''

    const createSource = (client, query, scope) => {
        let totalHits = 0
        if (!hitsPerPageMap[scope]) hitsPerPageMap[scope] = initialHitsPerPage

        const filters = scope.length === 0 ? undefined : `category:${scope}`

        return {
            sourceId: scope,
            getItems: () =>
                getAlgoliaResults({
                    searchClient: client,
                    queries: [
                        {
                            indexName,
                            params: {
                                query,
                                hitsPerPage: hitsPerPageMap[scope],
                                attributesToSnippet: ['content:50'],
                            },
                            attributesToHighlight: '*',
                            filters,
                        },
                    ],
                    transformResponse({ hits, results }) {
                        totalHits = results[0].nbHits
                        return hits
                    },
                }),
            templates: {
                header({ html }) {
                    if (
                        !Object.prototype.hasOwnProperty.call(scopeTitles, scope)
                    ) {
                        return null
                    }
                    return html`
                        <span class="aa-SourceHeaderTitle"
                            >In ${scopeTitles[scope]}</span
                        >
                        <div class="aa-SourceHeaderLine" />
                    `
                },
                item({ item, components, html }) {
                    return html`<a
                        href="#"
                        data-href="${item.url}"
                        class="aa-ItemWrapper"
                    >
                        <div class="aa-ItemContent">
                            <div class="aa-ItemIcon aa-ItemIcon--alignTop">
                                <img
                                    src="#"
                                    data-src="${item.image}"
                                    alt="${item.name}"
                                    width="40"
                                    height="40"
                                />
                            </div>
                            <div class="aa-ItemContentBody">
                                <div class="aa-ItemContentTitle">
                                    ${components.Highlight({
                                        hit: item,
                                        attribute: ['hierarchy', 'lvl0'],
                                    })}
                                </div>
                                <div
                                    class="aa-ItemContentSubTitle ${item.type ===
                                    'lvl0'
                                        ? 'hidden'
                                        : ''}"
                                >
                                    ${components.Highlight({
                                        hit: item,
                                        attribute: ['hierarchy', item.type],
                                    })}
                                </div>
                                <div class="aa-ItemContentDescription">
                                    ${item.content &&
                                    item.content.trim().length > 0
                                        ? components.Snippet({
                                              hit: item,
                                              attribute: 'content',
                                          })
                                        : components.Snippet({
                                              hit: item,
                                              attribute: 'description',
                                          })}
                                </div>
                            </div>
                        </div>
                    </a>`
                },
                footer({ items, html }) {
                    if (items.length === 0 || items.length >= totalHits) {
                        return null
                    }
                    return html`<button
                        type="button"
                        data-scope="${scope}"
                        id="load-more"
                        class="aa-LoadMore load-more-btn"
                    >
                        Load more...
                    </button>`
                },
            },
        }
    }

    instance = autocomplete({
        debug: false,
        container: containerEl.value,
        placeholder,
        getSources({ query }) {
            if (query !== initialQuery) {
                initialQuery = query
                for (const key in hitsPerPageMap) {
                    hitsPerPageMap[key] = initialHitsPerPage
                }
            }
            if (searchScope === 'docs') {
                return [
                    createSource(searchClient, query, 'docs'),
                    createSource(searchClient, query, 'node-red'),
                ]
            }
            return [createSource(searchClient, query, searchScope)]
        },
        onStateChange() {
            document.querySelectorAll('.aa-Panel a').forEach((el) => {
                el.href = el.getAttribute('data-href')
            })
            document.querySelectorAll('.aa-Panel img').forEach((img) => {
                img.src = img.getAttribute('data-src')
            })
            document.querySelectorAll('.load-more-btn').forEach((btn) => {
                btn.onclick = (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const scope = e.target.getAttribute('data-scope')
                    if (scope) {
                        hitsPerPageMap[scope] =
                            (hitsPerPageMap[scope] || initialHitsPerPage) +
                            initialHitsPerPage
                    }
                    instance && instance.refresh()
                }
            })
        },
    })
}

onMounted(async () => {
    if (!enabled || !containerEl.value) return
    try {
        THEME_CSS.forEach(loadStyle)
        await loadScript(ALGOLIASEARCH_SRC)
        await loadScript(AUTOCOMPLETE_SRC)
        if (containerEl.value) initSearchBar()
    } catch {
        // Network/CDN failure: leave the empty container; do not throw.
    }
})

onBeforeUnmount(() => {
    if (instance) {
        try {
            instance.destroy()
        } catch {
            /* ignore */
        }
        instance = null
    }
})
</script>

<template>
  <ClientOnly>
    <div v-if="enabled" ref="containerEl" id="algolia-search" class="border rounded"></div>
  </ClientOnly>
</template>
