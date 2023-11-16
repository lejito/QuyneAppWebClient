<template>
  <div class="modal_detalles">
    <main class="detalles">
      <v-icon icon="mdi-download" class="descargar" @click="descargar"></v-icon>
      <div id="detalles" style="text-align: center;">
        <div class="title">
          <h3>¡Movimiento realizado!</h3>
          <h6>{{ movimiento.tipoMovimiento }}</h6>
          <div class="movimiento-info">
            <div class="movimiento-id">
              <v-icon icon="mdi-arrow-down-circle-outline" class="icono"></v-icon>
              <span class="movimiento-id__text"><b>ID movimiento:</b> {{ movimiento.idMovimiento }}</span>
            </div>
            <div class="movimiento-datetime">
              <v-icon icon="mdi-clock" class="icono"></v-icon>
              <span class="movimiento-datetime__text"><b>Fecha y hora:</b>
                {{ moment(movimiento.fecha).format('yyyy/MM/DD hh:mm:ss A') }}</span>
            </div>
          </div>
        </div>
        <p class="text" v-if="movimiento.tipoMovimiento == 'Transferencia externa'"><b>Entidad destino:</b> {{
          nombreEntidad(movimiento.entidadDestino) }}</p>
        <p class="text"
          v-if="movimiento.tipoMovimiento == 'Transferencia interna' || movimiento.tipoMovimiento == 'Transferencia externa'">
          <b>Cuenta destino:</b> {{ movimiento.cuentaDestino }}
        </p>
        <p class="text" v-if="movimiento.tipoMovimiento == 'Pago de factura'"><b>Referencia:</b> {{ movimiento.referencia
        }}</p>
        <p class="text" v-if="movimiento.tipoMovimiento == 'Pago de factura'"><b>Descripción:</b> {{
          movimiento.descripcion
        }}</p>
        <p class="text" v-if="movimiento.tipoMovimiento == 'Recarga a tarjeta cívica'"><b>Documento de identidad:</b> {{
          movimiento.tipoDocumento }} {{ movimiento.numeroDocumento }}</p>
        <p class="text"
          v-if="movimiento.tipoMovimiento == 'Recarga a telefonía móvil' || movimiento.tipoMovimiento == 'Pago de paquete de telefonía'">
          <b>Operador:</b> {{ nombreOperador(movimiento.operador) }}
        </p>
        <p class="text" v-if="movimiento.tipoMovimiento == 'Pago de paquete de telefonía'">
          <b>Paquete:</b> {{ movimiento.nombre }}
        </p>
        <p class="text"
          v-if="movimiento.tipoMovimiento == 'Recarga a telefonía móvil' || movimiento.tipoMovimiento == 'Pago de paquete de telefonía'">
          <b>Número de teléfono:</b> {{ movimiento.numeroTelefono }}
        </p>
        <p class="text"><b>Monto:</b> {{ UtilsService.formatToCOP(parseFloat(movimiento.monto)) }}</p>
      </div>
      <v-btn style="margin-top: 30px;" color="var(--color-danger)" @click="() => { emit('cerrar', true); }">
        <p style="font-weight: 600; color: white;">Cerrar</p>
      </v-btn>
    </main>
  </div>
</template>

<script setup>
import moment from 'moment';
import { toPDF } from '~/services/PDFService';
import { UtilsService } from '~/services/UtilsService';
const emit = defineEmits(['cerrar'])
const movimiento = ref({});

onBeforeMount(() => {
  movimiento.value = props.movimiento;
})

const nombreEntidad = (value) => {
  return UtilsService.getEntidades().find(entidad => { return entidad.value == value }).name;
}

const nombreOperador = (value) => {
  return UtilsService.getOperadores().find(entidad => { return entidad.value == value }).name;
}

const props = defineProps({
  movimiento: {
    type: Object,
    required: true
  }
})

async function descargar() {
  const detalles = document.getElementById('detalles');
  toPDF(detalles, `QuyneApp_Movimiento_${movimiento.value.idMovimiento}`);
}
</script>
<style scoped>
.modal_detalles {
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(18, 9, 135, 0.8);
  z-index: 999;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detalles {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  padding: 70px 120px;
  background-color: var(--color-white);
  border: 2px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
}

.icono {
  width: max-content;
  color: var(--color-success);
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.text {
  font-size: var(--font-size-text-big);
  margin-bottom: 10px;
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

.movimiento-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.movimiento-id,
.movimiento-datetime {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.movimiento-id__text,
.movimiento-datetime__text {
  color: var(--color-success);
}
</style>