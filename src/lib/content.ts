/* All page content is static — ported verbatim from the prototype's
   component state (`Aniwa Summit.dc.html` data-dc-script). */

export type Badge = 'Keeper' | 'Builder';

export interface Person {
  name: string;
  role: string;
  img: string;
  badge: Badge;
}

export interface RosterSlot extends Person {
  op: number; // crossfade opacity, transitioned 0.55s
}

const TERRACOTTA = '#A04A2A';
const GREEN = '#9DBE8F';

export const badgeColors: Record<Badge, { bg: string; fg: string }> = {
  Keeper: { bg: TERRACOTTA, fg: '#fff' },
  Builder: { bg: GREEN, fg: '#20291A' },
};

const keeper = (name: string, role: string, img: string): Person => ({
  name,
  role,
  img: `/assets/people/${img}`,
  badge: 'Keeper',
});
const builder = (name: string, role: string, img: string): Person => ({
  name,
  role,
  img: `/assets/people/${img}`,
  badge: 'Builder',
});

export const keepers: Person[] = [
  keeper('Mona Polacca', 'Council of 13 Indigenous Grandmothers', 'mona-polacca.png'),
  keeper('Kumu Ramsay Taum', 'Hoʻoponopono lineage carrier', 'kumu-ramsay-taum.png'),
  keeper('Matzuwa Oscar', 'Yoreme · Huya Aniwa Foundation', 'matzuwa-oscar.png'),
  keeper('Nana Amalia Tum Xinico', 'Maya Kaqchikel practitioner', 'nana-amalia.png'),
];

export const builders: Person[] = [
  builder('Vivien Vilela', 'Founder & CEO, Aniwa', 'vivien-vilela.png'),
  builder('Deven Raut', 'Kaiteki.AI · ex-Google Stadia', 'deven-raut.png'),
  builder('Jane Woodward', 'Stanford · WovenEarth Ventures', 'jane-woodward.png'),
  builder('De Kai', 'AI pioneer · HKUST & Berkeley', 'de-kai.png'),
  builder('Will Cady', 'Reddit · author, Which Way Is North', 'will-cady.png'),
  builder('Mitch Kirsch', 'Planet Events · 13 Olympic Games', 'mitch-kirsch.png'),
  builder('Oona Chaplin', 'Host · actor, Avatar: Fire and Ash', 'oona-chaplin.png'),
  builder('Ren Menon', 'Co-Founder & CEO, OrthoFX', 'ren-menon.png'),
  builder('Denise Roberson', 'Chief Purpose Officer, Omnicom', 'denise-roberson.png'),
  builder('Angela Katragadda', 'Heritage Modern Design · Trustee', 'angela-katragadda.png'),
  builder('Ruslan Gafarov', 'Founder, Silicon Valley Camp 1440', 'ruslan-gafarov.png'),
  builder('Tenzin Seldon', 'Founder & Managing Partner, Pulse Fund', 'tenzin-seldon.png'),
];

/* Keepers hold these roster indexes so the Builder–Keeper–Builder rhythm
   holds; only builder slots ever swap. */
export const KEEPER_SLOTS = [1, 3, 8, 10] as const;
export const BUILDER_SLOTS = [0, 2, 4, 5, 6, 7, 9, 11] as const;
export const ROSTER_SIZE = 12;
export const ROSTER_SWAP_INTERVAL_MS = 2200;
export const ROSTER_FADE_MS = 540;

export function buildRosterSlots(): RosterSlot[] {
  const slots = new Array<RosterSlot>(ROSTER_SIZE);
  KEEPER_SLOTS.forEach((si, k) => {
    slots[si] = { op: 1, ...keepers[k] };
  });
  BUILDER_SLOTS.forEach((si, k) => {
    slots[si] = { op: 1, ...builders[k] };
  });
  return slots;
}

export function buildReserve(): Person[] {
  return builders.slice(BUILDER_SLOTS.length);
}

/* ---- §01 The Weaving: 8 nodes along the strands, perfect alternation ---- */
export interface WeaveNode {
  name: string;
  img: string;
  badge: Badge;
  left: number; // % within the band
  top: number; // %
  objectPosition: string;
}

export const weaveNodes: WeaveNode[] = [
  { name: 'Jane Woodward', img: '/assets/people/jane-woodward.png', badge: 'Builder', left: 3.231, top: 23.75, objectPosition: '50% 16%' },
  { name: 'Mona Polacca', img: '/assets/people/mona-polacca.png', badge: 'Keeper', left: 15.538, top: 55, objectPosition: '50% 16%' },
  { name: 'Deven Raut', img: '/assets/people/deven-raut.png', badge: 'Builder', left: 27.846, top: 23.75, objectPosition: '50% 14%' },
  { name: 'Kumu Ramsay Taum', img: '/assets/people/kumu-ramsay-taum.png', badge: 'Keeper', left: 40.154, top: 55, objectPosition: '50% 14%' },
  { name: 'Will Cady', img: '/assets/people/will-cady.png', badge: 'Builder', left: 52.462, top: 23.75, objectPosition: '50% 14%' },
  { name: 'Matzuwa Oscar', img: '/assets/people/matzuwa-oscar.png', badge: 'Keeper', left: 64.769, top: 55, objectPosition: '50% 14%' },
  { name: 'De Kai', img: '/assets/people/de-kai.png', badge: 'Builder', left: 77.077, top: 23.75, objectPosition: '50% 16%' },
  { name: 'Nana Amalia', img: '/assets/people/nana-amalia.png', badge: 'Keeper', left: 89.385, top: 55, objectPosition: '50% 16%' },
];

/* Weave strand paths (viewBox 0 0 1300 600) — [d, stroke, width, opacity, delay, glow] */
export interface WeaveStrand {
  d: string;
  stroke: string;
  width: number;
  opacity: number;
  delay: number;
  glow?: boolean;
}

const STRAND_A =
  'M10,300 Q90,120 170,300 Q250,480 330,300 Q410,120 490,300 Q570,480 650,300 Q730,120 810,300 Q890,480 970,300 Q1050,120 1130,300 Q1210,480 1290,300';
const STRAND_B =
  'M10,300 Q90,480 170,300 Q250,120 330,300 Q410,480 490,300 Q570,120 650,300 Q730,480 810,300 Q890,120 970,300 Q1050,480 1130,300 Q1210,120 1290,300';

export const weaveStrands: WeaveStrand[] = [
  {
    d: 'M10,300 Q90,70 170,300 Q250,530 330,300 Q410,70 490,300 Q570,530 650,300 Q730,70 810,300 Q890,530 970,300 Q1050,70 1130,300 Q1210,530 1290,300',
    stroke: '#F4F1EB',
    width: 1.4,
    opacity: 0.13,
    delay: 0,
  },
  {
    d: 'M10,300 Q90,530 170,300 Q250,70 330,300 Q410,530 490,300 Q570,70 650,300 Q730,530 810,300 Q890,70 970,300 Q1050,530 1130,300 Q1210,70 1290,300',
    stroke: '#8E7BC0',
    width: 1.4,
    opacity: 0.16,
    delay: 0.06,
  },
  { d: STRAND_A, stroke: '#A04A2A', width: 6, opacity: 0.5, delay: 0.12, glow: true },
  { d: STRAND_B, stroke: '#B8945C', width: 6, opacity: 0.42, delay: 0.24, glow: true },
  { d: STRAND_A, stroke: '#A04A2A', width: 2.6, opacity: 0.95, delay: 0.12 },
  { d: STRAND_B, stroke: '#B8945C', width: 2.6, opacity: 0.78, delay: 0.24 },
];

/* ---- §02 The Room: left-rail stats + partner logos ---- */
export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export const stats: Stat[] = [
  { value: '14+', label: 'Years of partnership', detail: 'With Indigenous communities across the Americas and the Pacific.' },
  { value: '$6M+', label: 'Distributed', detail: 'For Indigenous causes, land protection and cultural preservation.' },
  { value: '40+', label: 'Elders', detail: 'Representing 6 regions across the Americas and the Pacific' },
  { value: '$2.5B', label: 'Realized', detail: 'From energy initiatives by MAP Energy — acquired by Global Infrastructure Partners, 2020.' },
  { value: '32 ', label: 'International productions', detail: '13 Olympic Games, 6 Super Bowls, 3 FIFA World Cups, 3 Rugby World Cups · 30 countries.' },
];

export interface PartnerLogo {
  name: string;
  src: string;
  large: boolean; // Disney+, Netflix, PepsiCo, NatGeo, Block, Stanford render at 68px
}

export const partnerLogos: PartnerLogo[] = [
  { name: 'Google', src: '/assets/logos/google.webp', large: false },
  { name: 'Apple', src: '/assets/logos/apple.webp', large: false },
  { name: 'Disney+', src: '/assets/logos/disney.webp', large: true },
  { name: 'Netflix', src: '/assets/logos/netflix.webp', large: true },
  { name: 'Adobe', src: '/assets/logos/adobe.webp', large: false },
  { name: 'Amazon', src: '/assets/logos/amazon.webp', large: false },
  { name: 'PepsiCo', src: '/assets/logos/pepsico.webp', large: true },
  { name: "McDonald's", src: '/assets/logos/mcdonalds.webp', large: false },
  { name: 'National Geographic', src: '/assets/logos/natgeo.webp', large: true },
  { name: 'Reddit', src: '/assets/logos/reddit.webp', large: false },
  { name: 'Block', src: '/assets/logos/block.webp', large: true },
  { name: 'Stanford', src: '/assets/logos/stanford.webp', large: true },
];

/* ---- §03 The Days: elements + day cards + outcome ---- */
export interface ElementBox {
  glyph: string;
  name: string;
  description: string;
}

export const elements: ElementBox[] = [
  { glyph: '◎', name: 'Air', description: 'Ancestral intelligence in the age of artificial intelligence.' },
  { glyph: '▢', name: 'Earth', description: 'Personal wellness and the evolution of consciousness.' },
  { glyph: '△', name: 'Fire', description: 'Regenerative economies and nature finance.' },
  { glyph: '▽', name: 'Water', description: 'Indigenous spirituality and the planetary polycrisis.' },
];

export interface Day {
  number: string;
  date: string;
  title: string;
  copy: string;
  img: string;
}

export const days: Day[] = [
  {
    number: '01',
    date: 'October 23',
    title: 'Listening',
    copy: 'Roles unwound, phones surrendered. Each guest introduces themselves not by what they do, but by one story they carry. The elders speak; the builders receive.',
    img: '/assets/img/day1-dawn.jpg',
  },
  {
    number: '02',
    date: 'October 24',
    title: 'Dialogue',
    copy: 'The exchange begins. What does Western science owe the medicine traditions of the South? What do the elders see in our future that we have missed?',
    img: '/assets/img/day2-golden.jpg',
  },
  {
    number: '03',
    date: 'October 25',
    title: 'Commitment',
    copy: 'The fire convenes. Each participant writes one commitment — witnessed, signed. The Aniwa Declaration is drafted. You leave not with photos, but with covenant.',
    img: '/assets/img/day4-fire.jpg',
  },
];

/* ---- §07 Founders Circle: 7 members + 1 open seat on a polar ring ---- */
export interface FounderSeat {
  name?: string;
  role?: string;
  img?: string;
  open?: boolean;
  left: number; // % within the ring square
  top: number; // %
}

const RING_RADIUS = 40;

const ringMembers: Array<{ name?: string; role?: string; img?: string; open?: boolean }> = [
  { name: 'Vivien Vilela', role: 'A decade between worlds', img: '/assets/people/vivien-vilela.png' },
  { name: 'Deven Raut', role: 'AI for human flourishing', img: '/assets/people/deven-raut.png' },
  { name: 'Denise Roberson', role: 'Purpose at global scale', img: '/assets/people/denise-roberson.png' },
  { name: 'Angela Katragadda', role: 'Stewardship of the sacred', img: '/assets/people/angela-katragadda.png' },
  { name: 'Ruslan Gafarov', role: 'Long-term global community', img: '/assets/people/ruslan-gafarov.png' },
  { name: 'Mitch Kirsch', role: 'The world’s largest stages', img: '/assets/people/mitch-kirsch.png' },
  { name: 'Ren Menon', role: 'Scale, in a single year', img: '/assets/people/ren-menon.png' },
  { open: true },
];

export function placeFounders(radius: number = RING_RADIUS): FounderSeat[] {
  return ringMembers.map((m, i) => {
    const ang = (i / ringMembers.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...m,
      left: Number((50 + radius * Math.cos(ang)).toFixed(2)),
      top: Number((50 + radius * Math.sin(ang)).toFixed(2)),
    };
  });
}

export const founders = placeFounders();

/* ---- §06 Invitation: the six-step entry ceremony ---- */
export interface Step {
  n: string;
  label: string;
}

export const steps: Step[] = [
  { n: '01', label: 'Personal invitation or nomination' },
  { n: '02', label: 'Application to attend or to speak' },
  { n: '03', label: 'Private alignment conversation' },
  { n: '04', label: 'Confirmation & entry to the guest channel' },
  { n: '05', label: 'Pre-event onboarding & reading list' },
  { n: '06', label: 'Arrival at the land' },
];
