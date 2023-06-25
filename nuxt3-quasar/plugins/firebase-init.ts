import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  const {
    firebase_apiKey,
    firebase_authDomain,
    firebase_projectId,
    firebase_databaseURL,
    firebase_storageBucket,
    firebase_messagingSenderId,
    firebase_appId,
    firebase_measurementId,
  } = config.public;

  const firebaseConfig: FirebaseOptions = {
    apiKey: firebase_apiKey,
    authDomain: firebase_authDomain,
    projectId: firebase_projectId,
    databaseURL: firebase_databaseURL,
    storageBucket: firebase_storageBucket,
    messagingSenderId: firebase_messagingSenderId,
    appId: firebase_appId,
    measurementId: firebase_measurementId,
  };

  //파이어베이스 초기화
  const app: FirebaseApp = initializeApp(firebaseConfig);
  //파이어스토어
  const fireStore: Firestore = getFirestore(app);

  nuxtApp.provide('firestore', fireStore);
});
