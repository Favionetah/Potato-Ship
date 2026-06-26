<div align="center">
  <br />
  <pre>&lt;/&gt;</pre>
  <h1 align="center">PotatoWeb</h1>
  <p align="center">
    <strong>Sitios web estáticos profesionales para tu negocio</strong>
    <br />
    Modernos · Rápidos · Sin backend
  </p>

  <p>
    <a href="#-tecnologías"><strong>Tecnologías</strong></a> ·
    <a href="#-características"><strong>Características</strong></a> ·
    <a href="#-estructura-del-proyecto"><strong>Estructura</strong></a> ·
    <a href="#-desarrollo-local"><strong>Desarrollo</strong></a> ·
    <a href="#-despliegue"><strong>Despliegue</strong></a>
  </p>

  <br />

  <img src="https://img.shields.io/badge/Vue%203-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
</div>

---

## ✨ Tecnologías

| Tecnología | Propósito |
|-----------|-----------|
| [Vue 3](https://vuejs.org/) + [Composition API](https://vuejs.org/guide/composition-api-setup) | Framework frontend progresivo |
| [Vite](https://vitejs.dev/) | Build tool ultrarrápido |
| [Vue Router](https://router.vuejs.org/) | Routing SPA con `createWebHistory` |
| [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger) | Animaciones profesionales (vía CDN) |
| [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (vanilla) | Estilos con variables CSS, diseño responsivo |

**Sin backend.** Sitio 100% estático desplegable en cualquier CDN.

## 🚀 Características

- **Multi-page SPA** — 5 rutas con transiciones suaves entre páginas
- **Animaciones GSAP** — Hero animado al cargar + scroll reveals
- **Diseño responsivo** — Mobile-first, se ve perfecto en todos los dispositivos
- **Rendimiento extremo** — Sitio estático, carga en < 1s
- **SEO-ready** — Meta tags, Open Graph, estructura semántica
- **CI/CD integrado** — GitHub Actions despliega automáticamente a GitHub Pages
- **Formulario de contacto** — Listo para conectar con Formspree / Web3Forms

## 📁 Estructura del proyecto

```
potatoweb/
├── .github/workflows/      # CI/CD pipelines
├── public/                 # Archivos estáticos (favicon, robots.txt)
├── src/
│   ├── assets/             # Imágenes, iconos, fuentes
│   ├── components/         # Componentes Vue reutilizables
│   │   ├── Navbar.vue      #   Barra de navegación fija
│   │   ├── Footer.vue      #   Pie de página
│   │   ├── HeroSection.vue #   Hero con animación GSAP
│   │   ├── ServicesSection.vue
│   │   ├── PortfolioSection.vue
│   │   ├── PricingSection.vue
│   │   └── ContactSection.vue
│   ├── composables/        # Lógica reutilizable
│   │   ├── useGsap.js      #   Helpers de GSAP
│   │   └── useScrollAnimations.js
│   ├── router/             # Configuración de Vue Router
│   │   └── index.js
│   ├── styles/             # CSS global
│   │   ├── main.css        #   Variables, reset, utilidades
│   │   ├── typography.css  #   Tipografía
│   │   └── animations.css  #   Keyframes CSS
│   ├── views/              # Páginas (vistas del router)
│   │   ├── HomeView.vue
│   │   ├── ServicesView.vue
│   │   ├── PortfolioView.vue
│   │   ├── PricingView.vue
│   │   ├── ContactView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue
│   └── main.js
├── index.html              # Entry point con CDN de GSAP
├── vite.config.js
├── vercel.json             # Config para despliegue SPA
└── package.json
```

## 🛠️ Desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/potatoweb.git
cd potatoweb

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir http://localhost:5173
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar build de producción |

## 🌐 Despliegue

### GitHub Pages (automático)

1. Sube el repositorio a GitHub
2. Ve a Settings → Pages → Source: **GitHub Actions**
3. Cada push a `main` ejecuta el workflow en `.github/workflows/deploy.yml`

### Manual (Netlify / Vercel / Cloudflare Pages)

```bash
npm run build
# Sube la carpeta dist/ a tu plataforma favorita
```

**Importante:** Como usamos `createWebHistory` en Vue Router, necesitas configurar redirects:

- **Netlify:** crear `public/_redirects` con `/*    /index.html   200`
- **Vercel:** ya incluimos `vercel.json` con los rewrites
- **Cloudflare Pages:** crear `public/_redirects` con `/* /index.html 200`

## 📄 Licencia

Distribuido bajo licencia MIT. Ver [`LICENSE`](LICENSE) para más información.

---

<div align="center">
  <p>Hecho con ❤️ por <a href="https://github.com/tu-usuario">@tu-usuario</a></p>
</div>
