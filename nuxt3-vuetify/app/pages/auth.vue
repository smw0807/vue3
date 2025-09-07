<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'login',
});

const { query } = useRoute();

const authStore = useAuthStore();

onMounted(() => {
  if (query.state === 'kakao') {
    authStore.handleKakaoLogin(query.code as string);
  } else {
    authStore.handleGoogleLogin(query.code as string);
  }
});
</script>

<template>
  <v-sheet class="mx-auto text-center" width="500">
    <v-card variant="flat">
      <v-card-title>로그인 중입니다...</v-card-title>
      <v-card-text>
        <v-progress-circular size="100" indeterminate />
        <p class="text-subtitle-2">잠시만 기다려주세요...</p>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
