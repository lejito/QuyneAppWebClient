<template>
  <div class="contenedior">
    <div class="card-perfil">
      <div class="iconContainer">
        <img src="~/public/perficon.png" />
        <h4>Nombre completo</h4>
      </div>
      <div class="linea"></div>
      <div class="inputscontainer">
        <v-container>
          <v-form id="form" ref="form">
            <v-row>
              <h5 class="texto-label-p">Primer nombre</h5>
              <h5 class="texto-label-p">Segundo nombre</h5>
            </v-row>
            <v-row>
              <input class="labelContainer" v-model="primerNombre" placeholder="Nombre "
                @keyup="() => { cambios = cambiosDisponibles() }" />
              <input class="labelContainer" v-model="segundoNombre" placeholder="Segundo nombre"
                @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-row>
            <v-row>
              <h5 class="texto-label-p">Primer apellido</h5>
              <h5 class="texto-label-p">Segundo apellido</h5>
            </v-row>
            <v-row>
              <input class="labelContainer" placeholder="Apellido" v-model="primerApellido"
                @keyup="() => { cambios = cambiosDisponibles() }" />
              <input class="labelContainer" placeholder="Segundo apellido" v-model="segundoApellido"
                @keyup="() => { cambios = cambiosDisponibles() }" />
            </v-row>
          </v-form>


        </v-container>
        <button class="boton" :disabled="!cambios" @click="guardar">Guardar Cambios</button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { AlertService } from '~/services/AlertService';
import { UsuariosService } from '~/services/UsuariosService';
const form = ref(null)
const primerNombre = ref('');
const segundoNombre = ref('');
const primerApellido = ref('');
const segundoApellido = ref('');
const valoresIniciales = { 'nombre1': '', 'nombre2': '', 'apellido1': '', 'apellido2': '' }
const emit = defineEmits(['loading'])

const cambios = ref(false);
onBeforeMount(async () => {
  emit('loading', true);
  let { primerNombre: nombre, segundoNombre: sNombre, primerApellido: apellido, segundoApellido: sApellido } = await UsuariosService.consultarDatos();
  emit('loading', false);
  primerNombre.value = nombre;
  segundoNombre.value = sNombre ? sNombre : '';
  primerApellido.value = apellido;
  segundoApellido.value = sApellido ? sApellido : '';
  valoresIniciales.nombre1 = nombre;
  valoresIniciales.nombre2 = sNombre ? sNombre : '';
  valoresIniciales.apellido1 = apellido;
  valoresIniciales.apellido2 = sApellido ? sApellido : '';
});
async function guardar() {
  emit('loading', true);
  let successs = await UsuariosService.actualizarNombre(primerNombre.value, segundoNombre.value ? segundoNombre.value : null, primerApellido.value, segundoApellido.value ? segundoApellido.value : null);
  emit('loading', false);
  if (successs) AlertService.success('Perfil', "Cambios en el nombre del usuario realizados correctamente");
  location.reload();

}
function cambiosDisponibles() {
  if (!primerNombre.value || !primerApellido.value) {
    AlertService.informative('Perfil', "El primer nombre y primer apellido son campos obligatorios");
    return false;
  }

  return valoresIniciales.nombre1 != primerNombre.value || valoresIniciales.nombre2 != segundoNombre.value || valoresIniciales.apellido1 != primerApellido.value || valoresIniciales.apellido2 != segundoApellido.value;
}

</script>
<style scoped>
* {
  text-wrap: balance;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 11%;
  padding: 35px;
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
  width: 150px;
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