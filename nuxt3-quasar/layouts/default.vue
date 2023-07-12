<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { rootMenu, firebaseMenu, quasarMenu } from '~/utils/menus';
import { useAuthStore } from '~/store/useAuthStore';

// 스토어에 저장된 사용자 정보
const authStore = useAuthStore();

const cNowUser = computed(() => authStore.getUserAuth);

// 로그인
const signIn = async (): Promise<void> => {
  try {
    authStore.userAuth = await useGoogleSignIn();
  } catch (err) {
    console.warn(err);
  }
};

// 로그아웃
const signOut = (): void => {
  useGoogleSignOut();
};

// 현재 로그인한 사용자 가져오기
const getNowUser = (): void => {
  useGetNowUserAuth((user) => {
    authStore.userAuth = user;
  });
};
onMounted(() => {
  getNowUser();
});

// 메뉴 활성화
const leftDrawerOpen: Ref<boolean> = ref(false);
const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <!-- 헤더 -->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
          <q-avatar size="25px">
            <img src="/favicon.ico" />
          </q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            Nuxt3
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="grey-8"
            icon="video_call"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>

          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="grey-8"
            icon="apps"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>

          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="grey-8"
            icon="message"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn v-if="cNowUser" round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                  <q-btn
                    @click="signOut"
                    color="primary"
                    label="Sign out"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
            <q-tooltip>My Info</q-tooltip>
          </q-btn>
          <q-btn v-else @click="signIn" round dense flat icon="login">
            <q-tooltip>Login</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- 사이드 메뉴 -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="item in rootMenu"
            :key="item.text"
            v-ripple
            clickable
            :to="item.to"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-separator class="q-my-md" /> -->

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold">
            FireBase
          </q-item-label>

          <q-item
            v-for="item in firebaseMenu"
            :key="item.text"
            v-ripple
            clickable
            :to="item.to"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold"> quasar </q-item-label>

          <q-item
            v-for="item in quasarMenu"
            :key="item.text"
            v-ripple
            clickable
            :to="item.to"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- 컨텐츠 표시 영역 -->
    <q-page-container>
      <q-page padding>
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
