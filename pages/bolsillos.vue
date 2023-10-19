<template>
    <header style="display: flex;
    flex-direction: row;    ">
        <div class="shadow2" style="
        flex:1;
        width: 300px;">
            <div class="rectangle-b">
                <div class="rectangle-b2">
                    <h4 class="text-b">BOLSILLOS</h4>
                    <div class="line-b"></div>
                </div>
            </div>
        </div>
    </header>
    <div class="container">
        <div class="contenedor">
            <v-container class="card" v-if="!loading">
                <v-card class="centered-content">
                    <NuxtLink to="/inicio">
                        <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
                    </NuxtLink>

                    <v-row justify="center">
                        <v-col cols="9">
                            <div v-if="bolsillos.length > 0" v-for="bolsillo in bolsillos" :key="bolsillo.idBolsillo">
                                <v-banner lines="one">
                                    <template v-slot:text>
                                        <i style="margin-right: 20px;">{{ bolsillo.nombre }}</i>
                                        <span>
                                            <b>{{ UtilsService.formatToCOP(parseFloat(bolsillo.saldoDisponible)) }}</b>

                                            {{ bolsillo.saldoObjetivo !== null ? `/
                                            ${UtilsService.formatToCOP(parseFloat(bolsillo.saldoObjetivo))}` : null }}
                                        </span>
                                    </template>
                                    <template v-slot:actions>
                                        <v-btn color="var(--color-secondary)" @click="openModal(bolsillo)">
                                            Editar
                                        </v-btn>
                                        <v-btn color="var(--color-primary)" @click="cargarBolsillo()">
                                            Cargar
                                        </v-btn>
                                        <v-btn color="var(--color-primary)" @click="descargarBolsillo()">
                                            Descargar
                                        </v-btn>
                                        <v-btn color="var(--color-danger)" @click="eliminarBolsillo(bolsillo.idBolsillo)">
                                            Eliminar
                                        </v-btn>
                                        <v-btn @click="movimientosBolsillo(bolsillo.idBolsillo)">
                                            <v-icon color="var(--color-accent)">mdi-history</v-icon>
                                            Movimientos
                                        </v-btn>
                                    </template>
                                </v-banner>
                            </div>
                            <p v-else>
                                Actualmente no tienes ningún bolsillo activo
                            </p>
                        </v-col>
                    </v-row>
                    <v-lazy v-if="showList"
                        :min-height="200"
                        :options="{'threshold':0.5}"
                        transition="fade-transition"
                    >
                        <v-container fluid>
                            <v-row justify="center">
                                <v-table fixed-header height="400px">
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
                                            <td>{{ UtilsService.formatToCOP(parseFloat(item.monto)) }}</td>
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
                            </v-row>
                        </v-container>
                    </v-lazy>
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="showModal"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="showModal">
                            <v-card>
                                <v-card-title v-if="bolsilloEdit === null">Crea un bolsillo</v-card-title>
                                <v-card-title v-else>Edita tu bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="text" name="nombreBolsillo" id="nombreBolsillo"
                                            v-model="nombreBolsillo" placeholder="Nombre del bolsillo (Obligatorio)"
                                            class="lr-form__input">
                                    </div>
                                    <br>
                                    <div class="lr-form__group">
                                        <input type="number" name="meta" id="meta" v-model="saldoObjetivo"
                                            placeholder="¿Cuánto necesitas para alcanzar tu meta? (Opcional)"
                                            class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="crearBolsillo()"
                                        :disabled="!camposCompletos || disabledButton" v-if="bolsilloEdit === null">
                                        Crear bolsillo
                                    </v-btn>
                                    <v-btn class="botonG" @click="editarBolsillo()"
                                        :disabled="!camposCompletos || disabledButton" v-else>
                                        Editar bolsillo
                                    </v-btn>
                                    <v-btn class="botonC" @click="resetModal">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>
                    <v-row justify="end" class="mb-3">
                        <v-col cols="3">
                            <v-btn class="boton1" @click="openModal(null)">
                                Crear bolsillo
                            </v-btn>
                        </v-col>
                    </v-row>
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="showCargar"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="showCargar">
                            <v-card>
                                <v-card-title>Cargar bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="number" min="0" name="cargarSaldo" id="cargarSaldo" v-model="saldoCargar"
                                            placeholder="Monto a cargar" class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="cargarBolsillo()">
                                        Cargar bolsillo
                                    </v-btn>
                                    <v-btn class="botonC" @click="resetCargarModal">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="showDescargar"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="showDescargar">
                            <v-card>
                                <v-card-title>Descargar bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="number" name="descargarSaldo" id="descargarSaldo" v-model="saldoCargar"
                                            placeholder="Monto a descargar" class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="descargarBolsillo()">
                                        Descargar bolsillo
                                    </v-btn>
                                    <v-btn class="botonC" @click="resetCargarModal">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>  
                </v-card>
            </v-container>
            <v-container class="card" v-else>

                <v-card class="centered-content">
                    <NuxtLink to="/inicio" style="position: relative; top: 0; right: 0; float: left;">
                        <v-icon icon="mdi-arrow-left" size="large"></v-icon>
                    </NuxtLink>
                    <v-responsive style="display: flex; flex-direction: row;  padding-left: 40px; padding-right: 40px;">

                        <section v-for="i in 3">
                            <v-row justify="space-around" style="margin-top: 20px;">
                                <v-col cols="7">
                                    <span style="width: 50%;" class="skeleton-loader-white"></span>
                                </v-col>
                                <v-col cols="1">
                                    <span class="skeleton-loader-white" style="width: 100%;"></span>
                                </v-col>
                                <v-col cols="1">
                                    <span class="skeleton-loader-white" style="width: 100%;"></span>
                                </v-col>
                                <v-col cols="1">
                                    <span style="width: 100%;" class="skeleton-loader-white"></span>
                                </v-col>
                                <v-col cols="1">
                                    <span style="width: 100%;" class="skeleton-loader-white"></span>
                                </v-col>

                            </v-row>
                            <hr style=" margin-top: 20px;">
                        </section>
                        <section>
                            <v-row justify="end" style="margin-top: 20px; margin-bottom: 10px;">
                                <v-col cols="2">
                                    <span style="width: 80%;" class="skeleton-loader-white"></span>
                                </v-col>
                            </v-row>
                        </section>
                    </v-responsive>



                </v-card>

            </v-container>
        </div>
    </div>
</template>

<script setup>
import { AlertService } from '~/services/AlertService';
import { BolsillosService } from '~/services/BolsillosService';
import { UtilsService } from '~/services/UtilsService';
import moment from 'moment';
const loading = ref(true);

definePageMeta({
    layout: "navbar"
});

useHead({
    title: "QuyneApp ~ Bolsillos"
});

onBeforeMount(async () => {
    await getBolsillos();
    let mov =[ { 'tipoMovimiento': 'Retiro', "monto": -5000, fecha: moment.now().toString() }, { 'tipoMovimiento': 'Ingreso', "monto": 500000, fecha: moment.now().toString() }, { 'tipoMovimiento': 'Retiro', "monto": -5000, fecha: moment.now().toString() }, { 'tipoMovimiento': 'Retiro', "monto": -5000, fecha: moment.now().toString() }, { 'tipoMovimiento': 'Retiro', "monto": -5000, fecha: moment.now().toString() }, { 'tipoMovimiento': 'Retiro', "monto": -5000, fecha: moment.now().toString() }]
    movimientos.value = mov;
});

const bolsillos = ref([]);
const nombreBolsillo = ref('');
const saldoObjetivo = ref(null);
const showModal = ref(false);
const showList = ref(false);
const showCargar = ref(false);
const showDescargar = ref(false);
const bolsilloEdit = ref(null);
const disabledButton = ref(false);
const movimientos = ref([]);

const camposCompletos = computed(() => {
    return nombreBolsillo.value;
});

const getBolsillos = async () => {
    bolsillos.value = await BolsillosService.consultar();
    loading.value = false;
}

const openModal = async (bolsillo) => {
    bolsilloEdit.value = bolsillo;

    if (bolsillo !== null) {
        nombreBolsillo.value = bolsilloEdit.value.nombre;
        saldoObjetivo.value = bolsilloEdit.value.saldoObjetivo;
    }

    showModal.value = true;
}

const resetModal = () => {
    showModal.value = false;
    disabledButton.value = false;
    nombreBolsillo.value = "";
    saldoObjetivo.value = null;
}

const resetCargarModal = () => {
    showCargar.value = false;
    showDescargar.value = false;
}

const crearBolsillo = async () => {
    disabledButton.value = true;
    const bolsilloCreado = await BolsillosService.crear(nombreBolsillo.value, saldoObjetivo.value);

    if (bolsilloCreado) {
        resetModal();
        await getBolsillos();
    } else {
        disabledButton.value = false;
    }
}

const editarBolsillo = async () => {
    disabledButton.value = true;
    const bolsilloEditado = await BolsillosService.editar(bolsilloEdit.value.idBolsillo, nombreBolsillo.value, saldoObjetivo.value);

    if (bolsilloEditado) {
        resetModal();
        await getBolsillos();
    } else {
        disabledButton.value = false;
    }
}

const eliminarBolsillo = async (idBolsillo) => {
    const confirmar = await AlertService.withConfirmation("Confirmación", "¿Realmente deseas eliminar este bolsillo?");

    if (confirmar) {
        loading.value = true;
        const bolsilloEliminado = await BolsillosService.eliminar(idBolsillo);

        if (bolsilloEliminado) {
            await getBolsillos();
            loading.value = false;
        }
    }
}

const cargarBolsillo = async () => {
    showCargar.value = true;
}

const descargarBolsillo = async() => {
    showDescargar.value = true;
}

const movimientosBolsillo = async (idBolsillo) => {
    
    showList.value = !showList.value;
}

</script>

<style>
.clikeable {
    cursor: pointer;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
}

.modal {
    position: fixed;
    width: 900px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    z-index: 101;
}

.centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 70px;
}

.boton1 {
    background-color: transparent;
    border: 4px solid var(--color-terciario);
    color: var(--color-terciario);
    padding: 10px 20px;
    border-radius: 30px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: bold;

}

.botonC {
    background-color: transparent;
    border: 4px solid var(--color-danger);
    color: var(--color-danger);
    padding: 10px 20px;
    border-radius: 30px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: bold;

}

.botonG {
    background-color: transparent;
    border: 4px solid var(--color-success);
    color: var(--color-success);
    padding: 10px 20px;
    border-radius: 30px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: bold;

}

.rectangle-b {
    clip-path: polygon(0 0, 5% 100%, 95% 100%, 100% 0);
    background-color: var(--color-secundario);
    width: 50% !important;
    height: 140px !important;
    margin: 0 auto;
}

.rectangle-b2 {
    clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
    background: linear-gradient(10deg, var(--color-primario) 25%, transparent);
    width: 92%;
    height: 110px;
    margin: 0 auto;
}

.text-b {
    color: white;
    padding-top: 20px;
    margin-top: 25px;
    margin-left: 40%;
}

.line-b {
    width: 450px;
    border-bottom: 1px solid white;
    margin-left: 18%;
    margin-top: 8px;
}
</style>