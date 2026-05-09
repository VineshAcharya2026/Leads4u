import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { browserLocalPersistence, getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

type FirebaseAppletConfig = FirebaseOptions & {
  /** Only set if using a named Firestore database (not `(default)`). */
  firestoreDatabaseId?: string;
};

const firebaseConfig = rawConfig as FirebaseAppletConfig;
const app = initializeApp(firebaseConfig);

/** Single Auth instance with explicit local persistence (production web). */
function getOrInitAuth() {
  try {
    return initializeAuth(app, { persistence: browserLocalPersistence });
  } catch {
    return getAuth(app);
  }
}

export const auth = getOrInitAuth();

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
