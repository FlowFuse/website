<script setup lang="ts">
const { visibleGroups, matching, hasMore, search, showMore } = useChangelogList()

useSeoMeta({
    title: 'Changelog',
    ogTitle: 'Changelog',
})

// The Atom feed at /changelog/index.xml has always existed but nothing advertised it,
// so feed readers and browsers could not discover it from the page.
useHead({
    link: [{
        rel: 'alternate',
        type: 'application/atom+xml',
        title: 'FlowFuse Changelog',
        href: '/changelog/index.xml',
    }],
})

// Dots are legal in an id but awkward to select, so "2.33" anchors as "release-2-33".
const anchorId = (release: string) => `release-${release.replace(/\./g, '-')}`

// Infinite scroll: a sentinel below the list, which is what IntersectionObserver is
// actually good at.
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver((records) => {
        if (records.some(r => r.isIntersecting) && hasMore.value) showMore()
    }, { rootMargin: '600px 0px' })
    if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-6xl pt-8 pb-24 w-full px-6">
    <div class="w-full sm:flex sm:items-end sm:justify-between gap-4">
      <div>
        <!-- Sized explicitly: .ff-blog leaves h1 at 16px/400, identical to the subtitle
             below it, so the heading does not read as one. -->
        <h1 class="mb-0 text-2xl font-medium">What's new</h1>
        <p class="my-0 text-gray-500">Every feature, improvement and fix we ship, newest first.</p>
      </div>
      <div class="flex flex-row items-center gap-3 max-sm:mt-4">
        <a
          href="/changelog/index.xml"
          class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-gray-500 hover:text-indigo-600"
          title="Subscribe to the changelog feed"
        >
          <UIcon name="i-heroicons-rss" class="w-4 h-4" />
          <span>RSS</span>
        </a>
        <label class="relative">
          <span class="sr-only">Search the changelog</span>
          <UIcon name="i-heroicons-magnifying-glass" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="search"
            type="search"
            placeholder="Search"
            class="w-full sm:w-56 rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none"
          >
        </label>
      </div>
    </div>

    <div class="mt-8">
      <p v-if="!matching.length" class="py-16 text-center text-gray-500">
        Nothing matches "{{ search }}".
        <button class="text-indigo-600 hover:underline" @click="search = ''">Clear the search</button>
      </p>

      <!-- The release label lives in a column beside its own entries rather than in a
           separate rail, so it lines up with the entries it belongs to, and sticks while
           you read through them. Two columns per release, not one list plus one nav. -->
      <section
        v-for="group in visibleGroups"
        :id="anchorId(group.release)"
        :key="group.release"
        class="flex scroll-mt-24"
      >
        <!-- pt-7 so the label lines up with the first entry's title rather than sitting
             above it: each entry carries `my-2 py-6` before its title, which this column
             would otherwise not share. The spine border sits on the inner element so it
             starts level with the label, rather than leaving a stub hanging above it. -->
        <div class="hidden lg:block w-36 shrink-0 pt-7">
          <div class="h-full border-l border-gray-200">
            <!-- top-16 (64px), not further down: the site header (.ff-header) ends at
                 56px, so anything lower leaves a gap of bare spine above the label. -->
            <div class="sticky top-16 -ml-px border-l-2 border-indigo-600 pl-5 py-1 font-medium leading-tight text-indigo-600">
              Release {{ group.release }}
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0 lg:pl-12">
          <!-- The label column is hidden below lg, so the release still needs naming. -->
          <h2 class="lg:hidden mt-6 mb-0 text-base font-medium text-indigo-600">
            Release {{ group.release }}
          </h2>
          <ul class="flex flex-wrap">
            <ChangelogListItem v-for="entry in group.entries" :key="entry.path" :entry="entry" />
          </ul>
        </div>
      </section>

      <div ref="sentinel" aria-hidden="true" class="h-px" />
      <p v-if="hasMore" class="py-6 text-center text-sm text-gray-400">Loading more…</p>
    </div>
  </div>
</template>
