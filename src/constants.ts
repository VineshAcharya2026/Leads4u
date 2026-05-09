import type { LucideIcon } from 'lucide-react';
import { Home, Car, Scissors, GraduationCap, Briefcase, Truck, Dog } from 'lucide-react';
import { carouselForCategory, subImagesForSlug } from './content/service-media';

export const WHATSAPP_NUMBER = '919686796232';

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type ServiceSubcategory = {
  name: string;
  slug: string;
  summary: string;
  description: string;
  images: string[];
};

export type ServiceCategory = {
  name: string;
  slug: string;
  icon: LucideIcon;
  images: string[];
  subcategories: ServiceSubcategory[];
};

function sub(
  name: string,
  slug: string,
  summary: string,
  description: string
): ServiceSubcategory {
  const pair = subImagesForSlug(slug);
  return { name, slug, summary, description, images: [...pair] };
}

export const CATEGORIES: ServiceCategory[] = [
  {
    name: 'Home Services',
    slug: 'home-services',
    icon: Home,
    images: [...carouselForCategory('home-services')],
    subcategories: [
      sub(
        'Plumbing',
        'plumbing',
        'Leak fixes, pipe work, and bathroom fittings.',
        'Professional plumbing support for leakage repair, pipe replacement, water pressure issues, bathroom and kitchen fitting installation, and preventive maintenance for homes and offices.'
      ),
      sub(
        'Carpentry',
        'carpentry',
        'Custom woodwork, repairs, and fittings.',
        'Skilled carpenters for modular furniture work, door and window repairs, wardrobe setup, and interior wood finishing with clean execution and durable materials.'
      ),
      sub(
        'Painting',
        'painting',
        'Interior and exterior painting with neat finish.',
        'End-to-end painting services for homes, offices, and shops including wall prep, putty, color consultation, and final coating with minimal disruption to your space.'
      ),
      sub(
        'Electrical',
        'electrical',
        'Safe electrical installations and repairs.',
        'Certified electricians for wiring, switchboard upgrades, fan and light installation, fault diagnosis, and electrical safety checks for residential and commercial properties.'
      ),
      sub(
        'AC Repair',
        'ac-repair',
        'Cooling issue diagnosis and AC servicing.',
        'Complete AC service including gas refill checks, cooling performance tuning, deep cleaning, and repair of split/window units to improve efficiency and comfort.'
      ),
      sub(
        'Appliance Repair',
        'appliance-repair',
        'Repairs for major home appliances.',
        'Experienced technicians for washing machines, refrigerators, microwaves, geysers, and other home appliances with fault detection and reliable part replacement support.'
      ),
      sub(
        'Home Cleaning',
        'home-cleaning',
        'Deep and regular cleaning for all rooms.',
        'Comprehensive home cleaning including kitchen degreasing, bathroom sanitization, dust removal, and floor treatment using safe supplies and trained professionals.'
      ),
      sub(
        'Pest Control',
        'pest-control',
        'Targeted treatment for common pests.',
        'Effective pest management for cockroaches, termites, rodents, and mosquitoes using scheduled treatment plans designed for long-term prevention and safety.'
      ),
      sub(
        'Waterproofing',
        'waterproofing',
        'Terrace and wall seepage solutions.',
        'Waterproofing experts for terrace leakage, damp walls, basement seepage, and bathroom leakage using proven material systems and structured treatment methods.'
      ),
    ],
  },
  {
    name: 'Vehicle Services',
    slug: 'vehicle-services',
    icon: Car,
    images: [...carouselForCategory('vehicle-services')],
    subcategories: [
      sub(
        'Car Washing',
        'car-washing',
        'Exterior and interior car detailing.',
        'Doorstep and garage car wash services including foam wash, vacuum cleaning, dashboard detailing, and polishing for a fresh and maintained look.'
      ),
      sub(
        'Two-Wheeler Repair',
        'two-wheeler-repair',
        'Bike diagnostics and regular servicing.',
        'Two-wheeler service specialists for engine diagnostics, brake tuning, battery checks, chain maintenance, and periodic servicing to keep your ride road-ready.'
      ),
      sub(
        'Car AC Service',
        'car-ac-service',
        'Cabin cooling and AC performance support.',
        'Car AC experts for gas pressure checks, cooling coil cleaning, filter replacement, and airflow tuning for comfortable city and highway driving.'
      ),
      sub(
        'Tyre Puncture',
        'tyre-puncture',
        'Fast puncture fixes and tyre assistance.',
        'Rapid puncture repair and tyre troubleshooting for cars and two-wheelers with doorstep support where available and proper inflation checks.'
      ),
    ],
  },
  {
    name: 'Personal Services',
    slug: 'personal-services',
    icon: Scissors,
    images: [...carouselForCategory('personal-services')],
    subcategories: [
      sub(
        'Salon at Home',
        'salon',
        'Beauty and grooming at your doorstep.',
        'Professional salon services at home including hair styling, skin care, manicure-pedicure, and bridal grooming delivered with hygiene-first practices.'
      ),
      sub(
        'Spa & Massage',
        'spa',
        'Relaxation and wellness therapies.',
        'Certified therapists for head, shoulder, and full body massage sessions with personalized pressure and wellness-focused routines in a comfortable setting.'
      ),
      sub(
        'Yoga Trainer',
        'yoga',
        'Personalized yoga coaching sessions.',
        'Guided yoga plans for flexibility, stress management, and fitness goals with one-on-one sessions designed for your schedule and body condition.'
      ),
      sub(
        'Dietitian',
        'dietitian',
        'Nutrition plans for lifestyle goals.',
        'Qualified diet consultation for weight management, fitness, and medical needs with practical meal plans and follow-up guidance for consistent results.'
      ),
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    images: [...carouselForCategory('education')],
    subcategories: [
      sub(
        'Home Tutor',
        'home-tutor',
        'Subject-wise tutoring for school and college.',
        'Experienced tutors for foundational and advanced subjects, homework support, and exam preparation with structured lessons at home or online.'
      ),
      sub(
        'Music Classes',
        'music-classes',
        'Instrument and vocal training classes.',
        'Music trainers for vocal practice and instruments with beginner to advanced sessions focused on technique, rhythm, and performance confidence.'
      ),
      sub(
        'Exam Coaching',
        'exam-coaching',
        'Targeted guidance for competitive exams.',
        'Exam-focused coaching with mock tests, topic drills, and strategy mentoring to improve accuracy, time management, and confidence.'
      ),
    ],
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon: Briefcase,
    images: [...carouselForCategory('professional-services')],
    subcategories: [
      sub(
        'CA & Tax',
        'ca-tax',
        'Tax filing, GST, and accounting support.',
        'Chartered accounting assistance for taxation, GST filings, bookkeeping, compliance documentation, and business finance consultations.'
      ),
      sub(
        'Legal Services',
        'legal',
        'Legal consultation and documentation.',
        'Legal experts for agreements, compliance, dispute guidance, and business documentation with practical support tailored to your case.'
      ),
      sub(
        'Web Development',
        'web-dev',
        'Business websites and web applications.',
        'Web development services for company websites, landing pages, and custom web apps with responsive design and modern performance standards.'
      ),
      sub(
        'Graphic Design',
        'graphic-design',
        'Branding and visual design solutions.',
        'Creative design support for logos, brochures, social media creatives, and brand assets with a clean and consistent visual style.'
      ),
      sub(
        'Digital Marketing',
        'digital-marketing',
        'Performance campaigns and online growth.',
        'Digital marketing experts for SEO, social campaigns, ads strategy, and lead generation focused on measurable outcomes and long-term growth.'
      ),
    ],
  },
  {
    name: 'Logistics',
    slug: 'logistics',
    icon: Truck,
    images: [...carouselForCategory('logistics')],
    subcategories: [
      sub(
        'Packers & Movers',
        'packers-movers',
        'Safe packing and relocation support.',
        'Reliable packers and movers for local and long-distance relocation with packing, loading, transport, unloading, and setup assistance.'
      ),
      sub(
        'Courier Services',
        'courier',
        'Fast package pickup and delivery.',
        'Courier partners for same-day and scheduled parcel delivery with business and personal shipment options and delivery tracking support.'
      ),
    ],
  },
  {
    name: 'Pet Services',
    slug: 'pet-services',
    icon: Dog,
    images: [...carouselForCategory('pet-services')],
    subcategories: [
      sub(
        'Pet Grooming',
        'pet-grooming',
        'Bathing, trimming, and hygiene care.',
        'Gentle pet grooming services including coat brushing, nail clipping, cleaning, and breed-specific styling for healthy and happy pets.'
      ),
      sub(
        'Dog Walking',
        'dog-walking',
        'Routine walks and activity sessions.',
        'Trusted walkers for daily dog exercise, supervised outings, and pet engagement sessions that support fitness and behavior balance.'
      ),
      sub(
        'Veterinary',
        'veterinary',
        'Pet health consultations and treatment guidance.',
        'Veterinary assistance for routine checkups, vaccinations, illness consultations, and preventive health plans for pets of all ages.'
      ),
    ],
  },
];

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    leads: 10,
    features: ['Basic profile', 'Email support', 'Mobile app access'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 2499,
    leads: 30,
    features: ['Featured listing', 'WhatsApp alerts', 'Email support', 'Basic analytics'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5999,
    leads: 999,
    features: ['Priority leads', 'Advanced analytics', 'Verified badge', 'Dedicated account manager'],
  },
];
