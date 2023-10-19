<template>
  <v-responsive class="modal">

    <main class="detalles" id="details">
      <v-icon icon="mdi-download" class="descargar" @click="descargar"></v-icon>
      <h2>Detalles del movimiento</h2>
      <v-icon icon="mdi-arrow-down-circle-outline" class="icono"></v-icon>
      <p class="destino">{{ movimiento.destino }}</p>
      <p class="descripcion">{{ movimiento.descripcion }}</p>
      <p class="fecha">{{ moment(movimiento.fecha).format('yyyy-MM-DD hh:mm:ss A') }} </p>
      <p class="monto" v-if="movimiento.monto > 0" style="color: green;">{{
        UtilsService.formatToCOP(parseFloat(movimiento.monto)) }}
      </p>
      <p class="monto" v-else style="color: red;">{{ UtilsService.formatToCOP(parseFloat(movimiento.monto)) }}</p>
      <v-btn style="margin-top: 30px;" color="var(--color-success)" @click="() => { emit('cerrar', true); }">
        <p style="font-weight: 600; color: white;">OK</p>
      </v-btn>
    </main>

  </v-responsive>
</template>

<script setup>
import moment from 'moment';
//import { toPDF } from '~/services/PDFService';
import { UtilsService } from '~/services/UtilsService';
const emit = defineEmits(['cerrar'])
const movimiento = ref({});


onBeforeMount(() => {
  movimiento.value = props.movimiento;
})

const props = defineProps({
  movimiento: {
    type: Object,
    required: true
  }
})

function descargar() {
  let detalles = document.getElementById('details');
  //toPDF(detalles, 'Detalles movimiento');
}
</script>
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(18, 9, 135, 0.8);
  z-index: 9999;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

}

.detalles {
  position: absolute;
  right: 15vw;
  top: 10vh;
  width: 70vw;
  height: 80vh;
  background-color: var(--color-white);
  border: 2px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.icono {
  margin: 40px;
  color: var(--color-success);

}

.descargar {
  position: absolute;
  top: 2vh;
  right: 1vw;
  color: #000;
  font-size: 50px;
  cursor: pointer;
}

.descargar:active {
  font-size: 45px;
}

.icono::after {
  content: 'Envio Realizado';
  font-size: medium;
  color: var(--color-success);

}

.destino {
  font-size: medium;
  font-weight: bolder;
}

.destino::before {
  content: 'Para: ';
  font-size: larger;

}

.descripcion {
  font-size: medium;
  font-weight: bolder;
}

.descripcion::before {
  content: 'Descripción: ';
  font-size: larger;

}

.monto {
  font-size: medium;
  font-weight: bolder;
}

.monto::before {
  content: 'Monto: ';
  font-size: larger;

}

.fecha {
  font-size: medium;
  font-weight: bolder;
}

.fecha::before {
  content: 'Fecha: ';
  font-size: larger;

}
</style>