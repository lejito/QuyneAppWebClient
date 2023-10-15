<template>
	<div class="index-layout">
		<nav class="index-navbar">
			<div class="navbar__link">
				<img src="~/public/QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
			</div>
			<nuxt-link @click="handleClick('inicio')" :class="{ active: activeTab === 'inicio' }" to="/inicio">
				INICIO
			</nuxt-link>

			<nuxt-link @click="handleClick('movimientos')" :class="{ active: activeTab === 'movimientos' }"
				to="/movimientos">MOVIMIENTOS</nuxt-link>
			<nuxt-link @click="handleClick('servicios')" :class="{ active: activeTab === 'servicios' }"
				to="/servicios">SERVICIOS</nuxt-link>
			<botton class="navbar-button">
				<nuxt-link class="user-icon" to="/perfil">
					<h6>{{ cuenta.nombre_completo }} <v-icon>mdi-account</v-icon></h6>
				</nuxt-link>
			</botton>

			<botton class="navbar-button" @click="logOut">

				<h6>Salir <v-icon>mdi-exit-to-app</v-icon></h6>

			</botton>
		</nav>
		<main class="content">
			<slot />
		</main>
	</div>
</template>

<script setup>

import { AlertService } from '~/services/AlertService';
import { CuentaLocal } from "~/models/CuentaLocal";
import { CuentaService } from "../services/CuentaService";
import { UserService } from '~/services/UserService';

onBeforeMount(() => {
	let state = CuentaService.getStateCuenta();
	if (typeof state == typeof undefined) {
		navigateTo('/');
		AlertService.message("El tiempo de la session ha expirado, ingrese nuevamente sus credenciales");
		return;
	}
	observer.value = CuentaService.getCuentaActual(cuenta);
})
const appTitle = 'QuyneApp';
const activeTab = ref("inicio");
const cuenta = ref(new CuentaLocal(0, 0, '', 0, true, true, '', 'Nombre'));
const observer = ref();

function logOut() {
	UserService.logout();
}

function handleClick(tab) {
	activeTab.value = tab;
};
onUnmounted(() => {
	CuentaService.unsuscribe(observer.value);
})
</script>
