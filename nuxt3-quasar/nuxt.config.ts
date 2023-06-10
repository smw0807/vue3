// https://nuxt.com/docs/api/configuration/nuxt-config
/**
 * 퀘이사 공식홈페이지
 * https://quasar.dev/
 *
 * 레이아웃 예제 모음
 * https://quasar.dev/layout/gallery/
 */
export default defineNuxtConfig({
  plugins: [],
  modules: ['nuxt-quasar-ui'],
  quasar: {
    lang: 'ko-KR',
    extras: {
      fontIcons: ['material-icons'],
    },
  },
});
