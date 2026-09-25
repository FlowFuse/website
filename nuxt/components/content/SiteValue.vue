<template>{{ value }}</template>

<script setup>
import site from '../../data/site.json'

const props = defineProps({
  path: { type: String, required: true }
})

const value = props.path.split('.').reduce((obj, key) => obj?.[key], site) ?? ''
</script>
