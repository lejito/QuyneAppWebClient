<template>
	<div class="index-layout">
		<nav class="index-navbar">
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

		<main class="content">
			<slot />
		</main>
	</div>
</template>

<script setup>

const appTitle = 'QuyneApp';

</script>