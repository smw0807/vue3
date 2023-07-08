// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-quasar-ui', '@pinia/nuxt'],
  quasar: {
    lang: 'ko-KR',
    extras: {
      fontIcons: ['material-icons'],
    },
  },
  runtimeConfig: {
    public: {
      FB_API_KEY: process.env.FIREBASE_API_KEY,
      FB_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FB_DATABASE_URL: process.env.FIREBASE_DATABASE_RUL,
      FB_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FB_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FB_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FB_APP_ID: process.env.FIREBASE_APP_ID,
      FB_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
});
