import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import type { Firestore, DocumentData, Query } from 'firebase/firestore';
import { FirestoreDocType, FirestoreWhereType } from '../types/firebase';

const db = (): Firestore => {
  const app = useFirebaseApp();
  return getFirestore(app);
};

/**
 * 파이어베이스 컬렉션 데이터 가져오기
 * @param collectionName 컬렉션 이름 (가져오 컬렉션 이름)
 * @param searchQuery 검새조건 (쿼리를 이용해 가져올 경우 사용)
 */
export const getFirestoreData = async (
  collectionName: string,
  searchQuery?: FirestoreWhereType[],
): Promise<FirestoreDocType> => {
  let result: FirestoreDocType = [];
  try {
    if (!collectionName) throw new Error('Need CollectionName.');
    let search: Query = collection(db(), collectionName);
    // 검색조건이 있을 경우
    if (searchQuery && searchQuery.length) {
      searchQuery.forEach((condition) => {
        search = query(
          search,
          where(condition.field, condition.operator, condition.value),
        );
      });
    }
    const querySnapshot = await getDocs(search);
    if (!querySnapshot.empty) {
      result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  } catch (err) {
    console.error(err);
    throw new Error('데이터 가져오기 실패');
  }
  return result;
};

/**
 * 파이어베이스 컬렉션에 데이터 넣기
 * @param collectionName 데이터를 넣을 컬렉션이름
 * @param params 데이터 정보
 * @param id 데이터에 아이디를 지정하고 싶을 경우
 * 컬렉션마다 필드 구조가 다를거고, 데이터를 넣는데 공통으로 사용하기 위해서 params는 제네릭으로 지정함.
 */
export const setFirestoreData = async <T extends DocumentData>(
  collectionName: string,
  params: T,
  id?: string,
): Promise<void> => {
  try {
    if (id) {
      await setDoc(doc(db(), collectionName, id), params);
    } else {
      await addDoc(collection(db(), collectionName), params);
    }
  } catch (err) {
    console.error(err);
    throw new Error('데이터 추가 실패');
  }
};

/**
 * 파이어베이스 컬렉션 데이터 수정
 * @param collectionName 데이터 수정할 컬렉션이름
 * @param id 데이터 아이디
 * @param params 수정할 필드
 */
export const updateFirebaseData = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  params: T,
): Promise<boolean> => {
  let result = false;
  try {
    await updateDoc(doc(db(), collectionName, id), params);
    result = true;
  } catch (err) {
    console.error(err);
    throw new Error('데이터 수정 실패');
  }
  return result;
};

/**
 * 파이어베이스 컬렉션 데이터 삭제
 * @param collectionName 데이터 삭제할 컬렉션이름
 * @param id 삭제할 도큐먼트 아이디
 * @returns
 */
export const deleteFirebaseData = async (
  collectionName: string,
  id: string,
): Promise<boolean> => {
  let result = false;
  try {
    const del = await deleteDoc(doc(db(), collectionName, id));
    console.log('delete result :', del);
    result = true;
  } catch (err) {
    console.error(err);
    throw new Error('데이터 삭제 실패');
  }
  return result;
};
