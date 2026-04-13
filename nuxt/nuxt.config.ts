// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
    devtools: { enabled: true },

    routeRules: isDev ? {
        // In development, proxy all routes to the legacy 11ty dev server
        '/**': { proxy: 'http://localhost:8080/**' }
    } : {}
})
