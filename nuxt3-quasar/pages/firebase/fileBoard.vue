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
  confirmOpen.value = true;
};
// 첨부파일 클리어
const clearAttachFiles = (): void => {
  attachFiles.value = null;
};
// Storage에 파일 업로드 처리
const uploadFiles = async (): Promise<StringKeyValueType[] | null> => {
  // todo 파일 업로드
  return await useUploadFile(attachFiles);
};

// Firestore에 컬렉션 등록
const createDocument = async (urls: StringKeyValueType[]): Promise<void> => {
  // 첨부되 파일이 없으면
  if (!attachFiles.value) return;

  const user = useGetUserAuth();
  // 로그인한 유저 정보가 없으면
  if (!user) throw new Error('로그인해주시기 바랍니다.');

  const params: FileUploadType[] = [];
  for (const file of attachFiles.value) {
    // urls에서 첨부파일명과 매칭되는 객체 찾기
    const url = urls.find((v) => v[file.name]);
    params.push({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      downloadURL: url ? url[file.name] : '',
      uploader: user.displayName!,
      uploaderID: user.email!,
      downloadCount: 0,
    });
  }
  const upload = params.map((v) => setFirestoreData(collectionName, v));
  try {
    // 데이터들 등록
    await Promise.all(upload);
  } catch (err) {
    console.error(err);
  }
};

// submit
const submit = async (isOk: boolean): Promise<void> => {
  confirmOpen.value = false;
  if (!isOk) return;

  // 스토리지에 파일 업로드
  const upload = await uploadFiles();
  if (!upload) return;

  // 파이어스토어에 데이터 추가
  await createDocument(upload);
  // 첨부 파일 초기화
  clearAttachFiles();
};

/**
 * todo
 * 1. 파일 첨부되는 동안 로딩
 * 2. 첨부 완료시 alert
 * 3. 파일 리스트 가져오기
 */
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
