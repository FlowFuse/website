<script setup>
import indexData from '../../integrations.index.json'

// Nodes that have generated detail pages on this site (certified + top-50 frozen set).
const generatedNodeIds = new Set(indexData.integrations.map((i) => i.id))

useHead({
    title: 'Integrations • FlowFuse',
    meta: [
        {
            name: 'description',
            content:
                'Explore the list of integrations and modules available for your Node-RED projects. Created (and curated) by FlowFuse and the Node-RED community.',
        },
    ],
})

const CATEGORY_FILTERS = [
    ['ai', 'AI'],
    ['communication', 'Communication'],
    ['data-and-analytics', 'Data & Analysis'],
    ['database', 'Database'],
    ['hardware', 'Hardware'],
    ['home-automation', 'Home Automation'],
    ['industrial', 'Industrial'],
    ['security', 'Security'],
    ['storage', 'Storage'],
    ['tools', 'Tools'],
    ['ui', 'UI'],
    ['utility', 'Utility'],
]

const PER_PAGE = 30

const loading = ref(true)
const catalogue = ref([])
const search = ref('')
const filterCertified = ref(false)
const activeCategories = reactive({})
const currentPage = ref(0)

function truncate(str, words) {
    if (!str) return ''
    const parts = str.split(' ')
    return parts.slice(0, words).join(' ') + (parts.length > words ? '...' : '')
}

const filtered = computed(() => {
    const term = search.value
    const cats = Object.keys(activeCategories).filter((k) => activeCategories[k])
    return catalogue.value
        .filter((node) => {
            for (const key of cats) {
                if (!node.categories || !node.categories.includes(key)) return false
            }
            if (filterCertified.value && !node.ffCertified) return false
            return node._id.includes(term)
        })
        .sort((a, b) => {
            if (a.ffCertified && !b.ffCertified) return -1
            if (!a.ffCertified && b.ffCertified) return 1
            return b.downloads.week - a.downloads.week
        })
})

const maxPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))

const pageItems = computed(() =>
    filtered.value.slice(currentPage.value * PER_PAGE, (currentPage.value + 1) * PER_PAGE)
)

watch([search, filterCertified, () => ({ ...activeCategories })], () => {
    currentPage.value = 0
})

function changePage(diff) {
    const next = currentPage.value + diff
    if (next < 0 || next >= maxPage.value) return
    currentPage.value = next
}

function tileLink(node) {
    return generatedNodeIds.has(node._id)
        ? `/integrations/${node._id}`
        : `https://flows.nodered.org/node/${node._id}`
}

function isExternal(node) {
    return !generatedNodeIds.has(node._id)
}

onMounted(async () => {
    try {
        const res = await fetch('https://ff-integrations.flowfuse.cloud/api/nodes')
        const data = await res.json()
        catalogue.value = data.catalogue || []
    } catch (e) {
        catalogue.value = []
    } finally {
        loading.value = false
    }
})
</script>

<template>
  <div class="w-full px-6 page hero catalog-hero">
    <div class="container m-auto text-center flex py-8 max-w-lg md:max-w-6xl">
      <div class="text-left w-full">
        <h1>Integrations</h1>
        <p class="md:w-9/12">
          Explore the list of integrations and modules available for your Node-RED projects.
          Created (and curated) by FlowFuse and the Node-RED community.
        </p>
      </div>
    </div>
    <div>
      <div class="container m-auto text-left md:max-w-6xl pt-8 pb-12 w-full ff-full-bg gap-4 flex">
        <div class="catalogue-filters w-52 shrink-0 hidden md:block">
          <label>Filters</label>
          <ul>
            <li>
              <input id="catalogue-filter-certified" v-model="filterCertified" type="checkbox" />
              <label class="inline-flex gap-1 items-center" for="catalogue-filter-certified">
                FlowFuse Certified
                <svg class="certified-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
              </label>
            </li>
          </ul>
          <label>Categories</label>
          <ul id="catalogue-filter--categories">
            <li v-for="[key, lbl] in CATEGORY_FILTERS" :key="key">
              <input :id="`catalogue-filter-${key}`" v-model="activeCategories[key]" type="checkbox" />
              <label :for="`catalogue-filter-${key}`">{{ lbl }}</label>
            </li>
          </ul>
          <ul v-if="loading" id="catalogue-filter--placeholder">
            <span class="ff-placeholder-bar block h-5 w-3/4" />
          </ul>
        </div>
        <div class="grow max-md:max-w-lg mx-auto">
          <input
            id="search-catalogue"
            v-model="search"
            class="catalogue-search"
            type="text"
            placeholder="Search Integrations"
          />
          <div class="catalogue-meta">
            <div v-if="!loading"><span>{{ filtered.length }}</span> Integrations</div>
            <div v-else><span>Loading...</span></div>
          </div>

          <ul v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <li v-for="n in 3" :key="n" class="integration-card pointer-events-none border border-gray-300 rounded-xl bg-white drop-shadow-md">
              <span class="h-48 flex flex-col">
                <div class="integration-card--details p-3 grow min-h-0">
                  <span class="ff-placeholder-bar block w-1/2 h-5 mt-1 mb-3" />
                  <span class="ff-placeholder-bar block w-full h-16 opacity-50" />
                </div>
                <div class="integration-card--meta flex justify-between bg-indigo-50/50 p-3 text-sm">
                  <div class="integration-card--stats">
                    <span class="ff-placeholder-bar block h-5 w-5" />
                    <span class="ff-placeholder-bar block h-5 w-5" />
                  </div>
                </div>
              </span>
            </li>
          </ul>

          <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <li
              v-for="node in pageItems"
              :key="node._id"
              class="integration-card group border border-gray-300 rounded-xl bg-white drop-shadow-md"
            >
              <a
                :href="tileLink(node)"
                :target="isExternal(node) ? '_blank' : undefined"
                :rel="isExternal(node) ? 'noopener noreferrer' : undefined"
                class="h-48 flex flex-col"
              >
                <div class="integration-card--details p-3 grow min-h-0">
                  <div class="flex justify-between text-sm items-center">
                    <span>
                      @{{ node.npmScope || (node.npmOwners && node.npmOwners[0]) }}
                      <svg v-if="isExternal(node)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ml-1 opacity-60">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </span>
                    <span class="ff-certified-tag" :style="{ display: node.ffCertified ? 'flex' : 'none' }">
                      <svg class="certified-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <label class="group-hover:text-indigo-600 cursor-pointer">{{ node.name }}</label>
                  <p class="text-sm my-2 leading-5">{{ truncate(node.description, 15) }}</p>
                </div>
                <div class="integration-card--meta flex justify-between bg-indigo-50/50 group-hover:bg-indigo-50 p-3 text-sm">
                  <div class="integration-card--stats">
                    <span>v{{ node.version }}<span class="ff-helper left-0 after:left-1/4">Version Number</span></span>
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>{{ node.downloads.week }}<span class="ff-helper right-0 after:left-3/4">Weekly Downloads</span>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>

          <nav v-if="!loading" aria-label="Integrations pagination" class="pagination mt-4">
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
              <li><span>{{ currentPage + 1 }}</span> of <span>{{ maxPage }}</span></li>
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
