module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/attributes-order': 'off', //뷰 속성 태그 순서
    'vue/no-multiple-template-root': 'off', //뷰 루트 템플릿
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
