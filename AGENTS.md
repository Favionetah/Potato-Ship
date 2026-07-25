# AGENTS.md — acosmia

## Stack
- Vue 3 + Composition API + Vite 6
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
- `src/components/` — `HeroSection`, `ServicesSection`, `PricingSection`, `ContactSection`, `Navbar`, `Footer`
- `src/composables/` — `useGsap` (GSAP helpers), `useScrollAnimations` (IntersectionObserver)
- `App.vue` wraps Navbar + Footer + custom cursor + `<Transition>` for page fade
- `HomeView` composes HeroSection + ServicesSection + ContactSection; other views are standalone
- `PricingSection` has tabs: Desarrollo (3 plans) and Mantenimiento (3 subscription plans)
- `functions/api/contact.js` — Cloudflare Pages Function (server-side EmailJS proxy)

## Color palette (vintage-tech)
```
--color-primary: #FF0302    --color-bg-alt: #364452
--color-secondary: #4E6F82  --color-text: #FADBBE
--color-bg: #2E3841         --color-text-muted: #c9ad96
```
Full set in `src/styles/main.css`.

## Contact form (backend proxy via Cloudflare Pages Functions)
- **No client-side API keys.** The frontend does `fetch('/api/contact')` to the serverless function.
- `functions/api/contact.js` validates reCAPTCHA server-side and forwards to EmailJS.
- EmailJS keys + reCAPTCHA secret key stored as Cloudflare Pages Environment Variables (server-side only).
- `.env` file at project root (gitignored) mirrors the production env vars for reference.
- Free plan: 200 EmailJS sends/month, 100K Pages Functions requests/day.
- Cooldown: 30 min between submissions via localStorage timestamp. Shows thank-you/WhatsApp screen until cooldown expires.

## Deployment
- **Cloudflare Pages**: Connected to GitHub repo. Auto-deploys on push to `main`.
- **Build command**: `npm run build` (outputs to `dist/`)
- **Functions**: `functions/` directory auto-detected and deployed as Pages Functions.
- **Environment variables**: Must be set in Cloudflare Pages Dashboard → Settings → Environment Variables:
  - `EMAILJS_PUBLIC_KEY`
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `RECAPTCHA_SECRET_KEY`
- No GitHub Pages, no custom domain needed for deployment.

## Critical gotchas

### 1. Vite base
```js
base: '/'
```
Always `/`, no conditional for CI. Cloudflare Pages deploys to root domain.

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
