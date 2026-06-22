# devhood.net

Personal site for Tim Chaffin, hosted on Azure Static Web Apps.

## Stack

- **Vite + React 18 + TypeScript** — fast builds, modern React
- **Tailwind CSS** — Tesla-inspired minimal design tokens live in `tailwind.config.js`
- **react-router-dom** — `/`, `/blog`, `/gallery` (last two are placeholders for future features)
- **Vitest + Testing Library** — unit tests in `src/**/__tests__`
- **Playwright** — e2e smoke tests in `e2e/`, run against both desktop and mobile Chromium

## Scripts

```bash
npm run dev         # local dev server (http://localhost:3000)
npm run build       # production build into ./build
npm run preview     # serve the build locally
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # vitest (unit)
npm run test:e2e    # playwright (requires `npx playwright install chromium` once)
```

## Project layout

```
src/
  components/      reusable UI (Layout, Portrait, SocialLinks, SocialIcon)
  data/            content / configuration (socials list lives here)
  pages/           one file per route
  styles/          global CSS + Tailwind entrypoint
  test/            shared test setup
e2e/               Playwright specs
public/            static assets served verbatim
.github/workflows/ CI, deploy, weekly auto-update, post-deploy smoke
```

Add a new social? Edit [src/data/socials.ts](src/data/socials.ts).
Add a new route? Add a page in `src/pages/` and register it in [src/App.tsx](src/App.tsx).

## Automation

| Workflow | Trigger | What it does |
| --- | --- | --- |
| [ci.yml](.github/workflows/ci.yml) | every push & PR | typecheck, lint, unit, build, e2e |
| [deploy.yml](.github/workflows/deploy.yml) | push to `main`, PR open/sync | builds and deploys to Azure SWA, then dispatches the smoke workflow |
| [post-deploy-smoke.yml](.github/workflows/post-deploy-smoke.yml) | after each prod deploy + nightly | runs Playwright against `https://devhood.net`. **If it fails and the bad commit was from a bot, it auto-reverts on `main`.** Human commits get a P0 issue instead. |
| [weekly-update.yml](.github/workflows/weekly-update.yml) | Mondays 12:00 UTC | runs `npm update`, full CI, opens an auto-merging PR |
| [codeql.yml](.github/workflows/codeql.yml) | push, PR, weekly | static security analysis |
| [dependabot.yml](.github/dependabot.yml) | weekly | grouped npm + GitHub Actions updates |

### Auto-rollback flow

```
push to main → deploy.yml → SWA deploy → post-deploy-smoke.yml
                                            │
                                  ┌─────────┴─────────┐
                                  ▼                   ▼
                              smoke pass         smoke fail
                                  │                   │
                                  │       ┌───────────┴───────────┐
                                  │       ▼                       ▼
                                  │   bot commit             human commit
                                  │       │                       │
                                  │   git revert + push       open P0 issue
                                  │   (triggers redeploy)
                                  ▼
                              done
```

### Required repo settings

For auto-merge to work on the weekly-update PR, enable **Settings → General → Pull Requests → Allow auto-merge**. Branch protection rules on `main` are honored (the bot still has to pass CI).

## Adding a future feature (e.g. blog posts)

1. Drop content under `src/content/` (or wherever you prefer).
2. Add a new page in `src/pages/` that imports/renders it.
3. Register the route in `src/App.tsx`.
4. Add an e2e spec for the happy path.

That's it — the rest of the pipeline picks it up automatically.
