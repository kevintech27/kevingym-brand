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
  { path: '/hybrid', label: 'HYBRID SYSTEM' },
  { path: '/contact', label: 'Contact' },
];

// Proof bar
// Single source of truth for the numbers shown under the hero.
//
// Cumulative figures only, on purpose. A follower count and a lifetime like
// count never fall, so this bar cannot turn into a lie between two updates.
// Rolling figures (30-day views, engagement rate) belong in the media kit,
// which is dated and sent per campaign: on a page that stays up for months,
// a rolling number that drops after a quiet month argues against Kevin.
//
// Always round DOWN. A figure a brand checks and finds slightly better than
// stated costs nothing. The reverse costs the deal.
//
// STATS_UPDATED is what makes the whole bar defensible. An undated figure
// that is two months old reads as a lie when verified; the same figure with a
// date next to it reads as rigour, and buys the right to update this every
// two or three months rather than every week.
export const STATS_UPDATED = 'August 2026';

// Confirmed by Kevin on 2026-08-15: TikTok 135K, Instagram 41.9K.
// Instagram is stated at 41K, not 41.9K, per the round-down rule above: a
// follower count moves daily and 41K stays true through a quiet week.
//
// Top post views and lifetime likes were last checked on the public profiles
// 2026-07-27 and are not re-confirmed here. Both are cumulative, so an old
// reading can only understate them, which is the safe direction.
export const STATS = [
  { id: 'tiktok', label: 'TikTok', value: '135K' },
  { id: 'instagram', label: 'Instagram', value: '41K' },
  // Keep the unit in the label, not the value: the value slot is set at
  // display size and "8.9M Views" wraps onto two lines there.
  { id: 'top_post', label: 'Top post views', value: '8.9M' },
  { id: 'likes', label: 'TikTok Likes', value: '6.7M' },
  { id: 'reach', label: 'Reach', value: 'FR + International' },
];

// La provenance des chiffres, en clair. Le site ne l'affiche pas, le media kit
// si: un PDF part par mail, se fait suivre, et se retrouve lu trois mois plus
// tard par quelqu'un qui n'a jamais parle a Kevin. Une phrase qui dit quand et
// ou chaque chiffre a ete releve est ce qui le fait survivre a cette lecture.
//
// A mettre a jour en meme temps que STATS. C'est une chaine et pas un
// commentaire precisement pour que scripts/media-kit.js puisse la lire.
export const STATS_SOURCE =
  'Follower counts confirmed 15 August 2026. Top post views and lifetime likes checked on the public profiles 27 July 2026. All figures cumulative and rounded down.';

export const PERSON = {
  name: 'Kevin Nguena',
  handle: 'KEVINGYM',
  roles: ['Content Creator', 'Athlete', 'Founder'],
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

// Story. Each caption describes what the photo is, not a story invented
// around it.
//
// A chapter with `image: null` renders as a full-width text block, not as an
// empty frame. That is what lets a weak photograph be pulled without losing
// the paragraph it carried, and without shipping a placeholder in its place.
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
    alt: 'Kevin Nguena at an outdoor calisthenics park, pull-up bars behind him',
    body: 'Bars, bodyweight, whatever was available. Training outside taught me the part of the work that has nothing to do with equipment.',
  },
  {
    id: 'today',
    // The strongest slot on /about: it closes the story, so it carries a shot
    // frame rather than the first spare photo available. Peter Simmons,
    // June 2026.
    year: 'Today',
    image: '/images/kevin-today.jpg',
    alt: 'Kevin Nguena leaning on a rail under a steel bridge',
    body: 'Same standard, more structure. Hybrid training, filmed and published, plus the platform behind it that I build and run myself.',
  },
];

// Content
// The /content gallery. A tile renders only when its `image` is set, and the
// whole gallery disappears when none are: an empty frame captioned "photo to
// add" is a placeholder shipped to production, and this site does not ship
// those. To swap a tile, replace the file at `file` and keep the path.
//
// Format for every tile: vertical 3:4, exported at 1080 x 1440 or larger,
// JPEG, under 400 KB. 3:4 and not 9:16: the grid crops to 3:4, so a 9:16
// export loses the top and bottom of the frame. Shoot wider than you need.
//
// Three tiles, not six. The weakest photo in a grid sets the perceived
// standard, never the best one, so six slots only create pressure to fill two
// of them with something mediocre. Three also reads as a chosen triptych
// rather than a gallery with gaps in it.
//
// The three cover three different registers on purpose. A page of three
// physique shots says Kevin sells his body; a page showing an effort frame, a
// physique and a video still says he sells production. That is what a brand
// is actually buying. Keep that split when swapping a tile.
export const WORK_ITEMS = [
  {
    id: 'w1',
    title: 'Training, shot in Paris',
    file: '/images/work/paris-training.jpg',
    alt: 'Kevin Nguena in a sprint start in front of a stone facade',
    image: '/images/work/paris-training.jpg',
  },
  {
    id: 'w2',
    title: 'Physique',
    file: '/images/work/physique.jpg',
    alt: 'Kevin Nguena, full physique, hand held out to the camera',
    image: '/images/work/physique.jpg',
  },
  {
    id: 'w3',
    title: 'Vertical video',
    file: '/images/work/vertical-video.jpg',
    alt: 'Frame from a vertical video filmed and edited by Kevin Nguena, sprinting on an outdoor track',
    image: '/images/work/vertical-video.jpg',
  },
];

// Hero portrait on the home page.
// Set to null and the hero falls back to type only: eyebrow, name, slogan,
// actions. That version stands on its own, which is exactly why an empty
// labelled frame is never worth shipping in its place.
//
// Format: vertical 3:4, 1200 x 1600 or larger, JPEG under 500 KB. It renders
// at up to 400px wide, so 1200px covers a 3x screen. It is the first thing a
// brand manager sees: it has to be a shot frame, not a phone selfie enlarged.
export const HERO = {
  file: '/images/kevin-hero.jpg',
  alt: 'Kevin Nguena, portrait',
  image: '/images/kevin-hero.jpg',
};

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
// Every name below was checked with Kevin on 2026-08-15, against one test:
// something was exchanged in both directions. Either the brand paid, or it
// sent product, or Kevin produced and delivered content for it. Each name
// here is backed by a document or a shipment he can point to.
//
// The section is titled "Brands I've worked with", in the past tense, so a
// finished relationship belongs on the wall as much as a running one.
//
// What does not qualify is a self-service signup with nothing behind it. The
// test is what was exchanged, never the label on the deal: ARNTREAL is
// commission only and earns its place through the figures in PARTNER_PROOF,
// while an affiliate account that neither sold nor received anything would be
// a form filled in, not a partnership.
//
// The wall is read at the level of its weakest entry, never its strongest.
// One name that deflates on a phone call costs more than the five others
// bring, so the bar stays here rather than moving to fit a longer list.
export const COLLABORATIONS = [
  { name: 'ARNTREAL', logo: null, desc: null, result: null },
  { name: 'Ultrahuman', logo: null, desc: null, result: null },
  { name: 'Under Armour', logo: null, desc: null, result: null },
  { name: 'DFYNE', logo: null, desc: null, result: null },
  { name: 'Prozis', logo: null, desc: null, result: null },
  { name: 'Vicinity', logo: null, desc: null, result: null },
];
export const COLLABORATION_SLOTS_OPEN = 0;

// Partnership proof.
// The one place on this site that shows what a partnership actually returned
// to the brand, rather than what it reached. Audience figures say a campaign
// was seen; these say it was bought.
//
// The figures are a closed period, not a live counter. They do not move on
// their own and must never be presented as if they did. Re-export from the
// brand's affiliate dashboard before changing any number here, and change the
// window at the same time.
//
// Arithmetic is deliberately checkable from the block itself: 112 orders on
// 879 tracked referrals is 12.7%, rounded down to 13%. A brand manager who
// does that division and lands on the stated rate trusts the rest of the page.
export const PARTNER_PROOF = {
  brand: 'ARNTREAL',
  window: '68 days',
  model: 'Commission only',
  title: 'What one partnership returned.',
  intro:
    'Commission only: no fixed fee and no media budget. Paid on what the audience actually bought.',
  metrics: [
    { id: 'revenue', label: 'Sales generated', value: '€16,817' },
    { id: 'orders', label: 'Orders', value: '112' },
    { id: 'conversion', label: 'Conversion rate', value: '13%' },
    // "Referrals", not "Referrals tracked": the longer label wraps onto two
    // lines at 390px and leaves the bottom row of the grid uneven. The word
    // "tracked" is already carried by the source line under the card.
    { id: 'referrals', label: 'Referrals', value: '879' },
  ],
  source:
    "Measured over 68 consecutive days in ARNTREAL's own affiliate dashboard: 112 orders from 879 tracked referrals.",
  // Offered, not displayed. A dashboard screenshot on a public page proves
  // nothing, because anyone can edit one in a browser inspector in two
  // minutes, and publishing a partner's interface exposes data that is not
  // Kevin's to publish. The invitation is stronger than the image: it costs
  // nothing to make when the export is real, and it moves verification to the
  // moment it actually happens, which is the call, not the page.
  verifyLabel: 'Request the export',
  verifySubject: 'Partnership figures',
};

// Gyms with a confirmed relationship. Empty on purpose: the page renders an
// honest open state rather than inventing a partner.
export const GYM_PARTNERS = [];

// HYBRID SYSTEM
// The single training system. It is sold and delivered on kevingymworkout.com.
// This site only explains what it is and links out: never a second checkout,
// never a second price, never a competing canonical.
export const HYBRID = {
  name: 'HYBRID SYSTEM',
  tagline:
    'One system. Strength and conditioning in the same week, without either one cancelling the other.',
  body: [
    'HYBRID SYSTEM is the only training system I sell. There is no second programme, no beginner and advanced version sold separately, no tiers under different names.',
    'It is the way I train: heavy work and conditioning inside the same week, structured so the two support each other instead of competing.',
  ],
  // Deliberately no session counts, no week counts and no results claims here.
  // Those live on the programme site, which is the single source of truth.
  home: ECOSYSTEM.programme,
  buy: ECOSYSTEM.programmeBuy,
  app: ECOSYSTEM.app,
};

// Coaching
// The premium tier, on app.kevingymworkout.com. It is a separate offer from
// HYBRID SYSTEM, not the member area of it: the programme is bought and
// followed on kevingymworkout.com, coaching is Kevin working with the person.
// Writing it as "your account and your programme" was wrong and made the
// premium offer read as a login screen.
//
// Kevin is the only coach on the platform for now. That is deliberately not
// written on the page: it is a fact about the roadmap, not something a visitor
// is buying, and it dates badly the day a second coach arrives.
//
// `open` drives the card on /hybrid. False renders the closed state instead of
// an invitation, on purpose. A call to action that leads to a full roster
// costs more than the sentence saying it is full: the visitor who writes and
// gets nothing remembers the disappointment, the one who reads "currently
// full" reads a roster worth waiting for. Being full is the argument, not the
// apology.
//
// Flip `open` to true when places free up and the invitation comes back on its
// own. Nothing else to change.
export const COACHING = {
  label: 'Coaching',
  home: ECOSYSTEM.app,
  open: false,
  body: 'Coaching with me directly, not the programme on its own. This is the premium tier.',
  closedNote: 'Currently full. No new places for now.',
  openNote: 'Places are limited and I coach everyone on the roster myself.',
  action: 'Client login',
  enquirySubject: 'Coaching',
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

// Media kit. While this is null the site says nothing about a media kit at
// all: no button, no section, no notice. A disabled button and a "coming
// soon" both read as unfinished on a page whose job is to convince a brand.
//
// To publish it: drop the PDF at public/media-kit.pdf and set this to
// '/media-kit.pdf'. The download button on /contact and the media kit
// section on /partners/brands come back on their own. No other edit.
export const MEDIA_KIT_URL = null;

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
