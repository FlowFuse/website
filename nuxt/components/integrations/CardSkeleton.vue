<script setup></script>

<template>
    <li class="integration-card pointer-events-none border border-gray-300 rounded-xl bg-white drop-shadow-md">
        <span class="h-48 flex flex-col">
            <div class="integration-card--details p-3 grow min-h-0">
                <span class="placeholder-bar block w-1/2 h-5 mt-1 mb-3"><span class="placeholder-gradient"></span></span>
                <span class="placeholder-bar block w-full h-16 opacity-50"><span class="placeholder-gradient"></span></span>
            </div>
            <div class="integration-card--meta flex justify-between bg-indigo-50/50 p-3 text-sm">
                <div class="integration-card--stats">
                    <span class="placeholder-bar block h-5 w-5"><span class="placeholder-gradient"></span></span>
                    <span class="placeholder-bar block h-5 w-5"><span class="placeholder-gradient"></span></span>
                </div>
            </div>
        </span>
    </li>
</template>
