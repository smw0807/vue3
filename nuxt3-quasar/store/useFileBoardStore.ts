import { defineStore } from 'pinia';
import type { FirestoreDocType } from '../types/firebase';

export const useFileBoardStore = defineStore('fileBoard', {
  state: () => ({
    collectionName: 'test-file',
    attachFiles: null as File[] | null,
    list: [] as FirestoreDocType,
  }),
  getters: {
    getList(): FirestoreDocType {
      return this.list;
    },
  },
  actions: {
    // 리스트 가져오기
    async getListData(): Promise<void> {
      this.list = await getFirestoreData(this.collectionName);
    },
    // 파일 업로드하기
    async uploadFiles(): Promise<StringKeyValueType[] | null> {
      return await useUploadFile(this.attachFiles);
    },
    // 업로드 파일 정보 컬렉션에 등록하기
    async createDocument(urls: StringKeyValueType[]): Promise<void> {
      // 첨부되 파일이 없으면
      if (!this.attachFiles) return;

      const user = useGetUserAuth();
      // 로그인한 유저 정보가 없으면
      if (!user) throw new Error('로그인해주시기 바랍니다.');

      const params: FileUploadType[] = [];
      for (const file of this.attachFiles) {
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
          createdAt: new Date(),
        });
      }
      const upload = params.map((v) =>
        setFirestoreData(this.collectionName, v),
      );
      try {
        // 데이터들 등록
        await Promise.all(upload);
      } catch (err) {
        console.error(err);
      }
    },
    // 파일 다운로드
    async downloadFile(
      id: string,
      fileName: string,
      downloadURL: string,
    ): Promise<void> {
      console.log(' id : ', id);
      // 파일 다운로드
      useDownloadFileWithURL(fileName, downloadURL);
      // 파일 다운로드 수 +1
      // const row = await getFirestoreDoc(this.collectionName, id);
      // console.log(row);
      // if (row) {
      //   await updateFirebaseData(this.collectionName, id, {
      //     ...row,
      //     downloadCount: row.downloadCount,
      //   });
      //   await this.getListData();
      // }
    },
  },
});
