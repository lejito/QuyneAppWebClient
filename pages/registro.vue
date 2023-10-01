<template>
  <div class="lr-layout">
    <div class="lr-card">
      <NuxtLink to="/">
        <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
      </NuxtLink>

      <img src="~/public/QuyneApp_Logo_Normal.png" alt="Logo" class="lr-card__img">

      <div class="lr-card__line"></div>

      <form action="javascript:void(0);" class="lr-form">

        <v-stepper class="lr-form__stepper" prev-text="anterior" next-text="siguiente"
          :items="['Paso 1', 'Paso 2', 'Paso 3']">
          <template v-slot:item.1>
            <div class="lr-form__section">
              <h5 class="lr-form__title">Datos de identificación</h5>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-card-account-details"></v-icon>
                <label for="tipoDocumento" class="lr-form__label">Tipo de identificación</label>
                <select name="tipoDocumento" id="tipoDocumento" class="lr-form__select" v-model="newUser.docType">
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
                <input type="text" name="numeroDocumento" id="numeroDocumento" v-model="newUser.document"
                  placeholder="Número de identificación" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-cake-variant"></v-icon>
                <label for="fechaNacimiento" class="lr-form__label">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="lr-form__input"
                  v-model="newUser.birthDay">
              </div>
            </div>

          </template>

          <template v-slot:item.2>
            <div class="lr-form__section">
              <h5 class="lr-form__title">Nombre completo</h5>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerNombre" class="lr-form__label">Primer nombre</label>
                <input type="text" name="primerNombre" id="primerNombre" v-model="newUser.firstName"
                  placeholder="Primer nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoNombre" class="lr-form__label">Segundo nombre (opcional)</label>
                <input type="text" name="segundoNombre" id="segundoNombre" v-model="newUser.secondName"
                  placeholder="Segundo nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerApellido" class="lr-form__label">Primer apellido</label>
                <input type="text" name="primerApellido" id="primerApellido" v-model="newUser.firstLastName"
                  placeholder="Primer apellido" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoApellido" class="lr-form__label">Segundo apellido (opcional)</label>
                <input type="text" name="segundoApellido" id="segundoApellido" v-model="newUser.secondLastName"
                  placeholder="Segundo apellido" class="lr-form__input">
              </div>
            </div>
          </template>

          <template v-slot:item.3>
            <div class="lr-form__section">
              <h5 class="lr-form__title">Seguridad y contacto</h5>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-at"></v-icon>
                <label for="correoElectronico" class="lr-form__label">Correo electrónico</label>
                <input type="email" name="correoElectronico" id="correoElectronico" v-model="newUser.email"
                  placeholder="Correo electrónico" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-phone"></v-icon>
                <label for="numeroTelefono" class="lr-form__label">Número de teléfono</label>
                <input type="tel" name="numeroTelefono" id="numeroTelefono" v-model="phone"
                  placeholder="Número de teléfono" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
                <label for="clave" class="lr-form__label">Contraseña</label>
                <input type="password" name="clave" id="clave" placeholder="Contraseña" v-model="newUser.password"
                  class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
                <label for="repetirClave" class="lr-form__label">Repetir contraseña</label>
                <input type="password" name="repetirClave" id="repetirClave" v-model="confirmPass"
                  placeholder="Repetir contraseña" class="lr-form__input">
              </div>
            </div>
          </template>
        </v-stepper>


        <div class="lr-form__footer">
          <button class="lr-form__button lr-form__button-footer"
            @click="UserService.register(newUser, confirmPass, phone)">Crear
            cuenta</button>

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
import moment from 'moment';

import { VStepper } from 'vuetify/labs/VStepper'
import { User } from '~/models/User';
import { UserService } from '~/services/UserService';
const confirmPass = ref('')
const phone = ref('')
const newUser = ref(new User(0, "", "CC", "", moment().format('yyyy-MM-DD'), "", 0, "", ""));
const components = ref({ VStepper });
definePageMeta({
  layout: "blank"
});

onBeforeMount(() => {
  console.log(newUser.value.birthDay)
})

useHead({
  title: "QuyneApp ~ Registro"
});
</script>
<style>
.v-stepper-item__avatar {
  background-color: var(--color-primary) !important;
}
</style>