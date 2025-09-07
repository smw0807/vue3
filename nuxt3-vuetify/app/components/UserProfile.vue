<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';

const userStore = useUserStore();
const authStore = useAuthStore();
</script>
<template>
  <v-sheet
    class="pa-4"
    color="grey-lighten-4 d-flex flex-column align-center justify-center"
  >
    <template v-if="userStore.user">
      <v-avatar class="mb-4" color="grey-darken-1" size="64">
        <v-img
          v-if="userStore.user.profileImage"
          :src="userStore.user.profileImage"
        />
        <p v-else class="text-white">{{ userStore.user.name.charAt(0) }}</p>
      </v-avatar>

      <p class="text-subtitle-2">{{ userStore.user.name }}</p>
      <div>
        {{ userStore.user.email }}
      </div>
      <v-btn variant="text" color="primary" @click="authStore.logout"
        >로그아웃</v-btn
      >
    </template>
    <template v-else>
      <v-btn color="primary" block @click="navigateTo('/login')">Login</v-btn>
    </template>
  </v-sheet>
</template>
