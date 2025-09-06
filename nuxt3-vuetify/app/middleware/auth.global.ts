import useToken from '~/composables/useToken';
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async () => {
  console.log('####### auth.global');
  const userStore = useUserStore();
  const authStore = useAuthStore();

  const { getToken } = useToken();
  const accessToken = getToken('access');
  const refreshToken = getToken('refresh');

  // 토큰이 없으면 사용자 상태 null 처리
  if (!accessToken && !refreshToken) {
    userStore.user = null;
  }

  // accessToken이 있으면 토큰 검증 후 사용자 상태 업데이트(사용자 정보 없을 경우에만)
  if (accessToken) {
    // 토큰 검증
    await authStore.verifyToken();
  }

  // accessToken이 없으면 refreshToken 검증 후 토큰 재발급 후 사용자 상태 업데이트
  if (refreshToken) {
    // 토큰 재발급
    await authStore.refreshToken();
  }
});
