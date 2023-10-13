<template>
	<div class="index-layout">
		<nav class="index-navbar">
			<a class="navbar__link" href=".">
				<img src="~/public/QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
			</a>
			<nuxt-link @click="handleClick('inicio')" :class="{ active: activeTab === 'inicio' }" to="/inicio">
				INICIO
			</nuxt-link>

			<nuxt-link @click="handleClick('movimientos')" :class="{ active: activeTab === 'movimientos' }"
				to="/movimientos">MOVIMIENTOS</nuxt-link>
			<nuxt-link @click="handleClick('servicios')" :class="{ active: activeTab === 'servicios' }"
				to="/servicios">SERVICIOS</nuxt-link>
			<bottom class="navbar-button">
				<nuxt-link class="user-icon" to="/perfil">
					<h6>Nombre</h6>
					<v-icon>mdi-account</v-icon>
				</nuxt-link>
			</bottom>

		</nav>
		<main class="content">
			<slot />
		</main>
	</div>
</template>

<script setup>

const appTitle = 'QuyneApp';
const activeTab = ref('inicio');

function handleClick(tab) {
	activeTab.value = tab;
};

</script>
