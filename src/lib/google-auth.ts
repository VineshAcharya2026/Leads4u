import type { Auth, User } from 'firebase/auth';
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { ensureCustomerUserDocument } from './user-firestore';

/** Fresh provider each sign-in avoids stale OAuth state across attempts. */
function createGoogleAuthProvider(): GoogleAuthProvider {
  const p = new GoogleAuthProvider();
  p.setCustomParameters({ prompt: 'select_account' });
  return p;
}

export async function signInWithGoogle(authInstance: Auth): Promise<User> {
  try {
    const { user } = await signInWithPopup(authInstance, createGoogleAuthProvider());
    await ensureCustomerUserDocument(user);
    return user;
  } catch (err: unknown) {
    const code = typeof err === 'object' && err !== null && 'code' in err ? String((err as { code: string }).code) : '';

    if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
      await signInWithRedirect(authInstance, createGoogleAuthProvider());
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

export async function completeGoogleRedirectIfAny(authInstance: Auth): Promise<User | null> {
  const result = await getRedirectResult(authInstance);
  const user = result?.user ?? null;
  if (user) {
    await ensureCustomerUserDocument(user);
  }
  return user;
}
