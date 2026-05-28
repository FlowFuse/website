<script setup>
// Client-side catalog page. Mirrors src/certified-nodes.njk + src/_includes/certified/template.njk.
// The legacy 11ty page fetched https://catalog.flowfuse.com/catalogue.json at build time via
// src/_data/certifiedNodes.js; here we fetch it live in the browser (single page, no pagination routes).

const DESCRIPTION =
    "Explore a curated selection of Node-RED modules that have undergone a rigorous certification process to meet the highest standards. Our certified nodes excel in three core pillars: <span class='font-medium'>Quality, Security, and Support.</span>"

const ARROW_ICON =
    '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M11.25 5H4.375C3.33947 5 2.5 5.83947 2.5 6.875V15.625C2.5 16.6605 3.33947 17.5 4.375 17.5H13.125C14.1605 17.5 15 16.6605 15 15.625V8.75M6.25 13.75L17.5 2.5M17.5 2.5L13.125 2.5M17.5 2.5V6.875" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>'

useHead({
    title: 'Certified Nodes • FlowFuse',
    meta: [
        { name: 'description', content: DESCRIPTION },
    ],
})

const nodes = ref([])

// Same id -> title transform as src/_data/certifiedNodes.js
function toTitle(id) {
    return id
        .replace(/^(node-red-contrib-|node-red-node-|@flowfuse\/)/, '')
        .split('-')
        .map((word) => word.replace(/^\w/, (c) => c.toUpperCase()))
        .join(' ')
}

onMounted(async () => {
    try {
        const res = await fetch('https://catalog.flowfuse.com/catalogue.json')
        const data = await res.json()
        nodes.value = (data.modules || []).map((item) => ({
            title: toTitle(item.id),
            id: item.id,
            url: item.url || `https://flows.nodered.org/node/${item.id}`,
            description: item.description,
        }))
    } catch (e) {
        nodes.value = []
    }
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full">
        <div class="flex flex-col justify-between ff-blog container m-auto text-left max-w-4xl pt-8 pb-12 w-full ff-full-bg">
          <div>
            <div class="px-2 flex items-center gap-12">
              <h1 class="mb-0">Certified Nodes</h1>
            </div>
            <div class="px-2 my-4 flex gap-4">
              <p v-html="DESCRIPTION" />
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 mt-6 cursor-pointer border-b pb-8">
              <li
                v-for="node in nodes"
                :key="node.id"
                class="w-full border bg-white rounded-lg hover:drop-shadow-lg hover:border-indigo-600 transition ease-in-out duration-300"
              >
                <a :href="node.url" target="_blank" class="w-full h-full flex flex-col group hover:no-underline px-4 py-3 cursor-pointer">
                  <div>
                    <div class="flex flex-row justify-between">
                      <h3 class="w-full mb-0 font-medium">{{ node.title }}</h3>
                      <div class="w-[20px] my-auto text-gray-500" v-html="ARROW_ICON" />
                    </div>
                  </div>
                  <div class="text-sm prose prose-blue md:prose-md py-1">
                    {{ node.description }}
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Pagination" class="pagination mt-4">
            <ol class="flex flex-row w-full justify-between text-gray-600">
              <li class="flex md:flex-initial w-40 justify-start pl-2 ff-nav-blog-p" style="opacity: 0; pointer-events: none;"><a href="">Previous</a></li>
              <li>
                <span>1 of 1</span>
              </li>
              <li class="flex md:flex-initial w-40 justify-end pr-2 ff-nav-blog-n" style="opacity: 0; pointer-events: none;"><a href="">Next</a></li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
