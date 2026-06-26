<template>
  <div class="page-contact">
    <section class="section page-hero">
      <div class="container">
        <span class="tag">Contacto</span>
        <h1 class="section-title">Hablemos de tu proyecto</h1>
        <p class="section-subtitle">
          Cuéntanos qué necesitas y te enviaremos una cotización personalizada en menos de 24 horas.
        </p>
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<script setup>
import ContactSection from '@/components/ContactSection.vue'
</script>

<style scoped>
.page-hero {
  padding-top: 120px;
  padding-bottom: 0;
  text-align: center;
}

.page-hero .section-subtitle {
  margin: 0 auto;
}
</style>
