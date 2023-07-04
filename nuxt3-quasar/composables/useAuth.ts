import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';

const getFirebaseApp = (): FirebaseApp => {
  return useFirebaseApp();
};
const getFirebaseAuth = (): Auth => {
  return getAuth(getFirebaseApp());
};
const getProvider = (): GoogleAuthProvider => {
  return new GoogleAuthProvider();
};

export const useGoogleSignIn = async (): Promise<User | null> => {
  let result = null;
  try {
    const signin = await signInWithPopup(getFirebaseAuth(), getProvider());
    result = signin.user;
  } catch (err) {
    console.error(err);
    throw new Error('구글 로그인 실패');
  }
  return result;
};
