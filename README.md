# Bourse Privée — HelloSafe

Refonte moderne du Club Bourse Privée : un espace pour aider les internautes à acheter et vendre des actifs financiers en toute sérénité.

Inspiré des meilleurs acteurs US (Public, Robinhood, M1, Wealthfront), construit sur le design system HelloSafe.

## Stack

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript strict
- **UI** : Tailwind CSS 4 + tokens HelloSafe
- **Charts** : Recharts
- **Icônes** : Lucide React
- **Animations** : Framer Motion

## Structure

```
src/
├── app/                       # Pages App Router
│   ├── page.tsx               # Home Club Bourse Privée
│   ├── club/                  # Questions, Battle, WhatsApp
│   ├── actualites/            # Fil, Journal, Morning Zapping, Évènements
│   ├── portefeuilles/         # LT, CT, ETF, Recos, Performances
│   ├── analyses/              # Portefeuille, Technique, Objectifs, Sélections, Formations
│   ├── valeur/[ticker]/       # Fiche valeur SSG
│   ├── recherche/             # Screener
│   └── profil/                # Espace membre
├── components/
│   ├── layout/                # Header, Footer, SubNav, PageHero
│   ├── ui/                    # Button, Card, Badge, Avatar, Sparkline, AreaChart, …
│   ├── home/                  # Sections de la home
│   └── portfolio/             # Détail portefeuille
├── data/                      # Données fictives (stocks, posts, news, portefeuilles)
└── lib/                       # Utilitaires (formatPrice, formatPercent, …)
```

## Commandes

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
```

## Design system

Tokens définis dans `src/app/globals.css` :

- Violet primaire `#563BFF`
- Orange `#FF7049`
- Vert `#20C997`
- Noir `#0C2543`
- Base 4px, radius `lg=16px` `xl=24px`
- Font Inter

## Pages incluses

23 pages statiques + 17 fiches valeur générées en SSG, soit 40 routes au total. Toutes les données sont mockées dans `src/data/` pour pouvoir évoluer vers une intégration API plus tard.

## Déploiement

Le projet se déploie sans configuration sur Vercel. Aucune variable d'environnement requise.
