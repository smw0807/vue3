// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/content',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      ACCESS_TOKEN: process.env.ACCESS_TOKEN_NAME,
      REFRESH_TOKEN: process.env.REFRESH_TOKEN_NAME,
    },
  },
});
