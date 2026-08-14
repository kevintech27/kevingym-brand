import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

// Generateur de public/og.png, l'image d'apercu des reseaux et des messageries.
//
// C'est la seule image du projet que personne ne voit sur le site et que tout
// le monde voit avant lui : LinkedIn, WhatsApp, Slack, X et iMessage affichent
// ca quand Kevin envoie son lien a une marque. Elle porte donc le meme poids
// commercial que le hero.
//
// Pourquoi un script et pas un fichier dessine a la main : le texte de l'image
// reprend le nom et les roles, qui vivent dans src/lib/brand.js. Sans
// generateur, un changement de role laisse une og.png qui contredit le site,
// et rien dans le build ne le signale.
//
// Le rendu passe par Chrome, ce qui donne acces a Geist depuis Google Fonts.
// Une generation en bibliotheque graphique retomberait sur une police systeme,
// et l'apercu n'aurait pas la typo de la marque.
//
// Ce fichier ne tourne pas pendant le build. Il se lance a la main :
//
//   node scripts/og-image.js
//
// La photo est lue en local depuis public/, pas depuis le serveur de preview :
// l'image d'apercu doit pouvoir se regenerer sans rien avoir a demarrer.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DST = path.join(ROOT, 'public', 'og.png');
const PHOTO = path.join(ROOT, 'public', 'images', 'og-portrait.jpg');

const W = 1200;
const H = 630;

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
  throw new Error(`og-image: aucun Chrome trouve. Cherche dans:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
};

// La photo part en data URI. Un chemin file:// depuis une page chargee par
// setContent est bloque par Chrome, et la generation sortirait un fond noir
// sans lever la moindre erreur.
const photo = `data:image/jpeg;base64,${(await fs.readFile(PHOTO)).toString('base64')}`;

// Ces deux chaines doivent rester alignees sur PERSON dans src/lib/brand.js.
const NAME = ['Kevin', 'Nguena'];
const ROLES = ['Content Creator', 'Athlete', 'Founder'];
const SLOGAN = 'Built by courage';

const html = `
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;500;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; background: #000; overflow: hidden;
         font-family: 'Geist', 'Helvetica Neue', Arial, sans-serif; color: #fff; }
  .photo { position: absolute; inset: 0 0 0 43%;
           background: url('${photo}') center 30% / cover no-repeat; }
  /* Le degrade fait entrer la photo dans le noir. Sans lui, la colonne de
     texte et l'image se touchent sur une arete franche qui fait collage. */
  .photo::after { content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, #000 0%, rgba(0,0,0,0.88) 22%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.30) 100%); }
  .copy { position: absolute; left: 76px; top: 50%; transform: translateY(-50%); z-index: 1; }
  .eyebrow { font-size: 15px; font-weight: 500; letter-spacing: 0.32em; color: #7a7a82; }
  h1 { font-size: 86px; font-weight: 700; letter-spacing: -0.035em; line-height: 0.98; margin-top: 26px; }
  .roles { font-size: 20px; font-weight: 300; color: #a1a1aa; margin-top: 30px; }
  .roles span { color: #52525b; padding: 0 10px; }
  .rule { width: 96px; height: 1px; background: #46464c; margin-top: 40px; }
  .slogan { font-size: 15px; font-weight: 500; letter-spacing: 0.26em;
            text-transform: uppercase; margin-top: 26px; }
</style>
<div class="photo"></div>
<div class="copy">
  <div class="eyebrow">KEVINGYM</div>
  <h1>${NAME.join('<br />')}</h1>
  <div class="roles">${ROLES.join('<span>/</span>')}</div>
  <div class="rule"></div>
  <div class="slogan">${SLOGAN}</div>
</div>`;

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: DST });
await browser.close();

const { size } = await fs.stat(DST);
console.log(`og-image: public/og.png ${W}x${H}, ${Math.round(size / 1024)} KB`);
