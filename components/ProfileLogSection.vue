<template>
  <div class="contenedior">
    <div class="card-perfil">
      <div class="iconContainer">
        <img src="~/public/perficon.png" />
        <h4>Registro de actividad</h4>
      </div>
      <div class="linea"></div>
      <div class="inputscontainer">
        <v-table fixed-header height="300px">
          <thead style="position: -webkit-sticky;">
            <tr>
              <th class="text-left">
                ID del registro
              </th>
              <th class="text-left">
                Accion
              </th>
              <th class="text-left">
                Fecha/hora
              </th>
            </tr>
          </thead>
          <tbody v-if="!cargando">
            <tr v-for="item in registros" :key="item.id" v-if="registros.length > 0">
              <td>{{ item.id }}</td>
              <td>{{ item.accion }}</td>
              <td>{{ moment(item.fechaHora).format('yyyy-MM-DD hh:mm:ss A') }}</td>
            </tr>
            <tr v-else>
              <td colspan="3" class="text-center">No hay registros realizados hasta la fecha
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="i in 7">
              <td> <span class="skeleton-loader-white"></span></td>
              <td> <span class="skeleton-loader-white"></span></td>
              <td> <span class="skeleton-loader-white"></span></td>
            </tr>
          </tbody>
        </v-table>

      </div>

    </div>
  </div>
</template>
<script setup>
import moment from 'moment';
import { AlertService } from '~/services/AlertService';
import { UsuariosService } from '~/services/UsuariosService';
const cargando = ref(false);
const registros = ref([
  {
    "id": 5559,
    "accion": "Actualizar fecha de nacimiento",
    "fechaHora": "2023-11-16T03:17:43.276Z"
  },
  {
    "id": 5558,
    "accion": "Actualizar correo electrónico",
    "fechaHora": "2023-11-16T02:33:10.959Z"
  },
  {
    "id": 5557,
    "accion": "Iniciar sesión",
    "fechaHora": "2023-11-16T02:20:38.610Z"
  },
  {
    "id": 5556,
    "accion": "Actualizar contraseña",
    "fechaHora": "2023-11-16T02:18:39.318Z"
  },
  {
    "id": 5554,
    "accion": "Actualizar contraseña",
    "fechaHora": "2023-11-16T01:54:02.222Z"
  },
  {
    "id": 5553,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T01:44:15.944Z"
  },
  {
    "id": 5552,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T01:43:34.361Z"
  },
  {
    "id": 5550,
    "accion": "Iniciar sesión",
    "fechaHora": "2023-11-16T01:12:46.878Z"
  },
  {
    "id": 5549,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:56:26.930Z"
  },
  {
    "id": 5548,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:52:00.679Z"
  },
  {
    "id": 5547,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:51:18.167Z"
  },
  {
    "id": 5546,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:51:08.286Z"
  },
  {
    "id": 5545,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:51:06.617Z"
  },
  {
    "id": 5544,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:51:06.426Z"
  },
  {
    "id": 5543,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:50:52.783Z"
  },
  {
    "id": 5542,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:50:37.971Z"
  },
  {
    "id": 5541,
    "accion": "Actualizar nombre completo",
    "fechaHora": "2023-11-16T00:49:46.643Z"
  },
  {
    "id": 5540,
    "accion": "Iniciar sesión",
    "fechaHora": "2023-11-15T20:55:09.105Z"
  },
  {
    "id": 5539,
    "accion": "Cerrar sesión",
    "fechaHora": "2023-11-15T05:39:03.017Z"
  },
  {
    "id": 5538,
    "accion": "Desactivar saldo oculto",
    "fechaHora": "2023-11-15T05:36:29.058Z"
  },
  {
    "id": 5537,
    "accion": "Activar saldo oculto",
    "fechaHora": "2023-11-15T05:36:27.400Z"
  },
  {
    "id": 5536,
    "accion": "Iniciar sesión",
    "fechaHora": "2023-11-15T05:36:21.891Z"
  },
  {
    "id": 5535,
    "accion": "Cerrar sesión",
    "fechaHora": "2023-11-15T05:30:22.010Z"
  },
  {
    "id": 5534,
    "accion": "Desactivar saldo oculto",
    "fechaHora": "2023-11-15T05:30:16.451Z"
  },
  {
    "id": 5533,
    "accion": "Activar saldo oculto",
    "fechaHora": "2023-11-15T05:30:15.113Z"
  },
  {
    "id": 5532,
    "accion": "Desactivar saldo oculto",
    "fechaHora": "2023-11-15T04:58:50.622Z"
  },
  {
    "id": 5531,
    "accion": "Activar saldo oculto",
    "fechaHora": "2023-11-15T04:58:49.798Z"
  }]);
const emit = defineEmits(['loading'])

onBeforeMount(async () => {
  cargando.value = true;
  //registros.value = await UsuariosService.consultarRegistrosActividad();

  cargando.value = false;
})

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