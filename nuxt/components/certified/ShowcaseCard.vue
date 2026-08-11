<template>
    <div class="showcase-card rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-6 md:px-9 pt-7 md:pt-9 pb-7">
            <slot name="header" />
        </div>
        <div class="px-6 md:px-9 pt-7 pb-7 md:pb-9 border-t border-gray-100">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.showcase-card {
    background:
        radial-gradient(55% 55% at 100% 0%, color-mix(in srgb, var(--color-red-600, #dc2626) 12%, transparent), transparent 72%),
        radial-gradient(58% 60% at 0% 100%, color-mix(in srgb, var(--color-indigo-600, #4f46e5) 12%, transparent), transparent 72%),
        #fff;
}
</style>
