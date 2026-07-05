# AGENTS.md — PotatoWeb

## Stack
- Vue 3 + Composition API + Vite
- Vue Router 4 with `createWebHashHistory` (all routes lazy-loaded)
- CSS vanilla (variables in `src/styles/main.css`)
- GSAP + ScrollTrigger loaded via CDN in `index.html` — do NOT `npm install gsap`. Use `useGsap` composable from `@/composables/useGsap.js`.
- `@/` → `src/` (configured in `vite.config.js`)

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (HMR at localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | `gh-pages -d dist` (pushes dist/ to gh-pages branch) |

No test, lint, typecheck, or formatter scripts.

## Routes (only 3)
| Path | View | Content |
|------|------|---------|
| `/` | HomeView | HeroSection + ServicesSection + ContactSection |
| `/contacto` | ContactView | Hero + ContactSection |
| `*` | NotFoundView | 404 redirect |

No standalone `/servicios` route — services are embedded in HomeView via `ServicesSection` component.

## Architecture
- `src/views/` — 3 page-level components (one per route), lazy-imported by router
- `src/components/` — reusable sections (`HeroSection`, `ServicesSection`, `ContactSection`, `Navbar`, `Footer`)
- `src/composables/` — `useGsap` (GSAP helpers), `useScrollAnimations` (IntersectionObserver)
- `App.vue` wraps Navbar + Footer + custom cursor overlay + `<Transition>` for page fade
- `HomeView` composes HeroSection + ServicesSection + ContactSection; other views are standalone

## Color palette (vintage-tech)
```
--color-primary: #FF0302    --color-bg-alt: #364452
--color-secondary: #4E6F82  --color-text: #FADBBE
--color-bg: #2E3841         --color-text-muted: #c9ad96
```
Full set in `src/styles/main.css`.

## Deployment
- **GitHub Pages (current)**: Root `index.html` redirects to `dist/index.html` via conditional script. `dist/` is committed and tracked.
- **GitHub Actions (alternative)**: `.github/workflows/deploy.yml` — workflow uses `npm ci`. Requires Pages source set to "GitHub Actions" in repo Settings.
- **Vercel**: needs `/* /index.html` rewrite (create `vercel.json`).
- **Netlify**: needs `public/_redirects` with `/* /index.html 200`.

## Critical gotchas

### 1. Vite base — conditional for GitHub Pages subdirectory
```js
base: process.env.GITHUB_ACTIONS ? '/Potato-Ship/dist/' : '/'
```
- CI build: assets at `/Potato-Ship/dist/assets/...`
- Local dev: base `/`
- **Do not hardcode** either value.

### 2. Hash routing avoids SPA issues on GitHub Pages
URLs: `/#/contacto`. No `BASE_URL` needed. No server-side redirect required.
**README says `createWebHistory` but the router actually uses `createWebHashHistory`** — trust the router, not the README.

### 3. Root `index.html` conditional redirect to `dist/` on GitHub Pages
Script guards against loop on `dist/index.html` itself. No-op on localhost.

### 4. `public/404.html` is a simple redirect to `index.html`

### 5. Bento grid wrapper pattern (`ServicesSection.vue`)
- Grid items are `.bento-card-wrapper` (not `.bento-card`).
- `is-active` on BOTH wrapper (`grid-column: 1 / -1`) and card (visual styles: row layout, enlarged icon).
- FLIP animation captures wrapper `getBoundingClientRect()` before/after state change.
- `.bento-card__right` needs `max-width: 0; max-height: 0; overflow: hidden` in inactive state.
- Hover play/reverse on paused GSAP `animateServiceCard` timelines. Click toggles independent pin state (multiple cards can be active).
- `animateServiceCard(type, container)` in `useGsap.js` — animated SVG illustrations per card type.

### 6. GSAP is global (`window.gsap`, `window.ScrollTrigger`)
Import `useGsap` composable. Do NOT npm-install gsap.

### 7. Custom cursor (`App.vue`)
- Fixed overlay with `pointer-events: none; z-index: 10000`.
- Tracks mouse via `gsap.quickTo`. Hover expansion on `a, button, .btn, .service-card, input, textarea, select`.
- `MutationObserver` re-attaches listeners on DOM changes.
- Hidden on touch devices via `@media (hover: none)`.

### 8. `dist/` is tracked in git (not in `.gitignore`)
Required for the current GitHub Pages deployment strategy (root `index.html` redirects to `dist/index.html`).

## Contact form
Placeholder (`setTimeout` → `alert` + reset). To connect Formspree/Web3Forms, change the `<form>` `action` in `ContactSection.vue`.
