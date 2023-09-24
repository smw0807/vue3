<script setup lang="ts">
/**
 * 링크
 * clearable : https://quasar.dev/vue-components/file-picker#clearable
 * chips : https://quasar.dev/vue-components/file-picker#using-chips
 */
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';

// confirm 오픈 여부
const confirmOpen: Ref<boolean> = ref(false);
// confirm 제목
const confirmTitle: Ref<string> = ref('파일 업로드');
// confirm 내용
const confirmText: Ref<string> = ref('첨부된 파일들을 등록하시겠습니까?');

// 컬렉션 이름
const collectionName = 'test-file';

// 파일 첨부 관련 -------------------------------
// 첨부 용량 제한값 (5MB)
const FILE_TOTAL_SIZE = 5 * 1048576;
// 첨부 파일
const attachFiles: Ref<File[] | null> = ref(null);
// 파일 업로드 가능 여부
const isUpload = computed(() => attachFiles.value !== null);
// 파일업로드 버튼 클릭
const fileUploadButton = (): void => {
  console.log('fileUploadButton');
  confirmOpen.value = true;
};
// Storage에 파일 업로드 처리
const uploadFiles = (): boolean => {
  // todo 파일 업로드
  console.log('uploadFile');
  console.log(typeof attachFiles.value);
  useUploadFile(attachFiles);
  return false;
};
//Firestore에 컬렉션 등록
const createDocument = (): bolean => {
  // todo 컬렉션 등록
  return false;
};

// submit
const submit = (isOk: boolean): void => {
  console.log('submit : ', isOk);
  if (isOk) {
    // todo 파일 업로드
    console.log(attachFiles.value);
    const upload = uploadFiles();
    console.log('upload : ', upload);
    // todo 도큐먼트 생성
  }
  confirmOpen.value = false;
};

onMounted(() => {});
</script>
<template>
  <ConfirmPop
    :is-open="confirmOpen"
    :title="confirmTitle"
    :text="confirmText"
    @confirm="submit"
  />
  <q-card dark bordered class="bg-brown-7 my-card">
    <q-card-section>
      <div class="text-h6">Firebase / Firestore Database & Storage</div>
      <div class="text-subtitle2">storage</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>파일 게시판 </q-card-section>
  </q-card>

  <q-separator class="q-mt-md q-mb-xs" />

  <div class="q-pa-md">
    <div class="row no-wrap">
      <!-- <q-space /> -->
      <q-file
        v-model="attachFiles"
        dense
        outlined
        use-chips
        multiple
        clearable
        counter
        class="col"
        max-files="5"
        :max-total-size="FILE_TOTAL_SIZE"
        label="파일 첨부 최대 5개 / 5MB 미만"
        style="max-width: 400px"
      >
        <template #after v-if="isUpload">
          <q-btn
            color="primary"
            dense
            icon="cloud_upload"
            round
            @click="fileUploadButton"
            :disable="!isUpload"
          />
          <!-- :loading="isUploading" -->
        </template>
      </q-file>
    </div>
    <div class="row q-mt-sm">
      <div class="col">
        <q-table />
      </div>
    </div>
  </div>
</template>
