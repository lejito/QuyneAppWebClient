<template>
  <div class="shadow">
    <div class="rectangle-s">
      <div class="rectangle-s2">
        <h4 class="text-S">SERVICIOS</h4>
        <div class="line-s"></div>
      </div>
    </div>
  </div>
  <div class="card-container">
    <NuxtLink class="card" to="recarga_civica">
      <h6 class="centered-text">Recargar cívica</h6>
      <img src="~/public/fondo_civica.png" />
    </NuxtLink>
    <NuxtLink class="card" to="/recarga_telefonia">
      <h6 class="centered-text">Recargar teléfono</h6>
      <img src="~/public/fondo_icono_recargar.png" />
    </NuxtLink>
    <NuxtLink class="card" to="paquetes_moviles">
      <h6 class="centered-text">Paquetes móviles</h6>
      <img src="~/public/fondo_icono_moviles.png" />
    </NuxtLink>
  </div>
</template>

<script setup>

definePageMeta({
  layout: "navbar"
});

</script>
<style scoped>
.rectangle-s {
  clip-path: polygon(0 0, 5% 100%, 100% 100%, 100% 0);
  background-color: var(--color-secundario);
  width: 50% !important;
  height: 140px !important;
  float: right;
}

.rectangle-s2 {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 4% 100%);
  background: linear-gradient(10deg, var(--color-primario) 25%, transparent);
  width: 96%;
  height: 110px;
  float: right;
}

.text-S {
  color: white;
  margin-top: 25px;
  margin-left: 55%;
}

.line-s {
  width: 450px;
  border-bottom: 1px solid white;
  margin-left: 23%;
  margin-top: 8px;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 11%;
  padding: 35px;
}

.card {
  background-color: #fafafa;
  width: 350px;
  height: 400px;
  border-radius: 40px;
  box-shadow: 0 2px 5px var(--color-hover-background);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-10px);
}

.card:not(:hover) {
  transform: translateY(0);
}

.centered-text {
  text-align: center;
  margin-top: 20px;
}
</style>