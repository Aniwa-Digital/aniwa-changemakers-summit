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
  linkedin?: string;
  website?: string;
  instagram?: string;
}

type MemberOpts = {
  objectPosition?: string;
  linkedin?: string;
  website?: string;
  instagram?: string;
};

const member = (
  name: string,
  role: string,
  img: string,
  bio: string,
  opts: string | MemberOpts = '50% 18%',
): FellowshipMember => {
  const options = typeof opts === 'string' ? { objectPosition: opts } : opts;
  return {
    name,
    role,
    img: `/assets/people/${img}`,
    objectPosition: options.objectPosition ?? '50% 18%',
    bio,
    linkedin: options.linkedin,
    website: options.website,
    instagram: options.instagram,
  };
};

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
    'Oona Chaplin, granddaughter of the legendary Charlie Chaplin, is an acclaimed actress whose career spans some of the most influential film and television productions of the past decade, including Game of Thrones, Black Mirror, and, most recently, the Avatar franchise. As the fiery new antagonist Varang in Avatar, she has captivated audiences worldwide in a story that powerfully explores the struggle between Indigenous peoples and the colonial, extractive forces that threaten both culture and the natural world. Beyond her work on screen, Oona is an artist, a cultural bridge-builder, a land steward, and a mother. A longtime ally and advocate of the Huya Aniwa Foundation, she has stood alongside the movement for years, lending her voice and support to the protection of Indigenous wisdom, cultural resilience, and the living Earth.',
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
    'Will Cady is a multimedia artist, cultural strategist, and founder of HEAL MVMNT, an initiative positioning Healing, Environments, Art, and Language as vital counterparts to STEM. An early leader at Reddit Inc., he helped grow the platform into a billion-dollar business by applying deep insights into culture and creativity. His music has reached over 3 million streams and earned a regional Emmy award. Cady’s book, Which Way Is North: A Creative Compass for Makers, Marketers, and Mystics (distro Simon & Schuster), was named a must-read by Inc Magazine and selected for The Next Big Idea Book Club for its prescience as a human handbook for creativity in a world going AI.',
    { objectPosition: '50% 14%', linkedin: 'https://www.linkedin.com/in/willcady', website: 'https://willcady.com' },
  ),
  member(
    'Deven Raut',
    'Kaiteki.AI · ex-Google Stadia',
    'deven-raut.webp',
    'Deven Raut is a polymath entrepreneur with deep experience building and leading mission-critical technologies that power the modern internet. He co-founded CiiNOW, which evolved into Google Stadia, led the creation of Prisma SASE at Palo Alto Networks, and headed Network Security at Google. He is currently building Kaiteki.AI, a startup focused on reimagining digital consumption in healthier, more human-centered ways. In parallel, Deven created DeveniTea Chai, a 21-component adaptogenic sugar- and dairy-free chai, and is developing the KamDev line of healthier alternative products. His work reflects a lifelong devotion to soul, mind, and body wellness for all species.',
    { objectPosition: '50% 14%', linkedin: 'https://www.linkedin.com/in/devenraut/' },
  ),
  member(
    'Denise Roberson',
    'Chief Purpose Officer, Omnicom',
    'denise-roberson.webp',
    'Denise Roberson serves as Chief Purpose Officer at Omnicom’s TBWA\\Chiat\\Day — the first role of its kind at the agency — helping C-suites and boards build the business case for purpose and embed it across their organizations. She is also the founder of Conspiracy of Love, a purpose-led B Corp consultancy, a marketing professor in Pepperdine’s Presidents & Key Executives MBA, and a doctoral researcher studying next-generation purpose and sustainability models.',
    { linkedin: 'https://www.linkedin.com/in/deniseroberson/' },
  ),
  member(
    'Ren Menon',
    'Co-Founder & CEO, OrthoFX',
    'ren-menon.webp',
    'Ren Menon is the Co-founder and CEO of OrthoFX (orthofx.com), an orthodontic technology company focused on advancing clear aligner treatment through innovations in material science, digital workflows, and patient experience. Prior to founding OrthoFX, he held senior leadership roles at Align Technology, where he contributed to global product innovation and commercialization initiatives for Invisalign. A visionary leader in orthodontics and healthcare technology, Ren is known for challenging conventional thinking and pushing the industry toward more patient-friendly, technology-enabled care models. He holds several patents spanning orthodontics, healthcare technologies, and consumer healthtech, including saliva-based diagnostic and monitoring concepts. His work combines advanced materials, software, AI-driven workflows, and scalable care delivery models to improve treatment predictability, patient engagement, and healthcare accessibility.',
    { linkedin: 'https://www.linkedin.com/in/renmenon/', website: 'https://orthofx.com' },
  ),
  member(
    'Ruslan Gafarov',
    'Founder & CEO, SF Innovation Hub',
    'ruslan-gafarov.webp',
    'Ruslan Gafarov is the founder and CEO of San Francisco Innovation Hub (SFIH). An entrepreneur with 15+ years of experience and the author of three books on organizational culture, he has been building entrepreneurial communities in Silicon Valley since 2016.',
    { linkedin: 'https://www.linkedin.com/in/malikone/' },
  ),
];

/* Right strand — the wisdom keepers, in leadership's order. */
export const fellowshipRight: FellowshipMember[] = [
  member(
    'Kumu Ramsay Taum',
    'Hoʻoponopono lineage carrier',
    'kumu-ramsay-taum.webp',
    'Mentored and trained by respected kūpuna (elders), Ramsay is a practitioner and instructor of several Native Hawaiian practices: Hoʻoponopono (stress release and mediation), lomi haha (body alignment), and Kaihewalu Lua (Hawaiian combat/battle art). In 2009, Kumu Taum was recognized and honored by the University of Hawaiʻi as a Star of Oceania — an honor presented every three years to extraordinary individuals of Oceania for their work and service-related contributions to raising greater awareness of Oceania and its people. Recognized locally, nationally, and internationally for transformational leadership in sustainability and cultural and place-based values integration into contemporary business models, Ramsay advocates team building, strategic partnerships, community brilliance, and creative thinking. He is a recognized cultural resource, sought-after keynote speaker, lecturer, trainer, and facilitator — especially effective working with Hawaiʻi’s industries where he integrates Native Hawaiian cultural values and principles into contemporary business.',
    {
      objectPosition: '50% 14%',
      linkedin: 'https://www.linkedin.com/in/ramsaytaum',
      instagram: 'https://www.instagram.com/ramsaytaum',
      website: 'https://www.ramsaytaum.com/',
    },
  ),
  member(
    'Mona Polacca',
    'Council of 13 Indigenous Grandmothers',
    'mona-polacca.webp',
    'Mona Polacca — Hopi, Tewa, and Havasupai — is an internationally recognized Indigenous leader, spiritual elder, educator, policy advocate, and water protector from Arizona with more than three decades of experience advancing Indigenous rights, environmental justice, and community wellbeing. From an early age, she has dedicated her life to social justice and the revitalization of Indigenous cultures, traditions, and knowledge systems. An author in the social sciences and a respected voice in Indigenous leadership, Mona has served in tribal governance, including as Treasurer for her tribe, and has held leadership roles in numerous initiatives focused on Indigenous self-determination and community development. A founding member of the International Council of Thirteen Indigenous Grandmothers, Mona has gained international recognition as a spiritual elder, wisdom keeper, and advocate for Indigenous Peoples. She has represented Indigenous communities at the United Nations and other global forums, contributing to discussions on water protection, climate action, human rights, and Indigenous sovereignty. Through her leadership in Indigenous water ethics and environmental stewardship, Mona has helped elevate traditional ecological knowledge and Indigenous-led solutions to some of the world’s most pressing environmental challenges.',
    {
      objectPosition: '50% 16%',
      linkedin: 'https://www.linkedin.com/in/mona-polacca-31417b16/',
      website: 'https://www.huyaaniwa.org/team/mona-polacca',
    },
  ),
  member(
    'Matsini Yawanawá',
    'Chief of Mutum Village · Yawanawá',
    'matsini-yawanawa.webp',
    'Matsini Yawanawá, chief and spiritual leader of Mutum village, descends from an unbroken lineage of Pajés (master shamans) and trained under the legendary Pajé Tata, who helped restore Yawanawá traditions after years of suppression. The Yawanawá, native to Acre, Brazil, have long safeguarded their land and spiritual heritage despite near extinction following early contact with outsiders. Matsini works year-round welcoming students to his village while also sharing his wisdom abroad. He is joined by his wife, Manxyvake Yawanawá, and their children Kuru and Kenesay, all gifted musicians and spiritual practitioners. Together, they carry the ancestral prayers and teachings of their people, aiming to build global community and support sustainable projects in their village.',
    { objectPosition: '50% 42%', website: 'https://digital.aniwa.co/courses/rape-ceremony-with-matsini' },
  ),
  member(
    'Chenoa Egawa',
    'Coast Salish · Lummi & S’Klallam Nations',
    'chenoa-egawa.webp',
    'Chenoa Egawa is Coast Salish of the Lummi and S’Klallam Nations of Washington State. She is a ceremonial leader and healer; singer and composer of traditional medicine songs; storyteller and published children’s book author and illustrator; lifelong student and Master Teacher of Qigong; environmental activist and speaker; and nature photographer who enjoys witnessing sacred moments in time through her lens. Through her work, she is dedicated to bringing healing to our Mother Earth, and to people of all cultures, backgrounds, and origins through the recognition of our shared experiences as human beings. One of her principal teachings today is the importance of preserving, protecting, and sharing the wisdom and ways of life she has learned from her ancestors, elders, and teachers that benefit the health, well-being, and protection of all life on our Mother Earth. Being multicultural and multilingual, Chenoa bridges understanding across cultures, guiding us back into harmony with Nature, the Seasons, and the Elements that give us life. She serves as a voice to bring Indigenous wisdom and perspectives to the world at a time when these teachings are particularly poignant reminders of our shared responsibility to live with respect and care for ourselves, one another, our planet, and future generations.',
    {
      objectPosition: '50% 20%',
      instagram: 'https://www.instagram.com/chenoa.egawa',
      website: 'https://chenoaegawa.com/',
    },
  ),
  member(
    'Mamo Cencio',
    'Kogi Mamo · Sierra Nevada de Santa Marta',
    'mamo-cencio.webp',
    'Mamo Cencio is a Kogi Mamo who is a botanist with an extensive knowledge of the native species of the Sierra. He is also a teacher of medicinal plants for the Kogis. As a doctor of Ancestral Medicine he is constantly traveling to distant villages in Kogi territory to take care of his people. He offers his services as a doctor, priest, counselor, and spiritual leader for a large group of people living across a wide area of Kogi territory in the Sierra Nevada of Santa Marta. He is also a musician who plays different Tayrona musical instruments and teaches his people the ancestral songs of the Kogi Nation. He is authorized to use the Jatuquá, a sacred method of divination by water.',
    '50% 22%',
  ),
  member(
    'Nan Amalia Tum Xinico',
    'Maya Kaqchikel practitioner',
    'nana-amalia.webp',
    'Nan Amalia is a gifted healer, naturopath, and renowned spiritual leader and teacher; member of the commission of the sacred sites in Guatemala — COLUSAG; founder of the elder council Iq’B’alm; member of the council of elders and political association of Maya women MOLOJ; and spiritual assessor of the association of women KAKLA. Nan Amalia works alongside her husband Tat Mario on healing, purification, and spiritual balancing ceremonies, Maya astrology readings, and other traditional practices and ceremonies.',
    '50% 16%',
  ),
  member(
    'Tat Mario Ovalle',
    'Maya K’iché spiritual guide',
    'tata-mario.webp',
    'Tat Mario is a renowned spiritual leader, naturopath, painter, and talented traditional musician — he plays the marimba, drums, caracol, and flute. Founder of the council of Ajq’ijab’ (spiritual guides) Iq’ B’alam and accessor of the Indigenous Townhall of Santa Lucía Utatlán, Sololá, he gives conferences about medicinal plants, Maya cosmology and history, and the identity and rights of Indigenous people. He is also a primary school teacher. Tata Mario works alongside his wife Nana Amalia on healing, purification, and spiritual balancing ceremonies, Maya astrology readings, and other traditional rituals.',
    '50% 30%',
  ),
  member(
    'Joseph David Osage',
    'Cheyenne · Keeper of the Blue Sky Bundle',
    'joseph-david-osage.webp',
    'Arrow priest and holder of the Blue Sky Bundle of the Cheyenne. Born in western Oklahoma, Joseph David is full-blood Tsitsistas (Cheyenne). He was raised in the community known as Red Moon, Hammon, Oklahoma. Joseph David has lived the traditional Cheyenne life from birth, hearing the stories of many aspects of his people’s travels through time and across the continent. He has participated in the sacrificial rites that give him great responsibility to his people. He was seated as ceremonial chief as well as earning the position of one of sixteen sacred arrow priests and, more recently, was appointed as the holder of the Blue Sky Bundle — the second-highest position in the Cheyenne tribe — making him the keeper of blue skies, the one in charge of the weather and rain prayers.',
    '50% 28%',
  ),
  member(
    'Vivien Vilela',
    'Founder & CEO, Aniwa',
    'vivien-vilela.webp',
    'Vivien Vilela has over 14 years of experience pioneering ethical relations with Indigenous peoples across the Americas. She has played a crucial role in supporting the preservation of Indigenous cultures and global grassroots efforts to protect and restore wild spaces. Born and raised in Brazil, Vivien has dedicated her life to her spiritual studies under the mentorship of some of the most respected Indigenous elders from South, Central, and North America. Through this work, Vivien founded Aniwa, an international platform that shares Indigenous wisdom and amplifies the voices of Indigenous leaders through an online education portal, an annual gathering, and in-person retreats. Alongside her husband, she has taken a sacred oath and commitment in the Wixárika tradition to continue to learn and serve her life as a Marakame — one that can heal, sing, and dream. This led her to open various spiritual commitments with sacred places around Mexico under the guidance of world-renowned Marakame Don Eustolio Rivera De La Cruz. Driven by her profound reverence for Indigenous culture and medicine, Vivien’s vision expanded to create the Huya Aniwa Foundation and Institute, dedicated to her continued efforts to preserve sacred land and live in alliance with native collectives.',
    { linkedin: 'https://www.linkedin.com/in/vivienvilela/', website: 'https://www.aniwa.co' },
  ),
  member(
    'Matzuwa Oscar',
    'Yoreme · Huya Aniwa Foundation',
    'matzuwa-oscar.webp',
    'Matzuwa Oscar comes from the Yoreme people, deer nation of Sinaloa, Mexico. He has been a pilgrim of the Wirikuta desert since 2005, learning within the Wixárika tradition, and has taken the sacred oath as a Mara’akame, or spiritual leader. Matzuwa has undergone various initiations and vision quests which also granted him the fire to run sweat lodges. Matzuwa is an anthropologist specialized in traditional medicine, and a traditional singer and musician. His passion for culture exchange took him around the world, where he shared and learned from different Indigenous communities. Inspired by his experiences, he established the Huya Aniwa Institute, dedicated to implementing sustainable land stewardship and sacred medicine conservation practices. Through the institute, Matzuwa continues his mission to honor and protect the Earth’s natural heritage while nurturing cultural diversity and traditional knowledge.',
    {
      objectPosition: '50% 14%',
      website: 'https://www.huyaaniwa.org/team/oscar',
      instagram: 'https://www.instagram.com/matzuwaoscar/',
    },
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
  /** Optional override when a logo needs a custom display size. */
  height?: number;
  maxWidth?: number;
}

export const partnerLogos: PartnerLogo[] = [
  { name: 'Google', src: '/assets/logos/google.webp', large: false },
  { name: 'Apple', src: '/assets/logos/apple.webp', large: false, height: 50, maxWidth: 120 },
  { name: 'Disney+', src: '/assets/logos/disney.webp', large: true, height: 88, maxWidth: 220 },
  { name: 'Netflix', src: '/assets/logos/netflix.webp', large: true },
  { name: 'Adobe', src: '/assets/logos/adobe.webp', large: false },
  { name: 'Palo Alto Networks', src: '/assets/logos/palo-alto-networks.webp', large: true },
  { name: 'Pachamama Alliance', src: '/assets/logos/pachamama-alliance.webp', large: true },
  { name: 'Pulse Fund', src: '/assets/logos/pulse-fund.png', large: true, height: 52, maxWidth: 140 },
  { name: 'National Geographic', src: '/assets/logos/natgeo.webp', large: true },
  { name: 'Reddit', src: '/assets/logos/reddit.webp', large: false, height: 50, maxWidth: 130 },
  { name: 'Block', src: '/assets/logos/block.webp', large: true },
  { name: 'Stanford', src: '/assets/logos/stanford.webp', large: true },
  { name: 'Amazon', src: '/assets/logos/amazon.webp', large: false },
  { name: 'PepsiCo', src: '/assets/logos/pepsico.webp', large: true },
  { name: "McDonald's", src: '/assets/logos/mcdonalds.webp', large: false },
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
    description: 'Indigenous spirituality & the planetary polycrisis.',
    longDescription:
      'Listen to the spiritual teachings of Original Peoples as they respond to climate collapse, biodiversity loss, and the converging crises of our time. This element holds ceremony, prayer, and the sacred relationship between humanity and Water as a source of planetary perspective.',
    img: '/assets/elements/water.webp',
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Regenerative economies & nature finance.',
    longDescription:
      'Catalyze capital toward regeneration. Discussions and workshops on nature finance, circular economies, and the economic architectures that can shift us from extraction to mutual benefit with the living world.',
    img: '/assets/elements/fire.webp',
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Personal wellness & the evolution of consciousness.',
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
  website?: string;
  instagram?: string;
  /** Short bio shown in the click-to-open popup when present. */
  bio?: string;
  open?: boolean;
  left: number; // % within the ring square
  top: number; // %
}

const RING_RADIUS = 42;

type RingMember = {
  name?: string;
  role?: string;
  img?: string;
  linkedin?: string;
  website?: string;
  instagram?: string;
  bio?: string;
  open?: boolean;
};

const ringMembers: RingMember[] = [
  {
    name: 'Vivien Vilela',
    role: 'Founder & CEO, Aniwa',
    img: '/assets/people/vivien-vilela.webp',
    linkedin: 'https://www.linkedin.com/in/vivienvilela/',
    website: 'https://www.aniwa.co',
    bio: 'Vivien Vilela has over 14 years of experience pioneering ethical relations with Indigenous peoples across the Americas. She has played a crucial role in supporting the preservation of Indigenous cultures and global grassroots efforts to protect and restore wild spaces. Born and raised in Brazil, Vivien has dedicated her life to her spiritual studies under the mentorship of some of the most respected Indigenous elders from South, Central, and North America. Through this work, Vivien founded Aniwa, an international platform that shares Indigenous wisdom and amplifies the voices of Indigenous leaders through an online education portal, an annual gathering, and in-person retreats. Alongside her husband, she has taken a sacred oath and commitment in the Wixárika tradition to continue to learn and serve her life as a Marakame — one that can heal, sing, and dream. This led her to open various spiritual commitments with sacred places around Mexico under the guidance of world-renowned Marakame Don Eustolio Rivera De La Cruz. Driven by her profound reverence for Indigenous culture and medicine, Vivien’s vision expanded to create the Huya Aniwa Foundation and Institute, dedicated to her continued efforts to preserve sacred land and live in alliance with native collectives.',
  },
  {
    name: 'Matzuwa Oscar',
    role: 'Yoreme · Huya Aniwa Foundation',
    img: '/assets/people/matzuwa-oscar.webp',
    website: 'https://www.huyaaniwa.org/team/oscar',
    instagram: 'https://www.instagram.com/matzuwaoscar/',
    bio: 'Matzuwa Oscar comes from the Yoreme people, deer nation of Sinaloa, Mexico. He has been a pilgrim of the Wirikuta desert since 2005, learning within the Wixárika tradition, and has taken the sacred oath as a Mara’akame, or spiritual leader. Matzuwa has undergone various initiations and vision quests which also granted him the fire to run sweat lodges. Matzuwa is an anthropologist specialized in traditional medicine, and a traditional singer and musician. His passion for culture exchange took him around the world, where he shared and learned from different Indigenous communities. Inspired by his experiences, he established the Huya Aniwa Institute, dedicated to implementing sustainable land stewardship and sacred medicine conservation practices. Through the institute, Matzuwa continues his mission to honor and protect the Earth’s natural heritage while nurturing cultural diversity and traditional knowledge.',
  },
  {
    name: 'Ruslan Gafarov',
    role: 'Founder & CEO, SF Innovation Hub',
    img: '/assets/people/ruslan-gafarov.webp',
    linkedin: 'https://www.linkedin.com/in/malikone/',
    bio: 'Ruslan Gafarov is the founder and CEO of San Francisco Innovation Hub (SFIH). An entrepreneur with 15+ years of experience and the author of three books on organizational culture, he has been building entrepreneurial communities in Silicon Valley since 2016.',
  },
  {
    name: 'Oona Chaplin',
    role: 'Actor. Avatar. Game of Thrones',
    img: '/assets/people/oona-chaplin.webp',
    bio: 'Oona Chaplin, granddaughter of the legendary Charlie Chaplin, is an acclaimed actress whose career spans some of the most influential film and television productions of the past decade, including Game of Thrones, Black Mirror, and, most recently, the Avatar franchise. As the fiery new antagonist Varang in Avatar, she has captivated audiences worldwide in a story that powerfully explores the struggle between Indigenous peoples and the colonial, extractive forces that threaten both culture and the natural world. Beyond her work on screen, Oona is an artist, a cultural bridge-builder, a land steward, and a mother. A longtime ally and advocate of the Huya Aniwa Foundation, she has stood alongside the movement for years, lending her voice and support to the protection of Indigenous wisdom, cultural resilience, and the living Earth.',
  },
  {
    name: 'Mitch Kirsch',
    role: 'Executive Producer, Live Events',
    img: '/assets/people/mitch-kirsch.webp',
    linkedin: 'https://www.linkedin.com/in/mitchkirsch/',
    bio: 'Mitch Kirsch has 32 years of experience in the event industry, overseeing production of immersive activations, TV specials, festivals, and global events in 30 different countries on 5 continents, including 13 Olympic Games, 6 Super Bowls, 4 World Cups, and 3 Rugby World Cups. Mitch was Executive Producer of Vice & Intel’s Creators Project, an award-winning global event series fusing music, technology and art, producing free events for up to 20,000 participants in 5 countries. In 2013 Mitch produced Station to Station, a ground-breaking art & music initiative that took a custom train across the U.S. He directed Talent Operations for over a hundred major TV Music Specials for MTV Latin America, MTV Asia, VH1, CMT, MTV Africa, and MTV Europe. He is Executive Producer for the Summit Series, Global Talent Producer for World Cup 2026, and produced the Aniwa Gathering and Created by Sound. Most importantly, he has lent his experience and energy to numerous charitable organizations to raise funds and awareness for the Rainforest Foundation, Pediatric AIDS, PETA, Virgin Mobile’s RE*Generation, MTV Asia Aid, Covenant House, Fulfillment Fund, America: Tribute to Heroes, 9/11 Concert for NYC, and others.',
  },
  {
    name: 'Angela Katragadda',
    role: 'Sacred Stewardship Leader',
    img: '/assets/people/angela-katragadda.webp',
    bio: 'Angela Katragadda is a regenerative designer for healthier homes, herbalist, philanthropist, and mother. She spent 15 years working in healthcare as a pediatric intensive care nurse at University of California, Los Angeles and San Francisco. During that time she became deeply aware of how environmental factors impact health, especially for children and vulnerable populations. Struggling with her own chronic health issues, she began to explore the intersection of wellness, sustainable design, and plant medicine. In 2020, Angela founded Heritage Modern Design, an eco-conscious interior design company. In her practice she considers the impact of material choices on both human well-being and Mother Earth in all of her projects. Angela is passionate about fostering native species to support pollinators and healing burn scars and the ecosystem in Los Angeles — interests that align with Aniwa’s mission of land stewardship. Angela is a trustee of the Huya Aniwa Foundation and assists in fundraising efforts to support their mission.',
  },
  {
    name: 'Anton Stylyk',
    role: 'Cross-Industry Partnerships',
    img: '/assets/people/anton-stylyk.webp',
    linkedin: 'https://www.linkedin.com/in/anton-stylyk-3ba109295',
    bio: 'Anton Stylyk is a serial entrepreneur, crypto investor, art appreciator, support player, and philanthropist. He brings to the room an entrepreneurial perspective, cross-industry thinking, strategic partnerships, and optimism.',
  },
  {
    name: 'Dr Jennifer Winingder',
    role: 'Embodied Wisdom & Healing',
    img: '/assets/people/jennifer-winingder.webp',
    bio: 'Dr. Jennifer Winingder is a lifelong spiritual seeker, student and practitioner of embodied wisdom and philosophy. Her background in ministry, chaplaincy, teaching, and counseling focused on pastoral and spiritual care in multiple settings. Her passion for social justice, equity for all, and advocating for human rights — combined with her spiritual skills and experience — led her to leave institutional and organized religion that has been a colonizing force historically and globally, and that has disconnected us from our embodied nature and intuition. Jennifer’s path led her to become a student of Indigenous philosophy, wisdom, and practices, and to learn somatic healing practices that help people develop a deeply intuitive and loving relationship with their bodies, heal deeply held trauma, and experience the fullness, joy, and wonder of being alive on this beautiful planet. She now leads healing and wellness retreats in Western North Carolina that engage somatic techniques communities have practiced since before time began — including breathwork, meditation, sound healing, movement, energy work such as Reiki, tai chi, and ERT (emotional release therapy), as well as plant medicine, counseling, immersive time in nature, and group processing. Her two doctorates are in trauma-informed pastoral counseling from Emory University and multifaith spiritual direction. Her certificates include Reiki I and II, Sound Healing, rebirthing breathwork, and yoga 200YTT, and she will be certified in ERT in October 2026. She is developing a nature and retreat center in Western North Carolina in partnership with Buffalo Creek nonprofit — a partnership of Indian American and Indigenous tribal members from the global south — hosting the first Sundance in the Southeast in over 200 years in August 2026 following Lakota traditions, as well as regular inipi (sweat lodge), hanblecheyapi (vision quest), and plant medicine ceremonies led by Indigenous leaders.',
  },
  {
    name: 'Heidi Ohms',
    role: 'Cultural Bridge Builder',
    img: '/assets/people/heidi-ohms.webp',
    bio: 'Heidi Ohms grew up in Palo Alto, immersed from childhood in Stanford’s climate and energy world through her mother, a longtime climate educator and clean energy investor. She absorbed the questions and culture of climate innovation from an early age. She has spent her life seeking out integrative and unconventional forms of education, studying at Quest University in British Columbia and Naropa University, both committed to interdisciplinary, embodied, and contemplative approaches to learning. She has contributed to the Eden Project in the UK, the Rocky Mountain Institute, and The Foster, a museum housing Tony Foster’s watercolor wilderness journeys, where she developed curriculum on the lands, Indigenous peoples, and ecological threats at the heart of its collection. Heidi joins the Founders Circle bringing the perspective of someone shaped by both worlds — raised inside the climate innovation culture and formed by the slow, embodied work of traditional wisdom. She believes the healing our world needs cannot come from top-down innovation alone or bottom-up tradition alone, but only from the weaving of both at every scale. She is inspired to bridge scientific, traditional, embodied, and ancestral knowledge as a foundation for moving collectively toward a regenerative plane.',
  },
  {
    name: 'Will Cady',
    role: 'Reddit · author, Which Way Is North',
    img: '/assets/people/will-cady.webp',
    linkedin: 'https://www.linkedin.com/in/willcady',
    website: 'https://willcady.com',
    bio: 'Will Cady is a multimedia artist, cultural strategist, and founder of HEAL MVMNT, an initiative positioning Healing, Environments, Art, and Language as vital counterparts to STEM. An early leader at Reddit Inc., he helped grow the platform into a billion-dollar business by applying deep insights into culture and creativity. His music has reached over 3 million streams and earned a regional Emmy award. Cady’s book, Which Way Is North: A Creative Compass for Makers, Marketers, and Mystics (distro Simon & Schuster), was named a must-read by Inc Magazine and selected for The Next Big Idea Book Club for its prescience as a human handbook for creativity in a world going AI.',
  },
  {
    name: 'Deven Raut',
    role: 'Kaiteki.AI · ex-Google Stadia',
    img: '/assets/people/deven-raut.webp',
    linkedin: 'https://www.linkedin.com/in/devenraut/',
    bio: 'Deven Raut is a polymath entrepreneur with deep experience building and leading mission-critical technologies that power the modern internet. He co-founded CiiNOW, which evolved into Google Stadia, led the creation of Prisma SASE at Palo Alto Networks, and headed Network Security at Google. He is currently building Kaiteki.AI, a startup focused on reimagining digital consumption in healthier, more human-centered ways. In parallel, Deven created DeveniTea Chai, a 21-component adaptogenic sugar- and dairy-free chai, and is developing the KamDev line of healthier alternative products. His work reflects a lifelong devotion to soul, mind, and body wellness for all species.',
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
    website: 'https://orthofx.com',
    bio: 'Ren Menon is the Co-founder and CEO of OrthoFX (orthofx.com), an orthodontic technology company focused on advancing clear aligner treatment through innovations in material science, digital workflows, and patient experience. Prior to founding OrthoFX, he held senior leadership roles at Align Technology, where he contributed to global product innovation and commercialization initiatives for Invisalign. A visionary leader in orthodontics and healthcare technology, Ren is known for challenging conventional thinking and pushing the industry toward more patient-friendly, technology-enabled care models. He holds several patents spanning orthodontics, healthcare technologies, and consumer healthtech, including saliva-based diagnostic and monitoring concepts. His work combines advanced materials, software, AI-driven workflows, and scalable care delivery models to improve treatment predictability, patient engagement, and healthcare accessibility.',
  },
  {
    name: 'Bita Zahedi Majd',
    role: 'Rights of Nature · Indigenous Sovereignty',
    img: '/assets/people/bita-zahedi-majd.webp',
    linkedin: 'https://www.linkedin.com/in/bita-zahedi-majd-3a4b46192/',
    bio: 'Bita Zahedi Majd is a Rights of Nature advocate, Indigenous sovereignty director, biodiversity conservation strategist, and lifelong student of the living world. With a background spanning environmental policy, anthropological studies, conservationism, and legal advocacy, she has spent nearly two decades as a personal student of Indigenous leaders, wisdom keepers, and plant medicine teachers across North and South America, India, and Africa. She currently serves as Executive Director and Founder of Aluna Alliance, Ventures & Partnerships Consultant with the Sierra Club, and Ambassador to the International Space Federation — roles that extend her work as a Chief Impact Officer grounded in both academic rigor and embodied commitment. Fiercely dedicated to the protection of Earth’s sacred elements — its waters, forests, soils, wildlife, plant medicines, and First Nation peoples — she brings planetary stewardship to every scale of her practice.',
  },
  {
    name: 'Anka Amaru',
    role: 'Regenerative Land Steward',
    img: '/assets/people/anka.webp',
    bio: 'Anka Amaru is a founding member of Ayllu Illa Wasi, a multi-generational, land-based heirloom culture center focused on reindigenizing, sustainability, and world bridging. Bringing over 20 years of experience working with Indigenous communities as well as a background in zero-point energy studies, he serves as host and bridge for the Aniwa Summit.',
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

/* ---- §06 Invitation: the four-step entry path ---- */
export interface Step {
  n: string;
  label: string;
}

export const steps: Step[] = [
  { n: '01', label: 'Receive invitation code' },
  { n: '02', label: 'Apply to attend' },
  { n: '03', label: 'Join the Changemakers community' },
  { n: '04', label: 'Arrive on the land' },
];
