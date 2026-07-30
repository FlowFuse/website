<script setup lang="ts">
import { INTEGRATION_CATEGORIES, type CertifiedCollection, type IntegrationCatalogEntry } from '../../types/integrations'
import { fetchCatalogue } from '../../utils/integrations'
import { nodeProducts } from '../../utils/integrations-ui'

type CatalogueNode = IntegrationCatalogEntry & { _idLc: string }
type ProductFilter = 'all' | CertifiedCollection

useHead({ title: 'Integrations • FlowFuse' })

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 30
const catalogue = shallowRef<CatalogueNode[] | null>(null)

const tierRank = (n: CatalogueNode) => (n.tier === 'certified' ? 0 : n.tier === 'recommended' ? 1 : 2)

const productFilter = ref<ProductFilter>('all')
const showcaseProduct = ref<CertifiedCollection>('hub')
const filterCertified = ref(false)
const selectedCategories = ref<Set<string>>(new Set())
const searchText = ref('')
const searchQuery = ref('')
const currentPage = ref(0)
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchText, (val) => {
    if (searchTimer) clearTimeout(searchTimer)
    searchTimer = setTimeout(() => { searchQuery.value = val; currentPage.value = 0 }, 200)
})

onMounted(async () => {
    if (route.query.product === 'hub' || route.query.product === 'edge') selectProduct(route.query.product)
    if (route.query.certified === '1') filterCertified.value = true
    const raw = await fetchCatalogue()
    const enriched: CatalogueNode[] = raw.map(n => ({ ...n, _idLc: n._id.toLowerCase() }))
    enriched.sort((a, b) => {
        const ra = tierRank(a); const rb = tierRank(b)
        if (ra !== rb) return ra - rb
        const fa = a._id.startsWith('@flowfuse-nodes/') ? 0 : 1
        const fb = b._id.startsWith('@flowfuse-nodes/') ? 0 : 1
        if (fa !== fb) return fa - fb
        return (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)
    })
    catalogue.value = enriched
})

function selectProduct (p: ProductFilter) {
    productFilter.value = p
    if (p === 'hub' || p === 'edge') showcaseProduct.value = p
    currentPage.value = 0
    syncUrl()
}
function toggleProductSegment (p: ProductFilter) {
    selectProduct(productFilter.value === p && p !== 'all' ? 'all' : p)
}

function toggleCategory (key: string) {
    const next = new Set(selectedCategories.value)
    next.has(key) ? next.delete(key) : next.add(key)
    selectedCategories.value = next
    currentPage.value = 0
}
function clearCategories () { selectedCategories.value = new Set(); currentPage.value = 0 }

function syncUrl () {
    const query = { ...route.query }
    if (productFilter.value !== 'all') query.product = productFilter.value; else delete query.product
    if (filterCertified.value) query.certified = '1'; else delete query.certified
    router.replace({ query })
}
watch(filterCertified, () => { currentPage.value = 0; syncUrl() })

const generatedIds = computed(() => {
    const list = catalogue.value ?? []
    const byDownloads = [...list].sort((a, b) => (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0))
    const ids = new Set(byDownloads.slice(0, 50).map(n => n._id))
    list.forEach(n => { if (n.tier === 'recommended') ids.add(n._id) })
    return ids
})

const baseForCounts = computed(() => {
    const search = searchQuery.value.toLowerCase()
    const pf = productFilter.value
    return (catalogue.value ?? []).filter((n) => {
        if (pf !== 'all' && !nodeProducts(n).includes(pf)) return false
        if (filterCertified.value && n.tier !== 'certified') return false
        if (search && !n._idLc.includes(search)) return false
        return true
    })
})
const categoryCounts = computed(() => {
    const counts: Record<string, number> = {}
    baseForCounts.value.forEach(n => n.categories?.forEach((k) => { counts[k] = (counts[k] ?? 0) + 1 }))
    return counts
})
const catalogueCategories = computed(() => {
    const set = new Set<string>()
    ;(catalogue.value ?? []).forEach(n => n.categories?.forEach(k => set.add(k)))
    return set
})
const visibleCategories = computed(() =>
    Object.entries(INTEGRATION_CATEGORIES).filter(([key]) => catalogueCategories.value.has(key))
)

const filtered = computed(() => {
    if (selectedCategories.value.size === 0) return baseForCounts.value
    return baseForCounts.value.filter(n => [...selectedCategories.value].every(k => n.categories?.includes(k)))
})

const maxPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const pageNodes = computed(() => filtered.value.slice(currentPage.value * PAGE_SIZE, (currentPage.value + 1) * PAGE_SIZE))
function changePage (diff: number) {
    const next = currentPage.value + diff
    if (next < 0 || next >= maxPage.value) return
    currentPage.value = next
}
watch(filtered, () => { if (currentPage.value >= maxPage.value) currentPage.value = 0 })

const PRODUCT_OPTIONS: ProductFilter[] = ['all', 'hub', 'edge']
function chipClass (active: boolean, disabled = false) {
    const base = 'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium'
    if (disabled) return [base, 'text-gray-400 cursor-default']
    return [base, 'transition', active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700']
}
</script>

<template>
    <div class="w-full">
        <IntegrationsHero />

        <IntegrationsCertifiedShowcase
            :nodes="catalogue ?? []"
            :product="showcaseProduct"
            @update:product="selectProduct"
        />

        <section class="container m-auto md:max-w-6xl px-4 pt-16">
            <h2>Browse all integrations</h2>
            <p class="mt-1.5 text-gray-500">The full Node-RED library — FlowFuse certified, recommended, and thousands of community nodes.</p>
        </section>

        <!-- Toolbar -->
        <div class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 mt-4">
            <div class="container m-auto md:max-w-6xl px-4 py-3.5">
                <div class="flex items-center gap-3 flex-wrap">
                    <label for="search-catalogue" class="sr-only">Search integrations</label>
                    <div class="flex-1 min-w-60 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                        <svg class="w-4 h-4 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" stroke-linecap="round" /></svg>
                        <input id="search-catalogue" v-model="searchText" type="search" placeholder="Search integrations…" class="w-full bg-transparent text-sm outline-none placeholder:text-gray-500" />
                    </div>
                    <IntegrationsProductToggle :active="productFilter" :options="PRODUCT_OPTIONS" variant="soft" @select="toggleProductSegment" />
                    <USwitch v-model="filterCertified" color="neutral" label="Certified only" />
                </div>
                <div v-if="visibleCategories.length" class="flex items-center gap-1 flex-wrap mt-3">
                    <span class="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">Category</span>
                    <button type="button" :class="chipClass(selectedCategories.size === 0)" @click="clearCategories">All</button>
                    <button
                        v-for="[key, label] in visibleCategories"
                        :key="key"
                        type="button"
                        :disabled="!categoryCounts[key] && !selectedCategories.has(key)"
                        :class="chipClass(selectedCategories.has(key), !categoryCounts[key] && !selectedCategories.has(key))"
                        @click="toggleCategory(key)"
                    >
                        {{ label }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Results -->
        <div class="container m-auto md:max-w-6xl px-4">
            <div class="py-5 text-sm text-gray-500" aria-live="polite" aria-atomic="true" role="status">
                <template v-if="catalogue"><b class="text-gray-900 tabular-nums">{{ filtered.length }}</b> integrations</template>
            </div>
            <ClientOnly>
                <ul v-if="!catalogue" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" aria-hidden="true">
                    <IntegrationsCardSkeleton v-for="i in 6" :key="i" />
                </ul>
                <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    <IntegrationsCard v-for="node in pageNodes" :key="node._id" :node="node" :generated-ids="generatedIds" />
                </ul>
            </ClientOnly>

            <nav aria-label="Integrations pagination" class="pagination mt-6 pb-16">
                <ol class="flex flex-row w-full justify-between text-gray-600">
                    <li>
                        <button class="w-40 flex justify-start pl-2 bg-transparent border-none cursor-pointer font-semibold" :class="{ 'opacity-0 pointer-events-none': currentPage === 0 }" aria-label="Previous page" @click="changePage(-1)">PREVIOUS</button>
                    </li>
                    <li><span>{{ currentPage + 1 }}</span> of <span>{{ maxPage }}</span></li>
                    <li>
                        <button class="w-40 flex justify-end pr-2 bg-transparent border-none cursor-pointer font-semibold" :class="{ 'opacity-0 pointer-events-none': currentPage + 1 >= maxPage }" aria-label="Next page" @click="changePage(1)">NEXT</button>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
</template>
