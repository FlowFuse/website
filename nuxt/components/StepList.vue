<script setup lang="ts">
// A numbered vertical step list beside a sticky heading. It started as the "From OPC UA
// to insight, step by step" band on /integrations/opcua/, and /platform/device-agent/
// and /use-cases/remote-device-management/ each carried a copy before this.
//
// Each step's `label` defaults to "Step <n>". Headings, intro and step text are HTML
// strings (links, accent spans), rendered with v-html: they come from this repo's own
// pages and YAML, never from a visitor.
//
// On mobile the icon sits between two short horizontal lines; from sm up there is a
// single vertical line below it, offset so the icon lines up with the title rather than
// the label above it.

defineProps<{
    heading: string
    eyebrow?: string
    intro?: string
    link?: { label: string, href: string }
    steps: Array<{ icon: string, title: string, text: string | string[], label?: string }>
}>()

const paragraphs = (text: string | string[]) => (Array.isArray(text) ? text : [text])
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto md:flex md:gap-12 md:items-start">
      <div class="mb-12 md:mb-0 md:w-[373px] md:shrink-0 md:sticky! md:top-24 md:self-start max-md:text-center">
        <p v-if="eyebrow" class="text-gray-500 text-sm font-semibold uppercase mt-0 mb-3">{{ eyebrow }}</p>
        <h2 class="mt-0 mb-0" v-html="heading" />
        <p v-if="intro" class="font-light text-gray-700 leading-relaxed mt-6 mb-0" v-html="intro" />
        <NuxtLink v-if="link" :to="link.href" class="mt-3 inline-flex items-center gap-1.5">
          {{ link.label }}
          <UIcon name="i-heroicons-arrow-long-right-20-solid" class="w-5 h-5 shrink-0" />
        </NuxtLink>
      </div>
      <div class="max-w-screen-md mx-auto md:mx-0">
        <div v-for="(step, index) in steps" :key="step.title" class="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div class="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
            <div class="ff-line h-px flex-1 sm:hidden" />
            <UIcon :name="step.icon" class="w-6 h-6 text-indigo-600 shrink-0 sm:mt-7" />
            <div class="ff-line h-px flex-1 sm:hidden" />
            <div v-if="index !== steps.length - 1" class="ff-line hidden sm:block w-px flex-1 my-4 bg-gray-300" />
          </div>
          <div :class="index !== steps.length - 1 ? 'pb-10 sm:pb-12' : ''">
            <span class="block text-sm font-semibold text-gray-500 mb-1 text-center sm:text-left">{{ step.label || `Step ${index + 1}` }}</span>
            <h3 class="mt-0 mb-4 sm:mb-2 text-xl font-semibold text-indigo-600 text-center sm:text-left">{{ step.title }}</h3>
            <p
                v-for="(paragraph, p) in paragraphs(step.text)"
                :key="p"
                class="font-light text-gray-600"
                :class="p === paragraphs(step.text).length - 1 ? 'mb-0' : ''"
                v-html="paragraph"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
