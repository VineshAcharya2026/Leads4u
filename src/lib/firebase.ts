import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

type FirebaseAppletConfig = FirebaseOptions & {
  /** Only set if using a named Firestore database (not `(default)`). */
  firestoreDatabaseId?: string;
};

const firebaseConfig = rawConfig as FirebaseAppletConfig;

const requiredClientKeys: (keyof FirebaseOptions)[] = ['apiKey', 'authDomain', 'projectId', 'appId'];
for (const key of requiredClientKeys) {
  const value = firebaseConfig[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(
      `Invalid Firebase client config: "${key}" is missing or empty. Update firebase-applet-config.json (see Firebase Console → Project settings → Your apps).`,
    );
  }
}

export const firebaseProjectId = firebaseConfig.projectId;

/** Direct link to enable Authentication (fixes `auth/configuration-not-found`). */
export const firebaseAuthConsoleUrl = `https://console.firebase.google.com/project/${firebaseProjectId}/authentication`;

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
