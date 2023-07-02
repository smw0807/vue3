<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
const date: Ref<string> = ref('2023-06-06');
</script>
<template>
  <q-card class="my-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="text-subtitle2 absolute-top text-center">Title</div>
    </q-img>
  </q-card>

  <q-card class="my-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="text-h5 absolute-bottom text-right">Title</div>
    </q-img>
  </q-card>

  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-date v-model="date" />

      <q-date v-model="date" minimal />
    </div>
  </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
