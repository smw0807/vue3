import type { Firestore, DocumentData } from 'firebase/firestore';

// 파이어베이스 데이터 리스트 타입용
export type FirestoreDocType = (DocumentData & { id: string })[] | [];

// 파이어베이스 검색조건 타입용
export type FirestoreWhereType = {
  field: string;
  operator:
    | '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | 'array-contains'
    | 'in'
    | 'array-contains-any';
  value: any;
};
