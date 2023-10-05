<template>
    <div class="container">
        <div class="contenedor">
            <v-container class="card">
                <v-row justify="center">
                    <v-col cols="1" style="margin-right: 10px;">
                        Disponible
                    </v-col>
                    <v-col cols="1">
                        <v-icon icon="mdi-eye" class="clikeable" v-if="cuenta.saldo_oculto"
                            @click="changeVisibility"></v-icon>
                        <v-icon icon="mdi-eye-off" class="clikeable" v-else @click="changeVisibility"></v-icon>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="2">
                        <p v-if="cuenta.saldo_oculto">
                            $ *****
                        </p>
                        <p v-else>
                            $ {{ cuenta.saldo_disponible }}
                        </p>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="2">
                        Total
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="2">
                        <p v-if="cuenta.saldo_oculto">
                            $ *****
                        </p>
                        <p v-else>
                            $ {{ saldoTotal() }}
                        </p>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="2">
                        Bolsillos
                    </v-col>
                    <v-col cols="2">
                        Movimientos
                    </v-col>
                    <v-col cols="2">
                        Enviar
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="2">
                        <v-icon icon="mdi-safe" size="x-large" class="clikeable" color="var(--color-primary-hover)">
                        </v-icon>
                    </v-col>
                    <v-col cols="2">
                        <v-icon icon="mdi-format-list-bulleted" size="x-large" class="clikeable"
                            color="var(--color-primary-hover)">
                        </v-icon>
                    </v-col>
                    <v-col cols="2">
                        <v-icon icon="mdi-bank-transfer-out" size="x-large" class="clikeable"
                            color="var(--color-primary-hover)">
                        </v-icon>
                    </v-col>
                </v-row>
            </v-container>
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
    layout: "blank"
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

.contenedor {
    padding: 10% !important;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}

.card {
    background-color: rgba(250, 250, 250, 0.97);
    border-radius: 30px;
    width: 70% !important;
    box-shadow: 5px 5px 10px var(--color-shadow);
}

.container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;

}

.container:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 1000px;
    right: 50%;
    transform: translateY(-48%);


    background-image: linear-gradient(-45deg, var(--color-primary) 20%, var(--color-secondary) 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 0;
}
</style>