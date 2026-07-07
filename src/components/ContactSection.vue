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
              <img src="@/assets/icons/carta-icon.png" alt="Correo" width="20" height="20" class="contact__custom-icon">
              <span>faviosandy30@gmail.com</span>
            </div>
            <a href="https://wa.me/TU_NUMERO_AQUI" target="_blank" class="contact__detail">
              <img src="@/assets/icons/phone-icon.png" alt="WhatsApp" width="20" height="20" class="contact__custom-icon">
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>

        <form v-if="!submitted" class="contact__form" ref="formRef" @submit.prevent="handleSubmit">
          <div class="form__group">
            <label for="name" class="form__label">Nombre</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
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
              name="email"
              class="form__input"
              placeholder="tu@correo.com"
              required
            >
          </div>
          <div class="form__group">
            <label for="project" class="form__label">Tipo de proyecto</label>
            <select id="project" v-model="form.project" name="title" class="form__input form__select">
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
              name="message"
              class="form__input form__textarea"
              placeholder="Cuéntanos sobre tu proyecto..."
              rows="4"
              required
            ></textarea>
          </div>
          <div class="form__group">
            <div class="g-recaptcha form__captcha" data-sitekey="6LdMKUktAAAAAJUndC7FD1bo7b1M_FCkvs7L2Zgx"></div>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;" :disabled="submitting">
            {{ submitting ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </form>

        <div v-else class="contact__thankyou" ref="thankyouRef">
          <div class="thankyou__emoji">:)</div>
          <h3>¡Gracias por contactarnos!</h3>
          <p class="thankyou__text">Te responderemos en menos de 24 horas.</p>
          <p class="thankyou__whatsapp-text">¿Prefieres hablar directo?</p>
          <a href="https://wa.me/+59177751832" target="_blank" class="btn btn-whatsapp">
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useGsap } from '@/composables/useGsap'
import emailjs from '@emailjs/browser'

emailjs.init({ publicKey: "Gb36_UuUWhX9lxwbb" })

const sectionRef = ref(null)
const infoRef = ref(null)
const formRef = ref(null)
const thankyouRef = ref(null)
const SIMULATE = true
const submitting = ref(false)
const COOLDOWN = 30 * 60 * 1000 // 30 minutos
const submitted = ref(
  localStorage.getItem('lastSend') !== null
  && Date.now() - Number(localStorage.getItem('lastSend')) < COOLDOWN
)
const { gsap, scrollReveal } = useGsap()

function animateThankYou() {
  if (!thankyouRef.value) return
  gsap.fromTo(thankyouRef.value,
    { opacity: 0, y: 30, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
  )
  const emoji = thankyouRef.value.querySelector('.thankyou__emoji')
  if (emoji) {
    gsap.fromTo(emoji,
      { scale: 0, rotation: -30 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)', delay: 0.2 }
    )
  }
}

const form = reactive({
  name: '',
  email: '',
  project: '',
  message: ''
})

function handleSubmit() {
  submitting.value = true

  const onSuccess = () => {
    submitting.value = false
    submitted.value = true
    localStorage.setItem('lastSend', Date.now())
    form.name = ''
    form.email = ''
    form.project = ''
    form.message = ''
    grecaptcha.reset()
    nextTick(() => animateThankYou())
  }

  const onError = (error) => {
    submitting.value = false
    alert('Error al enviar. Intenta de nuevo.')
    console.error(error)
  }

  if (!SIMULATE) {
    const token = grecaptcha.getResponse()
    if (!token) {
      submitting.value = false
      alert('Por favor, verifica que no eres un robot.')
      return
    }
    emailjs.send("service_39vm8om", "template_byp3oxh", {
      title: form.project,
      name: form.name,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString(),
      'g-recaptcha-response': token,
    }).then(onSuccess).catch(onError)
  } else {
    setTimeout(onSuccess, 1500)
  }
}

onMounted(() => {
  scrollReveal(infoRef.value, { duration: 0.8 })
  scrollReveal(formRef.value, { duration: 0.8, delay: 0.2 })
  if (submitted.value) {
    animateThankYou()
  }
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
  text-decoration: none;
  transition: color var(--transition);
}

.contact__detail:hover {
  color: var(--color-primary);
}

.contact__detail svg {
  color: var(--color-primary);
  flex-shrink: 0;
  opacity: 0.7;
}

.contact__custom-icon {
  filter: brightness(0) saturate(100%) invert(9%) sepia(94%) saturate(7487%) hue-rotate(360deg);
  flex-shrink: 0;
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
  cursor: none;
}

.form__textarea {
  resize: vertical;
  min-height: 100px;
}

.form__captcha {
  margin-bottom: 0.5rem;
}

.contact__thankyou {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1rem;
  min-height: 300px;
  color: var(--color-primary);
  background: rgba(255, 3, 2, 0.04);
  border: 1.5px solid rgba(255, 3, 2, 0.15);
}

.thankyou__emoji {
  font-size: 4rem;
  line-height: 1;
  color: var(--color-primary);
  text-shadow: 0 0 20px rgba(255, 3, 2, 0.3);
}

.contact__thankyou h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.thankyou__text {
  color: var(--color-text);
  font-size: 1rem;
}

.thankyou__whatsapp-text {
  color: var(--color-text);
  font-size: 0.9375rem;
  margin-top: 0.5rem;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #25D366;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background var(--transition), transform var(--transition);
}

.btn-whatsapp:hover {
  background: #1da851;
  transform: translateY(-2px);
  color: #fff;
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
