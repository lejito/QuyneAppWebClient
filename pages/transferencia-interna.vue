<template>
  <Detalles v-if="confirmacion" @cerrar="cerrar" :movimiento="movimiento">
  </Detalles>
  <v-row>
    <v-col cols=" 1" class="center">
      <NuxtLink to="/inicio" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px;">
      <TitleLeft name="TRANSFERENCIA INTERNA"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">
      <v-text-field type="text" v-model="numero" :rules="numRules" label="Numero de teléfono" required></v-text-field>
      <v-text-field type="number" v-model="monto" :rules="amountRules" label="Monto a enviar" required></v-text-field>

      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate()" id="btn" :disabled="validando">
          <p style="color: white;">Enviar dinero</p>
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
import { CuentasService } from '~/services/CuentasService';
import { UtilsService } from '~/services/UtilsService';

definePageMeta({
  layout: "navbar",
});

const form = ref(null)
const confirmacion = ref(false)
const movimiento = ref({})
const numero = ref()
const monto = ref();
const loading = ref(false)
const validando = ref(false)
const numRules = ref([
  v => !!v || 'El número de teléfono es requerido.',
  v => (v && v.length == 10) || 'Los números de teléfono son de 10 dígitos.',
  v => (RegExp("^[0-9]").test(v)) || 'Solo se admiten números.'
])
const amountRules = ref([
  v => !!v || 'El monto es requerido.',
  v => (RegExp("^[0-9,$]*$").test(v)) || 'Solo se admiten números.',
  v => (Number(v) != 0) || "Ingrese un valor válido."
])

onBeforeMount(() => {

});

useHead({
  title: "QuyneApp ~ Transferencia interna"
});

function setLoading(value) {
  loading.value = value;
}

function resetForm() {
  numero.value = null;
  monto.value = null;
}

function cerrar(val) {
  confirmacion.value = false;
}

async function validate() {
  validando.value = true;
  setLoading(true);
  const { valid } = await form.value.validate()
  if (!valid) {
    AlertService.warning("Atención", "Los datos ingresados son nulos o inválidos.");
  } else {
    const movimientoRealizado = await MovimientosService.realizarTransferenciaInterna(numero.value, parseFloat(monto.value));

    if (movimientoRealizado) {
      movimiento.value = { ...movimientoRealizado, cuentaDestino: numero.value };
      confirmacion.value = true;
      resetForm();
    }
  }
  setLoading(false);
  validando.value = false;
}
</script>


<style scoped></style>
