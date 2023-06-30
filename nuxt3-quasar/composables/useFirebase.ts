import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';

export const useFirebaseApp = (): FirebaseApp => {
  const config = useRuntimeConfig();
  let app: FirebaseApp;
  if (!getApps().length) {
    app = initializeApp({
      apiKey: config.public.FB_API_KEY,
      appId: config.public.FB_APP_ID,
      authDomain: config.public.FB_AUTH_DOMAIN,
      databaseURL: config.public.FB_DATABASE_URL,
      measurementId: config.public.FB_MEASUREMENT_ID,
      messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
      projectId: config.public.FB_PROJECT_ID,
      storageBucket: config.public.FB_STORAGE_BUCKET,
    });
  } else {
    app = getApps()[0];
  }
  return app;
};
