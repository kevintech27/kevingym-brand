# DA â€” kevingym.com (vitrine marque)

Document de rÃ©fÃ©rence pour le design du site. Les valeurs exactes vivent dans `tailwind.config.js` et `src/index.css`.

---

## 1. Ce qu'est ce site

Vitrine de marque personnelle de Kevin Nguena. Le job unique de la page : convaincre une marque, une agence ou une salle premium de travailler avec lui, en moins de 30 secondes.

Ce n'est pas un site produit. Le programme et l'app vivent sur `kevingymworkout.com` et ne sont qu'un lien secondaire ici.

Audience : brand managers, athlete managers, agences, salles de sport haut de gamme. Majoritairement anglophones ou habituÃ©s Ã  travailler en anglais.

**Langue par dÃ©faut : anglais.** Pas de version franÃ§aise en v1.

Slogan : **BUILT BY COURAGE**

Territoire de marque : discipline, focus, lock in, sport, bien-Ãªtre, esthÃ©tisme, no limit.

---

## 2. RÃ¨gle de zonage (non nÃ©gociable)

Le site utilise **deux chartes qui ne partagent jamais la mÃªme surface**.

- **SYSTEM** est la charte de base. Elle couvre tout le site.
- **ACCENT** apparaÃ®t dans **une seule section**, la zone builder (section 6), en full-bleed, avec une rupture visuelle franche.

**Le cyan n'existe nulle part en dehors de la zone accent.** Aucun accent cyan dans le hero, la nav, les stats, les CTA ou le footer. Si du cyan apparaÃ®t ailleurs, le zonage est cassÃ© et la section builder perd tout son impact.

Le hero actuel du site (ligne d'accroche en cyan sur fond monochrome) est exactement ce qu'il ne faut pas faire. Ã€ corriger.

---

## 3. Ã‰lÃ©ment signature : l'aura

C'est le seul effet mÃ©morable de la page, tout le reste reste sobre.

Une **aura radiale** en fond, large, douce, centrÃ©e derriÃ¨re le contenu. Elle apparaÃ®t exactement **deux fois** sur le site, dans deux Ã©tats :

1. **Hero (zone SYSTEM)** : aura **blanche**, `rgba(255,255,255,0.10)` au centre vers transparent, trÃ¨s diffuse. C'est l'athlÃ¨te.
2. **Zone builder (zone accent)** : la **mÃªme** aura, en **cyan / violet**. C'est le dÃ©veloppeur.

MÃªme forme, deux Ã©tats. Le visiteur enregistre inconsciemment que c'est la mÃªme personne dans deux modes. C'est l'argument visuel du pont athlÃ¨te / builder, et il ne demande aucune explication Ã©crite.

L'aura respire lentement (cycle de 8 Ã  12 secondes, opacitÃ© et scale trÃ¨s lÃ©gers). Respecter `prefers-reduced-motion`.

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

Noir pur, pas de gris foncÃ©. Aucun accent colorÃ©. Le seul Â« accent Â» est le blanc pur sur fond noir, et le contraste de taille de typo.

### zone accent (section 6 uniquement)

Valeurs exactes dans `src/index.css`, classes `kg-accent-*`. Base : noir OLED, Accent cyan `#00FFFF`, violet sombre, glassmorphism.

### Surfaces verre (les deux zones)

`background: var(--surface)` + `backdrop-filter: blur(20px)` + `1px solid var(--border)` + `border-radius` gÃ©nÃ©reux (16 Ã  24px sur les cartes, full pill sur la nav et les boutons).

### Typo

- Display : **Outfit**, poids 700 Ã  900, tracking serrÃ©, trÃ¨s grandes tailles
- Body : **Inter**, 400 Ã  500
- Utility (labels, chiffres, eyebrows) : **Share Tech Mono**, uppercase, letter-spacing large (0.2em)

Les labels et les chiffres passent tous en mono. C'est ce qui donne le registre instrument de mesure plutÃ´t que page marketing.

---

## 5. Structure de la page

### 1. Nav

Pill flottante, centrÃ©e, verre, `position: fixed`, en haut. Monochrome. Logo KEVINGYM Ã  gauche dans la pill ou juste Ã  cÃ´tÃ©.

CTA primaire de la nav : **Work with me**. Pas Â« Le programme Â».

### 2. Hero

- Aura blanche en fond
- Eyebrow mono : `CONTENT CREATOR / HYBRID ATHLETE / FOUNDER` en `--text-dim`, pas en cyan
- Display : **KEVIN NGUENA**, trÃ¨s grand
- Slogan **BUILT BY COURAGE** traitÃ© comme un Ã©lÃ©ment structurel, pas comme un sous-titre dÃ©coratif
- Une seule photo, verticale, en verre arrondi
- CTA primaire : `Work with me` (blanc plein). CTA secondaire : `The programme` (texte soulignÃ©, discret, vers kevingymworkout.com)

**Photo hero** : remplacer le selfie miroir actuel par une image cinÃ©matique. Placeholder explicite si l'asset n'est pas fourni, ne pas rÃ©utiliser l'ancienne.

### 3. Proof bar

Bande de chiffres en mono, juste sous le hero. C'est la section qui fait le travail commercial.

`TIKTOK 111K` Â· `INSTAGRAM 30K` Â· `TOP POST 466K VIEWS` Â· `AUDIENCE 18-34 M` Â· `FR + INTERNATIONAL`

Chiffres en display, labels en mono `--text-dim`. Aucun graphique, aucune illustration.

Tous les chiffres viennent d'un seul objet `stats` en haut du fichier de donnÃ©es, pour que Kevin les mette Ã  jour en un endroit.

### 4. Identity

Manifeste court, 3 Ã  4 lignes maximum, en anglais, Ã  la premiÃ¨re personne. Autour de : discipline, focus, lock in, esthÃ©tisme, no limit.

Pas de grille de Â« valeurs Â» avec des icÃ´nes. Du texte, grand, aÃ©rÃ©, et c'est tout.

### 5. Work / Visuals

Galerie plein cadre des meilleures images et vidÃ©os. Format vertical dominant (c'est du contenu mobile). Grille irrÃ©guliÃ¨re plutÃ´t qu'un carrousel.

Sous la galerie : ce qu'il livre concrÃ¨tement. `Instagram Reels` Â· `TikTok` Â· `UGC` Â· `Shoots` Â· `Long-form`.

### 6. Partnerships

Marques actuelles : Ultrahuman, ARNTREAL. PrÃ©voir un emplacement pour une troisiÃ¨me.

Format sobre : nom de la marque, une ligne sur ce qui a Ã©tÃ© livrÃ©, Ã©ventuellement un rÃ©sultat chiffrÃ©. Pas de mur de logos vide.

### 7. BUILDER â€” zone accent

**Rupture franche.** Section full-bleed, l'aura devient cyan, le glassmorphism s'active, la typo passe en registre interface. Le visiteur doit sentir qu'il change de monde en une ligne de scroll.

Contenu :
- Label mono d'entrÃ©e de zone : `// SYSTEM ARCHITECT`
- Le fait brut : il code. Stage de 2 mois chez Surfy, pipeline ETL TypeScript en production pour l'automatisation de plans CAD/DXF
- KEVINGYM comme plateforme qu'il a construite lui-mÃªme : React, Tailwind, Supabase, Stripe, Vercel
- Stack en tags mono

C'est la section qui fait la diffÃ©rence face aux autres crÃ©ateurs fitness. Elle doit Ãªtre aussi soignÃ©e que le hero.

Sortie de zone : retour au noir SYSTEM, franc.

### 8. Contact

CTA primaire : email direct vers l'adresse business. Second : tÃ©lÃ©chargement du media kit (prÃ©voir le bouton mÃªme si le PDF n'existe pas encore, avec un Ã©tat dÃ©sactivÃ© propre).

Footer minimal, mono, liens rÃ©seaux.

---

## 6. Contraintes d'exÃ©cution

- Respecter la stack existante du repo. Ne pas introduire de nouvelle librairie UI.
- Responsive jusqu'Ã  375px. La proof bar et la galerie sont les deux points de casse Ã  surveiller.
- Focus clavier visible, contrastes AA, `prefers-reduced-motion` respectÃ©.
- Animations : reveal au scroll discret, hover sur les surfaces verre, respiration de l'aura. Rien d'autre.
- Aucun contenu inventÃ© qui ressemble Ã  du rÃ©el. Si une donnÃ©e manque, placeholder explicite en majuscules.
- Copy : anglais, voix active, phrases courtes. Pas de tirets cadratins, pas de listes de trois adjectifs, pas de superlatifs vides.
- Ne rien dÃ©ployer et ne pas toucher aux domaines. Kevin gÃ¨re le DNS lui-mÃªme.
