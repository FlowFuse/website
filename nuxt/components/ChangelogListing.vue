<script setup lang="ts">
const { entries, visibleGroups, hasMore, showMore, revealRelease } = useChangelogList()

useSeoMeta({
    title: 'Changelog',
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

// A release anchor shared from this page can name a release that is not rendered yet,
// since the list starts at the newest entries only. Reveal it before the browser is
// asked to scroll, otherwise the link lands at the top of the page.
const route = useRoute()

// The hash this already acted on, so repeat triggers are ignored but a later hash (back
// and forward, or a second link) still resolves. A boolean latch would swallow those.
let resolvedHash: string | null = null

async function revealFromHash () {
    if (!import.meta.client) return
    // Neither source is the truth on its own. A plain in-page anchor click is handled by the
    // browser without going through the router, so route.hash lags behind the address bar.
    // On a cold load it is the other way round: the router already carries the hash while
    // window.location has not been restored yet, which is when this used to give up.
    const id = (window.location.hash || route.hash).replace(/^#/, '')
    if (!id || id === resolvedHash) return
    // Matched against the releases that exist rather than by reversing anchorId, so a
    // hash belonging to anything else on the page is left for the browser to handle.
    const release = entries.value.find(e => anchorId(e.release) === id)?.release
    if (!release || !revealRelease(release)) return
    resolvedHash = id
    await nextTick()
    // `instant` overrides the site-wide `scroll-behavior: smooth`. Arriving at an old
    // release is a jump of tens of thousands of pixels, which is not worth animating.
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
}

// The hash and the archive can land in either order: the archive is in the payload on the
// prerendered page but still in flight in dev and on a client-side navigation, and the hash
// changes on its own for back and forward. Retry on whichever moves rather than assuming
// both are ready at mount, since the reveal only works once the entries exist.
watch([entries, () => route.hash], () => { revealFromHash() })

onMounted(() => {
    observer = new IntersectionObserver((records) => {
        if (records.some(r => r.isIntersecting) && hasMore.value) showMore()
    }, { rootMargin: '600px 0px' })
    if (sentinel.value) observer.observe(sentinel.value)
    revealFromHash()
    window.addEventListener('hashchange', revealFromHash)
})

onUnmounted(() => {
    observer?.disconnect()
    if (import.meta.client) window.removeEventListener('hashchange', revealFromHash)
})
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-6xl pt-8 pb-24 w-full px-6">
    <div class="w-full sm:flex sm:items-end sm:justify-between gap-4">
      <div>
        <!-- Sized explicitly: .ff-blog leaves h1 at 16px/400, identical to the subtitle
             below it, so the heading does not read as one. -->
        <h1 class="mb-0 font-medium">What's new</h1>
        <p class="my-0 text-gray-500">Every feature, improvement and fix we ship, newest first.</p>
      </div>
      <!-- Search runs on the same Algolia index as the blog, docs and handbook, filtered
           to this section, so it reaches entry bodies and tolerates typos. -->
      <div class="flex flex-row items-center gap-3 max-sm:mt-4 sm:w-80">
        <a
          href="/changelog/index.xml"
          class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-gray-500 hover:text-indigo-600"
          title="Subscribe to the changelog feed"
        >
          <UIcon name="i-heroicons-rss" class="w-4 h-4" />
          <span>RSS</span>
        </a>
        <AlgoliaSearch index-filter="category:changelog" placeholder="Search the changelog" source-id="changelog" />
      </div>
    </div>

    <div class="mt-8">
      <!-- The release label lives in a column beside its own entries rather than in a
           separate rail, so it lines up with the entries it belongs to, and sticks while
           you read through them. Two columns per release, not one list plus one nav. -->
      <!-- -scroll-mt-7 cancels the label column's pt-7 below, so a deep link such as
           /changelog/#release-3-0 rests with the release label itself just under the
           header, at the site-wide 75px inset, rather than the section box that starts
           28px above it. That also tucks the previous release's sticky label behind the
           header, instead of leaving it poking out above the release you asked for. -->
      <section
        v-for="group in visibleGroups"
        :id="anchorId(group.release)"
        :key="group.release"
        class="flex -scroll-mt-7"
      >
        <!-- pt-7 so the label lines up with the first entry's title rather than sitting
             above it: each entry carries `my-2 py-6` before its title, which this column
             would otherwise not share. The spine border sits on the inner element so it
             starts level with the label, rather than leaving a stub hanging above it. -->
        <div class="hidden lg:block w-36 shrink-0 pt-7">
          <div class="h-full border-l border-gray-200">
            <!-- top-16 (64px), not further down: the site header (.ff-header) ends at
                 56px, so anything lower leaves a gap of bare spine above the label.
                 The label is the release's own anchor, so it can be linked to directly. -->
            <a
              :href="`#${anchorId(group.release)}`"
              class="sticky top-16 block -ml-px border-l-2 border-indigo-600 pl-5 py-1 font-medium leading-tight text-indigo-600 hover:underline"
            >Release {{ group.release }}</a>
          </div>
        </div>

        <div class="flex-1 min-w-0 lg:pl-12">
          <!-- The label column is hidden below lg, so the release still needs naming. -->
          <h2 class="lg:hidden mt-6 mb-0 text-base font-medium">
            <a :href="`#${anchorId(group.release)}`" class="text-indigo-600 hover:underline">Release {{ group.release }}</a>
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
