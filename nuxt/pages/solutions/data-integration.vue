<script setup>
// ffIconLg wraps the icon file content in <svg class="ff-icon ff-icon-lg[ ff-icon--solid]" ...>.
const icon = (inner, solid) =>
    `<svg class="ff-icon ff-icon-lg${solid ? ' ff-icon--solid' : ''}" fill="none" viewbox="0 0 24 24">${inner}</svg>`

const challenges = [
    { svg: icon('<svg fill="none" height="26" viewBox="0 0 22 26" width="22" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h22v26h-22z"/><g fill="currentColor"><path d="m5.50215 12.132c-.88733 0-1.54733-.33-1.98-.99-.42533-.6673-.638-1.661-.638-2.981s.21267-2.31.638-2.97c.43267-.66733 1.09267-1.001 1.98-1.001s1.54367.33367 1.969 1.001c.43267.66.649 1.65.649 2.97s-.21633 2.3137-.649 2.981c-.42533.66-1.08167.99-1.969.99zm0-.572c.66 0 1.144-.2493 1.452-.748.308-.506.462-1.21733.462-2.134v-1.034c0-.90933-.154-1.617-.462-2.123s-.792-.759-1.452-.759-1.144.253-1.452.759-.462 1.21367-.462 2.123v1.034c0 .91667.154 1.628.462 2.134.308.4987.792.748 1.452.748zm0-2.893c-.19067 0-.32633-.04033-.407-.121s-.121-.17967-.121-.297v-.176c0-.11733.04033-.21633.121-.297s.21633-.121.407-.121.32633.04033.407.121.121.17967.121.297v.176c0 .11733-.04033.21633-.121.297s-.21633.121-.407.121z"/><path d="m14.1921 12v-.572h2.288v-6.622h-.055l-2.112 1.881-.374-.418 2.189-1.947h1.001v7.106h2.145v.572z"/><path d="m3.19215 23v-.572h2.288v-6.622h-.055l-2.112 1.881-.374-.418 2.189-1.947h1.001v7.106h2.145v.572z"/><path d="m16.5021 23.132c-.8873 0-1.5473-.33-1.98-.99-.4253-.6673-.638-1.661-.638-2.981s.2127-2.31.638-2.97c.4327-.6673 1.0927-1.001 1.98-1.001.8874 0 1.5437.3337 1.969 1.001.4327.66.649 1.65.649 2.97s-.2163 2.3137-.649 2.981c-.4253.66-1.0816.99-1.969.99zm0-.572c.66 0 1.144-.2493 1.452-.748.308-.506.462-1.2173.462-2.134v-1.034c0-.9093-.154-1.617-.462-2.123s-.792-.759-1.452-.759-1.144.253-1.452.759-.462 1.2137-.462 2.123v1.034c0 .9167.154 1.628.462 2.134.308.4987.792.748 1.452.748zm0-2.893c-.1906 0-.3263-.0403-.407-.121-.0806-.0807-.121-.1797-.121-.297v-.176c0-.1173.0404-.2163.121-.297.0807-.0807.2164-.121.407-.121.1907 0 .3264.0403.407.121.0807.0807.121.1797.121.297v.176c0 .1173-.0403.2163-.121.297-.0806.0807-.2163.121-.407.121z"/></g></svg>', true), text: 'Data comes from different sources, including internal IT systems (ERP, CRM, SCM), IoT devices, external data services (weather, foreign exchange, etc.)' },
    { svg: icon('<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>'), text: 'Data is accessible in a wide variety of formats, including CSV files, REST Api, XML, YAML, MQTT.' },
    { svg: icon('<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>'), text: 'Access to data is often gated by IT departments making it slow and timing consuming for departments to get access to new integrated data.' },
    { svg: icon('<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>'), text: 'Data needs to be stored in different formats and databases.' },
    { svg: icon('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>'), text: 'Data needs to be visualized and communicated back to a user.' },
]

useHead({
    title: 'FlowFuse for Data Integration • FlowFuse',
})
</script>

<template>
  <!-- Hero (reproduces layouts/solution.njk) -->
  <div class="page w-full px-6 mt-12 md:px-0">
    <div class="hero container m-auto text-center max-w-screen-md">
      <div>
        <h1 class="px-12 md:px-0 m-auto">FlowFuse for Data Integration</h1>
        <h4 class="mt-4 text-indigo-400" />
      </div>
      <div class="flex items-center gap-6 mt-6">
        <div class="hidden sm:block w-64 flex-shrink-0">
          <img src="/images/pictograms/data_integration_blue.png" alt="Hero image for the respective solution" style="max-width:250px" />
        </div>
        <div class="flex flex-col justify-center text-center sm:text-left py-2">
          <p class="mt-0">Data integration can be a challenging task, especially when dealing with multiple data formats, protocols, and sources. FlowFuse's low-code industrial application platform allows anyone to collect data from multiple sources, apply the data, and update, store, and transmit data to a new service.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full px-0">
    <div>
      <div class="mt-6 text-center">
        <a href="/contact-us/" class="inline-block ff-btn ff-btn--highlight shadow">GET IN TOUCH</a>
      </div>
    </div>

    <div class="container m-auto text-center mb-10">
      <div class="mt-20 content max-w-screen-lg m-auto">
        <h2 class="mb-4 m-auto">Challenges of Data Integration</h2>
        <div class="hidden sm:block w-full md:max-w-screen-lg m-auto">
          <img src="/images/solutions/data-integration.png" alt="." style="max-width:1024px" />
        </div>
        <div class="grid mt-12 px-6 grid-cols-1 md:grid-cols-3 gap-8 sm:mt-0 sm:gap-16 sm:gap-y-4 mb-20 text-left">
          <div v-for="(c, i) in challenges" :key="i" class="text-indigo-700">
            <span v-html="c.svg" />
            <p class="mt-2">{{ c.text }}</p>
          </div>
        </div>
        <div class="m-auto text-center sm:text-left p-8 max-w-md sm:max-w-screen-lg bg-indigo-50 rounded-lg border-[3px] border-indigo-200 mt-6 drop-shadow-xl">
          <h2 class="mb-10 m-auto font-bold">Why FlowFuse is the <span class="text-red-600">Data Integration Solution</span></h2>
          <div class="grid grid-cols-1 gap-8">
            <div class="text-left self-start">
              <h4>Accessible for Anyone</h4>
              <div><p>FlowFuse’s low-code visual environment makes it easy for non-programmers to integrate data from different sources without needing to know how to code. This enables all kinds of departments to work on their own data integration projects without requiring support from IT.</p></div>
            </div>
            <div class="text-left self-start">
              <h4>Real-Time Data Visualisation</h4>
              <p>FlowFuse makes it easy to create real-time data visualizations and dashboards. Data can be filtered, transformed and analyzed through event-driven flows to get real-time insights into your business.</p>
            </div>
            <div class="text-left self-start">
              <h4>Support for Different Data Formats</h4>
              <p>FlowFuse supports parsing a wide range of formats including: <strong>csv</strong>, <strong>html</strong>, <strong>json</strong>, <strong>xml</strong> and <strong>yaml</strong>. Additional additional data formats are available through FlowFuse’s support for over 5,000 open-source plug-ins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-28 pt-12 md:px-0">
      <div class="page container pt-6 px-6 md:max-w-screen-lg m-auto sm:gap-y-4 text-center max-w-screen-lg">
        <div class="hero">
          <h2 class="mb-6 m-auto">FlowFuse Improves Data Integration</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8 mt-20 mb-12 text-left">
          <div>
            <div class="w-24 sm:w-24 mb-6 flex-shrink-0">
              <img src="/images/pictograms/community_blue.png" alt="" style="max-width:128px" />
            </div>
            <h4 class="block sm:hidden">Collaborative Development</h4>
            <h4 class="hidden sm:block">Collaborative<br>Development</h4>
            <div>
              <p>FlowFuse makes it possible for teams to collaborate on the same flows and applications.</p>
              <p>Team members can share instances to make for quicker and more efficient development, with full version control and audit trails built in.</p>
            </div>
          </div>
          <div>
            <div class="w-24 sm:w-24 mb-6 flex-shrink-0">
              <img src="/images/pictograms/node_catalog_blue.png" alt="" style="max-width:128px" />
            </div>
            <h4>Managed Application Service</h4>
            <div><p>We run your instances so you don’t have to worry about the production reliability of your industrial applications.</p></div>
          </div>
          <div>
            <div class="w-24 sm:w-24 mb-6 flex-shrink-0">
              <img src="/images/pictograms/bias_for_action_blue.png" alt="" style="max-width:128px" />
            </div>
            <h4 class="block sm:hidden">Software Delivery Pipelines</h4>
            <h4 class="hidden sm:block">Software Delivery<br>Pipelines</h4>
            <div>
              <p>FlowFuse allows you to create snapshots of your instances so you can create software delivery pipelines for development, test, and production. You can revert to a previous version of a snapshot to rollback any changes.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content max-w-screen-lg m-auto text-center border-2 rounded-lg py-6 px-20 bg-indigo-50 border-indigo-100">
        <p class="text-2xl leading-10 mt-0 mb-9">Discover how FlowFuse can power your Data Integration.</p>
        <div>
          <a href="/contact-us" class="inline-block ff-btn ff-btn--primary m-auto">GET IN TOUCH</a>
        </div>
      </div>
    </div>
  </div>
</template>
