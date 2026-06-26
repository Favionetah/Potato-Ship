<template>
  <section class="hero" ref="heroRef">
    <div class="hero__bg" ref="bgRef">
      <div class="hero__gradient" ref="gradientRef"></div>
      <div class="hero__grid"></div>
    </div>

    <div ref="shape1Ref" class="hero__shape hero__shape--1"></div>
    <div ref="shape2Ref" class="hero__shape hero__shape--2"></div>
    <div ref="shape3Ref" class="hero__shape hero__shape--3"></div>
    <div ref="shape4Ref" class="hero__shape hero__shape--4"></div>

    <div class="container hero__content" ref="contentRef">
      <span class="tag hero__tag" ref="tagRef">Desarrollo web estático</span>
      <h1 class="hero__title" ref="titleRef">
        Tu negocio merece una web profesional
      </h1>
      <p class="hero__subtitle" ref="subtitleRef">
        Creamos sitios web estáticos modernos, ultrarrápidos y optimizados para convertir visitantes en clientes. Sin complicaciones, sin backend, sin excusas.
      </p>
      <div class="hero__actions" ref="actionsRef">
        <router-link to="/contacto" class="btn btn-primary">
          Solicitar cotización
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        <router-link to="/servicios" class="btn btn-secondary">
          Ver servicios
        </router-link>
      </div>
    </div>

    <div class="hero__scroll-indicator">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useGsap } from '@/composables/useGsap'

const heroRef = ref(null)
const bgRef = ref(null)
const gradientRef = ref(null)
const shape1Ref = ref(null)
const shape2Ref = ref(null)
const shape3Ref = ref(null)
const shape4Ref = ref(null)
const contentRef = ref(null)
const tagRef = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const actionsRef = ref(null)

const { gsap, ScrollTrigger, createTimeline, splitTextToSpans, floatingElement } = useGsap()

onMounted(() => {
  gsap.set('.hero__shape', { opacity: 0 })

  const tl = createTimeline(0.3)

  tl.fromTo(gradientRef.value,
    { backgroundPosition: '0% 0%' },
    { backgroundPosition: '100% 100%', duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true }
  )

  tl.fromTo('.hero__grid', { opacity: 0 }, { opacity: 1, duration: 1 }, 0)

  tl.fromTo('.hero__shape--1', { opacity: 0, scale: 0 }, { opacity: 0.15, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.4)
  tl.fromTo('.hero__shape--2', { opacity: 0, scale: 0 }, { opacity: 0.1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.6)
  tl.fromTo('.hero__shape--3', { opacity: 0, scale: 0 }, { opacity: 0.12, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.5)
  tl.fromTo('.hero__shape--4', { opacity: 0, scale: 0 }, { opacity: 0.08, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.7)

  tl.fromTo(tagRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1)

  const chars = splitTextToSpans(titleRef.value)
  tl.fromTo(chars,
    { opacity: 0, y: 40, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'back.out(1.7)'
    },
    '-=0.3'
  )

  tl.fromTo(subtitleRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  tl.fromTo(actionsRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  tl.fromTo('.hero__scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')

  floatingElement('.hero__shape--1', { y: -25, x: 15, rotation: 8, duration: 4, delay: 0 })
  floatingElement('.hero__shape--2', { y: 20, x: -10, rotation: -5, duration: 5, delay: 0.5 })
  floatingElement('.hero__shape--3', { y: -15, x: 20, rotation: 10, duration: 3.5, delay: 1 })
  floatingElement('.hero__shape--4', { y: 30, x: -15, rotation: -8, duration: 4.5, delay: 0.3 })

  ScrollTrigger.create({
    trigger: heroRef.value,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      const progress = self.progress
      gsap.to('.hero__content', {
        y: progress * 80,
        opacity: 1 - progress * 0.5,
        duration: 0.1,
        overwrite: 'auto'
      })
      gsap.to('.hero__shape', {
        y: progress * 60,
        opacity: 0.15 - progress * 0.15,
        duration: 0.1,
        overwrite: 'auto'
      })
    }
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #2E3841 0%,
    #364452 25%,
    #2E3841 50%,
    #3a4c5a 75%,
    #2E3841 100%
  );
  background-size: 200% 200%;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(78, 111, 130, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(78, 111, 130, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}

.hero__shape {
  position: absolute;
  z-index: 1;
  pointer-events: none;
}

.hero__shape--1 {
  top: 15%;
  left: 8%;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(255, 3, 2, 0.2);
  transform: rotate(45deg);
}

.hero__shape--2 {
  top: 25%;
  right: 12%;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(250, 219, 190, 0.15);
  border-radius: 50%;
}

.hero__shape--3 {
  bottom: 30%;
  left: 15%;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(78, 111, 130, 0.25);
  transform: rotate(30deg);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

.hero__shape--4 {
  bottom: 20%;
  right: 20%;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 3, 2, 0.12);
  border-radius: 50%;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero__tag {
  margin-bottom: 1.5rem;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.hero__subtitle {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 2rem;
  font-weight: 400;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.hero__scroll-indicator span {
  display: block;
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-text-dim), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(0.5); opacity: 0.3; }
  50% { transform: scaleY(1); opacity: 1; }
}

@media (max-width: 768px) {
  .hero__shape {
    display: none;
  }

  .hero__actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
