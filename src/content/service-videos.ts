/** Local clips under `public/sliders` — home trades for the Home Services card. */
export type ServiceSliderVideo = { src: string; label: string };

export const HOME_SERVICES_SLIDER_VIDEOS: readonly ServiceSliderVideo[] = [
  { src: '/sliders/plumbing.mp4', label: 'Plumbing' },
  { src: '/sliders/carpenter.mp4', label: 'Carpentry' },
  { src: '/sliders/painting.mp4', label: 'Painting' },
  { src: '/sliders/electric.mp4', label: 'Electrical' },
  { src: '/sliders/AC.mp4', label: 'AC repair' },
  { src: '/sliders/appliasnce.mp4', label: 'Appliance repair' },
  { src: '/sliders/cleaning.mp4', label: 'Home cleaning' },
  { src: '/sliders/pest.mp4', label: 'Pest control' },
  { src: '/sliders/waterproff.mp4', label: 'Waterproofing' },
];

/** `/services/home-services` hub: one clip per sub-service slug (matches filenames in `public/sliders`). */
export const HOME_SERVICE_SUB_VIDEO: Record<string, string> = {
  plumbing: '/sliders/plumbing.mp4',
  carpentry: '/sliders/carpenter.mp4',
  painting: '/sliders/painting.mp4',
  electrical: '/sliders/electric.mp4',
  'ac-repair': '/sliders/AC.mp4',
  'appliance-repair': '/sliders/appliasnce.mp4',
  'home-cleaning': '/sliders/cleaning.mp4',
  'pest-control': '/sliders/pest.mp4',
  waterproofing: '/sliders/waterproff.mp4',
};

export function homeServiceSubVideoSrc(subSlug: string): string | undefined {
  return HOME_SERVICE_SUB_VIDEO[subSlug];
}
