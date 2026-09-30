# Cloud Computing Associates

The marketing website for Cloud Computing Associates, a national AI consulting firm.
We help leadership teams deploy AI agents, knowledge assistants and automation on
Google Cloud. Built with Angular 19.

## Run locally

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`. The app reloads automatically as you edit source files.

## Build

```bash
ng build
```

Build output is written to `dist/cloudcomputingassociates-com/`. The static site is
prerendered so every route ships complete HTML for crawlers.

## Deploy

The site is hosted on GitHub (CloudComputingAssociates org) and deploys to Netlify,
publishing from the `dev` branch. Netlify runs `npm run build` and serves the
prerendered output. Contact form submissions are handled by Netlify Forms.
