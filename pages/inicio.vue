<template>
    <v-container class="contenedor">
        <v-row justify="center">
            <v-col cols="1">
                Disponible
            </v-col>
            <v-col cols="1">
                <v-icon icon="mdi-eye" class="clikeable" v-if="cuenta.saldo_oculto" @click="changeVisibility"></v-icon>
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
                <v-icon icon="mdi-format-list-bulleted" size="x-large" class="clikeable" color="var(--color-primary-hover)">
                </v-icon>
            </v-col>
            <v-col cols="2">
                <v-icon icon="mdi-bank-transfer-out" size="x-large" class="clikeable" color="var(--color-primary-hover)">
                </v-icon>
            </v-col>
        </v-row>
    </v-container>
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
    background-color: var(--color-secondary);
    height: 100dvh;
    padding: 10% !important;
}
</style>