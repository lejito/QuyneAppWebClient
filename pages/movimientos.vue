<template>
    <Loader v-if="loadingPage"></Loader>

    <header style="display: flex;
    flex-direction: row;    ">
        <div class="shadow2" style="
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
            <v-btn color="var(--color-primario)" block @click="descargar"
                style="width: 15%; margin-bottom: 10px; margin-left: 5px; border-radius: 10px;">
                <p style="color: white;">Descargar extracto</p>
            </v-btn>
            <v-table fixed-header height="400px" id="table">
                <thead style="position: -webkit-sticky;">
                    <tr>
                        <th class="text-left">
                            Tipo de movimiento
                        </th>
                        <th class="text-left">
                            Monto
                        </th>
                        <th class="text-left">
                            Fecha/hora
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!loading">
                    <tr v-for="item in movimientos" :key="item.idMovimiento" v-if="movimientos.length > 0">
                        <td>{{ item.tipoMovimiento }}</td>
                        <td style="color: red;" v-if="item.monto < 0">
                            {{ UtilsService.formatToCOP(parseFloat(item.monto)) }}
                        </td>
                        <td style="color:green;" v-else>
                            {{ UtilsService.formatToCOP(parseFloat(item.monto)) }}
                        </td>
                        <td>{{ moment(item.fechaHora).format('yyyy-MM-DD hh:mm:ss A') }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="3" class="text-center">No hay movimientos realizados hasta la fecha</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="i in 7">
                        <td> <span class="skeleton-loader-white"></span></td>
                        <td> <span class="skeleton-loader-white"></span></td>
                        <td> <span class="skeleton-loader-white"></span></td>
                    </tr>
                </tbody>
            </v-table>
        </main>
    </section>
</template>

<script setup>
import moment from 'moment';
import { MovimientosService } from '~/services/MovimientosService';
import { CuentasService } from '~/services/CuentasService';
import { UtilsService } from '~/services/UtilsService';
import { toPDF } from '~/services/PDFService';
const loading = ref(true);
const loadingPage = ref(false);
definePageMeta({
    layout: "navbar"
});


useHead({
    title: "QuyneApp ~ Movimientos"
});

onBeforeMount(() => {
    const getMovimientos = async () => {
        movimientos.value = await MovimientosService.consultarUltimos();
        all.value = movimientos.value;
        loading.value = false;
    }
    getMovimientos();
});

const movimientos = ref([]);
const all = ref([]);
const filter = ref('');

async function descargar() {
    loadingPage.value = true;
    const { numeroTelefono } = await CuentasService.consultarDatos();
    loadingPage.value = false;
    const tabla = document.getElementById('table');
    const fecha = moment().format('yyyyDDMMhhmmss');
    toPDF(tabla, `QuyneApp_Extracto_${numeroTelefono}_${fecha}`);
}

function lookUp() {

    if (filter.value == '') {
        movimientos.value = all.value;
        return;
    }

    let reg = RegExp(filter.value, 'i');
    movimientos.value = movimientos.value.filter(({ tipoMovimiento }) => {

        return reg.test(tipoMovimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    });
}
</script>

<style scoped>
.v-btn--block {
    min-width: 10% !important;
}

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
    padding-top: 20px;
    margin-top: 25px;
    margin-left: 25%;
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
    top: -28%;
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