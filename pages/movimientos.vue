<template>
    <header style="display: flex;
    flex-direction: row;    ">
        <div class="shadow" style="
        flex:1;
        width: 300px;">
            <div class="rectangle-m">
                <div class="rectangle-m2">
                    <h4 class="text-m">MOVIMIENTOS</h4>
                    <div class="line-m"></div>
                </div>
            </div>
        </div>
        <div class="search-bar-container">
            <input type="text" class="search-bar" placeholder="Buscar por tipo..." @keyup="lookUp" v-model="filter">
            <v-icon icon="mdi-magnify" class="icono-dentro"></v-icon>
        </div>
    </header>

    <section style="display:block; margin-top: 20px;">
        <main justify="center">
            <v-table fixed-header height="400px">
                <thead style="position: -webkit-sticky;">
                    <tr>
                        <th class="text-left">
                            Tipo de Movimiento
                        </th>
                        <th class="text-left">
                            Monto
                        </th>
                        <th class="text-left">
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in movimientos" :key="item.id_movimiento" v-if="movimientos.length > 0">
                        <td>{{ item.tipo_movimiento }}</td>
                        <td>{{ item.monto }} $</td>
                        <td>{{ moment(item.fecha_hora).format('yyyy-MM-DD hh:mm:ss A') }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="3" class="text-center">No hay movimientos realizados hasta la fecha</td>
                    </tr>
                </tbody>
            </v-table>
        </main>
    </section>
</template>

<script setup>
import { Movimiento } from '~/models/Movimiento';
import { CuentaService } from '~/services/CuentaService';
import { MovimientosService } from '~/services/MovimientosService';
import { CuentaLocal } from '~/models/CuentaLocal';
import moment from 'moment';
const cuenta = ref(new CuentaLocal(0, 0, '', 0, true, true, '', 'Nombre'));
const observer = ref(undefined);
const movimientos = ref([]);
const all = ref([])
const filter = ref('')

onBeforeMount(() => {
    observer.value = CuentaService.getCuentaActual(cuenta);
    const getMovimientos = async () => {
        movimientos.value = await MovimientosService.getMovimientosByAccount(cuenta.value.id);
        all.value = movimientos.value;
    }
    getMovimientos()
})
onUnmounted(() => {
    CuentaService.unsuscribe(observer.value);
})

function lookUp() {

    if (filter.value == '') {
        movimientos.value = all.value;
        return;
    }

    let reg = RegExp(filter.value, 'i');
    movimientos.value = movimientos.value.filter(({ tipo_movimiento }) => {

        return reg.test(tipo_movimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    });
}
definePageMeta({
    layout: "navbar"
});

</script>

<style scoped>
.rectangle-m {
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
    background-color: var(--color-secundario);
    width: 100% !important;
    height: 140px !important;

}

.rectangle-m2 {
    clip-path: polygon(0 0, 100% 0, 96% 100%, 0% 100%);
    background: linear-gradient(138deg, transparent, var(--color-primario) 75%);
    width: 96%;
    height: 110px;

}

.text-m {
    color: white;
    margin-top: 25px;
    margin-left: 20%;
}

.line-m {
    width: 450px;
    border-bottom: 1px solid white;
    margin-left: 15%;
    margin-top: 8px;
}

.search-bar-container {

    margin-top: 10px;
    position: relative;
}

.icono-dentro {
    position: relative;
    left: 1.5%;
    top: -23%;
    font-size: 20px;
    color: black;
    outline: none;
    cursor: pointer;
}

.search-bar {
    width: 650px;
    padding: 10px 10px 10px 40px;
    outline: none;
    margin-top: 30px;
    margin-right: 50px;
    background: #fafafa;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 40px;
}
</style>