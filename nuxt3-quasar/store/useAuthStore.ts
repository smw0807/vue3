import { defineStore } from 'pinia';
import type { User } from 'firebase/auth';

export const useAuthStore = defineStore('user', {
  state: () => ({
    userAuth: null as User | null,
  }),
  getters: {
    //  유저 정보 가져오기
    getUserAuth(): User | null {
      return this.userAuth;
    },
  },
  actions: {},
});
