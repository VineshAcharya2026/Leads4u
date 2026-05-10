import type { HomeServiceDetailConfig } from './types';

export const plumbingDetail: HomeServiceDetailConfig = {
  slug: 'plumbing',
  metaTitle: 'Plumbing Services | Leads4U',
  metaDescription:
    'Book trusted licensed plumbers on Leads4U. Emergency, repairs, installations & more. Upfront pricing, 12-month guarantee. Available 24/7.',
  heroLead: 'Plumbing that shows up ',
  heroItalic: 'on time',
  heroTail: ', fixed right',
  heroSubheading:
    'Burst pipes, hidden leaks, installs, and upgrades — matched to vetted local plumbers who quote upfront and stand behind the work.',
  emergencyTitle: 'Active leak or no water? Don’t wait.',
  emergencyBody:
    'Leads4U routes urgent calls to on-call plumbers in your area — gas-safe where required, with live ETA updates.',
  emergencyWhatsAppPrefill: 'URGENT: I have an active plumbing leak or no water. Please call back ASAP.',
  categorySectionTitle: 'What we cover under Plumbing',
  categoryIntro:
    'Pick the lane that matches your job — each card links to the same booking flow so you’re never bounced around.',
  categories: [
    {
      title: 'Emergency Plumbing',
      description: 'Bursts, shut-offs, and flooding — rapid response to limit damage and restore supply.',
      tags: ['Burst pipes', 'Main valve', 'After-hours'],
      icon: 'flame',
      iconWrap: 'bg-[#B71C1C]',
    },
    {
      title: 'Drain Cleaning',
      description: 'From slow sinks to main-line backups — camera-led diagnosis before we jet or snake.',
      tags: ['Kitchen sink', 'Floor drain', 'Sewer line'],
      icon: 'droplets',
      iconWrap: 'bg-[#1976D2]',
    },
    {
      title: 'Water Heater Services',
      description: 'Repairs, anode checks, and full replacements for storage & instant systems.',
      tags: ['Heating element', 'Thermostat', 'Install'],
      icon: 'bath',
      iconWrap: 'bg-[#00838F]',
    },
    {
      title: 'Bathroom Plumbing',
      description: 'Fixtures, WC suites, mixers, and concealed cisterns fitted to manufacturer spec.',
      tags: ['WC install', 'Mixer repair', 'Siliconing'],
      icon: 'showerHead',
      iconWrap: 'bg-[#6A1B9A]',
    },
    {
      title: 'Pipe Repair & Repiping',
      description: 'Pinhole leaks, corroded GI, and partial or full home repipes with pressure testing.',
      tags: ['CPVC / PEX', 'Concealed', 'Chasing'],
      icon: 'gitBranch',
      iconWrap: 'bg-[#37474F]',
    },
    {
      title: 'Water Quality & Filtration',
      description: 'RO, UV, softeners, and whole-house filters — plumbed in with proper drain & bypass.',
      tags: ['RO service', 'Softener', 'UV lamp'],
      icon: 'filter',
      iconWrap: 'bg-[#2E7D32]',
    },
  ],
  checkGroups: [
    {
      emoji: '🔴',
      title: 'Repairs & Emergency',
      items: [
        { name: 'Leak detection & repair', desc: 'Acoustic & thermal methods to find concealed drips before opening walls.' },
        { name: 'Overflow & tank issues', desc: 'Ballcock, siphon, and inlet repairs for cisterns and overhead tanks.' },
        { name: 'Pressure problems', desc: 'PRV adjustment, airlock clearing, and pump-assisted supply checks.' },
        { name: 'Temporary make-safe', desc: 'Isolate, cap, or bypass so your home stays usable until full fix.' },
      ],
    },
    {
      emoji: '🔵',
      title: 'Installations & Upgrades',
      items: [
        { name: 'Fixture upgrades', desc: 'Washbasins, showers, and kitchen sinks with proper traps & vents.' },
        { name: 'Water heater install', desc: 'Wall-mounted or floor-standing — electrical tie-in coordinated.' },
        { name: 'Dishwasher / WM points', desc: 'Hot & cold taps, standpipe, and non-return where code requires.' },
        { name: 'Outdoor bib taps', desc: 'Frost-safe garden points and irrigation take-offs.' },
      ],
    },
    {
      emoji: '🟢',
      title: 'Drainage & Waste Systems',
      items: [
        { name: 'High-pressure jetting', desc: 'Grease and scale removal in kitchen stacks and lateral lines.' },
        { name: 'Mechanical augering', desc: 'Closet auger & sectional machines for traps and WC passages.' },
        { name: 'Gully & chamber clean', desc: 'Remove silt, reset covers, and test fall after service.' },
        { name: 'CCTV survey', desc: 'Recorded footage & report for insurance or handover packs.' },
      ],
    },
    {
      emoji: '🟠',
      title: 'Pipe Work & Supply Systems',
      items: [
        { name: 'Repiping projects', desc: 'Route planning, chasing, and commissioning with pressure log.' },
        { name: 'Valve replacements', desc: 'Gate, ball, and mixer cartridges — stock carried on van.' },
        { name: 'Copper / PEX / CPVC', desc: 'Material matched to your building age and water chemistry.' },
        { name: 'Pressure testing', desc: 'Hydrostatic hold & documented sign-off before conceal.' },
      ],
    },
  ],
  prices: [
    { title: 'Call-out / inspection', price: '₹499 – ₹899', note: 'Waived or adjusted when you proceed with quoted work same visit.' },
    { title: 'Leaking tap / mixer service', price: '₹349 – ₹1,299', note: 'Cartridge, O-rings, or full replacement — parts extra if needed.', featured: true },
    { title: 'Drain unblocking', price: '₹899 – ₹3,500', note: 'Simple trap clear vs. main-line jetting — quoted before start.' },
    { title: 'WC full install', price: '₹2,500 – ₹5,500', note: 'Labour only; pan & cistern supplied by you or sourced via partner.' },
    { title: 'Water heater install', price: '₹1,800 – ₹4,200', note: 'Wall brackets, PRV, drain line, and electrical coordination.' },
    { title: 'Emergency night rate', price: '1.5× – 2×', note: '22:00–06:00 & holidays — shown clearly in app before accept.' },
  ],
  toolsSectionLead: 'Professional-grade kit — so diagnostics are fast and fixes last.',
  tools: [
    { label: 'CCTV drain camera', icon: 'video' },
    { label: 'High-pressure water jetter', icon: 'droplets' },
    { label: 'Pipe locator', icon: 'radar' },
    { label: 'Thermal leak detector', icon: 'thermometer' },
    { label: 'Pressure test gauge', icon: 'gauge' },
    { label: 'Pipe cutter & crimper', icon: 'scissors' },
    { label: 'Drain auger / snake', icon: 'wrench' },
    { label: 'Moisture meter', icon: 'droplets' },
    { label: 'Pipe freeze kit', icon: 'snowflake' },
    { label: 'Electric drain cleaner', icon: 'bolt' },
  ],
  guaranteeIntro: 'Leads4U backs every plumbing job booked through the platform with clear, written commitments.',
  stepMatchPhrase: 'plumber',
  step4Closing: 'Warranty note + GST bill; rate your visit so we keep standards high.',
  footerTitle: 'Ready to Book a Plumber?',
  footerSubtitle:
    'Join thousands of homeowners who trust Leads4U for hassle-free plumbing. Get a free quote in minutes.',
  primaryCtaLabel: 'Book a Plumber',
  finePrint: 'No credit card · cancel anytime · all plumbers background-verified',
  faqs: [
    {
      q: 'How quickly can a plumber arrive in an emergency?',
      a: 'Metro slots typically 45–90 minutes for true emergencies (active leak / no water). Rural or peak-storm nights may run longer — you’ll see live ETA before you confirm.',
    },
    {
      q: 'Do I need to be home during the job?',
      a: 'Someone 18+ should be present for access, decisions on scope, and sign-off. For common repairs, a building supervisor pass is fine if you authorise it in the booking notes.',
    },
    {
      q: 'Will you supply the parts and materials?',
      a: 'Yes — vans carry standard cartridges, hoses, and fittings. Special finishes or imported WC frames may be ordered — timeline & deposit quoted before order.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'UPI, cards, netbanking, and cash where legally allowed. GST invoice is emailed; milestone payments possible on larger repipes.',
    },
    {
      q: 'How do I know if I have a hidden leak?',
      a: 'Unexplained bill spikes, warm spots on walls, or mildew smell are red flags. We combine meter tests, acoustic listening, and thermal imaging before suggesting opening finishes.',
    },
    {
      q: 'Is the work compliant with local building codes?',
      a: 'Installations follow NBC-relevant practices and manufacturer manuals. Where municipal inspection is required, we document pressure tests & materials for your file.',
    },
  ],
};
