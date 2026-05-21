<script setup>
defineProps({
    // Null while the catalog fetch is in flight; resolves to a number after.
    count: { validator: v => v === null || typeof v === 'number', default: null },
    pressed: { type: Boolean, required: true }
})
defineEmits(['toggle'])
</script>

<template>
    <section class="certified-hero">
        <div class="container m-auto md:max-w-6xl px-6">
            <div class="certified-hero--card bg-indigo-50 rounded-lg border-[3px] border-indigo-200 drop-shadow-xl p-6 md:p-10 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
                <div class="md:col-span-5">
                    <span class="certified-eyebrow">
                        <IntegrationsCertifiedIcon />
                        <span>FlowFuse Certified</span>
                    </span>
                    <h2 class="certified-hero--title text-balance">
                        Certified Nodes, backed by their authors and supported long-term.
                    </h2>
                    <p class="certified-hero--lede">
                        Choosing a Node-RED node for production raises questions you can't always answer from a README. Is it actively maintained? Is it secure? Will the maintainer still be around in two years? Certified Nodes answer those questions.
                    </p>
                    <div class="certified-hero--actions">
                        <button
                            id="certified-pill-toggle"
                            type="button"
                            class="ff-btn ff-btn--primary uppercase certified-toggle"
                            :aria-pressed="pressed ? 'true' : 'false'"
                            @click="$emit('toggle')"
                        >
                            <IntegrationsCertifiedIcon />
                            <span>Show only Certified</span>
                            <span v-if="count !== null" class="certified-toggle--count"> ({{ count }})</span>
                        </button>
                        <!-- TODO: repoint to a proper FlowFuse-owned Certified Nodes explainer page when one exists. A year-old blog post is not the long-term destination. -->
                        <a
                            class="certified-hero--link inline-flex items-center gap-1"
                            href="/blog/2025/07/certified-nodes-v2/"
                        >
                            Learn more
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <ul class="certified-pillars md:col-span-7">
                    <li class="certified-pillar">
                        <span class="certified-pillar--icon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </span>
                        <div>
                            <h3 class="certified-pillar--title">Vetted authors</h3>
                            <p class="certified-pillar--body">Every Certified Node comes from a developer with a track record in their domain — not an anonymous npm publisher.</p>
                        </div>
                    </li>
                    <li class="certified-pillar">
                        <span class="certified-pillar--icon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                        </span>
                        <div>
                            <h3 class="certified-pillar--title">Supported through production</h3>
                            <p class="certified-pillar--body">FlowFuse stands behind every Certified Node after launch — patching CVEs on our own timeline. Each node is vetted for reliability, security posture, and current documentation before shipping.</p>
                        </div>
                    </li>
                    <li class="certified-pillar">
                        <span class="certified-pillar--icon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <div>
                            <h3 class="certified-pillar--title">Free or commercial, same bar</h3>
                            <p class="certified-pillar--body">Some Certified Nodes are free and open; others target specific enterprise needs. The certification standard is the same.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
