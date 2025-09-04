<script setup lang="ts">
import SignUp from '~/components/modal/SignUp.vue';

definePageMeta({
  layout: 'login',
});

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log(email.value, password.value);
};

const handleGoogleLogin = () => {
  console.log('Google 로그인');
};

const handleKakaoLogin = () => {
  console.log('Kakao 로그인');
};

const isSignUp = ref(false);
const handleSignUp = () => {
  isSignUp.value = true;
};
</script>
<template>
  <v-sheet class="mx-auto" width="500">
    <SignUp :is-open="isSignUp" @update:is-open="isSignUp = $event" />
    <v-form>
      <v-card class="">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="Email" />
          <v-text-field v-model="password" label="Password" />
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
