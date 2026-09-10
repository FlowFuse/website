<script setup lang="ts">
// Ported from src/platform/device-agent.njk (11ty), which this replaces. Same page, same
// copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The {% terminalFrame %} shortcode becomes <TerminalFrame>, its MDC counterpart.
//  - components/device-agent-install-commands.njk becomes
//    <DeviceAgentInstallCommands>, built on <FfCommand> - whose own comment names this
//    page as the markup it replaces - so the partial's hand-rolled copy script is gone.
//  - The feature glyphs were {% include %}d raw at w-8 h-8 with no ff-icon wrapper, so
//    they resolve through <UIcon> against the installed heroicons set.
//  - faq.njk becomes <BlogFaq> plus useSchemaOrg. Four answers carried <a> tags, one an
//    <i>, and one two <p> blocks, all printed by `| safe`; they are markdown links,
//    *italics* and blank-line paragraphs now, which BlogFaq escapes around.
//  - Production renders TWO <h1>: layouts/page.njk emits one from `title` under `nohero`
//    (the page sets no `title`, so it was empty) and the template writes its own logo
//    heading. Only the page's own survives.
const FEATURES = [
    { icon: 'i-heroicons-wifi', title: 'Remote Management', description: 'Monitor and control your devices remotely, giving you flexibility and control over your IoT ecosystem.' },
    { icon: 'i-heroicons-puzzle-piece', title: 'Effortless Integration', description: 'Easily connect a wide range of devices, sensors, and industrial equipment with FlowFuse.' },
    { icon: 'i-heroicons-rectangle-stack', title: 'Streamlined Data Collection', description: 'Utilise over 5,000 open-source plug-ins available in FlowFuse to gather real-time data from your devices. Modernize your hardware for analysis, automation, and decision-making.' },
    { icon: 'i-heroicons-lock-closed', title: 'Secure Communication', description: 'Protect your data and devices with robust security protocols, ensuring safe and reliable communication between your devices and the FlowFuse platform.' },
    { icon: 'i-heroicons-arrows-pointing-out', title: 'Scalable Solution', description: 'Designed to scale with your needs, whether you have a few devices or a large-scale industrial deployment. FlowFuse provides centralized management for all of your deployments.' },
]

const WHY = [
    { title: 'Low Code Advantage', description: 'FlowFuse simplifies the application development cycle, with a powerful yet simple low-code platform, enabling businesses to launch solutions faster than traditional coding methods allow.' },
    { title: 'Flexible Deployment', description: 'With FlowFuse you can deploy your applications on the cloud or on-premises. This ensures a smooth and efficient development experience, for a high-performance and scalable solution.' },
    { title: 'Open Source', description: 'Open source is a key aspect of the FlowFuse product strategy, as we believe it reduces adoption barriers and provides increased transparency and security to all our users.' },
]

const FAQ = [
    { question: 'How much does the Device Agent cost?', answer: 'The Device Agent is free, and [open-source](https://github.com/FlowFuse/device-agent). Depending on which offering/hosting of FlowFuse you choose there may be charges for the FlowFuse service itself, you can find out more on our [pricing page](/pricing).' },
    { question: 'Can I run the Device Agent in a closed network?', answer: "Yes, you can, although it does need to be able to connect to your FlowFuse (Cloud or your self-hosted instance) in order to receive updates and deploy new flows. Once they're deployed though, the device agent will keep your flows running even if it loses connection to the internet." },
    { question: 'How do I deploy to thousands of devices at once?', answer: 'With FlowFuse, you can use [Provisioning Tokens](/docs/device-agent/register/#bulk-registration) to register large numbers of devices. This will automatically register each device in the FlowFuse Editor and save you *a lot* of clicking.' },
    { question: "I've installed the Device Agent on my device, how do I access the Node-RED Editor?", answer: 'The key advantage of the device agent is that it allows you to access the Node-RED editor from FlowFuse directly. Simply navigate to the device in the FlowFuse UI, and click on the "Open Editor" button. Once you\'ve made your changes, within FlowFuse you can then rollout those flows to hundreds of other devices in just a few clicks.' },
    { question: 'What\'s the difference between "Fleet Mode" and "Developer Mode"', answer: '"Fleet Mode" allows you to deploy a single Snapshot to multiple devices at once. The Device will have a "Target Snapshot", and whenever that is set, your device will automatically update.\n\n"Developer Mode" on the other hand opens a tunnel to your device, allowing you to edit the flows on that device directly. This is useful for debugging flows, or testing new flows on live hardware, before distributing them out to the rest of our' },
    { question: 'What are the system requirements for the Device Agent? Will it run on my hardware?', answer: "Device Agent supports NodeJS 14 and above, and is designed to work with a wide range of devices. If you're unsure if your device is supported, please do get in touch." },
    { question: 'Can I run the Device Agent as a service?', answer: 'Yes, the Device Agent is designed to run as a service on your device, we have an example written up for a Raspberry Pi [here](/blog/2023/05/device-agent-as-a-service/).' },
]

const META_DESCRIPTION = 'Fully hosted service to build, manage, and deploy industrial applications without the hassle of setting up your own cloud infrastructure'

useSeoMeta({
    title: 'FlowFuse Device Agent',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    keywords: 'FlowFuse, Device Agent, Node-RED, IoT, Industrial IoT, Remote Management',
    ogUrl: 'https://flowfuse.com/platform/device-agent/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full">
        <!-- The terminal install is the hero, so the page opens on the one way to get a
             machine online. The platform-first route lives in the docs. -->
        <div id="install-from-your-terminal" class="w-full scroll-mt-24 pt-12 pb-20 md:pt-6 md:pb-24">
          <div class="container mx-auto px-6 md:mt-16 md:max-w-screen-lg">
            <div class="md:flex items-center md:flex-row md:justify-between text-center md:text-left gap-8">
              <div class="m-auto md:w-1/2 lg:w-5/12 max-w-md">
                <h1 class="px-12 md:px-0 m-auto mb-6 max-md:flex max-md:flex-row max-md:justify-center md:ml-0 md:max-w-[250px]">
                  <span class="sr-only">FlowFuse Device Agent</span>
                  <img src="/images/ff-logo-device-agent-light.svg" alt="FlowFuse Device Agent" width="225" class="w-full h-auto">
                </h1>
                <p class="mb-6">
                  Unlock the power of your Industrial IoT devices and bring them into your automation workflows with
                  the FlowFuse Device Agent. Our lightweight, secure agent allows you to effortlessly manage and deploy
                  automation flows to your hardware remotely from anywhere.
                </p>
                <p class="font-light">
                  Start where your hardware already is. Run the installer on the machine you want to bring
                  online and it walks you through the rest, including creating a FlowFuse account if you
                  don't have one yet. If the machine already runs Node-RED, the installer offers to import
                  those flows.
                </p>
              </div>
              <div class="flex justify-center m-auto max-md:mt-10 md:w-1/2 lg:w-6/12">
                <TerminalFrame
                    src="/images/device-agent/terminal-install.gif"
                    alt="The FlowFuse Device Agent installer running in a terminal, opening a browser to register the machine"
                    :width="500"
                />
              </div>
            </div>

            <!-- Install commands, full width so nothing is clipped. Shared with /node-red/. -->
            <div class="mt-12 md:mt-16">
              <DeviceAgentInstallCommands />
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto px-6">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              <div class="flex flex-col justify-center w-full max-md:max-w-md mx-auto md:bg-indigo-50 rounded-lg md:p-10">
                <h2 class="text-center w-full md:text-left col-span-full">Seamlessly manage your devices all in one place</h2>
              </div>
              <div v-for="feature in FEATURES" :key="feature.title" class="relative w-full max-md:max-w-md mx-auto">
                <div class="flex flex-col items-center md:items-start">
                  <div class="flex flex-col justify-center md:justify-start gap-3 w-full mb-4">
                    <div class="w-8 h-8 m-auto md:m-0 text-indigo-600">
                      <UIcon :name="feature.icon" class="w-8 h-8" />
                    </div>
                    <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                      <h5 class="w-full md:m-0">
                        <div class="text-xl text-gray-600 text-center md:text-left">{{ feature.title }}</div>
                      </h5>
                    </div>
                  </div>
                  <div>
                    <p class="text-center md:text-left font-light">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-screen-lg mx-auto text-center pt-10 pb-6 px-6 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
        <div class="ff-blue-card max-md:max-w-md">
          <h2 class="font-bold m-auto w-full text-center md:text-left mb-6">Why Choose <span class="text-red-600">FlowFuse</span></h2>
          <div class="w-full md:grid md:grid-cols-3 gap-6 md:gap-8">
            <div v-for="item in WHY" :key="item.title" class="w-full mt-4 md:mt-0 flex flex-col justify-between">
              <div>
                <h4 class="flex justify-center md:justify-start font-semibold">{{ item.title }}</h4>
                <p class="font-light mt-6">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="md:text-left max-md:max-w-md mx-auto pt-24 md:pt-16 text-left">
          <h2 class="max-md:text-center -mb-12">
            Frequently Asked <span class="text-indigo-600">Questions</span>
          </h2>
          <BlogFaq :faq="FAQ" />
        </div>
      </div>
    </div>
  </div>
</template>
