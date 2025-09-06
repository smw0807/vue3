<script setup lang="ts">
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
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
      <div>{{ userStore.user.email }}</div>
    </template>
    <template v-else>
      <v-btn color="primary" block @click="navigateTo('/login')">Login</v-btn>
    </template>
  </v-sheet>
</template>
