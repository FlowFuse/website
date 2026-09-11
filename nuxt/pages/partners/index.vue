<script setup lang="ts">
// Ported from src/partners/index.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The section headings carried <span class="text-indigo-600"> in frontmatter, printed
//    with `| safe`. They go through nuxt/lib/rich-text.mjs, which escapes the string and
//    re-enables only an allowlisted set of inline tags.
//  - Production renders an empty second <h1> from layouts/page.njk (the page sets a
//    `title` but its own body writes no heading, so the layout's hero branch emits
//    "FlowFuse Partners"). That heading is kept; there is only one <h1> here.
import { renderRichText } from '../../lib/rich-text.mjs'

const SECTIONS = [
    {
        title: '<span class="text-indigo-600">Cloud</span> Providers',
        description: 'FlowFuse is available for deployment from the marketplace of the following Cloud providers.',
        partners: [
            { name: 'Amazon Web Services', logo: '/images/partners/logo-aws.png', url: 'https://aws.amazon.com/marketplace/pp/prodview-3ycrknfg67rug' },
            { name: 'Digital Ocean', logo: '/images/partners/logo-digital-o.png', url: 'https://marketplace.digitalocean.com/apps/flowforge' },
        ],
    },
    {
        title: '<span class="text-indigo-600">Hardware</span> Partners',
        description: 'FlowFuse partners with key industry hardware partners to provide an integrated experience using Node-RED and FlowFuse.',
        ctaText: 'CERTIFY YOUR HARDWARE',
        ctaUrl: '/partners/certify-hardware/',
        partners: [
            { name: 'Bosch Rexroth', logo: '/images/partners/logo-rexroth.png', url: '/partners/ctrlx/' },
            { name: 'NCD.io', logo: '/images/partners/logo-ncd-io.png', url: 'https://ncd.io/' },
            { name: 'Wago', logo: '/images/partners/logo-wago.png', url: 'https://www.wago.com/global/' },
        ],
    },
    {
        title: '<span class="text-indigo-600">Solutions</span> Partners',
        subtitle: 'Build and Deploy Enterprise-Ready Solutions',
        description: 'Our Solutions Partners, trusted resellers and system integrators, help you design, implement, and manage production-ready applications with Node-RED and FlowFuse. They provide:',
        ctaText: 'APPLY NOW',
        ctaUrl: '/partners/referral-sign-up/',
        bulletPoints: [
            'Expertise in enterprise industrial IoT, SCADA, MES, and UNS',
            'Specialized, local support and services',
            'Seamless integration with industry-specific tools',
            'Scalable solutions tailored to your business needs',
        ],
        partners: [
            { name: 'Gallarus', logo: '/images/partners/logo-gallarus.png', url: 'https://gis.ie/' },
            { name: 'Idoneos', logo: '/images/partners/logo-idoneos.png', url: 'https://idoneos.com/' },
            { name: 'Iniationware', logo: '/images/partners/logo-iniationware.png', url: 'https://iniationware.eu/' },
            { name: '4.0 Hero', logo: '/images/partners/logo-40hero.png', url: 'https://40hero.com/' },
            { name: 'Mayker', logo: '/images/partners/logo-mayker.png', url: 'https://mayker.eu/' },
        ],
    },
]

const DESCRIPTION = 'FlowFuse partners with leading cloud, hardware, technology and consulting companies to provide a complete solution that allows our customers to deliver results using Node-RED and FlowFuse.'

useSeoMeta({
    title: 'FlowFuse Partners',
    description: DESCRIPTION,
    ogDescription: DESCRIPTION,
    keywords: 'FlowFuse Partners, Node-RED System Integrator',
    ogUrl: 'https://flowfuse.com/partners/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
        <div class="mx-auto max-w-screen-xl md:max-w-xl">
          <h1>FlowFuse Partners</h1>
          <p class="lead-p m-auto mt-3">{{ DESCRIPTION }}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="partners mx-auto w-full flex flex-col gap-4">
        <div v-for="section in SECTIONS" :key="section.ctaUrl || section.title" class="w-full py-14 px-6">
          <div class="max-w-screen-lg m-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-x-6 md:items-start md:grid-rows-[auto_minmax(20px,_1fr)]">
            <div class="w-full">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <h3 class="max-md:text-center w-full" v-html="renderRichText(section.title)" />
              <h5 v-if="section.subtitle" class="m-auto max-md:text-center w-full font-normal">{{ section.subtitle }}</h5>
              <p class="mt-8">{{ section.description }}</p>
              <div v-if="section.bulletPoints" class="prose ff-prose">
                <ul>
                  <li v-for="point in section.bulletPoints" :key="point">{{ point }}</li>
                </ul>
              </div>
            </div>
            <ul class="grid grid-cols-2 justify-center w-full items-center gap-4 md:row-span-2 max-md:mt-6">
              <a
                  v-for="partner in section.partners"
                  :key="partner.name"
                  :href="partner.url"
                  target="_blank"
                  class="partner-logo flex justify-center align-center items-center h-[90px] bg-white px-6 py-4 border rounded-lg hover:drop-shadow-lg transition ease-in duration-300"
              >
                <img :src="partner.logo" :alt="`${partner.name} logo`" loading="lazy" class="max-h-full w-auto">
              </a>
            </ul>
            <div v-if="section.ctaText && section.ctaUrl" class="max-md:mx-auto mt-6 pt-6 md:pt-0 max-md:mt-8">
              <NuxtLink :to="section.ctaUrl" class="text-center inline-block ff-btn ff-btn--primary uppercase">
                <span>{{ section.ctaText }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
