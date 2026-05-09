import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

type FirebaseAppletConfig = FirebaseOptions & {
  /** Only set if using a named Firestore database (not `(default)`). */
  firestoreDatabaseId?: string;
};

const firebaseConfig = rawConfig as FirebaseAppletConfig;
const app = initializeApp(firebaseConfig);

/**
 * Default browser Auth (via `getAuth`) wires `popupRedirectResolver` correctly.
 * A custom `initializeAuth` without `popupRedirectResolver` breaks `signInWithPopup`
 * with `auth/argument-error`.
 */
export const auth = getAuth(app);

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
