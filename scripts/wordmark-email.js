import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

// Generateur de public/wordmark-email.png, la version raster du logotype.
//
// Pourquoi un raster alors que public/wordmark.svg existe : aucun client mail
// grand public n'affiche un SVG. Outlook rend le HTML avec le moteur de Word,
// Gmail reecrit le message et jette la balise. Une signature qui repose sur le
// SVG arrive donc sans marque du tout.
//
// Le PNG est rasterise a 3x la taille d'affichage (200px de large dans
// brand-assets/email-signature.html) pour rester net sur un ecran retina, et
// garde son fond transparent : c'est la cellule noire de la signature qui
// fournit le fond, pas l'image.
//
// Ce fichier ne tourne pas pendant le build. Il se lance a la main, le jour ou
// le dessin du logotype bouge, apres scripts/wordmark.js :
//
//   node scripts/wordmark.js
//   node scripts/wordmark-email.js
//
// Il demande puppeteer-core et un Chrome installe. Les deux ne sont pas des
// dependances du site : si la commande echoue, le site se construit quand
// meme, seule la signature reste sur son ancien PNG.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'wordmark.svg');
const DST = path.join(ROOT, 'public', 'wordmark-email.png');

const DISPLAY_WIDTH = 200; // largeur d'affichage dans la signature
const SCALE = 3; // densite ciblee

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
  throw new Error(
    `wordmark-email: aucun Chrome trouve. Cherche dans:\n  ${CHROME_CANDIDATES.join('\n  ')}`
  );
};

const svg = await fs.readFile(SRC, 'utf8');

// Le viewBox du logotype fait autorite sur le rapport : on ne le devine pas.
const viewBox = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
if (!viewBox) {
  throw new Error('wordmark-email: viewBox introuvable dans public/wordmark.svg.');
}

const width = DISPLAY_WIDTH * SCALE;
const height = Math.round((width * Number(viewBox[2])) / Number(viewBox[1]));
const sized = svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${width}" height="${height}"`);

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.setContent(
  `<html><body style="margin:0;background:transparent">${sized}</body></html>`
);
await page.screenshot({ path: DST, omitBackground: true });
await browser.close();

console.log(`wordmark-email: ${width}x${height} ecrit dans public/wordmark-email.png`);
