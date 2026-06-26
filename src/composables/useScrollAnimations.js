import { onMounted, onBeforeUnmount, ref } from 'vue'

export function useScrollAnimations() {
  const observer = ref(null)

  function initIntersectionObserver() {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.value.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-in').forEach(el => {
      observer.value.observe(el)
    })
  }

  onMounted(() => {
    initIntersectionObserver()
  })

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return { initIntersectionObserver }
}
