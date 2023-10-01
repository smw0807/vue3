import {
  getStorage,
  ref as storageRef,
  FirebaseStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import type { Ref } from 'vue';

const FILE_DIR_PATH = 'nuxt3-attach/';

const storage = (): FirebaseStorage => {
  const app = useFirebaseApp();
  return getStorage(app);
};

/**
 * 파일 업로드 처리
 * @param files 업로드할 파일들
 * @returns [ { 커스텀파일명 : 파일 다운로드 URL} ]
 */
export const useUploadFile = async (
  files: Ref<File[] | null>,
): Promise<StringKeyValueType[] | null> => {
  if (files.value) {
    const uploadPromises = files.value.map((file) => {
      const fileRef = storageRef(
        storage(),
        // 스토리지에 파일 중복 방지를 위해 시간|| 를 파일명 앞에 붙여줌
        `${FILE_DIR_PATH}/${new Date().getTime()}||${file.name}`,
      );
      return uploadBytesResumable(fileRef, file);
    });
    try {
      const snapshotArray = await Promise.all(uploadPromises);
      const downloadURLs = await Promise.all(
        snapshotArray.map(async (snap) => ({
          [snap.metadata.name.split('||')[1]]: await getDownloadURL(snap.ref),
        })),
      );
      return downloadURLs;
    } catch (err) {
      console.error(err);
      throw new Error('파일 업로드 실패');
    }
  }
  return null;
};
