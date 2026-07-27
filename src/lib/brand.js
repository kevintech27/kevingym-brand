// KEVINGYM BRAND SYSTEM: central data for the personal site.
// Everything numeric, named, or contractual lives here so it stays verifiable
// and editable in one place. Kevin updates this file; the components only
// render what's here. Nothing is invented to "look" more impressive.

export const SITE_URL = 'https://kevingym.com';

// The rest of the ecosystem. The programme has its own domain: we never
// duplicate its sales page here, only link out to it.
export const ECOSYSTEM = {
  programme: 'https://kevingymworkout.com',
  programmeBuy: 'https://kevingymworkout.com/#pricing',
  app: 'https://app.kevingymworkout.com',
  links: 'https://links.kevingym.com',
};

// Proof bar
// Single source of truth for the numbers shown under the hero.
// Checked against the public TikTok/Instagram profiles on 2026-07-27:
// TikTok 124.1K followers · 6.7M cumulative likes · pinned top video 8.9M views
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

// Work / visuals gallery
// `image: null` on every item for now: grey placeholders until real
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
export const COLLABORATIONS = [
  { name: 'ARNTREAL', logo: null, desc: null, result: null },
  { name: 'Ultrahuman', logo: null, desc: null, result: null },
  { name: 'Under Armour', logo: null, desc: null, result: null },
  { name: 'DFYNE', logo: null, desc: null, result: null },
  { name: 'Prozis', logo: null, desc: null, result: null },
  { name: 'Vicinity', logo: null, desc: null, result: null },
];
export const COLLABORATION_SLOTS_OPEN = 0;

// Builder / NEXUS section
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
