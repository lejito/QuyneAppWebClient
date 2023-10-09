<template>
    <div class="container">
        <div class="contenedor">
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
                        Total
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

<style>
.clikeable {
    cursor: pointer;
}
.clikeable-eye {
    cursor: pointer;
    padding-left: 80px;
}

.contenedor {
    display: flex;
    padding-top: 3%;
    padding-bottom: 10%;
    padding-left: 5%;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.textoBold{
    font-size: 150%;
    font-style: Bold;
    margin-left: 30%;
}
.textoBold2{
    font-size: 150%;
    font-style: Bold;
    margin-left: 35%;
}
.textoDinero{
    font-size: 120%;
    margin-left: 33%;
}
.botonI{
    width: 100px;
    height: 100px;
    margin-left: 33%;
    border-color: var(--color-secondary);
    border-radius: 20px;
    color: var(--color-secondary);
}

.card {
    background-color: rgba(250, 250, 250, 0.97);
    border-radius: 30px;
    width: 40% !important;
    box-shadow: 5px 5px 10px var(--color-shadow);
}
.card-2 {
    background-color: rgba(250, 250, 250, 0.97);
    border-radius: 30px;
    width: 50% !important;
    box-shadow: 5px 5px 10px var(--color-shadow);
}
.cuadrado{
    background-color: var(--color-primary);
    margin-top: 6%;
    width: 210px;
    height: 80px;
    z-index: 1;
    overflow: visible;
    position: absolute;
    left: 0%;
    top: 3%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 5px 5px 10px var(--color-shadow);
}
.circulo{
    background-color: var(--color-white);
    width: 30px;
    height: 30px;
    z-index: 0;
    position: absolute;
    left: 75%;
    top: 30%;
    border-radius: 50%;
}


.container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
}

.container:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 1000px;
    right: 0%;
    transform: translateY(-48%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 0;
}
</style>