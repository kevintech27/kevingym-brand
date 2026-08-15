import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

// Generateur de public/wordmark-email.png, le KEVINGYM de la signature mail.
//
// Il reproduit le lockup de la nav, pas le logotype dessine de
// public/wordmark.svg. La nav et le footer ecrivent KEVINGYM en Geist gras,
// capitales, interlettrage 0.24em, et c'est cette forme que voit un
// destinataire qui clique ensuite sur le lien. Une signature portant le
// logotype dessine montrerait des lettres que le site n'utilise nulle part.
//
// Les trois valeurs ci-dessous doivent donc rester alignees sur la classe du
// lien KEVINGYM dans src/components/Nav.jsx. Si le traitement de la nav
// change, il faut relancer ce script.
//
// Pourquoi une image et pas du texte dans la signature : aucune police
// distante ne se charge dans un client mail. Ecrire KEVINGYM en HTML
// retomberait sur Arial, avec un dessin de lettres qui n'est pas celui du
// site. En image, Geist est cuit dans le fichier et s'affiche partout, Outlook
// compris.
//
// Ce fichier ne tourne pas pendant le build. Il se lance a la main :
//
//   node scripts/wordmark-email.js

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DST = path.join(ROOT, 'public', 'wordmark-email.png');

const WEIGHT = 700; // font-bold, comme la nav
const TRACKING = '0.24em'; // tracking-[0.24em], comme la nav
const DISPLAY_WIDTH = 200; // largeur d'affichage dans la signature
const SCALE = 3; // densite ciblee, pour rester net sur retina

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

// La taille de police se deduit de la largeur voulue, elle ne se devine pas :
// on rend a une taille de reference, on mesure, puis on met a l'echelle.
const PROBE = 100;

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 2400, height: 600, deviceScaleFactor: 1 });

// Pas de preconnect ici. Il laisse une socket ouverte que networkidle0 ne voit
// jamais se fermer, et le second chargement de la page part en timeout.
const html = (fontSize) => `
<meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@${WEIGHT}&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; }
  body { background: transparent; }
  #w {
    display: inline-block;
    font-family: 'Geist', sans-serif;
    font-weight: ${WEIGHT};
    font-size: ${fontSize}px;
    text-transform: uppercase;
    letter-spacing: ${TRACKING};
    color: #FFFFFF;
    white-space: nowrap;
    line-height: 1;
  }
</style>
<span id="w">KEVINGYM</span>`;

// L'interlettrage CSS s'ajoute aussi apres la derniere lettre. Sans le
// retrancher, le PNG porte une colonne vide a droite et le mot parait decale
// dans la signature.
const measure = async () => {
  const r = document.createRange();
  r.selectNodeContents(document.getElementById('w'));
  const b = r.getBoundingClientRect();
  const track = parseFloat(getComputedStyle(document.getElementById('w')).letterSpacing);
  return { w: b.width - track, h: b.height, x: b.x, y: b.y };
};

// Si Geist ne se charge pas, Chrome retombe sur une police systeme et le PNG
// sort avec un dessin de lettres qui n'est celui de personne. Rien ne le
// signalerait : l'image existe, elle est juste fausse. On verifie donc que la
// police est reellement disponible avant de capturer.
const ensureGeist = async () => {
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(
    (w) => document.fonts.check(`${w} 100px Geist`),
    WEIGHT
  );
  if (!loaded) {
    await browser.close();
    throw new Error(
      'wordmark-email: Geist ne s\'est pas chargee depuis Google Fonts. ' +
        'Verifier la connexion reseau: sans elle le rendu part en police systeme.'
    );
  }
};

await page.setContent(html(PROBE), { waitUntil: 'load' });
await ensureGeist();
const probe = await page.evaluate(measure);

const fontSize = (PROBE * DISPLAY_WIDTH * SCALE) / probe.w;
await page.setContent(html(fontSize), { waitUntil: 'load' });
await ensureGeist();
const box = await page.evaluate(measure);

await page.screenshot({
  path: DST,
  omitBackground: true,
  clip: { x: box.x, y: box.y, width: box.w, height: box.h },
});
await browser.close();

const { size } = await fs.stat(DST);
const displayHeight = Math.round((box.h * DISPLAY_WIDTH) / box.w);

console.log(
  `wordmark-email: ${Math.round(box.w)}x${Math.round(box.h)} ecrit dans public/wordmark-email.png, ` +
    `${Math.round(size / 1024)} KB`
);
console.log(
  `  a reporter dans brand-assets/email-signature.html: ` +
    `width="${DISPLAY_WIDTH}" height="${displayHeight}"`
);

// Le couple width/height de la signature est fige dans le HTML, parce
// qu'Outlook reserve la place avant de charger l'image. Il ne suit donc pas
// automatiquement une regeneration: on verifie, plutot que d'esperer.
const sig = path.join(ROOT, 'brand-assets', 'email-signature.html');
const html_ = await fs.readFile(sig, 'utf8').catch(() => null);
if (html_ && !html_.includes(`width="${DISPLAY_WIDTH}" height="${displayHeight}"`)) {
  console.warn(
    `\n  ATTENTION: email-signature.html ne porte pas ce couple. ` +
      `Le mot sera deforme tant qu'il n'est pas mis a jour.`
  );
}
