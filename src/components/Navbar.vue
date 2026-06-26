<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar__inner">
      <router-link to="/" class="navbar__logo">
        <span class="navbar__logo-icon">&lt;/&gt;</span>
        <span class="navbar__logo-text">Potato<span class="gradient-text">Ship</span></span>
      </router-link>

      <nav class="navbar__links" :class="{ 'navbar__links--open': isMenuOpen }">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="navbar__link"
          :class="{ 'navbar__link--active': isActive(link.path) }"
          @click="closeMenu"
        >
          {{ link.label }}
        </router-link>
        <router-link to="/contacto" class="btn btn-primary navbar__cta" @click="closeMenu">
          Contáctanos
        </router-link>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const links = [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' }
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
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
  gap: 0.25rem;
}

.navbar__link {
  padding: 0.5rem 1rem;
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

.navbar__cta {
  margin-left: 0.5rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
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

@media (max-width: 768px) {
  .navbar__toggle {
    display: flex;
  }

  .navbar__links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--color-bg-alt);
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    gap: 0.5rem;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
  }

  .navbar__links--open {
    right: 0;
  }

  .navbar__links {
    background: var(--color-bg);
  }

  .navbar__link {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
  }

  .navbar__cta {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
