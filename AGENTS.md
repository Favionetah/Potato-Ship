# AGENTS.md — acosmia

## Stack
- Vue 3 + Composition API + Vite
- Vue Router 4 with `createWebHashHistory` (all routes lazy-loaded)
- CSS vanilla (variables in `src/styles/main.css`)
- GSAP + ScrollTrigger loaded via CDN in `index.html` — do NOT `npm install gsap`. Use `useGsap` composable from `@/composables/useGsap.js`.
- `@/` → `src/` (configured in `vite.config.js`)

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | `gh-pages -d dist` (manual push to gh-pages branch) |

No test, lint, typecheck, or formatter scripts.

## Routes (3 total)
| Path | View | Content |
|------|------|---------|
| `/` | HomeView | HeroSection + ServicesSection + ContactSection |
| `/contacto` | ContactView | Hero + ContactSection |
| `*` | NotFoundView | 404 redirect |

No standalone `/servicios` — services are in `ServicesSection` embedded in HomeView.

## Architecture
- `src/views/` — 3 page-level components, lazy-imported by router
- `src/components/` — `HeroSection`, `ServicesSection`, `ContactSection`, `Navbar`, `Footer`
- `src/composables/` — `useGsap` (GSAP helpers), `useScrollAnimations` (IntersectionObserver)
- `App.vue` wraps Navbar + Footer + custom cursor + `<Transition>` for page fade
- `HomeView` composes HeroSection + ServicesSection + ContactSection; other views are standalone

## Color palette (vintage-tech)
```
--color-primary: #FF0302    --color-bg-alt: #364452
--color-secondary: #4E6F82  --color-text: #FADBBE
--color-bg: #2E3841         --color-text-muted: #c9ad96
```
Full set in `src/styles/main.css`.

## Contact form (EmailJS)
- Uses `@emailjs/browser` (npm package, `import emailjs from '@emailjs/browser'` in `ContactSection.vue`)
- Service ID, Template ID, and Public Key are hardcoded in `ContactSection.vue`
- Free plan: 200 sends/month. Domain allowlist (anti-spam) is paid.
- `const SIMULATE = true` bypasses EmailJS for local testing (1.5s fake delay). Set to `false` for real sends.
- Cooldown: 30 min between submissions via localStorage timestamp. Shows thank-you/WhatsApp screen until cooldown expires.

## Deployment
- **GitHub Actions (current)**: `.github/workflows/deploy.yml` — `npm ci` + `vite build`. Requires Pages source set to "GitHub Actions" in repo Settings.
- **Netlify**: needs `public/_redirects` with `/* /index.html 200`.
- `GITHUB_ACTIONS` env var sets Vite `base: '/Potato-Ship/'` in CI; local dev uses `/`.

## Critical gotchas

### 1. Vite base — conditional for CI
```js
base: process.env.GITHUB_ACTIONS ? '/acosmia/' : '/'
```
CI builds serve assets from `/Potato-Ship/assets/...`. Local dev uses `/`.

### 2. Hash routing (README lies)
README says `createWebHistory` but router actually uses `createWebHashHistory`. Trust the router, not the README.

### 3. GSAP is global (`window.gsap`, `window.ScrollTrigger`)
Import `useGsap` composable. Do NOT `npm install gsap`.

### 4. Custom cursor (`App.vue`)
Fixed overlay, `pointer-events: none; z-index: 10000`. `gsap.quickTo` for tracking. `MutationObserver` re-attaches hover listeners on DOM changes. Hidden on touch devices via `@media (hover: none)`.

### 5. Bento grid (`ServicesSection.vue`)
`.bento-card-wrapper` (not `.bento-card`). `is-active` on BOTH wrapper and card. FLIP animation on wrapper `getBoundingClientRect()`. `.bento-card__right` needs `max-width: 0; max-height: 0; overflow: hidden` when inactive.

### 6. Custom PNG icons in `src/assets/icons/`
Icons are black PNGs tinted red via CSS `filter` in `ContactSection.vue`.
