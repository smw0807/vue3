<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { DocumentData } from 'firebase/firestore';
import type { QTableColumn } from 'quasar';

const loading: Ref<boolean> = ref(true);
const lists: Ref<{ id: string; data: DocumentData }[] | []> = ref([]);

onMounted(async () => {
  lists.value = await getFirestoreData('test-board');
  loading.value = false;
});

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
</script>
<template>
  <q-card dark bordered class="bg-brown-7 my-card">
    <q-card-section>
      <div class="text-h6">Firebase / Firestore Database</div>
      <div class="text-subtitle2">firestore</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      파이어베이스에서 제공하는 Firestore Database의 데이터를 가져와서 테이블에
      그리는 화면
    </q-card-section>
  </q-card>

  <q-separator class="q-mt-md q-mb-xs" />

  <div class="q-pa-md">
    <q-table
      bordered
      title=""
      :loading="loading"
      :rows="lists"
      :columns="columns"
      no-data-label="No Data."
      row-key="name"
    />
  </div>
</template>
