// Shims for npm packages that don't ship types, plus a NuxtHooks augmentation
// for the `nitro:config` hook (missing from @nuxt/schema).
declare module 'markdown-it-footnote'
declare module 'markdown-it-attrs'

declare module '@nuxt/schema' {
    interface NuxtHooks {
        'nitro:config': (nitroConfig: import('nitropack').NitroConfig) => void | Promise<void>
    }
}
