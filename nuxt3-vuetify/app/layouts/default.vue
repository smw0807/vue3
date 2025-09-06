<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

const links = [
  ['mdi-inbox-arrow-down', 'Inbox'],
  ['mdi-send', 'Send'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam'],
];

const drawer = ref(true);
</script>
<template>
  <v-app id="inspire">
    <v-app-bar class="bg-blue-darken-2 border-b">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <template v-if="userStore.user">
          <v-avatar class="mb-4" color="grey-darken-1" size="64">
            <v-img
              v-if="userStore.user.profileImage"
              :src="userStore.user.profileImage"
            />
            <p v-else class="text-white">{{ userStore.user.name.charAt(0) }}</p>
          </v-avatar>

          <div>{{ userStore.user.email }}</div>
        </template>
        <template v-else>
          <v-btn color="primary" block @click="navigateTo('/login')"
            >Login</v-btn
          >
        </template>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
        />
      </v-list>
    </v-navigation-drawer>

    <slot />
  </v-app>
</template>
