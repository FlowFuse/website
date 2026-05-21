<script setup>
import { cleanRepoUrl, formatNumber, shortDate } from '~/utils/formatters'

const route = useRoute()
const router = useRouter()
// [...id].vue is a catch-all so scoped npm package names (e.g. @flowfuse/node-red-dashboard)
// resolve. route.params.id is always a string[] for catch-all routes; join with '/'.
const id = computed(() => route.params.id.join('/'))

// Data comes from a server route so the heavy enrichment + fs-cache stay
// server-only and don't get bundled into the client.
const { data: integration } = await useFetch(`/api/integrations/${id.value}`, {
    key: `integration-${id.value}`
})

if (!integration.value) {
    throw createError({ statusCode: 404, statusMessage: `Integration not found: ${id.value}` })
}

const node = computed(() => integration.value)
const hasExamples = computed(() => Boolean(node.value.examples && node.value.examples.length > 0))
const authorName = computed(() => {
    const author = node.value.author
    if (!author) return ''
    return typeof author === 'string' ? author : author.name ?? ''
})
const authorUrl = computed(() => {
    const author = node.value.author
    return typeof author === 'object' && author?.url ? author.url : ''
})
const authorIsLinkable = computed(() => {
    const url = authorUrl.value
    return Boolean(url) && (url.includes('github.com') || url.includes('npmjs.com'))
})

// Function form so title/meta react if the integration ever updates after mount.
useHead(() => ({
    title: `${node.value._id} • FlowFuse Integrations`,
    meta: [
        { name: 'description', content: node.value.description },
        { property: 'og:title', content: node.value._id },
        { property: 'og:description', content: node.value.description }
    ]
}))

// Tab state for nodes with examples
const activeTab = ref('overview')
function switchTab (tab) {
    activeTab.value = tab
    router.replace({ hash: `#${tab}` })
}
onMounted(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#examples' && hasExamples.value) {
        activeTab.value = 'examples'
    }
})
</script>

<template>
    <div>
        <!-- Header -->
        <div class="node-header bg-gradient-to-br from-indigo-50 to-white border-b border-gray-200 py-8 min-h-[280px] w-full">
            <div class="container m-auto max-w-6xl px-6 overflow-hidden w-full">
                <div class="flex flex-col md:flex-row gap-6 items-start w-full">
                    <div class="flex-grow w-full">
                        <div class="flex items-center gap-3 mb-4 flex-wrap">
                            <h1 class="mb-0 text-3xl md:text-4xl font-bold break-words">{{ node._id }}</h1>
                            <div
                                v-if="node.ffCertified"
                                class="ff-certified-badge flex items-center gap-2 bg-indigo-100 border-2 border-indigo-600 text-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap flex-shrink-0"
                            >
                                <IntegrationsCertifiedIcon class="w-5 h-5" />
                                <span>FlowFuse Certified</span>
                            </div>
                        </div>
                        <p class="text-lg text-gray-700 mb-4 w-full max-w-full break-words">{{ node.description }}</p>
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>
                                <strong>Version:</strong> {{ node.version }}
                            </span>
                            <span class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                <strong>Weekly Downloads:</strong> {{ formatNumber(node.downloads?.week) }}
                            </span>
                            <span v-if="authorName" class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <strong>Author:</strong>
                                <a v-if="authorIsLinkable" :href="authorUrl" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-800 underline">
                                    {{ authorName }}
                                </a>
                                <span v-else>{{ authorName }}</span>
                            </span>
                            <span v-if="node.lastUpdated" class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <strong>Updated:</strong> {{ shortDate(node.lastUpdated) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main content -->
        <div class="container m-auto max-w-6xl px-6 py-8">
            <div class="flex flex-col lg:flex-row gap-8 min-w-0">
                <div class="flex-grow min-w-0 overflow-hidden">
                    <!-- Certified / call-to-certify callout -->
                    <div v-if="node.ffCertified" class="mb-8 p-6 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg overflow-hidden">
                        <h3 class="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                            <IntegrationsCertifiedIcon class="w-8 h-8 fill-indigo-900" />
                            FlowFuse Certified Node
                        </h3>
                        <p class="text-indigo-800 mb-0">
                            This node has been certified by FlowFuse, ensuring it meets our standards for quality, security, and support.
                            <a href="https://flowfuse.com/blog/2025/07/certified-nodes-v2/" class="font-semibold underline hover:text-indigo-900" target="_blank" rel="noopener noreferrer">Learn more about certified nodes</a>.
                        </p>
                    </div>
                    <div v-else class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg overflow-hidden">
                        <h3 class="text-blue-900 font-bold mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                            </svg>
                            Get Your Node Certified
                        </h3>
                        <p class="text-blue-800 mb-3">Boost your node's credibility and reach by becoming FlowFuse Certified. Certification demonstrates quality, security, and reliability to the Node-RED community.</p>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <a href="https://flowfuse.com/blog/2025/07/certified-nodes-v2/#contact-us-to-discuss-your-node-certification" class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm hover:no-underline" target="_blank" rel="noopener noreferrer">
                                START CERTIFICATION PROCESS
                            </a>
                            <a href="https://flowfuse.com/blog/2025/07/certified-nodes-v2/" class="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-700 border-2 border-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm hover:no-underline" target="_blank" rel="noopener noreferrer">
                                LEARN MORE
                            </a>
                        </div>
                    </div>

                    <!-- Tabs (only when examples exist) -->
                    <div v-if="hasExamples" class="border-b border-gray-300 mb-6">
                        <nav class="flex gap-8" aria-label="Tabs">
                            <button
                                type="button"
                                class="py-3 px-1 border-b-2 font-medium focus:outline-none"
                                :class="activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                                @click="switchTab('overview')"
                            >Overview</button>
                            <button
                                type="button"
                                class="py-3 px-1 border-b-2 font-medium focus:outline-none"
                                :class="activeTab === 'examples' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                                @click="switchTab('examples')"
                            >Examples ({{ node.examples?.length }})</button>
                        </nav>
                    </div>

                    <div class="prose max-w-none">
                        <div v-if="!hasExamples || activeTab === 'overview'">
                            <!-- README is pre-rendered HTML from build time. -->
                            <div v-html="node.readme || ''"></div>
                        </div>
                        <div v-if="hasExamples && activeTab === 'examples'">
                            <h2 class="text-2xl font-bold mb-4">Example Flows</h2>
                            <p class="text-gray-600 mb-6">The following example flows are available for this node.</p>
                            <div v-for="(example, index) in node.examples" :key="example.path" class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                                <h3 class="text-lg font-semibold mb-4">{{ example.name }}</h3>
                                <div v-if="example.flow" class="bg-white border border-gray-300 rounded overflow-hidden mb-4">
                                    <IntegrationsFlowRenderer :flow="example.flow" :index="index" />
                                </div>
                                <p v-else class="text-gray-500 mb-4">Flow content not available</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:w-80 flex-shrink-0 min-w-0">
                    <div class="space-y-6">
                        <IntegrationsInstallBox />

                        <!-- Quick Stats -->
                        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm overflow-hidden">
                            <h3 class="text-lg font-bold mb-4">Quick Stats</h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between items-center pb-2 border-b">
                                    <span class="text-gray-600">Current Version</span>
                                    <span class="font-semibold">{{ node.version }}</span>
                                </div>
                                <div class="flex justify-between items-center pb-2 border-b">
                                    <span class="text-gray-600">Weekly Downloads</span>
                                    <span class="font-semibold">{{ formatNumber(node.downloads?.week) }}</span>
                                </div>
                                <div v-if="node.created" class="flex justify-between items-center pb-2 border-b">
                                    <span class="text-gray-600">First Published</span>
                                    <span class="font-semibold">{{ shortDate(node.created) }}</span>
                                </div>
                                <div v-if="node.lastUpdated" class="flex justify-between items-center">
                                    <span class="text-gray-600">Last Updated</span>
                                    <span class="font-semibold">{{ shortDate(node.lastUpdated) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- GitHub Stats -->
                        <div v-if="node.githubOwner && node.githubRepo" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm overflow-hidden">
                            <h3 class="text-lg font-bold mb-3">GitHub Stats</h3>
                            <div class="space-y-2">
                                <a :href="`https://github.com/${node.githubOwner}/${node.githubRepo}/issues`" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                                    <span class="text-sm text-gray-600 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        Open Issues
                                    </span>
                                    <img :src="`https://img.shields.io/github/issues/${node.githubOwner}/${node.githubRepo}.svg?style=flat-square`" alt="GitHub Issues" />
                                </a>
                                <a :href="`https://github.com/${node.githubOwner}/${node.githubRepo}/stargazers`" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                                    <span class="text-sm text-gray-600 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        Stars
                                    </span>
                                    <img :src="`https://img.shields.io/github/stars/${node.githubOwner}/${node.githubRepo}.svg?style=flat-square`" alt="GitHub Stars" />
                                </a>
                                <a :href="`https://github.com/${node.githubOwner}/${node.githubRepo}/network/members`" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                                    <span class="text-sm text-gray-600 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                        Forks
                                    </span>
                                    <img :src="`https://img.shields.io/github/forks/${node.githubOwner}/${node.githubRepo}.svg?style=flat-square`" alt="GitHub Forks" />
                                </a>
                            </div>
                        </div>

                        <!-- External resources -->
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-hidden">
                            <h3 class="text-sm font-semibold mb-3 text-gray-600 uppercase">External Resources</h3>
                            <div class="space-y-2 text-sm">
                                <a :href="`https://www.npmjs.com/package/${node._id}`" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                    View on NPM
                                </a>
                                <a v-if="node.repository?.url" :href="cleanRepoUrl(node.repository.url)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                    View Repository
                                </a>
                            </div>
                        </div>

                        <!-- Support CTA -->
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 overflow-hidden">
                            <h3 class="text-lg font-bold mb-3 text-indigo-900">Need Help?</h3>
                            <p class="text-sm text-gray-700 mb-4">Get professional support for your Node-RED projects with FlowFuse.</p>
                            <a href="/contact-us/" class="inline-flex items-center justify-center w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm hover:no-underline">
                                CONTACT US
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
