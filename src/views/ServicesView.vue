<template>
  <div class="page-services">
    <section class="section page-hero">
      <div class="container">
        <span class="tag">Servicios</span>
        <h1 class="section-title">Todo lo que ofrecemos</h1>
        <p class="section-subtitle">
          Soluciones web estáticas para cada tipo de negocio. Pasa el mouse sobre cada servicio y haz click para mantener la vista abierta.
        </p>
      </div>
    </section>

    <ServicesSection />
  </div>
</template>

<script setup>
import ServicesSection from '@/components/ServicesSection.vue'
</script>

<style scoped>
.page-hero {
  padding-top: 120px;
  padding-bottom: 2rem;
  text-align: center;
}

.page-hero .section-subtitle {
  margin: 0 auto;
}
</style>
