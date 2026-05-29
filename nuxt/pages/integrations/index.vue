<script setup>
import { INTEGRATION_CATEGORIES } from '~/types/integrations'
import { fetchCatalogue } from '~/utils/integrations'
import { SITE_URL, OG_IMAGE, buildJsonLd } from '~/utils/seo'

const PAGE_URL = `${SITE_URL}/integrations/`
const TITLE = 'Integrations • FlowFuse'
const DESCRIPTION = 'Explore the list of integrations and modules available for your Node-RED projects. Created (and curated) by FlowFuse and the Node-RED community.'

useSeoMeta({
    title: TITLE,
    description: DESCRIPTION,
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: PAGE_URL,
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
    twitterImage: OG_IMAGE,
    twitterDescription: ''
})

useHead({
    link: [{ rel: 'canonical', href: PAGE_URL }],
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify(buildJsonLd({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }))
    }]
})

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 30

// Client-side fetch: avoids inlining ~6000 nodes (~1.2MB) into the page payload.
// Matches the previous Eleventy behaviour of loading the catalog after first paint.
const catalogue = ref(null)

onMounted(async () => {
    // Apply URL state on the client (after hydration) to keep SSR HTML stable.
    if (route.query.certified === '1') filterCertified.value = true
    catalogue.value = await fetchCatalogue()
})

const certifiedCount = computed(
    () => (catalogue.value ?? []).filter(n => n.ffCertified).length
)

// IDs that have generated detail pages on this site (certified + top 50)
const generatedIds = computed(() => {
    const list = catalogue.value ?? []
    const top = [...list].sort((a, b) => (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)).slice(0, 50)
    const ids = new Set(top.map(n => n._id))
    list.forEach(n => { if (n.ffCertified) ids.add(n._id) })
    return ids
})

// --- filter / search / pagination state ---
// Initial value must match SSR (always false) to avoid a hydration mismatch on
// direct loads of /integrations/?certified=1. The query is read in onMounted
// below so client and server agree at hydration time.
const filterCertified = ref(false)
const selectedCategories = ref(new Set())
const searchText = ref('')
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

// --- derived state: filtered + paginated ---
const filtered = computed(() => {
    const search = searchText.value.toLowerCase()
    const list = (catalogue.value ?? []).filter((node) => {
        if (filterCertified.value && !node.ffCertified) return false
        if (selectedCategories.value.size > 0) {
            // AND semantics: every checked category must be present on the node
            // (matches the deleted Eleventy index.njk behaviour).
            for (const key of selectedCategories.value) {
                if (!node.categories?.includes(key)) return false
            }
        }
        if (search && !node._id.toLowerCase().includes(search)) return false
        return true
    })
    list.sort((a, b) => {
        if (a.ffCertified && !b.ffCertified) return -1
        if (!a.ffCertified && b.ffCertified) return 1
        return (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)
    })
    return list
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

// keep currentPage in range if filters change
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
                    <label>Filters</label>
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
                    <label>Categories</label>
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
                    <input
                        id="search-catalogue"
                        v-model="searchText"
                        class="catalogue-search"
                        type="text"
                        placeholder="Search Integrations"
                    />
                    <div class="catalogue-meta" aria-live="polite" aria-atomic="true">
                        <div v-if="catalogue"><span>{{ filtered.length }}</span> Integrations</div>
                    </div>
                    <ClientOnly>
                        <ul v-if="!catalogue" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-hidden="true">
                            <IntegrationsIntegrationCardSkeleton v-for="i in 6" :key="i" />
                        </ul>
                        <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <IntegrationsIntegrationCard
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
