<script setup lang="ts">
// MDC: ::node-red-help{category="network" file="10-mqtt" node="mqtt out" name="MQTT Out"}
//
// Renders one core node's built-in help, mirrored from the Node-RED project. The fetch and
// the sanitising happen in server/api/node-red-help.get.ts, which runs during prerender,
// so the help is part of the static HTML rather than something the browser waits for.
//
// This is what makes the core-node pages ordinary content: the page carries its own
// frontmatter and prose and names the help it wants, instead of being assembled by a
// build-time generator.
const props = defineProps<{
    /** Locale directory upstream, e.g. `network`. */
    category: string
    /** Locale file upstream, without the extension, e.g. `10-mqtt`. */
    file: string
    /** The `data-help-name` to select. May name a family, e.g. `link`. */
    node: string
    /** Display name, for the callout. Falls back to `node`. */
    name?: string
}>()

const label = computed(() => props.name || props.node)

const { data, error } = await useFetch<{ html: string }>('/api/node-red-help', {
    query: { category: props.category, file: props.file, node: props.node },
    key: `node-red-help-${props.category}-${props.file}-${props.node}`,
})
</script>

<template>
  <section class="node-red-help">
    <h2 id="node-help">Node help</h2>

    <div v-if="error" class="node-red-help__error">
      <p>
        This node's help could not be read from the Node-RED project.
        See <a href="https://nodered.org/docs/user-guide/editor/workspace/palette">the Node-RED documentation</a>.
      </p>
    </div>

    <template v-else>
      <div class="ff-callout ff-callout--info">
        <p>
          This is the {{ label }} node's built-in help, mirrored from the Node-RED project.
          It is the same text the editor shows in its Info sidebar.
        </p>
      </div>

      <!-- Third-party HTML. Sanitised server-side against an allowlist before it gets here. -->
      <div v-html="data?.html" />
    </template>
  </section>
</template>

<style scoped>
.node-red-help__error {
    border-left: 3px solid #d1d5db;
    padding-left: 1rem;
    color: #4b5563;
}
</style>
