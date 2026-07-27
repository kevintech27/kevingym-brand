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

## Routes

Huit routes, définies dans `src/App.jsx` et décrites dans
`src/components/RouteMeta.jsx` (titre, description, canonical, Open Graph) :

```
/  /about  /content  /partners  /partners/brands  /partners/gyms  /hybrid  /contact
```

Toute nouvelle route doit être ajoutée aux trois endroits : `App.jsx`,
`RouteMeta.jsx` et `public/sitemap.xml`. Sans entrée dans `RouteMeta`, la page
part en `noindex` et perd son canonical.

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
