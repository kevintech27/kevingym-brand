// =============================================================================
// KEVINGYM BRAND SYSTEM — donnees centrales du site personnel.
// -----------------------------------------------------------------------------
// TOUT ce qui est chiffre, nominatif ou contractuel est regroupe ici pour etre
// verifiable et modifiable en un seul endroit.
//
// Convention : un champ marque `verified: false` N'EST PAS affiche comme un
// chiffre. Le composant Stat affiche alors un espace reserve explicite. On ne
// publie pas d'audience inventee : c'est ce qui detruit la credibilite aupres
// d'une marque, et cela peut engager juridiquement lors d'une negociation.
// =============================================================================

export const SITE_URL = 'https://kevingym.com';

// Les autres briques de l'ecosysteme. Le programme a son propre domaine : on ne
// duplique jamais sa page de vente ici, on y renvoie.
export const ECOSYSTEM = {
  programme: 'https://kevingymworkout.com',
  programmeBuy: 'https://kevingymworkout.com/#pricing',
  app: 'https://app.kevingymworkout.com',
  links: 'https://links.kevingym.com',
};

export const PERSON = {
  name: 'Kevin Nguena',
  handle: 'KEVINGYM',
  roles: ['Créateur de contenu', 'Athlète hybride', 'Fondateur'],
  baseline:
    "J'ai commencé chez moi, sans matériel. Aujourd'hui je construis KEVINGYM : du contenu, un programme, et une communauté qui s'entraîne vraiment.",
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

// --- Chiffres d'audience -----------------------------------------------------
// A REMPLIR PAR KEVIN. Tant que `verified` vaut false, rien n'est publie.
// Renseigner `value` (ex. '48K') ET passer `verified` a true pour afficher.
export const AUDIENCE = [
  { id: 'ig', label: 'Instagram', value: null, verified: false },
  { id: 'tt', label: 'TikTok', value: null, verified: false },
  { id: 'views', label: 'Vues / 30 jours', value: null, verified: false },
  { id: 'members', label: 'Membres HYBRID', value: null, verified: false },
];

// --- Portfolio de contenu ----------------------------------------------------
// `embed` : URL d'un post ou d'une video. Tant qu'elle est nulle, la carte
// s'affiche en espace reserve, sans faire semblant.
export const CONTENT_CATEGORIES = [
  {
    id: 'transformation',
    title: 'Transformation',
    desc: "Quatre ans de progression documentés, sans raccourci et sans filtre.",
    items: [
      { title: '15 → 19 ans', note: 'Le parcours complet', embed: null, image: '/images/kevin-start.jpg' },
      { title: 'Street workout', note: 'Barres et poids du corps', embed: null, image: '/images/kevin-street.jpg' },
      { title: 'Aujourd’hui', note: 'Physique hybride', embed: null, image: '/images/kevin-today.jpg' },
    ],
  },
  {
    id: 'training',
    title: 'Entraînement',
    desc: 'Séances filmées, exécution technique, progressions expliquées.',
    items: [
      { title: 'Push / Pull', note: 'Format vertical', embed: null, image: null },
      { title: 'Poids du corps', note: 'Sans matériel', embed: null, image: null },
      { title: 'Force', note: 'Barre libre', embed: null, image: null },
    ],
  },
  {
    id: 'posing',
    title: 'Posing & physique',
    desc: 'Mise en valeur du travail esthétique, lumière et cadrage soignés.',
    items: [
      { title: 'Studio', note: 'Série photo', embed: null, image: null },
      { title: 'Extérieur', note: 'Lumière naturelle', embed: null, image: null },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    desc: 'Le quotidien derrière la discipline : nutrition, récupération, routine.',
    items: [
      { title: 'Journée type', note: 'Vlog', embed: null, image: null },
      { title: 'Nutrition', note: 'Format court', embed: null, image: null },
    ],
  },
  {
    id: 'sponsored',
    title: 'Contenus sponsorisés',
    desc: 'Intégrations réalisées pour des marques, dans mon ton, sans rupture éditoriale.',
    items: [],
  },
];

// --- Collaborations ----------------------------------------------------------
// A REMPLIR. Aucune marque n'est affichee tant que la liste est vide : afficher
// de faux logos partenaires serait trompeur pour les marques qui te contactent.
export const COLLABORATIONS = [];

// --- Services proposes aux marques -------------------------------------------
export const BRAND_SERVICES = [
  {
    title: 'Contenu vertical',
    desc: 'Reels et TikTok pensés pour la rétention, tournés et montés par mes soins.',
  },
  {
    title: 'Intégration produit',
    desc: "Le produit apparaît dans un vrai entraînement, pas dans un décor. C'est ce qui convertit.",
  },
  {
    title: 'Série de contenus',
    desc: 'Campagne sur plusieurs semaines, avec un fil narratif et des formats déclinés.',
  },
  {
    title: 'Ambassadeur',
    desc: 'Partenariat long terme : présence régulière, code dédié, retours produit.',
  },
];

// --- Services proposes aux salles de sport ------------------------------------
export const GYM_SERVICES = [
  {
    title: 'Visite et repérage',
    desc: 'Je viens sur place, je repère les espaces et la lumière avant de tourner.',
  },
  {
    title: 'Mise en valeur des espaces',
    desc: 'Plateau, zone street workout, cardio, espace fonctionnel : chaque zone filmée pour donner envie.',
  },
  {
    title: 'Équipement en situation',
    desc: 'Les machines montrées en usage réel, avec la technique correcte.',
  },
  {
    title: 'Feature sur mes réseaux',
    desc: 'La salle identifiée et présentée à mon audience, pas juste taguée.',
  },
  {
    title: 'Partenariat récurrent',
    desc: 'Tournages réguliers dans la salle, contenu frais chaque mois.',
  },
];

// --- Parcours ----------------------------------------------------------------
export const JOURNEY = [
  {
    year: '15 ans',
    title: 'Les pompes, dans une chambre',
    body: "Pas de salle, pas de matériel, pas de coach. Juste des pompes, des squats et de la répétition. C'est là que la discipline s'installe — bien avant les résultats.",
    image: '/images/kevin-start.jpg',
  },
  {
    year: '16 → 17 ans',
    title: 'Poids du corps et street workout',
    body: 'Barres de parc, tractions, dips, progressions. Le corps se construit, mais surtout la méthode : comprendre pourquoi un mouvement fonctionne avant de le charger.',
    image: '/images/kevin-street.jpg',
  },
  {
    year: '18 ans',
    title: 'La salle et la charge',
    body: "L'entraînement structuré, la progression en charge, le suivi. Le physique change de dimension. Les deux mondes — force et esthétique — commencent à se rejoindre.",
    image: null,
  },
  {
    year: '19 ans',
    title: 'Le contenu et la marque',
    body: "Je documente tout. L'audience arrive parce que le travail est réel, pas parce qu'il est mis en scène. KEVINGYM devient une marque.",
    image: '/images/kevin-today.jpg',
  },
  {
    year: 'Aujourd’hui',
    title: 'HYBRID et la suite',
    body: "Un seul programme, celui que j'utilise vraiment. Une application pour le suivre. Et une vision longue : bâtir un écosystème fitness crédible, pas une audience jetable.",
    image: null,
  },
];
