<script setup lang="ts">
// Ported from src/use-cases/scada.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - Frontmatter that carried markup (the heading spans) is written as template markup
//    here instead of being printed with `| safe`.
//  - The three CTA macros become <CtaContactUs>, <CtaSignUp> and <CtaBookDemo>.
//  - Production renders TWO <h1>, both reading "FlowFuse for SCADA": layouts/page.njk
//    emits one from `title` when `nohero` is set, and the template writes its own. Only
//    one survives here.
//  - The .njk closed the banner heading with a stray </span> that had no opening tag.
const META_DESCRIPTION = 'FlowFuse provides SCADA value in an Industry 4.0 way and unlocks the potential to modernize your SCADA system with its powerful, customizable, modular components that streamline operations, reduce dependence on costly, monolithic solutions.'

const HOW_P3 = [
    'After perfecting the flow to connect your devices needed for control, you add settings to send data from every important part of the process to a database. To save time creating actionable visualizations, you pull in one of the customizable dashboard Blueprints approved by FlowFuse. Because this entire process runs on FlowFuse, each step is customizable and not limited to built-in parameters imposed by closed software. The entire operation is secure and can scale to as many lines and sites as you need.',
    'The last step is to create useful visualizations. Since your team has been empowered to build the applications you need, you import some of your custom nodes and flows from your Team Library directly into your instance, structure your data the way you want to see it, and use FlowFuse Dashboard to create actionable visualizations. Because this entire process runs on FlowFuse, each step is customizable and not limited to built-in parameters imposed by closed software. The entire operation is secure and can scale to as many lines and sites as you need.',
    'No matter your SCADA setup, FlowFuse empowers your organization to securely control, connect, and operate your workflow the way you see fit.',
]

const REASONS = [
    { title: 'Built-in adaptation layer', description: "Leverage FlowFuse's platform to integrate your SCADA functions into a comprehensive, modular solution." },
    { title: 'End-to-end insight and control', description: 'Everything you need to connect, manage, visualize and analyze your data in one place.' },
    { title: 'Limitless connections', description: 'Robust and growing open-source library provides connections for all protocols, all machines, and all devices.' },
    { title: 'Rapid implementation', description: 'Get up and running quickly on FlowFuse Cloud.' },
    { title: 'Open-source', description: 'Avoid vendor lock-in. Rely on an open-source community of thousands for insights and advice.' },
    { title: 'Low-Code', description: 'Empowering your teams to build custom solutions with ease.' },
]

useSeoMeta({
    title: 'FlowFuse for SCADA',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    keywords: 'FlowFuse, manufacturing, SCADA, Industry 4.0, Siemens S7, PLC, Sentron',
    ogUrl: 'https://flowfuse.com/use-cases/scada/',
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
                FlowFuse for <span class="text-indigo-600 inline-block">SCADA</span>
              </h1>
              <p class="mb-10 flex-grow">{{ META_DESCRIPTION }}</p>
              <div class="flex md:hidden justify-center m-auto max-w-[400px] mb-10">
                <img src="/images/solutions/scada-hero.png" alt="SCADA system with FlowFuse" width="400" class="w-full h-auto">
              </div>
              <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
                <CtaContactUs variant="primary" position="primary" class="min-h-[40px]" />
                <CtaSignUp variant="primary-outlined" position="primary" class="min-h-[40px]" />
              </div>
            </div>
            <div class="flex max-md:hidden justify-center m-auto max-w-[450px]">
              <img src="/images/solutions/scada-hero.png" alt="SCADA system with FlowFuse" width="450" class="w-full h-auto">
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto">
            <div class="flex md:flex-row flex-col w-full bg-white border-2 border-indigo-200 px-6 py-2 drop-shadow-lg md:gap-6 rounded-lg">
              <h2 class="w-full max-sm:mx-auto my-6 text-indigo-400">SCADA meets Industry 4.0</h2>
              <p class="md:max-w-2/3 max-sm:mx-auto">
                Legacy SCADA systems were built to monitor and control industrial systems before technological
                advancements provided a way to perform those functions without monolithic hardware systems. FlowFuse
                provides what you need to augment and develop modern SCADA, enabling industrial control and monitoring
                at scale and with enterprise-grade security. Enjoy low-code, agile, and responsive development with a
                platform that will integrate with all future protocols.
              </p>
            </div>

            <h2 class="mt-16">How it Works</h2>
            <p class="w-full max-sm:mx-auto mt-6">
              FlowFuse uses open-source, low-code technology capable of quickly and securely building applications to
              connect, integrate, and control machines previously packaged as a standalone SCADA system.
            </p>
            <div class="mx-auto max-w-[550px] my-12">
              <img src="/images/solutions/scada-how-diagram.png" alt="FlowFuse SCADA diagram" width="550" class="w-full h-auto">
            </div>
            <p class="w-full max-sm:mx-auto mt-6">
              Let’s take an example. Your factory is using a Siemens S7 PLC and a Sentron, collecting data from various
              sensors and actuators. You want to manage the efficiency of this process, so you open the FlowFuse
              instance that you created for managing this workflow and drag in the FlowFuse Certified S7 PLC node and
              Sentron node, entering configuration details to connect these devices along with anything else running in
              your factory.
            </p>
            <div class="mx-auto ff-image-rounded border drop-shadow-md p-1 max-w-[385px] my-12 bg-white">
              <img src="/images/solutions/scada-how-flow.png" alt="FlowFuse flow using the FlowFuse Certified S7 PLC node" width="385" class="w-full h-auto">
            </div>
            <p v-for="(paragraph, i) in HOW_P3" :key="i" class="w-full max-sm:mx-auto mt-6">{{ paragraph }}</p>
            <p class="w-full max-sm:mx-auto mt-6">
              FlowFuse connects Siemens, Allen-Bradley, Omron, and other PLCs to MQTT, OPC UA, cloud, and enterprise
              systems, without expensive gateways or proprietary lock-in. See the
              <NuxtLink to="/landing/plc/" class="text-indigo-600 hover:underline">FlowFuse PLC integration overview</NuxtLink>
              for all supported protocols and use cases.
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
          <h4 class="mb-6 w-full text-center">Ready to unlock SCADA for your organization?</h4>
          <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center">
            <CtaBookDemo variant="primary" position="secondary" class="min-h-[40px]" />
            <CtaSignUp variant="primary-outlined" position="secondary" class="min-h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
