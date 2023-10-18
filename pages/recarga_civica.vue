<template>
  <v-row>
    <v-col cols="1" class="center">
      <NuxtLink to="/servicios" style="position: relative; top: 0; right: 0; float: left;">
        <v-icon icon="mdi-arrow-left" style=" font-size: 90px;"></v-icon>
      </NuxtLink>
    </v-col>
    <v-col cols=" 11" style="margin-right: 5px ;">
      <TitleLeft name="RECARGAS CIVICA"></TitleLeft>
    </v-col>
  </v-row>
  <v-responsive style="margin-top: 50px;" width="50%" class="mx-auto">
    <v-form id="form" ref="form">
      <v-select v-model="tipoDocumento" :items="tipoDocumentos" :rules="[v => !!v || 'El tipo de documento es requerido']"
        label="tipo de documento" required></v-select>
      <v-text-field v-model="documento" :rules="docRules" label=" numero de documento" required></v-text-field>
      <v-text-field v-model="monto" :rules="amountRules" label="Monto a recargar" required></v-text-field>


      <div class="d-flex flex-column">
        <v-btn color="var(--color-primario)" block @click="validate" id="btn">
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

const tipoDocumentos = ref([])
const tipoDocumento = ref(undefined)
const documento = ref("")
const monto = ref();
const loading = ref(false)
const docRules = ref([
  v => !!v || 'El documento es requerido',
  v => (v && v.length > 4) || 'Los documentos de documento son de más de 4 digitos',

])
const amountRules = ref([
  v => !!v || 'El monto es requerido',
  v => (RegExp("^[0-9,$]*$").test(v)) || 'Solo se admiten documentos',
  v => (Number(v) != 0) || "Ingrese un valor"
])
onBeforeMount(() => {
  tipoDocumentos.value = UtilsService.getTiposDocumentos().map(o => o.value);
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
    async validate(tipoDocumento, documento, monto) {
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
