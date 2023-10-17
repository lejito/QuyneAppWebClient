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
          <select name="tipoDocumento" id="tipoDocumento" v-model="tipoDocumento" class="lr-form__select">
            <option v-for="(tipoDocumento, index) in tiposDocumentos" :key="index" :value="tipoDocumento.value"
              class="lr-form__select__option">{{ tipoDocumento.name }}</option>
          </select>
          <v-icon class="lr-form__icon-select" icon="mdi-chevron-down"></v-icon>
        </div>

        <div class="lr-form__group">
          <v-icon class="lr-form__icon" icon="mdi-pound"></v-icon>
          <label for="numeroDocumento" class="lr-form__label">Número de identificación</label>
          <input type="text" name="numeroDocumento" id="numeroDocumento" v-model="numeroDocumento"
            placeholder="Número de identificación" class="lr-form__input">
        </div>

        <div class="lr-form__group">
          <v-icon class="lr-form__icon" icon="mdi-key"></v-icon>
          <label for="clave" class="lr-form__label">Contraseña</label>
          <input name="clave" id="clave" :type="mostrarContraseña ? 'text' : 'password'" placeholder="Contraseña"
            v-model="clave" class="lr-form__input" />
          <button class="lr-form__group lr-form__icon_right" @click="toggleMostrarContraseña">
            <v-icon :dark="mostrarContraseña ? false : true">{{ mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </button>
        </div>

        <button class="lr-form__button" @click="login(tipoDocumento, numeroDocumento, clave)"
          :disabled="!camposCompletos">Iniciar sesión</button>

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
import { UsuariosService } from '~/services/UsuariosService';
import { UtilsService } from '~/services/UtilsService';

definePageMeta({
  layout: "blank"
});

useHead({
  title: "QuyneApp ~ Inicio de sesión"
});

onBeforeMount(() => {
  const sessionToken = UtilsService.getSessionToken();
  if (sessionToken) {
    navigateTo("/inicio");
  }

  tiposDocumentos.value = UtilsService.getTiposDocumentos();
  tipoDocumento.value = tiposDocumentos.value[0].value;
});

const tiposDocumentos = ref([]);
const tipoDocumento = ref("");
const numeroDocumento = ref("");
const clave = ref("");
const mostrarContraseña = ref(false);

const camposCompletos = computed(() => {
  return tipoDocumento.value && numeroDocumento.value && clave.value;
});

const toggleMostrarContraseña = () => {
  mostrarContraseña.value = !mostrarContraseña.value;
};

const login = (tipoDocumento, numeroDocumento, clave) => {
  UsuariosService.iniciarSesion(tipoDocumento, numeroDocumento, clave);
}
</script>