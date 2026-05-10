import type { UserProfile, UserRole } from '../types';
import { isMasterAdminEmail } from './master-admin';

const POST_LOGIN_NEXT_KEY = 'leads4uPostAuthNext';

function isSafeInternalPath(pathOnly: string): boolean {
  if (!pathOnly.startsWith('/') || pathOnly.startsWith('//')) return false;
  if (pathOnly.includes('..')) return false;
  if (/[\s\\]/.test(pathOnly)) return false;
  if (pathOnly.includes('@')) return false;
  return true;
}

/** Call when `/auth` loads with `?next=` so Google redirect retains the intended path. */
export function rememberPostLoginPathFromSearchParam(nextParam: string | null): void {
  if (!nextParam) return;
  const pathOnly = nextParam.split('?')[0] ?? '';
  if (!isSafeInternalPath(pathOnly)) return;
  try {
    sessionStorage.setItem(POST_LOGIN_NEXT_KEY, pathOnly);
  } catch {
    /* private mode */
  }
}

/**
 * Honors a stashed internal `next` path after sign-in; clears stash.
 * `/admin*` only allowed for admin profile or master email (pre-promotion bootstrap).
 */
export function resolvePostLoginPath(
  profile: Pick<UserProfile, 'role' | 'needsProfileSetup'> | null,
  firebaseEmail: string | null | undefined,
): string {
  try {
    const raw = sessionStorage.getItem(POST_LOGIN_NEXT_KEY);
    if (raw) sessionStorage.removeItem(POST_LOGIN_NEXT_KEY);

    const pathOnly = (raw ?? '').split('?')[0] ?? '';
    if (!raw || !isSafeInternalPath(pathOnly)) {
      return postAuthDestination(profile);
    }

    if (pathOnly === '/admin' || pathOnly.startsWith('/admin/')) {
      if (profile?.role === 'admin' || isMasterAdminEmail(firebaseEmail)) {
        return pathOnly;
      }
      return postAuthDestination(profile);
    }

    return pathOnly;
  } catch {
    return postAuthDestination(profile);
  }
}

export function pathForUserRole(role: UserRole | undefined | null): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'provider':
      return '/provider';
    case 'customer':
      return '/dashboard';
    default:
      return '/';
  }
}

/**
 * After sign-in or registration: send incomplete profiles to the editor first,
 * otherwise to the role dashboard.
 */
export function postAuthDestination(profile: Pick<UserProfile, 'role' | 'needsProfileSetup'> | null): string {
  if (!profile?.role) return '/';
  if (profile.role === 'admin') return '/admin';
  if (profile.needsProfileSetup === true) {
    if (profile.role === 'customer') return '/dashboard/profile';
    if (profile.role === 'provider') return '/provider/profile';
  }
  return pathForUserRole(profile.role);
}

/** Main profile editor: customer / provider pages; admin or unknown → settings. */
export function profileEditorPath(profile: UserProfile | null | undefined): string {
  if (!profile?.role) return '/settings';
  if (profile.role === 'admin') return '/settings';
  if (profile.role === 'customer') return '/dashboard/profile';
  if (profile.role === 'provider') return '/provider/profile';
  return '/settings';
}
