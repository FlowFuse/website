<script setup lang="ts">
// FlowFuse Cloud, self-managed and edge, as three cards. This is product copy rather
// than anything one use case says differently, so it lives here rather than in YAML.
// The self-managed card's link is not one of the five CTA destinations, so it keeps its
// own `cta-install` event, routed through useCapture.
const capture = useCapture()
</script>

<template>
  <section class="w-full px-6 pt-8 pb-20">
    <div class="text-center mb-14">
      <h2>Flexible Deployment Options with <span class="text-indigo-600">FlowFuse</span></h2>
    </div>
    <div class="container m-auto max-w-screen-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-5 max-w-md md:max-w-none mx-auto">
        <div class="deployment-card white-bg">
          <div>
            <div class="title pb-4"><h4 class="text-indigo-600">FlowFuse Cloud</h4></div>
            <p class="mb-0 text-left">
              The easiest way to start building industrial applications. No installation required! Simply sign up and
              gain immediate access to the editor.
            </p>
          </div>
          <CtaSignUp variant="primary-outlined" position="deployment-options" class="md:self-end align-baseline w-full mt-3" />
        </div>
        <div class="deployment-card white-bg">
          <div>
            <div class="title">
              <h4 class="text-indigo-600">Self managed</h4>
              <div class="text-base font-bold text-gray-600 pb-4">(on premise)</div>
            </div>
            <p class="mb-0 text-left">
              Run FlowFuse where you prefer; that's possible too! In your cloud of preference, or even on-site.
            </p>
          </div>
          <NuxtLink
              class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3"
              to="/docs/install/introduction/"
              @click="capture('cta-install', { position: 'deployment-options' })"
          >INSTALL NOW</NuxtLink>
        </div>
        <div class="deployment-card white-bg">
          <div>
            <div class="title pb-4"><h4 class="text-indigo-600">Edge device</h4></div>
            <p class="mb-0 text-left">
              Run FlowFuse where the data is generated. Manage thousands of edge devices through the FlowFuse Device
              Agent.
            </p>
          </div>
          <NuxtLink class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" to="/platform/device-agent/">MORE INFO</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
