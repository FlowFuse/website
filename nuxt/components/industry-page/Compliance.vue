<script setup lang="ts">
// The compliance grid from automotive.vue. "The Data Your Audit Asks For, In One Place"
// is fixed copy shared by every page built on this template, not page-specific data.
interface ComplianceItem { title: string, text: string, linkText: string, linkHref: string, icon?: string }

defineProps<{ industryName: string, heading?: string, subheading?: string, description: string, items: ComplianceItem[] }>()
</script>

<template>
  <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
    <div class="max-w-screen-lg mx-auto">
      <div class="mb-12">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 v-if="heading" class="text-gray-700 mb-2" v-html="heading" />
        <h2 v-else class="text-gray-700 mb-2">{{ industryName }} <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
        <p class="text-xl font-medium mt-0 mb-4">{{ subheading || 'The Data Your Audit Asks For, In One Place' }}</p>
        <p class="text-gray-600">{{ description }}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <a
            v-for="item in items"
            :key="item.title"
            :href="item.linkHref"
            class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-5 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
        >
          <div class="w-6 h-6 text-indigo-600">
            <UIcon v-if="item.icon" :name="item.icon" class="size-6" />
            <IconsCertificateIcon v-else />
          </div>
          <h3 class="m-0 text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
          <p class="m-0 text-gray-600 text-sm flex-grow">{{ item.text }}</p>
          <span class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
            {{ item.linkText }}
            <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
