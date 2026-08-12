<script setup lang="ts">
// "Built for Enterprise Manufacturing" SOC2/security block, shared between
// the product page and the pricing page. Ported from the enterprise: data
// block + <section class="comparison-section-bg"> markup previously
// duplicated in src/platform/features.njk and src/industries/automotive.njk
// (11ty).
interface SecurityItem {
    icon: 'single-sign-on' | 'audit-logs' | 'role-based-access' | 'air-gapped-deployment'
    label: string
}

const ICONS = {
    'single-sign-on': resolveComponent('IconsSingleSignOnIcon'),
    'audit-logs': resolveComponent('IconsAuditLogsIcon'),
    'role-based-access': resolveComponent('IconsRoleBasedAccessIcon'),
    'air-gapped-deployment': resolveComponent('IconsAirGappedDeploymentIcon'),
}

withDefaults(defineProps<{
    heading?: string
    description?: string
    badgeLabel?: string
    linkText?: string
    linkHref?: string
    items?: SecurityItem[]
}>(), {
    heading: 'Built for <span class="text-indigo-600">Enterprise Manufacturing</span>',
    description: 'FlowFuse is SOC 2 Type I and Type II certified, with role-based access control, single sign-on, audit logging, and air-gapped, self-hosted deployment options, built for the security and compliance requirements of large-scale manufacturing organizations.',
    badgeLabel: 'SOC 2 Type II',
    linkText: 'Review our security and compliance details',
    linkHref: '/platform/security/',
    items: () => [
        { icon: 'single-sign-on', label: 'Single Sign-On' },
        { icon: 'audit-logs', label: 'Audit Logs' },
        { icon: 'role-based-access', label: 'Role-Based Access Control' },
        { icon: 'air-gapped-deployment', label: 'Air-Gapped / Self-Hosted Deployment' },
    ],
})
</script>

<template>
  <section class="enterprise-security-bg w-full py-20 px-6">
    <div class="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
      <div class="shrink md:shrink md:basis-2/5 md:min-w-0 max-md:text-center">
        <h2 class="m-0" v-html="heading" />
        <p class="text-gray-600">{{ description }}</p>
        <a :href="linkHref" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
          {{ linkText }}
          <UIcon name="i-lucide-arrow-right" class="size-4 shrink-0" />
        </a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-7 gap-4 w-full max-w-md md:max-w-[646px] md:shrink md:basis-3/5 md:min-w-0">
        <div class="col-span-2 md:col-span-3 md:row-span-2 flex flex-col items-center justify-between gap-4 rounded-xl border border-white p-5 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/10%)_100%)]">
          <div class="w-full max-w-[220px] aspect-square m-auto">
            <IconsSoc2BadgeIcon />
          </div>
          <p class="text-gray-500 text-sm m-0">{{ badgeLabel }}</p>
        </div>
        <div v-for="item in items" :key="item.label" class="md:col-span-2 flex flex-col gap-2 items-center justify-center text-center rounded-xl border border-white p-3 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/10%)_100%)]">
          <div class="w-full max-w-14 aspect-square">
            <component :is="ICONS[item.icon]" />
          </div>
          <p class="text-gray-600 text-sm m-0">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.enterprise-security-bg {
    background: radial-gradient(circle at 100% 100%, #FFE8E5, #EEF2FF);
}
</style>
