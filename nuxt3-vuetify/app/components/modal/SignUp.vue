<script setup lang="ts">
import {
  emailRules,
  nameRules,
  passwordRules,
  passwordConfirmRules,
} from '~/utils/rules';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:isOpen']);

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const cOpen = computed(() => props.isOpen);

const signUpForm = ref();

const handleSignUp = async () => {
  console.log(email.value, name.value, password.value, passwordConfirm.value);
  const { valid } = await signUpForm.value.validate();
  if (!valid) return;
  try {
    const res = await $fetch<{ success: boolean }>(
      `${config.public.API_URL}/user/signup`,
      {
        method: 'POST',
        body: {
          email: email.value,
          name: name.value,
          password: password.value,
        },
      }
    );
    if (res.success) {
      emits('update:isOpen', false);
    }
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

const config = useRuntimeConfig();
const emailCheck = async (v: string) => {
  try {
    const res = await $fetch<{ user: boolean }>(
      `${config.public.API_URL}/user/${v}`,
      {
        method: 'GET',
      }
    );
    if (res?.user) {
      return '이메일이 이미 존재합니다.';
    }
    return true;
  } catch (err) {
    console.error(err);
    return '이메일 확인 중 오류가 발생했습니다.';
  }
};
</script>
<template>
  <v-dialog
    v-model="cOpen"
    persistent
    transition-show="scale"
    transition-hide="scale"
    width="500"
  >
    <v-card>
      <v-card-title>회원가입</v-card-title>
      <v-card-text>
        <v-form ref="signUpForm">
          <v-text-field
            v-model="email"
            label="이메일"
            :rules="[emailRules, emailCheck]"
          />
          <v-text-field v-model="name" label="이름" :rules="[nameRules]" />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            :rules="[passwordRules]"
          />
          <v-text-field
            v-model="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            :rules="[passwordConfirmRules(passwordConfirm, password)]"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="primary" variant="flat" @click="handleSignUp"
          >회원가입</v-btn
        >
        <v-btn @click="emits('update:isOpen', false)">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
