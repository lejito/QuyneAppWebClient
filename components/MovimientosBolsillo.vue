<template>
  <v-container fluid>
    <v-table fixed-header height="160px">
      <thead style="position: -webkit-sticky;">
        <tr>
          <th class="text-left">
            Tipo de movimiento
          </th>
          <th class="text-left">
            Monto
          </th>
          <th class="text-left">
            Fecha/hora
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="item in movimientos" :key="item.idMovimiento" v-if="movimientos.length > 0">
          <td>{{ item.tipoMovimiento }}</td>
          <td>{{ UtilsService.formatToCOP(parseFloat(item.monto)) }}</td>
          <td>{{ moment(item.fechaHora).format('yyyy-MM-DD hh:mm:ss A') }}</td>
        </tr>
        <tr v-else>
          <td colspan="3" class="text-center">No hay movimientos realizados hasta la fecha
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

  </v-container>
</template>
<script setup>
import { BolsillosService } from '~/services/BolsillosService';
import { UtilsService } from '~/services/UtilsService';
import moment from 'moment';
const loading = ref(true);
const movimientos = ref([]);
onBeforeMount(async () => {

  movimientos.value = await BolsillosService.consultarUltimosMovimientos(props.idBolsillo);
  loading.value = false;
})
const props = defineProps({
  idBolsillo: {
    type: Number,
    required: true
  }
}
)

</script>
<style></style>