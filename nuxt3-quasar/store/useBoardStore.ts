import { defineStore } from 'pinia';
import type { FirestoreDocType } from '../types/firebase';

export const useBoardStore = defineStore('board', {
  state: () => ({
    collectionName: 'test-board',
    lists: [] as FirestoreDocType,
  }),
  getters: {
    getLists(): FirestoreDocType {
      return this.lists;
    },
  },
  actions: {
    // 리스트 가져오기
    async getListData(searchQuery?: {
      field: string;
      keyword: string;
    }): Promise<void> {
      if (searchQuery) {
        this.lists = await getFirestoreData(this.collectionName, [
          {
            field: searchQuery.field,
            operator: '==',
            value: searchQuery.keyword,
          },
        ]);
      } else {
        this.lists = await getFirestoreData(this.collectionName);
      }
    },
    // 조회수 올리기
    async incrementVirew(row: RowType): Promise<void> {
      if (row) {
        await updateFirebaseData(this.collectionName, row?.id, {
          viewer: Number(row?.viewer) + 1,
        });
      }
    },
    // 글 등록
    async insertContent(params: BoardInsUpdType): Promise<void> {
      const user = useGetUserAuth();
      await setFirestoreData(this.collectionName, {
        ...params,
        createdAt: new Date(),
        viewer: 0,
        writer: user?.displayName,
        writerID: user?.email,
      });
    },
    // 글 수정
    async updateContent(id: string, params: BoardInsUpdType): Promise<void> {
      await updateFirebaseData(this.collectionName, id, {
        ...params,
        createdAt: new Date(),
      });
    },
    // 글 삭제
    async deleteContent(id: string): Promise<void> {
      await deleteFirebaseData(this.collectionName, id);
    },
  },
});
