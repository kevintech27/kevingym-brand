// KEVINGYM Brand System: central data for the personal site.
// Everything numeric, named, or contractual lives here so it stays verifiable
// and editable in one place. Kevin updates this file; the components only
// render what's here. Nothing is invented to "look" more impressive.

export const SITE_URL = 'https://kevingym.com';

// The rest of the ecosystem. The programme has its own domain: we never
// duplicate its sales page here, only link out to it.
export const ECOSYSTEM = {
  programme: 'https://kevingymworkout.com',
  programmeBuy: 'https://kevingymworkout.com/buy',
  app: 'https://app.kevingymworkout.com',
  links: 'https://links.kevingym.com',
};

// Site map. Drives the nav, the footer and public/sitemap.xml.
export const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/content', label: 'Content' },
  { path: '/partners', label: 'Partners' },
  { path: '/partners/brands', label: 'For brands' },
  { path: '/partners/gyms', label: 'For gyms' },
  { path: '/hybrid', label: 'HYBRID' },
  { path: '/contact', label: 'Contact' },
];

// Proof bar
// Single source of truth for the numbers shown under the hero.
// Checked against the public TikTok/Instagram profiles on 2026-07-27:
// TikTok 124.1K followers, 6.7M cumulative likes, pinned top video 8.9M views,
// Instagram 34K followers. Re-check every few weeks and round DOWN so the
// site never overstates.
export const STATS = [
  { id: 'tiktok', label: 'TikTok', value: '124K' },
  { id: 'instagram', label: 'Instagram', value: '34K' },
  // Keep the unit in the label, not the value: the value slot is set at
  // display size and "8.9M Views" wraps onto two lines there.
  { id: 'top_post', label: 'Top post views', value: '8.9M' },
  { id: 'likes', label: 'TikTok Likes', value: '6.7M' },
  { id: 'reach', label: 'Reach', value: 'FR + International' },
];

export const PERSON = {
  name: 'Kevin Nguena',
  handle: 'KEVINGYM',
  roles: ['Content Creator', 'Hybrid Athlete', 'Founder'],
  slogan: 'BUILT BY COURAGE',
  manifesto: [
    "I train because it's the one thing that never lies to me about the work I put in.",
    'Discipline over motivation, focus over noise. I build the same way I train: no shortcuts, no version that looks good but skips the reps.',
    "That's the standard behind everything with my name on it, on camera or in the code.",
  ],
  city: 'France',
};

export const SOCIALS = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@kevingym27',
    url: 'https://www.instagram.com/kevingym27/',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@kevingym27',
    url: 'https://www.tiktok.com/@kevingym27',
  },
];

// Story. Only the three photographs that actually exist in public/images are
// used here. Each caption describes what the photo is, not a story invented
// around it.
export const STORY = [
  {
    id: 'start',
    year: 'Where it started',
    image: '/images/kevin-start.jpg',
    alt: 'Kevin Nguena at the beginning of his training',
    body: 'No coach, no plan, no membership. Just the decision to start, and the willingness to be bad at it in public for as long as it took.',
  },
  {
    id: 'street',
    year: 'Street work',
    image: '/images/kevin-street.jpg',
    alt: 'Kevin Nguena training outdoors',
    body: 'Bars, bodyweight, whatever was available. Training outside taught me the part of the work that has nothing to do with equipment.',
  },
  {
    id: 'today',
    year: 'Today',
    image: '/images/kevin-today.jpg',
    alt: 'Kevin Nguena today',
    body: 'Same standard, more structure. Hybrid training, filmed and published, plus the platform behind it that I build and run myself.',
  },
];

// Content
// `image: null` on every item for now: labelled placeholders until real
// cinematic content is shot, rather than reusing old casual selfies.
export const WORK_ITEMS = [
  { id: 'w1', title: 'Hybrid physique', note: 'To add', image: null },
  { id: 'w2', title: 'Street workout', note: 'To add', image: null },
  { id: 'w3', title: 'Where it started', note: 'To add', image: null },
  { id: 'w4', title: 'Content shoot', note: 'To add', image: null },
  { id: 'w5', title: 'Training session', note: 'To add', image: null },
  { id: 'w6', title: 'Posing', note: 'To add', image: null },
];

export const DELIVERABLES = ['Instagram Reels', 'TikTok', 'UGC', 'Shoots', 'Long-form'];

// What a brand can book. Formats only, no pricing: price depends on scope and
// is quoted per campaign.
export const BRAND_SERVICES = [
  {
    id: 'campaign',
    title: 'Campaign content',
    body: 'Vertical-first video built around your product, shot and edited end to end. Delivered ready to post on my channels, yours, or both.',
  },
  {
    id: 'ugc',
    title: 'UGC and paid usage',
    body: 'Content produced for you to run as paid media, with usage rights agreed in writing before the shoot.',
  },
  {
    id: 'ambassador',
    title: 'Long-term ambassador',
    body: 'A season-long relationship rather than a one-off post. Consistent presence is what actually moves a fitness brand.',
  },
  {
    id: 'event',
    title: 'Events and appearances',
    body: 'Launches, store openings, training sessions, panels. Available in France and internationally.',
  },
];

export const GYM_SERVICES = [
  {
    id: 'shoot',
    title: 'Filming on site',
    body: 'Training content shot in your facility, with your name and location credited in the post and in the caption.',
  },
  {
    id: 'session',
    title: 'Open training session',
    body: 'A public session with your members, announced to my audience beforehand.',
  },
  {
    id: 'launch',
    title: 'Opening or relaunch',
    body: 'Coverage of a new club or a refit, from teaser to launch day.',
  },
  {
    id: 'homegym',
    title: 'Ongoing home gym',
    body: 'A recurring filming base, in exchange for consistent and credited exposure.',
  },
];

// How an inquiry is handled. Describes the actual process, no invented SLA.
export const PROCESS = [
  {
    id: 'p1',
    step: '01',
    title: 'You write',
    body: 'One email with the brand, the product, the window and the budget range.',
  },
  {
    id: 'p2',
    step: '02',
    title: 'I answer',
    body: 'I read and answer every professional inquiry myself. No agency in between.',
  },
  {
    id: 'p3',
    step: '03',
    title: 'We scope it',
    body: 'Formats, usage rights, timeline and price agreed in writing before anything is shot.',
  },
  {
    id: 'p4',
    step: '04',
    title: 'I deliver',
    body: 'Shot, edited and delivered to the agreed spec, with revisions in scope.',
  },
];

// Partnerships
// `desc: null` renders nothing rather than a fabricated deliverable. A brand
// that catches an invented result won't come back.
//
// `logo` is a path under `public/`, e.g. '/images/brands/dfyne.svg'. Until a
// file is there the wall falls back to the brand name set as a wordmark, so
// the section reads as finished either way, and a wrong path degrades to the
// wordmark too instead of showing a broken image.
//
// TODO KEVIN: use each brand's official press-kit asset, ideally a white or
// single-colour SVG on transparent. Don't pull logos off Google Images:
// they're trademarks, and the versions floating around are usually the wrong
// lockup, the wrong colour, or a low-res JPEG with a white box behind it.
//
// TODO KEVIN: confirm this list before launch. Keep only brands you have
// actually worked with. One unconfirmed name on this wall is the single thing
// most likely to cost you a real deal.
export const COLLABORATIONS = [
  { name: 'ARNTREAL', logo: null, desc: null, result: null },
  { name: 'Ultrahuman', logo: null, desc: null, result: null },
  { name: 'Under Armour', logo: null, desc: null, result: null },
  { name: 'DFYNE', logo: null, desc: null, result: null },
  { name: 'Prozis', logo: null, desc: null, result: null },
  { name: 'Vicinity', logo: null, desc: null, result: null },
];
export const COLLABORATION_SLOTS_OPEN = 0;

// Gyms with a confirmed relationship. Empty on purpose: the page renders an
// honest open state rather than inventing a partner.
export const GYM_PARTNERS = [];

// HYBRID
// The single training system. It is sold and delivered on kevingymworkout.com.
// This site only explains what it is and links out: never a second checkout,
// never a second price, never a competing canonical.
export const HYBRID = {
  name: 'HYBRID',
  tagline:
    'One system. Strength and conditioning in the same week, without either one cancelling the other.',
  body: [
    'HYBRID is the only training system I sell. There is no second programme, no beginner and advanced version sold separately, no tiers under different names.',
    'It is the way I train: heavy work and conditioning inside the same week, structured so the two support each other instead of competing.',
  ],
  // Deliberately no session counts, no week counts and no results claims here.
  // Those live on the programme site, which is the single source of truth.
  home: ECOSYSTEM.programme,
  buy: ECOSYSTEM.programmeBuy,
  app: ECOSYSTEM.app,
};

// Builder section. The one accent zone of the brand system.
// No stack list and no job-title label here on purpose. A brand manager
// doesn't buy "React, Supabase, Stripe". That's CV material, and it reframes
// the page as a developer's rather than a creator's. What survives is the one
// claim that works on both audiences: he built and runs the product himself.
export const BUILDER = {
  facts: [
    'Technology is the other thing I never got tired of. I like understanding how systems are put together, not just using them.',
    'KEVINGYM itself is a platform I built and run myself, end to end.',
  ],
};

// Contact
export const CONTACT_EMAIL = 'partnerships@kevingym.com';
// TODO KEVIN: drop the PDF at public/media-kit.pdf, then set this.
export const MEDIA_KIT_URL = null; // e.g. '/media-kit.pdf'

// Prefilled subjects. A static site has no backend, so the contact route is a
// real mailto rather than a form that silently drops messages.
export const CONTACT_INTENTS = [
  { id: 'campaign', label: 'Brand campaign', subject: 'Campaign inquiry' },
  { id: 'gym', label: 'Gym collaboration', subject: 'Gym collaboration' },
  { id: 'event', label: 'Event or appearance', subject: 'Event invitation' },
  { id: 'project', label: 'Project or other', subject: 'Project inquiry' },
];

export const mailto = (subject) =>
  `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
