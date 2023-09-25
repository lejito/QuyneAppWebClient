<template>
  <div class="lr-layout">
    <div class="lr-card">
      <NuxtLink to="/">
        <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
      </NuxtLink>

      <img src="~/public/QuyneApp_Logo_Normal.png" alt="Logo" class="lr-card__img">

      <div class="lr-card__line"></div>

      <form action="javascript:void(0);" class="lr-form">
        <h5 class="lr-form__title">Inicio de sesión</h5>

        <div class="lr-form__group">
          <v-icon class="lr-form__icon" icon="mdi-card-account-details"></v-icon>
          <label for="tipoDocumento" class="lr-form__label">Tipo de identificación</label>
          <select name="tipoDocumento" id="tipoDocumento" class="lr-form__select">
            <option value="CC" class="lr-form__select__option">Cédula de ciudadanía</option>
            <option value="TI" class="lr-form__select__option">Tarjeta de identidad</option>
            <option value="CE" class="lr-form__select__option">Cédula de extranjería</option>
            <option value="PP" class="lr-form__select__option">Pasaporte</option>
          </select>
          <v-icon class="lr-form__icon-select" icon="mdi-chevron-down"></v-icon>
        </div>

        <div class="lr-form__group">
          <v-icon class="lr-form__icon" icon="mdi-pound"></v-icon>
          <label for="numeroDocumento" class="lr-form__label">Número de identificación</label>
          <input type="text" name="numeroDocumento" id="numeroDocumento" placeholder="Número de identificación"
            class="lr-form__input">
        </div>

        <div class="lr-form__group">
          <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
          <label for="clave" class="lr-form__label">Contraseña</label>
          <input type="password" name="clave" id="clave" placeholder="Contraseña" class="lr-form__input">
        </div>

        <button class="lr-form__button">Iniciar sesión</button>

        <NuxtLink to="/registro">
          <span class="lr-form__link">
            ¿No tienes una cuenta? ¡Regístrate!
          </span>
        </NuxtLink>
      </form>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  layout: "blank"
});

useHead({
  title: "QuyneApp ~ Inicio de sesión"
});
</script>