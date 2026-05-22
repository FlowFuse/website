<script setup lang="ts">
interface TocItem {
    id: string
    text: string
    level: number
}

const toc = ref<TocItem[]>([])
const activeId = ref<string>('')

onMounted(() => {
    const content = document.querySelector('.handbook-content')
    if (!content) return

    const headings = content.querySelectorAll('h2, h3, h4')
    toc.value = Array.from(headings)
        .map(h => ({
            id: h.id,
            text: h.textContent?.trim() || '',
            level: parseInt(h.tagName[1])
        }))
        .filter(h => h.id && h.text)

    if (!toc.value.length) return

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries.filter(e => e.isIntersecting)
            if (visible.length) activeId.value = visible[0].target.id
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach(h => { if (h.id) observer.observe(h) })
    onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div v-if="toc.length" class="mb-6">
    <h3 class="font-medium border-b pb-1 mb-3">On this page</h3>
    <div class="toc-wrapper text-sm">
      <ul>
        <li v-for="item in toc" :key="item.id"
          :class="['my-1', item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-3' : 'pl-6']">
          <a :href="`#${item.id}`"
            :class="['block py-0.5 hover:text-indigo-600 transition-colors', activeId === item.id ? 'text-indigo-600 font-medium' : 'text-gray-600']">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
