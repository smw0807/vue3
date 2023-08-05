<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';

interface Props {
  isOpen: boolean; // true => 다이얼로그 열림, false => 닫힘
  mode?: string; // ins => 글 등록모드, upd => 등록된 글 상세보기 후 수정
  row?: RowType;
}
/**
 * submit : 입력된 formData를 위로 전달함 @return IForm
 * close : 닫기 버튼 클릭시 위로 전달함 @return void
 */
const emits = defineEmits(['submit', 'close']);

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  mode: 'ins',
  row: null,
});
// 컴포넌트 오픈 여부
const cOpen = computed(() => props.isOpen);

// form ref
const boardContentForm = ref();

// 입력폼
const formData: BoardInsertType = reactive({
  title: '',
  content: '',
});

watchEffect(() => {
  if (props.row) {
    const row = props.row;
    formData.title = row?.title || '';
    formData.content = row?.content || '';
  }
});

// title validate
const titleRules = (v: string): boolean | string => {
  if (!v) return '제목을 입력해주세요.';
  else if (v.length > 20) return '제목은 최대 20자까지 입력 가능합니다.';
  return true;
};
// contnet validate
const contentRules = (v: string): boolean | string => {
  if (!v) return '내용을 입력해주세요.';
  else if (v.length > 500) return '내용은 최대 500자까지 입력 가능합니다.';
  return true;
};

// confirm 오픈 여부
const confirmOpen: Ref<boolean> = ref(false);
// confirm 제목
const cConfirmTitle = computed(() => {
  if (props.mode === 'ins') return '글 등록';
  else return '글 수정';
});
// confirm 내용
const cConfirmText = computed(() => {
  if (props.mode === 'ins') return '입력한 내용을 등록하시겠습니까?';
  else return '입력한 내용으로 글을 수정하시겠습니까?';
});
// confirm
const confirm = async () => {
  try {
    // form 정합성 체크
    const valid = await boardContentForm.value.validate();
    if (valid) confirmOpen.value = true;
  } catch (err) {
    console.error(err);
  }
};

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

      <q-form ref="boardContentForm">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="formData.title"
            :rules="[titleRules]"
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
            :rules="[contentRules]"
            type="textarea"
            filled
            label="내용"
            input-style="height:200px;"
          />
        </q-card-section>
      </q-form>

      <q-card-actions align="right" class="text-primary">
        <q-btn @click="confirm" color="primary" label="등록" />
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
        <div class="text-h6">{{ cConfirmTitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ cConfirmText }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="저장" @click="submit" v-close-popup />
        <q-btn flat label="취소" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style></style>
