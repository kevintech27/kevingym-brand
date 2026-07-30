import fs from 'node:fs/promises';
import path from 'node:path';

// Generateur de public/wordmark.svg, le logotype KEVINGYM dessine.
//
// Pourquoi un generateur et pas un SVG ecrit a la main : les lettres sont des
// polygones dont les sommets sortent d'une grille et d'une trigonometrie
// simples. Ecrire les coordonnees en dur les rendrait immodifiables, et la
// premiere retouche de grille casserait la coherence entre les huit lettres.
// Ici on change une constante et le mot entier suit.
//
// Grille : hauteur de capitale 100, fut 21, approche 20, chanfrein de 10 a 45
// degres sur le coin haut gauche et le coin bas droite de chaque lettre. Les
// bras du K reprennent l'angle de 38 degres du monogramme de l'icone.
//
// Ce fichier ne tourne pas pendant le build. Il se lance a la main, quand le
// dessin doit bouger :
//
//   node scripts/wordmark.js

const CAP = 100; // hauteur de capitale
const STEM = 21; // epaisseur du fut
const CHAMFER = 10; // longueur du chanfrein a 45 degres
const GAP = 20; // approche mecanique entre deux lettres

const rad = (deg) => (deg * Math.PI) / 180;
const round = (n) => Math.round(n * 100) / 100;

// Bras du K. Construction du monogramme reprise telle quelle : une barre
// d'epaisseur STEM dont l'axe passe par le pivot, coupee d'equerre sur son
// propre axe. C'est ce qui garde la jonction legere. Deux masses verticales
// superposees a la place, et le K se remplit en son milieu.
//
// La longueur est calee pour que le coin haut du bout affleure la ligne de
// capitale exactement : un bras plus long depasse par le haut, un bras plus
// court laisse le K ouvert.
const PIVOT = [STEM, CAP / 2];
const AXIS = [Math.cos(rad(38)), -Math.sin(rad(38))];
const HALF = [(-AXIS[1] * STEM) / 2, (AXIS[0] * STEM) / 2]; // normale a l'axe
const BACK = 12; // rentre dans le fut, pour souder les deux bras

const along = (from, vector, k) => [from[0] + vector[0] * k, from[1] + vector[1] * k];
const ARM_LENGTH = (PIVOT[1] - HALF[1]) / -AXIS[1];
const armTip = along(PIVOT, AXIS, ARM_LENGTH);
const armBack = along(PIVOT, AXIS, -BACK);
const ARM_UP = [
  along(armBack, HALF, -1),
  along(armTip, HALF, -1),
  along(armTip, HALF, 1),
  along(armBack, HALF, 1),
];
const ARM_DOWN = ARM_UP.map(([x, y]) => [x, CAP - y]).reverse();

// Chaque lettre est une union de polygones convexes, tous dans le meme sens
// d'enroulement : avec fill-rule nonzero, l'union se fait toute seule et
// aucun contre-poinçon n'a besoin d'etre soustrait.
//
// `tl` et `br` sont les coins ou le chanfrein s'applique, quand il y en a un.
// Le K n'a pas de coin bas droite : c'est le bout d'un bras, deja coupe.
const GLYPHS = {
  K: {
    width: 81,
    tl: [0, 0],
    br: null,
    parts: [[[0, 0], [21, 0], [21, 100], [0, 100]], ARM_UP, ARM_DOWN],
  },
  E: {
    width: 70,
    tl: [0, 0],
    br: [70, 100],
    parts: [
      [[0, 0], [21, 0], [21, 100], [0, 100]],
      [[21, 0], [70, 0], [70, 21], [21, 21]],
      [[21, 39.5], [58, 39.5], [58, 60.5], [21, 60.5]],
      [[21, 79], [70, 79], [70, 100], [21, 100]],
    ],
  },
  V: {
    width: 78,
    tl: [0, 0],
    br: null,
    parts: [
      [[0, 0], [22, 0], [50, 100], [28, 100]],
      [[56, 0], [78, 0], [50, 100], [28, 100]],
    ],
  },
  I: {
    width: 21,
    tl: [0, 0],
    br: [21, 100],
    parts: [[[0, 0], [21, 0], [21, 100], [0, 100]]],
  },
  N: {
    width: 79,
    tl: [0, 0],
    br: [79, 100],
    parts: [
      [[0, 0], [21, 0], [21, 100], [0, 100]],
      [[0, 0], [24, 0], [79, 100], [55, 100]],
      [[58, 0], [79, 0], [79, 100], [58, 100]],
    ],
  },
  G: {
    width: 76,
    tl: [0, 0],
    br: [76, 100],
    parts: [
      [[0, 0], [21, 0], [21, 100], [0, 100]],
      [[21, 0], [76, 0], [76, 21], [21, 21]],
      [[21, 79], [76, 79], [76, 100], [21, 100]],
      // Barre du G : elle part du bord droit, pointe a gauche et se pose sur
      // la barre du bas. Un seul contre-poinçon, en L, et une ouverture de 37
      // de haut. Une barre plus haute avec une fente en dessous se bouche des
      // que le logotype descend sous 120px de large.
      [[40, 58], [76, 58], [76, 79], [40, 79]],
    ],
  },
  Y: {
    width: 78,
    tl: [0, 0],
    br: [50, 100],
    parts: [
      [[0, 0], [22, 0], [50, 55], [28, 55]],
      [[56, 0], [78, 0], [50, 55], [28, 55]],
      [[28, 55], [50, 55], [50, 100], [28, 100]],
    ],
  },
  M: {
    width: 95,
    tl: [0, 0],
    br: [95, 100],
    parts: [
      [[0, 0], [21, 0], [21, 100], [0, 100]],
      [[0, 0], [21, 0], [58, 100], [37, 100]],
      [[74, 0], [95, 0], [58, 100], [37, 100]],
      [[74, 0], [95, 0], [95, 100], [74, 100]],
    ],
  },
};

const WORD = [...'KEVINGYM'];

// Corrections optiques. Une diagonale qui s'ecarte de sa voisine ouvre un
// blanc plus large que l'approche mecanique ne le dit. Ces valeurs reprennent
// ce blanc, paire par paire.
const KERNING = { KE: -2, EV: -5, VI: -7, IN: 0, NG: 0, GY: -5, YM: -6 };

/**
 * Coupe un polygone convexe par le demi-plan x + y <= limit, ou l'inverse.
 * Sutherland-Hodgman sur une seule arete : c'est tout ce qu'un chanfrein a
 * 45 degres demande.
 */
function clipDiagonal(polygon, limit, keepBelow) {
  const inside = ([x, y]) => (keepBelow ? x + y <= limit : x + y >= limit);
  const out = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    if (inside(a)) out.push(a);
    if (inside(a) !== inside(b)) {
      const k = (limit - (a[0] + a[1])) / (b[0] + b[1] - (a[0] + a[1]));
      out.push([a[0] + k * (b[0] - a[0]), a[1] + k * (b[1] - a[1])]);
    }
  }
  return out;
}

/** Applique les chanfreins d'une lettre a tous ses polygones. */
function chamfer(parts, tl, br) {
  let out = parts;
  if (tl) out = out.map((p) => clipDiagonal(p, tl[0] + tl[1] + CHAMFER, false));
  if (br) out = out.map((p) => clipDiagonal(p, br[0] + br[1] - CHAMFER, true));
  return out.filter((p) => p.length > 2);
}

const paths = [];
let pen = 0;
for (let i = 0; i < WORD.length; i++) {
  const glyph = GLYPHS[WORD[i]];
  const d = chamfer(glyph.parts, glyph.tl, glyph.br)
    .map((p) => `M${p.map(([x, y]) => `${round(x + pen)},${round(y)}`).join(' ')}Z`)
    .join(' ');
  paths.push(`    <path d="${d}"/>`);
  pen += glyph.width + GAP + (KERNING[WORD[i] + WORD[i + 1]] ?? 0);
}
const width = pen - GAP;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${CAP}" width="${width}" height="${CAP}" role="img" aria-label="KEVINGYM">
  <title>KEVINGYM</title>
  <!-- Logotype dessine, pas une police mise en lettrage. Genere par
       scripts/wordmark.js : toute retouche passe par ce script, pas par les
       coordonnees ci-dessous.

       Grille : capitale ${CAP}, fut ${STEM}, approche ${GAP}, chanfrein ${CHAMFER} a 45 degres
       sur le coin haut gauche et bas droite de chaque lettre. Bras du K a 38
       degres, comme le monogramme de l'icone.

       Blanc en dur, parce que le fichier est servi en image sur fond noir.
       Passer a currentColor le jour ou le trace est inline dans un composant. -->
  <g fill="#FFFFFF">
${paths.join('\n')}
  </g>
</svg>
`;

const out = path.resolve('public/wordmark.svg');
await fs.writeFile(out, svg, 'utf8');
console.log(`wordmark.svg ecrit, ${width} x ${CAP}`);
