import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import {
  CONTACT_EMAIL,
  PARTNER_PROOF,
  PERSON,
  SOCIALS,
  STATS,
  STATS_SOURCE,
  STATS_UPDATED,
} from '../src/lib/brand.js';

// Generateur de brand-assets/media-kit.pdf a partir du gabarit
// brand-assets/media-kit.html.
//
// Le gabarit ne contient aucun chiffre : il porte des {{JETON}} que ce script
// remplit en important src/lib/brand.js, exactement le fichier que lit le
// site. C'est ce qui rend le PDF et la page incapables de diverger.
//
// La raison est simple : un media kit n'est pas un document fige. Les chiffres
// d'audience bougent, et une version tapee a la main derive de la page en
// quelques semaines. Le cycle correct tient en deux commandes, apres avoir
// corrige STATS dans brand.js :
//
//   npm run build && npm run preview     # dans un terminal
//   node scripts/media-kit.js            # dans un autre
//
// Le document porte sa date. C'est ce qui lui donne le droit de vieillir entre
// deux generations : un chiffre date se verifie, un chiffre sans date se
// conteste.
//
// La sortie va dans brand-assets/ et pas dans public/, volontairement. Tant
// que le document contient des PLACEHOLDER, il ne doit pas pouvoir partir en
// production par un simple build. Quand Kevin a rempli les trous :
//
//   1. copier le PDF dans public/media-kit.pdf
//   2. passer MEDIA_KIT_URL a '/media-kit.pdf' dans src/lib/brand.js
//
// Le bouton de /contact et la section media kit de /partners/brands
// reapparaissent seuls.
//
// Le gabarit pointe ses images vers http://localhost:3100 : il faut donc que
// `npm run preview` tourne pendant la generation. C'est voulu, la source des
// images reste le site lui-meme, ce qui evite une deuxieme copie des photos
// qui divergerait de public/images.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'brand-assets', 'media-kit.html');
const DST = path.join(ROOT, 'brand-assets', 'media-kit.pdf');
const ORIGIN = 'http://localhost:3100';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];

const findChrome = async () => {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Candidat suivant.
    }
  }
  throw new Error(`media-kit: aucun Chrome trouve. Cherche dans:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
};

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Un chiffre commence par un chiffre. Meme test que le composant Stat du site,
// pour que la separation entre valeur chiffree et valeur texte soit la meme
// des deux cotes.
const isFigure = (value) => Boolean(value) && /^[\d€$£]/.test(value);

const handleFor = (id) => SOCIALS.find((s) => s.id === id)?.handle ?? '';

// Grille d'audience. Seules les valeurs chiffrees y entrent : "FR +
// International" mis a 40px deborde sa cellule, et il n'a rien a faire dans
// une grille de nombres. Il part dans la ligne de source.
const statsCells = STATS.filter((s) => isFigure(s.value))
  .map((s) => {
    const handle = handleFor(s.id);
    const label = handle ? `${s.label} &nbsp;${handle}` : s.label;
    return `    <div class="stat"><div class="v">${escape(s.value)}</div><div class="label k">${label}</div></div>`;
  })
  .join('\n');

const proofCells = PARTNER_PROOF.metrics
  .map(
    (m) =>
      `      <div><div class="v">${escape(m.value)}</div><div class="label k">${escape(m.label)}</div></div>`
  )
  .join('\n');

const socialLabels = SOCIALS.map(
  (s) => `    <span class="label">${escape(s.label)} ${escape(s.handle)}</span>`
).join('\n');

const reach = STATS.find((s) => !isFigure(s.value))?.value ?? '';

const VALUES = {
  UPDATED: STATS_UPDATED,
  ROLES: PERSON.roles.join(', '),
  CITY: PERSON.city,
  SLOGAN: PERSON.slogan.charAt(0) + PERSON.slogan.slice(1).toLowerCase(),
  EMAIL: CONTACT_EMAIL,
  STATS_CELLS: statsCells,
  STATS_SOURCE,
  REACH: reach,
  SOCIAL_LABELS: socialLabels,
  PROOF_BRAND: PARTNER_PROOF.brand,
  PROOF_WINDOW: PARTNER_PROOF.window,
  PROOF_MODEL: PARTNER_PROOF.model,
  PROOF_CELLS: proofCells,
  PROOF_SOURCE: PARTNER_PROOF.source,
};

const res = await fetch(`${ORIGIN}/images/kevin-hero.jpg`, { method: 'HEAD' }).catch(() => null);
if (!res || !res.ok) {
  throw new Error(
    `media-kit: ${ORIGIN} ne repond pas. Lancer "npm run build" puis "npm run preview" avant.`
  );
}

const template = await fs.readFile(SRC, 'utf8');

// Un jeton mal orthographie dans le gabarit passerait tel quel dans le PDF, et
// {{PROOF_BRAND}} imprime en toutes lettres dans un document envoye a une
// marque est pire qu'un build casse. On echoue donc plutot que de rendre.
const unknown = [...template.matchAll(/\{\{([A-Z_]+)\}\}/g)]
  .map((m) => m[1])
  .filter((name, i, all) => all.indexOf(name) === i && !(name in VALUES));
if (unknown.length) {
  throw new Error(`media-kit: jeton inconnu dans le gabarit: ${unknown.join(', ')}`);
}

const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, name) => VALUES[name]);

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

// Une page qui deborde d'un pixel se coupe en deux dans le PDF, et le defaut
// ne se voit qu'a l'ouverture du fichier. On mesure avant de rendre.
const overflowing = await page.evaluate(() =>
  [...document.querySelectorAll('.page')]
    .map((el, i) => ({ page: i + 1, h: el.scrollHeight }))
    .filter((p) => p.h > 1123)
);
if (overflowing.length) {
  await browser.close();
  throw new Error(
    `media-kit: page(s) en debordement, elles se couperaient en deux dans le PDF: ` +
      overflowing.map((p) => `page ${p.page} (${p.h}px pour 1123)`).join(', ')
  );
}

await page.pdf({
  path: DST,
  width: '794px',
  height: '1123px',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();

const { size } = await fs.stat(DST);
console.log(`media-kit: brand-assets/media-kit.pdf ecrit, ${Math.round(size / 1024)} KB`);
console.log(`  chiffres lus dans src/lib/brand.js, date du document: ${STATS_UPDATED}`);
