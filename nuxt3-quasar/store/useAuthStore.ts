import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import type { User } from 'firebase/auth';

export const useAuthStore = defineStore('user', () => {
  const userAuth: Ref<User | null> = ref(null);
  const state = { userAuth };

  const getUserAuth = computed(() => userAuth.value);
  const getters = { getUserAuth };

  const actions = {};

  return {
    ...state,
    ...getters,
    ...actions,
  };
});
