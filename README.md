# Portfolio — Moïse Tsiorinambinina

Refonte en Next.js du portfolio Flutter (https://moisedev.netlify.app) : même contenu, nouveau design éditorial, en français et en anglais, avec thème clair et sombre.

## Stack

- **Next.js 16** (App Router, Turbopack, rendu statique des pages `/fr` et `/en`)
- **React 19**, **TypeScript**
- **Tailwind CSS v4** : les couleurs sont des variables CSS dans [`src/app/globals.css`](src/app/globals.css)
- **next-intl** pour les langues, avec `next/root-params` et un proxy ([`src/proxy.ts`](src/proxy.ts)) qui redirige `/` vers la langue du navigateur
- **next-themes** pour le mode clair/sombre (préférence système par défaut)
- **react-icons** pour les icônes
- Police : Calibri par défaut, avec Carlito (clone métrique libre) chargé via `next/font/google`

## Prérequis

Node 22 (voir `.nvmrc`) :

```bash
source ~/.nvm/nvm.sh && nvm use
npm install
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement sur http://localhost:3000 |
| `npm run build` | Build de production (vérifie aussi les types) |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |

## Modifier le contenu

| Contenu | Fichier |
|---|---|
| Textes FR / EN (bio, intitulés, puces, descriptions) | [`messages/fr.json`](messages/fr.json), [`messages/en.json`](messages/en.json) |
| Identité, lien du CV par langue, contacts | [`src/content/profile.ts`](src/content/profile.ts) |
| Expériences et formations (dates, entreprises, stack) | [`src/content/career.ts`](src/content/career.ts) |
| Compétences et logos | [`src/content/skills.ts`](src/content/skills.ts) |
| Projets (aperçus, stack, liens) | [`src/content/projects.ts`](src/content/projects.ts) |
| Images | `public/images/` (`projects/` en 2000×1600, `skills/` en PNG) |

Les données de `src/content/` ne contiennent que ce qui ne se traduit pas. Chaque entrée a un `id` qui renvoie à ses textes dans les fichiers de messages. Les clés des messages sont typées à partir de `messages/fr.json` : une clé manquante fait échouer `npm run build`.

## Structure

```
src/
  app/
    [locale]/            layout racine, page, 404, image Open Graph
    sitemap.ts, robots.ts, icônes
  components/
    sections/            hero, à propos, parcours, compétences, projets, contact
    site-header.tsx      en-tête sticky, menu mobile, section active
    reveal.tsx           apparition au scroll (respecte prefers-reduced-motion)
  content/               données typées
  i18n/                  routing et configuration next-intl
  proxy.ts               détection de la langue
messages/                textes FR / EN
```

## Déploiement

Définir l'URL publique du site, utilisée pour l'URL canonique, Open Graph et le sitemap :

```
NEXT_PUBLIC_SITE_URL=https://exemple.com
```

Sans cette variable, l'URL est déduite de `VERCEL_PROJECT_PRODUCTION_URL` (Vercel) ou de `URL` (Netlify), et à défaut vaut `http://localhost:3000`.

- **Vercel** : importer le dépôt, aucune configuration supplémentaire.
- **Netlify** : importer le dépôt. Netlify détecte Next.js et applique son runtime (commande `npm run build`). Mettre `NODE_VERSION=22` dans les variables d'environnement si besoin.

Le proxy de langue tourne côté serveur : un export statique pur (`output: "export"`) n'est pas utilisé.

## Licences

Les fichiers Carlito de `src/assets/fonts/` (utilisés uniquement pour générer l'image Open Graph) sont sous licence SIL Open Font License, voir [`OFL.txt`](src/assets/fonts/OFL.txt).
