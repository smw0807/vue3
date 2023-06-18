// https://nuxt.com/docs/api/configuration/nuxt-config
const {
  firebase_apiKey,
  firebase_authDomain,
  firebase_projectId,
  firebase_databaseURL,
  firebase_storageBucket,
  firebase_messagingSenderId,
  firebase_appId,
  firebase_measurementId,
} = process.env;
export default defineNuxtConfig({
  plugins: [],
  modules: ['nuxt-quasar-ui', 'nuxt-vuefire'],
  quasar: {
    lang: 'ko-KR',
    extras: {
      fontIcons: ['material-icons'],
    },
  },
  vuefire: {
    config: {
      apiKey: firebase_apiKey,
      authDomain: firebase_authDomain,
      databaseURL: firebase_databaseURL,
      projectId: firebase_projectId,
      storageBucket: firebase_storageBucket,
      messagingSenderId: firebase_messagingSenderId,
      appId: firebase_appId,
      measurementId: firebase_measurementId,
    },
  },
});
