import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // ================================ State ================================
  const user = ref();
  const state = { user };

  // ================================ Getters ================================
  const getUser = computed(() => user.value);
  const getters = { getUser };

  // ================================ Actions ================================
  const actions = {};
  return { ...state, ...getters, ...actions };
});
