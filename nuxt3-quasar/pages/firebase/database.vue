<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { DocumentData } from 'firebase/firestore';

let lists: Ref<{ id: string; data: DocumentData }[] | []> = ref([]);
// let lists: { id: string; data: DocumentData }[] | [] = []; //반응형이 아니라 화면에 안그려짐

onMounted(async () => {
  lists.value = await getFirestoreData('test-board');
  // lists = await getFirestoreData('test-board'); //반응형이 아니라 화면에 안그려짐
});
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
