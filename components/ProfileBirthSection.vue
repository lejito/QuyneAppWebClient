<template>
  <div class="contenedior">
    <div class="card-perfil">
      <div class="iconContainer">
        <img src="~/public/perficon.png" />
        <h4>Fecha de nacimiento</h4>
      </div>
      <div class="linea"></div>
      <div class="inputscontainer">
        <v-container>
          <v-row>
            <v-col>
              <h5 class="texto-label-p">Fecha de nacimiento</h5>
            </v-col>
          </v-row>
          <v-container>
            <v-row justify="space-around">
              <v-text-field type="date" label="Fecha" v-model="date"
                @keyup="() => { cambios = cambiosDisponibles() }"></v-text-field>
            </v-row>
          </v-container>
        </v-container>
        <button class="boton" :disabled="!cambios" @click="guardar">Guardar Cambios</button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { dateConfiguration } from 'virtual:vuetify-date-configuration';
import { AlertService } from '~/services/AlertService';
import { UsuariosService } from '~/services/UsuariosService';

const dateInicial = ref(null);
const date = ref(null);
const cambios = ref(false);
const emit = defineEmits(['loading'])

onBeforeMount(async () => {
  emit('loading', true);
  let { fechaNacimiento } = await UsuariosService.consultarDatos();
  date.value = fechaNacimiento;
  dateInicial.value = fechaNacimiento;
  emit('loading', false);
})

function cambiosDisponibles() {
  return !!date && date.value != dateInicial.value;
}

async function guardar() {

  emit('loading', true);
  let successs = await UsuariosService.actualizarFechaNacimiento(date.value.toString());
  emit('loading', false);
  if (successs) AlertService.success('Perfil', "Cambio de fecha de nacimiento realizada con exito");


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
  transform: translate(455px, -65px);
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
  width: 180px;
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