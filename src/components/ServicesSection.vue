<template>
  <section class="section bento-services" ref="sectionRef">
    <div class="container">
      <div class="bento__header" ref="headerRef">
        <span class="tag">Servicios</span>
        <h2 class="section-title">Lo que hacemos</h2>
        <p class="section-subtitle">
          Soluciones web estáticas para cada tipo de negocio. Pasa el mouse y haz click para mantener la vista.
        </p>
      </div>

      <div class="bento-grid" ref="gridRef">
        <div
          v-for="(s, i) in services"
          :key="s.id"
          class="bento-card-wrapper"
          :ref="el => { if (el) wrapperRefs[i] = el }"
          :class="[
            `bento-card-wrapper--${s.id}`,
            { 'is-active': cardStates[i].active }
          ]"
        >
          <div
            class="bento-card"
            :ref="el => { if (el) cardRefs[i] = el }"
            :class="[
              `bento-card--${s.tier}`,
              `bento-card--${s.id}`,
              { 'is-active': cardStates[i].active }
            ]"
            @mouseenter="onEnter(i)"
            @mouseleave="onLeave(i)"
            @click="onClick(i)"
          >
            <div class="bento-card__left">
              <div class="bento-card__anim" :ref="el => { if (el) animRefs[i] = el }">
                <template v-if="s.id === 'corporativa'">
                  <div v-for="n in 6" :key="n" class="anim-building" :style="{ '--i': n - 1 }"></div>
                </template>
                <template v-else-if="s.id === 'landing'">
                  <div class="anim-funnel"></div>
                  <div v-for="n in 6" :key="n" class="anim-lead-dot" :style="{ '--i': n - 1 }"></div>
                  <div v-for="n in 3" :key="'c'+n" class="anim-check" :style="{ '--i': n - 1 }">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </template>
                <template v-else-if="s.id === 'catalogo'">
                  <div v-for="n in 6" :key="n" class="anim-shelf-item" :style="{ '--i': n - 1 }"></div>
                </template>
                <template v-else-if="s.id === 'menu'">
                  <div class="anim-menu-card">
                    <div v-for="n in 4" :key="n" class="anim-menu-line" :style="{ '--i': n - 1 }"></div>
                  </div>
                </template>
                <template v-else-if="s.id === 'portafolio'">
                  <div v-for="n in 4" :key="n" class="anim-gal-square" :style="{ '--i': n - 1 }"></div>
                </template>
                <template v-else-if="s.id === 'informativa'">
                  <div class="anim-morph"></div>
                </template>
                <template v-else-if="s.id === 'mantenimiento'">
                  <svg class="anim-nut" width="52" height="52" viewBox="0 0 52 52">
                    <polygon points="26,2 46.8,14 46.8,38 26,50 5.2,38 5.2,14"
                             fill="rgba(255,3,2,0.15)"
                             stroke="rgba(255,3,2,0.6)"
                             stroke-width="2"/>
                    <circle cx="26" cy="26" r="7"
                            fill="#364452"
                            stroke="rgba(255,3,2,0.3)"
                            stroke-width="1"/>
                  </svg>
                </template>
                <template v-else-if="s.id === 'optimizacion'">
                  <div class="anim-speed-bar"></div>
                  <div v-for="n in 3" :key="n" class="anim-speed-trail" :style="{ '--i': n - 1 }"></div>
                </template>
                <template v-else-if="s.id === 'dominio'">
                  <div class="anim-signal-center"></div>
                  <div v-for="n in 3" :key="n" class="anim-signal-wave" :style="{ '--i': n - 1 }"></div>
                </template>
                <template v-else-if="s.id === 'publicacion'">
                  <div class="anim-rocket"></div>
                  <div v-for="n in 4" :key="n" class="anim-flame" :style="{ '--i': n - 1 }"></div>
                </template>
              </div>

              <div class="bento-card__top-bar">
                <div class="bento-card__icon-top" v-html="s.icon"></div>
                <span class="bento-card__click-hint" :class="{ 'is-visible': cardStates[i].hovered && !cardStates[i].pinned }">Click para detalles</span>
                <span class="bento-card__click-hint bento-card__click-hint--close" :class="{ 'is-visible': cardStates[i].pinned }">Click para cerrar</span>
              </div>

              <div class="bento-card__info">
                <h3 class="bento-card__title">{{ s.title }}</h3>
                <p class="bento-card__tagline">{{ s.tagline }}</p>
              </div>
            </div>

            <div class="bento-card__right">
              <span class="bento-card__features-label">Incluye</span>
              <div
                v-for="(f, fi) in s.features"
                :key="fi"
                class="bento-card__feature"
                :class="{ 'is-visible': cardStates[i].hasOpened }"
                :style="{ transitionDelay: `${0.1 + fi * 0.04}s` }"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </div>
            </div>

            <div class="bento-card__pin-indicator" v-if="cardStates[i].pinned">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sectionRef = ref(null)
const headerRef = ref(null)
const gridRef = ref(null)
const cardRefs = ref([])
const wrapperRefs = ref([])
const animRefs = ref([])
const { gsap, scrollReveal, animateServiceCard } = useGsap()

const services = [
  {
    id: 'corporativa', tier: 'l',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    title: 'Página web corporativa',
    tagline: 'Presencia profesional para tu empresa.',
    features: ['Información del negocio', 'Servicios ofrecidos', 'Galería de imágenes', 'Ubicación y mapa', 'Botón de WhatsApp', 'Diseño adaptable']
  },
  {
    id: 'landing', tier: 'l',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Landing page de venta',
    tagline: 'Máxima conversión en una sola página.',
    features: ['Propuesta de valor clara', 'Llamadas a la acción', 'Formulario de contacto', 'Diseño persuasivo', 'Optimizada para móviles', 'Analytics básico']
  },
  {
    id: 'catalogo', tier: 'l',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    title: 'Catálogo digital',
    tagline: 'Muestra tus productos de forma organizada.',
    features: ['Listado con categorías', 'Imágenes y descripciones', 'Precios visibles', 'Botón de consulta', 'Actualización vía mantenimiento', 'Sin panel de administración']
  },
  {
    id: 'menu', tier: 'm',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    title: 'Menú digital',
    tagline: 'Tu carta siempre disponible desde el celular.',
    features: ['Categorías de productos', 'Imágenes y descripciones', 'Precios', 'Diseño mobile-first', 'Contacto directo', 'Sin sistema de pedidos']
  },
  {
    id: 'portafolio', tier: 'm',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    title: 'Portafolio profesional',
    tagline: 'Destaca tu trabajo con estilo.',
    features: ['Presentación personal', 'Proyectos realizados', 'Galería visual', 'Información de contacto', 'Layout minimalista', 'SEO para búsquedas']
  },
  {
    id: 'informativa', tier: 'm',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    title: 'Página informativa personalizada',
    tagline: 'Se adapta a lo que necesites.',
    features: ['Secciones a medida', 'Diseño según requerimientos', 'Elementos visuales únicos', 'Información del negocio', 'Contacto', '100% personalizable']
  },
  {
    id: 'mantenimiento', tier: 's',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 00 0 1.4l1.6 1.6a1 1 0 00 1.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    title: 'Mantenimiento web mensual',
    tagline: 'Tu página siempre actualizada.',
    features: ['Cambios de contenido', 'Actualización de imágenes', 'Soporte básico', 'Revisión mensual']
  },
  {
    id: 'optimizacion', tier: 's',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: 'Optimización web',
    tagline: 'Más velocidad, mejores resultados.',
    features: ['Optimización de imágenes', 'Mejora de carga', 'Adaptación móvil', 'Ajustes de rendimiento']
  },
  {
    id: 'dominio', tier: 's',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Dominio personalizado',
    tagline: 'Tu nombre en internet.',
    features: ['Registro .com', 'Configuración DNS', 'Conexión con tu web', 'Gestión inicial']
  },
  {
    id: 'publicacion', tier: 's',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: 'Publicación y configuración',
    tagline: 'Tu web en vivo, sin complicaciones.',
    features: ['Subida de archivos', 'Configuración hosting', 'Certificado SSL', 'Ajustes técnicos']
  }
]

const cardStates = services.map(() => reactive({
  active: false,
  pinned: false,
  hovered: false,
  hasOpened: false,
  tl: null
}))

let leaveTimers = {}

function flipAnimate(changedIndex, activate) {
  const wrappers = wrapperRefs.value.filter(Boolean)
  if (!wrappers.length) return

  const first = wrappers.map(w => w.getBoundingClientRect())

  cardStates[changedIndex].active = activate

  void gridRef.value.offsetHeight

  const last = wrappers.map(w => w.getBoundingClientRect())

  wrappers.forEach((wrapper, i) => {
    const dx = first[i].left - last[i].left
    const dy = first[i].top - last[i].top

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return

    gsap.fromTo(wrapper,
      { x: dx, y: dy },
      {
        x: 0, y: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(wrapper, { clearProps: 'transform' })
        }
      }
    )
  })
}

function onEnter(i) {
  cardStates[i].hovered = true
  if (leaveTimers[i]) {
    clearTimeout(leaveTimers[i])
    leaveTimers[i] = null
  }
  if (!cardStates[i].pinned) {
    cardStates[i].tl?.play()
  }
}

function onLeave(i) {
  cardStates[i].hovered = false
  if (!cardStates[i].pinned) {
    cardStates[i].tl?.reverse()
  }
}

function onClick(i) {
  const s = cardStates[i]

  if (leaveTimers[i]) {
    clearTimeout(leaveTimers[i])
    leaveTimers[i] = null
  }

  if (s.pinned) {
    s.pinned = false
    s.hasOpened = false
    s.tl?.reverse()
    flipAnimate(i, false)
  } else {
    s.pinned = true
    flipAnimate(i, true)
    s.tl?.play()
    setTimeout(() => { s.hasOpened = true }, 200)
  }
}

onMounted(() => {
  scrollReveal(headerRef.value, { duration: 0.8 })
  animRefs.value.forEach((el, i) => {
    if (el) cardStates[i].tl = animateServiceCard(services[i].id, el)
  })
})
</script>

<style scoped>
.bento-services {
  background: var(--color-bg-alt);
  position: relative;
}

.bento-services::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-border), transparent);
}

.bento__header {
  text-align: center;
  margin-bottom: 3rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(170px, auto);
  gap: 1rem;
  position: relative;
}

.bento-card-wrapper {
  display: flex;
  flex-direction: column;
}

.bento-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  cursor: none;
              transition: border-color 0.3s ease,
              box-shadow 0.3s ease;
  overflow: hidden;
}

.bento-card:hover {
  border-color: rgba(255, 3, 2, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.bento-card-wrapper--corporativa { grid-column: span 2; }
.bento-card-wrapper--landing     { grid-column: span 1; }
.bento-card-wrapper--catalogo    { grid-column: span 1; }
.bento-card-wrapper--menu        { grid-column: span 1; }
.bento-card-wrapper--portafolio  { grid-column: span 1; }
.bento-card-wrapper--informativa { grid-column: span 2; }
.bento-card-wrapper--mantenimiento { grid-column: span 1; }
.bento-card-wrapper--optimizacion  { grid-column: span 1; }
.bento-card-wrapper--dominio       { grid-column: span 1; }
.bento-card-wrapper--publicacion   { grid-column: span 1; }

.bento-card-wrapper.is-active {
  grid-column: 1 / -1;
}

.bento-card.is-active {
  flex-direction: row;
  border-color: rgba(255, 3, 2, 0.25);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
  padding: 1.5rem;
}

.bento-card--l.is-active {
  padding: 1.75rem;
}

.bento-card__left {
  position: relative;
  flex: 1;
  min-height: 160px;
  transition: flex 0.4s ease;
}

.bento-card.is-active .bento-card__left {
  flex: 0 0 50%;
}

.bento-card__anim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bento-card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  z-index: 3;
  background: linear-gradient(to top, rgba(46, 56, 65, 0.92) 0%, rgba(46, 56, 65, 0.5) 50%, transparent 100%);
}

.bento-card__top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  z-index: 3;
  pointer-events: none;
}

.bento-card__icon-top {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 3, 2, 0.06);
  border: 1px solid rgba(255, 3, 2, 0.08);
  color: var(--color-primary);
  flex-shrink: 0;
  transition: all 0.4s ease;
}

.bento-card.is-active .bento-card__icon-top {
  width: 48px;
  height: 48px;
}

.bento-card--l .bento-card__icon-top {
  width: 44px;
  height: 44px;
}

.bento-card--l.is-active .bento-card__icon-top {
  width: 52px;
  height: 52px;
}

.bento-card--s .bento-card__icon-top {
  width: 34px;
  height: 34px;
}

.bento-card--s.is-active .bento-card__icon-top {
  width: 40px;
  height: 40px;
}

.bento-card__click-hint {
  font-size: 0.75rem;
  color: var(--color-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
}

.bento-card__click-hint.is-visible {
  opacity: 1;
}

.bento-card__click-hint--close {
  color: var(--color-text-muted);
}

.bento-card__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: var(--color-text);
  line-height: 1.2;
  transition: font-size 0.4s ease;
}

.bento-card.is-active .bento-card__title {
  font-size: 1.35rem;
}

.bento-card--l.is-active .bento-card__title {
  font-size: 1.5rem;
}

.bento-card--s .bento-card__title {
  font-size: 0.875rem;
}

.bento-card--s.is-active .bento-card__title {
  font-size: 1.125rem;
}

.bento-card__tagline {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.3;
  margin-bottom: 0;
}

.bento-card.is-active .bento-card__tagline {
  font-size: 0.9375rem;
}

.bento-card--s .bento-card__tagline {
  font-size: 0.75rem;
}

.bento-card--s.is-active .bento-card__tagline {
  font-size: 0.875rem;
}

.bento-card__right {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0;
  opacity: 0;
  max-width: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.35s ease 0.05s, max-width 0.4s ease, max-height 0.4s ease, padding 0.4s ease;
}

.bento-card.is-active .bento-card__right {
  opacity: 1;
  max-width: 50%;
  max-height: 400px;
  flex: 0 0 50%;
  padding: 1.5rem 2rem;
  border-left: 1px solid var(--color-border);
}

.bento-card--l.is-active .bento-card__right {
  padding: 1.75rem 2.5rem;
}

.bento-card__features-label {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.bento-card__feature {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bento-card__feature.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.bento-card__feature svg {
  color: var(--color-primary);
  flex-shrink: 0;
  opacity: 0.7;
}

.bento-card--s.is-active .bento-card__right {
  padding: 1.25rem 1.5rem;
}

.bento-card--s.is-active .bento-card__feature {
  font-size: 0.75rem;
}

.bento-card__pin-indicator {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: var(--color-primary);
  opacity: 0.7;
  z-index: 11;
  animation: pulse 2s ease-in-out infinite;
}


/* === Corporativa: skyline buildings === */
.anim-building {
  position: absolute;
  bottom: 8%;
  background: rgba(255, 3, 2, 0.1);
  border: 1px solid rgba(255, 3, 2, 0.25);
  transform-origin: center;
  opacity: 1;
}
.anim-building:nth-child(1) { left: 8%; width: 18%; height: 55%; }
.anim-building:nth-child(2) { left: 28%; width: 14%; height: 40%; }
.anim-building:nth-child(3) { left: 44%; width: 16%; height: 65%; }
.anim-building:nth-child(4) { left: 62%; width: 12%; height: 35%; }
.anim-building:nth-child(5) { left: 76%; width: 14%; height: 50%; }
.anim-building:nth-child(6) { left: 90%; width: 8%; height: 30%; }

/* === Landing: conversion funnel === */
.anim-funnel {
  position: absolute;
  top: 35%;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -30px;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 50px solid rgba(255, 3, 2, 0.3);
  transform-origin: top center;
  opacity: 0;
}
.anim-lead-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(250, 219, 190, 0.5);
  top: 15%;
}
.anim-lead-dot { left: calc(18% + var(--i) * 12.4%); }

.anim-check {
  position: absolute;
  bottom: 25%;
  color: var(--color-primary);
  opacity: 0;
}
.anim-check { left: calc(35% + var(--i) * 15%); }

/* === Catálogo: product shelf === */
.anim-shelf-item {
  position: absolute;
  background: rgba(78, 111, 130, 0.5);
  border: 1px solid rgba(78, 111, 130, 0.1);
}
.anim-shelf-item:nth-child(1) { top: 10%; left: 8%; width: 26%; height: 35%; }
.anim-shelf-item:nth-child(2) { top: 10%; left: 38%; width: 26%; height: 35%; }
.anim-shelf-item:nth-child(3) { top: 10%; right: 8%; width: 26%; height: 35%; }
.anim-shelf-item:nth-child(4) { bottom: 10%; left: 8%; width: 26%; height: 35%; }
.anim-shelf-item:nth-child(5) { bottom: 10%; left: 38%; width: 26%; height: 35%; }
.anim-shelf-item:nth-child(6) { bottom: 10%; right: 8%; width: 26%; height: 35%; }

/* === Menú: restaurant menu card === */
.anim-menu-card {
  position: absolute;
  top: 12%;
  left: 15%;
  right: 15%;
  bottom: 12%;
  border: 1px solid rgba(255, 3, 2, 0.25);
  background: rgba(255, 3, 2, 0.02);
  transform-origin: top center;
  opacity: 0;
}
.anim-menu-line {
  position: absolute;
  left: 12%;
  right: 12%;
  height: 2px;
  background: rgba(255, 3, 2, 0.6);
  border-radius: 2px;
  transform-origin: left center;
  opacity: 0;
}
.anim-menu-line:nth-child(1) { top: 18%; }
.anim-menu-line:nth-child(2) { top: 36%; }
.anim-menu-line:nth-child(3) { top: 54%; }
.anim-menu-line:nth-child(4) { top: 72%; }

/* === Portafolio: gallery grid 2x2 === */
.anim-gal-square {
  position: absolute;
  width: 38%;
  height: 38%;
  border: 1px solid rgba(250, 219, 190, 0.3);
  background: rgba(250, 219, 190, 0.1);
  transform-origin: left center;
  opacity: 0;
}
.anim-gal-square:nth-child(1) { top: 10%; left: 8%; }
.anim-gal-square:nth-child(2) { top: 10%; right: 8%; }
.anim-gal-square:nth-child(3) { bottom: 10%; left: 8%; }
.anim-gal-square:nth-child(4) { bottom: 10%; right: 8%; }

/* === Informativa: shape morph === */
.anim-morph {
  position: absolute;
  top: 40%;
  left: 47%;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  margin-top: -35px;
  background: rgba(78, 111, 130, 0.5);
  border: 2px solid rgba(78, 111, 130, 1);
  border-radius: 50%;
  opacity: 1;
}

/* === Mantenimiento: tuerca hexagonal === */
.anim-nut {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  margin-left: -26px;
  margin-top: -26px;
  opacity: 0;
}

/* === Optimización: speed bar === */
.anim-speed-bar {
  position: absolute;
  top: 48%;
  left: 0;
  width: 40%;
  height: 3px;
  background: linear-gradient(to right, transparent, var(--color-primary));
  border-radius: 0 2px 2px 0;
  opacity: 0;
}
.anim-speed-trail {
  position: absolute;
  height: 2px;
  background: rgba(255, 3, 2, 0.7);
  border-radius: 0 2px 5px 0;
  opacity: 1;
}
.anim-speed-trail:nth-child(2) { top: 38%; width: 25%; }
.anim-speed-trail:nth-child(3) { top: 52%; width: 30%; }
.anim-speed-trail:nth-child(4) { top: 58%; width: 20%; }

/* === Dominio: signal waves === */
.anim-signal-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0;
}
.anim-signal-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(255, 3, 2, 0.5);
  border-radius: 50%;
  opacity: 0;
}
.anim-signal-wave:nth-child(2) { width: 30px; height: 30px; margin: -15px 0 0 -15px; }
.anim-signal-wave:nth-child(3) { width: 50px; height: 50px; margin: -25px 0 0 -25px; }
.anim-signal-wave:nth-child(4) { width: 70px; height: 70px; margin: -35px 0 0 -35px; }

/* === Publicación: rocket launch === */
.anim-rocket {
  position: absolute;
  top: 46%;
  left: 50%;
  margin-left: -15px;
  margin-top: -12px;
  border: 3px solid rgb(49, 79, 97);
  width: 25px;
  height: 50px;
  background: rgb(78, 111, 130);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  opacity: 0;
}
.anim-flame {
  position: absolute;
  width: 3px;
  height: 3px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 7px solid rgba(255, 3, 2, 1);
  left: 49%;
  bottom: 30%;
  opacity: 0;
}
.anim-flame:nth-child(2) { margin-left: -9px; }
.anim-flame:nth-child(3) { margin-left: -3px; }
.anim-flame:nth-child(4) { margin-left: 3px; }
.anim-flame:nth-child(5) { margin-left: 9px; }

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  .bento-card-wrapper {
    grid-column: 1 !important;
  }

  .bento-card.is-active {
    flex-direction: column;
  }

  .bento-card.is-active .bento-card__left {
    flex: none;
    min-height: 160px;
  }

  .bento-card.is-active .bento-card__right {
    opacity: 1;
    max-width: 100%;
    max-height: 400px;
    flex: 0 0 auto;
    padding: 1rem;
    border-left: none;
    border-top: 1px solid var(--color-border);
  }

  .bento-card__click-hint {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(170px, auto);
  }

  .bento-card-wrapper {
    grid-column: span 1 !important;
  }

  .bento-card-wrapper--corporativa,
  .bento-card-wrapper--informativa {
    grid-column: span 2 !important;
  }
}
</style>
