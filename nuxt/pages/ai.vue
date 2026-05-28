<script setup>
// AI page — migrated 1:1 from src/ai.njk (layout: page, nohero: true).
// Route: /ai/  (Nuxt adds the trailing slash automatically).
//
// The interactive "FlowFuse Expert" modal is driven by the original imperative
// script src/js/ai-expert-modal.js (1500+ lines: random prompt pills, View
// Transitions morphing, DOMPurify sanitisation, fetch to expert.flowfuse.com
// with a simulated fallback, streaming text, abort controllers, flow JSON
// copy/expand, postMessage hand-off to app.flowfuse.com, focus trap, etc.).
// That logic is far too coupled to the DOM and the View Transitions API to
// re-express faithfully as reactive Vue without risking behavioural drift, so
// per the migration brief we reproduce the exact static DOM the script expects
// (same ids / classes / attributes) and load the original script verbatim from
// nuxt/public/js/ai-expert-modal.js together with its DOMPurify dependency.
// This yields byte-for-byte behaviour with the 11ty page.

// Solution benefit cards. Icons inlined verbatim from
// src/_includes/components/icons/{sparkles,squares-plus,shield-check}.svg
// (currentColor, sized by the w-8 h-8 wrapper) — matches the 11ty render.
const benefits = [
    {
        title: 'AI-Generated Industrial Flows',
        description: 'Generate Node-RED flows, JavaScript, and SQL from natural language using an industrial-tuned LLM, so you can connect machines, transform data, and build dashboards in minutes instead of months.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/></svg>',
    },
    {
        title: 'Reusable Industrial Blueprints',
        description: 'Turn OT know-how into reusable blueprints for UNS, SCADA, MES, and middleware that your teams can deploy across plants with full version control and governance.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>',
    },
    {
        title: 'Governance You Trust',
        description: 'Keep humans in control with approval workflows, role-based access, audit trails, and the same enterprise-grade governance you use for all FlowFuse applications.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>',
    },
]

// The home textarea focus + responsive placeholder script and the two external
// scripts are injected at body close so the prerendered HTML matches the 11ty
// ground truth (nuxt/public/ai/index.html).
useHead({
    title: 'FlowFuse Expert: LLMs for Industrial Teams • FlowFuse',
    meta: [
        {
            name: 'description',
            content: 'Turn natural language into reliable industrial applications with FlowFuse Expert, or LLM-powered copilot, deeply integrated into FlowFuse and Node-RED, designed for the constraints, protocols, and governance your plants require.',
        },
    ],
    script: [
        {
            // Home textarea: auto-focus + responsive placeholder (from ai-chat-interface.njk).
            innerHTML: `document.addEventListener('DOMContentLoaded', function() {
    const homeTextarea = document.querySelector('textarea[aria-label="Describe your workflow"]');
    if (homeTextarea) {
        homeTextarea.focus();
        const fullPlaceholder = "Tell us what you are trying to build and the FlowFuse Expert will create a guide to get you up and running quickly";
        const shortPlaceholder = "Tell us what you are trying to build";
        function updatePlaceholder() {
            if (window.innerWidth < 480) {
                homeTextarea.placeholder = shortPlaceholder;
            } else {
                homeTextarea.placeholder = fullPlaceholder;
            }
        }
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);
    }
});`,
            tagPosition: 'bodyClose',
        },
        {
            // DOMPurify — required global dependency of ai-expert-modal.js.
            src: 'https://cdn.jsdelivr.net/npm/dompurify@3.3.0/dist/purify.min.js',
            tagPosition: 'bodyClose',
        },
        {
            // FlowFuse Expert modal behaviour (copied verbatim from src/js/ai-expert-modal.js).
            src: '/js/ai-expert-modal.js',
            tagPosition: 'bodyClose',
        },
    ],
})
</script>

<template>
  <!--Hero Content-->
  <div class="w-full px-6">
    <div class="sm:max-w-screen-lg mt-6 sm:mt-12 mx-auto">
      <div class="container m-auto text-left max-w-screen-lg">
        <div class="mx-auto">
          <h1 class="font-medium home m-auto text-center text-indigo-600 mt-24 mb-16 max-w-2xl">
            <span class="text-indigo-800">FlowFuse Expert:</span> LLMs for Industrial Teams
          </h1>
          <p class="text-center max-w-4xl mx-auto">Turn natural language into reliable industrial applications with with FlowFuse Expert, our LLM-powered copilot, deeply integrated into FlowFuse and Node-RED. Built on Model Context Protocol (MCP), it connects AI directly to your machines, databases, and brokers&mdash;so it understands your constraints, protocols, and governance, not generic templates.</p>
          <p class="text-center max-w-4xl mx-auto">Scale Your Industrial Applications with AI.</p>
          <div class="mt-20">
            <!-- AI Chat Interface -->
            <div class="ai-chat-container mx-auto mt-6 sm:mt-10 max-w-4xl">
              <div class="ai-chat-box">
                <div class="textarea-wrapper relative mb-4 h-40 p-4 pb-12 rounded-lg overflow-hidden">
                  <textarea placeholder="Tell us what you are trying to build and the FlowFuse Expert will create a guide to get you up and running quickly" class="w-full h-full bg-transparent border-0 focus:outline-none text-gray-600 placeholder-gray-400 resize-none" aria-label="Describe your workflow" />
                  <div class="absolute bottom-3 left-4 text-[10px] font-light text-gray-500 pr-36 line-clamp-2">
                    AI uses FlowFuse's knowledge base
                  </div>
                  <button id="tell-me-how-btn" class="absolute bottom-3 right-4 ff-btn ff-btn--highlight uppercase whitespace-nowrap px-6 py-3" onclick="if(typeof capture === 'function') capture('cta-ai-tell-me-how', {'position': 'hero'})">
                    Tell Me How
                  </button>
                </div>
              </div>
              <div class="ai-prompts mt-4">
                <div class="wrapper flex flex-wrap gap-2 mb-3" />
              </div>
            </div>

            <!-- AI Expert Modal -->
            <div id="ai-expert-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center p-0 md:p-4 md:px-8 md:py-8 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="ai-expert-modal-title">
              <!-- Modal Content -->
              <div class="bg-white rounded-none md:rounded-lg shadow-xl w-full max-w-4xl h-full md:h-full flex flex-col relative">
                <!-- Header -->
                <div class="ai-chat-box">
                  <div class="textarea-wrapper modal-header flex items-center justify-between px-4 py-3 rounded-t-none md:rounded-t-lg h-auto rounded-b-none mb-0">
                    <div class="flex items-center gap-1">
                      <!-- FlowFuse Logo -->
                      <div class="w-24 h-6">
                        <svg class="h-full w-full" viewBox="0 0 402 70" xmlns="http://www.w3.org/2000/svg">
                          <mask id="mask0_171_1177" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402" height="70">
                            <path d="M402 0H0V70H402V0Z" fill="white" />
                          </mask>
                          <g mask="url(#mask0_171_1177)">
                            <mask id="mask1_171_1177" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402" height="70">
                              <path d="M402 0H0V70H402V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask1_171_1177)">
                              <path d="M118.95 9.98H95.3695C93.7495 9.98 92.4595 10.47 91.4795 11.44C90.4995 12.41 90.0195 13.71 90.0195 15.32V55.38C90.0195 57.05 90.4495 58.24 91.3095 58.94C92.1695 59.64 93.5495 59.99 95.4395 59.99C96.3595 59.99 97.2495 59.92 98.1095 59.79C98.9695 59.66 99.6195 59.53 100.05 59.43V39.87H113.6C114.73 39.87 115.62 39.51 116.27 38.78C116.92 38.05 117.24 37.01 117.24 35.66C117.24 34.85 117.12 34.11 116.88 33.43C116.64 32.76 116.38 32.2 116.11 31.77H100.05V18.15H116.35C117.48 18.15 118.37 17.79 119.02 17.06C119.67 16.33 119.99 15.27 119.99 13.86C119.99 13.05 119.88 12.3 119.67 11.59C119.45 10.89 119.21 10.35 118.94 9.97" fill="#DA3D0B" />
                              <path d="M130.979 9.98001C130.059 9.98001 129.199 10.06 128.389 10.22C127.579 10.38 126.959 10.52 126.529 10.62V55.53C126.529 57.2 126.969 58.36 127.859 59.01C128.749 59.66 130.079 59.98 131.869 59.98C132.839 59.98 133.719 59.91 134.499 59.78C135.279 59.65 135.889 59.5 136.319 59.34V14.52C136.319 12.85 135.889 11.68 135.029 11C134.169 10.33 132.819 9.99001 130.979 9.99001" fill="#DA3D0B" />
                              <path d="M175.521 22.61C172.531 20.94 169.041 20.1 165.041 20.1C161.041 20.1 157.611 20.94 154.601 22.61C151.591 24.28 149.241 26.63 147.571 29.65C145.901 32.67 145.061 36.26 145.061 40.41C145.061 44.56 145.881 48.15 147.531 51.17C149.171 54.19 151.501 56.53 154.521 58.17C157.531 59.81 161.041 60.64 165.041 60.64C169.041 60.64 172.611 59.82 175.601 58.17C178.591 56.52 180.901 54.18 182.551 51.13C184.191 48.08 185.011 44.51 185.011 40.41C185.011 36.31 184.171 32.67 182.501 29.65C180.831 26.63 178.501 24.28 175.511 22.61M172.271 49.6C170.521 51.78 168.111 52.88 165.041 52.88C161.971 52.88 159.561 51.8 157.811 49.65C156.061 47.49 155.181 44.42 155.181 40.42C155.181 36.42 156.071 33.41 157.851 31.19C159.631 28.98 162.031 27.87 165.041 27.87C168.051 27.87 170.521 28.98 172.271 31.19C174.021 33.4 174.901 36.48 174.901 40.42C174.901 44.36 174.021 47.42 172.271 49.6Z" fill="#DA3D0B" />
                              <path d="M281.95 9.98H258.37C256.75 9.98 255.46 10.47 254.48 11.44C253.51 12.41 253.02 13.71 253.02 15.32V55.38C253.02 57.05 253.45 58.24 254.31 58.94C255.17 59.64 256.55 59.99 258.44 59.99C259.36 59.99 260.25 59.92 261.11 59.79C261.97 59.66 262.62 59.53 263.05 59.43V39.87H276.6C277.73 39.87 278.62 39.51 279.27 38.78C279.92 38.05 280.24 37.01 280.24 35.66C280.24 34.85 280.12 34.11 279.88 33.43C279.64 32.76 279.38 32.2 279.11 31.77H263.05V18.15H279.35C280.48 18.15 281.37 17.79 282.02 17.06C282.67 16.33 282.99 15.27 282.99 13.86C282.99 13.05 282.88 12.3 282.67 11.59C282.45 10.89 282.21 10.35 281.94 9.97" fill="#DA3D0B" />
                              <path d="M243.98 21.39C243.12 20.8 242.01 20.5 240.66 20.5C239.04 20.5 237.59 20.88 236.29 21.63C235.59 26.59 234.71 31.61 233.66 36.68C232.61 41.75 231.59 46.53 230.62 51H230.22C229.95 49.76 229.45 47.87 228.72 45.34C227.99 42.81 227.14 39.91 226.17 36.64C225.2 33.38 224.17 30.02 223.09 26.56C222.77 25.59 222.13 24.87 221.19 24.42C220.25 23.96 219.08 23.73 217.67 23.73C216.59 23.73 215.64 23.84 214.83 24.05C214.02 24.27 213.26 24.59 212.56 25.02C211.48 28.63 210.42 32.2 209.36 35.7C208.31 39.21 207.39 42.32 206.61 45.05C205.83 47.77 205.27 49.76 204.95 51H204.63C204.41 50.14 204.11 48.88 203.74 47.24C203.36 45.6 202.93 43.64 202.45 41.37C201.96 39.1 201.46 36.57 200.95 33.76C200.44 30.95 199.94 28.01 199.46 24.94C199.19 23.32 198.65 22.18 197.84 21.5C197.03 20.83 195.92 20.49 194.52 20.49C193.39 20.49 192.37 20.71 191.48 21.14C190.59 21.57 189.88 22.06 189.34 22.6C189.72 24.65 190.19 27 190.76 29.64C191.33 32.28 191.95 35.01 192.62 37.81C193.29 40.62 193.97 43.33 194.64 45.94C195.31 48.56 195.97 50.86 196.62 52.86C197.27 54.86 197.84 56.4 198.32 57.47C198.75 58.33 199.53 59 200.67 59.45C201.8 59.91 203.1 60.14 204.56 60.14C205.85 60.14 206.95 60 207.84 59.73C208.73 59.46 209.44 59.11 209.99 58.68C210.64 56.9 211.4 54.67 212.29 52C213.18 49.33 214.1 46.44 215.04 43.34C215.98 40.24 216.83 37.2 217.59 34.24C218.4 37.15 219.23 40.11 220.09 43.1C220.95 46.09 221.8 48.87 222.64 51.44C223.48 54 224.22 56.09 224.87 57.71C225.41 59.33 227.33 60.14 230.61 60.14C231.85 60.14 233 59.99 234.05 59.69C235.1 59.4 235.88 59.06 236.36 58.68C236.79 57.6 237.3 56.15 237.9 54.31C238.49 52.48 239.13 50.4 239.8 48.08C240.47 45.76 241.14 43.36 241.78 40.88C242.43 38.4 243 36.05 243.52 33.84C244.03 31.63 244.45 29.67 244.78 27.97C245.1 26.27 245.26 25.07 245.26 24.37C245.26 22.97 244.83 21.97 243.97 21.38" fill="#DA3D0B" />
                              <path d="M316.89 20.67C315.97 20.67 315.11 20.75 314.3 20.91C313.49 21.07 312.87 21.21 312.44 21.31V51.17C311.79 51.55 310.87 51.91 309.69 52.26C308.5 52.61 307.05 52.78 305.32 52.78C302.62 52.78 300.52 52.15 299.01 50.88C297.5 49.61 296.74 47.55 296.74 44.69V25.27C296.74 23.49 296.32 22.28 295.48 21.63C294.64 20.98 293.31 20.66 291.47 20.66C290.5 20.66 289.61 20.74 288.8 20.9C287.99 21.06 287.4 21.2 287.02 21.3V44.85C287.02 48.52 287.75 51.51 289.2 53.83C290.66 56.15 292.76 57.85 295.51 58.93C298.26 60.01 301.5 60.55 305.22 60.55C308.3 60.55 311.02 60.24 313.4 59.62C315.77 59 317.71 58.23 319.22 57.32C320.35 56.62 321.14 55.86 321.57 55.06C322 54.25 322.22 53.23 322.22 51.98V25.27C322.22 23.49 321.79 22.28 320.93 21.63C320.07 20.98 318.72 20.66 316.88 20.66" fill="#DA3D0B" />
                              <path d="M347.659 36.62L343.449 35.57C341.779 35.19 340.589 34.67 339.889 33.99C339.189 33.32 338.839 32.52 338.839 31.6C338.839 30.3 339.459 29.32 340.699 28.64C341.939 27.97 343.609 27.63 345.719 27.63C347.119 27.63 348.509 27.78 349.889 28.07C351.269 28.37 352.519 28.74 353.649 29.2C354.779 29.66 355.669 30.1 356.319 30.53C356.909 30.1 357.409 29.53 357.819 28.83C358.219 28.13 358.429 27.32 358.429 26.4C358.429 25.05 357.849 23.91 356.689 22.96C355.529 22.02 353.939 21.29 351.909 20.78C349.889 20.27 347.579 20.01 344.989 20.01C340.019 20.01 336.169 21.1 333.419 23.29C330.669 25.48 329.289 28.24 329.289 31.59C329.289 34.61 330.219 37.04 332.079 38.87C333.939 40.71 336.809 42.05 340.699 42.92L345.469 44.13C347.199 44.51 348.459 45.06 349.269 45.79C350.079 46.52 350.479 47.5 350.479 48.74C350.479 51.6 348.159 53.03 343.519 53.03C340.979 53.03 338.719 52.64 336.719 51.86C334.719 51.08 332.969 50.2 331.459 49.23C330.759 49.72 330.189 50.33 329.759 51.09C329.329 51.85 329.109 52.68 329.109 53.6C329.109 55.71 330.489 57.4 333.239 58.7C335.989 60 339.519 60.64 343.839 60.64C349.119 60.64 353.159 59.57 355.939 57.44C358.719 55.31 360.109 52.38 360.109 48.66C360.109 45.53 359.119 42.99 357.149 41.02C355.179 39.05 352.009 37.58 347.639 36.61" fill="#DA3D0B" />
                              <path d="M400.87 40.23C401.63 39.5 402 38.38 402 36.87C402 33.63 401.24 30.75 399.73 28.21C398.22 25.67 396.13 23.68 393.46 22.22C390.79 20.76 387.7 20.04 384.19 20.04C381.6 20.04 379.16 20.46 376.87 21.29C374.58 22.12 372.55 23.38 370.8 25.05C369.05 26.72 367.67 28.8 366.67 31.28C365.67 33.76 365.17 36.65 365.17 39.94C365.17 44.47 366.06 48.27 367.84 51.35C369.62 54.43 372.12 56.73 375.32 58.27C378.53 59.81 382.21 60.58 386.37 60.58C389.07 60.58 391.45 60.31 393.53 59.77C395.61 59.23 397.26 58.46 398.51 57.46C399.75 56.46 400.37 55.29 400.37 53.94C400.37 53.08 400.14 52.28 399.68 51.55C399.22 50.82 398.64 50.24 397.94 49.81C396.75 50.62 395.2 51.36 393.29 52.04C391.37 52.71 389.29 53.05 387.02 53.05C383.62 53.05 380.82 52.21 378.6 50.54C376.85 49.22 375.65 47.31 374.98 44.84L397.69 41.55C399.04 41.39 400.09 40.95 400.85 40.22M374.36 37.99C374.53 34.74 375.47 32.2 377.2 30.39C379.06 28.45 381.39 27.48 384.2 27.48C387.01 27.48 388.98 28.25 390.43 29.79C391.89 31.33 392.69 33.15 392.86 35.25L374.36 37.99Z" fill="#DA3D0B" />
                              <path d="M38.6096 42.28C45.7596 45.31 52.6296 48.9 60.0596 50.56C63.3596 51.11 66.7096 51.38 69.9996 51.38V33.16H67.2496C57.0696 33.16 47.6796 38.41 38.5996 42.27" fill="#DA3D0B" />
                              <path d="M17.43 48.08C14.13 47.81 10.82 47.81 7.53 47.81H0V64.54C0 67.56 2.45 70.01 5.47 70.01H64.53C67.55 70.01 70 67.56 70 64.54V62.43C62.86 62.43 55.39 61.51 48.78 58.75C38.34 55.17 28.71 48.36 17.43 48.08Z" fill="#DA3D0B" />
                              <path d="M64.53 0H5.47C2.45 0 0 2.45 0 5.47V36.49C6.61 36.49 13.58 36.76 20.18 36.21C29.26 35.39 37.23 30.42 45.76 27.11C53.46 23.8 61.75 21.86 70 22.14V5.47C70 2.45 67.55 0 64.53 0Z" fill="#DA3D0B" />
                              <path d="M70 33.17V22.13C61.75 21.86 53.46 23.8 45.76 27.1C37.23 30.41 29.26 35.38 20.18 36.2C13.58 36.76 6.61 36.48 0 36.48V47.79H7.54C10.83 47.79 14.14 47.79 17.44 48.06C28.72 48.33 38.34 55.15 48.79 58.73C55.4 61.49 62.87 62.41 70.01 62.41V51.37C66.72 51.37 63.37 51.1 60.07 50.55C52.64 48.88 45.77 45.3 38.62 42.27C47.7 38.4 57.08 33.16 67.27 33.16H70.02L70 33.17Z" fill="white" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <h2 id="ai-expert-modal-title" class="text-base font-semibold text-gray-700 -mb-1">Expert</h2>
                    </div>
                    <button id="close-modal" class="text-gray-500 hover:text-gray-600" aria-label="Close dialog">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Chat Content -->
                <div class="flex-1 p-4 overflow-y-auto">
                  <!-- Info Message -->
                  <div class="bg-indigo-100 rounded-lg mb-6 py-3 px-4">
                    <p class="text-indigo-700 text-sm m-0">
                      AI agent has access to all of FlowFuse's
                      <a href="/docs" class="underline">documentation and knowledge</a>,
                      <a href="/blog" class="underline">blogposts</a>, and more.
                    </p>
                  </div>

                  <!-- Chat Messages Container -->
                  <div id="chat-messages" class="space-y-4 overflow-auto" />
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white rounded-b-none md:rounded-b-lg border-t border-gray-200">
                  <div id="action-buttons-container" class="pb-4 flex justify-between">
                    <button id="clear-conversation" class="bg-white border border-indigo-300 rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      Start over
                    </button>
                    <div id="right-buttons" class="flex gap-2">
                      <button id="continue-to-app" class="textarea-wrapper bg-white rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hidden inline-flex items-center gap-1">
                        Continue chat in <img src="/images/ff-minimal-red.svg" alt="FlowFuse" class="w-5 h-5 inline-block">
                      </button>
                      <button id="stop-generation" class="bg-white border border-indigo-300 rounded-full text-sm flex items-center gap-2 py-2 px-3 hidden">
                        <div class="w-3 h-3 bg-gray-800 rounded-sm" />
                        Stop
                      </button>
                      <button id="send-message" class="bg-indigo-600 text-white border border-indigo-600 rounded-full text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors" disabled>
                        Send
                      </button>
                    </div>
                  </div>
                  <div class="relative">
                    <textarea id="modal-input" placeholder="Give more details in regards to your intended workflow to tailor it to your use case" class="w-full p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-indigo-500 text-gray-900 h-24 text-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Platform-->
  <div class="w-full py-12 max-md:pb-20 mt-6 px-6">
    <div class="md:flex md:my-12 items-center md:flex-row md:justify-between container mx-auto max-md:text-center md:max-w-screen-lg gap-8 items-stretch">
      <div class="m-auto md:w-[40%]">
        <h2 class="w-full mt-0">
          Meet your <span class="text-indigo-600">AI-powered</span> FlowFuse Expert
        </h2>
        <h4 class="font-grey-500 mt-3 max-md:mb-8">Ask what you need. Let it build the application.</h4>
        <p>
          FlowFuse Expert is the fastest, most secure way to build industrial applications and operate at scale&mdash;now with AI powered by Model Context Protocol (MCP) that grounds every suggestion in live plant data, so it  understands your processes, systems, and governance needs in real time.
        </p>
        <p>
          FlowFuse combines Node-RED's 5,000+ community nodes with with FlowFuse Expert, our LLM-powered copilot,  built on MCP and enterprise governance, so IT and OT teams can collaborate and deploy across plants without waiting on scarce developers. MCP connects AI to your live industrial data, making FlowFuse the fastest, most secure way to build industrial applications and operate at scale.
        </p>
      </div>
      <div class="md:w-[60%] flex-grow relative max-md:mt-10">
        <div class="w-full h-full rounded-lg border-1 border-transparent bg-gradient-to-br from-red-400 to-indigo-400 p-[1px]">
          <div class="w-full h-full bg-white ff-image-cover ff-image-rounded left">
            <img src="/images/ai/ai-ui.png" alt="Plant worker interacting with an HMI" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Solution -->
  <div class="w-full bg-indigo-50/60 pb-20 pt-16 mb-16 px-6">
    <div class="md:max-w-screen-lg m-auto">
      <h2 class="text-center w-full md:text-left max-w-4xl">AI for Real <span class="text-indigo-600">Industrial Workflows</span></h2>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
        <div v-for="benefit in benefits" :key="benefit.title" class="relative w-full max-md:max-w-md mx-auto bg-gradient-to-br from-white to-transparent border-2 border-white p-4 rounded-lg">
          <div class="flex flex-col items-center sm:items-start">
            <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
              <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600" v-html="benefit.svg" />
              <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                <h5 class="w-full md:m-0">
                  <div class="text-xl font-medium text-indigo-600 text-center sm:text-left">{{ benefit.title }}
                  </div>
                </h5>
              </div>
            </div>
            <div>
              <p class="text-center sm:text-left font-light">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--CTA-->
  <div class="w-full px-6 pt-6 md:pt-8 pb-20">
    <div class="md:flex items-center md:flex-row md:justify-between container mx-auto max-md:text-center md:max-w-screen-lg gap-8 items-stretch">
      <div class="md:w-1/3 flex-grow relative max-md:mb-16 max-md:max-w-md max-md:mx-auto">
        <div class="ff-image-cover left ff-image-rounded w-full h-full">
          <img src="/images/ai/ai-cta.png" alt="Plant worker interacting with AI on a tablet, connected to the entire factory" loading="lazy" decoding="async">
        </div>
      </div>
      <div class="md:2/3">
        <h2>With <span class="text-indigo-600">FlowFuse Expert,</span> teams can:</h2>
        <div class="ff-prose prose mt-8">
          <ul class="list-disc text-left">
            <li>
              <span class="font-medium">Generate Node-RED flows from natural language descriptions</span> of a workflow or integration, so you can connect any machine and protocol faster.
            </li>
            <li>
              <span class="font-medium">Draft and edit Function node code</span> (JavaScript), UI templates (HTML/CSS/JS), SQL queries, and JSON configurations using the FlowFuse Expert in the editor, so you can transform and model data in any platform without starting from scratch.
            </li>
            <li>
              <span class="font-medium">Empower Operations and Process Engineers</span> to quickly build new dashboards, widgets, and queries using plain-language descriptions of the desired views or KPIs, reducing reliance on IT support.
            </li>
            <li>
              <span class="font-medium">Spin up LLM blueprints</span> that expose industrial data to a chat agent via Model Context Protocol (MCP), so operators and engineers can query systems in natural language and get answers grounded in live machine state, alarms, and logs&mdash;not stale documentation.
            </li>
          </ul>
          <div class="flex max-sm:flex-col max-sm:w-full gap-3 mt-10">
            <a class="ff-btn ff-btn--primary no-underline text-base flex inline uppercase md:min-h-[40px] max-sm:mt-6 max-sm:w-full max-md:mx-auto" href="/book-demo/" onclick="capture('cta-demo', {'reference': 'ai'})">
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
