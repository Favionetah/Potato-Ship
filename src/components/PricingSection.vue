<template>
  <section id="planes" class="section pricing" ref="sectionRef">
    <div class="container">
      <div class="pricing__header" ref="headerRef">
        <span class="tag">Planes</span>
        <h2 class="section-title">Elige tu plan</h2>
        <p class="section-subtitle">
          {{ activeTab === 'desarrollo' ? 'Todos nuestros planes incluyen diseño responsive, hosting y dominio personalizado. Elige el que mejor se adapte a tu negocio.' : 'Mantén tu web actualizada con nuestros planes de mantenimiento mensual, semestral o anual.' }}
        </p>
      </div>

      <div class="pricing__tabs-wrapper">
        <div class="pricing__tabs" ref="tabsRef">
          <button
            class="pricing__tab"
            :class="{ 'is-active': activeTab === 'desarrollo' }"
            @click="switchTab('desarrollo')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            Desarrollo
          </button>
          <button
            class="pricing__tab"
            :class="{ 'is-active': activeTab === 'mantenimiento' }"
            @click="switchTab('mantenimiento')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14.7 6.3a1 1 0 00 0 1.4l1.6 1.6a1 1 0 00 1.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
            Mantenimiento
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'desarrollo'" class="pricing__includes" ref="includesRef">
        <div class="pricing__includes-header">
          <span class="pricing__includes-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </span>
          <span>Todo plan incluye:</span>
        </div>
        <div class="pricing__includes-grid">
          <span v-for="f in commonFeatures" :key="f" class="pricing__includes-item">{{ f }}</span>
        </div>
      </div>

      <Transition name="pricing-fade" mode="out-in">
        <div v-if="activeTab === 'desarrollo'" key="desarrollo" class="pricing__grid" ref="gridRef">
          <div
            v-for="(plan, i) in plans"
            :key="plan.id"
            class="pricing__card"
            :ref="el => { if (el) cardRefs[i] = el }"
            :class="{ 'pricing__card--featured': plan.featured }"
          >
            <div class="pricing__card-header">
              <span v-if="plan.featured" class="pricing__badge">Recomendado</span>
              <h3 class="pricing__plan-name">{{ plan.name }}</h3>
              <div class="pricing__price">
                <span class="pricing__currency">Bs</span>
                <span class="pricing__amount">{{ plan.price }}</span>
              </div>
              <p class="pricing__description">{{ plan.description }}</p>
            </div>

            <ul class="pricing__features">
              <li
                v-for="f in plan.features"
                :key="f.text"
                class="pricing__feature"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ f.text }}
              </li>
            </ul>

            <div v-if="plan.support" class="pricing__support">
              <span class="pricing__support-label">Soporte</span>
              <ul class="pricing__support-list">
                <li
                  v-for="s in plan.support"
                  :key="s.text"
                  class="pricing__feature"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {{ s.text }}
                </li>
              </ul>
            </div>

            <a href="#" class="btn" :class="plan.featured ? 'btn-primary' : 'btn-secondary'" style="width: 100%; justify-content: center; margin-top: 0.75rem;" @click.prevent="scrollToContact">
              Solicitar plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            <button class="pricing__detail-btn" @click.stop="expandedPlan = plan.id">Ver detalles</button>
          </div>
        </div>

        <div v-else key="mantenimiento" class="pricing__grid" ref="maintGridRef">
          <div
            v-for="(plan, i) in maintenancePlans"
            :key="plan.id"
            class="pricing__card pricing__card--maintenance"
            :ref="el => { if (el) maintCardRefs[i] = el }"
            :class="{ 'pricing__card--featured': plan.featured }"
          >
            <div class="pricing__card-header">
              <span v-if="plan.badge" class="pricing__badge pricing__badge--promo">{{ plan.badge }}</span>
              <h3 class="pricing__plan-name">{{ plan.name }}</h3>
              <div class="pricing__price maintenance">
                <span class="pricing__regular-price">Bs {{ plan.regularPrice }}</span>
                <span class="pricing__currency">Bs</span>
                <span class="pricing__amount">{{ plan.promoPrice }}</span>
                <span class="pricing__period">{{ plan.period }}</span>
              </div>
              <div v-if="plan.monthlyEquivalent" class="pricing__monthly-equiv">
                {{ plan.monthlyEquivalent }}
              </div>
              <p class="pricing__description">{{ plan.description }}</p>
            </div>

            <ul class="pricing__features">
              <li
                v-for="feature in maintenanceFeatures"
                :key="feature"
                class="pricing__feature"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>

            <p class="pricing__disclaimer">{{ plan.disclaimer }}</p>

            <a href="#" class="btn btn-secondary" style="width: 100%; justify-content: center; margin-top: 0.75rem;" @click.prevent="scrollToContact">
              Contratar mantenimiento
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </Transition>
    </div>

    <div v-if="expandedPlan && expandedData" class="pricing__overlay" @click.self="closeDetails">
      <div class="pricing__modal" @click.stop>
        <div class="pricing__modal-header">
          <button class="pricing__modal-close" @click="closeDetails">&times;</button>
          <span v-if="expandedData.featured" class="pricing__badge">Recomendado</span>
          <h3 class="pricing__plan-name">{{ expandedData.name }}</h3>
          <div class="pricing__price">
            <span class="pricing__currency">Bs</span>
            <span class="pricing__amount">{{ expandedData.price }}</span>
          </div>
          <p class="pricing__description">{{ expandedData.description }}</p>
        </div>

        <div class="pricing__modal-body">
          <ul class="pricing__features pricing__features--detail">
            <li
              v-for="f in expandedData.features"
              :key="f.text"
              class="pricing__feature pricing__feature--detail"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <strong>{{ f.text }}</strong>
                <p>{{ f.detail }}</p>
              </div>
            </li>
          </ul>

          <div v-if="expandedData.support" class="pricing__support pricing__support--detail">
            <span class="pricing__support-label">Soporte incluido</span>
            <ul class="pricing__support-list">
              <li
                v-for="s in expandedData.support"
                :key="s.text"
                class="pricing__feature pricing__feature--detail"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <div>
                  <strong>{{ s.text }}</strong>
                  <p>{{ s.detail }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="pricing__modal-footer">
          <a href="#" class="btn btn-primary" style="width: 100%; justify-content: center;" @click.prevent="closeDetails(); scrollToContact()">
            Solicitar plan
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sectionRef = ref(null)
const headerRef = ref(null)
const gridRef = ref(null)
const cardRefs = ref([])
const tabsRef = ref(null)
const maintGridRef = ref(null)
const maintCardRefs = ref([])
const activeTab = ref('desarrollo')
const expandedPlan = ref(null)
const { gsap, scrollReveal } = useGsap()

const expandedData = computed(() => {
  return plans.find(p => p.id === expandedPlan.value) || null
})

function closeDetails() {
  expandedPlan.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape') closeDetails()
}

const commonFeatures = [
  'Análisis del negocio para un desarrollo personalizado.',
  'Diseño responsive.',
  'Dominio personalizado por 1 año.',
  'Hosting por 1 año.',
  'Certificado de seguridad SSL.',
  'Código QR personalizado.',
  'Botón de WhatsApp.',
  'Formulario personalizado (contacto, reservas, consultas, etc.).',
  'Integración con Google Maps (opcional).',
  'Integración con redes sociales.'
]

const plans = [
  {
    id: 'emprendedor',
    name: 'Plan Emprendedor',
    price: '1,790',
    description: 'Ideal para negocios que quieren comenzar su presencia digital.',
    featured: false,
    features: [
      {
        text: 'Hasta 5 secciones distribuidas en un máximo de 2 páginas.',
        detail: 'Tu web tendrá hasta 5 bloques de contenido (ej: inicio, servicios, galería, contacto, nosotros) organizados en 1 o 2 páginas. Es ideal para negocios que recién empiezan y necesitan lo esencial.'
      },
      {
        text: '1 banner personalizado.',
        detail: 'La imagen principal de tu página de inicio diseñada a medida con tu mensaje clave, logo y botón de WhatsApp para que tus clientes te contacten directo.'
      },
      {
        text: 'Diseño moderno y profesional.',
        detail: 'Un diseño limpio y actual, con los colores y el estilo de tu negocio. Tu web se verá profesional y generará confianza en tus clientes desde el primer momento.'
      },
      {
        text: 'Animaciones básicas.',
        detail: 'Efectos visuales suaves como aparición de elementos al hacer scroll y transiciones entre secciones. Hacen que tu web se sienta dinámica y pulida sin ser invasiva.'
      }
    ],
    support: [
      {
        text: '3 meses de mantenimiento gratis (5 meses en promoción de inauguración).',
        detail: 'Durante este tiempo mantendremos tu web actualizada sin costo adicional. Cambios de textos, imágenes y colores básicos están incluidos. Después de este periodo, puedes contratar nuestro servicio de mantenimiento mensual si quieres seguir actualizando tu sitio.'
      },
      {
        text: '2 rondas de cambios antes de la publicación.',
        detail: 'Antes de publicar tu web, tendrás 2 oportunidades para revisar el resultado y pedir ajustes. Cada ronda incluye cambios de textos, imágenes y colores. Esto asegura que el resultado final sea exactamente lo que esperas.'
      }
    ]
  },
  {
    id: 'crecimiento',
    name: 'Plan Crecimiento',
    price: '3,490',
    description: 'Ideal para negocios que desean atraer más clientes y destacar frente a la competencia.',
    featured: true,
    features: [
      {
        text: 'Hasta 10 secciones distribuidas en un máximo de 5 páginas.',
        detail: 'Tu web tendrá hasta 10 bloques de contenido (ej: inicio, servicios, galería, testimonios, contacto, precios, preguntas frecuentes, etc.) organizados en hasta 5 páginas diferentes. Ideal para negocios que necesitan mostrar más información y tener una presencia digital sólida.'
      },
      {
        text: 'Banner personalizado.',
        detail: 'Imagen principal de tu página de inicio con diseño destacado y múltiples botones de contacto (WhatsApp, formulario, llamada). Diseñado para captar la atención de tus clientes desde el primer segundo.'
      },
      {
        text: 'Diseño dinámico e interactivo.',
        detail: 'Elementos que responden al movimiento del mouse, menús desplegables, cambios de color al pasar sobre botones y transiciones suaves entre secciones. Tu web se sentirá viva y moderna, invitando a tus clientes a explorar más.'
      },
      {
        text: 'Animaciones avanzadas.',
        detail: 'Efectos visuales de alto impacto: elementos que aparecen gradualmente, imágenes que se deslizan, secciones con efecto parallax (el fondo se mueve a diferente velocidad). Todo esto hace que tu web se vea profesional y de alto nivel.'
      },
      {
        text: 'Más efectos e interacciones para mejorar la experiencia del usuario.',
        detail: 'Zoom en imágenes al pasar el mouse, deslizamientos de contenido, cambios de color suaves y otros efectos visuales que hacen que tus clientes disfruten navegar tu web y se queden más tiempo explorando.'
      },
      {
        text: 'Panel de estadísticas de visitas.',
        detail: 'Podrás ver cuántas personas visitan tu web, de qué país o ciudad vienen, qué secciones miran más y cuánto tiempo se quedan. Datos útiles para tomar decisiones sobre tu negocio y saber qué contenido atrae más clientes.'
      }
    ],
    support: [
      {
        text: '6 meses de mantenimiento gratis (8 meses en promoción de inauguración).',
        detail: 'Durante este tiempo mantendremos tu web actualizada sin costo adicional. Cambios de textos, imágenes y colores básicos están incluidos. Después de este periodo, puedes contratar nuestro servicio de mantenimiento mensual.'
      },
      {
        text: '4 rondas de cambios antes de la publicación.',
        detail: 'Antes de publicar tu web, tendrás 4 oportunidades para revisar el resultado y pedir ajustes. Cada ronda incluye cambios de textos, imágenes y colores. Esto te da más flexibilidad para asegurar que el resultado final sea exactamente lo que esperas.'
      }
    ]
  },
  {
    id: 'expansion',
    name: 'Plan Expansión',
    price: '4,500',
    description: 'Ideal para negocios consolidados que necesitan una web a medida con animaciones personalizadas y soporte extendido.',
    featured: false,
    features: [
      {
        text: 'Secciones distribuidas en una estructura multipágina según las necesidades del proyecto.',
        detail: 'Tu web puede tener tantas secciones y páginas como necesites, sin límites artificiales. Si tu negocio crece, tu web crece contigo. Nos adaptamos completamente a lo que requieras, sin restricciones.'
      },
      {
        text: 'Página adicional para promociones o campañas.',
        detail: 'Una página extra dedicada a tus ofertas especiales, descuentos de temporada o campañas publicitarias. Puedes actualizarla cuando quieras para mantener a tus clientes informados sobre novedades.'
      },
      {
        text: 'Experiencia de navegación personalizada.',
        detail: 'La navegación de tu web está diseñada pensando en cómo se mueven tus clientes. Menús intuitivos, accesos rápidos y una estructura lógica para que encuentren lo que buscan sin esfuerzo, mejorando la satisfacción de tus visitantes.'
      },
      {
        text: 'Sección de Testimonios/Reseñas de clientes.',
        detail: 'Un espacio dedicado a mostrar las opiniones de tus clientes satisfechos. Las reseñas se muestran en rotación automática para dar dinamismo y generar confianza en nuevos clientes. La prueba social es una de las herramientas más efectivas para vender.'
      },
      {
        text: 'Banner con diseño completamente personalizado de acuerdo a la estética del negocio.',
        detail: 'La imagen principal de tu web será única y exclusiva para tu marca. Con animaciones y efectos visuales que reflejen la personalidad de tu negocio. No usamos plantillas genéricas: cada elemento está pensado para tu marca.'
      },
      {
        text: 'Diseño dinámico e interactivo.',
        detail: 'Elementos que responden al movimiento del mouse, menús desplegables, cambios de color al pasar sobre botones y transiciones suaves entre secciones. Tu web se sentirá viva y moderna.'
      },
      {
        text: 'Animaciones e interacciones completamente personalizadas.',
        detail: 'Cada sección de tu web puede tener movimientos y efectos únicos que reflejen la identidad de tu marca. Ninguna animación es genérica: todo está diseñado específicamente para tu negocio, haciendo que tu web sea memorable y única.'
      },
      {
        text: 'Transiciones avanzadas adaptadas a la identidad de tu negocio.',
        detail: 'Los cambios entre secciones y páginas tienen efectos visuales fluidos y elegantes, diseñados para que combinen con la estética de tu marca. La transición de una página a otra se siente natural y agradable, mejorando la percepción de calidad.'
      },
      {
        text: 'Mayor nivel de efectos visuales para una experiencia única.',
        detail: 'Efectos visuales de alto nivel que hacen que tu web destaque frente a cualquier competencia: animaciones de entrada personalizadas, efectos de profundidad, elementos que se mueven al hacer scroll y más. Tus clientes recordarán tu web.'
      },
      {
        text: 'Panel de estadísticas de visitas.',
        detail: 'Podrás ver cuántas personas visitan tu web, de qué país o ciudad vienen, qué secciones miran más y cuánto tiempo se quedan. Además, recibirás un reporte inicial explicándote cómo interpretar estos datos para tomar mejores decisiones.'
      }
    ],
    support: [
      {
        text: '12 meses de mantenimiento gratis (15 meses en promoción de inauguración).',
        detail: 'Un año completo de mantenimiento sin costo adicional. Cambios de textos, imágenes y colores básicos están incluidos durante todo este tiempo. Después, puedes contratar nuestro servicio de mantenimiento mensual para seguir actualizando tu sitio.'
      },
      {
        text: 'Cambios visuales incluidos durante el primer año.',
        detail: 'Durante todo el primer año puedes solicitar cambios en los textos, imágenes y colores de tu web sin restricción de rondas. Esto te da total flexibilidad para ajustar tu sitio a medida que tu negocio evoluciona.'
      },
      {
        text: '6 rondas de cambios antes de la publicación.',
        detail: 'Antes de publicar tu web, tendrás 6 oportunidades para revisar el resultado y pedir ajustes. Cada ronda incluye cambios de textos, imágenes y colores. Con 6 rondas, tienes la tranquilidad de que cada detalle quedará exactamente como lo imaginas.'
      }
    ]
  }
]

const maintenanceFeatures = [
  'Actualización de textos, precios, horarios y datos de contacto',
  'Cambio de imágenes, logos y elementos visuales del sitio',
  'Ampliación de tu sitio con 1 nueva sección o página por mes',
  'Ajustes de diseño (colores, fuentes, espaciados)',
  'Corrección de errores técnicos o bugs',
  'Revisión mensual de rendimiento, seguridad y backups',
  'Reporte de visitas con Google Analytics',
  'Soporte vía WhatsApp de lunes a viernes (9am-6pm)'
]

const maintenancePlans = [
  {
    id: 'mensual',
    name: 'Mantenimiento Mensual',
    featured: false,
    description: 'Pago flexible mes a mes. Sin permanencia.',
    regularPrice: '120',
    promoPrice: '80',
    period: '/mes',
    badge: 'Promoción inauguración',
    disclaimer: 'Precio promocional válido por 12 meses. Después se aplicará el precio regular de 120 Bs/mes.'
  },
  {
    id: 'semestral',
    name: 'Mantenimiento Semestral',
    featured: false,
    description: '6 meses con descuento. Pago único.',
    regularPrice: '650',
    promoPrice: '450',
    period: '/6 meses',
    monthlyEquivalent: '~75/mes',
    badge: 'Promoción inauguración',
    disclaimer: 'Precio promocional válido por 12 meses. Después se aplicará el precio regular de 650 Bs/semestre.'
  },
  {
    id: 'anual',
    name: 'Mantenimiento Anual',
    featured: true,
    description: 'El mejor valor. Pago único anual.',
    regularPrice: '1,200',
    promoPrice: '800',
    period: '/año',
    monthlyEquivalent: '~67/mes',
    badge: 'Mejor valor + Promoción',
    disclaimer: 'Precio promocional válido por 12 meses. Después se aplicará el precio regular de 1,200 Bs/año.'
  }
]

function switchTab(tab) {
  activeTab.value = tab
  nextTick(() => {
    const cards = tab === 'mantenimiento' ? maintCardRefs.value : cardRefs.value
    cards.filter(Boolean).forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          delay: 0.08 * (i + 1),
          ease: 'power2.out',
          clearProps: 'opacity,transform'
        }
      )
    })
  })
}

function scrollToContact() {
  const el = document.getElementById('contacto')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  scrollReveal(headerRef.value, { duration: 0.8 })
  cardRefs.value.filter(Boolean).forEach((el, i) => {
    scrollReveal(el, { duration: 0.6, delay: 0.15 * (i + 1) })
  })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.pricing {
  background: var(--color-bg-alt);
  position: relative;
}

.pricing::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-border), transparent);
}

.pricing__header {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing__tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.pricing__tabs {
  display: flex;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.pricing__tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease, background 0.3s ease;
  position: relative;
  z-index: 1;
}

.pricing__tab.is-active {
  color: #fff;
  background: rgba(255, 3, 2, 0.08);
}

.pricing__tab svg {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.pricing__tab.is-active svg {
  opacity: 1;
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.pricing__card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 2rem 1.75rem;
  position: relative;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.pricing__card:hover {
  border-color: rgba(255, 3, 2, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.pricing__card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 8px 30px rgba(255, 3, 2, 0.1);
}

.pricing__card--featured:hover {
  border-color: var(--color-primary);
  box-shadow: 0 12px 40px rgba(255, 3, 2, 0.2);
}

.pricing__badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.pricing__badge--promo {
  font-size: 0.625rem;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
}

.pricing__card-header {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}

.pricing__plan-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.pricing__price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15rem;
  margin-bottom: 0.75rem;
}

.pricing__currency {
  font-size: 1rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.pricing__amount {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
}

.pricing__description {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-dim);
}

.pricing__feature svg {
  color: var(--color-primary);
  flex-shrink: 0;
  opacity: 0.7;
}

.pricing__feature--detail {
  align-items: flex-start;
}

.pricing__feature--detail svg {
  margin-top: 0.2rem;
}

.pricing__feature div p {
  margin: 0.2rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.pricing__support {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.pricing__support--detail {
  margin-top: 0.5rem;
}

.pricing__support-label {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.pricing__support-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pricing__includes {
  background: rgba(255, 3, 2, 0.03);
  border: 1px solid rgba(255, 3, 2, 0.12);
  padding: 1.5rem 2rem;
  margin-bottom: 2.5rem;
}

.pricing__includes-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.pricing__includes-icon {
  display: flex;
  align-items: center;
  color: var(--color-primary);
}

.pricing__includes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1.5rem;
}

.pricing__includes-item {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  position: relative;
  padding-left: 1rem;
}

.pricing__includes-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0.6;
}

.pricing__detail-btn {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.pricing__detail-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: rgba(255, 3, 2, 0.05);
}

/* Maintenance styles */
.pricing__price.maintenance {
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.pricing__period {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-left: 0.15rem;
}

.pricing__regular-price {
  text-decoration: line-through;
  color: var(--color-text-muted);
  font-size: 1.125rem;
  font-weight: 500;
  opacity: 0.5;
  margin-right: 0.25rem;
}

.pricing__monthly-equiv {
  font-size: 0.8125rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pricing__disclaimer {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
  line-height: 1.4;
}

.pricing__card--maintenance .pricing__features {
  margin-bottom: 0;
}

/* Modal & Sheet */
.pricing__overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: overlayIn 0.25s ease;
}

.pricing__modal {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  max-width: 600px;
  width: 90%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pricing__modal-header {
  flex-shrink: 0;
  padding: 2rem 2rem 1rem;
  position: relative;
  border-bottom: 1px solid var(--color-border);
}

.pricing__modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem 1rem;
}

.pricing__modal-footer {
  flex-shrink: 0;
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.pricing__modal-close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
  z-index: 1;
}

.pricing__modal-close:hover {
  color: var(--color-primary);
}

.pricing__modal-body .pricing__features {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .pricing__overlay {
    align-items: flex-end;
  }

  .pricing__modal {
    max-width: 100%;
    width: 100%;
    max-height: 75vh;
    border-radius: 1rem 1rem 0 0;
    animation: sheetIn 0.3s ease-out;
  }

  .pricing__modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .pricing__modal-body {
    padding: 1rem 1.5rem;
  }

  .pricing__modal-footer {
    padding: 1rem 1.5rem 1.5rem;
  }

  .pricing__modal-close {
    top: 0.5rem;
    right: 1rem;
  }
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes sheetIn {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Transitions */
.pricing-fade-enter-active,
.pricing-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.pricing-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.pricing-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .pricing__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .pricing__includes {
    padding: 1rem 1.25rem;
  }

  .pricing__includes-grid {
    grid-template-columns: 1fr;
  }

  .pricing__card {
    padding: 1.5rem;
  }

  .pricing__card--featured {
    order: -1;
  }

  .pricing__amount {
    font-size: 2rem;
  }

  .pricing__tab {
    padding: 0.6rem 1.25rem;
    font-size: 0.8125rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pricing__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing__card:last-child {
    grid-column: 1 / -1;
    max-width: 50%;
    justify-self: center;
  }
}
</style>
