import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
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
/**
 * 파이어베이스 구글 로그인
 * @returns User | null
 */
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

/**
 * 파이어베이스 구글 로그인 사용자 정보 가져오기
 * @returns User | null
 */
export const useGetUserAuth = (): User | null => {
  let result = null;
  try {
    const auth = getFirebaseAuth();
    if (auth) {
      result = auth.currentUser;
    }
  } catch (err) {
    console.error(err);
    throw new Error('유저정보 가져오기 실패');
  }
  return result;
};

/**
 * 현재 로그인한 사용자 가져오기.
 * 현재 사용자를 가져올 때 권장하는 방법(공식문서).
 * Auth 객체에 관찰자 설정.
 * https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0
 * @returns User | null
 */
const getNowUserAuth = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(getFirebaseAuth(), (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 현재 로그인한 사용자 정보
 * @returns User | null
 */
export const useGetNowUserAuth = async (): Promise<User | null> => {
  let result = null;
  try {
    result = await getNowUserAuth();
  } catch (err) {
    console.error(err);
    throw new Error('현재 사용자 정보 가져오기 실패');
  }
  return result;
};

/**
 * 파이어베이스 구글 로그아웃
 */
export const useGoogleSignOut = (): void => {
  try {
    signOut(getFirebaseAuth());
  } catch (err) {
    console.error(err);
    throw new Error('로그아웃 실패');
  }
};
