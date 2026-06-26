<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <router-link to="/" class="footer__logo">
            <span class="footer__logo-icon">&lt;/&gt;</span>
            <span>Potato<span class="gradient-text">Ship</span></span>
          </router-link>
          <p class="footer__desc">
            Creamos sitios web estáticos modernos y profesionales para impulsar tu negocio en internet.
          </p>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Navegación</h4>
          <router-link to="/" class="footer__link">Inicio</router-link>
          <router-link to="/servicios" class="footer__link">Servicios</router-link>
          <router-link to="/contacto" class="footer__link">Contacto</router-link>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Contacto</h4>
          <a href="mailto:hola@potatoweb.com" class="footer__link">faviosandy30@gmail.com</a>
          <a href="https://github.com/Favionetah" class="footer__link">GitHub</a>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ year }} PotatoWeb. Todos los derechos reservados.</p>
        <p class="footer__tech">Hecho con Vue 3 + Vite + GSAP</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-xl) 0 var(--spacing-lg);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: var(--spacing-md);
}

.footer__logo-icon {
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.footer__desc {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  max-width: 360px;
  line-height: 1.7;
}

.footer__heading {
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-dim);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.footer__link {
  display: block;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  padding: 0.25rem 0;
  transition: color var(--transition);
}

.footer__link:hover {
  color: var(--color-primary);
}

.footer__bottom {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--color-text-dim);
}

.footer__tech {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .footer__bottom {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
}
</style>
