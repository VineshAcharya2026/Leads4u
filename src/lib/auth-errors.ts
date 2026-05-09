import { firebaseAuthConsoleUrl, firebaseProjectId } from './firebase';

/** Human-facing copy for Firebase Auth failures (often fixed in Firebase Console). */
export function firebaseAuthMessage(error: unknown): string {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
      ? (error as { code: string }).code
      : '';
  const message =
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
      ? (error as { message: string }).message
      : '';

  switch (code) {
    case 'auth/configuration-not-found':
      return `Firebase Authentication is not active for project ${firebaseProjectId}. Open ${firebaseAuthConsoleUrl} click Get started if shown, then Sign-in method: enable Email/Password and Google. Settings → Authorized domains: add your site and localhost.`;
    case 'auth/operation-not-allowed':
      return `Sign-in isn’t enabled for this app yet. In Firebase Console open Authentication → Sign-in method, then enable Email/Password and Google for project ${firebaseProjectId}, save, and try again.`;
    case 'auth/unauthorized-domain':
      return `This domain isn’t allowed for sign-in. In Firebase Console go to Authentication → Settings → Authorized domains and add ${typeof window !== 'undefined' ? window.location.hostname : 'your domain'} (and localhost for dev).`;
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Try again.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Wrong email or password.';
    case 'auth/user-not-found':
      return 'No account found for this email.';
    case 'auth/email-already-in-use':
      return 'That email already has an account. Try signing in.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/argument-error':
      return 'Google sign-in was misconfigured. Refresh the page and try again; if it persists, the app bundle may need updating.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a few minutes and try again.';
    case 'permission-denied':
      return 'Could not save your profile (permission denied). If this persists, contact support.';
    default:
      if (message.toLowerCase().includes('missing or insufficient permissions')) {
        return 'Could not save your profile. Check Firebase sign-in providers and Firestore rules.';
      }
      return message || 'Something went wrong. Try again.';
  }
}

/** Map Firestore + other Firebase client errors onto the same UX copy. */
export function firebaseAppMessage(error: unknown): string {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
      ? (error as { code: string }).code
      : '';

  if (code === 'permission-denied') {
    return 'Permission denied when saving data. Check that you are signed in and Firestore rules allow this action.';
  }
  return firebaseAuthMessage(error);
}
