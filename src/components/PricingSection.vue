<template>
  <section class="section pricing" ref="sectionRef">
    <div class="container">
      <div class="pricing__header" ref="headerRef">
        <span class="tag">Planes</span>
        <h2 class="section-title">Elige tu plan</h2>
        <p class="section-subtitle">
          Todos nuestros planes incluyen diseño responsive, hosting y dominio .com por 1 año. Elige el que mejor se adapte a tu negocio.
        </p>
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

          <router-link to="/contacto" class="btn" :class="plan.featured ? 'btn-primary' : 'btn-secondary'" style="width: 100%; justify-content: center;">
            Lo quiero
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </router-link>
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

const plans = [
  {
    id: 'emprendedor',
    name: 'Plan Emprendedor',
    price: 'XXXX',
    description: 'Perfecto para quien inicia su presencia digital.',
    featured: false,
    features: [
      'Diseño responsive',
      'Formulario de contacto funcional',
      'Botón de WhatsApp integrado',
      'Hosting y dominio .com por 1 año',
      '1 actualización mensual'
    ]
  },
  {
    id: 'crecimiento',
    name: 'Plan Crecimiento',
    price: 'XXXX',
    description: 'Ideal para negocios en crecimiento que buscan destacar.',
    featured: true,
    features: [
      'Todo lo de Emprendedor',
      'SEO básico (Google friendly)',
      'Galería de imágenes (hasta 10)',
      'Integración de redes sociales',
      '3 actualizaciones mensuales'
    ]
  },
  {
    id: 'expansion',
    name: 'Plan Expansión',
    price: 'XXXX',
    description: 'Solución completa para empresas con proyección.',
    featured: false,
    features: [
      'Todo lo de Crecimiento',
      'Catálogo digital o menú interactivo',
      'Páginas internas (hasta 5)',
      'Google Analytics configurado',
      'Soporte prioritario',
      'Capacitación básica del equipo'
    ]
  }
]

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

@media (max-width: 768px) {
  .pricing__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
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
