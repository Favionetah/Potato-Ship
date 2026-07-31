<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar__inner">
      <router-link to="/" class="navbar__logo">
        <span class="navbar__logo-icon">&lt;/&gt;</span>
        <span class="navbar__logo-text">acosmia</span>
      </router-link>

      <nav class="navbar__links" :class="{ 'navbar__links--open': isMenuOpen }">
        <button class="navbar__close" @click="closeMenu" aria-label="Cerrar menú">
          &times;
        </button>
        <a href="#" class="navbar__link" role="button" @click.prevent="scrollToSection('inicio')">
          Inicio
        </a>
        <a href="#" class="navbar__link" role="button" @click.prevent="scrollToSection('planes')">
          Planes
        </a>
        <a href="#" class="navbar__link" role="button" @click.prevent="scrollToSection('contacto')">
          Contacto
        </a>
      </nav>

      <button class="navbar__toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function scrollToSection(id) {
  closeMenu()
  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: background var(--transition), box-shadow var(--transition);
}

.navbar-scrolled {
  background: rgba(46, 56, 65, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 1.25rem;
}

.navbar__logo-icon {
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.navbar__logo-text {
  font-weight: 800;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar__link {
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius);
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color var(--transition), background var(--transition);

}

.navbar__link:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.navbar__link--active {
  color: var(--color-primary);
  background: rgba(255, 3, 2, 0.08);
}



.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.navbar__toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}

.navbar__close {
  display: none;
}

@media (max-width: 768px) {
  .navbar__toggle {
    display: flex;
  }

  .navbar__links {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: var(--color-bg);
    flex-direction: column;
    padding: 4rem 2rem 2rem;
    gap: 0.75rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid var(--color-border);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  }

  .navbar__links--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  .navbar__close {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: var(--color-text);
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    transition: color var(--transition);
  }

  .navbar__close:hover {
    color: var(--color-primary);
  }

  .navbar__link {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
    text-align: center;
  }
}
</style>
