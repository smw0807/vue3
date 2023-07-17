<script setup lang="ts">
import { computed, reactive } from 'vue';

interface Props {
  isOpen: boolean; // true => 다이얼로그 열림, false => 닫힘
  mode?: string; // ins => 글 등록모드, upd => 등록된 글 상세보기 후 수정
  title?: string; // 제목
  content?: string; // 내용
}
interface IFrom {
  title: string;
  content: string;
}

// 입력폼
const formData: IFrom = reactive({
  title: '',
  content: '',
});

/**
 * submit : 입력된 formData를 위로 전달함 @return IForm
 * close : 닫기 버튼 클릭시 위로 전달함 @return void
 */
const emits = defineEmits(['submit', 'close']);

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  mode: 'ins',
  title: '',
  content: '',
});
// 컴포넌트 오픈 여부
const cOpen = computed(() => props.isOpen);

// confirm 오픈 여부
const confirmOpen: Ref<boolean> = ref(false);
// confirm 제목
const confirmTitle = props.mode === 'ins' ? '글 등록' : '글 수정';
// confirm 내용
const confirmText =
  props.mode === 'ins'
    ? '입력한 내용을 등록하시겠습니까?'
    : '입력한 내용으로 글을 수정하시겠습니까?';

// 입력한 값들을 위로 전파
const submit = () => {
  emits('submit', formData);
};
// 모달 닫기
const close = (): void => {
  emits('close', false);
};
</script>
<template>
  <q-dialog v-model="cOpen" persistent>
    <q-card style="min-width: 550px">
      <q-card-section>
        <div class="text-h6">글쓰기</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="formData.title"
          autofocus
          filled
          label="제목"
          color="purple-12"
          @keyup.enter="submit"
        />
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <q-input
          v-model="formData.content"
          type="textarea"
          filled
          label="내용"
          input-style="height:200px;"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn @click="confirmOpen = true" color="primary" label="등록" />
        <q-btn @click="close" outline label="닫기" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="confirmOpen"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ confirmTitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ confirmText }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="저장" @click="submit" v-close-popup />
        <q-btn flat label="취소" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style></style>
