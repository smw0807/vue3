<script setup lang="ts">
import { useMyStore } from '~/store/myStore';

const store = useMyStore();

const btnClick1 = (): void => {
  store.increment();
};
const btnClick2 = (): void => {
  store.count++;
};

const updTitle1 = (): void => {
  store.changeTitle('Actions를 이용한 변경');
};

const updTilte2 = (): void => {
  store.title = 'state로 바로 변경';
};
</script>
<template>
  <div class="text-h1">{{ store.getTitle }}</div>
  <div class="text-body1">
    <q-btn color="primary" @click="btnClick1">{{ store.count }}</q-btn>
    <q-btn color="primary" @click="btnClick2">{{ store.getCount }}</q-btn>
  </div>
  <div class="row q-mt-sm">
    <div class="col">
      <q-btn color="primary" @click="updTitle1">제목 바꾸기 1</q-btn>
      <q-btn color="warning" @click="updTilte2">제목 바꾸기 2</q-btn>
    </div>
    <div class="col"></div>
  </div>
</template>
