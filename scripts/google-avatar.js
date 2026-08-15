import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

// Generateur des photos de profil Google, dans brand-assets/.
//
// Deux fichiers, parce que le bon choix depend de qui recoit le mail et que ce
// n'est pas a un script de trancher :
//
//   google-avatar-mark.png   le monogramme K sur fond noir
//   google-avatar-photo.png  le portrait du shooting, recadre carre
//
// Pourquoi le monogramme et pas le logotype KEVINGYM complet : Google affiche
// cette image dans un cercle d'environ 40px dans Gmail. Huit lettres a cette
// taille forment une bavure grise illisible. Une seule lettre tient. C'est la
// meme raison qui fait que public/favicon.svg porte un K et pas le mot entier.
//
// Le masque circulaire est la contrainte qui gouverne le cadrage. Google rogne
// un cercle inscrit dans le carre, donc les quatre coins sont perdus. Le
// monogramme est mis a l'echelle pour tenir dans ce cercle avec de la marge,
// et le portrait est cadre sur le visage et non sur le buste.
//
// Ce fichier ne tourne pas pendant le build. Il se lance a la main :
//
//   node scripts/google-avatar.js

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SIZE = 800; // Google accepte largement, 800 couvre tous les usages

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
  throw new Error(`google-avatar: aucun Chrome trouve. Cherche dans:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
};

const dataUri = async (file, mime) =>
  `data:${mime};base64,${(await fs.readFile(path.join(ROOT, file))).toString('base64')}`;

// La photo passe en data URI. Un chemin file:// depuis une page chargee par
// setContent est bloque par Chrome, et le rendu sortirait vide sans lever la
// moindre erreur.
const photo = await dataUri('public/images/kevin-hero.jpg', 'image/jpeg');

// On reprend le seul trace du K depuis public/favicon.svg, pas le fichier
// entier. Le favicon dessine une tuile noire aux coins arrondis avec un filet
// de lumiere sur l'arete: mise a l'echelle dans un carre noir, cette tuile se
// voit et donne une boite dans une boite. Ici il ne faut que la lettre.
const favicon = await fs.readFile(path.join(ROOT, 'public', 'favicon.svg'), 'utf8');
const kPaths = favicon.match(/<g fill="#FFFFFF">([\s\S]*?)<\/g>\s*<rect x="1\.5"/);
if (!kPaths) {
  throw new Error('google-avatar: trace du K introuvable dans public/favicon.svg.');
}

const browser = await puppeteer.launch({ executablePath: await findChrome(), headless: 'new' });

// L'emprise du K se mesure au lieu de se deviner: ses deux bras sont des
// rectangles pivotes, et leur etendue reelle ne se lit pas dans les
// coordonnees du fichier.
const measurePage = await browser.newPage();
await measurePage.setContent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
     <g id="k" fill="#FFFFFF">${kPaths[1]}</g>
   </svg>`,
  { waitUntil: 'load' }
);
const bbox = await measurePage.evaluate(() => {
  const b = document.getElementById('k').getBBox();
  return { x: b.x, y: b.y, width: b.width, height: b.height };
});
await measurePage.close();

// Google rogne un cercle inscrit dans le carre, donc les quatre coins sont
// perdus. A 50% de hauteur, la demi-diagonale de l'emprise reste largement
// dans le rayon: aucun bras ne revient coupe, et la lettre garde sa presence.
const scale = (SIZE * 0.5) / bbox.height;
const markW = bbox.width * scale;
const markH = bbox.height * scale;
if (Math.hypot(markW / 2, markH / 2) > SIZE / 2) {
  throw new Error('google-avatar: le K deborde du cercle de rognage de Google.');
}

const pages = {
  'google-avatar-mark.png': `
    <style>
      * { margin: 0; padding: 0; }
      body { width: ${SIZE}px; height: ${SIZE}px; background: #000;
             display: flex; align-items: center; justify-content: center; }
    </style>
    <svg width="${markW}" height="${markH}"
         viewBox="${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}"
         xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFFFFF">${kPaths[1]}</g>
    </svg>`,

  'google-avatar-photo.png': `
    <style>
      * { margin: 0; padding: 0; }
      body { width: ${SIZE}px; height: ${SIZE}px; background: #000; overflow: hidden; }
      /* Cadrage sur le visage: dans un cercle de 40px, un buste ne se lit pas,
         un visage oui. */
      div { width: 100%; height: 100%;
            background: url('${photo}') center 18% / 132% no-repeat; }
    </style>
    <div></div>`,
};

for (const [name, html] of Object.entries(pages)) {
  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const dst = path.join(ROOT, 'brand-assets', name);
  await page.screenshot({ path: dst });
  const { size } = await fs.stat(dst);
  console.log(`google-avatar: brand-assets/${name}  ${SIZE}x${SIZE}  ${Math.round(size / 1024)} KB`);
  await page.close();
}

await browser.close();
