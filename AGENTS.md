# AGENTS.md — PotatoWeb

## Stack
- Vue 3 + Composition API + Vite
- Vue Router 4 with `createWebHistory` (all routes lazy-loaded)
- CSS vanilla (variables in `src/styles/main.css`)
- GSAP + ScrollTrigger loaded via CDN in `index.html` (not npm)

## GSAP quirk
GSAP is a global (`window.gsap`, `window.ScrollTrigger`). Use the `useGsap` composable (`src/composables/useGsap.js`) to access it. Do NOT `npm install gsap`.

The composable also exposes helpers: `splitTextToSpans`, `tilt3D`, `floatingElement`, `animateGradient`. Import `useGsap` and destructure what you need.

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (HMR at localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

No test, lint, typecheck, or formatter scripts are configured.

## Architecture
- `src/views/` — page-level components (one per route), lazy-imported by router
- `src/components/` — reusable sections (HeroSection, ServicesSection, ContactSection)
- `src/composables/` — shared logic (`useGsap`, `useScrollAnimations`)
- `HomeView` composes HeroSection + ServicesSection + ContactSection. Other views are standalone pages.
- `App.vue` wraps everything in Navbar + Footer + custom cursor overlay with `<Transition>` for page fade.

## Path alias
`@/` → `src/` (configured in `vite.config.js`)

## Routes
| Path | View | Content |
|------|------|---------|
| `/` | HomeView | Hero + Services + Contact |
| `/servicios` | ServicesView | Hero + 6 main services + 4 additional services |
| `/contacto` | ContactView | Hero + contact form |
| `*` | NotFoundView | 404 |

## Color palette (vintage-tech)
```
--color-primary: #FF0302    (accent, CTAs)
--color-secondary: #4E6F82  (borders, subdued elements)
--color-bg: #2E3841         (main background)
--color-bg-alt: #364452     (alternate sections)
--color-text: #FADBBE       (primary text)
--color-text-muted: #c9ad96 (secondary text)
```

## Custom cursor
App.vue has a global custom cursor (circle follower). On touch devices `cursor: none` is set on `<html>`. Interactive elements (a, button, .service-card, inputs) enlarge the cursor on hover.

## 3D tilt on service cards
The `tilt3D` helper in `useGsap` listens to mousemove on `.service-card` elements and applies rotateX/rotateY transforms. Cleanup happens automatically in `onBeforeUnmount`.

## Deployment
- **GitHub Pages**: CI in `.github/workflows/deploy.yml` — push to `main` auto-deploys
- **Vercel**: `vercel.json` provides SPA redirects
- **Netlify**: needs `public/_redirects` with `/* /index.html 200`
- **Static site only**: no backend, no database, no API endpoints

## Contact form
Currently a placeholder (alert + reset). To connect Formspree/Web3Forms, only the `<form>` `action` URL needs changing. No server code required.

## CSS conventions
- Dark vintage theme via CSS custom properties in `:root` (see `main.css`)
- `container`, `section`, `btn`, `btn-primary`, `btn-secondary`, `tag` utility classes in `main.css`
- Grain/noise texture overlay via fixed pseudo-element on `<body>`
- Fonts: Playfair Display (headings) + Inter (body) + JetBrains Mono (code) via Google Fonts CDN (loaded in `index.html`)
