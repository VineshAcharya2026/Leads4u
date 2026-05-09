import type { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export type UserRole = 'customer' | 'provider';

/**
 * Shape must satisfy `firestore.rules` `users` create: `role` in customer|provider, `uid` == doc id.
 */
export function buildUserDocumentFromAuthUser(user: User, role: UserRole = 'customer') {
  return {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    role,
    createdAt: new Date().toISOString(),
  };
}

/** Create `users/{uid}` if missing (first Google / email sign-in edge cases). */
export async function ensureCustomerUserDocument(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) return;

  await setDoc(userRef, buildUserDocumentFromAuthUser(user, 'customer'));
}
