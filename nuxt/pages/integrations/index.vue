<script setup>
import { INTEGRATION_CATEGORIES } from '../../types/integrations'
import { fetchCatalogue } from '../../utils/integrations'
import { SITE_URL } from '../../utils/seo'

const PAGE_URL = `${SITE_URL}/integrations/`
const TITLE = 'Integrations • FlowFuse'
const DESCRIPTION = 'Explore the list of integrations and modules available for your Node-RED projects. Created (and curated) by FlowFuse and the Node-RED community.'

useFlowFuseSeo({ title: TITLE, description: DESCRIPTION, url: PAGE_URL })

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 30

const catalogue = shallowRef(null)

onMounted(async () => {
    if (route.query.certified === '1') filterCertified.value = true
    const raw = await fetchCatalogue()
    const enriched = raw.map(n => ({ ...n, _idLc: n._id.toLowerCase() }))
    enriched.sort((a, b) => {
        if (a.ffCertified && !b.ffCertified) return -1
        if (!a.ffCertified && b.ffCertified) return 1
        return (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)
    })
    catalogue.value = enriched
})

const certifiedCount = computed(
    () => (catalogue.value ?? []).filter(n => n.ffCertified).length
)

const generatedIds = computed(() => {
    const list = catalogue.value ?? []
    const byDownloads = [...list].sort((a, b) => (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0))
    const ids = new Set(byDownloads.slice(0, 50).map(n => n._id))
    list.forEach(n => { if (n.ffCertified) ids.add(n._id) })
    return ids
})

const filterCertified = ref(false)
const selectedCategories = ref(new Set())
const searchText = ref('')
const searchQuery = ref('')
let searchTimer = null
watch(searchText, (val) => {
    if (searchTimer) clearTimeout(searchTimer)
    searchTimer = setTimeout(() => { searchQuery.value = val }, 200)
})
const currentPage = ref(0)

function toggleCertified () {
    setCertified(!filterCertified.value)
}

function setCertified (next) {
    filterCertified.value = !!next
    currentPage.value = 0
    syncUrl()
}

function toggleCategory (key) {
    if (selectedCategories.value.has(key)) {
        selectedCategories.value.delete(key)
    } else {
        selectedCategories.value.add(key)
    }
    selectedCategories.value = new Set(selectedCategories.value)
    currentPage.value = 0
}

function syncUrl () {
    const query = { ...route.query }
    if (filterCertified.value) {
        query.certified = '1'
    } else {
        delete query.certified
    }
    router.replace({ query })
}

const filtered = computed(() => {
    const search = searchQuery.value.toLowerCase()
    return (catalogue.value ?? []).filter((node) => {
        if (filterCertified.value && !node.ffCertified) return false
        if (selectedCategories.value.size > 0) {
            // AND across categories: a node must have every checked category.
            for (const key of selectedCategories.value) {
                if (!node.categories?.includes(key)) return false
            }
        }
        if (search && !node._idLc.includes(search)) return false
        return true
    })
})

const maxPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const pageNodes = computed(() =>
    filtered.value.slice(currentPage.value * PAGE_SIZE, (currentPage.value + 1) * PAGE_SIZE)
)

function changePage (diff) {
    const next = currentPage.value + diff
    if (next < 0 || next >= maxPage.value) return
    currentPage.value = next
}

watch(filtered, () => {
    if (currentPage.value >= maxPage.value) currentPage.value = 0
})
</script>

<template>
    <div class="w-full px-6 page hero catalog-hero">
        <div class="container m-auto text-center flex py-8 max-w-lg md:max-w-6xl">
            <div class="text-left w-full">
                <h1>Integrations</h1>
                <p class="md:w-9/12">
                    Explore the list of integrations and modules available for your Node-RED projects. Created (and curated) by FlowFuse and the Node-RED community.
                </p>
            </div>
        </div>
        <div>
            <IntegrationsCertifiedHero
                :count="catalogue ? certifiedCount : null"
                :pressed="filterCertified"
                @toggle="toggleCertified"
            />
            <div class="container m-auto text-left md:max-w-6xl pt-8 pb-12 w-full ff-full-bg gap-4 flex">
                <div class="catalogue-filters w-52 shrink-0 hidden md:block">
                    <h2 class="catalogue-filters--heading">Filters</h2>
                    <ul>
                        <li>
                            <input
                                id="catalogue-filter-certified"
                                type="checkbox"
                                :checked="filterCertified"
                                @change="setCertified($event.target.checked)"
                            />
                            <label class="inline-flex gap-1 items-center" for="catalogue-filter-certified">
                                FlowFuse Certified
                                <IntegrationsCertifiedIcon />
                            </label>
                        </li>
                    </ul>
                    <h2 class="catalogue-filters--heading">Categories</h2>
                    <ul id="catalogue-filter--categories">
                        <li v-for="(label, key) in INTEGRATION_CATEGORIES" :key="key">
                            <input
                                :id="`catalogue-filter-${key}`"
                                type="checkbox"
                                :checked="selectedCategories.has(String(key))"
                                @change="toggleCategory(String(key))"
                            />
                            <label :for="`catalogue-filter-${key}`">{{ label }}</label>
                        </li>
                    </ul>
                </div>
                <div class="grow max-md:max-w-lg mx-auto">
                    <label for="search-catalogue" class="sr-only">Search integrations</label>
                    <input
                        id="search-catalogue"
                        v-model="searchText"
                        class="catalogue-search"
                        type="search"
                        placeholder="Search Integrations"
                    />
                    <!-- aria-live container must exist at hydration so SR can announce updates. -->
                    <div class="catalogue-meta" aria-live="polite" aria-atomic="true" role="status">
                        <div v-if="catalogue"><span>{{ filtered.length }}</span> Integrations</div>
                    </div>
                    <ClientOnly>
                        <ul v-if="!catalogue" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-hidden="true">
                            <IntegrationsCardSkeleton v-for="i in 6" :key="i" />
                        </ul>
                        <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <IntegrationsCard
                                v-for="node in pageNodes"
                                :key="node._id"
                                :node="node"
                                :generated-ids="generatedIds"
                            />
                        </ul>
                    </ClientOnly>
                    <nav aria-label="Integrations pagination" class="pagination mt-4">
                        <ol class="flex flex-row w-full justify-between text-gray-600">
                            <li>
                                <button
                                    class="flex md:flex-initial w-40 justify-start pl-2 ff-nav-blog-p bg-transparent border-none cursor-pointer"
                                    :class="{ 'opacity-0 pointer-events-none': currentPage === 0 }"
                                    aria-label="Previous page"
                                    @click="changePage(-1)"
                                >
                                    PREVIOUS
                                </button>
                            </li>
                            <li>
                                <span>{{ currentPage + 1 }}</span> of <span>{{ maxPage }}</span>
                            </li>
                            <li>
                                <button
                                    class="flex md:flex-initial w-40 justify-end pr-2 ff-nav-blog-n bg-transparent border-none cursor-pointer"
                                    :class="{ 'opacity-0 pointer-events-none': currentPage + 1 >= maxPage }"
                                    aria-label="Next page"
                                    @click="changePage(1)"
                                >
                                    NEXT
                                </button>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
