/** Master operations account — promoted to `admin` after sign-in (see AuthContext). */
export const MASTER_ADMIN_EMAIL = 'vineshjm@gmail.com';

export function isMasterAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
}
