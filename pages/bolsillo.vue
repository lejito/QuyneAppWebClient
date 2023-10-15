<template>
    <div class="container">
        <div class="contenedor">
            <v-container class="card">
                <NuxtLink to="/inicio">
                    <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
                </NuxtLink>
                <v-row justify="center">
                    <v-col cols="1" style="margin-right: 10px;">
                        Bolsillos
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="9">
                        <div v-if="bolsillos.length > 0" v-for="item in bolsillos" :key="item.id">
                            <v-banner lines="one">


                                <template v-slot:text>{{ item.nombre }}
                                    $ {{ item.saldo_disponible }}
                                </template>
                                <template v-slot:actions>
                                    <v-btn>
                                        Editar
                                    </v-btn>
                                    <v-btn>
                                        Transferir
                                    </v-btn>
                                    <v-btn @click="deleteBolsillo(item)">
                                        Eliminar
                                    </v-btn>
                                </template>
                            </v-banner>
                        </div>
                        <p v-else>
                            Actualmente no tienes ningún bolsillo activo
                        </p>
                    </v-col>
                </v-row>
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
                                <v-btn color="primary" @click="CreatePocket">Crear Bolsillo</v-btn>
                                <v-btn color="error" @click="showModal = false">Cancelar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </Transition>
                <v-row justify="center">
                    <v-col cols="3">
                        <button @click="showModal = true" class="index-navbar__options__button">
                            Crear Bolsillo
                        </button>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup>
const newPocketName = ref('');
const newPocketObjetivo = ref(null);
const showModal = ref(false);
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

definePageMeta({
    layout: "navbar"
});
async function deleteBolsillo(item) {

    await BolsilloService.deleteBolsillo(item, bolsillos);
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
</style>