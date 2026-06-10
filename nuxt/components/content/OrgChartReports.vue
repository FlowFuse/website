<template>
  <div>
    <p v-if="ceo">
      Direct reports to <strong>{{ ceo.name }}</strong> ({{ ceo.title }}):
    </p>
    <ul v-if="ceo">
      <li v-for="m in directReportsOf(ceo.name)" :key="m.name">
        <strong>{{ m.name }}</strong> ({{ m.title }})
      </li>
    </ul>

    <template v-for="manager in managersWithReports" :key="manager.name">
      <h3>{{ manager.name }}'s Team</h3>
      <p>{{ manager.name }} ({{ manager.title }}) has the following direct reports:</p>
      <ul>
        <li v-for="m in directReportsOf(manager.name)" :key="m.name">
          {{ m.name }} - {{ m.title }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
// TODO: replace with queryCollection('team').order('order', 'ASC').all() once src/_data/team/ is migrated to a Nuxt content collection
const teamModules = import.meta.glob('../../../src/_data/team/*.json', { eager: true, import: 'default' })
const team = Object.values(teamModules).sort((a, b) => a.order - b.order)

const ceo = team.find(m => !m.reports_to)

function directReportsOf(managerName) {
    return team.filter(m => m.reports_to === managerName)
}

const managersWithReports = team.filter(m =>
    m.reports_to && team.some(sub => sub.reports_to === m.name)
)
</script>
