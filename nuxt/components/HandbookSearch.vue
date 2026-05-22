<script setup lang="ts">
const searchContainer = ref<HTMLElement>()

onMounted(async () => {
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
        placeholder: 'Search in Handbook...',
        getSources ({ query }: { query: string }) {
            if (query !== prevQuery) {
                prevQuery = query
                hitsPerPage = initialHitsPerPage
            }
            return [{
                sourceId: 'handbook',
                getItems: () => getAlgoliaResults({
                    searchClient,
                    queries: [{
                        indexName: 'prod_netlify',
                        params: { query, hitsPerPage, attributesToSnippet: ['content:50'] },
                        attributesToHighlight: '*',
                        filters: 'category:handbook'
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
})
</script>

<template>
  <div ref="searchContainer" class="border rounded"></div>
</template>
