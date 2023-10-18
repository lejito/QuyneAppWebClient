<template>
    <div class="container">
        <div class="contenedor">
            <v-container class="card" v-if="!loading">
                <v-card class="centered-content">
                    <NuxtLink to="/inicio">
                        <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
                    </NuxtLink>

                    <v-row justify="center">
                        <v-col cols="9">
                            <div v-if="bolsillos.length > 0" v-for="bolsillo in bolsillos" :key="bolsillo.id">
                                <v-banner lines="one">
                                    <template v-slot:text><b>{{ bolsillo.nombre }}</b>
                                        ${{ bolsillo.saldoDisponible }}
                                    </template>
                                    <template v-slot:actions>
                                        <v-btn color="var(--color-secondary)">
                                            Editar
                                        </v-btn>
                                        <v-btn color="var(--color-primary)">
                                            Cargar
                                        </v-btn>
                                        <v-btn color="var(--color-primary)">
                                            Descargar
                                        </v-btn>
                                        <v-btn color="var(--color-danger)">
                                            Eliminar
                                        </v-btn>
                                        <v-btn @click="toggleMovimientosDrawer(bolsillo)">
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
                    <!-- <v-navigation-drawer expand-on-hover v-model="movimientosDrawer" app right>
                        
                    </v-navigation-drawer> -->
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="showModal"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="showModal">
                            <v-card>
                                <v-card-title>Personaliza tu bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="text" name="nombreBolsillo" id="nombreBolsillo"
                                            v-model="nombreBolsilloNuevo" placeholder="Nombre del bolsillo (Obligatorio)"
                                            class="lr-form__input">
                                    </div>
                                    <br>
                                    <div class="lr-form__group">
                                        <input type="number" name="meta" id="meta" v-model="saldoObjetivoBolsilloNuevo"
                                            placeholder="¿Cuánto necesitas para alcanzar tu meta? (Opcional)"
                                            class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="crearBolsillo" :disabled="!camposCompletos">Crear
                                        Bolsillo</v-btn>
                                    <v-btn class="botonC" @click="showModal = false">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>
                    <v-row justify="end" class="mb-3">
                        <v-col cols="3">
                            <v-btn class="boton1" @click="showModal = true">
                                Crear Bolsillo
                            </v-btn>
                        </v-col>
                    </v-row>
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
import { BolsillosService } from '~/services/BolsillosService';
import { CuentasService } from '~/services/CuentasService';
const loading = ref(true);
definePageMeta({
    layout: "navbar"
});

useHead({
    title: "QuyneApp ~ Bolsillos"
});

onBeforeMount(async () => {
    await getBolsillos();
});

const bolsillos = ref([]);
const nombreBolsilloNuevo = ref('');
const saldoObjetivoBolsilloNuevo = ref(null);
const showModal = ref(false);
const camposCompletos = computed(() => {
    return nombreBolsilloNuevo.value;
});
// const movimientosDrawer = ref(false);

const getBolsillos = async () => {
    const idCuenta = await CuentasService.consultarIdCuentaIdUsuario();
    bolsillos.value = await BolsillosService.consultar(idCuenta);
    loading.value = false;
}

const crearBolsillo = async () => {
    const idCuenta = await CuentasService.consultarIdCuentaIdUsuario();
    await BolsillosService.crear(idCuenta, nombreBolsilloNuevo.value, saldoObjetivoBolsilloNuevo.value);
    await getBolsillos();
    showModal.value = false;
    nombreBolsilloNuevo.value = "";
    saldoObjetivoBolsilloNuevo.value = null;
}

// const toggleMovimientosDrawer = (bolsillo) => {
//     // Aquí puedes cargar los movimientos específicos del bolsillo antes de abrir el drawer si es necesario.
//     movimientosDrawer.value = !movimientosDrawer.value;
// }
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
</style>