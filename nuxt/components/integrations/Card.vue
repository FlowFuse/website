<script setup>
const props = defineProps({
    node: { type: Object, required: true },
    // Set of node IDs that have a generated detail page on this site.
    generatedIds: { type: Set, required: true }
})

const hasGeneratedPage = computed(() => props.generatedIds.has(props.node._id))
const href = computed(() =>
    hasGeneratedPage.value
        ? `/integrations/${props.node._id}/`
        : `https://flows.nodered.org/node/${props.node._id}`
)
const externalAttrs = computed(() =>
    hasGeneratedPage.value
        ? {}
        : { target: '_blank', rel: 'noopener noreferrer' }
)
const scope = computed(() => props.node.npmScope || props.node.npmOwners?.[0] || '')
const shortDescription = computed(() => {
    if (!props.node.description) return ''
    const words = props.node.description.split(' ')
    return words.length > 15
        ? words.slice(0, 15).join(' ') + '...'
        : props.node.description
})
</script>

<template>
    <li class="integration-card group border border-gray-300 rounded-xl bg-white drop-shadow-md">
        <a :href="href" v-bind="externalAttrs" class="h-48 flex flex-col">
            <div class="integration-card--details p-3 grow min-h-0">
                <div class="flex justify-between text-sm items-center gap-2">
                    <span class="truncate">
                        @{{ scope }}
                        <svg
                            v-if="!hasGeneratedPage"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 inline-block ml-1 opacity-60"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </span>
                    <span v-if="node.ffCertified" class="certified-pill" title="FlowFuse Certified">
                        <IntegrationsCertifiedIcon />
                        <span>Certified</span>
                    </span>
                </div>
                <h3 class="text-base font-semibold group-hover:text-indigo-600 cursor-pointer">{{ node.name }}</h3>
                <p class="text-sm my-2 leading-5">{{ shortDescription }}</p>
            </div>
            <div class="integration-card--meta flex justify-between bg-indigo-50/50 group-hover:bg-indigo-50 p-3 text-sm">
                <div class="integration-card--stats">
                    <span>v{{ node.version }}<span class="ff-helper left-0 after:left-1/4">Version Number</span></span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        {{ node.downloads.week }}
                        <span class="ff-helper right-0 after:left-3/4">Weekly Downloads</span>
                    </span>
                </div>
            </div>
        </a>
    </li>
</template>
