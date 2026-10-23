<script setup lang="ts">
// Where the HubSpot meetings scheduler redirects after a booking, so paid search
// has a URL to fire conversions on. noindex: it means nothing without a booking.
useSeoMeta({
    title: 'Your meeting is booked',
    description: 'A calendar invitation is on its way to your inbox. In the meantime, see how other teams use FlowFuse.',
    robots: 'noindex',
})

const NEXT_STEPS = [
    {
        title: 'Check your inbox',
        description: 'Your calendar invitation has the video link. Need a different time? Use the reschedule link in that email.',
    },
    {
        title: 'Bring your team',
        description: 'Forward the invitation to anyone who owns the systems or the use case you want to talk about.',
    },
    {
        title: 'Come with a use case',
        description: 'Tell us the machines, protocols and data you are working with, and we will tailor the session to them.',
    },
]
</script>

<template>
  <div class="w-full">
    <section class="w-full px-6 pt-12 pb-10 sm:pt-16 bg-radial-indigo">
      <div class="max-w-2xl m-auto text-center">
        <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm ring-8 ring-indigo-100">
          <UIcon name="i-lucide-calendar-check" class="size-7" aria-hidden="true" />
        </span>
        <p class="m-0 mt-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Meeting confirmed
        </p>
        <h1 class="m-0 mt-2">
          Your meeting is booked
        </h1>
        <p class="lead-p m-auto mt-3 text-gray-600">
          A calendar invitation is on its way to your inbox. We're looking forward to talking with you.
        </p>
      </div>
    </section>

    <section class="w-full px-6 pb-4" aria-labelledby="next-steps-title">
      <div class="max-w-3xl m-auto rounded-xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 id="next-steps-title" class="m-0 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          What happens next
        </h2>
        <ol class="m-0 mt-6 flex list-none flex-col gap-6 p-0">
          <li v-for="(step, i) in NEXT_STEPS" :key="step.title" class="m-0 flex items-start gap-4">
            <span class="flex size-7 flex-none items-center justify-center rounded-full bg-indigo-600 font-mono text-sm text-white">{{ i + 1 }}</span>
            <div>
              <p class="m-0 font-medium text-gray-900">
                {{ step.title }}
              </p>
              <p class="m-0 mt-1 text-sm text-gray-600">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <div class="w-full max-w-md sm:max-w-screen-lg m-auto px-6 pb-4">
      <SocialProof />
    </div>

    <section class="w-full px-6 pt-12 pb-16 sm:pb-24" aria-labelledby="stories-title">
      <div class="max-w-md sm:max-w-screen-lg m-auto">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="stories-title" class="m-0">
              While you wait
            </h2>
            <p class="m-0 mt-2 text-gray-600">
              See how other industrial teams put FlowFuse to work.
            </p>
          </div>
          <a href="/customer-stories/" class="group hover:no-underline inline-flex items-center gap-1 font-medium">
            <span class="group-hover:underline">All customer stories</span>
            <UIcon name="i-lucide-arrow-right" class="size-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
        <ExploreMoreStories />
      </div>
    </section>
  </div>
</template>
