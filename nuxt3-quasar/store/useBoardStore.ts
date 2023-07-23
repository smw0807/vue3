import { defineStore } from 'pinia';
import type { DocumentData } from 'firebase/firestore';

type ListType = (DocumentData & { id: string })[] | [];

export const useBoardStore = defineStore('board', {
  state: () => ({
    lists: [] as ListType,
  }),
  getters: {
    getLists(): ListType {
      return this.lists;
    },
  },
  actions: {},
});
