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
					<h6>{{ usuario.primerNombre }} <v-icon>mdi-account</v-icon></h6>
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
import { UtilsService } from '~/services/UtilsService';
import { UsuariosService } from '~/services/UsuariosService';

onBeforeMount(async () => {
	const sessionToken = UtilsService.getSessionToken();
	if (!sessionToken) {
		navigateTo("/");
	}

	const { tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correoElectronico } = await UsuariosService.consultarDatos();
	usuario.value.tipoDocumento = tipoDocumento;
	usuario.value.numeroDocumento = numeroDocumento;
	usuario.value.primerNombre = primerNombre;
	usuario.value.segundoNombre = segundoNombre;
	usuario.value.primerApellido = primerApellido;
	usuario.value.segundoApellido = segundoApellido;
	usuario.value.fechaNacimiento = fechaNacimiento;
	usuario.value.correoElectronico = correoElectronico;
})

const activeTab = ref("inicio");
const usuario = ref({ tipoDocumento: "", numeroDocumento: "", primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "", fechaNacimiento: "", correoElectronico: "" });

function handleClick(tab) {
	activeTab.value = tab;
};

const logOut = async () => {
	await UsuariosService.cerrarSesion();
}
</script>
