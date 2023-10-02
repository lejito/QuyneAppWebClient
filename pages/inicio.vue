<template>
    <v-container>
        <v-row no-gutters>
            <v-col>
                Disponible
            </v-col>
            <v-col class="clikeable" @click="changeVisibility">
                <v-icon icon="mdi-eye" v-if="cuenta.saldo_oculto"></v-icon>
                <v-icon icon="mdi-eye-off" v-else></v-icon>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col>
                <p v-if="cuenta.saldo_oculto">
                    $ *****
                </p>
                <p v-else>
                    $ {{ cuenta.saldo_disponible }}
                </p>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                Total
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <p v-if="cuenta.saldo_oculto">
                    $ *****
                </p>
                <p v-else>
                    $ {{ saldoTotal() }}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

const cuenta = ref(undefined);
const bolsillos = ref(undefined);
console.log(cuenta);
import { CuentaService } from '~/services/CuentaService';
useHead({
    title: "QuyneApp ~ Inicio"
});
onBeforeMount(() => {
    cuenta.value = CuentaService.getCuentaActual();
    bolsillos.value = [];
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
    const total = cuenta.value.saldo_disponible + bolsillos.value.lenght > 0 ? bolsillos.value.reduce((prev, crr) => { return prev + crr }) : 0;
    return total
}

</script>

<style>
.clikeable {
    cursor: pointer;
}
</style>