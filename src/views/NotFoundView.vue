<template>
  <div class="not-found">
    <div class="container not-found__content">
      <span class="not-found__code">404</span>
      <h1 class="section-title">Página no encontrada</h1>
      <p class="not-found__text">
        La página que buscas no existe o fue movida.
      </p>
      <router-link to="/" class="btn btn-primary">
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

.not-found__code {
  font-size: 8rem;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.not-found__text {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}
</style>
