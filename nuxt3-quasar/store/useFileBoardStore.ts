import { defineStore } from 'pinia';
import type { FirestoreDocType } from '../types/firebase';

export const useFileBoardStore = defineStore('fileBoard', {
  state: () => ({
    collectionName: 'test-file',
    list: [] as FirestoreDocType,
  }),
  getters: {
    getList(): FirestoreDocType {
      return this.list;
    },
  },
  actions: {
    // 리스트 가져오기
    async getListData() {
      this.list = await getFirestoreData(this.collectionName);
    },
    // 파일 업로드하기
  },
});
