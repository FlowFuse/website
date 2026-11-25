<script setup lang="ts">
// Customer quotes for the homepage: one large quote, and a column of customer tabs
// beside it. The shared <TestimonialCarousel> (product page, ABM pages) is unchanged;
// this reads the same data/testimonials.json.
//
// Timing works like the hero: the active tab's progress bar is the only clock. When it
// ends, the next quote shows (after the last, the first). Hovering pauses it, picking a
// tab jumps there and carries on. Under prefers-reduced-motion the bar doesn't animate,
// so nothing advances on its own.
import testimonials from '../../data/testimonials.json'

const QUOTE_MS = 8000

const current = ref(0)
const hovering = ref(false)
const t = computed(() => testimonials[current.value])

function advance () {
    current.value = (current.value + 1) % testimonials.length
}

// The data file writes paths as "./images/..." for the old 11ty image handler.
function asset (path: string) {
    return '/' + path.replace(/^\.?\//, '')
}

// "Felix Reck, IT Application Manager" -> name and role on separate lines
function person (author: string) {
    const [name, ...role] = author.split(', ')
    return { name, role: role.join(', ') }
}
</script>

<template>
  <div
      class="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-5"
      :class="{ paused: hovering }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
  >
    <!-- The quote -->
    <div class="quote-card relative rounded-2xl border border-indigo-100 p-8 md:p-10 flex flex-col overflow-hidden">
      <UIcon name="i-lucide-quote" class="absolute -top-2 right-6 w-28 h-28 text-indigo-100 pointer-events-none" aria-hidden="true" />
      <Transition name="quote" mode="out-in">
        <div :key="t.id" class="relative flex flex-col flex-grow">
          <p class="m-0 text-gray-800 text-xl md:text-2xl leading-snug md:leading-snug font-normal text-balance flex-grow">
            “{{ t.quote }}”
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 justify-between">
            <div class="flex items-center gap-3">
              <span class="w-12 h-12 shrink-0 rounded-full bg-gray-900 p-1.5">
                <img :src="asset(t.companyLogo)" :alt="`${t.company} logo`" width="36" height="36" class="w-full h-auto">
              </span>
              <div>
                <p class="m-0 text-gray-900 font-medium leading-5">{{ person(t.author).name }}</p>
                <p class="m-0 text-gray-500 text-sm leading-5">
                  <template v-if="person(t.author).role">{{ person(t.author).role }}, </template>{{ t.company }}
                </p>
              </div>
            </div>
            <NuxtLink :to="t.url" class="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline">
              Read the {{ t.company }} story
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Customer tabs: pick one, or watch them turn -->
    <div class="flex flex-col gap-3" role="group" aria-label="Customer quotes">
      <button
          v-for="(item, i) in testimonials"
          :key="item.id"
          type="button"
          class="tab relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left overflow-hidden transition-colors"
          :class="i === current ? 'border-indigo-200 bg-white shadow-sm' : 'border-transparent bg-indigo-50/60 hover:bg-indigo-50'"
          :aria-pressed="i === current"
          @click="current = i"
      >
        <span class="w-9 h-9 shrink-0 rounded-full bg-gray-900 p-1 transition-opacity" :class="i === current ? 'opacity-100' : 'opacity-60'">
          <img :src="asset(item.companyLogo)" alt="" width="28" height="28" class="w-full h-auto">
        </span>
        <span class="min-w-0">
          <span class="block font-medium leading-5" :class="i === current ? 'text-gray-900' : 'text-gray-600'">{{ item.company }}</span>
          <span class="block text-xs text-gray-500 truncate">{{ person(item.author).name }}</span>
        </span>
        <span
            v-if="i === current"
            :key="`bar-${current}`"
            class="bar absolute left-0 bottom-0 h-0.5"
            :style="{ animationDuration: `${QUOTE_MS}ms` }"
            @animationend="advance"
        />
      </button>
      <NuxtLink to="/customer-stories/" class="mt-2 inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline max-lg:justify-center">
        Browse all customer stories
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.quote-card {
  background:
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(99, 102, 241, 0.08), transparent 70%),
    linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  min-height: 300px;
}

.bar { width: 0; background: #ff7b6b; animation: fill linear forwards; }
.paused .bar { animation-play-state: paused; }
@keyframes fill { to { width: 100%; } }

.quote-enter-active, .quote-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.quote-enter-from { opacity: 0; transform: translateY(6px); }
.quote-leave-to { opacity: 0; transform: translateY(-4px); }

@media (prefers-reduced-motion: reduce) {
  .bar { animation: none; width: 100%; }
  .quote-enter-active, .quote-leave-active { transition: none; }
}
</style>
