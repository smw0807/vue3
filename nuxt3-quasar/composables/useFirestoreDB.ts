import { getFirestore, collection, getDocs } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

/**
 * 파이어베이스 컬렉션 데이터 가져오기
 * @param collectionName 가져오 컬렉션 이름
 * @param query 쿼리를 이용해 가져올 경우 사용
 */
export const getFirestoreData = async (
  collectionName: string
  // params?: where | where[]
): Promise<{ id: string; data: DocumentData }[] | []> => {
  let result: { id: string; data: DocumentData }[] = [];
  try {
    const app = useFirebaseApp();
    const db = getFirestore(app);
    if (!collectionName) throw 'Need CollectionName.';

    const querySnapshot = await getDocs(collection(db, collectionName));
    if (!querySnapshot.empty) {
      result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
    }
  } catch (err) {
    console.error(err);
    throw new Error('데이터 가져오기 실패');
  }
  return result;
};
