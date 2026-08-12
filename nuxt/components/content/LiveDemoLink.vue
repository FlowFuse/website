<script setup lang="ts">
// Inline tracked link for blog markdown: ::live-demo-link{href="..." label="..."}
// Fires click tracking via a real Vue handler instead of a raw onclick attribute,
// which @nuxtjs/mdc strips as an unsafe attribute.
import { useCapture } from '../../composables/useCapture'

const props = defineProps<{
    href: string
    label: string
}>()

const EVENT = 'blog-live-demo'

const capture = useCapture()

// Provided by nuxt/pages/blog/[...slug].vue - avoids repeating the title per instance.
const postTitle = inject<Ref<string> | undefined>('blogPostTitle', undefined)

function onClick () {
    capture(EVENT, { reference: `Blog: ${postTitle?.value || ''}` })
}
</script>

<template>
  <a :href="props.href" @click="onClick">{{ props.label }}</a>
</template>
