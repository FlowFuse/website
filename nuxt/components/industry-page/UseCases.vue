<script setup lang="ts">
// components/industry-use-cases.njk: every use-case whose `industries[]` names this
// industry. The mapping's source of truth is the Use Cases Asana project (Industry field).
//
// Lives here, not under components/industry/, because both templates use it: the
// industriesLegacy [slug].vue AND this one (industry-page/Template.vue). industry/ is
// due for deletion once the seven legacy pages go; this component has to survive that.
const props = defineProps<{ slug: string, displayName: string, descriptions?: Record<string, string> }>()

const { data: all } = await useAsyncData('industry-use-cases', () =>
    queryCollection('useCases').select('slug', 'title', 'problem', 'industries').all()
)

const matching = computed(() =>
    (all.value || [])
        .filter(uc => uc.industries?.includes(props.slug))
        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'en'))
)
</script>

<template>
  <div class="w-full py-16 sm:py-24 px-6 bg-gray-50 border-y border-gray-100">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="max-md:text-center">Use cases in <span class="text-indigo-600">{{ displayName }}</span></h2>
      <p class="mt-4 max-w-3xl text-gray-600">Operational workflow patterns teams in this industry build and own with FlowFuse.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <UseCaseCard
            v-for="uc in matching"
            :key="uc.slug"
            :to="`/use-cases/${uc.slug}/`"
            :title="uc.title"
            :problem="descriptions?.[uc.slug] ?? uc.problem"
        />
      </div>
    </div>
  </div>
</template>
