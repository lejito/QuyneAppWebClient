<template>
    <div class="container">
        <div class="contenedor">
            <div class="left-rectangle2">
                <div class="left-rectangle">
            <v-container class="card">
                <v-row >
                    <v-col cols="1" style="margin-right: 10px;" class="textoBold">
                        Disponible
                    </v-col>
                    <v-col cols="1">
                        <v-icon icon="mdi-eye-off" class="clikeable-eye" v-if="cuenta.saldo_oculto"
                            @click="changeVisibility"></v-icon>
                        <v-icon icon="mdi-eye" class="clikeable-eye" v-else @click="changeVisibility"></v-icon>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" class="textoDinero">
                        <p class="textoDinero" v-if="cuenta.saldo_oculto">
                            $ ***
                        </p>
                        <p class="textoDinero" v-else>
                            $ {{ cuenta.saldo_disponible }}
                        </p>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="2" class="textoBold2">
                        Total:
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" class="textoDinero">
                        <p class="textoDinero" v-if="cuenta.saldo_oculto">
                            $ ***
                        </p>
                        <p class="textoDinero" v-else>
                            $ {{ saldoTotal() }}
                        </p>
                    </v-col>
                </v-row>
                <v-row >
                    <button class="botonI">
                        TU PLATA
                    </button>
                </v-row>
                <div class="cuadrado">
                    <div class="circulo"></div>
                </div>
            </v-container>
            <v-container class="card-2"></v-container>
        </div>
        </div>
        </div>
    </div>
</template>

<script setup>

const cuenta = ref({ 'saldo_disponible': 0, 'saldo_oculto': true });
const bolsillos = ref(undefined);
import { AlertService } from '~/services/AlertService';
import { BolsilloService } from '~/services/BolsilloService';
import { CuentaService } from '~/services/CuentaService';
useHead({
    title: "QuyneApp ~ Inicio"
});
onBeforeMount(() => {
    cuenta.value = CuentaService.getCuentaActual();
    if (typeof cuenta.value == typeof undefined) {
        cuenta.value = { 'saldo_disponible': 0, 'saldo_oculto': true }
        AlertService.message("El tiempo de la session ha expirado, ingrese nuevamente sus credenciales");
        navigateTo('/');
    }
    bolsillos.value = BolsilloService.getBolsillos(cuenta.value.id);
})
definePageMeta({
    layout: "navbar"
});
const changeVisibility = () => {
    cuenta.value.saldo_oculto = !cuenta.value.saldo_oculto;
    CuentaService.updateCuenta(cuenta.value);
    CuentaService.SaveCuentaStorage(cuenta.value);
}

function saldoTotal() {
    const total = cuenta.value.saldo_disponible + bolsillos.value.lenght > 0 ? bolsillos.value.map(value => { return value.saldo_disponible }).reduce((prev, crr) => { return prev + crr }) : 0;
    return total
}

</script>


<style scoped>

.left-rectangle2 {
  background-color: red ;
  width: 700px ; 
  height: 500px ;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
  z-index: 2;
}
.left-rectangle {
  background-color: var(--color-secundario) !important;
  width: 800px ; 
  height: 600px ; /* Cambia la altura según tus necesidades */
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.9) !important;
}
.card{
    position: absolute;
    top: 130px;
    left: 140px;
    background: rgba(255, 255, 255, 0.45);;
    border-radius: 35px;
    width: 500px; 
    height: 450px;
    border: 2px solid white;
}
.textoBold2{
    color: white;
}
</style>
