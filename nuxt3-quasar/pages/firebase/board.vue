<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useBoardStore } from '~/store/useBoardStore';

const boardStore = useBoardStore();

const lists = computed(() => boardStore.getLists);

// 테이블 관련 변수 및 함수 -----------------------------
const rowData: Ref<RowType> = ref(null);
// 테이블 데이터 컬렉션 이름
const collectionName = 'test-board';
// 테이블 로딩
const tableLoading: Ref<boolean> = ref(true);
// 테이블 컬럼
const columns: QTableColumn[] = [
  {
    name: 'title',
    label: '제목',
    field: 'title',
    align: 'left',
    headerStyle: 'width: 20%',
    sortable: true,
  },
  {
    name: 'wireter',
    label: '작성자',
    field: 'writer',
    align: 'center',
    sortable: true,
  },
  {
    name: 'createdAt',
    label: '작성일',
    field: 'createdAt',
    align: 'center',
    sortable: true,
    format(val, _row) {
      return val.toDate().toLocaleString();
    },
  },
  {
    name: 'viewer',
    label: '조회수',
    field: 'viewer',
    align: 'center',
    sortable: true,
  },
];
// 테이블 데이터 가져오기
const getData = async (): Promise<void> => {
  boardStore.lists = await getFirestoreData(collectionName);
  // boardStore.lists = await getFirestoreData(collectionName, [
  //   { field: 'writer', operator: '==', value: '송민우' },
  // ]);
};
// 테이블 로우 클릭 이벤트
const onRowClick = async (
  _evnet: Event,
  row: RowType,
  _idx: number,
): Promise<void> => {
  if (row) {
    await updateFirebaseData(collectionName, row?.id, {
      viewer: Number(row?.viewer) + 1,
    });
    writeMode.value = 'upd';
    rowData.value = row;
    openWriteDialog();
    await getData();
  }
};
// -----------------------------------------

// 글쓰기 관련 변수 및 함수 ----------------------
// 모드
const writeMode: Ref<string> = ref('ins');
// 글쓰기 버튼 활성화 여부
const isWriteBtn: Ref<boolean> = ref(true);
// 글쓰기 모달 활성화 여부
const showWriteDialog: Ref<boolean> = ref(false);

// 글쓰기 버튼 클릭 이벤트
const writeButtonEvent = (): void => {
  openWriteDialog();
};
// 글쓰기 등록 버튼 클릭 시 입력값 받아서 저장
const saveContent = async (
  v: {
    title: string;
    content: string;
  },
  id?: string,
): Promise<void> => {
  const user = useGetUserAuth();
  if (writeMode.value === 'ins') {
    const params = {
      ...v,
      createdAt: new Date(),
      viewer: 0,
      writer: user?.displayName,
      writerID: user?.email,
    };
    await setFirestoreData(collectionName, params);
  } else if (writeMode.value === 'upd') {
    const params = {
      ...v,
      createdAt: new Date(),
    };
    updateFirebaseData(collectionName, id!, params);
  }
  closeWriteDialog();
  await getData();
};
// 글쓰기 다이얼로그 열기
const openWriteDialog = (): boolean => (showWriteDialog.value = true);
// 글쓰기 다이얼로그 닫기
const closeWriteDialog = (): void => {
  writeMode.value = 'ins';
  rowData.value = null;
  showWriteDialog.value = false;
};
// -----------------------------------------

onMounted(async () => {
  await getData();
  tableLoading.value = false;
  const user = useGetUserAuth();
  if (user) {
    isWriteBtn.value = false;
  }
});
</script>
<template>
  <DialogBoardContent
    :mode="writeMode"
    :is-open="showWriteDialog"
    @submit="saveContent"
    @close="closeWriteDialog"
    :row="rowData"
  />
  <q-card dark bordered class="bg-brown-7 my-card">
    <q-card-section>
      <div class="text-h6">Firebase / Firestore Database</div>
      <div class="text-subtitle2">firestore</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>게시판 </q-card-section>
  </q-card>

  <q-separator class="q-mt-md q-mb-xs" />

  <div class="q-pa-md">
    <div class="row">
      <div class="col item-end text-right">
        <q-space />
        <q-btn
          @click="writeButtonEvent"
          :disable="isWriteBtn"
          tool
          push
          color="primary"
          icon="edit"
          label="글쓰기"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col">
        <q-table
          bordered
          title=""
          @row-click="onRowClick"
          :loading="tableLoading"
          :rows="lists"
          :columns="columns"
          no-data-label="No Data."
          row-key="name"
        />
      </div>
    </div>
  </div>
</template>
<style></style>
