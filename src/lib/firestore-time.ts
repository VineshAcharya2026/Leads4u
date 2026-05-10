/** Display Firestore Timestamp / serialized form without throwing. */
export function formatFirestoreDate(value: unknown): string {
  if (value == null) return '—';
  if (typeof value === 'object' && typeof (value as { toDate?: () => Date }).toDate === 'function') {
    try {
      return (value as { toDate: () => Date }).toDate().toLocaleDateString();
    } catch {
      /* fall through */
    }
  }
  if (typeof value === 'object' && value !== null && 'seconds' in value) {
    const sec = (value as { seconds: number }).seconds;
    if (typeof sec === 'number') return new Date(sec * 1000).toLocaleDateString();
  }
  return '—';
}
