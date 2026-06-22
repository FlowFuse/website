<script setup lang="ts">
// Renders the git-derived weekly handbook change log produced by
// /api/handbook-changes (see server/lib/handbookChanges.mjs).
// Used inside content markdown as `::handbook-recent-changes`.

interface Commit { sha: string; date: string; subject: string; commitUrl: string; prUrl: string | null }
interface Page {
    url: string
    path: string
    title: string
    changeType: 'Added' | 'Updated' | 'Removed' | 'Renamed'
    date: string
    exists: boolean
    commitUrl: string
    prUrl: string | null
    commits: Commit[]
}
interface Pr { title: string; url: string; prNumber: number | null; sha: string; date: string }
interface Week { label: string; weekStart: string; weekEnd: string; pages: Page[]; prs: Pr[] }

// How many recent weeks to surface. Older history stays in git.
const WEEKS_SHOWN = 16
// Weeks larger than this collapse into a <details> so a bulk event (e.g. the
// Nuxt migration) doesn't bury the rest of the page.
const COLLAPSE_AFTER = 12

const { data } = await useFetch<{ weeks: Week[] }>('/api/handbook-changes')

const weeks = computed<Week[]>(() => (data.value?.weeks ?? []).slice(0, WEEKS_SHOWN))
const hasMore = computed(() => (data.value?.weeks?.length ?? 0) > WEEKS_SHOWN)

const badgeClass: Record<Page['changeType'], string> = {
    Added: 'bg-green-100 text-green-800',
    Updated: 'bg-blue-100 text-blue-800',
    Removed: 'bg-red-100 text-red-700',
    Renamed: 'bg-amber-100 text-amber-800'
}

function prettyDate (d: string) {
    const date = new Date(d + 'T00:00:00Z')
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date)
}
function rangeLabel (w: Week) {
    return `${prettyDate(w.weekStart)} – ${prettyDate(w.weekEnd)}`
}
function shortSha (sha: string) {
    return sha.slice(0, 7)
}
</script>

<template>
  <div class="handbook-recent-changes not-prose">
    <p v-if="!weeks.length" class="text-gray-500 italic">
      No handbook changes found in git history.
    </p>

    <section v-for="week in weeks" :key="week.weekStart" class="mb-10">
      <h2 class="!mb-1 flex flex-wrap items-baseline gap-x-3">
        <span>{{ week.label }}</span>
        <span class="text-sm font-normal text-gray-500">{{ rangeLabel(week) }}</span>
        <span class="text-sm font-normal text-gray-400">· {{ week.pages.length }} page{{ week.pages.length === 1 ? '' : 's' }}</span>
      </h2>

      <p class="!mb-1 !mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Pages</p>

      <component :is="week.pages.length > COLLAPSE_AFTER ? 'details' : 'div'" class="mt-1">
        <summary
          v-if="week.pages.length > COLLAPSE_AFTER"
          class="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 select-none mb-2"
        >Show {{ week.pages.length }} changed pages</summary>

        <ul class="!my-0 !pl-0 list-none divide-y divide-gray-100 border-t border-gray-100">
          <li
            v-for="page in week.pages"
            :key="page.url + page.changeType"
            class="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2"
          >
            <span
              class="inline-block shrink-0 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
              :class="badgeClass[page.changeType]"
            >{{ page.changeType }}</span>

            <NuxtLink
              v-if="page.exists && page.changeType !== 'Removed'"
              :href="page.url"
              class="font-medium text-gray-800 hover:text-indigo-600"
            >{{ page.title }}</NuxtLink>
            <span v-else class="font-medium text-gray-500">
              {{ page.title }}
              <span class="text-xs text-gray-400">({{ page.path }})</span>
            </span>

            <span class="text-sm text-gray-400">{{ prettyDate(page.date) }}</span>

            <a
              :href="page.prUrl || page.commitUrl"
              target="_blank"
              rel="noopener"
              class="text-sm text-indigo-600 hover:text-indigo-800"
            >view change<span v-if="page.prUrl"> (#{{ page.prUrl.split('/').pop() }})</span></a>
          </li>
        </ul>
      </component>

      <template v-if="week.prs.length">
        <p class="!mb-1 !mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Pull Requests and Commits</p>
        <ul class="!my-0 !pl-0 list-none divide-y divide-gray-100 border-t border-gray-100">
          <li
            v-for="pr in week.prs"
            :key="pr.sha"
            class="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2"
          >
            <a
              :href="pr.url"
              target="_blank"
              rel="noopener"
              class="font-medium text-gray-800 hover:text-indigo-600"
            >{{ pr.title }}</a>
            <a
              :href="pr.url"
              target="_blank"
              rel="noopener"
              class="text-sm text-indigo-600 hover:text-indigo-800"
            >{{ pr.prNumber !== null ? `#${pr.prNumber}` : shortSha(pr.sha) }}</a>
          </li>
        </ul>
      </template>
    </section>

    <p v-if="hasMore" class="text-sm text-gray-500 italic mt-6">
      Showing the most recent {{ WEEKS_SHOWN }} weeks. Older changes remain in the
      <a class="text-indigo-600 hover:text-indigo-800" href="https://github.com/FlowFuse/website/commits/main/nuxt/content/handbook" target="_blank" rel="noopener">git history</a>.
    </p>
  </div>
</template>
