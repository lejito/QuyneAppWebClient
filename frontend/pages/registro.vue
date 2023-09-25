<template>
  <div class="lr-layout">
    <div class="lr-card">
      <NuxtLink to="/">
        <i class="lr-card__back fa-solid fa-arrow-left"></i>
      </NuxtLink>

      <img src="QuyneApp_Logo_Normal.png" alt="Logo" class="lr-card__img">

      <div class="lr-card__line"></div>

      <form action="javascript:void(0);" class="lr-form">
        <div class="lr-form__sections">
          <div class="lr-form__section">
            <h5 class="lr-form__title">Datos de identificación</h5>

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
              <i class="lr-form__icon fa-solid fa-lg fa-cake-candles"></i>
              <label for="fechaNacimiento" class="lr-form__label">Fecha de nacimiento</label>
              <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="lr-form__input">
            </div>
          </div>

          <div class="lr-form__vertical-line"></div>

          <div class="lr-form__section">
            <h5 class="lr-form__title">Nombre completo</h5>

            <div class="lr-form__group">
              <i class="lr-form__icon fa-solid fa-lg fa-signature"></i>
              <label for="primerNombre" class="lr-form__label">Primer nombre</label>
              <input type="text" name="primerNombre" id="primerNombre" placeholder="Primer nombre" class="lr-form__input">
            </div>

            <div class="lr-form__group">
              <i class="lr-form__icon fa-solid fa-lg fa-signature"></i>
              <label for="segundoNombre" class="lr-form__label">Segundo nombre (opcional)</label>
              <input type="text" name="segundoNombre" id="segundoNombre" placeholder="Segundo nombre"
                class="lr-form__input">
            </div>

            <div class="lr-form__group">
              <i class="lr-form__icon fa-solid fa-lg fa-signature"></i>
              <label for="primerApellido" class="lr-form__label">Primer apellido</label>
              <input type="text" name="primerApellido" id="primerApellido" placeholder="Primer apellido"
                class="lr-form__input">
            </div>

            <div class="lr-form__group">
              <i class="lr-form__icon fa-solid fa-lg fa-signature"></i>
              <label for="segundoApellido" class="lr-form__label">Segundo apellido (opcional)</label>
              <input type="text" name="segundoApellido" id="segundoApellido" placeholder="Segundo apellido"
                class="lr-form__input">
            </div>
          </div>

          <div class="lr-form__vertical-line"></div>

          <div class="lr-form__section">
              <h5 class="lr-form__title">Seguridad y contacto</h5>

              <div class="lr-form__group">
                <i class="lr-form__icon fa-solid fa-lg fa-at"></i>
                <label for="correoElectronico" class="lr-form__label">Correo electrónico</label>
                <input type="email" name="correoElectronico" id="correoElectronico" placeholder="Correo electrónico"
                  class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <i class="lr-form__icon fa-solid fa-lg fa-phone"></i>
                <label for="numeroTelefono" class="lr-form__label">Número de teléfono</label>
                <input type="tel" name="numeroTelefono" id="numeroTelefono" placeholder="Número de teléfono"
                  class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <i class="lr-form__icon fa-solid fa-lg fa-key"></i>
                <label for="clave" class="lr-form__label">Contraseña</label>
                <input type="password" name="clave" id="clave" placeholder="Contraseña"
                  class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <i class="lr-form__icon fa-solid fa-lg fa-key"></i>
                <label for="repetirClave" class="lr-form__label">Repetir contraseña</label>
                <input type="password" name="repetirClave" id="repetirClave" placeholder="Repetir contraseña"
                  class="lr-form__input">
              </div>
            </div>
        </div>

        <div class="lr-form__footer">
          <button class="lr-form__button lr-form__button-footer">Crear cuenta</button>

          <NuxtLink to="/login">
            <span class="lr-form__link">
              ¿Ya tienes una cuenta? ¡Inicia sesión!
            </span>
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  layout: "blank"
});

useHead({
  title: "QuyneApp ~ Registro"
});
</script>