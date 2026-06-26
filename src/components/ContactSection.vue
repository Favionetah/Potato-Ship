<template>
  <section class="section contact" ref="sectionRef">
    <div class="container">
      <div class="contact__grid">
        <div class="contact__info" ref="infoRef">
          <span class="tag">Contacto</span>
          <h2 class="section-title">Trabajemos juntos</h2>
          <p class="contact__subtitle">
            Cuéntanos sobre tu proyecto y te enviaremos una cotización personalizada en menos de 24 horas.
          </p>
          <div class="contact__details">
            <div class="contact__detail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>faviosandy30@gmail.com</span>
            </div>
            <div class="contact__detail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              <span>https://github.com/Favionetah/Potato-Ship</span>
            </div>
          </div>
        </div>

        <form class="contact__form" ref="formRef" @submit.prevent="handleSubmit">
          <div class="form__group">
            <label for="name" class="form__label">Nombre</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form__input"
              placeholder="Tu nombre"
              required
            >
          </div>
          <div class="form__group">
            <label for="email" class="form__label">Correo electrónico</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form__input"
              placeholder="tu@correo.com"
              required
            >
          </div>
          <div class="form__group">
            <label for="project" class="form__label">Tipo de proyecto</label>
            <select id="project" v-model="form.project" class="form__input form__select">
              <option value="" disabled>Selecciona una opción</option>
              <option value="corporativa">Web corporativa</option>
              <option value="landing">Landing page</option>
              <option value="catalogo">Catálogo digital</option>
              <option value="menu">Menú digital</option>
              <option value="portafolio">Portafolio profesional</option>
              <option value="informativa">Página informativa</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="form__group">
            <label for="message" class="form__label">Mensaje</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form__input form__textarea"
              placeholder="Cuéntanos sobre tu proyecto..."
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;" :disabled="submitting">
            {{ submitting ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sectionRef = ref(null)
const infoRef = ref(null)
const formRef = ref(null)
const submitting = ref(false)
const { gsap, scrollReveal } = useGsap()

const form = reactive({
  name: '',
  email: '',
  project: '',
  message: ''
})

function handleSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    alert('¡Gracias por contactarnos! Te responderemos en menos de 24 horas.')
    form.name = ''
    form.email = ''
    form.project = ''
    form.message = ''
  }, 1000)
}

onMounted(() => {
  scrollReveal(infoRef.value, { duration: 0.8 })
  scrollReveal(formRef.value, { duration: 0.8, delay: 0.2 })
})
</script>

<style scoped>
.contact {
  position: relative;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact__info {
  position: sticky;
  top: 100px;
}

.contact__subtitle {
  margin-bottom: 2rem;
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 600px;
}

.contact__details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.contact__detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.contact__detail svg {
  color: var(--color-primary);
  flex-shrink: 0;
  opacity: 0.7;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.form__input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0;
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.form__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 3, 2, 0.08);
}

.form__input::placeholder {
  color: var(--color-text-dim);
}

.form__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239e8776' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  cursor: pointer;
}

.form__textarea {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 768px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__info {
    position: static;
  }
}
</style>
