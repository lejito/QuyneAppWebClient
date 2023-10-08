<template>
	<div class="index-layout">
		<nav class="navbar">
			<a class="navbar__link" href=".">
                <img src="~/public/QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
			</a>
            <bottom class="navbar-button">
                <div class="user-icon">
                    <h6>Hola, </h6>
                    <v-icon >mdi-account</v-icon>
                </div>
            </bottom>
		</nav>
        <nav class="secondary-navbar">
            <a @click="handleClick('inicio')" :class="{ active: activeTab === 'inicio' }" class="nav-button" href="inicio">INICIO</a>
            <a @click="handleClick('movimientos')" :class="{ active: activeTab === 'movimientos' }" class="nav-button center"
            >MOVIMIENTOS</a>
    		<a @click="handleClick('servicios')" :class="{ active: activeTab === 'servicios' }" class="nav-button">SERVICIOS</a>
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