<script setup>
// Mirrors collections.publications (whitepapers + ebooks). Whitepapers/ebooks
// carry no date frontmatter, so order follows the legacy collection order.
const publications = [
    { url: '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse/', thumbnail: '/resources/images/Whitepaper_Accelerating-Innovation-in-Manufacturing-with-FlowFuse.png', tag: 'Whitepaper', title: 'Accelerating Innovation in Manufacturing with FlowFuse' },
    { url: '/whitepaper/open-source-software-for-manufacturing/', thumbnail: '/resources/images/Whitepaper_Open-Source-in-Manufacturing.png', tag: 'Whitepaper', title: 'Open Source Software for Manufacturing' },
    { url: '/whitepaper/uns-decoupling-data-producers-and-consumers/', thumbnail: '/resources/images/whitepaper_uns.png', tag: 'Whitepaper', title: 'UNS - Decoupling data producers and consumers' },
    { url: '/ebooks/beginner-guide-to-a-professional-nodered/', thumbnail: '/resources/images/ebook_-The-Ultimate-Beginner-Guide-to-a-Professional-Node-RED.png', tag: 'eBook', title: 'The Ultimate Beginner Guide to a Professional Node-RED' },
    { url: '/ebooks/ultimate-guide-to-building-applications-with-flowfuse-dashboard-for-node-red/', thumbnail: '/resources/images/eBook_Ultimate-Guide-to-Building-Applications-with-FlowFuse-Dashboard-for-Node-RED.png', tag: 'eBook', title: 'The Ultimate Guide to Building Applications with FlowFuse Dashboard for Node-RED' },
]
useHead({
    title: 'Publications: eBooks and Whitepapers • FlowFuse',
    meta: [{ name: 'description', content: 'Browse our library of whitepapers and eBooks and discover the power of our low-code industrial data platform.' }],
})
</script>

<template>
  <div class="w-full catalog-hero cropped">
    <div class="container m-auto text-left max-w-md sm:max-w-6xl pt-16 pb-24 w-full">
      <div class="px-6">
        <h1><span class="text-2xl">Publications</span><br><span class="text-indigo-600">eBooks and Whitepapers</span></h1>
        <p class="max-w-2xl">Ready to dive deeper into the world of FlowFuse? Browse our library of whitepapers and ebooks and discover the power of our low-code industrial data platform.</p>
      </div>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-16">
        <li v-for="item in publications" :key="item.url" class="customer-story-tile w-full my-2 border px-0 rounded-lg hover:drop-shadow-lg hover:border-blue-600 transition ease-in-out duration-300 bg-white">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline h-full m-0">
            <div>
              <div class="relative border-b">
                <div class="w-full h-52 ff-image-cover ff-image-top-rounded">
                  <img :src="item.thumbnail" :alt="`Image representing ${item.title}`" style="max-width:356px" />
                </div>
              </div>
              <div class="mt-1 mb-0 p-5 pt-3">
                <label class="px-2 py-1 rounded-md font-semibold" :class="item.tag === 'Whitepaper' ? 'bg-indigo-100 text-gray-700' : 'bg-indigo-600 text-white'">{{ item.tag }}</label>
                <h3 class="group-hover:text-blue-600 font-medium m-0 mt-3 text-lg">{{ item.title }}</h3>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
