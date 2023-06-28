<script setup lang="ts">
import { onMounted } from 'vue';

//todo 타입 지정 뭘로해야 되는지 확인 필요
//todo 새로고침시 에러뜨는 문제 해결해야함
let lists = getFirestoreData('test-board');
onMounted(() => {});
</script>
<template>
  <q-card dark bordered class="bg-brown-7 my-card">
    <q-card-section>
      <div class="text-h6">Firebase / Firestore Database</div>
      <div class="text-subtitle2">firestore</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      파이어베이스에서 제공하는 firestore database를 nuxt-vuefire 모듈을 이용해
      만든 게시판
    </q-card-section>
  </q-card>

  <q-separator class="q-mt-md q-mb-xs" />

  <ul>
    <li v-for="list in lists" :key="list.id">
      <span>{{ list }}</span>
    </li>
  </ul>
</template>
