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
                <select name="tipoDocumento" id="tipoDocumento" class="lr-form__select" v-model="usuario.tipoDocumento">
                  <option v-for="(tipoDocumento, index) in tiposDocumentos" :key="index" :value="tipoDocumento.value"
                    class="lr-form__select__option">{{ tipoDocumento.name }}</option>
                </select>
                <v-icon class="lr-form__icon-select" icon="mdi-chevron-down"></v-icon>
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-pound"></v-icon>
                <label for="numeroDocumento" class="lr-form__label">Número de identificación</label>
                <input type="text" name="numeroDocumento" id="numeroDocumento" v-model="usuario.numeroDocumento"
                  placeholder="Número de identificación" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-cake-variant"></v-icon>
                <label for="fechaNacimiento" class="lr-form__label">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="lr-form__input"
                  v-model="usuario.fechaNacimiento">
              </div>
            </div>

          </template>

          <template v-slot:item.2>
            <div class="lr-form__section">
              <h5 class="lr-form__title">Nombre completo</h5>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerNombre" class="lr-form__label">Primer nombre</label>
                <input type="text" name="primerNombre" id="primerNombre" v-model="usuario.primerNombre"
                  placeholder="Primer nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoNombre" class="lr-form__label">Segundo nombre (opcional)</label>
                <input type="text" name="segundoNombre" id="segundoNombre" v-model="usuario.segundoNombre"
                  placeholder="Segundo nombre" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="primerApellido" class="lr-form__label">Primer apellido</label>
                <input type="text" name="primerApellido" id="primerApellido" v-model="usuario.primerApellido"
                  placeholder="Primer apellido" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-text-box"></v-icon>
                <label for="segundoApellido" class="lr-form__label">Segundo apellido (opcional)</label>
                <input type="text" name="segundoApellido" id="segundoApellido" v-model="usuario.segundoApellido"
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
                <input type="email" name="correoElectronico" id="correoElectronico" v-model="usuario.correoElectronico"
                  placeholder="Correo electrónico" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-phone"></v-icon>
                <label for="numeroTelefono" class="lr-form__label">Número de teléfono</label>

                <input type="tel" name="numeroTelefono" id="numeroTelefono" v-model="usuario.numeroTelefono"
                  placeholder="Número de teléfono" class="lr-form__input">
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
                <label for="clave" class="lr-form__label">Contraseña</label>
                <input :type="mostrarContraseña ? 'text' : 'password'" name="clave" id="clave" placeholder="Contraseña"
                  v-model="usuario.clave" class="lr-form__input" />
                <button class="lr-form__group lr-form__icon_right" @click="toggleMostrarContraseña">
                  <v-icon :dark="mostrarContraseña ? false : true">{{ mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'
                  }}</v-icon>
                </button>
              </div>

              <div class="lr-form__group">
                <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
                <label for="repetirClave" class="lr-form__label">Repetir contraseña</label>
                <input :type="mostrarContraseña ? 'text' : 'password'" name="repetirClave" id="repetirClave"
                  v-model="confirmarClave" placeholder="Repetir contraseña" class="lr-form__input" />
                <button class="lr-form__group lr-form__icon_right" @click="toggleMostrarContraseña">
                  <v-icon :dark="mostrarContraseña ? false : true">{{ mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'
                  }}</v-icon>
                </button>
              </div>
            </div>
          </template>
        </v-stepper>


        <div class="lr-form__footer">
          <button id="crear" class="lr-form__button lr-form__button-footer"
            @click="verificarDatos(usuario.clave, confirmarClave, usuario.correoElectronico, usuario.numeroTelefono)"
            type="submit" :disabled="!camposCompletos">Crear
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
  <v-lazy>
    <Loader v-if="loading"></Loader>
  </v-lazy>
</template>


<style>
.v-stepper-item__avatar {
  background-color: var(--color-primary) !important;
}
</style>


<script setup>

import moment from 'moment';
import { VStepper } from 'vuetify/labs/VStepper'
import { UsuariosService } from '~/services/UsuariosService';
import { UtilsService } from '~/services/UtilsService';


definePageMeta({
  layout: "blank"
});

useHead({
  title: "QuyneApp ~ Registro"
});

onBeforeMount(() => {

  tiposDocumentos.value = UtilsService.getTiposDocumentos();
  usuario.value.tipoDocumento = tiposDocumentos.value[0].value;
  usuario.value.fechaNacimiento = moment().format("yyyy-MM-DD");
});

//const components = ref({ VStepper });
const confirmarClave = ref('');
const tiposDocumentos = ref([]);
const usuario = ref({ tipoDocumento: "", numeroDocumento: "", primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "", fechaNacimiento: "", correoElectronico: "", clave: "", numeroTelefono: "" });
const mostrarContraseña = ref(false);
const loading = ref(false)
const camposCompletos = computed(() => {
  let completo = (usuario.value.tipoDocumento && usuario.value.numeroDocumento && usuario.value.fechaNacimiento &&
    usuario.value.primerNombre && usuario.value.primerApellido && usuario.value.correoElectronico && usuario.value.numeroTelefono &&
    usuario.value.clave && confirmarClave.value && (usuario.value.clave === confirmarClave.value))

  if (completo === '') return false
  return completo
});

const toggleMostrarContraseña = () => {
  mostrarContraseña.value = !mostrarContraseña.value;
};

const verificarDatos = async (clave1, clave2, correo, telefono) => {
  const btn = document.getElementById('crear');
  btn.disabled = true;
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
    loading.value = true
    await UsuariosService.crearUsuarioYCuenta(
      usuario.value.tipoDocumento,
      usuario.value.numeroDocumento,
      usuario.value.primerNombre,
      usuario.value.segundoNombre,
      usuario.value.primerApellido,
      usuario.value.segundoApellido,
      usuario.value.fechaNacimiento,
      usuario.value.correoElectronico,
      usuario.value.clave,
      usuario.value.numeroTelefono
    );
    loading.value = false;
  }
  btn.disabled = false;
};
</script>