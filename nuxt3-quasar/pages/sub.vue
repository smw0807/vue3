<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({
  layout: 'sub',
});
const text = ref('sub page!');
</script>
<template>{{ text }}</template>
