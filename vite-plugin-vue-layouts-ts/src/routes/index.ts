import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const routes = setupLayouts(generatedRoutes);

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
});
