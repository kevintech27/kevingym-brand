# KEVINGYM brand site

Vitrine de marque personnelle de Kevin Nguena sur kevingym.com. Le programme
HYBRID et l'app vivent sur kevingymworkout.com et app.kevingymworkout.com : ce
sont des liens sortants ici, jamais du contenu dupliqué.

Lire `DA_KEVINGYM_VITRINE.md` avant toute intervention sur le design.

## Nom du système visuel

Le système visuel s'appelle **KEVINGYM Brand System**. Il n'existe aucune autre
marque, aucun autre nom de charte, ni dans les textes affichés, ni dans les
classes CSS, ni dans les commentaires. Une seule zone accent (cyan/bleu) existe,
portée par les classes `kg-accent-*`, et elle est réservée à la section builder.

## Règle d'écriture : aucun tiret cadratin

**N'utilise jamais de tiret cadratin ni de tiret demi-cadratin.**
Nulle part : ni dans le code, ni dans les commentaires, ni dans le texte
affiché, ni dans les messages de commit, ni dans les réponses en conversation.

C'est une signature d'écriture générée par IA. Sur un site dont le job est de
convaincre une marque, ça décrédibilise.

À la place, selon ce que le tiret faisait :

| Le tiret servait à | Utiliser |
|---|---|
| Séparer deux propositions | Un point, ou un point-virgule |
| Introduire une explication | Deux-points |
| Insérer une incise | Des virgules, ou des parenthèses |
| Juxtaposer deux idées | Deux phrases courtes |

Si aucune de ces options ne marche, c'est que la phrase est mal construite :
réécris-la.

### Ce qui n'est PAS concerné

Ces `--` sont de la syntaxe de langage, pas de la ponctuation. Les supprimer
casse le site :

- Propriétés CSS personnalisées : `--aura-color`, `--mx`, `--my`
- Délimiteurs de commentaire HTML : `<!-- ... -->`
- Flags de ligne de commande : `npm run build -- --force`

### Pas de lignes de séparation en ASCII

Pas de `// ------------------------` ni de `/* === Section === */` dans les
commentaires. Un titre de section se suffit à lui-même. Ces bandeaux sont du
bruit visuel qui vieillit mal et se désynchronise du code.

## Voix des textes affichés

Anglais par défaut, pas de version française en v1. Voix active, phrases
courtes. Pas de listes de trois adjectifs, pas de superlatifs vides.

Aucun contenu inventé qui ressemble à du réel. Si une donnée manque, un
placeholder explicite en majuscules (PLACEHOLDER), jamais une valeur plausible.
Ça vaut en particulier pour les chiffres d'audience, les collaborations et les
salles partenaires : `src/lib/brand.js` est la seule source de vérité, et une
entrée non confirmée doit être retirée plutôt qu'affichée.

## Zonage des chartes

La charte de base couvre tout le site : noir pur, blanc, deux gris, aucun
accent coloré. L'accent cyan est confiné à la seule section builder, via
`.kg-accent-zone` et les classes `kg-accent-*`. **Le cyan n'existe nulle part
ailleurs.** Cette règle n'est pas une préférence, c'est ce qui donne son impact
à la section builder.

## Typographie

Geist pour le texte et le display, Geist Mono pour la zone accent uniquement.
Chargées depuis Google Fonts dans `index.html`.

## Marques

Deux marques dessinées, un seul langage : capitale 100, fût 21, chanfrein de
10 à 45 degrés, diagonales à 38 degrés coupées d'équerre sur leur propre axe.

- `public/favicon.svg` : le monogramme K, plus ses deux rasters
  (`logo.png` pour le champ `logo` de schema.org, `apple-touch-icon.png` pour
  l'écran d'accueil iOS).
- `public/wordmark.svg` : le logotype KEVINGYM, huit lettres dessinées.
  Généré par `scripts/wordmark.js`, qui ne tourne pas pendant le build. Les
  coordonnées du SVG ne se retouchent pas à la main : on change une constante
  du script et on le relance.

Le V reste le logo du produit sur kevingymworkout.com. Les deux domaines ne
servent jamais la même marque dans le même résultat de recherche.

## Routes

Huit routes, définies dans `src/App.jsx` et décrites dans
`src/components/RouteMeta.jsx` (titre, description, canonical, Open Graph) :

```
/  /about  /content  /partners  /partners/brands  /partners/gyms  /hybrid  /contact
```

Toute nouvelle route doit être ajoutée aux trois endroits : `App.jsx`,
`RouteMeta.jsx` et `public/sitemap.xml`. Sans entrée dans `RouteMeta`, la page
part en `noindex` et perd son canonical.

`META` dans `RouteMeta.jsx` est aussi la liste que lit le pré-rendu : une route
absente de `META` ne reçoit pas de fichier HTML et retombe sur le shell
`noindex`.

## Pré-rendu

Le site est une SPA, mais il ne se déploie pas comme telle. `npm run build`
enchaîne trois étapes : build client, build SSR de `src/entry-server.jsx`, puis
`scripts/prerender.js` qui écrit un vrai fichier HTML par route
(`dist/about/index.html`, etc.).

C'est ce qui fait qu'un robot obtient le bon titre, la bonne description et le
bon canonical sans exécuter de JavaScript. Avant ça, les huit URL servaient
toutes le `<head>` de l'accueil, canonical vers `/` inclus : Google finissait
par corriger, mais Bing, LinkedIn, WhatsApp, Slack et X affichaient l'accueil
en aperçu de n'importe quel lien profond.

Deux conséquences à ne pas casser :

- `index.html` est le gabarit du pré-rendu. `scripts/prerender.js` retrouve
  chaque balise par sa forme et **fait échouer le build** s'il n'en trouve pas
  une. Modifier une balise du `<head>` implique de mettre à jour son motif dans
  le script. L'échec est voulu : un remplacement raté en silence remettrait
  huit pages qui se déclarent toutes être l'accueil.
- `RouteMeta` reste indispensable. Il gère le `<head>` pendant la navigation
  côté client, où aucun document n'est redemandé.

Le rewrite Vercel pointe vers `spa-fallback.html`, un shell en `noindex` sans
canonical. Sans lui, chaque adresse mal tapée serait servie en 200 comme une
copie indexable de l'accueil.

## Vérifier le rendu d'un build

**`npm run preview:vite` ne résout pas les index de dossier** et renvoie
`dist/index.html` pour toutes les URL. Il donne donc l'illusion que le
pré-rendu est cassé, et il produit de faux mismatches d'hydratation.

`npm run preview` sert `dist/` comme Vercel le fait, avec résolution des
index de dossier. C'est celui à utiliser pour contrôler un build.

## Domaine et déploiement

`kevingym.com` est le domaine de production de ce projet Vercel
(`kevingym-brand`), avec `www.kevingym.com` en redirection permanente vers
l'apex. `kevingymworkout.com` reste attaché au projet `program-website` : un
domaine ne doit jamais être rattaché à deux projets Vercel en même temps.

Aucune redirection globale de kevingym.com vers kevingymworkout.com. Seules les
anciennes routes du programme, listées dans `vercel.json`, redirigent. Toutes
les autres routes servent le site personnel.

**Ne pas toucher au DNS ni déplacer un domaine sans accord explicite et récent :
Kevin gère son DNS lui-même.**

## Vérifier le rendu

Le build qui passe ne prouve rien sur l'apparence. Avant d'annoncer qu'un
travail de design est terminé, lancer le site et regarder une capture d'écran,
à 1440px et à 390px. Quatre défauts réels de cette page (une jambe de `g`
tronquée, une colonne qui débordait, un dégradé trop violent, une lueur de
favicon totalement invisible) n'ont été trouvés que comme ça.

```
npm install
npm run lint
npm run build
npm run dev          # sert sur le port 3100
```
