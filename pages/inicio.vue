<template>
  <Loader v-if="loadingPage"></Loader>

  <div class="container">
    <div class="contenedor">
      <div class="shadow">
        <div class="left-rectangle2">
          <div class="left-rectangle">
            <v-col class="separacion">
              <v-container class="card">
                <v-row>
                  <v-col>
                    <h4 class="textoBold2">DISPONIBLE</h4>
                  </v-col>
                  <v-col>
                    <v-icon icon="mdi-eye-off" class="icono-ojo" v-if="cuenta.saldoOculto"
                      @click="changeVisibility"></v-icon>
                    <v-icon icon="mdi-eye" class="icono-ojo" v-else @click="changeVisibility"></v-icon>
                  </v-col>
                </v-row>
                <v-row>

                  <v-col v-if="!loading">
                    <p class="textoBold1" v-if="cuenta.saldoOculto">
                      $ *****
                    </p>
                    <p class="textoBold1" v-else>
                      {{ UtilsService.formatToCOP(cuenta.saldo) }}
                    </p>
                  </v-col>
                  <v-col v-else>
                    <div class="center">
                      <span class="skeleton-loader-light-blue"></span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="textoBold3">TOTAL</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-if="!loading">
                    <h4 class="textoBold3" v-if="cuenta.saldoOculto">
                      $ *****
                    </h4>
                    <h4 class="textoBold3" v-else>
                      {{ UtilsService.formatToCOP(cuenta.saldo + cuenta.saldoBolsillos) }}
                    </h4>
                  </v-col>
                  <v-col v-else>
                    <div class="center">
                      <span class="skeleton-loader-light-blue"></span>
                    </div>
                  </v-col>
                </v-row>
                <div class="linea"></div>
                <v-row>
                  <button class="botonI">
                    <NuxtLink to="/bolsillos">
                      Bolsillos
                    </NuxtLink>
                  </button>
                </v-row>
              </v-container>
            </v-col>
          </div>
        </div>
      </div>
    </div>
    <div class="contenido-derecha">
      <h4>BIENVENIDO DE NUEVO</h4>
      <p class="derecha">¿Qué deseas hacer hoy?</p>
      <v-col>

        <v-menu class="menu">
          <template v-slot:activator="{ props }">

          </template>


        </v-menu>
        <v-menu class="menu">
          <template v-slot:activator="{ props }">
            <v-btn block class="boton- boton-con-rectangulo2" v-bind="props">Enviar<v-icon icon="mdi-account-cash-outline"
                class="icono-dercha" size="35"></v-icon></v-btn>
          </template>
          <v-list class="menu" style="border-radius: 30px;">
            <v-list-item>
              <nuxt-link to="/transferencia-interna">
                <v-btn block class="boton- boton-con-rectangulo2" style="padding-right: 5px; margin: 10px 0;">Cuenta de
                  QuyneApp<v-icon icon="mdi-bank" size="30"></v-icon></v-btn>

              </nuxt-link>
            </v-list-item>
            <v-list-item>
              <nuxt-link to="/transferencia-externa">
                <v-btn block class="boton- boton-con-rectangulo2" style="margin: 10px 0;">Cuenta de otra entidad<v-icon
                    icon="mdi-bank" size="30"></v-icon></v-btn></nuxt-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <NuxtLink to="/pago-factura">
          <v-btn block class="boton- boton-con-rectangulo"><v-icon icon="mdi-cash-refund" class="icono-izquierda2"
              size="35"></v-icon>Pagar factura</v-btn>
        </NuxtLink>

      </v-col>

    </div>
  </div>
</template>
  

<script setup>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { CuentasService } from '~/services/CuentasService';
import { UtilsService } from '~/services/UtilsService';

definePageMeta({
  layout: "navbar"
});

useHead({
  title: "QuyneApp ~ Inicio"
});

onBeforeMount(async () => {
  const idCuenta = await CuentasService.consultarIdCuentaIdUsuario();
  const { id, numeroTelefono, idUsuario, habilitada, saldoOculto } = await CuentasService.consultarDatos();
  cuenta.value.id = id;
  cuenta.value.numeroTelefono = numeroTelefono;
  cuenta.value.idUsuario = idUsuario;
  cuenta.value.habilitada = habilitada;
  cuenta.value.saldoOculto = saldoOculto;
  const { saldo, saldoBolsillos } = await CuentasService.consultarSaldo();
  cuenta.value.saldo = saldo;
  cuenta.value.saldoBolsillos = saldoBolsillos;
  loading.value = false;
});

const loading = ref(true);
const loadingPage = ref(false);
const cuenta = ref({ id: -1, numeroTelefono: "", idUsuario: -1, habilitada: true, saldoOculto: false, saldo: 0, saldoBolsillos: 0 });

const changeVisibility = async () => {
  loadingPage.value = true;
  if (cuenta.value.saldoOculto) {
    await CuentasService.desactivarSaldoOculto();
    cuenta.value.saldoOculto = false;
  } else {
    await CuentasService.activarSaldoOculto();
    cuenta.value.saldoOculto = true;
  }
  loadingPage.value = false;
}
</script>


<style scoped>
.icono-izquierda {
  transform: translateX(-92px);
  position: relative;
}

.icono-izquierda2 {
  transform: translateX(-50px);
  position: relative;
}

.icono-dercha {
  position: relative;
  transform: translateX(88px);
}

.boton-con-rectangulo {
  position: relative;
}

.boton-con-rectangulo::before {
  content: "";
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  width: 35px;
  height: 30px;
  background-color: var(--color-terciario);
  border-radius: 8px;
}

.boton-con-rectangulo2 {
  position: relative;
}

.boton-con-rectangulo2::before {
  content: "";
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 35px;
  height: 30px;
  background-color: var(--color-cuarto);
  border-radius: 8px;
}

.boton- {
  font-size: 18px;
  padding: 30px 30px;
  font-weight: 700 !important;
  margin: 40px 0;
  border-radius: 40px;
  font-weight: bold;
}

.left-rectangle2 {
  background-color: var(--color-secundario);
  width: 830px;
  height: 630px;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
  z-index: 1;
}

.left-rectangle {
  background: linear-gradient(138deg, transparent, var(--color-primario) 75%);
  width: 800px !important;
  height: 600px !important;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
  z-index: 1 !important;
}

.card {
  position: absolute;
  top: 10%;
  left: 140px;
  background: rgba(255, 255, 255, 0.45);
  ;
  border-radius: 35px;
  width: 450px;
  height: 480px;
  border: 2px solid white;
}

.textoBold2 {
  color: white;
  margin-left: 50%;
  margin-top: 25% !important;
  text-shadow: 4px 4px 5px var(--color-shadow);
}

.textoBold1 {
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 4px 4px 5px var(--color-shadow);
}

.textoBold3 {
  color: white;
  text-align: center;
  top: 50% !important;
  text-shadow: 4px 4px 5px var(--color-shadow);
}

.contenido-derecha {
  text-align: right;
  margin-right: 10%;
  position: absolute;
  top: 180px;
  right: 20px;
}

.derecha {
  margin-right: 21%;
  font-size: 20px;
}

.icono-ojo {
  color: white;
  top: 58px;
  margin-left: 40%;
  text-shadow: 2px 2px 4px var(--color-shadow);
}

.contenido-derecha p.derecha {
  border-bottom: 1px solid #000;
  display: inline;
  padding-bottom: 20px;
  width: 0px;

}

.shadow {
  filter: drop-shadow(0 0 1rem #000);
}

.botonI {
  background-color: transparent;
  border: 4px solid var(--color-terciario);
  color: var(--color-terciario);
  padding: 10px 20px;
  border-radius: 30px;
  margin-left: 35%;
  margin-top: 10%;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-weight: bold;

}

.botonI:hover {
  background-color: var(--color-terciario);
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: bold;
}

.linea {
  width: 250px;
  height: 1px;
  background-color: white;
  margin: 20px auto 10px;

}
</style>
