import { collection, query } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';
import type { _RefFirestore } from 'vuefire';

/**
 * 파이어베이스 컬렉션 데이터 가져오기
 * @param collectionName 가져오 컬렉션 이름
 * @param query 쿼리를 이용해 가져올 경우 사용
 */
export const getFirestoreData = (collectionName: string, query?: string) => {
  const db = useFirestore();
  let result: _RefFirestore<DocumentData[]>;
  if (!collectionName) throw 'Need CollectionName.';
  if (!query) {
    result = useCollection(collection(db, collectionName));
  } else {
    result = useCollection(collection(db, collectionName));
  }
  return result;
};
