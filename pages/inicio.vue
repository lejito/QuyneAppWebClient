<template>
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
                    <v-icon icon="mdi-eye-off" class="icono-ojo" v-if="cuenta.saldo_oculto"
                      @click="changeVisibility"></v-icon>
                    <v-icon icon="mdi-eye" class="icono-ojo" v-else @click="changeVisibility"></v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="textoBold1" v-if="cuenta.saldo_oculto">
                      $ ***
                    </p>
                    <p class="textoBold1" v-else>
                      $ {{ cuenta.saldo_disponible }}
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="textoBold3" v-if="cuenta.saldo_oculto">
                      Total: $ ***
                    </h4>
                    <h4 class="textoBold3" v-else>
                      Total: $ {{ saldoTotal }}
                    </h4>
                  </v-col>
                </v-row>
                <div class="linea"></div>
                <v-row>

                  <button class="botonI">
                    <NuxtLink to="/bolsillo">
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
        <v-btn block class="boton- boton-con-rectangulo"><v-icon icon="mdi-cash-multiple" class="icono-izquierda"
            size="35"></v-icon>Sacar</v-btn>
        <v-btn block class="boton- boton-con-rectangulo2">Enviar<v-icon icon="mdi-account-cash-outline"
            class="icono-dercha" size="35"></v-icon></v-btn>
        <v-btn block class="boton- boton-con-rectangulo"><v-icon icon="mdi-cash-refund" class="icono-izquierda2"
            size="35"></v-icon>Recargar</v-btn>
      </v-col>
    </div>
  </div>
</template>
  

<script setup>
import { AlertService } from '~/services/AlertService';
import { BolsilloService } from '~/services/BolsilloService';
import { CuentaService } from '~/services/CuentaService';
import { CuentaLocal } from '~/models/CuentaLocal';

const bolsillos = ref([]);
const saldoTotal = ref(0);

const cuenta = ref(new CuentaLocal(0, 0, '', 0, true, true, '', 'Nombre'));

const observer = ref(null);

const getBollsillos = async () => { bolsillos.value = await BolsilloService.getBolsillos(cuenta.value.id); saldoTotal.value = calcularTotal() }
getBollsillos()
useHead({
  title: "QuyneApp ~ Inicio"
});

definePageMeta({
  layout: "navbar"
});
const changeVisibility = () => {
  cuenta.value.saldo_oculto = !cuenta.value.saldo_oculto;
  CuentaService.updateCuenta(cuenta.value, { saldo_oculto: cuenta.value.saldo_oculto });
  CuentaService.SaveCuentaStorage(cuenta.value);
}
onBeforeMount(() => {
  observer.value = CuentaService.getCuentaActual(cuenta);
})
onUnmounted(() => {
  CuentaService.unsuscribe(observer.value);
})
const calcularTotal = () => {

  const total = cuenta.value.saldo_disponible + (bolsillos.value.lenght > 0 ? bolsillos.value.map(value => { return value.saldo_disponible }).reduce((prev, crr) => { return prev + crr }) : 0);
  return total
}
</script>


<style scoped>
.icono-izquierda {
  transform: translateX(-92px);
  position: relative;
}

.icono-izquierda2 {
  transform: translateX(-77px);
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
  margin-left: 40%;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 4px 4px 5px var(--color-shadow);
}

.textoBold3 {
  color: white;
  margin-left: 30%;
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
