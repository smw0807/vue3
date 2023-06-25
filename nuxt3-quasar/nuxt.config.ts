// https://nuxt.com/docs/api/configuration/nuxt-config
const {
  firebase_apiKey,
  firebase_authDomain,
  firebase_databaseURL,
  firebase_projectId,
  firebase_storageBucket,
  firebase_messagingSenderId,
  firebase_appId,
  firebase_measurementId,
} = process.env;
export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/firebase-init', mode: 'client' }],
  modules: ['nuxt-quasar-ui'],
  quasar: {
    lang: 'ko-KR',
    extras: {
      fontIcons: ['material-icons'],
    },
  },
  runtimeConfig: {
    public: {
      FB_API_KEY: firebase_apiKey,
      FB_AUTH_DOMAIN: firebase_authDomain,
      FB_DATABASE_URL: firebase_databaseURL,
      FB_PROJECT_ID: firebase_projectId,
      FB_STORAGE_BUCKET: firebase_storageBucket,
      FB_MESSAGING_SENDER_ID: firebase_messagingSenderId,
      FB_APP_ID: firebase_appId,
      FB_MEASUREMENT_ID: firebase_measurementId,
    },
  },
});
