<script setup lang="ts">
import { onMounted } from 'vue';
import { useFirestore, useCollection, _RefFirestore } from 'vuefire';
import { getFirestore, collection, DocumentData } from 'firebase/firestore';
// const config = useRuntimeConfig();

const db = useFirestore();
console.log('useFirestore : ', db);
const collectionName = 'test-board';

/**
 * 페이지 새로고침 시 파이어베이스 api 요청 url과 라우터 url이 충돌되는 것 같음
 * databaseURL 옵션도 줬는데 뭐가 문제인지 파악해야함...
 */
const docData = useCollection(collection(db, collectionName));
console.log('docData : ', docData.data.value);
// onMounted(async () => {
// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);
// });
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
</template>
