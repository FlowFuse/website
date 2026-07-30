// @nuxtjs/color-mode persists whatever preference a visitor had (often "system")
// to localStorage, which overrides nuxt.config.ts's colorMode default on repeat
// visits. Dark mode isn't supported across the site yet, so force + persist
// "light" here to self-heal anyone who has an old stored preference.
export default defineNuxtPlugin(() => {
    const colorMode = useColorMode()
    colorMode.preference = 'light'
})
