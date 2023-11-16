<template>
	<Loader v-if="loadingPage"></Loader>

	<div class="index-layout">
		<nav class="index-navbar">
			<div class="navbar__link">
				<img src="~/public/QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
			</div>
			<nuxt-link @click="handleClick('inicio')" :class="{ active: ['inicio', 'bolsillos'].includes(activeTab) }"
				to="/inicio">
				INICIO
			</nuxt-link>

			<nuxt-link @click="handleClick('movimientos')" :class="{ active: activeTab === 'movimientos' }"
				to="/movimientos">MOVIMIENTOS</nuxt-link>
			<nuxt-link @click="handleClick('servicios')" :class="{ active: activeTab === 'servicios' }"
				to="/servicios">SERVICIOS</nuxt-link>
				<v-menu class="menu">
				<template v-slot:activator="{ props }">
					<button class="navbar-button" v-bind="props">
						<h6 :class="{ active: activeTab === 'perfil' }">{{ usuario.primerNombre }}
							<v-icon>mdi-account</v-icon>
						</h6>
					</button>
				</template>
				<v-list class="menu">
					<v-list-item><nuxt-link class="user-icon" to="/perfil"><button class="navbar-button" v-bind="props">
								<h6 @click="handleClick('perfil')">Editar Perfil <v-icon>mdi-pencil</v-icon></h6>
							</button></nuxt-link></v-list-item>
          <v-list-item><nuxt-link class="user-icon" to="/actividad"><button class="navbar-button" v-bind="props">
						<h6>Actividad <v-icon>mdi-history</v-icon></h6>
					</button></nuxt-link></v-list-item>
					<v-list-item>
						<botton class="navbar-button" @click="logOut">
							<h6>Salir <v-icon>mdi-exit-to-app</v-icon></h6>
						</botton>
					</v-list-item>
				</v-list>
			</v-menu>
		</nav>
		<main class="content">
			<slot />
		</main>
	</div>
</template>

<script setup>
import { UtilsService } from '~/services/UtilsService';
import { UsuariosService } from '~/services/UsuariosService';
const activeTab = ref("null");
onBeforeMount(async () => {
	const sessionToken = UtilsService.getSessionToken();
	if (!sessionToken) {
		navigateTo("/");
	}
	const currentUrl = await window.location.href.split('/').pop();
	activeTab.value = currentUrl;
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

const loadingPage = ref(false);

const usuario = ref({ tipoDocumento: "", numeroDocumento: "", primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "", fechaNacimiento: "", correoElectronico: "" });

function handleClick(tab) {
	activeTab.value = tab;
};

const logOut = async () => {
	loadingPage.value = true;
	await UsuariosService.cerrarSesion();
	loadingPage.value = false;
}
</script>
<style>
.menu {
	margin-top: 15px;
}

.menu .activate {
	background-color: black;
}
</style>