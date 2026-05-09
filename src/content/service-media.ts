import { unsplashPhoto } from '@/lib/image-url';

/** Carousel images per category — Unsplash (free license) */
export const categoryCarouselImages: Record<string, readonly [string, string, string]> = {
  'home-services': [
    unsplashPhoto('1631889993954-5972108b7f88'),
    unsplashPhoto('1600585154526-991d94378d96'),
    unsplashPhoto('1565538810643-b5eefbae477d'),
  ],
  'vehicle-services': [
    unsplashPhoto('1549317661-bd32c8ce0db2'),
    unsplashPhoto('1492144534655-ae79c964c9d7'),
    unsplashPhoto('1519641471654-76ce9107faa8'),
  ],
  'personal-services': [
    unsplashPhoto('1516975080674-acf8e2d86c71'),
    unsplashPhoto('1519415943484-af9c60e8e814'),
    unsplashPhoto('1544161515-a9e0fad6bcd4'),
  ],
  education: [
    unsplashPhoto('1434030216411-0b793f4b4173'),
    unsplashPhoto('1516321497447-f7d6d3c71c2c'),
    unsplashPhoto('1529390079861-591de354c5cf'),
  ],
  'professional-services': [
    unsplashPhoto('1454165804606-c3d57bc86b40'),
    unsplashPhoto('1552664730-d307884d8c0c'),
    unsplashPhoto('1557804507-96413e8c9486'),
  ],
  logistics: [
    unsplashPhoto('1578575437130-cc9d5d6d56c9'),
    unsplashPhoto('1586528116311-ad8dd3c8310d'),
    unsplashPhoto('1566576912321-d58ddd7a6088'),
  ],
  'pet-services': [
    unsplashPhoto('1517849845537-4d257902454a'),
    unsplashPhoto('1548199973-03cce0bbc87b'),
    unsplashPhoto('1450778869180-41d0601e046e'),
  ],
};

const DEFAULT_SUB_PAIR: readonly [string, string] = [
  unsplashPhoto('1570129477492-45e083ebb9e3'),
  unsplashPhoto('1519710164239-f123a4cc4686'),
];

/** Two curated images per sub-service slug — all distinct pairs where possible */
const SUB_MAP: Record<string, readonly [string, string]> = {
  plumbing: [unsplashPhoto('1585704032915-c3400ca199e7'), unsplashPhoto('1541604193451-ffe349e598b5')],
  carpentry: [unsplashPhoto('1601055903647-ddf1ee9701b7'), unsplashPhoto('1504148455328-c376907d081c')],
  painting: [unsplashPhoto('1562259949-e8e7689d7828'), unsplashPhoto('1616627457797-95f5469f9a9f')],
  electrical: [unsplashPhoto('1621905251189-08b45d6a269e'), unsplashPhoto('1558618666-fcd25c85cd64')],
  'ac-repair': [unsplashPhoto('1596204979951-1f0f8d89a2e5'), unsplashPhoto('1503387762-592deb58ef23')],
  'appliance-repair': [unsplashPhoto('1581093458791-9f3c3900df4b'), unsplashPhoto('1582719478250-c89cae4dc85b')],
  'home-cleaning': [unsplashPhoto('1563453392212-326f5e854473'), unsplashPhoto('1556911220-bda9f7f7597e')],
  'pest-control': [unsplashPhoto('1473340322854-914a8c5f9296'), unsplashPhoto('1621996346565-e3dbc353d2e5')],
  waterproofing: [unsplashPhoto('1464037866556-6812c9d1c72e'), unsplashPhoto('1515263487990-61b07816b324')],

  'car-washing': [unsplashPhoto('1607861716497-e65ab29fc7ac'), unsplashPhoto('1485291571150-772bcfc10da5')],
  'two-wheeler-repair': [unsplashPhoto('1558981806-ec527fa84c39'), unsplashPhoto('1449426468159-de8b418a6d53')],
  'car-ac-service': [unsplashPhoto('1533473359331-0135ef1b58bf'), unsplashPhoto('1494976388532-dfdf5d4d5fb3')],
  'tyre-puncture': [unsplashPhoto('1486754735734-325b5831c3ad'), unsplashPhoto('1483721310020-03333e577078')],

  salon: [unsplashPhoto('1522335789203-aabd1fc54bc9'), unsplashPhoto('1595476108010-b4d1f102b1b1')],
  spa: [unsplashPhoto('1540555700478-4be289fbecef'), unsplashPhoto('1519823551278-64ac92734fb1')],
  yoga: [unsplashPhoto('1518611012118-696072aa579a'), unsplashPhoto('1571019613454-1cb2f99b2d8b')],
  dietitian: [unsplashPhoto('1498837167922-ddd27525d352'), unsplashPhoto('1546069901-ba958fcb7c8f')],

  'home-tutor': [unsplashPhoto('1571260899304-425eee4c7efc'), unsplashPhoto('1524995997946-a1c2e315a42f')],
  'music-classes': [unsplashPhoto('1511379938547-c1f69419868d'), unsplashPhoto('1465847899084-d164df4dedc6')],
  'exam-coaching': [unsplashPhoto('1456513080510-7bf3a84b82f8'), unsplashPhoto('1503676260728-1c00da094a0b')],

  'ca-tax': [unsplashPhoto('1554224155-6726b3ff858f'), unsplashPhoto('1444653389962-f8149286c578a')],
  legal: [unsplashPhoto('1589216532372-1c2a367900d9'), unsplashPhoto('1575505586569-646b2ca898fc')],
  'web-dev': [unsplashPhoto('1498050108023-c5249f4df085'), unsplashPhoto('1461749280684-dccba630e2f6')],
  'graphic-design': [unsplashPhoto('1452802447250-470a88ac82bc'), unsplashPhoto('1523726491678-bf852e717f6a')],
  'digital-marketing': [unsplashPhoto('1460925895917-afdab827c52f'), unsplashPhoto('1432888622747-4eb9a8efeb07')],

  'packers-movers': [unsplashPhoto('1600518464441-9154a4dea21b'), unsplashPhoto('1604147706283-6e4764d42f7c')],
  courier: [unsplashPhoto('1521791136064-7986c2920216'), unsplashPhoto('1566576912321-d58ddd7a6088')],

  'pet-grooming': [unsplashPhoto('1516734212186-a967f81ad0d7'), unsplashPhoto('1581888227599-779811939961')],
  'dog-walking': [unsplashPhoto('1470167290877-7d5d3446de4c'), unsplashPhoto('1568572933382-74d440642117')],
  veterinary: [unsplashPhoto('1576201836106-db1758fd1c97'), unsplashPhoto('1629904853716-f0bc54eea481')],
};

export function subImagesForSlug(slug: string): readonly [string, string] {
  return SUB_MAP[slug] ?? DEFAULT_SUB_PAIR;
}

export function carouselForCategory(catSlug: string): readonly [string, string, string] {
  return categoryCarouselImages[catSlug] ?? categoryCarouselImages['home-services'];
}
