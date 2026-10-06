# Reprise — portfolio Next.js

Note de passation entre sessions Claude. Objectif : recréer en Next.js le portfolio Flutter
situé dans `../portfolio` (en ligne : https://moisedev.netlify.app), sous forme de **refonte
moderne** — même contenu, nouveau design. Supprimer ce fichier une fois le travail terminé.

## Décisions prises (validées par l'utilisateur)

| Sujet | Choix |
|---|---|
| Emplacement | Projet indépendant `../portfolio-next` (ce dossier), son propre dépôt git. Le repo Flutter reste intact. |
| Design | **Refonte moderne** : typo soignée, mise en page éditoriale, animations au scroll discrètes. Pas un port à l'identique du look Material. |
| Langues | Routes `/fr` et `/en` avec **next-intl** (FR = langue par défaut). Détection de la langue via le proxy next-intl (`src/proxy.ts`, nom utilisé par Next 16 à la place de `middleware.ts`). |
| Police | **Calibri par défaut** (consigne de l'organisation). `font-family: Calibri, var(--font-carlito), sans-serif`, avec Carlito via `next/font/google` (clone métrique libre de Calibri). Une police mono est acceptable uniquement pour de petits libellés. |

## État actuel

- Projet créé avec `create-next-app` : Next 16.3.8, React 19.2, TypeScript, Tailwind v4, ESLint, App Router, `src/`, alias `@/*`.
- Dépendances installées (`package-lock.json` présent). Toujours activer Node 22 avant les commandes npm/next :
  ```bash
  source ~/.nvm/nvm.sh && nvm use   # Node 22 (.nvmrc). Le Node 18 du système est trop ancien pour Next 16.
  ```
- Connexion lente (~110 Ko/s) et disque NTFS (fuseblk) : une installation complète prend une douzaine de minutes. `.npmrc` allonge les délais d'attente réseau ; lancer les installations en arrière-plan.
- Pas encore de dépôt git → `git init` (branche `main`).
- Les fichiers `src/app/*` et `public/*.svg` sont ceux du template ; ils sont à remplacer.

## Tâches

1. [x] Terminer l'installation
   [ ] `npm i next-intl next-themes react-icons`
2. [ ] `git init` + premier commit du scaffold
3. [ ] Copier les images de `../portfolio/assets/images/` vers `public/images/` (photo `mauyz_resized.jpg` en 500×549, aperçus de projets en ~2000×1600, logos de compétences en PNG, `logo.png`). Favicon/icônes : `../portfolio/web/icons/` et `web/favicon.png`.
4. [ ] Configurer i18n : `src/i18n/routing.ts` (`locales: ['fr','en']`, `defaultLocale: 'fr'`), `src/i18n/request.ts`, `src/proxy.ts`, plugin dans `next.config.ts`, `app/[locale]/layout.tsx` avec `generateStaticParams` + `setRequestLocale` (rendu SSG).
5. [ ] Messages `messages/fr.json` / `messages/en.json` portés depuis `../portfolio/lib/l10n/intl_{fr,en}.arb`. Les puces de description (séparées par `\n` dans les .arb) deviennent des tableaux, lus avec `t.raw()`.
6. [ ] Données typées dans `src/content/` (champs non traduits : dates, stack, liens, images ; les textes viennent des messages).
7. [ ] Thème clair/sombre avec next-themes (`attribute="class"`, système par défaut). Tailwind v4 : `@custom-variant dark (&:where(.dark, .dark *));`, tokens de couleur en variables CSS dans `@theme`.
8. [ ] Sections (voir ci-dessous), métadonnées SEO par langue (`generateMetadata`, `alternates.languages`), Open Graph.
9. [ ] `npm run lint` et `npm run build` sans erreur, vérification visuelle en clair/sombre, FR/EN, mobile/desktop.
10. [ ] README (stack, scripts, déploiement Vercel ou Netlify).

## Sources du contenu (repo Flutter `../portfolio`)

| Contenu | Fichier source |
|---|---|
| Nom, titres animés, bio, lien du CV (différent en FR et en EN) | `lib/core/constants/infos_constants.dart` |
| Contacts | `lib/core/constants/contact_constants.dart` |
| Expériences (5) | `lib/core/constants/experience_constants.dart` |
| Formations (3) | `lib/core/constants/formation_constants.dart` |
| Compétences (4 catégories) | `lib/core/constants/stack_constants.dart` |
| Projets (6) | `lib/core/constants/project_constants.dart` |
| Tous les textes FR/EN | `lib/l10n/intl_fr.arb`, `lib/l10n/intl_en.arb` |

Points à respecter lors du portage :
- **Contacts** : téléphone `+261 34 90 637 88` → deux actions, « Chat » via WhatsApp (`https://wa.me/261349063788`) et « Appeler » (`tel:+261349063788`). Mail `tsiorymauyz@gmail.com` (`mailto:`). LinkedIn `https://linkedin.com/in/moise-tsiorinambinina`. GitHub `https://github.com/mauyz`. Localisation : Antananarivo, Madagascar. Skype a été retiré : ne pas le remettre.
- Projet « Portfolio » : son lien GitHub pointe vers `portfolio-fluter`. Le garder tel quel, ou proposer d'ajouter le dépôt de cette version Next.
- Le projet Feelin n'a aucun lien : n'afficher la zone de liens que si elle n'est pas vide.
- Copyright : `© {année courante} Moïse T.`
- La bio mentionne « quatre dernières années » : c'est le texte d'origine. Ne pas inventer de chiffres, de statistiques ni de disponibilité absents des sources.

## Direction de design (refonte)

- Palette : neutres chauds (fond clair ~`#FAFAF9`, sombre ~`#0B0B0C`), accent bleu héritier du `#2196F3` d'origine, mais plus profond (~`#1D6FE8` en clair, ~`#5B9BFF` en sombre). Vérifier les contrastes AA.
- **En-tête** sticky minimal : monogramme « MT », ancres (À propos, Parcours, Compétences, Projets, Contact), sélecteur FR/EN (conserver l'ancre en changeant de langue), bouton thème. Menu en panneau sur mobile.
- **Hero** : grand nom en typographie éditoriale, rotation des 3 titres (`softwareIng`, `devMobileTitle`, `passionateTech`) en fondu/glissement, boutons « Télécharger mon CV » et « Me contacter », photo cadrée.
- **À propos** : bio en paragraphes avec la photo ou des repères factuels.
- **Parcours** : deux blocs, Professionnel (texte d'intro `careerProIntro`) et Académique (`careerScholIntro`). Lignes de timeline : période à gauche ; à droite poste, entreprise, type, lieu, puces et chips de stack.
- **Compétences** : intro `skillIntro`, grille par catégorie avec les logos PNG.
- **Projets** : intro `projectIntro` et `gitHubIntro` + lien GitHub + `gitHubEndIntro`, cartes avec aperçu (`next/image`), description, chips de stack, liens (APKPure, Play Store, App Store, Web, GitHub).
- **Contact / footer** : grand « Construisons de belles choses ! » (`footerIntro`), `contactMe`, boutons mail / WhatsApp / appel / LinkedIn / GitHub, copyright.
- Animations : un petit composant client `Reveal` (IntersectionObserver + transitions CSS) qui respecte `prefers-reduced-motion`. Pas de bibliothèque d'animation lourde.
- Icônes : `react-icons` (`lu` pour l'interface, `si`/`fa` pour les marques).
- Responsive avec une gouttière de 16px sur mobile et aucun scroll horizontal.
