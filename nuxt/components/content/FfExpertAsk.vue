<script setup lang="ts">
// FlowFuse Expert, embedded: a question box that opens the Expert conversation in a modal.
//
// The conversation itself is src/js/ai-expert-modal.js, the same script the old /ai/ page
// used (via src/_includes/components/ai-chat-interface.njk and ai-expert-modal.njk). This
// component carries that markup for Nuxt pages. The element ids and the classes the script
// selects on are load-bearing: keep them as they are.
//
// Usage from markdown:
//   ::ff-expert-ask
//   ::
withDefaults(defineProps<{
    placeholder?: string
    button?: string
    position?: string
}>(), {
    placeholder: 'Ask FlowFuse Expert anything about FlowFuse or Node-RED',
    button: 'Ask',
    position: 'docs-home',
})

function loadScript (src: string) {
    return new Promise<void>((resolve, reject) => {
        const el = document.createElement('script')
        el.src = src
        el.onload = () => resolve()
        el.onerror = () => reject(new Error(`failed to load ${src}`))
        document.body.appendChild(el)
    })
}

onMounted(async () => {
    const w = window as any
    // The script sanitises every answer with DOMPurify before rendering it.
    if (!w.DOMPurify) await loadScript('https://cdn.jsdelivr.net/npm/dompurify@3.3.0/dist/purify.min.js')
    // First visit: loading the script runs it. A later client-side visit mounts fresh
    // elements, so the already-loaded script is asked to bind to them.
    if (w.ffExpertInit) w.ffExpertInit()
    else await loadScript('/js/ai-expert-modal.js')
})

function track (position: string) {
    const capture = (window as any).capture
    if (typeof capture === 'function') capture('cta-ai-get-started', { position })
}
</script>

<template>
  <div class="ff-expert-ask not-prose">
    <div class="ai-chat-container mt-6 max-w-4xl">
      <div class="ai-chat-box">
        <div class="textarea-wrapper relative mb-4 h-32 p-4 pb-12 rounded-lg overflow-hidden">
          <textarea
            data-ff-expert-input
            :placeholder="placeholder"
            class="w-full h-full bg-transparent border-0 focus:outline-none text-gray-600 placeholder-gray-400 resize-none"
            aria-label="Ask FlowFuse Expert"
          />
          <div class="absolute bottom-3 left-4 text-[10px] font-light text-gray-500 pr-36 line-clamp-2">
            AI uses FlowFuse's knowledge base
          </div>
          <button
            id="tell-me-how-btn"
            type="button"
            class="absolute bottom-3 right-4 ff-btn ff-btn--highlight uppercase whitespace-nowrap px-6 py-3"
            @click="track(position)"
          >
            {{ button }}
          </button>
        </div>
      </div>

      <div class="ai-prompts mt-4">
        <div class="wrapper flex flex-wrap gap-2 mb-3" />
      </div>
    </div>

    <div id="ai-expert-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center p-0 md:p-4 md:px-8 md:py-8 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="ai-expert-modal-title">
      <div class="bg-white rounded-none md:rounded-lg shadow-xl w-full max-w-4xl h-full md:h-full flex flex-col relative">
        <div class="ai-chat-box">
          <div class="textarea-wrapper modal-header flex items-center justify-between px-4 py-3 rounded-t-none md:rounded-t-lg h-auto rounded-b-none mb-0">
            <div class="flex items-center gap-1">
              <div class="w-24 h-6">
                <FlowFuseWordmark uid="expert-modal" />
              </div>
              <h2 id="ai-expert-modal-title" class="text-base font-semibold text-gray-700 -mb-1">Expert</h2>
            </div>
            <button id="close-modal" type="button" class="text-gray-500 hover:text-gray-600" aria-label="Close dialog">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-1 p-4 overflow-y-auto">
          <div class="bg-indigo-100 rounded-lg mb-6 py-3 px-4">
            <p class="text-indigo-700 text-sm m-0">
              AI agent has access to all of FlowFuse's
              <a href="/docs" class="underline">documentation and knowledge</a>,
              <a href="/blog" class="underline">blogposts</a>, and more.
            </p>
          </div>
          <div id="chat-messages" class="space-y-4 overflow-auto" />
        </div>

        <div class="p-4 bg-white rounded-b-none md:rounded-b-lg border-t border-gray-200">
          <div id="action-buttons-container" class="pb-4 flex justify-between">
            <button id="clear-conversation" type="button" class="bg-white border border-indigo-300 rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Start over
            </button>
            <div id="right-buttons" class="flex gap-2">
              <button id="continue-to-app" type="button" class="textarea-wrapper bg-white rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hidden inline-flex items-center gap-1">
                Continue chat in <img :src="'/images/ff-minimal-red.svg'" alt="FlowFuse" class="w-5 h-5 inline-block">
              </button>
              <button id="stop-generation" type="button" class="bg-white border border-indigo-300 rounded-full text-sm flex items-center gap-2 py-2 px-3 hidden">
                <div class="w-3 h-3 bg-gray-800 rounded-sm" />
                Stop
              </button>
              <button id="send-message" type="button" class="bg-indigo-600 text-white border border-indigo-600 rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors" disabled>
                Send
              </button>
            </div>
          </div>
          <div class="relative">
            <textarea
              id="modal-input"
              placeholder="Give more details in regards to your intended workflow to tailor it to your use case"
              class="w-full p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-indigo-500 text-gray-900 h-24 text-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
