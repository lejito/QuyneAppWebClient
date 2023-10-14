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
                <select name="tipoDocumento" id="tipoDocumento" class="lr-form__select" v-model="newUser.tipo_documento">
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
                <input type="text" name="numeroDocumento" id="numeroDocumento" v-model="newUser.numero_documento"
                  placeholder="Número de identificación" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-cake-variant"></v-icon>
                <label for="fechaNacimiento" class="lr-form__label">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="lr-form__input"
                  v-model="newUser.fecha_nacimiento">
              </div>
            </div>

          </template>

          <template v-slot:item.2>
            <div class="lr-form__section">
              <h5 class="lr-form__title">Nombre completo</h5>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerNombre" class="lr-form__label">Primer nombre</label>
                <input type="text" name="primerNombre" id="primerNombre" v-model="newUser.primer_nombre"
                  placeholder="Primer nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoNombre" class="lr-form__label">Segundo nombre (opcional)</label>
                <input type="text" name="segundoNombre" id="segundoNombre" v-model="newUser.segundo_nombre"
                  placeholder="Segundo nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerApellido" class="lr-form__label">Primer apellido</label>
                <input type="text" name="primerApellido" id="primerApellido" v-model="newUser.primer_apellido"
                  placeholder="Primer apellido" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoApellido" class="lr-form__label">Segundo apellido (opcional)</label>
                <input type="text" name="segundoApellido" id="segundoApellido" v-model="newUser.segundo_apellido"
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
                <input type="email" name="correoElectronico" id="correoElectronico" v-model="newUser.correo_electronico"
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
                <input :type="mostrarContraseña ? 'text' : 'password'" name="clave" id="clave" placeholder="Contraseña"
                  v-model="newUser.clave" class="lr-form__input" />
                <button class="lr-form__group lr-form__icon_right" @click="toggleMostrarContraseña">
                  <v-icon :dark="mostrarContraseña ? false : true">{{ mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'
                  }}</v-icon>
                </button>
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
                <label for="repetirClave" class="lr-form__label">Repetir contraseña</label>
                <input :type="mostrarContraseña ? 'text' : 'password'" name="repetirClave" id="repetirClave"
                  v-model="confirmPass" placeholder="Repetir contraseña" class="lr-form__input" />
                <button class="lr-form__group lr-form__icon_right" @click="toggleMostrarContraseña">
                  <v-icon :dark="mostrarContraseña ? false : true">{{ mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'
                  }}</v-icon>
                </button>
              </div>
            </div>
          </template>
        </v-stepper>


        <div class="lr-form__footer">
          <button class="lr-form__button lr-form__button-footer"
            @click="verificarDatos(confirmPass, newUser.clave, newUser.correo_electronico, phone)" type="submit"
            :disabled="!camposCompletos">Crear
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
const mostrarContraseña = ref(false);
definePageMeta({
  layout: "blank"
});

onBeforeMount(() => {

})

useHead({
  title: "QuyneApp ~ Registro"
});
const camposCompletos = computed(() => {

  let completo = (newUser.value.tipo_documento && newUser.value.numero_documento && newUser.value.fecha_nacimiento &&
    newUser.value.primer_nombre && newUser.value.correo_electronico && phone.value &&
    newUser.value.clave && confirmPass.value && (newUser.value.clave === confirmPass.value))

  if (completo === '') return false
  return completo
});
const toggleMostrarContraseña = () => {
  mostrarContraseña.value = !mostrarContraseña.value;
};
const verificarDatos = (clave1, clave2, correo, telefono) => {
  let claveIgual = false;
  let correoCorrecto = false;
  let numeroTelefonicoBien = false;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const intutcorreo = document.getElementById("correoElectronico")
  const passa = document.getElementById("repetirClave");
  const passa2 = document.getElementById("clave");
  const intutelefono = document.getElementById("numeroTelefono");
  if (clave1 != clave2) {
    passa.style.borderColor = "red";
    passa2.style.borderColor = "red";
  }
  else {
    claveIgual = true;
    passa.style.borderColor = "#BDBDBD";
    passa2.style.borderColor = "#BDBDBD";
  }
  if (regexCorreo.test(correo)) {
    correoCorrecto = true;
    intutcorreo.style.borderColor = "#BDBDBD";
  }
  else {
    intutcorreo.style.borderColor = "red";
  }
  if (telefono != "") {
    numeroTelefonicoBien = true;
    intutelefono.style.borderColor = "#BDBDBD";
  }
  else {
    intutelefono.style.borderColor = "red";
  }
  if (claveIgual && correoCorrecto && numeroTelefonicoBien) {

    UserService.register(newUser.value, confirmPass.value, phone.value)
  }

};
</script>
<style>
.v-stepper-item__avatar {
  background-color: var(--color-primary) !important;
}
</style>