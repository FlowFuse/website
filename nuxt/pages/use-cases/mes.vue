<script setup lang="ts">
// Ported from src/use-cases/mes.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The page's frontmatter carried markup (heading spans, inline links) that the .njk
//    printed with `| safe`. That markup is written directly in this template instead, so
//    nothing interpolates an HTML string at render time.
//  - The three CTA macros become <CtaContactUs>, <CtaSignUp> and <CtaBookDemo>.
//  - The .njk closed the banner heading with a stray </span> that had no opening tag;
//    browsers dropped it, and it is simply gone here.
//  - Production renders TWO <h1> on this page: layouts/page.njk emits one from `title`
//    when `nohero` is set, and the template then writes its own. Only the page's own,
//    more specific heading survives here.
const META_DESCRIPTION = 'FlowFuse provides everything you need to build the robust Manufacturing Execution System (MES) you want, providing everything from production tracking to data analysis, with the components you need and the flexibility to customize as you see fit.'

const REASONS = [
    { title: 'Built-in adaptation layer', description: "Leverage FlowFuse's low-code platform to design exactly the MES your organization needs." },
    { title: 'End-to-end insight and control', description: 'Everything you need to connect, manage, visualize and analyze your data in one place.' },
    { title: 'Limitless connections', description: 'Robust and growing open-source library provides connections for all protocols, all machines, and all devices.' },
    { title: 'Rapid implementation', description: 'Get up and running quickly on FlowFuse Cloud.' },
    { title: 'Open-source', description: 'Avoid vendor lock-in.' },
    { title: 'Low-Code', description: 'Empowering your teams to build custom solutions with ease.' },
]

useSeoMeta({
    title: 'FlowFuse for your own MES',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    keywords: 'FlowFuse, manufacturing, MES, Industry 4.0, Siemens S7, PLC, Sentron',
    ogUrl: 'https://flowfuse.com/use-cases/mes/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full px-6">
        <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
          <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
            <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12 max-w-lg">
              <h1 class="w-full mt-0 md:px-0 m-auto font-medium">
                FlowFuse for <span class="text-indigo-600 inline-block">your own MES</span>
              </h1>
              <p class="mb-10 flex-grow">{{ META_DESCRIPTION }}</p>
              <div class="flex md:hidden justify-center m-auto max-w-[400px] mb-10">
                <img src="/images/solutions/mes-hero.png" alt="MES with FlowFuse" width="400" class="w-full h-auto">
              </div>
              <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
                <CtaContactUs variant="primary" position="primary" class="min-h-[40px]" />
                <CtaSignUp variant="primary-outlined" position="primary" class="min-h-[40px]" />
              </div>
            </div>
            <div class="flex max-md:hidden justify-center m-auto max-w-[550px]">
              <img src="/images/solutions/mes-hero.png" alt="MES with FlowFuse" width="550" class="w-full h-auto">
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto">
            <div class="flex md:flex-row flex-col w-full bg-white border-2 border-indigo-200 px-6 py-2 drop-shadow-lg md:gap-6 rounded-lg">
              <h2 class="w-full max-sm:mx-auto my-6 text-indigo-400">MES for Modern Industry</h2>
              <p class="md:max-w-[680px] max-sm:mx-auto">
                MES systems evolved to manage and monitor manufacturing operations on the shop floor, serving to bridge
                the gap between enterprise resource planning (ERP) systems and production process management like a
                SCADA system. Complete, monolithic MES systems are no longer needed. FlowFuse provides the resources
                that allow you to build and augment the components for the MES system you need, securely and at scale.
              </p>
            </div>

            <h2 class="mt-16">How it Works</h2>
            <p class="w-full max-sm:mx-auto mt-6">
              Monolithic MES systems - think Siemens OpCenter Execution or Rockwell Automation’s Plex - offer MES
              products that are comprehensive and sophisticated, but also expensive and complex. In contrast, FlowFuse
              gives you a flexible, low-code industrial application platform with popular industry protocols,
              <NuxtLink to="/integrations/">integrations</NuxtLink>, and our resource library to design and deploy
              applications for the MES solution you want for your business - and nothing more.
            </p>
            <p class="w-full max-sm:mx-auto mt-6">
              Here is an example. An MES system is essentially a collection of management functions, like production
              tracking, resource management, data collection and analysis, and scheduling and dispatching. With
              FlowFuse, you can build the MES features you want by creating applications for the functions that you
              need, and none that you don’t.
            </p>
            <p class="w-full max-sm:mx-auto mt-4">
              Collect data from the shop floor or the lab by using
              <NuxtLink to="/integrations/">FlowFuse Certified Nodes</NuxtLink> to connect with local machines using any
              protocol: MQTT, OPC-UA, Modbus, Sparkplug B, and any other protocol that exists now or in the future.
            </p>
            <div class="mx-auto max-w-[550px] my-12">
              <img src="/images/home/connect_graphic.png" alt="Icons of communication protocols" width="550" class="w-full h-auto">
            </div>
            <div class="max-md:order-first">
              <p class="w-full max-sm:mx-auto mt-4">
                Create applications in FlowFuse to transform your data for analysis and create visualizations that
                enable your team to make data-driven decisions about your business. Our ever-expanding
                <NuxtLink to="/blueprints/">Blueprints library</NuxtLink> helps you get started quickly.
              </p>
              <p class="w-full max-sm:mx-auto mt-4">
                Because FlowFuse provides central management of all of your instances, you can easily monitor your
                applications whether you're running a dozen in a factory or thousands at sites across the globe.
              </p>
            </div>
            <div class="mx-auto ff-image-rounded p-1 max-md:max-w-[500px] max-md:my-12 md:mt-4 max-md:order-last">
              <img src="/images/solutions/oee-dashboard--1.png" alt="OEE dashboard" width="1024" class="w-full h-auto">
            </div>

            <h2 class="mt-16">MES for Your Industry</h2>
            <p class="w-full max-sm:mx-auto mt-6">
              The MES needs for an automotive plant, a pharmaceutical manufacturer, and an airline are all very distinct
              - and yet all can (and do) rely on FlowFuse. With the flexibility, security, and scalability of the
              FlowFuse platform, every kind of industrial operation can operate the MES they need.
            </p>
            <p class="w-full max-sm:mx-auto mt-6">
              And with the FlowFuse open source advantage, you can extend the platform with any custom integrations or
              nodes you need at any time, and securely manage the instances that you create along the way.
            </p>
          </div>
        </div>
      </div>

      <div class="w-full bg-indigo-50/50 py-12 mt-20 px-6">
        <div class="max-w-screen-lg mx-auto">
          <h2 class="font-bold m-auto w-full text-center sm:text-left mb-12">
            The FlowFuse <span class="text-red-600">Advantage</span>
          </h2>
          <div class="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div v-for="reason in REASONS" :key="reason.title" class="w-full mt-4 md:mt-0 flex flex-col">
              <h4 class="flex justify-center sm:justify-start font-semibold text-gray-500">{{ reason.title }}</h4>
              <p class="text-center sm:text-left font-light mt-6 max-sm:max-w-md max-sm:mx-auto">{{ reason.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-md:max-w-xl md:max-w-screen-lg mx-auto max-sm:text-center pt-16 pb-10 px-6 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap mb-12">
        <div class="ff-blue-card max-sm:max-w-none">
          <h4 class="mb-6 w-full text-center">Ready to build the MES your business needs?</h4>
          <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center">
            <CtaBookDemo variant="primary" position="secondary" class="min-h-[40px]" />
            <CtaSignUp variant="primary-outlined" position="secondary" class="min-h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
