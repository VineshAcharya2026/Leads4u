import { unsplashPhoto } from '@/lib/image-url';

/** Homepage “How it works” — curated Unsplash imagery */
export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Post a Request',
    desc: 'Tell us what you need and where. It only takes 2 minutes.',
    step: '01',
    image: unsplashPhoto('1573164713714-d95e436ab8d6'),
  },
  {
    title: 'Get Matched',
    desc: 'We match your request with up to 3 highly-rated verified pros.',
    step: '02',
    image: unsplashPhoto('1529156069898-49953e39b3ac'),
  },
  {
    title: 'Hire the Best',
    desc: 'Review profiles, talk to pros, and hire the one you like.',
    step: '03',
    image: unsplashPhoto('1600880292203-757bb6b8744e'),
  },
] as const;
