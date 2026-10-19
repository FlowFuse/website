<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
// Where the retired free trial sends people. FlowFuse no longer offers a
// self-serve trial: a visitor talks to the sales team, and FlowFuse engineers
// build the first production application alongside them (the Foundation
// Partnership). The page explains that change and ends in the sales team's
// meeting scheduler, the same embed /book-demo/ uses.
//
// No prices here on purpose: the Solution Foundation rates are still working
// numbers, not an approved price list. Scope is described, cost is scoped on
// the call. The number of Solutions the Foundation Fee includes is also not
// settled (the sales deck gives one, one per Site, and two per Site), so the
// page names the two Sites and leaves the Solution count to scoping.
// When the customer pays relative to the pilot is likewise undecided, so the
// page says the engineering is part of the license and not when it is bought.
useSeoMeta({
    title: 'Build Your First Application With FlowFuse Engineers',
    description: 'FlowFuse has replaced its free trial. Talk to our team, and our engineers will build your first industrial application alongside you, then help you scale it across your plants.',
    ogUrl: 'https://flowfuse.com/build-with-us/',
    twitterSite: '@FlowFuseinc',
})

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

// The visitor's side of the enterprise sales cycle: conversation, solution
// shaping, the included engineering engagement, then rollout across plants.
const STEPS = [
    { icon: 'i-lucide-messages-square', title: 'Talk to our team', description: 'Tell us about the operational problem you want solved, the systems involved and who needs to be part of it. We confirm FlowFuse is the right fit before anything else happens.' },
    { icon: 'i-lucide-ruler', title: 'Shape the solution', description: 'Together we agree the scope, build a conservative case for the value it delivers, and show you how FlowFuse addresses your use case on a live demo.' },
    { icon: 'i-lucide-hammer', title: 'Build it together', description: 'As part of your license, FlowFuse engineers work alongside your team for 30 days to deliver a working first capability, with documentation and a plan for validating it in production.' },
    { icon: 'i-lucide-factory', title: 'Prove it, then scale', description: 'Validate the results in production, then reuse what we built to roll it out to more sites and solve the next problem, with your own engineers, a partner or FlowFuse.' },
]

// What teams said they were missing when they tried to get started on their
// own. The reason the trial was retired, so it sits directly under the hero.
const NEEDS = [
    { icon: 'i-lucide-graduation-cap', title: 'Expertise', description: 'People who have connected PLCs, historians, MES and ERP systems before, and know where industrial projects stall.' },
    { icon: 'i-lucide-route', title: 'A proven path', description: 'An implementation pattern that has already worked in production, rather than a blank canvas and a list of features.' },
    { icon: 'i-lucide-handshake', title: 'Help building it', description: 'Engineers working next to their own team on a real problem, until the first application is running.' },
]

const PARTNERSHIP = [
    { title: 'A first solution', description: 'We work with your manufacturing and technical teams on one agreed operational problem, with production use as the goal.' },
    { title: 'A reusable foundation', description: 'Architecture, data models, governance and integration patterns built once, so the next deployment starts ahead.' },
    { title: 'Your team owns it', description: 'Joint development, documentation and knowledge transfer leave your engineers able to extend it without us.' },
    { title: 'Faster plant expansion', description: 'Each new plant reuses the foundation instead of repeating the engineering work from scratch.' },
]

const INCLUDED = [
    { icon: 'i-lucide-calendar-check', title: 'An annual license', description: 'The FlowFuse platform for two Sites, with unlimited users.' },
    { icon: 'i-lucide-layers', title: 'Solutions chosen per Site', description: 'Each Site picks the operational capabilities it runs. We agree which are included when we scope your license.' },
    { icon: 'i-lucide-users', title: '30 days of engineering', description: 'FlowFuse engineers deliver a working initial capability within an agreed scope.' },
    { icon: 'i-lucide-book-open-check', title: 'Everything to carry on', description: 'A reusable deployment package, operating documentation, knowledge transfer and a pilot validation plan.' },
]

const FAQ = [
    {
        question: 'What happened to the FlowFuse free trial?',
        answer: 'We have replaced it. A trial gave you an empty platform and left the hard part, turning it into a working industrial application, to you. Now our engineers build your first application with you, so you see FlowFuse solving one of your own problems rather than a demo.',
    },
    {
        question: 'What happens on the first call?',
        answer: 'We talk through the operational problem you want to solve, the equipment and systems involved, and who would be part of the project. If FlowFuse is a good fit, we agree the next step together, usually a session to scope the solution and its value.',
    },
    {
        question: 'What is a Site, and what is a Solution?',
        answer: 'A Site is a named operating facility, such as a plant. Buildings run as one integrated campus can count as a single Site, and the number of gateways or devices does not change the count.\n\nA Solution is a named, reusable operational capability that solves a defined business problem, for example machine alerting or OEE monitoring. The flows, integrations and dashboards that make it work are part of the Solution, not licensed separately.',
    },
    {
        question: 'Can our team maintain it without you?',
        answer: 'Yes. The work is done jointly with your team and comes with documentation and knowledge transfer, so your engineers can maintain and extend it after the initial engagement. Later work can come from your own team, a partner or FlowFuse.',
    },
    {
        question: 'How much does it cost?',
        answer: 'Pricing depends on how many Sites and Solutions you need and the length of your commitment, and the initial engineering engagement is included in the annual license. We scope it with you once we understand the problem you want to solve.\n\nLooking for a standard product license instead? Edge, Hub and Fleet are still available on our [pricing page](/pricing/).',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full">
    <!-- HERO: says plainly what changed, since most visitors arrive from an old
         "Free Trial" link expecting a sign-up form. -->
    <section class="w-full px-6 pt-12 md:pt-24 pb-12 sm:pb-16">
      <div class="max-w-3xl mx-auto text-center mt-6 sm:mt-12">
        <p class="text-indigo-600 mb-4 text-sm font-semibold uppercase tracking-wide">The free trial has moved on</p>
        <h1 class="font-medium home text-gray-900 mb-6">
          Don't start from a blank canvas. <span class="text-indigo-600">We'll build it with you.</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Instead of a self-serve trial, our engineers work alongside your team to build your first industrial application, then help you prove it and reuse it across your plants.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#talk-to-us" class="ff-btn ff-btn--primary uppercase font-semibold no-underline">Talk to our team</a>
          <a href="#how-it-works" class="text-indigo-600 font-medium inline-flex items-center gap-1 no-underline hover:underline">
            See how it works
            <UIcon name="i-lucide-arrow-down" class="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <!-- WHY WE CHANGED: the reason the trial is gone, told before the new model,
         so the steps below read as the answer to it. No top padding: the hero's
         bottom padding already separates the two on the same background. -->
    <section class="w-full px-6 pt-4 pb-12 sm:pb-16">
      <div class="md:max-w-screen-lg m-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p class="text-indigo-600 mb-3 text-sm font-semibold uppercase tracking-wide">Why we changed</p>
          <h2 class="m-0">Tools were never <span class="text-indigo-600">the hard part</span></h2>
          <p class="mt-6 text-gray-600">
            As we talked with teams getting started on FlowFuse, we kept hearing the same thing. The platform did what they needed. What held them back was everything around it: connecting to their own equipment, modelling their data, deciding how it should be governed, and knowing what a production-ready application looks like.
          </p>
          <p class="mt-4 text-gray-600">
            A free trial handed them the tools and left them to work that out alone. Too many good projects stalled at a blank canvas, not because the problem was too hard, but because nobody had solved it with them before.
          </p>
          <p class="mt-4 text-gray-900 font-medium">
            So we stopped offering a trial, and started building with our customers instead.
          </p>
        </div>
        <div class="rounded-xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
          <p class="m-0 border-b border-indigo-100 bg-indigo-50/60 px-5 py-3 font-mono text-xs font-semibold uppercase leading-4 tracking-[0.04em] text-indigo-600">
            What teams told us they needed
          </p>
          <ul class="m-0 list-none p-0">
            <li v-for="(need, index) in NEEDS" :key="need.title" class="m-0 flex gap-4 px-5 py-5" :class="index > 0 ? 'border-t border-indigo-100' : ''">
              <UIcon :name="need.icon" class="size-6 shrink-0 text-indigo-600 mt-0.5" aria-hidden="true" />
              <div>
                <p class="m-0 font-medium text-gray-900">{{ need.title }}</p>
                <p class="m-0 mt-1 text-sm text-gray-600 font-light">{{ need.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS: the visitor's journey, four steps in order. -->
    <section id="how-it-works" class="w-full px-6 py-12 sm:py-16 scroll-mt-16">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2>From first call to <span class="text-indigo-600">production</span></h2>
          <p class="mt-3 text-gray-600">Every step has a clear purpose and an agreed next action, so you always know where the project stands.</p>
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
      </div>
    </section>

    <!-- FOUNDATION PARTNERSHIP: what the visitor ends up with. -->
    <section class="w-full px-6 py-12 sm:py-16 bg-indigo-50/60 border-t border-gray-100">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2>More than one app: <span class="text-indigo-600">a foundation</span></h2>
          <p class="mt-3 text-gray-600">
            We call this a Foundation Partnership. The platform is
            <a href="/platform/" :class="LINK">FlowFuse</a>, configured and extended around your operations, so the first application becomes the starting point for every plant after it.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
          <div v-for="(item, index) in PARTNERSHIP" :key="item.title" class="border-t border-indigo-200 pt-6">
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 m-0">0{{ index + 1 }}</p>
            <h3 class="text-2xl font-medium text-gray-900 mt-3 mb-0">{{ item.title }}</h3>
            <p class="text-gray-600 font-light mt-2 mb-0">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- INCLUDED: the shape of the package, without prices. -->
    <section class="w-full px-6 py-12 sm:py-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="text-center max-w-3xl mx-auto">
          <h2>What's <span class="text-indigo-600">included</span></h2>
          <p class="mt-3 text-gray-600">A recurring platform license with the engineering to get your first solution running built in.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div v-for="item in INCLUDED" :key="item.title" class="rounded-lg border border-indigo-100 bg-white p-6 shadow-sm flex flex-col gap-3">
            <UIcon :name="item.icon" class="size-8 text-indigo-600" aria-hidden="true" />
            <p class="font-medium text-gray-900 m-0">{{ item.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ item.description }}</p>
          </div>
        </div>
        <p class="mt-8 text-center text-sm text-gray-500">
          Further implementation, extra Sites and extra Solutions are scoped and priced separately.
          Prefer a standard product license? <CtaLink destination="pricing" position="included" :class="LINK">Edge, Hub and Fleet</CtaLink> are still available.
        </p>
      </div>
    </section>

    <!-- TALK TO US: the page's one action, the sales team's scheduler. -->
    <section id="talk-to-us" class="w-full px-6 py-12 sm:py-16 bg-indigo-50/50 border-t border-gray-100 scroll-mt-16">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div class="text-center md:text-left">
          <h2>Start with <span class="text-indigo-600">one conversation</span></h2>
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
              Talk to people who build industrial applications
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
