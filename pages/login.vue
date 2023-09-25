<template>
  <div class="lr-layout">
    <div class="lr-card">
      <NuxtLink to="/">
        <i class="lr-card__back fa-solid fa-arrow-left"></i>
      </NuxtLink>

      <img src="QuyneApp_Logo_Normal.png" alt="Logo" class="lr-card__img">

      <div class="lr-card__line"></div>

      <form action="javascript:void(0);" class="lr-form">
        <h5 class="lr-form__title">Inicio de sesión</h5>

        <div class="lr-form__group">
          <i class="lr-form__icon fa-solid fa-lg fa-id-badge"></i>
          <label for="tipoDocumento" class="lr-form__label">Tipo de identificación</label>
          <select name="tipoDocumento" id="tipoDocumento" class="lr-form__select">
            <option value="CC" class="lr-form__select__option">Cédula de ciudadanía</option>
            <option value="TI" class="lr-form__select__option">Tarjeta de identidad</option>
            <option value="CE" class="lr-form__select__option">Cédula de extranjería</option>
            <option value="PP" class="lr-form__select__option">Pasaporte</option>
          </select>
          <i class="lr-form__icon-select fa-solid fa-lg fa-caret-down"></i>
        </div>

        <div class="lr-form__group">
          <i class="lr-form__icon fa-solid fa-lg fa-id-card"></i>
          <label for="numeroDocumento" class="lr-form__label">Número de identificación</label>
          <input type="text" name="numeroDocumento" id="numeroDocumento" placeholder="Número de identificación"
            class="lr-form__input">
        </div>

        <div class="lr-form__group">
          <i class="lr-form__icon fa-solid fa-lg fa-key"></i>
          <label for="clave" class="lr-form__label">Contraseña</label>
          <input type="password" name="clave" id="clave" placeholder="Contraseña" class="lr-form__input">
        </div>

        <button class="lr-form__button">Iniciar sesión</button>

        <NuxtLink to="/registro">
          <span class="lr-form__register">
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