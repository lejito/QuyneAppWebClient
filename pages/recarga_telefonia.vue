<template>
  <v-row>
    <v-col cols="1" class="center">
      <NuxtLink to="/servicios" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px ;">
      <TitleLeft name="RECARGAS TELEFONIA"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">
      <v-text-field v-model="numero" :rules="numRules" label="Numero de telefono" required></v-text-field>
      <v-text-field v-model="monto" :rules="amountRules" label="Monto a recargar" required></v-text-field>

      <v-select v-model="operador" :items="operadores" :rules="[v => !!v || 'El operador es requerido']" label="Operador"
        required></v-select>

      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate(operador, numero, monto)" id="btn">
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

const operadores = ref([])
const operador = ref(undefined)
const numero = ref("")
const monto = ref();
const loading = ref(false)
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
})

useHead({
  title: "QuyneApp ~ Recargas de telefonia"
})
function setLoading(value) {
  loading.value = value;
}
</script>

<script>
export default {
  methods: {
    async validate(operador, numero, monto) {
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        AlertService.warning("Atención", "No se han cumplido las validaciones para realizar el proceso");
        return;
      }
      await setTimeout(() => { console.log('Implementar logica aca') }, 1000)
    }
  }
}
</script>
<style scoped></style>
