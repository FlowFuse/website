<script setup>
const section2 = [
    {
        title: 'Effortless Development',
        description: "FlowFuse Dashboard's intuitive interface allows you to drag-and-drop widgets, buttons, and other elements to create rich dashboards without writing a single line of code. This significantly reduces development time and empowers non-technical users to build powerful applications.",
    },
    {
        title: 'Enhanced User Experience',
        description: 'Go beyond simple data visualization. FlowFuse Dashboard lets you create interactive dashboards with features like buttons and user-specific views. This empowers users to explore data, filter results, and take actions directly within the dashboard.',
    },
    {
        title: 'Extensible Ecosystem',
        description: 'Node-RED actively fosters a growing community of developers. This means a constantly expanding library of widgets and nodes, ensuring you have the tools you need to build any dashboard you can imagine.',
    },
    {
        title: 'Flexible deployment with FlowFuse',
        description: 'With FlowFuse you can deploy FlowFuse Dashboard along with enterprise-grade features on the cloud or on-premises. This ensures a smooth and efficient development experience, for a high-performance and scalable solution.',
    },
]

const resources = [
    {
        url: '/blog/2024/03/dashboard-getting-started/',
        title: 'Getting Started with Node-RED Dashboard 2.0',
        image: '/blog/2024/03/images/getting-started-with-dashboard-2.png',
    },
    {
        url: '/webinars/2024/node-red-dashboard-multi-user/',
        title: 'Personalised Multi User Dashboards with Node-RED Dashboard 2.0',
        image: '/images/webinars/multi-user-dashboard-with-node-red-dashboard-2-0-webinar-2024-february.jpg',
    },
    {
        url: '/ebooks/ultimate-guide-to-building-applications-with-flowfuse-dashboard-for-node-red/',
        title: 'The Ultimate Guide to Building Applications with FlowFuse Dashboard for Node-RED',
        image: '/images/ebooks/ebook_dashboard.png',
    },
]

// Reproduces the migration.njk interactive behavior (drag/drop + migrate-flow fetch).
onMounted(() => {
    const fileInput = document.getElementById('dashboard1-flow-file')

    window.openFilePicker = function () {
        document.getElementById('dashboard1-flow-file').click()
    }

    window.fileSelected = function () {
        const file = document.getElementById('dashboard1-flow-file').files[0]
        displayFileSelected(file)
    }

    function displayFileSelected (file) {
        if (file) {
            document.getElementById('file-selected-name').innerText = file.name
            document.getElementById('file-selected').style.display = 'block'
            document.getElementById('drag-instruction').style.display = 'none'
        } else {
            document.getElementById('file-selected').style.display = 'none'
            document.getElementById('drag-instruction').style.display = 'block'
        }
    }

    function downloadFlow (flow) {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(flow))
        const dlAnchorElem = document.getElementById('dashboard-2-download')
        dlAnchorElem.setAttribute('href', dataStr)
        dlAnchorElem.setAttribute('download', 'flow-dashboard2.json')
        dlAnchorElem.click()
    }

    window.migrateFile = function () {
        let file = null
        const selectedFile = document.getElementById('dashboard1-flow-file').files
        if (selectedFile) {
            file = selectedFile[0]
        }

        if (file) {
            fetch('https://dashboard-migration-service.flowfuse.cloud/migrate-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: file,
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                downloadFlow(body)
            }).catch((err) => {
                console.error('Error migrating flow', err)
            })
        }
    }

    window.dropHandler = function (event) {
        event.preventDefault()
        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile()
                    displayFileSelected(file)
                }
            })
        }
    }

    window.dragOverHandler = function (event) {
        event.preventDefault()
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => window.fileSelected())
    }
})

useHead({
    title: 'FlowFuse Dashboard • FlowFuse',
    meta: [
        { name: 'description', content: 'Create visually appealing and functional UIs in minutes with FlowFuse Dashboard for Node-RED, the open-source low-code platform for connecting data endpoints' },
    ],
})
</script>

<template>
  <!--Hero Content-->
  <div class="w-full px-6">
    <div class="max-w-md sm:max-w-screen-lg pb-6 mt-12 mx-auto">
      <div class="text-center md:text-left max-w-xl mx-auto md:mx-0 md:my-auto md:py-10 md:max-w-none">
        <h1 class="font-medium m-auto lg:m-0 max-sm:text-4xl">
          <span class="text-indigo-600">FlowFuse Dashboard</span> for <span class="inline-block">Node-RED</span>
        </h1>
        <h4 class="font-light mt-2 text-gray-500">
          Build visually appealing and useful UIs in minutes!
        </h4>
        <div class="justify-center items-center m-auto w-full flex mt-10 gap-3 dashboard-image">
          <img src="/images/dashboard/bar-chart.gif" alt="bar chart" loading="lazy" class="w-full h-auto">
          <img src="/images/dashboard/donut-chart.gif" alt="donut chart" loading="lazy" class="w-full h-auto">
          <img src="/images/dashboard/line-chart.gif" alt="line chart" loading="lazy" class="w-full h-auto">
        </div>
        <p class="mt-8 text-left">
          FlowFuse Dashboard is a revolutionary tool that allows you to create beautiful and functional dashboards
          within <a href="/node-red/">Node-RED</a>, the leading open-source low-code platform for wiring together a variety of data
          endpoints. Whether you're a long-time user or just getting started with Node-RED, FlowFuse Dashboard
          makes it easy to visualize and interact with your data like never before.
        </p>
        <p class="text-left">
          Much like the original Dashboard, FlowFuse Dashboard provides a set of easy-to-use, core nodes, but also
          provides complete flexibility for customization and control over theming, layout and behavior.
        </p>
        <div class="flex flex-col mt-10">
          <div
            class="m-auto flex gap-4 items-center justify-center md:items-start md:justify-start md:m-0 flex-row">
            <a class="ff-btn ff-btn--primary flex flex-col mb-6" href="https://dashboard.flowfuse.com/"
              target="_blank">
              <span class="text-base flex gap-2 uppercase items-center">
                GET STARTED
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Secondary Content -->
  <div class="w-full px-6">
    <div class="max-w-md md:max-w-screen-lg m-auto max-w-5xl">
      <!-- Empowering Anyone to Build Full-Stack Applications -->
      <h2 class="text-center w-full md:text-left"><span class="text-indigo-600">Empowering Anyone</span> to Build Full-Stack Applications</h2>
      <ul class="flex flex-col mx-auto w-full text-center md:grid md:grid-cols-2 gap-12 mt-12 mb-16">
        <li v-for="(item, i) in section2" :key="i" class="flex flex-col items-center md:items-start border-2 border-indigo-100 rounded-md p-6 pb-3 gap-3">
          <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
            <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
              <h5 class="w-full md:m-0 text-xl text-gray-600 text-center md:text-left">
                {{ item.title }}
              </h5>
            </div>
          </div>
          <div>
            <p class="text-center text-lg md:text-left font-light">
              {{ item.description }}
            </p>
          </div>
        </li>
      </ul>
      <!-- FlowFuse + Dashboard -->
      <div class="ff-blue-card">
        <h2 class="text-center w-full md:text-left mb-10"><span class="text-indigo-600">Unlock Your Full Potential</span> with FlowFuse</h2>
        <div class="md:flex md:flex-row md:gap-6">
          <div class="hidden md:block max-w-[250px] md:m-auto">
            <img src="/images/dashboard/dashboard-flowfuse.png" alt="FlowFuse Dashboard" loading="lazy" class="w-full h-auto">
          </div>
          <div class="text center md:text-left">
            <p class="text-lg">FlowFuse ensures your Dashboard applications are protected from the moment you deploy, with <a href="https://www.youtube.com/watch?v=pCYzJGVkG8s">trustworthy security out of the box.</a></p>
            <p class="text-lg"><a href="https://www.youtube.com/watch?v=TY9dhT_tAT0">Easy integration with FlowFuse Devices</a> makes building out applications to monitor and control hardware a breeze.</p>
            <p class="text-lg">With FlowFuse's User Addon, you can also <a href="https://flowfuse.com/blog/2024/01/dashboard-2-multi-user/">build personalized Dashboards for each of your users</a>, providing bespoke user experiences and data visualizations.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="about w-full bg-gray-50 mt-16 pt-16">
    <!-- Migration -->
    <div class="w-full px-6 pt-2">
      <div class="max-w-md sm:max-w-screen-lg mx-auto pb-14">
        <div class="mx-auto w-full md:max-w-screen-lg">
          <h2 id="migration-service" class="text-center w-full md:text-left">Easily migrate <span class="text-indigo-600">from Dashboard 1.0
            to FlowFuse Dashboard</span></h2>
          <p class="mt-6">
            Get started quickly with your new FlowFuse Dashboard. This migration service will automatically convert
            your original Node-RED Dashboard flows, and make them FlowFuse Dashboard-ready.
          </p>
        </div>
        <!-- migration.njk -->
        <div class="nohero w-full">
          <div class="m-auto">
            <div class="ff-dashboard-migration">
              <div>
                <div
                  class="ff-file-drop-zone"
                  role="button"
                  tabindex="0"
                  aria-label="Upload a flow.json file. Click or press Enter to choose a file, or drag and drop."
                  @click="openFilePicker()"
                  @keydown="(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFilePicker(); } }"
                  @drop="dropHandler($event)"
                  @dragover="dragOverHandler($event)">
                  <div id="drag-instruction">
                    <p>Drag a <i>flow.json</i> file containing Node-RED Dashboard 1.0 nodes here.</p>
                    <p>or, click <span class="text-blue-600">here</span> to choose a file.</p>
                  </div>
                  <div id="file-selected" style="display: none;">
                    <p>
                      Flow Uploaded: "<i id="file-selected-name">drop zone</i>""
                    </p>
                  </div>
                  <input id="dashboard1-flow-file" name="dashboard1-flow-file" type="file" accept="json" @change="fileSelected()">
                </div>
                <a id="dashboard-2-download" style="display:none" />
              </div>
              <div>
                <HubSpotForm form-id="968a9ab6-3dd8-45b2-991c-3f055dc18787" />
              </div>
            </div>
          </div>
        </div>
        <p>Note, this service is designed to help you get started with migration of your flow, and cannot automatically migrate the <i>full</i> flow over to FlowFuse Dashboard.</p>
        <p>Currently, we support the automatic conversion of the following nodes: <code>ui_tab</code>,
          <code>ui_link</code>, <code>ui_group</code>, <code>ui_text</code>, <code>ui_text_input</code>,
          <code>ui_slider</code>, <code>ui_switch</code>, <code>ui_form</code>, <code>ui_dropdown</code>, and <code>ui_button</code>.
          You can find out more details
          <a href="https://github.com/FlowFuse/node-red-dashboard-2-migration?tab=readme-ov-file#supported-nodes">here</a>.</p>
      </div>
    </div>
    <!-- Learning Resources -->
    <div class="bg-white pb-12 md:pb-20 pt-16 px-6 text-center">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <h2 class="text-center w-full md:text-left">FlowFuse Dashboard <span class="text-indigo-600">Learning Resources</span></h2>
        <ul class="mt-10 grid grid-cols-1 md:grid md:grid-cols-3 gap-y-4 m-auto gap-6">
          <li v-for="(item, i) in resources" :key="i" class="w-full max-w-md m-auto my-2">
            <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
              <div class="relative">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded scale mx-auto mb-4 aspect-video">
                  <img :src="item.image" :alt="`Image representing ${item.title}`" loading="lazy" class="w-full h-auto">
                </div>
              </div>
              <h5 class="mt-1 mb-0 group-hover:underline font-light text-lg text-left text-gray-600">{{ item.title }}</h5>
            </a>
          </li>
        </ul>
        <div class="flex justify-end">
          <a href="/blog/dashboard/" class="font-light hover:underline pt-3 flex flex-row items-center gap-1 cursor-pointer flex-wrap max-md:max-w-md">
            Learn more <Icon name="arrow-long-right" />
          </a>
        </div>
        <!-- contact-us-cta-line.njk -->
        <div class="bg-indigo-50 py-1 px-4 rounded-md w-full mx-auto text-center mt-12">
          <p>Looking for help with your project? <a href="/contact-us/" class="underline">Contact us</a>; our experts will be happy to provide a solution for your needs.  </p>
        </div>
      </div>
    </div>
  </div>
</template>
