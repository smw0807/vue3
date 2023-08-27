import type { Firestore, DocumentData } from 'firebase/firestore';

export type FirestoreDocType = (DocumentData & { id: string })[] | [];

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
