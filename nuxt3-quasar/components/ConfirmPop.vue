<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  isOpen: boolean;
  title: string;
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: '',
  text: '',
});

const emits = defineEmits(['confirm']);

const cOpen = computed(() => props.isOpen);

const confirm = (v: boolean): void => {
  emits('confirm', v);
};
</script>
<template>
  <q-dialog
    v-model="cOpen"
    persistent
    transition-show="scale"
    transition-hide="scale"
    style="z-index: 99999"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ text }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="확인" @click="confirm(true)" v-close-popup />
        <q-btn flat label="취소" @click="confirm(false)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
