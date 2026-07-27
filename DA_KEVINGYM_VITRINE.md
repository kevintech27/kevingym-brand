# DA — kevingym.com (vitrine marque)

Document de référence pour le design du site. Lire aussi `SYSTEM.md` et `NEXUS.md` dans le projet pour les valeurs exactes des deux chartes.

---

## 1. Ce qu'est ce site

Vitrine de marque personnelle de Kevin Nguena. Le job unique de la page : convaincre une marque, une agence ou une salle premium de travailler avec lui, en moins de 30 secondes.

Ce n'est pas un site produit. Le programme et l'app vivent sur `kevingymworkout.com` et ne sont qu'un lien secondaire ici.

Audience : brand managers, athlete managers, agences, salles de sport haut de gamme. Majoritairement anglophones ou habitués à travailler en anglais.

**Langue par défaut : anglais.** Pas de version française en v1.

Slogan : **BUILT BY COURAGE**

Territoire de marque : discipline, focus, lock in, sport, bien-être, esthétisme, no limit.

---

## 2. Règle de zonage (non négociable)

Le site utilise **deux chartes qui ne partagent jamais la même surface**.

- **SYSTEM** est la charte de base. Elle couvre tout le site.
- **NEXUS** apparaît dans **une seule section**, la zone builder (section 6), en full-bleed, avec une rupture visuelle franche.

**Le cyan n'existe nulle part en dehors de la zone NEXUS.** Aucun accent cyan dans le hero, la nav, les stats, les CTA ou le footer. Si du cyan apparaît ailleurs, le zonage est cassé et la section builder perd tout son impact.

Le hero actuel du site (ligne d'accroche en cyan sur fond monochrome) est exactement ce qu'il ne faut pas faire. À corriger.

---

## 3. Élément signature : l'aura

C'est le seul effet mémorable de la page, tout le reste reste sobre.

Une **aura radiale** en fond, large, douce, centrée derrière le contenu. Elle apparaît exactement **deux fois** sur le site, dans deux états :

1. **Hero (zone SYSTEM)** : aura **blanche**, `rgba(255,255,255,0.10)` au centre vers transparent, très diffuse. C'est l'athlète.
2. **Zone builder (zone NEXUS)** : la **même** aura, en **cyan / violet**. C'est le développeur.

Même forme, deux états. Le visiteur enregistre inconsciemment que c'est la même personne dans deux modes. C'est l'argument visuel du pont athlète / builder, et il ne demande aucune explication écrite.

L'aura respire lentement (cycle de 8 à 12 secondes, opacité et scale très légers). Respecter `prefers-reduced-motion`.

---

## 4. Tokens

### Zone SYSTEM (tout le site sauf section 6)

```css
--bg:            #000000;
--surface:       rgba(255, 255, 255, 0.035);
--surface-hover: rgba(255, 255, 255, 0.06);
--border:        rgba(255, 255, 255, 0.10);
--text:          #FFFFFF;
--text-muted:    #A1A1AA;
--text-dim:      #52525B;
--aura:          rgba(255, 255, 255, 0.10);
```

Noir pur, pas de gris foncé. Aucun accent coloré. Le seul « accent » est le blanc pur sur fond noir, et le contraste de taille de typo.

### Zone NEXUS (section 6 uniquement)

Reprendre les valeurs exactes de `NEXUS.md`. Base attendue : noir OLED, Cyber Cyan `#00FFFF`, violet sombre, glassmorphism.

### Surfaces verre (les deux zones)

`background: var(--surface)` + `backdrop-filter: blur(20px)` + `1px solid var(--border)` + `border-radius` généreux (16 à 24px sur les cartes, full pill sur la nav et les boutons).

### Typo

- Display : **Outfit**, poids 700 à 900, tracking serré, très grandes tailles
- Body : **Inter**, 400 à 500
- Utility (labels, chiffres, eyebrows) : **Share Tech Mono**, uppercase, letter-spacing large (0.2em)

Les labels et les chiffres passent tous en mono. C'est ce qui donne le registre instrument de mesure plutôt que page marketing.

---

## 5. Structure de la page

### 1. Nav

Pill flottante, centrée, verre, `position: fixed`, en haut. Monochrome. Logo KEVINGYM à gauche dans la pill ou juste à côté.

CTA primaire de la nav : **Work with me**. Pas « Le programme ».

### 2. Hero

- Aura blanche en fond
- Eyebrow mono : `CONTENT CREATOR / HYBRID ATHLETE / FOUNDER` en `--text-dim`, pas en cyan
- Display : **KEVIN NGUENA**, très grand
- Slogan **BUILT BY COURAGE** traité comme un élément structurel, pas comme un sous-titre décoratif
- Une seule photo, verticale, en verre arrondi
- CTA primaire : `Work with me` (blanc plein). CTA secondaire : `The programme` (texte souligné, discret, vers kevingymworkout.com)

**Photo hero** : remplacer le selfie miroir actuel par une image cinématique. Placeholder explicite si l'asset n'est pas fourni, ne pas réutiliser l'ancienne.

### 3. Proof bar

Bande de chiffres en mono, juste sous le hero. C'est la section qui fait le travail commercial.

`TIKTOK 111K` · `INSTAGRAM 30K` · `TOP POST 466K VIEWS` · `AUDIENCE 18-34 M` · `FR + INTERNATIONAL`

Chiffres en display, labels en mono `--text-dim`. Aucun graphique, aucune illustration.

Tous les chiffres viennent d'un seul objet `stats` en haut du fichier de données, pour que Kevin les mette à jour en un endroit.

### 4. Identity

Manifeste court, 3 à 4 lignes maximum, en anglais, à la première personne. Autour de : discipline, focus, lock in, esthétisme, no limit.

Pas de grille de « valeurs » avec des icônes. Du texte, grand, aéré, et c'est tout.

### 5. Work / Visuals

Galerie plein cadre des meilleures images et vidéos. Format vertical dominant (c'est du contenu mobile). Grille irrégulière plutôt qu'un carrousel.

Sous la galerie : ce qu'il livre concrètement. `Instagram Reels` · `TikTok` · `UGC` · `Shoots` · `Long-form`.

### 6. Partnerships

Marques actuelles : Ultrahuman, ARNTREAL. Prévoir un emplacement pour une troisième.

Format sobre : nom de la marque, une ligne sur ce qui a été livré, éventuellement un résultat chiffré. Pas de mur de logos vide.

### 7. BUILDER — zone NEXUS

**Rupture franche.** Section full-bleed, l'aura devient cyan, le glassmorphism s'active, la typo passe en registre interface. Le visiteur doit sentir qu'il change de monde en une ligne de scroll.

Contenu :
- Label mono d'entrée de zone : `// SYSTEM ARCHITECT`
- Le fait brut : il code. Stage de 2 mois chez Surfy, pipeline ETL TypeScript en production pour l'automatisation de plans CAD/DXF
- KEVINGYM comme plateforme qu'il a construite lui-même : React, Tailwind, Supabase, Stripe, Vercel
- Stack en tags mono

C'est la section qui fait la différence face aux autres créateurs fitness. Elle doit être aussi soignée que le hero.

Sortie de zone : retour au noir SYSTEM, franc.

### 8. Contact

CTA primaire : email direct vers l'adresse business. Second : téléchargement du media kit (prévoir le bouton même si le PDF n'existe pas encore, avec un état désactivé propre).

Footer minimal, mono, liens réseaux.

---

## 6. Contraintes d'exécution

- Respecter la stack existante du repo. Ne pas introduire de nouvelle librairie UI.
- Responsive jusqu'à 375px. La proof bar et la galerie sont les deux points de casse à surveiller.
- Focus clavier visible, contrastes AA, `prefers-reduced-motion` respecté.
- Animations : reveal au scroll discret, hover sur les surfaces verre, respiration de l'aura. Rien d'autre.
- Aucun contenu inventé qui ressemble à du réel. Si une donnée manque, placeholder explicite en majuscules.
- Copy : anglais, voix active, phrases courtes. Pas de tirets cadratins, pas de listes de trois adjectifs, pas de superlatifs vides.
- Ne rien déployer et ne pas toucher aux domaines. Kevin gère le DNS lui-même.
