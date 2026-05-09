import type { UserProfile, UserRole } from '../types';

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
