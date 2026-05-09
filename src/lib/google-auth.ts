import type { Auth, User } from 'firebase/auth';
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');

/**
 * Create Firestore `users/{uid}` on first Google sign-in (matches firestore.rules create requirements).
 */
export async function syncUserDocumentFromFirebaseUser(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) return;

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    role: 'customer',
    createdAt: new Date().toISOString(),
  });
}

export async function signInWithGoogle(auth: Auth): Promise<User> {
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    await syncUserDocumentFromFirebaseUser(user);
    return user;
  } catch (err: unknown) {
    const code = typeof err === 'object' && err !== null && 'code' in err ? String((err as { code: string }).code) : '';

    // Popup blocked, COEP/COOP, or mobile browsers sometimes require redirect.
    if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
      await signInWithRedirect(auth, googleAuthProvider);
      throw new RedirectPendingError();
    }
    throw err;
  }
}

/** Thrown after `signInWithRedirect`; completion is handled by `completeGoogleRedirectIfAny`. */
export class RedirectPendingError extends Error {
  constructor() {
    super('Redirecting to Google…');
    this.name = 'RedirectPendingError';
  }
}

export async function completeGoogleRedirectIfAny(auth: Auth): Promise<User | null> {
  const result = await getRedirectResult(auth);
  const user = result?.user ?? null;
  if (user) {
    await syncUserDocumentFromFirebaseUser(user);
  }
  return user;
}
