<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
// Where the old self-serve "Free Trial" links now land, presented as the FlowFuse
// Solution Foundation. Enterprise teams told us a trial isn't how they want to
// evaluate FlowFuse, so the default path is a conversation with sales; a trial is
// still available through sales for teams that want one.
//
// Order follows the outcome, not the effort: operational problem -> deployed
// capability -> reusable platform -> delivery model. Engineering help is how the
// customer gets there, so it comes last and never leads; the platform has a clear
// role from the first sentence. Keep copy on that side: this is a FlowFuse offering,
// not systems-integrator work.
//
// The offer is still being defined, so no prices, durations or package sizes
// (Sites, Solutions, engineering days) appear here. Add them once sales signs off.
useSeoMeta({
    title: 'FlowFuse Solution Foundation: Deploy Your First Solution',
    description: 'Put FlowFuse to work on a critical manufacturing problem, and establish the integrations, data models and deployment patterns you can reuse at every plant.',
    ogUrl: 'https://flowfuse.com/build-with-us/',
    twitterSite: '@FlowFuseinc',
})

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

// What the first solution leaves the customer with.
const OUTCOMES = [
    { icon: 'i-lucide-circle-check-big', title: 'A working capability', description: 'An application that solves one critical manufacturing problem, connected to your own equipment, data and workflows.' },
    { icon: 'i-lucide-shield-check', title: 'A governed platform', description: 'FlowFuse running in your environment, with the access control, audit trail and version history your operations need as they grow.' },
    { icon: 'i-lucide-graduation-cap', title: 'The knowledge to extend both', description: 'Your engineers learn FlowFuse by building on it, with documentation and knowledge transfer so they can take it further themselves.' },
]

// What carries over from the first solution to the next plant.
const FOUNDATION = [
    { title: 'Integrations', description: 'Connections to your machines, historians and business systems, built once and reused at the next site.' },
    { title: 'Data models', description: 'A shared structure for your operational data, so every plant speaks the same language.' },
    { title: 'Deployment patterns', description: 'A tested way to roll an application out to new lines and plants without starting over.' },
    { title: 'Governance', description: 'Roles, access and change control set up once, and applied everywhere the platform runs.' },
]

// The delivery model, from first call to the next plant.
const STEPS = [
    { icon: 'i-lucide-messages-square', title: 'Talk to our team', description: 'Tell us about the operational problem you want solved, the systems involved and who needs to be part of it. We confirm FlowFuse is the right fit first.' },
    { icon: 'i-lucide-ruler', title: 'Shape the solution', description: 'Together we agree the scope, build a conservative case for its value, and show you how FlowFuse addresses your use case.' },
    { icon: 'i-lucide-hammer', title: 'Build it together', description: 'FlowFuse engineers work alongside your team to deliver the first solution, establishing the integrations, data models and deployment patterns as they go.' },
    { icon: 'i-lucide-factory', title: 'Roll it out', description: 'Validate the results, then reuse the foundation at your next plant, with your own engineers, a partner or FlowFuse.' },
]

const FAQ = [
    {
        question: 'Can I still get a free trial?',
        answer: 'Yes, if a hands-on trial is the right next step for your team, talk to us and we can set one up. Most enterprise teams we speak with get more from putting FlowFuse to work on a real problem, with their own equipment and data, so that is where we usually start.',
    },
    {
        question: 'What happens on the first call?',
        answer: 'We talk through the operational problem you want to solve, the equipment and systems involved, and who would be part of the project. If FlowFuse is a good fit, we agree the next step together, usually a session to scope the solution and its value.',
    },
    {
        question: 'Can our team maintain it without you?',
        answer: 'Yes. The work is done jointly with your team and comes with documentation and knowledge transfer, so your engineers can maintain and extend it themselves. Later work can come from your own team, a partner or FlowFuse.',
    },
    {
        question: 'How much does it cost?',
        answer: 'It depends on the scope of your first solution and how widely you plan to roll it out. We scope it with you once we understand the problem you want to solve.\n\nLooking for a standard product license instead? Edge, Hub and Fleet are still available on our [pricing page](/pricing/).',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full">
    <!-- HERO: the outcome first, with FlowFuse doing the work in the first sentence. -->
    <section class="w-full px-6 pt-12 md:pt-24 pb-10">
      <div class="max-w-3xl mx-auto text-center mt-6 sm:mt-12">
        <p class="text-indigo-600 mb-4 text-sm font-semibold uppercase tracking-wide">FlowFuse Solution Foundation</p>
        <h1 class="font-medium home text-gray-900 mb-6">
          Deploy your first solution. <span class="text-indigo-600">Establish the foundation for every plant.</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Put FlowFuse to work on a critical manufacturing problem, connecting your equipment, data and workflows in a working application.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#talk-to-us" class="ff-btn ff-btn--primary uppercase font-semibold no-underline">Discuss your first solution</a>
          <a href="#how-we-deliver" class="text-indigo-600 font-medium inline-flex items-center gap-1 no-underline hover:underline">
            See how we deliver it
            <UIcon name="i-lucide-arrow-down" class="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <!-- OUTCOMES: what the first solution leaves the customer with. -->
    <section class="w-full px-6 pb-12 sm:pb-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="text-center max-w-3xl mx-auto">
          <h2>What your first solution <span class="text-indigo-600">delivers</span></h2>
          <p class="mt-3 text-gray-600">One problem solved, and everything in place to solve the next one.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div v-for="item in OUTCOMES" :key="item.title" class="rounded-lg border border-indigo-100 bg-white p-6 shadow-sm flex flex-col gap-3">
            <UIcon :name="item.icon" class="size-8 text-indigo-600" aria-hidden="true" />
            <p class="font-medium text-gray-900 m-0">{{ item.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOUNDATION: why this is a FlowFuse offering and not a one-off project. -->
    <section class="w-full px-6 py-12 sm:py-16 bg-indigo-50/60 border-t border-gray-100">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2>Built once, <span class="text-indigo-600">reused at every plant</span></h2>
          <p class="mt-3 text-gray-600">
            The first solution isn't a one-off project. It's built on
            <a href="/product/" :class="LINK">FlowFuse</a>, so what we establish together becomes the starting point for every line and plant after it, instead of engineering work repeated from scratch.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
          <div v-for="(item, index) in FOUNDATION" :key="item.title" class="border-t border-indigo-200 pt-6">
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 m-0">0{{ index + 1 }}</p>
            <h3 class="text-2xl font-medium text-gray-900 mt-3 mb-0">{{ item.title }}</h3>
            <p class="text-gray-600 font-light mt-2 mb-0">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DELIVERY MODEL: how the customer gets those outcomes. "We build it with you"
         is reassurance here, not the headline offer. -->
    <section id="how-we-deliver" class="w-full px-6 py-12 sm:py-16 scroll-mt-16">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2>How we <span class="text-indigo-600">deliver it</span></h2>
          <p class="mt-3 text-gray-600">We build the first solution with your team, so it fits your operations and your engineers know it inside out.</p>
        </div>
        <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 list-none p-0">
          <li v-for="(step, index) in STEPS" :key="step.title" class="m-0 flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm font-semibold text-indigo-600">0{{ index + 1 }}</span>
              <UIcon :name="step.icon" class="size-7 text-indigo-600" aria-hidden="true" />
            </div>
            <p class="font-medium text-indigo-700 m-0">{{ step.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ step.description }}</p>
          </li>
        </ol>
        <p class="mt-10 mb-0 text-center text-sm text-gray-500">
          Prefer a standard product license? <CtaLink destination="pricing" position="delivery" :class="LINK">Edge, Hub and Fleet</CtaLink> are still available.
        </p>
      </div>
    </section>

    <!-- TALK TO US: the page's one action, the sales team's scheduler. -->
    <section id="talk-to-us" class="w-full px-6 py-12 sm:py-16 bg-indigo-50/50 border-t border-gray-100 scroll-mt-16">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div class="text-center md:text-left">
          <h2>Discuss your <span class="text-indigo-600">first solution</span></h2>
          <p class="mt-3 text-gray-600">
            Pick a time with our team. Bring the problem you most want solved, and we'll tell you honestly whether FlowFuse is the right way to solve it.
          </p>
          <ul class="mt-6 flex flex-col gap-2 text-left list-none p-0">
            <li class="m-0 flex gap-2 text-gray-600 font-light">
              <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-indigo-600" aria-hidden="true" />
              No preparation needed, just a problem worth solving
            </li>
            <li class="m-0 flex gap-2 text-gray-600 font-light">
              <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-indigo-600" aria-hidden="true" />
              Talk to people who build industrial applications on FlowFuse
            </li>
            <li class="m-0 flex gap-2 text-gray-600 font-light">
              <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-indigo-600" aria-hidden="true" />
              Leave with an agreed next step
            </li>
          </ul>
          <p class="mt-8 text-sm text-gray-500">
            Already have a FlowFuse account?
            <CtaSignIn variant="nav-text" position="build-with-us" class="text-indigo-600" />
          </p>
        </div>
        <div class="min-w-0 overflow-hidden">
          <HubSpotMeetings />
        </div>
      </div>
    </section>

    <!-- FAQ: also emitted as FAQPage structured data from the same array. -->
    <section class="w-full px-6 py-12 sm:py-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <Faq :faq="FAQ" />
      </div>
    </section>
  </div>
</template>
