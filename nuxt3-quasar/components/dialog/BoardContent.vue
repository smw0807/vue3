<script setup lang="ts">
import { computed, reactive } from 'vue';

/**
 * todo
 * textarea input-style height 적용 안되는 부분 확인
 * 화면단에서 title, content 넘기면 input에 값 넣어주는 로직 만들기
 */

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

const cOpen = computed(() => props.isOpen);

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
          clear-icon="close"
          autofocus
          autogrow
          filled
          label="내용"
          input-style="height:200px;"
          @keyup.enter="submit"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn @click="submit" color="primary" label="등록" />
        <q-btn @click="close" outline label="닫기" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style></style>
