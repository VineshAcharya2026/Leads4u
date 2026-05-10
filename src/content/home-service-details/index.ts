import { plumbingDetail } from './plumbing';
import {
  acRepairDetail,
  applianceRepairDetail,
  carpentryDetail,
  electricalDetail,
  homeCleaningDetail,
  paintingDetail,
  pestControlDetail,
  waterproofingDetail,
} from './trades';
import type { HomeServiceDetailConfig } from './types';
import type { HomeServiceDetailSlug } from './slugs';

export type { HomeServiceDetailConfig } from './types';
export { plumbingDetail } from './plumbing';
export { HOME_SERVICE_DETAIL_SLUGS, isHomeServiceDetailSlug, type HomeServiceDetailSlug } from './slugs';

export const homeServiceDetailBySlug: Record<HomeServiceDetailSlug, HomeServiceDetailConfig> = {
  plumbing: plumbingDetail,
  carpentry: carpentryDetail,
  painting: paintingDetail,
  electrical: electricalDetail,
  'ac-repair': acRepairDetail,
  'appliance-repair': applianceRepairDetail,
  'home-cleaning': homeCleaningDetail,
  'pest-control': pestControlDetail,
  waterproofing: waterproofingDetail,
};

export function getHomeServiceDetail(slug: string): HomeServiceDetailConfig | undefined {
  return homeServiceDetailBySlug[slug as HomeServiceDetailSlug];
}
