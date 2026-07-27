# KEVINGYM brand site

Vitrine de marque personnelle de Kevin Nguena sur kevingym.com. Le programme
et l'app vivent sur kevingymworkout.com et ne sont qu'un lien sortant ici.

Lire `DA_KEVINGYM_VITRINE.md` avant toute intervention sur le design.

## Règle d'écriture : aucun tiret cadratin

**N'utilise jamais de tiret cadratin (`—`) ni de tiret demi-cadratin (`–`).**
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
placeholder explicite en majuscules, jamais une valeur plausible.

## Zonage des deux chartes

SYSTEM couvre tout le site : noir pur, blanc, deux gris, aucun accent coloré.
NEXUS est confiné à la seule section builder. **Le cyan n'existe nulle part
ailleurs.** Cette règle n'est pas une préférence, c'est ce qui donne son
impact à la section builder.

## Domaine et déploiement

`kevingym.com` n'est pas attaché au projet Vercel. Les pushs sur `main`
déploient uniquement sur `*.vercel.app`. **Ne pas attacher le domaine, ne pas
toucher au DNS** sans accord explicite et récent : Kevin gère son DNS
lui-même.

## Vérifier le rendu

Le build qui passe ne prouve rien sur l'apparence. Avant d'annoncer qu'un
travail de design est terminé, lancer le site et regarder une capture d'écran,
à 1440px et à 390px. Quatre défauts réels de cette page (une jambe de `g`
tronquée, une colonne qui débordait, un dégradé trop violent, une lueur de
favicon totalement invisible) n'ont été trouvés que comme ça.

```
npm run dev          # sert sur le port 3100
```
