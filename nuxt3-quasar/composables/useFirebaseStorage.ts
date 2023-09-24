import {
  getStorage,
  ref as storageRef,
  FirebaseStorage,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import type { Ref } from 'vue';

const FILE_DIR_PATH = 'nuxt3-attach/';

const storage = (): FirebaseStorage => {
  const app = useFirebaseApp();
  return getStorage(app);
};

// 파이어베이스 스토리지에 파일 업로드
export const useUploadFile = async (files: Ref<File[] | null>) => {
  console.log('composibale useUploadFile : ', files.value);

  // todo 파일명 중복피할 방법으로 어떤 형시으로 스토리지에 올릴지 고민해보기.
  if (files.value) {
    const uploadPromises = files.value.map((file) => {
      const fileRef = storageRef(
        storage(),
        `${FILE_DIR_PATH}/${file.lastModified}${file.name}`,
      );
      return uploadBytesResumable(fileRef, file);
    });
    try {
      const snapshotArray = await Promise.all(uploadPromises);
      const downloadURLs = await Promise.all(
        snapshotArray.map((snap) => getDownloadURL(snap.ref)),
      );
      console.log('Download URLs:', downloadURLs);
    } catch (err) {
      console.error(err);
      throw new Error('파일 업로드 실패');
    }
  }
};
