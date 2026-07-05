/* All page content is static — ported from the prototype's component state,
   revised per team feedback (Fellowship of Changemakers helix). */

export type Badge = 'Keeper' | 'Builder';

export interface Person {
  name: string;
  role: string;
  img: string;
  badge: Badge;
}

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
  keeper('Mona Polacca', 'Council of 13 Indigenous Grandmothers', 'mona-polacca.webp'),
  keeper('Kumu Ramsay Taum', 'Hoʻoponopono lineage carrier', 'kumu-ramsay-taum.webp'),
  keeper('Matzuwa Oscar', 'Yoreme · Huya Aniwa Foundation', 'matzuwa-oscar.webp'),
  keeper('Nana Amalia Tum Xinico', 'Maya Kaqchikel practitioner', 'nana-amalia.webp'),
];

export const builders: Person[] = [
  builder('Vivien Vilela', 'Founder & CEO, Aniwa', 'vivien-vilela.webp'),
  builder('Deven Raut', 'Kaiteki.AI · ex-Google Stadia', 'deven-raut.webp'),
  builder('Jane Woodward', 'Stanford · WovenEarth Ventures', 'jane-woodward.webp'),
  builder('De Kai', 'AI pioneer · HKUST & Berkeley', 'de-kai.webp'),
  builder('Will Cady', 'Reddit · author, Which Way Is North', 'will-cady.webp'),
  builder('Mitch Kirsch', 'Planet Events · 13 Olympic Games', 'mitch-kirsch.webp'),
  builder('Oona Chaplin', 'Host · actor, Avatar: Fire and Ash', 'oona-chaplin.webp'),
  builder('Ren Menon', 'Co-Founder & CEO, OrthoFX', 'ren-menon.webp'),
  builder('Denise Roberson', 'Chief Purpose Officer, Omnicom', 'denise-roberson.webp'),
  builder('Angela Katragadda', 'Heritage Modern Design · Trustee', 'angela-katragadda.webp'),
  builder('Ruslan Gafarov', 'Founder, Silicon Valley Camp 1440', 'ruslan-gafarov.webp'),
  builder('Tenzin Seldon', 'Founder & Managing Partner, Pulse Fund', 'tenzin-seldon.webp'),
];

/* ---- The Fellowship of Changemakers: everyone on one vertical helix.
   Keepers are spread evenly among the builders (every 4th seat) so the
   two lineages interleave down the strand. ---- */
export interface FellowshipMember extends Person {
  objectPosition: string;
}

const FACE: Record<string, string> = {
  'Jane Woodward': '50% 16%',
  'Mona Polacca': '50% 16%',
  'Deven Raut': '50% 14%',
  'Kumu Ramsay Taum': '50% 14%',
  'Will Cady': '50% 14%',
  'Matzuwa Oscar': '50% 14%',
  'De Kai': '50% 16%',
  'Nana Amalia Tum Xinico': '50% 16%',
};

export function buildFellowship(ks: Person[] = keepers, bs: Person[] = builders): FellowshipMember[] {
  /* Interleave: one keeper after every 3 builders (B K B B B K …), so 4
     keepers space evenly through 12 builders → 16 seats. */
  const out: Person[] = [];
  let ki = 0;
  let bi = 0;
  for (let seat = 0; seat < ks.length + bs.length; seat++) {
    const wantKeeper = seat % 4 === 1 && ki < ks.length;
    if (wantKeeper) out.push(ks[ki++]);
    else if (bi < bs.length) out.push(bs[bi++]);
    else out.push(ks[ki++]);
  }
  return out.map((p) => ({ ...p, objectPosition: FACE[p.name] ?? '50% 18%' }));
}

export const fellowship: FellowshipMember[] = buildFellowship();

/* ---- Helix strand geometry (vertical, one half-turn per seat) ----
   viewBox is 600 wide × HELIX_UNIT·N tall; strands cross the 300-center
   between seats and bulge to alternating sides at each seat row. */
export const HELIX_UNIT = 160;
export const HELIX_WIDTH = 600;
export const HELIX_AMP = 180;

export function helixPath(count: number, startDir: 1 | -1, amp: number = HELIX_AMP): string {
  let d = 'M300,0';
  for (let i = 0; i < count; i++) {
    const dir = i % 2 === 0 ? startDir : -startDir;
    d += ` Q${300 + amp * dir},${i * HELIX_UNIT + HELIX_UNIT / 2} 300,${(i + 1) * HELIX_UNIT}`;
  }
  return d;
}

export interface HelixStrand {
  startDir: 1 | -1;
  amp: number;
  stroke: string;
  width: number;
  opacity: number;
  delay: number;
  glow?: boolean;
  /** Marks a core strand whose growing tip carries a comet glow (0 | 1). */
  tipIndex?: number;
  /** Race lane: strands sharing a lane grow together with that lane's
      organic acceleration wobble (so a core and its glow stay in sync). */
  race?: number;
}

/* Tuned for the light (bone) Fellowship section. */
export const helixStrands: HelixStrand[] = [
  { startDir: -1, amp: 230, stroke: '#2E2820', width: 1.4, opacity: 0.12, delay: 0 },
  { startDir: 1, amp: 230, stroke: '#6F8A5E', width: 1.4, opacity: 0.28, delay: 0.04 },
  { startDir: -1, amp: HELIX_AMP, stroke: '#A04A2A', width: 6, opacity: 0.3, delay: 0.08, glow: true, race: 0 },
  { startDir: 1, amp: HELIX_AMP, stroke: '#B8945C', width: 6, opacity: 0.28, delay: 0.1, glow: true, race: 1 },
  { startDir: -1, amp: HELIX_AMP, stroke: '#A04A2A', width: 2.6, opacity: 0.9, delay: 0.08, tipIndex: 0, race: 0 },
  { startDir: 1, amp: HELIX_AMP, stroke: '#B8945C', width: 2.6, opacity: 0.85, delay: 0.1, tipIndex: 1, race: 1 },
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

/* ---- Four Elements — One Mission ---- */
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

/* ---- §07 Founders Circle: 7 members + 1 open seat on a polar ring ---- */
export interface FounderSeat {
  name?: string;
  role?: string;
  img?: string;
  linkedin?: string;
  open?: boolean;
  left: number; // % within the ring square
  top: number; // %
}

const RING_RADIUS = 40;

const ringMembers: Array<{ name?: string; role?: string; img?: string; linkedin?: string; open?: boolean }> = [
  { name: 'Vivien Vilela', role: 'A decade between worlds', img: '/assets/people/vivien-vilela.webp', linkedin: 'https://www.linkedin.com/in/vivienvilela/' },
  { name: 'Deven Raut', role: 'AI for human flourishing', img: '/assets/people/deven-raut.webp', linkedin: 'https://www.linkedin.com/in/devenraut/' },
  { name: 'Denise Roberson', role: 'Purpose at global scale', img: '/assets/people/denise-roberson.webp', linkedin: 'https://www.linkedin.com/in/deniseroberson/' },
  { name: 'Angela Katragadda', role: 'Stewardship of the sacred', img: '/assets/people/angela-katragadda.webp' },
  { name: 'Ruslan Gafarov', role: 'Long-term global community', img: '/assets/people/ruslan-gafarov.webp', linkedin: 'https://www.linkedin.com/in/malikone/' },
  { name: 'Mitch Kirsch', role: 'The world’s largest stages', img: '/assets/people/mitch-kirsch.webp', linkedin: 'https://www.linkedin.com/in/mitchkirsch/' },
  { name: 'Ren Menon', role: 'Scale, in a single year', img: '/assets/people/ren-menon.webp', linkedin: 'https://www.linkedin.com/in/renmenon/' },
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
