<template>
    <div class="container">
        <div class="contenedor">
            <v-container class="card">
                <v-card class="centered-content">
                    <NuxtLink to="/inicio">
                        <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
                    </NuxtLink>

                    <v-row justify="center">
                        <v-col cols="9">
                            <div v-if="bolsillos.length > 0" v-for="item in bolsillos" :key="item.id">
                                <v-banner lines="one">


                                    <template v-slot:text>{{ item.nombre }}
                                        $ {{ item.saldo_disponible }}
                                    </template>
                                    <template v-slot:actions>
                                        <v-btn @click="editModal = true" color="var(--color-secondary)">
                                            Editar
                                        </v-btn>
                                        <v-btn color="var(--color-primary)">
                                            Transferir
                                        </v-btn>
                                        <v-btn color="var(--color-danger)" @click="DeleteP(item)">
                                            Eliminar
                                        </v-btn>
                                        <v-btn @click="toggleMovimientosDrawer(item)">
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
                    <v-navigation-drawer
                        expand-on-hover
                        v-model="movimientosDrawer"
                        app
                        right
                    >
                    <!-- Contenido del drawer para los movimientos -->
                    </v-navigation-drawer>
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="showModal"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="showModal">
                            <v-card>
                                <v-card-title>Personaliza tu bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="text" name="nombreBolsillo" id="nombreBolsillo" v-model="newPocketName"
                                            placeholder="Nombre del bolsillo (Obligatorio)" class="lr-form__input">
                                    </div>
                                    <br>
                                    <div class="lr-form__group">
                                        <input type="number" name="meta" id="meta" v-model="newPocketObjetivo"
                                            placeholder="¿Cuánto necesitas para alcanzar tu meta? (Opcional)"
                                            class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="CreatePocket">Crear Bolsillo</v-btn>
                                    <v-btn class="botonC" @click="showModal = false">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal-overlay" v-if="editModal"></div>
                    </Transition>
                    <Transition name="fade">
                        <div class="modal" v-if="editModal">
                            <v-card>
                                <v-card-title>Editar Bolsillo</v-card-title>
                                <v-card-text>
                                    <div class="lr-form__group">
                                        <input type="text" name="nombreBolsillo" id="nombreBolsillo" v-model="editedPocket.name"
                                            placeholder="Nuevo nombre del bolsillo (Obligatorio)" 
                                            class="lr-form__input">
                                    </div>
                                    <br>
                                    <div class="lr-form__group">
                                        <input type="number" name="saldoDisponible" v-model="editedPocket.saldo_disponible"
                                            placeholder="Saldo disponible"
                                            class="lr-form__input">
                                    </div>
                                    <div class="lr-form__group">
                                        <input type="number" name="saldoObjetivo" v-model="editedPocket.saldo_objetivo" 
                                        placeholder="Saldo objetivo" 
                                        class="lr-form__input">
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="botonG" @click="updatePocket">Guardar Bolsillo</v-btn>
                                    <v-btn class="botonC" @click="editModal = false">Cancelar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </Transition>
                    <v-row justify="end" class="mb-3">
                        <v-col cols="3">
                            <v-btn
                                class="boton1"
                                @click="showModal = true"
                            >
                            Crear Bolsillo
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </div>
    </div>
</template>

<script setup>
const newPocketName = ref('');
const newPocketObjetivo = ref(null);
const showModal = ref(false);
const editModal = ref(false);
const changes = ref({ amount: null, newName: null })
const bolsillos = ref([{ 'nombre': "", 'saldo_disponible': 0, 'saldo_objetivo?': 0 }]);
import { AlertService } from '~/services/AlertService';
import { Bolsillo } from '~/models/Bolsillo';
import { BolsilloService } from '~/services/BolsilloService';
import { CuentaService } from '~/services/CuentaService';
import { CuentaLocal } from '~/models/CuentaLocal';
const cuenta = ref(new CuentaLocal(0, 0, '', 0, true, true, '', 'Nombre'));
const observer = ref(CuentaService.getCuentaActual(cuenta));
const getBollsillos = async () => {
    bolsillos.value = await BolsilloService.getBolsillos(cuenta.value.id);

}
const editedPocket = ref({
    name: '',
    saldo_disponible: 0,
    saldo_objetivo: 0,
});
getBollsillos()
useHead({
    title: "QuyneApp ~ Bolsillo"
});
onUnmounted(() => {
    CuentaService.unsuscribe(observer.value);
})
async function CreatePocket() {
    let saldo_objetivo = newPocketObjetivo.value > 0 ? newPocketObjetivo.value : null;
    const newPocket = { 'id_usuario': cuenta.value.id_usuario, 'id_cuenta': cuenta.value.id, 'nombre': newPocketName.value, saldo_objetivo }
    await BolsilloService.addBolsillo(newPocket);
    bolsillos.value = await BolsilloService.getBolsillos(cuenta.value.id);
    showModal.value = false
}

async function DeleteP(bolsilloToDelete) {
    await BolsilloService.deleteBolsillo(bolsilloToDelete, bolsillos);
}

async function updatePocket() {
    await BolsilloService.updateBolsillo(bolsillo.id, editedPocket);
}

const movimientosDrawer = ref(false);

function toggleMovimientosDrawer(bolsillo) {
  // Aquí puedes cargar los movimientos específicos del bolsillo antes de abrir el drawer si es necesario.
  movimientosDrawer.value = !movimientosDrawer.value;
}

definePageMeta({
    layout: "navbar"
});
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