<template>
  <div class="contenedior">
    <div class="card-perfil">
      <div class="iconContainer">
        <img src="~/public/perficon.png" />
        <h4>Contraseña</h4>
      </div>
      <div class="linea"></div>
      <div class="inputscontainer">
        <v-container>

          <v-icon icon="mdi-eye-off" class="eyeIcon" v-if="mostrar" @click="mostrar = !mostrar" style=""></v-icon>
          <v-icon icon="mdi-eye" class="eyeIcon" v-else @click="mostrar = !mostrar"></v-icon>

          <v-row>
            <v-col>
              <h5 class="texto-label-p">Contraseña actual</h5>
              <input class="labelContainer" :type="mostrar ? 'text' : 'password'" v-model="clave"
                placeholder="Contraseña actual" @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-col>

            <v-col>
              <h5 class="texto-label-p">Verificar contraseña</h5>
              <input class="labelContainer" v-model="validarClave" :type="mostrar ? 'text' : 'password'"
                placeholder="Verificar contraseña" @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5 class="texto-label-p">Nueva contraseña</h5>
              <input class="labelContainer" placeholder="Nueva contraseña" v-model="nuevaClave"
                :type="mostrar ? 'text' : 'password'" @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-col>
            <v-col>
              <h5 class="texto-label-p">Verificar nueva contraseña</h5>
              <input class="labelContainer" placeholder="Verificar nueva contraseña" v-model="validarNueva"
                :type="mostrar ? 'text' : 'password'" @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-col>
          </v-row>
        </v-container>
        <button class="boton" :disabled="!cambios" @click="guardar">Guardar Cambios</button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { AlertService } from '~/services/AlertService';
import { UsuariosService } from '~/services/UsuariosService';
const mostrar = ref(false);
const clave = ref('');
const validarClave = ref('');
const nuevaClave = ref('');
const validarNueva = ref('');
const emit = defineEmits(['loading'])
const cambios = ref(false);

async function guardar() {
  emit('loading', true);
  let successs = await UsuariosService.actualizarClave(clave.value, nuevaClave.value);
  emit('loading', false);
  if (successs) AlertService.success('Perfil', "Cambio de contraseña realizado efectivamente");
  clave.value = '';
  validarClave.value = '';
  nuevaClave.value = '';
  validarNueva.value = '';
  cambios.value = false;

}
function cambiosDisponibles() {


  return clave.value == validarClave.value && validarNueva.value == nuevaClave.value && clave.value && nuevaClave.value && validarClave.value && validarNueva.value;
}

</script>
<style scoped>
* {
  text-wrap: pretty;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 11%;
  padding: 35px;
}

.eyeIcon {
  transform: translate(450px, -40px);
  font-size: xx-large;
}

.card-perfil {
  display: flex;
  justify-content: flex-start;
  align-self: start;
  align-items: center;
  background-color: #fafafa;
  width: 800px;
  height: 450px;
  border-radius: 40px;
  box-shadow: 0 2px 5px var(--color-hover-background);
  margin-top: 25px;

}

.contenedior {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconContainer {
  width: 200px;
  height: 150px;
  margin-left: 50px;
  margin-bottom: 50px;

}

.linea {
  background-color: black;
  width: 1px;
  height: 80%;
  margin-left: 50px;

}

.labelContainer {
  display: flex;
  padding-left: 20px;
  align-items: center;
  height: 50px;
  width: 200px;
  background-color: whitesmoke;
  border-radius: 40px;
  margin-right: 20px;
  margin-top: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.labelContainer2 {
  display: flex;
  padding-left: 20px;
  align-items: center;
  height: 50px;
  width: 420px;
  background-color: whitesmoke;
  border-radius: 40px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.label-p {
  margin-left: 10px;
}

.texto-label-p {
  font-size: 20px;
  margin-left: 9px;
  color: black;
  margin-right: 90px;
}

.inputscontainer {
  margin-left: 30px;
}

.boton {
  height: 50px;
  width: 200px;
  background-color: transparent;
  border: 4px solid var(--color-terciario);
  color: black;
  padding: 10px 20px;
  border-radius: 30px;
  margin-left: 25%;
  margin-top: 10px;
  font-size: 20px;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.boton:disabled {
  color: #ccc !important;
  border: #ddd;

}

.boton:disabled:hover {
  background-color: transparent;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: auto;

}

.boton:hover {
  background-color: var(--color-terciario);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: bold;
}
</style>  