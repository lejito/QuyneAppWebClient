<template>
  <Detalles v-if="confirmacion" @cerrar="cerrar" :movimiento="movimiento">
  </Detalles>
  <v-row>
    <v-col cols="1" class="center">
      <NuxtLink to="/inicio" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px ;">
      <TitleLeft name="PAGO DE FACTURAS"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">
      <v-text-field v-model="referencia" :rules="refRules" label="Codigo de referencia" required></v-text-field>
      <v-text-field v-model="descripcion" :rules="descRoules" label="Descripcion del pago" required></v-text-field>
      <v-text-field v-model="monto" :rules="amountRules" label="Monto a recargar" required></v-text-field>


      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate(referencia, descripcion, monto)" id="btn">
          <p style="color: white;">Pagar</p>
        </v-btn>
      </div>
    </v-form>

  </v-responsive>
  <Loader v-if="loading"></Loader>
</template>

<script setup>
import TitleLeft from '~/components/TitleLeft.vue';
import { AlertService } from '~/services/AlertService';
import { MovimientosService } from '~/services/MovimientosService';


definePageMeta({
  layout: "navbar",
});
const movimiento = ref({})
const form = ref(null)
const confirmacion = ref(false)
const referencia = ref(undefined)
const descripcion = ref("")
const monto = ref();
const loading = ref(false)
const refRules = ref([
  v => !!v || 'El codigo de referencia es requerido',
  v => (v && v.length > 4) || 'El codigo de referencia es de más de 4 digitos',

])
const amountRules = ref([
  v => !!v || 'El monto es requerido',
  v => (RegExp("^[0-9,$]*$").test(v)) || 'Solo se admiten numeros',
  v => (Number(v) != 0) || "Ingrese un valor"
])
const descRoules = ref([v => !!v || 'La descripcion es requerida',])
useHead({
  title: "QuyneApp ~ Pagar factura"
})
function setLoading(value) {
  loading.value = value;
}
function cerrar(val) {
  confirmacion.value = false;
}
function resetForm() {
  descripcion.value = null;
  referencia.value = null;
  monto.value = null;
}

async function validate(referencia, descripcion, monto) {

  const { valid } = await form.value.validate()
  if (!valid) {
    AlertService.warning("Atención", "No se han cumplido las validaciones para realizar el proceso");
    return;
  }
  setLoading(true)
  let movimientoRealizado = await MovimientosService.realizarPagoFactura(referencia, descripcion, parseFloat(monto));

  if (movimientoRealizado != null && movimientoRealizado != undefined) {
    movimiento.value = movimientoRealizado;
    confirmacion.value = true;
    resetForm();
  }
  setLoading(false)
}
</script>


<style scoped></style>
