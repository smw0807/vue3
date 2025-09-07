<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

import { emailRules, passwordRules } from '~/utils/rules';

import SignUp from '~/components/modal/SignUp.vue';

definePageMeta({
  layout: 'login',
});

const email = ref('');
const password = ref('');
const loginForm = ref();
const authStore = useAuthStore();

const handleLogin = async () => {
  console.log(email.value, password.value);
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  await authStore.login(email.value, password.value);
};

const handleGoogleLogin = async () => {
  await authStore.requestGoogleLogin();
};

const handleKakaoLogin = async () => {
  await authStore.requestKakaoLogin();
};

const isSignUp = ref(false);
const handleSignUp = () => {
  isSignUp.value = true;
};
</script>
<template>
  <v-sheet class="mx-auto" width="500">
    <SignUp :is-open="isSignUp" @update:is-open="isSignUp = $event" />
    <v-form ref="loginForm">
      <v-card class="">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="Email" :rules="[emailRules]" />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[passwordRules]"
          />
        </v-card-text>
        <v-card-actions class="d-flex flex-column gap-2">
          <v-btn block color="primary" variant="flat" @click="handleLogin">
            Email 로그인
          </v-btn>
          <v-btn block color="info" variant="flat" @click="handleGoogleLogin">
            Google 로그인
          </v-btn>
          <v-btn block color="yellow" variant="flat" @click="handleKakaoLogin">
            KAKAO 로그인
          </v-btn>
          <p class="text-subtitle-2 d-flex align-center gap-2">
            아직 회원이 아니신가요?
            <v-btn variant="text" color="primary" @click="handleSignUp"
              >회원가입</v-btn
            >
            <v-btn variant="text" @click="navigateTo('/')">돌아가기</v-btn>
          </p>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-sheet>
</template>
