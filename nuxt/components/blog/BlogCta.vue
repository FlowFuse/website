<script setup lang="ts">
const props = defineProps<{
    title?: string
    description?: string
    type?: string
    postTitle?: string
}>()

const variants: Record<string, { title: string, description: string, buttonText: string, buttonUrl: string }> = {
    'sign-up': {
        title: 'Start building with your own industrial data',
        description: 'Connect your systems, automate workflows, and see what’s possible in your environment.',
        buttonText: 'Get Started',
        buttonUrl: '/sign-up',
    },
    demo: {
        title: 'See how FlowFuse works in real environments',
        description: 'Walk through real use cases and see how teams connect systems, automate workflows, and deploy at scale.',
        buttonText: 'Book a Demo',
        buttonUrl: '/book-demo',
    },
    contact: {
        title: 'Discuss your use case with our team',
        description: 'See how FlowFuse can support your architecture, integrations, and deployment needs.',
        buttonText: 'Contact Us',
        buttonUrl: '/contact-us',
    },
    pricing: {
        title: 'Explore plans that fit your deployment',
        description: 'Compare options based on your scale, infrastructure, and security requirements.',
        buttonText: 'View Pricing',
        buttonUrl: '/pricing',
    },
}

const variant = computed(() => variants[props.type ?? 'sign-up'] ?? variants['sign-up'])

function onClick() {
    if (typeof (window as any).capture === 'function') {
        (window as any).capture('blog-cta', {
            reference: `Blog: ${props.postTitle ?? ''}`,
            cta_type: props.type ?? 'sign-up',
        })
    }
}
</script>

<template>
  <div class="ff-blue-card blog-post-cta p-8 sm:p-12 m-auto max-w-prose">
    <div class="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
      <h3 class="mt-0 mb-0 !text-3xl text-indigo-800">
        {{ title || variant.title }}
      </h3>
      <p class="mt-0 mb-0 max-w-4xl mx-auto sm:mx-0 leading-relaxed">
        {{ description || variant.description }}
      </p>
      <div class="flex justify-center sm:justify-start">
        <NuxtLink :to="variant.buttonUrl" class="ff-btn ff-btn--highlight uppercase items-center text-base no-underline" @click="onClick">
          {{ variant.buttonText }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
