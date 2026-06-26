# AGENTS.md — PotatoWeb

## Stack
- Vue 3 + Composition API + Vite
- Vue Router 4 with `createWebHashHistory` (all routes lazy-loaded)
- CSS vanilla (variables in `src/styles/main.css`)
- GSAP + ScrollTrigger loaded via CDN in `index.html` (not npm). Use `useGsap` composable.

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (HMR at localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | `gh-pages -d dist` (pushes dist/ to gh-pages branch) |

No test, lint, typecheck, or formatter scripts configured.

## Architecture
- `src/views/` — page-level components (one per route), lazy-imported by router
- `src/components/` — reusable sections (HeroSection, ServicesSection, ContactSection)
- `src/composables/` — shared logic (`useGsap`, `useScrollAnimations`)
- `HomeView` composes HeroSection + ServicesSection + ContactSection. Other views are standalone pages.
- `App.vue` wraps everything in Navbar + Footer + custom cursor overlay with `<Transition>` for page fade.
- `@/` → `src/` (configured in `vite.config.js`)

## Routes
| Path | View | Content |
|------|------|---------|
| `/` | HomeView | Hero + Services + Contact |
| `/servicios` | ServicesView | Hero + 6 main services + 4 additional services |
| `/contacto` | ContactView | Hero + contact form |
| `*` | NotFoundView | 404 |

## Color palette (vintage-tech)
```
--color-primary: #FF0302    --color-bg-alt: #364452
--color-secondary: #4E6F82  --color-text: #FADBBE
--color-bg: #2E3841         --color-text-muted: #c9ad96
```
Full set (incl. `--color-primary-hover`, `--color-bg-card`, `--color-text-dim`, `--color-border`) in `src/styles/main.css`.

## Deployment
- **GitHub Pages** (current): Serves from `main` branch root. Root `index.html` redirects to `dist/index.html` via conditional script. `dist/` committed to repo.
- **GitHub Actions** (alternative): `.github/workflows/deploy.yml` exists with `actions/deploy-pages@v4` — requires Pages source set to "GitHub Actions" in repo Settings.
- **Vercel**: `vercel.json` with `/* /index.html` rewrite.
- **Netlify**: needs `public/_redirects` with `/* /index.html 200`.

## Critical gotchas

### 1. Vite base path — conditional for GitHub Pages subdirectory
`vite.config.js`: `base: process.env.GITHUB_ACTIONS ? '/Potato-Ship/dist/' : '/'`
- CI build: assets at `/Potato-Ship/dist/assets/...`
- Local dev: base `/` (Vite dev server)
- **Do not hardcode** either value.

### 2. Hash routing avoids SPA issues on GitHub Pages
```js
history: createWebHashHistory()
```
URLs: `/#/servicios`, `/#/contacto`. No `BASE_URL` needed. No server-side redirect required.

### 3. Root `index.html` conditional redirect
A script in root `index.html` redirects visitors on GitHub Pages:
```html
<script>if (location.hostname.includes('github.io') && !location.pathname.startsWith('/Potato-Ship/dist/')) { location.href = '/Potato-Ship/dist/index.html' + location.hash; }</script>
```
Guard prevents loop on `dist/index.html` itself. No-op on localhost.

### 4. `public/404.html` is a simple redirect
Hash routing handles SPA, so 404.html just redirects to `index.html`.

### 5. Bento grid wrapper pattern
- Grid items are `.bento-card-wrapper` (not `.bento-card`).
- `is-active` on BOTH wrapper (`grid-column: 1 / -1`) and card (visual styles).
- FLIP animation captures wrapper positions.
- `.bento-card__right` needs `max-width: 0; max-height: 0; overflow: hidden` in inactive state to prevent height variance.
- Hover play/reverse pattern on paused GSAP timelines. Click toggles independent pin state (multiple cards expand simultaneously).

### 6. GSAP via CDN — global only
GSAP is `window.gsap` / `window.ScrollTrigger`. Import `useGsap` composable from `src/composables/useGsap.js`. Do NOT `npm install gsap`.

## Contact form
Currently a placeholder (alert + reset). To connect Formspree/Web3Forms, change the `<form>` `action` URL only.
