<template>
  <section id="planes" class="section pricing" ref="sectionRef">
    <div class="container">
      <div class="pricing__header" ref="headerRef">
        <span class="tag">Planes</span>
        <h2 class="section-title">Elige tu plan</h2>
        <p class="section-subtitle">
          Todos nuestros planes incluyen diseño responsive, hosting y dominio personalizado. Elige el que mejor se adapte a tu negocio.
        </p>
      </div>

      <div class="pricing__includes" ref="includesRef">
        <div class="pricing__includes-header">
          <span class="pricing__includes-icon">✅</span>
          <span>Todo plan incluye:</span>
        </div>
        <div class="pricing__includes-grid">
          <span v-for="f in commonFeatures" :key="f" class="pricing__includes-item">{{ f }}</span>
        </div>
      </div>

      <div class="pricing__grid" ref="gridRef">
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
              v-for="feature in plan.features"
              :key="feature"
              class="pricing__feature"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ feature }}
            </li>
          </ul>

          <div v-if="plan.support" class="pricing__support">
            <span class="pricing__support-label">Soporte</span>
            <ul class="pricing__support-list">
              <li
                v-for="item in plan.support"
                :key="item"
                class="pricing__feature"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>

          <a href="#" class="btn" :class="plan.featured ? 'btn-primary' : 'btn-secondary'" style="width: 100%; justify-content: center; margin-top: 0.75rem;" @click.prevent="scrollToContact">
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
import { ref, onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sectionRef = ref(null)
const headerRef = ref(null)
const gridRef = ref(null)
const cardRefs = ref([])
const { gsap, scrollReveal } = useGsap()

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
    price: 'XXXX',
    description: 'Ideal para negocios que quieren comenzar su presencia digital.',
    featured: false,
    features: [
      'Hasta 5 secciones distribuidas en un máximo de 2 páginas.',
      'Banner personalizado.',
      'Diseño moderno y profesional.',
      'Animaciones básicas.'
    ],
    support: [
      '3 meses de mantenimiento (5 meses promoción de inauguración).',
      '2 rondas de cambios antes de la publicación.'
    ]
  },
  {
    id: 'crecimiento',
    name: 'Plan Crecimiento',
    price: 'XXXX',
    description: 'Ideal para negocios que desean atraer más clientes y ofrecer una experiencia más atractiva.',
    featured: true,
    features: [
      'Hasta 10 secciones distribuidas en un máximo de 5 páginas.',
      'Banner personalizado.',
      'Diseño dinámico e interactivo.',
      'Animaciones avanzadas.',
      'Más efectos e interacciones para mejorar la experiencia del usuario.',
      'Estadísticas de visitas mediante Google Analytics.'
    ],
    support: [
      '6 meses de mantenimiento (Promoción de inauguración: 12 meses).',
      '4 rondas de cambios antes de la publicación.'
    ]
  },
  {
    id: 'expansion',
    name: 'Plan Expansión',
    price: 'XXXX',
    description: 'Ideal para negocios que buscan una experiencia web completamente personalizada y preparada para crecer.',
    featured: false,
    features: [
      'Secciones distribuidas en una estructura multipágina según las necesidades del proyecto.',
      'Página adicional para promociones o campañas.',
      'Experiencia de navegación personalizada.',
      'Sección de Testimonios/Reseñas de clientes.',
      'Banner con diseño completamente personalizado de acuerdo a la estética del negocio.',
      'Diseño dinámico e interactivo.',
      'Animaciones e interacciones completamente personalizadas.',
      'Transiciones avanzadas adaptadas a la identidad de tu negocio.',
      'Mayor nivel de efectos visuales para una experiencia única.',
      'Estadísticas de visitas mediante Google Analytics.'
    ],
    support: [
      '12 meses de mantenimiento (Promoción de inauguración: 18 meses).',
      'Cambios visuales incluidos durante el primer año.',
      '6 rondas de cambios antes de la publicación.'
    ]
  }
]

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

.pricing__support {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
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
  font-size: 1.2rem;
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
