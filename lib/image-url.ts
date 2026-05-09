/** Unsplash CDN (free license: https://unsplash.com/license) */
export function unsplashPhoto(photoSlug: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${photoSlug}?auto=format&fit=crop&q=82&w=${width}`;
}
