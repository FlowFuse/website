// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    routeRules: {
        // Root serves the Nuxt default page (not proxied)
        '/': {},
        // Proxy all other routes to the legacy 11ty dev server
        '/**': { proxy: 'http://localhost:8080/**' }
    }
})
