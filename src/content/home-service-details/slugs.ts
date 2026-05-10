/** Slugs only — safe to import from the main bundle without pulling all trade copy. */
export const HOME_SERVICE_DETAIL_SLUGS = [
  'plumbing',
  'carpentry',
  'painting',
  'electrical',
  'ac-repair',
  'appliance-repair',
  'home-cleaning',
  'pest-control',
  'waterproofing',
] as const;

export type HomeServiceDetailSlug = (typeof HOME_SERVICE_DETAIL_SLUGS)[number];

const SLUG_SET = new Set<string>(HOME_SERVICE_DETAIL_SLUGS);

export function isHomeServiceDetailSlug(slug: string): slug is HomeServiceDetailSlug {
  return SLUG_SET.has(slug);
}
