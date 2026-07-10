/* All page content is static — ported from the prototype's component state,
   revised per team feedback (Fellowship of Changemakers double helix:
   changemakers down the left strand, wisdom keepers down the right). */

export interface FellowshipMember {
  name: string;
  role: string;
  img: string;
  /** object-position for the circular crop, e.g. '50% 18%'. */
  objectPosition: string;
  /** Short bio shown in the click-to-open popup. */
  bio: string;
}

const member = (name: string, role: string, img: string, bio: string, objectPosition = '50% 18%'): FellowshipMember => ({
  name,
  role,
  img: `/assets/people/${img}`,
  objectPosition,
  bio,
});

/* Left strand — the changemakers, in leadership's order. */
export const fellowshipLeft: FellowshipMember[] = [
  member(
    'Tenzin Seldon',
    'Founder & Managing Partner, Pulse Fund',
    'tenzin-seldon.webp',
    'Tenzin Seldon is the Founder & Managing Partner of Pulse Fund, a venture capital fund investing in scalable climate companies across energy transition, infrastructure, food and agriculture, and mobility. A Stanford graduate and Rhodes Scholar, she has led investments and holds board seats in companies including Twelve, BlocPower, and Mast Reforestation, and advises Stanford’s Institute for Human-Centered AI. She previously served with the United Nations Environment Programme, overseeing disaster-risk-reduction policy across Asia.',
  ),
  member(
    'De Kai',
    'AI pioneer · HKUST & Berkeley',
    'de-kai.webp',
    'De Kai is Professor of Computer Science and Engineering at HKUST and Distinguished Research Scholar at Berkeley’s International Computer Science Institute. A pioneer of the machine-learning foundations behind systems like Google Translate, he was named among the founding Fellows of the Association for Computational Linguistics and served on Google’s inaugural AI ethics council. His book Raising AI reframes humanity’s relationship with the intelligences we are bringing into the world.',
    '50% 16%',
  ),
  member(
    'Oona Chaplin',
    'Actor. Avatar. Game of Thrones',
    'oona-chaplin.webp',
    'Oona Chaplin, granddaughter of the legendary Charlie Chaplin, is an acclaimed actress whose career spans Game of Thrones, Black Mirror, and, most recently, the Avatar franchise — where, as Varang, she inhabits a story that powerfully explores the struggle between Indigenous peoples and colonial, extractive forces. Beyond the screen, Oona is an artist, cultural bridge-builder, land steward, and mother, and a longtime ally of the Huya Aniwa Foundation in the protection of Indigenous wisdom and the living Earth.',
  ),
  member(
    'Jane Woodward',
    'Stanford · WovenEarth Ventures',
    'jane-woodward.webp',
    'Jane Woodward is the founder of MAP Energy, whose energy initiatives realized $2.5B upon acquisition by Global Infrastructure Partners in 2020, and of WovenEarth Ventures, which accelerates climate solutions by backing early-stage climate venture funds. A longtime adjunct professor at Stanford in Energy Resources Engineering, she has taught energy and sustainability to thousands of students and remains devoted to weaving capital, education, and stewardship into a regenerative energy future.',
    '50% 16%',
  ),
  member(
    'Jonas Masetti',
    'Vedanta teacher · Padma Shri',
    'jonas-masetti.webp',
    'Jonas Masetti — known to his students as Vishvanatha — is a Brazilian teacher of Vedanta and Sanskrit and the founder of Instituto Vishva Vidya near Rio de Janeiro. A mechanical engineer who left financial markets for the traditional study of the Vedas in the lineage of Swami Dayananda Saraswati, he has brought Vedic knowledge to hundreds of thousands across Brazil and the West. In 2025 the Government of India conferred on him the Padma Shri, one of its highest civilian honors.',
    '50% 20%',
  ),
  member(
    'Will Cady',
    'Reddit · author, Which Way Is North',
    'will-cady.webp',
    'Will Cady is a multimedia artist, cultural strategist, and founder of HEAL MVMNT, an initiative positioning Healing, Environments, Art, and Language as vital counterparts to STEM. An early leader at Reddit, he helped grow the platform into a billion-dollar business through deep insight into culture and creativity. His book Which Way Is North: A Creative Compass for Makers, Marketers, and Mystics was named a must-read by Inc Magazine and selected for The Next Big Idea Book Club.',
    '50% 14%',
  ),
  member(
    'Deven Raut',
    'Kaiteki.AI · ex-Google Stadia',
    'deven-raut.webp',
    'Deven Raut is a polymath entrepreneur with deep experience building mission-critical technologies that power the modern internet. He co-founded CiiNOW, which evolved into Google Stadia, led the creation of Prisma SASE at Palo Alto Networks, and headed Network Security at Google. He is currently building Kaiteki.AI, reimagining digital consumption in healthier, more human-centered ways — work that reflects a lifelong devotion to soul, mind, and body wellness for all species.',
    '50% 14%',
  ),
  member(
    'Denise Roberson',
    'Chief Purpose Officer, Omnicom',
    'denise-roberson.webp',
    'Denise Roberson serves as Chief Purpose Officer at Omnicom’s TBWA\\Chiat\\Day — the first role of its kind at the agency — helping C-suites and boards build the business case for purpose and embed it across their organizations. She is also the founder of Conspiracy of Love, a purpose-led B Corp consultancy, a marketing professor in Pepperdine’s Presidents & Key Executives MBA, and a doctoral researcher studying next-generation purpose and sustainability models.',
  ),
  member(
    'Ren Menon',
    'Co-Founder & CEO, OrthoFX',
    'ren-menon.webp',
    'Ren Menon is the Co-founder and CEO of OrthoFX, an orthodontic technology company advancing clear-aligner treatment through innovations in material science, digital workflows, and patient experience. He previously held senior leadership roles at Align Technology, contributing to global product innovation for Invisalign. The holder of several patents spanning orthodontics and consumer healthtech, Ren combines advanced materials, AI-driven workflows, and scalable care models to make healthcare more accessible.',
  ),
  member(
    'Ruslan Gafarov',
    'Founder & CEO, SF Innovation Hub',
    'ruslan-gafarov.webp',
    'Ruslan Gafarov is the founder and CEO of the San Francisco Innovation Hub. An entrepreneur with more than 15 years of experience and the author of three books on organizational culture, he has been building entrepreneurial communities in Silicon Valley since 2016 — connecting founders across borders and cultures around conscious leadership and long-term community.',
  ),
];

/* Right strand — the wisdom keepers, in leadership's order. */
export const fellowshipRight: FellowshipMember[] = [
  member(
    'Kumu Ramsay Taum',
    'Hoʻoponopono lineage carrier',
    'kumu-ramsay-taum.webp',
    'Mentored and trained by respected kūpuna (elders), Kumu Ramsay Taum is a practitioner and instructor of Native Hawaiian practices including Hoʻoponopono (stress release and mediation), lomi haha (body alignment), and Kaihewalu Lua (Hawaiian battle art). Honored by the University of Hawaiʻi as a Star of Oceania, he is recognized internationally for transformational leadership integrating Native Hawaiian cultural values and place-based principles into contemporary business.',
    '50% 14%',
  ),
  member(
    'Mona Polacca',
    'Council of 13 Indigenous Grandmothers',
    'mona-polacca.webp',
    'Mona Polacca — Hopi, Tewa, and Havasupai — is an internationally recognized Indigenous leader, spiritual elder, educator, and water protector from Arizona. A founding member of the International Council of Thirteen Indigenous Grandmothers, she has represented Indigenous communities at the United Nations and global forums on water protection, climate action, and Indigenous sovereignty, elevating traditional ecological knowledge as an answer to the world’s most pressing environmental challenges.',
    '50% 16%',
  ),
  member(
    'Matsini Yawanawá',
    'Chief of Mutum Village · Yawanawá',
    'matsini-yawanawa.webp',
    'Matsini Yawanawá, chief and spiritual leader of Mutum village in Acre, Brazil, descends from an unbroken lineage of Pajés (master shamans) and trained under the legendary Pajé Tata, who helped restore Yawanawá traditions after years of suppression. He welcomes students to his village year-round and shares his wisdom abroad alongside his wife Manxyvake and their children — carrying the ancestral prayers and songs of his people to help guide the world through these times of transformation.',
    '50% 42%',
  ),
  member(
    'Chenoa Egawa',
    'Coast Salish · Lummi & S’Klallam Nations',
    'chenoa-egawa.webp',
    'Chenoa Egawa is Coast Salish of the Lummi and S’Klallam Nations of Washington State — a ceremonial leader and healer, singer and composer of traditional medicine songs, storyteller, children’s book author, and environmental activist. Multicultural and multilingual, she bridges understanding across cultures, guiding us back into harmony with Nature, the Seasons, and the Elements that give us life, and carrying Indigenous wisdom to the world at a moment when it is needed most.',
    '50% 20%',
  ),
  member(
    'Mamo Cencio',
    'Kogi Mamo · Sierra Nevada de Santa Marta',
    'mamo-cencio.webp',
    'Mamo Cencio is a Kogi Mamo — doctor of ancestral medicine, botanist, and teacher of medicinal plants with extensive knowledge of the native species of the Sierra Nevada de Santa Marta. He travels constantly to distant villages across Kogi territory, serving as doctor, priest, counselor, and spiritual leader to his people. A musician of the Tayrona instruments and keeper of the Kogi Nation’s ancestral songs, he is authorized in the Jatuquá, a sacred method of divination by water.',
    '50% 22%',
  ),
  member(
    'Nana Amalia Tum Xinico',
    'Maya Kaqchikel practitioner',
    'nana-amalia.webp',
    'Nana Amalia is a gifted healer, naturopath, and renowned spiritual leader and teacher — a member of the commission of sacred sites in Guatemala (COLUSAG), founder of the elder council Iq’B’alam, and a voice in the Maya women’s associations MOLOJ and KAKLA. She works alongside her husband Tata Mario on healing, purification, and spiritual balancing ceremonies, Maya astrology readings, and other traditional practices.',
    '50% 16%',
  ),
  member(
    'Tata Mario Ovalle',
    'Maya K’iché spiritual guide',
    'tata-mario.webp',
    'Tata Mario is a renowned spiritual leader, naturopath, painter, and traditional musician — he plays the marimba, drums, caracol, and flute. Founder of the council of Ajq’ijab’ (spiritual guides) Iq’B’alam and advisor to the Indigenous Townhall of Santa Lucía Utatlán, he teaches on medicinal plants, Maya cosmology, history, and Indigenous rights. He works alongside his wife Nana Amalia on healing, purification, and spiritual balancing ceremonies.',
    '50% 30%',
  ),
  member(
    'Joseph David Osage',
    'Cheyenne · Keeper of the Blue Sky Bundle',
    'joseph-david-osage.webp',
    'Born in western Oklahoma and raised in the Red Moon community, Joseph David is full-blood Tsitsistsas (Cheyenne) and has lived the traditional Cheyenne life from birth. Seated as ceremonial chief and one of sixteen sacred arrow priests, he was appointed holder of the Blue Sky Bundle — the second-highest position in the Cheyenne tribe — making him the keeper of blue skies, in charge of the weather and rain prayers.',
    '50% 28%',
  ),
  member(
    'Vivien Vilela',
    'Founder & CEO, Aniwa',
    'vivien-vilela.webp',
    'Vivien Vilela has spent over 14 years pioneering ethical relations with Indigenous peoples across the Americas. Born and raised in Brazil, she founded Aniwa, an international platform that shares Indigenous wisdom and amplifies Indigenous voices, and the Huya Aniwa Foundation and Institute, dedicated to preserving sacred land in alliance with native collectives. She has taken a sacred oath in the Wixárika tradition to serve as a Marakame — one who can heal, sing, and dream.',
  ),
  member(
    'Oscar Matzuwa',
    'Yoreme · Huya Aniwa Foundation',
    'matzuwa-oscar.webp',
    'Oscar Matzuwa comes from the Yoreme people, deer nation of Sinaloa, Mexico. A pilgrim of the Wirikuta desert since 2005, he has taken the sacred oath of a Mara’akame (spiritual leader) in the Wixárika tradition, and carries the fire to run sweat lodges. An anthropologist specialized in traditional medicine and a traditional singer and musician, he established the Huya Aniwa Institute to implement sustainable land stewardship and sacred-medicine conservation.',
    '50% 14%',
  ),
];

/** Number of helix rows — one changemaker and one wisdom keeper per row. */
export const FELLOWSHIP_ROWS = Math.max(fellowshipLeft.length, fellowshipRight.length);

/* ---- Helix strand geometry (vertical, one half-turn per row) ----
   viewBox is 600 wide × HELIX_UNIT·N tall; strands cross the 300-center
   between rows and bulge to both sides at each row. */
export const HELIX_UNIT = 230;
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
  { value: '14+', label: 'Years of partnership', detail: 'Cultivating trusted relationships with Indigenous communities worldwide.' },
  { value: '$6M+', label: 'Distributed', detail: 'Supporting Indigenous-led initiatives, land protection and cultural preservation.' },
  { value: '50+', label: 'Elders', detail: 'An alliance with some of the world’s most respected Indigenous leaders.' },
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
export type ElementId = 'air' | 'water' | 'fire' | 'earth';

export interface ElementBox {
  id: ElementId;
  name: string;
  description: string;
  longDescription: string;
  img: string;
}

export const elements: ElementBox[] = [
  {
    id: 'air',
    name: 'Air',
    description: 'Ancestral intelligence in the age of artificial intelligence.',
    longDescription:
      'Explore how Indigenous knowledge systems — refined over millennia — can guide the development and deployment of artificial intelligence. Sessions examine ancestral intelligence as a living counterpart to machine intelligence, asking how we might weave both into a shared path forward.',
    img: '/assets/elements/air.webp',
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Indigenous spirituality and the planetary polycrisis.',
    longDescription:
      'Listen to the spiritual teachings of Original Peoples as they respond to climate collapse, biodiversity loss, and the converging crises of our time. This element holds ceremony, prayer, and the sacred relationship between humanity and Water.',
    img: '/assets/elements/water.webp',
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Regenerative economies and nature finance.',
    longDescription:
      'Catalyze capital flows toward regeneration. Discussions and workshops on nature finance, circular economies, and the economic architectures that can shift us from extraction to mutual benefit with the living world.',
    img: '/assets/elements/fire.webp',
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Personal wellness and the evolution of consciousness.',
    longDescription:
      'Ground in practices that reconnect body, mind, and spirit. From ceremonial healing to contemplative inquiry, this track invites leaders to tend their inner landscape — the foundation from which planetary stewardship grows.',
    img: '/assets/elements/earth.webp',
  },
];

/* ---- §07 Founders Circle: 14 members + 1 open seat on a single polar
   ring, sized so fifteen seats fit without colliding. Headshots link
   out — LinkedIn where one exists, else the member's public profile. ---- */
export interface FounderSeat {
  name?: string;
  role?: string;
  img?: string;
  linkedin?: string;
  /** Short bio shown in the click-to-open popup when present. */
  bio?: string;
  open?: boolean;
  left: number; // % within the ring square
  top: number; // %
}

const RING_RADIUS = 42;

const ringMembers: Array<{ name?: string; role?: string; img?: string; linkedin?: string; bio?: string; open?: boolean }> = [
  {
    name: 'Vivien Vilela',
    role: 'Founder & CEO, Aniwa',
    img: '/assets/people/vivien-vilela.webp',
    linkedin: 'https://www.linkedin.com/in/vivienvilela/',
    bio: 'Vivien Vilela has spent over 14 years pioneering ethical relations with Indigenous peoples across the Americas. Born and raised in Brazil, she founded Aniwa, an international platform that shares Indigenous wisdom and amplifies Indigenous voices, and the Huya Aniwa Foundation and Institute, dedicated to preserving sacred land in alliance with native collectives. She has taken a sacred oath in the Wixárika tradition to serve as a Marakame — one who can heal, sing, and dream.',
  },
  {
    name: 'Oscar Matzuwa',
    role: 'Yoreme · Huya Aniwa Foundation',
    img: '/assets/people/matzuwa-oscar.webp',
    linkedin: 'https://www.huyaaniwa.org/team/oscar',
    bio: 'Oscar Matzuwa comes from the Yoreme people, deer nation of Sinaloa, Mexico. A pilgrim of the Wirikuta desert since 2005, he has taken the sacred oath of a Mara’akame (spiritual leader) in the Wixárika tradition, and carries the fire to run sweat lodges. An anthropologist specialized in traditional medicine and a traditional singer and musician, he established the Huya Aniwa Institute to implement sustainable land stewardship and sacred-medicine conservation.',
  },
  {
    name: 'Ruslan Gafarov',
    role: 'Founder & CEO, SF Innovation Hub',
    img: '/assets/people/ruslan-gafarov.webp',
    linkedin: 'https://www.linkedin.com/in/malikone/',
    bio: 'Ruslan Gafarov is the founder and CEO of the San Francisco Innovation Hub. An entrepreneur with more than 15 years of experience and the author of three books on organizational culture, he has been building entrepreneurial communities in Silicon Valley since 2016 — connecting founders across borders and cultures around conscious leadership and long-term community.',
  },
  {
    name: 'Oona Chaplin',
    role: 'Actor. Avatar. Game of Thrones',
    img: '/assets/people/oona-chaplin.webp',
    bio: 'Oona Chaplin, granddaughter of the legendary Charlie Chaplin, is an acclaimed actress whose career spans Game of Thrones, Black Mirror, and, most recently, the Avatar franchise — where, as Varang, she inhabits a story that powerfully explores the struggle between Indigenous peoples and colonial, extractive forces. Beyond the screen, Oona is an artist, cultural bridge-builder, land steward, and mother, and a longtime ally of the Huya Aniwa Foundation in the protection of Indigenous wisdom and the living Earth.',
  },
  {
    name: 'Mitch Kirsch',
    role: 'Executive Producer, Live Events',
    img: '/assets/people/mitch-kirsch.webp',
    linkedin: 'https://www.linkedin.com/in/mitchkirsch/',
  },
  {
    name: 'Angela Katragadda',
    role: 'Sacred Stewardship Leader',
    img: '/assets/people/angela-katragadda.webp',
  },
  {
    name: 'Anton Stylyk',
    role: 'Cross-Industry Partnerships',
    img: '/assets/people/anton-stylyk.webp',
    linkedin: 'https://www.linkedin.com/in/anton-stylyk-3ba109295',
  },
  {
    name: 'Dr Jennifer Winingder',
    role: 'Embodied Wisdom & Healing',
    img: '/assets/people/jennifer-winingder.webp',
  },
  {
    name: 'Heidi Ohms',
    role: 'Cultural Bridge Builder',
    img: '/assets/people/heidi-ohms.webp',
  },
  {
    name: 'Will Cady',
    role: 'Reddit · author, Which Way Is North',
    img: '/assets/people/will-cady.webp',
    linkedin: 'https://www.linkedin.com/in/willcady',
    bio: 'Will Cady is a multimedia artist, cultural strategist, and founder of HEAL MVMNT, an initiative positioning Healing, Environments, Art, and Language as vital counterparts to STEM. An early leader at Reddit, he helped grow the platform into a billion-dollar business through deep insight into culture and creativity. His book Which Way Is North: A Creative Compass for Makers, Marketers, and Mystics was named a must-read by Inc Magazine and selected for The Next Big Idea Book Club.',
  },
  {
    name: 'Deven Raut',
    role: 'Kaiteki.AI · ex-Google Stadia',
    img: '/assets/people/deven-raut.webp',
    linkedin: 'https://www.linkedin.com/in/devenraut/',
    bio: 'Deven Raut is a polymath entrepreneur with deep experience building mission-critical technologies that power the modern internet. He co-founded CiiNOW, which evolved into Google Stadia, led the creation of Prisma SASE at Palo Alto Networks, and headed Network Security at Google. He is currently building Kaiteki.AI, reimagining digital consumption in healthier, more human-centered ways — work that reflects a lifelong devotion to soul, mind, and body wellness for all species.',
  },
  {
    name: 'Denise Roberson',
    role: 'Chief Purpose Officer, Omnicom',
    img: '/assets/people/denise-roberson.webp',
    linkedin: 'https://www.linkedin.com/in/deniseroberson/',
    bio: 'Denise Roberson serves as Chief Purpose Officer at Omnicom’s TBWA\\Chiat\\Day — the first role of its kind at the agency — helping C-suites and boards build the business case for purpose and embed it across their organizations. She is also the founder of Conspiracy of Love, a purpose-led B Corp consultancy, a marketing professor in Pepperdine’s Presidents & Key Executives MBA, and a doctoral researcher studying next-generation purpose and sustainability models.',
  },
  {
    name: 'Ren Menon',
    role: 'Co-Founder & CEO, OrthoFX',
    img: '/assets/people/ren-menon.webp',
    linkedin: 'https://www.linkedin.com/in/renmenon/',
    bio: 'Ren Menon is the Co-founder and CEO of OrthoFX, an orthodontic technology company advancing clear-aligner treatment through innovations in material science, digital workflows, and patient experience. He previously held senior leadership roles at Align Technology, contributing to global product innovation for Invisalign. The holder of several patents spanning orthodontics and consumer healthtech, Ren combines advanced materials, AI-driven workflows, and scalable care models to make healthcare more accessible.',
  },
  {
    name: 'Bita Zahedi Majd',
    role: 'Advocate for the Rights of Nature',
    img: '/assets/people/bita-zahedi-majd.webp',
    linkedin: 'https://www.linkedin.com/in/bita-zahedi-majd-3a4b46192',
  },
  {
    name: 'Anka Amaru',
    role: 'Regenerative Land Steward',
    img: '/assets/people/anka.webp',
    bio: 'Anka Amaru is a founding member of Ayllu Illa Wasi, a multi-generational, land-based heirloom culture center focused on reindigenizing, sustainability, and world bridging. With more than 20 years of experience working with Indigenous communities and a background in zero-point energy studies, she serves as bridge and site manager for the Aniwa Summit.',
  },
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

/* ---- §06 Invitation: the five-step entry ceremony along the river path ---- */
export interface Step {
  n: string;
  label: string;
}

export interface PathStep extends Step {
  /** Vertical position along the river (% of path container height). */
  top: number;
  /** Which side of the river the label sits on. */
  side: 'left' | 'right';
  /** Extra horizontal push away from the river (% of path width). */
  offset?: number;
}

export const RIVER_PATH_SRC = '/assets/img/river-path.webp';

export const steps: PathStep[] = [
  { n: '01', label: 'Personal invitation or nomination', top: 8, side: 'right' },
  { n: '02', label: 'Application to attend or to speak', top: 24, side: 'left', offset: 10 },
  { n: '03', label: 'A private interview call', top: 48, side: 'right' },
  { n: '04', label: 'Confirmation & entry to the guest channel', top: 68, side: 'left' },
  { n: '05', label: 'Arrival of changemakers at the land', top: 88, side: 'right' },
];
