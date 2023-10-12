<template>
	<div class="index-layout">
		<nav class="index-navbar">
            
			<a class="navbar__link" href=".">
                <img src="~/public/QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
			</a>
            <a @click="handleClick('inicio')" :class="{ active: activeTab === 'inicio' }" href="inicio">INICIO</a>
            <a @click="handleClick('movimientos')" :class="{ active: activeTab === 'movimientos' }" >MOVIMIENTOS</a>
    		<a @click="handleClick('servicios')" :class="{ active: activeTab === 'servicios' }">SERVICIOS</a>
            <bottom class="navbar-button">
                <div class="user-icon">
                    <h6>Nombre</h6>
                    <v-icon >mdi-account</v-icon>
                </div>
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
