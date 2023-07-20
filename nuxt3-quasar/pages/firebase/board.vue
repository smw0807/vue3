<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { DocumentData } from 'firebase/firestore';
import type { QTableColumn } from 'quasar';

/**
 * todo
 * Store에서 저장하고 가져오는 방식으로 할지 고민해보기.
 * 페이지 다시 돌아올 때마다 데이터 다시 불러옴
 * 글쓰기 버튼은 로그인 여부 체크해서 활성화 시키게 변경
 */
interface ITableData {
  id: string;
  data: DocumentData;
}
const lists: Ref<ITableData[] | []> = ref([]);

// 테이블 관련 변수 및 함수 -----------------------------
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
    format(_val, row) {
      return row.data.title;
    },
  },
  {
    name: 'wireter',
    label: '작성자',
    field: 'data.writer',
    align: 'center',
    format(_val, row) {
      return row.data.writer;
    },
  },
  {
    name: 'createdAt',
    label: '작성일',
    field: 'data.createdAt',
    align: 'center',
    format(_val, row) {
      const date = row.data.createdAt.toDate();
      return date.toLocaleString();
    },
  },
  {
    name: 'viewer',
    label: '조회수',
    field: 'data.viewer',
    align: 'center',
    format(_val, row) {
      return row.data.viewer;
    },
  },
];
// 테이블 데이터 가져오기
const getData = async (): Promise<void> => {
  lists.value = await getFirestoreData(collectionName);
};
// -----------------------------------------

// 글쓰기 관련 변수 및 함수 ----------------------
// 글쓰기 모달 활성화 여부
const showWriteDialog: Ref<boolean> = ref(false);

// 글쓰기 버튼 클릭 이벤트
const writeButtonEvent = (): void => {
  openWriteDialog();
};
// 글쓰기 등록 버튼 클릭 시 입력값 받아서 저장
const saveContent = async (v: {
  title: string;
  content: string;
}): Promise<void> => {
  const user = useGetUserAuth();
  const data = {
    ...v,
    createdAt: new Date(),
    viewer: 0,
    writer: user?.displayName,
    writerID: user?.email,
  };
  await setFirestoreData(collectionName, data);
  closeWriteDialog();
  await getData();
};
// 글쓰기 다이얼로그 열기
const openWriteDialog = (): boolean => (showWriteDialog.value = true);
// 글쓰기 다이얼로그 닫기
const closeWriteDialog = (): boolean => (showWriteDialog.value = false);
// -----------------------------------------

onMounted(async () => {
  await getData();
  tableLoading.value = false;
});
</script>
<template>
  <DialogBoardContent
    :is-open="showWriteDialog"
    @submit="saveContent"
    @close="showWriteDialog = false"
    title="test"
    content="asadfasfasdf"
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
