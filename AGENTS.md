# AGENTS.md — PotatoWeb

## Stack
- Vue 3 + Composition API + Vite
- Vue Router 4 with `createWebHashHistory` (all routes lazy-loaded)
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

## Critical gotchas (learned the hard way)

### 1. Vite base path — includes `/dist/` for GitHub Pages
`vite.config.js` uses `base: process.env.GITHUB_ACTIONS ? '/Potato-Ship/dist/' : '/'`.  
- Local dev: `base: '/'` (works at `localhost:5173/`)
- GitHub Actions: `base: '/Potato-Ship/dist/'` (assets at `/Potato-Ship/dist/assets/...`)
**Do not hardcode** — breaks local dev.

### 2. Router uses `createWebHashHistory` (no BASE_URL needed)
```js
history: createWebHashHistory()
```
Hash routing avoids all SPA routing issues with GitHub Pages. URL format: `/#/servicios`.  
No `import.meta.env.BASE_URL` needed — hash handles routing independent of base path.

### 3. Conditional redirect in root `index.html`
GitHub Pages serves from `main` branch root. The root `index.html` is the Vite entry template.
A script redirects visitors to `dist/index.html` on GitHub Pages only:
```html
<script>
  if (location.hostname.includes('github.io') && !location.pathname.startsWith('/Potato-Ship/dist/')) {
    location.href = '/Potato-Ship/dist/index.html' + location.hash;
  }
</script>
```
- **Local dev**: condition false (localhost), normal Vite dev
- **GitHub Pages**: redirects to `dist/index.html`, app loads with hash routing
- **Guard**: prevents infinite loop on `dist/index.html` itself

### 4. `public/404.html` — simple redirect
Since hash routing handles SPA, `public/404.html` just redirects to `index.html`.

### 5. Bento grid uses wrapper pattern
Grid items are `.bento-card-wrapper` (not `.bento-card`).  
- `.bento-card-wrapper` = grid item, flex column container  
- `.bento-card` = visual card inside wrapper  
- FLIP animation captures wrapper positions, not card positions  
- `is-active` class goes on BOTH wrapper (for `grid-column: 1 / -1`) and card (for visual styles)

### 6. Service card `__right` panel needs `max-height: 0`
In non-active state:
```css
.bento-card__right {
  max-width: 0;
  max-height: 0;  /* REQUIRED — prevents vertical height variance */
  overflow: hidden;
}
```
Without `max-height: 0`, cards with more/longer features render taller due to hidden flex children taking vertical space.

### 7. Hover animations: play/reverse pattern
```js
onEnter(i) { cardStates[i].tl?.play() }
onLeave(i) { if (!cardStates[i].pinned) cardStates[i].tl?.reverse() }
```
Animations are paused GSAP timelines. Hover plays them; leave reverses (unless pinned by click).

### 8. `grid-auto-rows: minmax(170px, auto)` not fixed
Cards use `minmax(170px, auto)` so rows fit content. Combined with wrapper pattern and `__right` max-height, all cards stay uniform height (~208px).

## Custom cursor
App.vue has a global custom cursor (circle follower). On touch devices `cursor: none` is set on `<html>`. Interactive elements (a, button, .service-card, inputs) enlarge the cursor on hover.

## 3D tilt on service cards
The `tilt3D` helper in `useGsap` listens to mousemove on `.service-card` elements and applies rotateX/rotateY transforms. Cleanup happens automatically in `onBeforeUnmount`.

## Deployment
- **GitHub Pages**: Serves from `main` branch root. Root `index.html` redirects to `dist/index.html` with hash routing. `dist/` is committed to repo.
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