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
    <h3 class="mb-3">Table of Contents</h3>
    <div class="toc-wrapper text-sm">
      <ul class="list-none p-0 m-0">
        <li v-for="item in toc" :key="item.id"
          :class="['mb-4', item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-4' : 'pl-8']">
          <a :href="`#${item.id}`"
            :class="['block py-[0.2rem] text-blue-600 no-underline transition-all duration-200 hover:pl-2 hover:underline', activeId === item.id ? 'font-medium' : '']">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
