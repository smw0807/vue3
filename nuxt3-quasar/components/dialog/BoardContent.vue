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

// 삭제여부
const isDel: Ref<boolean> = ref(false);

// form ref
const boardContentForm = ref();

// 입력폼
const formData: BoardInsertType = reactive({
  title: '',
  content: '',
});

watchEffect(() => {
  const row = props.row;
  formData.title = row?.title || '';
  formData.content = row?.content || '';
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
const confirmTitle: Ref<string> = ref('');
// confirm 내용
const confirmText: Ref<string> = ref('');
// confirm
const confirm = async () => {
  try {
    // form 정합성 체크
    const valid = await boardContentForm.value.validate();
    if (props.mode === 'ins') {
      confirmTitle.value = '글 등록';
      confirmText.value = '입력한 내용을 등록하시겠습니까?';
    } else if (props.mode === 'upd') {
      confirmTitle.value = '글 수정';
      confirmText.value = '입력한 내용으로 글을 수정하시겠습니까?';
    }
    if (valid) confirmOpen.value = true;
  } catch (err) {
    console.error(err);
  }
};

// 입력한 값들을 위로 전파
const submit = (v: boolean) => {
  if (v) {
    if (props.mode === 'ins') {
      emits('submit', 'ins', formData);
    } else if (props.mode === 'upd' && isDel.value === false) {
      emits('submit', 'upd', formData, props.row!.id);
    } else {
      emits('submit', 'del', null, props.row!.id);
    }
  }
  isDel.value = false;
  confirmOpen.value = false;
};
// 모달 닫기
const close = (): void => {
  emits('close', false);
};

// 삭제
const deleteBtn = (): void => {
  isDel.value = true;
  confirmTitle.value = '글 삭제';
  confirmText.value = '해당 글을 삭제하시겠습니까?';
  confirmOpen.value = true;
};
</script>
<template>
  <ConfirmPop
    :is-open="confirmOpen"
    :title="confirmTitle"
    :text="confirmText"
    @submit="submit"
  />
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

      <q-card-actions class="text-primary">
        <div class="row justify-between" style="width: 100%">
          <div class="col-4">
            <q-btn color="negative" @click="deleteBtn" label="삭제" />
          </div>
          <div class="col-8 text-right">
            <q-btn @click="confirm" color="primary" label="등록" />
            <q-btn @click="close" outline label="닫기" />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style></style>
