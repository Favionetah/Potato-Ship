<template>
  <div id="app-root">
    <div ref="cursorRef" class="custom-cursor"></div>
    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const cursorRef = ref(null)

onMounted(() => {
  const gsap = window.gsap
  if (!gsap) return

  const cursor = cursorRef.value
  if (!cursor) return

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power2.out' })
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power2.out' })

  function handleMove(e) {
    xTo(e.clientX - 10)
    yTo(e.clientY - 10)
  }

  function handleHover() {
    cursor.style.width = '40px'
    cursor.style.height = '40px'
    cursor.style.borderColor = 'rgba(255, 3, 2, 0.5)'
    cursor.style.backgroundColor = 'rgba(255, 3, 2, 0.05)'
  }

  function handleHoverOut() {
    cursor.style.width = '20px'
    cursor.style.height = '20px'
    cursor.style.borderColor = 'rgba(250, 219, 190, 0.3)'
    cursor.style.backgroundColor = 'transparent'
  }

  document.addEventListener('mousemove', handleMove)

  const interactives = document.querySelectorAll('a, button, .btn, .service-card, input, textarea, select')
  interactives.forEach(el => {
    el.addEventListener('mouseenter', handleHover)
    el.addEventListener('mouseleave', handleHoverOut)
  })

  const observer = new MutationObserver(() => {
    document.querySelectorAll('a, button, .btn, .service-card, input, textarea, select').forEach(el => {
      el.removeEventListener('mouseenter', handleHover)
      el.removeEventListener('mouseleave', handleHoverOut)
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleHoverOut)
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleMove)
    document.querySelectorAll('a, button, .btn, .service-card, input, textarea, select').forEach(el => {
      el.removeEventListener('mouseenter', handleHover)
      el.removeEventListener('mouseleave', handleHoverOut)
    })
    observer.disconnect()
  })
})
</script>

<style scoped>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 1.5px solid rgba(250, 219, 190, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  transform: translate(-50%, -50%);
}

@media (hover: none) {
  .custom-cursor {
    display: none;
  }
}
</style>
