<template>
  <div class="modal">
    <v-card>
      <v-card-title>Descargar bolsillo</v-card-title>
      <v-card-text>
        <div class="lr-form__group">
          <input type="number" min="0" name="descargarSaldo" id="descargarSaldo" v-model="monto"
            placeholder="Monto a cargar" class="lr-form__input">
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="botonG" @click="props.descargarBolsillo(props.idBolsillo, monto)">
          Descargar bolsillo
        </v-btn>
        <v-btn class="botonC" @click="props.resetCargarModal(props.idBolsillo)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup>
const monto = ref(0);
const props = defineProps(
  {
    idBolsillo: {
      type: Number,
      required: true
    },
    resetCargarModal: {
      type: Function,
      required: true
    },
    descargarBolsillo: {
      type: Function,
      required: true
    }
  }
)

</script>