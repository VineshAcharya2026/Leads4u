import { 
  Wrench, Home, Car, Paintbrush, Zap, Hammer, 
  Trash2, Scissors, GraduationCap, Truck, 
  ShieldCheck, Briefcase, Camera, HeartPulse, 
  Dog, Sparkles, Droplets, Utensils
} from 'lucide-react';

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
  icon: any;
  images: string[];
  subcategories: ServiceSubcategory[];
};

export const CATEGORIES: ServiceCategory[] = [
  {
    name: 'Home Services',
    slug: 'home-services',
    icon: Home,
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523419409543-0f2f84f52cce?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Plumbing', slug: 'plumbing', summary: 'Leak fixes, pipe work, and bathroom fittings.', description: 'Professional plumbing support for leakage repair, pipe replacement, water pressure issues, bathroom and kitchen fitting installation, and preventive maintenance for homes and offices.', images: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Carpentry', slug: 'carpentry', summary: 'Custom woodwork, repairs, and fittings.', description: 'Skilled carpenters for modular furniture work, door and window repairs, wardrobe setup, and interior wood finishing with clean execution and durable materials.', images: ['https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Painting', slug: 'painting', summary: 'Interior and exterior painting with neat finish.', description: 'End-to-end painting services for homes, offices, and shops including wall prep, putty, color consultation, and final coating with minimal disruption to your space.', images: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1616627457797-95f5469f9a9f?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Electrical', slug: 'electrical', summary: 'Safe electrical installations and repairs.', description: 'Certified electricians for wiring, switchboard upgrades, fan and light installation, fault diagnosis, and electrical safety checks for residential and commercial properties.', images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1611288875785-9d8f7e9f7073?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'AC Repair', slug: 'ac-repair', summary: 'Cooling issue diagnosis and AC servicing.', description: 'Complete AC service including gas refill checks, cooling performance tuning, deep cleaning, and repair of split/window units to improve efficiency and comfort.', images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1596204979951-1f0f8d89a2e5?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Appliance Repair', slug: 'appliance-repair', summary: 'Repairs for major home appliances.', description: 'Experienced technicians for washing machines, refrigerators, microwaves, geysers, and other home appliances with fault detection and reliable part replacement support.', images: ['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Home Cleaning', slug: 'home-cleaning', summary: 'Deep and regular cleaning for all rooms.', description: 'Comprehensive home cleaning including kitchen degreasing, bathroom sanitization, dust removal, and floor treatment using safe supplies and trained professionals.', images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Pest Control', slug: 'pest-control', summary: 'Targeted treatment for common pests.', description: 'Effective pest management for cockroaches, termites, rodents, and mosquitoes using scheduled treatment plans designed for long-term prevention and safety.', images: ['https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1581579185169-73bf4f1f274f?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Waterproofing', slug: 'waterproofing', summary: 'Terrace and wall seepage solutions.', description: 'Waterproofing experts for terrace leakage, damp walls, basement seepage, and bathroom leakage using proven material systems and structured treatment methods.', images: ['https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Vehicle Services',
    slug: 'vehicle-services',
    icon: Car,
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Car Washing', slug: 'car-washing', summary: 'Exterior and interior car detailing.', description: 'Doorstep and garage car wash services including foam wash, vacuum cleaning, dashboard detailing, and polishing for a fresh and maintained look.', images: ['https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Two-Wheeler Repair', slug: 'two-wheeler-repair', summary: 'Bike diagnostics and regular servicing.', description: 'Two-wheeler service specialists for engine diagnostics, brake tuning, battery checks, chain maintenance, and periodic servicing to keep your ride road-ready.', images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1529429617124-aee711d1a5dc?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Car AC Service', slug: 'car-ac-service', summary: 'Cabin cooling and AC performance support.', description: 'Car AC experts for gas pressure checks, cooling coil cleaning, filter replacement, and airflow tuning for comfortable city and highway driving.', images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Tyre Puncture', slug: 'tyre-puncture', summary: 'Fast puncture fixes and tyre assistance.', description: 'Rapid puncture repair and tyre troubleshooting for cars and two-wheelers with doorstep support where available and proper inflation checks.', images: ['https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Personal Services',
    slug: 'personal-services',
    icon: Scissors,
    images: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Salon at Home', slug: 'salon', summary: 'Beauty and grooming at your doorstep.', description: 'Professional salon services at home including hair styling, skin care, manicure-pedicure, and bridal grooming delivered with hygiene-first practices.', images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Spa & Massage', slug: 'spa', summary: 'Relaxation and wellness therapies.', description: 'Certified therapists for head, shoulder, and full body massage sessions with personalized pressure and wellness-focused routines in a comfortable setting.', images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Yoga Trainer', slug: 'yoga', summary: 'Personalized yoga coaching sessions.', description: 'Guided yoga plans for flexibility, stress management, and fitness goals with one-on-one sessions designed for your schedule and body condition.', images: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Dietitian', slug: 'dietitian', summary: 'Nutrition plans for lifestyle goals.', description: 'Qualified diet consultation for weight management, fitness, and medical needs with practical meal plans and follow-up guidance for consistent results.', images: ['https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Home Tutor', slug: 'home-tutor', summary: 'Subject-wise tutoring for school and college.', description: 'Experienced tutors for foundational and advanced subjects, homework support, and exam preparation with structured lessons at home or online.', images: ['https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Music Classes', slug: 'music-classes', summary: 'Instrument and vocal training classes.', description: 'Music trainers for vocal practice and instruments with beginner to advanced sessions focused on technique, rhythm, and performance confidence.', images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Exam Coaching', slug: 'exam-coaching', summary: 'Targeted guidance for competitive exams.', description: 'Exam-focused coaching with mock tests, topic drills, and strategy mentoring to improve accuracy, time management, and confidence.', images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon: Briefcase,
    images: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'CA & Tax', slug: 'ca-tax', summary: 'Tax filing, GST, and accounting support.', description: 'Chartered accounting assistance for taxation, GST filings, bookkeeping, compliance documentation, and business finance consultations.', images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Legal Services', slug: 'legal', summary: 'Legal consultation and documentation.', description: 'Legal experts for agreements, compliance, dispute guidance, and business documentation with practical support tailored to your case.', images: ['https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Web Development', slug: 'web-dev', summary: 'Business websites and web applications.', description: 'Web development services for company websites, landing pages, and custom web apps with responsive design and modern performance standards.', images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Graphic Design', slug: 'graphic-design', summary: 'Branding and visual design solutions.', description: 'Creative design support for logos, brochures, social media creatives, and brand assets with a clean and consistent visual style.', images: ['https://images.unsplash.com/photo-1452802447250-470a88ac82bc?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Digital Marketing', slug: 'digital-marketing', summary: 'Performance campaigns and online growth.', description: 'Digital marketing experts for SEO, social campaigns, ads strategy, and lead generation focused on measurable outcomes and long-term growth.', images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Logistics',
    slug: 'logistics',
    icon: Truck,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Packers & Movers', slug: 'packers-movers', summary: 'Safe packing and relocation support.', description: 'Reliable packers and movers for local and long-distance relocation with packing, loading, transport, unloading, and setup assistance.', images: ['https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1604147706283-6e4764d42f7c?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Courier Services', slug: 'courier', summary: 'Fast package pickup and delivery.', description: 'Courier partners for same-day and scheduled parcel delivery with business and personal shipment options and delivery tracking support.', images: ['https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=1200'] },
    ]
  },
  {
    name: 'Pet Services',
    slug: 'pet-services',
    icon: Dog,
    images: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200',
    ],
    subcategories: [
      { name: 'Pet Grooming', slug: 'pet-grooming', summary: 'Bathing, trimming, and hygiene care.', description: 'Gentle pet grooming services including coat brushing, nail clipping, cleaning, and breed-specific styling for healthy and happy pets.', images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Dog Walking', slug: 'dog-walking', summary: 'Routine walks and activity sessions.', description: 'Trusted walkers for daily dog exercise, supervised outings, and pet engagement sessions that support fitness and behavior balance.', images: ['https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&q=80&w=1200'] },
      { name: 'Veterinary', slug: 'veterinary', summary: 'Pet health consultations and treatment guidance.', description: 'Veterinary assistance for routine checkups, vaccinations, illness consultations, and preventive health plans for pets of all ages.', images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80&w=1200'] },
    ]
  }
];

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    leads: 10,
    features: ['Basic profile', 'Email support', 'Mobile app access']
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 2499,
    leads: 30,
    features: ['Featured listing', 'WhatsApp alerts', 'Email support', 'Basic analytics']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5999,
    leads: 999,
    features: ['Priority leads', 'Advanced analytics', 'Verified badge', 'Dedicated account manager']
  }
];
