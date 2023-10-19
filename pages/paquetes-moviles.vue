<template>
  <Detalles v-if="confirmacion" @cerrar="cerrar"
    :movimiento="{ 'destino': 'Julian', 'descripcion': 'Pago factura', 'fecha': '2023-10-19T18:33:40.658Z', 'monto': 5000 }">
  </Detalles>
  <v-row>
    <v-col cols="1" class="center">
      <NuxtLink to="/servicios" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px ;">
      <TitleLeft name="PAQUETES MOVILES"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">
      <v-text-field v-model="numero" :rules="numRules" label="Numero de telefono" required></v-text-field>
      <v-select v-model="nombre" :items="nombres" :rules="[v => !!v || 'El nombre del paquete es requerido']"
        label="Paquete"></v-select>
      <v-text-field label="Costo del paquete" disabled="true" v-model="monto" v-if="monto"></v-text-field>
      <v-select v-model="operador" :items="operadores" :rules="[v => !!v || 'El operador es requerido']" label="Operador"
        required></v-select>

      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate(operador, nombre, numero, monto)" id="btn">
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
import { UtilsService } from '~/services/UtilsService';

definePageMeta({
  layout: "navbar",
});
const form = ref(null)
const confirmacion = ref(false)
const operadores = ref([])
const operador = ref(undefined)
const numero = ref("")
const monto = ref('');
const nombre = ref();
const nombres = ref([]);
const loading = ref(false);
const paquetes = ref(new Map());
watch(nombre, (nombre, prevNombre) => {


  monto.value = paquetes.value.get(nombre)
})
const numRules = ref([
  v => !!v || 'El numero es requerido',
  v => (v && v.length == 10) || 'Los numeros de celular son de 10 digitos',
  v => (RegExp("^[0-9]").test(v)) || 'Solo se admiten numeros'
])
const amountRules = ref([
  v => !!v || 'El monto es requerido',
  v => (RegExp("^[0-9,$]*$").test(v)) || 'Solo se admiten numeros',
  v => (Number(v) != 0) || "Ingrese un valor"
])
onBeforeMount(() => {
  operadores.value = UtilsService.getOperadores().map(o => o.value);
  let pq = UtilsService.getPaquetes();
  nombres.value = pq.map(o => o.name);
  paquetes.value = new Map();
  pq.forEach(elm => paquetes.value.set(elm.name, elm.price));
})

useHead({
  title: "QuyneApp ~ Paquetes moviles"
})
function setLoading(value) {
  loading.value = value;
}
function cerrar(val) {
  confirmacion.value = false;
}
async function validate(operador, nombre, numero, monto) {
  const { valid } = await form.value.validate()
  if (!valid) {
    AlertService.warning("Atención", "No se han cumplido las validaciones para realizar el proceso");
    return;
  }
  confirmacion.value = true;
  await setTimeout(() => { console.log('Implementar logica aca') }, 1000)
}
</script>


<style scoped></style>
