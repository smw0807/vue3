import { defineStore } from 'pinia';
import type { FirestoreDocType } from '../types/firebase';

export const useBoardStore = defineStore('board', {
  state: () => ({
    lists: [] as FirestoreDocType,
  }),
  getters: {
    getLists(): FirestoreDocType {
      return this.lists;
    },
  },
  actions: {},
});
