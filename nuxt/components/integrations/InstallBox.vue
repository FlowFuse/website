<script setup>
const installGifUrl = '/node-red/getting-started/library/images/installing-node-red-node.gif'
const installPngUrl = '/images/integrations/palette-manager-install.png'
</script>

<template>
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm overflow-hidden">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            Installation
        </h3>
        <p class="text-sm text-gray-600 mb-3">
            Install in Node-RED via the
            <a
                href="https://flowfuse.com/node-red/getting-started/library/#using-the-palette-manager"
                class="text-indigo-600 hover:text-indigo-800 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
            >palette manager</a>.
        </p>
        <!-- GIF stays as <img> so animation survives. -->
        <img
            :src="installGifUrl"
            alt="Animation of the Node-RED palette manager: open Manage Palette, search for the node, then click Install."
            loading="lazy"
            width="1326"
            height="720"
            class="motion-reduce:hidden block w-full rounded border border-gray-200"
        />
        <NetlifyImg
            :src="installPngUrl"
            alt="Node-RED Palette Manager dialog with the node selected and the Install button visible."
            :width="707"
            :height="376"
            class="motion-safe:hidden block w-full rounded border border-gray-200"
        />
    </div>
</template>
