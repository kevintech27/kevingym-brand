import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

// Generateur de brand-assets/media-kit.pdf a partir de
// brand-assets/media-kit.html.
//
// La sortie va dans brand-assets/ et pas dans public/, volontairement. Tant que
// le document contient des PLACEHOLDER, il ne doit pas pouvoir partir en
// production par un simple build. Quand Kevin a rempli les trous :
//
//   1. copier le PDF dans public/media-kit.pdf
//   2. passer MEDIA_KIT_URL a '/media-kit.pdf' dans src/lib/brand.js
//
// Le bouton de /contact et la section media kit de /partners/brands
// reapparaissent seuls.
//
// Le HTML pointe ses images vers http://localhost:3100 : il faut donc que
// `npm run preview` tourne pendant la generation. C'est voulu, la source des
// images reste le site lui-meme, ce qui evite une deuxieme copie des photos
// qui divergerait de public/images.
//
//   npm run build
//   npm run preview        # dans un autre terminal
//   node scripts/media-kit.js

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

// Le serveur doit repondre avant qu'on lance Chrome. Sans ce garde-fou, le PDF
// se genere quand meme, avec des cadres photo vides, et le defaut ne se voit
// qu'a l'ouverture du fichier.
const res = await fetch(`${ORIGIN}/images/kevin-hero.jpg`, { method: 'HEAD' }).catch(() => null);
if (!res || !res.ok) {
  throw new Error(
    `media-kit: ${ORIGIN} ne repond pas. Lancer "npm run build" puis "npm run preview" avant.`
  );
}

const html = await fs.readFile(SRC, 'utf8');

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

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
