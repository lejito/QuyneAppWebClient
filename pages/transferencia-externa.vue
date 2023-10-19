<template>
  <Detalles v-if="confirmacion" @cerrar="cerrar"
    :movimiento="{ 'destino': 'Julian', 'descripcion': 'Pago factura', 'fecha': '2023-10-19T18:33:40.658Z', 'monto': 5000 }">
  </Detalles>
  <v-row>
    <v-col cols="1" class="center">
      <NuxtLink to="/inicio" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px ;">
      <TitleLeft name="TRASFERENCIA EXTERNA"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">

      <v-text-field v-model="monto" :rules="amountRules" label="Monto a enviar" required></v-text-field>
      <v-text-field v-model="numero" :rules="numRules" label="Numero de cuenta" required></v-text-field>
      <v-select v-model="banco" :items="bancos" :rules="[v => !!v || 'La entidad Bancaria es requerida']"
        label="Entidad bancaria" required></v-select>

      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate(banco, numero, monto)" id="btn">
          <p style="color: white;">Enviar</p>
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
const bancos = ref([])
const banco = ref(undefined)
const numero = ref("")
const monto = ref();
const loading = ref(false)
const numRules = ref([
  v => !!v || 'El numero es requerido',
  v => (v && v.length <= 15) || 'Los numeros de cuenta no son de mas de 15 digitos',
  v => (RegExp("^[0-9]").test(v)) || 'Solo se admiten numeros'
])
const amountRules = ref([
  v => !!v || 'El monto es requerido',
  v => (RegExp("^[0-9,$]*$").test(v)) || 'Solo se admiten numeros',
  v => (Number(v) != 0) || "Ingrese un valor"
])
onBeforeMount(() => {
  bancos.value = UtilsService.getEntidades().map(o => o.value);
})

useHead({
  title: "QuyneApp ~ Transferencias externas"
})
function setLoading(value) {
  loading.value = value;
}
function cerrar(val) {
  confirmacion.value = false;
}
async function validate(banco, numero, monto) {
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
