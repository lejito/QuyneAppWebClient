<template>
    <div class="container">
        <div class="contenedor">
            <v-container class="card">
                <NuxtLink to="/inicio">
                    <v-icon class="lr-card__back" icon="mdi-arrow-left" size="large"></v-icon>
                </NuxtLink>
                <v-row justify="center">
                    <v-col cols="1" style="margin-right: 10px;">
                        Bolsillo
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="9">
                        Cuenta {{ Bolsillo.id_cuenta }}
                        <p v-if="BolsilloService.getBolsillos(Bolsillo.id_cuenta)">
                            <v-banner
                                lines="one"
                            >
                                <template v-slot:text>
                                    {{ Bolsillo.nombre }}
                                </template>

                                <template v-slot:actions>
                                    <v-btn
                                    @click="BolsilloService.updateBolsillo(bolsillos)">
                                        Editar
                                    </v-btn>
                                    <v-btn
                                    @click="BolsilloService.updateBolsilloSaldo(bolsillos.saldo_disponible)">
                                        Transferir
                                    </v-btn>
                                    <v-btn
                                    @click="BolsilloService.deleteBolsillo(bolsillos)">
                                        Eliminar
                                    </v-btn>
                                </template>
                            </v-banner>
                        </p>
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
                                        <input type="text" name="nombreBolsillo" id="nombreBolsillo" v-model="document"
                                        placeholder="Nombre del bolsillo (Obligatorio)" class="lr-form__input">
                                    </div>
                                    <br>
                                    <div class="lr-form__group">
                                        <input type="text" name="meta" id="meta" v-model="document"
                                        placeholder="¿Cuánto necesitas para alcanzar tu meta?" class="lr-form__input">
                                    </div>
                                </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="saveBolsillo">Crear Bolsillo</v-btn>
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

let showModal = false;
const cuenta = ref({ 'saldo_disponible': 0, 'saldo_oculto': true });
const bolsillos = ref({ 'nombre': "", 'saldo_disponible': 0, 'saldo_objetivo?': 0 });
import { AlertService } from '~/services/AlertService';
import { Bolsillo } from '~/models/Bolsillo';
import { BolsilloService } from '~/services/BolsilloService';
import { CuentaService } from '~/services/CuentaService';

useHead({
    title: "QuyneApp ~ Bolsillo"
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