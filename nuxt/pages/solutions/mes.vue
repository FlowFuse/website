<script setup>
const SIGNUP = 'https://app.flowfuse.com/account/create'

const meta = {
    title: 'FlowFuse for your own MES',
    description: 'FlowFuse provides everything you need to build the robust Manufacturing Execution System (MES) you want, providing everything from production tracking to data analysis, with the components you need and the flexibility to customize as you see fit.',
}
const heroSection = {
    title: "FlowFuse for <span class='text-indigo-600 inline-block'>your own MES</span>",
    image: '/images/solutions/mes-hero.png',
    imgAlt: 'MES with FlowFuse',
}
const bannerSection = {
    title: 'MES for Modern Industry',
    content: 'MES systems evolved to manage and monitor manufacturing operations on the shop floor, serving to bridge the gap between enterprise resource planning (ERP) systems and production process management like a SCADA system. Complete, monolithic MES systems are no longer needed. FlowFuse provides the resources that allow you to build and augment the components for the MES system you need, securely and at scale.',
}
const howSection = {
    title: 'How it Works',
    p1: [
        "Monolithic MES systems - think Siemens OpCenter Execution or Rockwell Automation’s Plex - offer MES products that are comprehensive and sophisticated, but also expensive and complex. In contrast, FlowFuse gives you a flexible, low-code industrial application platform with popular industry protocols, <a href='/integrations/'>integrations</a>, and our resource library to design and deploy applications for the MES solution you want for your business - and nothing more.",
        'Here is an example. An MES system is essentially a collection of management functions, like production tracking, resource management, data collection and analysis, and scheduling and dispatching. With FlowFuse, you can build the MES features you want by creating applications for the functions that you need, and none that you don’t.',
    ],
    p2: "Collect data from the shop floor or the lab by using <a href='/integrations/'>FlowFuse Certified Nodes</a> to connect with local machines using any protocol: MQTT, OPC-UA, Modbus, Sparkplug B, and any other protocol that exists now or in the future.",
    image1: '/images/home/connect_graphic.png',
    imageAlt1: 'Icons of communication protocols',
    image2: '/images/solutions/oee-dashboard--1.png',
    imageAlt2: 'OEE dashboard',
    p3: [
        "Create applications in FlowFuse to transform your data for analysis and create visualizations that enable your team to make data-driven decisions about your business. Our ever-expanding <a href='/blueprints/'>Blueprints library</a> helps you get started quickly.",
        "Because FlowFuse provides central management of all of your instances, you can easily monitor your applications whether you're running a dozen in a factory or thousands at sites across the globe.",
    ],
}
const industrySection = {
    title: 'MES for Your Industry',
    p1: [
        'The MES needs for an automotive plant, a pharmaceutical manufacturer, and an airline are all very distinct - and yet all can (and do) rely on FlowFuse. With the flexibility, security, and scalability of the FlowFuse platform, every kind of industrial operation can operate the MES they need.',
        'And with the FlowFuse open source advantage, you can extend the platform with any custom integrations or nodes you need at any time, and securely manage the instances that you create along the way.',
    ],
}
const whySection = {
    title: "The FlowFuse <span class='text-red-600'>Advantage</span>",
    reasons: [
        { title: 'Built-in adaptation layer', description: "Leverage FlowFuse's low-code platform to design exactly the MES your organization needs." },
        { title: 'End-to-end insight and control', description: 'Everything you need to connect, manage, visualize and analyze your data in one place.' },
        { title: 'Limitless connections', description: 'Robust and growing open-source library provides connections for all protocols, all machines, and all devices.' },
        { title: 'Rapid implementation', description: 'Get up and running quickly on FlowFuse Cloud.' },
        { title: 'Open-source', description: 'Avoid vendor lock-in.' },
        { title: 'Low-Code', description: 'Empowering your teams to build custom solutions with ease.' },
    ],
}
const ctaSection = {
    title: 'Ready to build the MES your business needs?',
    primaryUrl: '/book-demo/',
    primaryCta: 'Contact us for Demo',
    secondaryUrl: SIGNUP,
    secondaryCta: 'Try FlowFuse Now',
}

useHead({
    title: `${meta.title} • FlowFuse`,
    meta: [
        { name: 'description', content: meta.description },
        { name: 'keywords', content: 'FlowFuse, manufacturing, MES, Industry 4.0, Siemens S7, PLC, Sentron' },
    ],
})
</script>

<template>
  <div class="nohero w-full px-6">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
      <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
        <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12 max-w-lg">
          <h1 class="w-full mt-0 md:px-0 m-auto font-medium" v-html="heroSection.title" />
          <p class="mb-10 flex-grow">{{ meta.description }}</p>
          <div class="flex md:hidden justify-center m-auto max-w-[400px] mb-10">
            <img :src="heroSection.image" :alt="heroSection.imgAlt" style="max-width:400px" />
          </div>
          <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
            <a class="ff-btn ff-btn--primary min-h-[40px]" href="/contact-us/">TALK TO AN EXPERT</a>
            <a class="ff-btn ff-btn--primary-outlined min-h-[40px]" :href="SIGNUP">GET STARTED</a>
          </div>
        </div>
        <div class="flex max-md:hidden justify-center m-auto max-w-[550px]">
          <img :src="heroSection.image" :alt="heroSection.imgAlt" style="max-width:550px" />
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="max-w-screen-lg mx-auto">
        <div class="flex md:flex-row flex-col w-full bg-white border-2 border-indigo-200 px-6 py-2 drop-shadow-lg md:gap-6 rounded-lg">
          <h2 class="w-full max-sm:mx-auto my-6 text-indigo-400" v-html="bannerSection.title" />
          <p class="md:max-w-[680px] max-sm:mx-auto" v-html="bannerSection.content" />
        </div>
        <h2 class="mt-16" v-html="howSection.title" />
        <p v-for="(p, i) in howSection.p1" :key="'p1'+i" class="w-full max-sm:mx-auto mt-6" v-html="p" />
        <p class="w-full max-sm:mx-auto mt-4" v-html="howSection.p2" />
        <div class="mx-auto max-w-[550px] my-12">
          <img :src="howSection.image1" :alt="howSection.imageAlt1" style="max-width:550px" />
        </div>
        <div class="max-md:order-first">
          <p v-for="(p, i) in howSection.p3" :key="'p3'+i" class="w-full max-sm:mx-auto mt-4" v-html="p" />
        </div>
        <div class="mx-auto ff-image-rounded p-1 max-md:max-w-[500px] max-md:my-12 md:mt-4 max-md:order-last">
          <img :src="howSection.image2" :alt="howSection.imageAlt2" style="max-width:1024px" />
        </div>
        <h2 class="mt-16" v-html="industrySection.title" />
        <p v-for="(p, i) in industrySection.p1" :key="'ind'+i" class="w-full max-sm:mx-auto mt-6" v-html="p" />
      </div>
    </div>
  </div>
  <div class="w-full bg-indigo-50/50 py-12 mt-20 px-6">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="font-bold m-auto w-full text-center sm:text-left mb-12" v-html="whySection.title" />
      <div class="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div v-for="reason in whySection.reasons" :key="reason.title" class="w-full mt-4 md:mt-0 flex flex-col">
          <h4 class="flex justify-center sm:justify-start font-semibold text-gray-500">{{ reason.title }}</h4>
          <p class="text-center sm:text-left font-light mt-6 max-sm:max-w-md max-sm:mx-auto">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="max-md:max-w-xl md:max-w-screen-lg mx-auto max-sm:text-center pt-16 pb-10 px-6 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap mb-12">
    <div class="ff-blue-card max-sm:max-w-none">
      <h4 class="mb-6 w-full text-center">{{ ctaSection.title }}</h4>
      <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center">
        <a class="ff-btn ff-btn--primary min-h-[40px] uppercase" :href="ctaSection.primaryUrl">{{ ctaSection.primaryCta }}</a>
        <a class="ff-btn ff-btn--primary-outlined min-h-[40px] uppercase" :href="ctaSection.secondaryUrl">{{ ctaSection.secondaryCta }}</a>
      </div>
    </div>
  </div>
</template>
