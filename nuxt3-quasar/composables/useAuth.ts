import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';

const app = useFirebaseApp();
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

export const useGoogleSignIn = async (): Promise<User | null> => {
  let result = null;
  try {
    const signin = await signInWithPopup(auth, provider);
    result = signin.user;
  } catch (err) {
    console.error(err);
    throw new Error('구글 로그인 실패');
  }
  return result;
};
