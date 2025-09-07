import { defineStore } from 'pinia';
import { useUserStore } from '~/store/user';

import useApi from '~/composables/useApi';
import useToken from '~/composables/useToken';

import type {
  ApiResponse,
  ApiTokenResponse,
  OauthResponse,
} from '~/models/api';
import type { User } from '~/models/user';

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore();
  const { setToken, removeToken } = useToken();
  // ================================ State ================================
  const state = {};

  // ================================ Getters ================================);
  const getters = {};

  // ================================ Actions ================================
  // 로그인
  const login = async (email: string, password: string) => {
    try {
      const res = await useApi<ApiTokenResponse>({
        method: 'POST',
        url: '/auth/login',
        body: {
          email,
          password,
        },
      });
      if (res.success) {
        const { setToken } = useToken();
        setToken('access', res.token.access_token);
        setToken('refresh', res.token.refresh_token);
        navigateTo('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
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
  // 로그아웃
  const logout = () => {
    removeToken('access');
    removeToken('refresh');
    userStore.user = null;
  };
  // 구글 로그인
  const requestGoogleLogin = async () => {
    try {
      const res = await useApi<OauthResponse>({
        method: 'GET',
        url: '/auth/google/signin',
      });
      if (res.success) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 구글 로그인 처리
  const handleGoogleLogin = async (code: string) => {
    try {
      const res = await useApi<ApiTokenResponse>({
        method: 'GET',
        url: '/auth/google/callback',
        params: {
          code,
        },
      });
      if (res.success) {
        setToken('access', res.token.access_token);
        setToken('refresh', res.token.refresh_token);
        navigateTo('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 카카오 로그인
  const requestKakaoLogin = async () => {
    try {
      const res = await useApi<OauthResponse>({
        method: 'GET',
        url: '/auth/kakao/signin',
      });
      if (res.success) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 카카오 로그인 처리
  const handleKakaoLogin = async (code: string) => {
    try {
      const res = await useApi<ApiTokenResponse>({
        method: 'GET',
        url: '/auth/kakao/callback',
        params: {
          code,
        },
      });
      if (res.success) {
        setToken('access', res.token.access_token);
        setToken('refresh', res.token.refresh_token);
        navigateTo('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
  const actions = {
    login,
    verifyToken,
    refreshToken,
    logout,
    requestGoogleLogin,
    handleGoogleLogin,
    requestKakaoLogin,
    handleKakaoLogin,
  };
  return { ...state, ...getters, ...actions };
});
