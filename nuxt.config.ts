// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  css: ['~/assets/styles/index.scss'],
  ssr: false,
  modules: [
    '@pinia/nuxt'
  ],
  vue: {
    
  }
});