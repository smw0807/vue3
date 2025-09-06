import { defineStore } from 'pinia';
import { useUserStore } from '~/store/user';

import useApi from '~/composables/useApi';
import useToken from '~/composables/useToken';
import type { ApiResponse, ApiTokenResponse } from '~/models/api';
import type { User } from '~/models/user';

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore();
  const { setToken } = useToken();
  // ================================ State ================================
  const state = {};

  // ================================ Getters ================================);
  const getters = {};

  // ================================ Actions ================================
  // 로그인
  const login = async () => {};
  // 토큰 검증
  const verifyToken = async () => {
    try {
      const res = await useApi<ApiResponse<User>>({
        method: 'POST',
        url: '/auth/verify/token',
      });
      if (res.success) {
        userStore.user = res.data as User;
      } else {
        userStore.user = null;
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 토큰 재발급
  const refreshToken = async () => {
    try {
      const res = await useApi<ApiTokenResponse>({
        method: 'POST',
        url: '/auth/refresh/token',
      });
      if (res.success) {
        setToken('access', res.token.access_token);
        setToken('refresh', res.token.refresh_token);
        await verifyToken();
      } else {
        userStore.user = null;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const actions = { login, verifyToken, refreshToken };
  return { ...state, ...getters, ...actions };
});
