/** Lucide icon keys resolved in `HomeServiceDetailView`. */
export type ServiceIconName =
  | 'flame'
  | 'droplets'
  | 'bath'
  | 'showerHead'
  | 'gitBranch'
  | 'filter'
  | 'hammer'
  | 'ruler'
  | 'doorOpen'
  | 'layers'
  | 'treePine'
  | 'paintRoller'
  | 'paintbrush'
  | 'spray'
  | 'zap'
  | 'lightbulb'
  | 'plug'
  | 'wind'
  | 'refrigerator'
  | 'sparkles'
  | 'house'
  | 'bug'
  | 'sprayCan'
  | 'shield'
  | 'video'
  | 'radar'
  | 'thermometer'
  | 'gauge'
  | 'scissors'
  | 'wrench'
  | 'snowflake'
  | 'bolt';

export type CategoryCardCfg = {
  title: string;
  description: string;
  tags: [string, string, string];
  icon: ServiceIconName;
  iconWrap: string;
};

export type CheckItem = { name: string; desc: string };
export type CheckGroupCfg = { emoji: string; title: string; items: CheckItem[] };

export type PriceCardCfg = { title: string; price: string; note: string; featured?: boolean };

export type ToolCfg = { label: string; icon: ServiceIconName };

export type FaqCfg = { q: string; a: string };

export type HomeServiceDetailConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** H1: `{lead}{italic}{tail}` */
  heroLead: string;
  heroItalic: string;
  heroTail: string;
  heroSubheading: string;
  emergencyTitle: string;
  emergencyBody: string;
  emergencyWhatsAppPrefill: string;
  categorySectionTitle: string;
  categoryIntro: string;
  categories: CategoryCardCfg[];
  checkGroups: CheckGroupCfg[];
  prices: PriceCardCfg[];
  toolsSectionLead: string;
  tools: ToolCfg[];
  guaranteeIntro: string;
  /** Step 2 uses this phrase: "A verified {stepMatchPhrase} accepts…" */
  stepMatchPhrase: string;
  /** Step 4 closing line */
  step4Closing: string;
  footerTitle: string;
  footerSubtitle: string;
  primaryCtaLabel: string;
  finePrint: string;
  faqs: FaqCfg[];
};
