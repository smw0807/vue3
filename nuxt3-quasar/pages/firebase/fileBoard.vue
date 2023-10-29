<script setup lang="ts">
/**
 * 링크
 * clearable : https://quasar.dev/vue-components/file-picker#clearable
 * chips : https://quasar.dev/vue-components/file-picker#using-chips
 */
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useFileBoardStore } from '~/store/useFileBoardStore';

const store = useFileBoardStore();

// confirm 오픈 여부
const confirmOpen: Ref<boolean> = ref(false);
// confirm 제목
const confirmTitle: Ref<string> = ref('파일 업로드');
// confirm 내용
const confirmText: Ref<string> = ref('첨부된 파일들을 등록하시겠습니까?');

// 파일 첨부 관련 -------------------------------
// 첨부 용량 제한값 (5MB)
const FILE_TOTAL_SIZE = 5 * 1048576;

// 파일 업로드 가능 여부
const isUpload = computed(() => store.attachFiles !== null);
// 파일업로드 버튼 클릭
const fileUploadButton = (): void => {
  confirmOpen.value = true;
};
// 첨부파일 클리어
const clearAttachFiles = (): void => {
  store.attachFiles = null;
};
// submit
const submit = async (isOk: boolean): Promise<void> => {
  confirmOpen.value = false;
  if (!isOk) return;

  // 스토리지에 파일 업로드
  const upload = await store.uploadFiles();
  if (!upload) return;

  // 파이어스토어에 데이터 추가
  await store.createDocument(upload);
  // 첨부 파일 초기화
  clearAttachFiles();
  // 리스트 새로 불러오기
  tableLoading.value = true;
  await store.getListData();
  tableLoading.value = false;
};

// 테이블 관련 -----------------------------
// 테이블 로딩
const tableLoading: Ref<boolean> = ref(true);
// 테이블 컬럼
const columns: QTableColumn[] = [
  {
    name: 'fileName',
    label: '파일명',
    field: 'fileName',
    align: 'center',
    headerStyle: 'width: 20%',
    sortable: true,
  },
  {
    name: 'uploader',
    label: '등록자',
    field: 'uploader',
    align: 'center',
    sortable: true,
  },
  {
    name: 'createdAt',
    label: '등록일',
    field: 'createdAt',
    align: 'center',
    sortable: true,
    format(val, _row) {
      return val.toDate().toLocaleString();
    },
  },
  {
    name: 'downloadCount',
    label: '다운로드수',
    field: 'downloadCount',
    align: 'center',
    sortable: true,
  },
  {
    name: 'donwloadURL',
    label: '다운로드',
    field: 'downloadURL',
    align: 'center',
  },
];
// 파일다운로드 버튼
const fileDownloadBtn = (fileName: string, downloadURL: string) => {
  console.log('fileDownloadBtn');
  console.log(fileName);
  console.log(downloadURL);
  useDownloadFileWithURL(fileName, downloadURL);
};

/**
 * todo
 * 1. 파일 첨부되는 동안 로딩
 * 2. 첨부 완료시 alert
 * 3. 파일 리스트 가져오기
 */
onMounted(async () => {
  // 테이블 데이터 가져오기
  await store.getListData();
  tableLoading.value = false;
});
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
        v-model="store.attachFiles"
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
        <q-table
          bordered
          :loading="tableLoading"
          title="등록된 파일 리스트"
          :columns="columns"
          :rows="store.list"
        >
          <template #body="{ row }">
            <tr :props="row" class="text-center">
              <td>{{ row.fileName }}</td>
              <td>{{ row.uploader }}</td>
              <td>{{ row.createdAt.toDate().toLocaleString() }}</td>
              <td>{{ row.downloadCount }}</td>
              <!-- <td>{{ row.downloadURL }}</td> -->
              <td>
                <q-btn
                  icon="download"
                  color="deep-orange"
                  size="sm"
                  round
                  @click="fileDownloadBtn(row.fileName, row.downloadURL)"
                />
              </td>
            </tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
