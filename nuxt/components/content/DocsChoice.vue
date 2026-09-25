<script setup lang="ts">
// One option in a ::docs-choices list: a row that opens to a short explanation, then its
// links. Two at most: the first is the option's main call to action and reads as a button,
// the second reads as a plain link and leads to the page that explains the option, for the
// reader who wants to learn more before starting. A third choice would make the reader
// weigh options inside an option.
defineProps<{
    label: string
    icon?: string
    open?: boolean
}>()

const name = inject<string>('ff-docs-choices-name', 'ff-docs-choices')
</script>

<template>
  <details class="ff-docs-choice" :name="name" :open="open || undefined">
    <summary class="ff-docs-choice__summary">
      <UIcon v-if="icon" :name="icon" class="ff-docs-choice__icon" aria-hidden="true" />
      <span class="ff-docs-choice__label">{{ label }}</span>
      <UIcon name="i-lucide-chevron-down" class="ff-docs-choice__chevron" aria-hidden="true" />
    </summary>
    <div class="ff-docs-choice__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.ff-docs-choice {
    border-bottom: 1px solid #e5e7eb;
}

.ff-docs-choice__summary {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 0.25rem;
    list-style: none;
    cursor: pointer;
    color: #1f2937;
    font-weight: 500;
}

.ff-docs-choice__summary::-webkit-details-marker {
    display: none;
}

.ff-docs-choice__summary:hover .ff-docs-choice__label {
    color: #4f46e5;
}

.ff-docs-choice__summary:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
    border-radius: 6px;
}

.ff-docs-choice[open] .ff-docs-choice__summary {
    color: #111827;
}

.ff-docs-choice__icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: #4f46e5;
}

.ff-docs-choice__label {
    flex: 1;
    min-width: 0;
}

.ff-docs-choice__chevron {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: #9ca3af;
    transition: transform 0.2s ease;
}

.ff-docs-choice[open] .ff-docs-choice__chevron {
    transform: rotate(180deg);
}

.ff-docs-choice__body {
    padding: 0 0.25rem 1.125rem 2.25rem;
}

.ff-docs-choice__body :deep(p) {
    margin: 0 0 0.875rem;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: #4b5563;
}

.ff-docs-choice__body :deep(ul) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.ff-docs-choice__body :deep(li) {
    margin: 0;
    padding: 0;
}

.ff-docs-choice__body :deep(li a) {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #4f46e5;
    border: 0;
    text-decoration: none;
}

.ff-docs-choice__body :deep(li a:hover) {
    text-decoration: underline;
}

/* The option's next step. */
.ff-docs-choice__body :deep(li:first-child a) {
    height: 2.25rem;
    padding: 0 0.875rem;
    border-radius: 6px;
    background: #4f46e5;
    color: #fff;
}

.ff-docs-choice__body :deep(li:first-child a:hover) {
    background: #4338ca;
    text-decoration: none;
}

.ff-docs-choice__body :deep(li a:focus-visible) {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}
</style>
