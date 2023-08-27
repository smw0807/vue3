import type { Firestore, DocumentData } from 'firebase/firestore';

export type FirestoreDocData = (DocumentData & { id: string })[] | [];
