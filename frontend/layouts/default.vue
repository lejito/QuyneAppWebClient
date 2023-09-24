<template>
	<div class="layout">
		<nav class="navbar">
			<a class="navbar__link" href=".">
				<h1 class="navbar__title">
					{{ appTitle }}
				</h1>
			</a>
		</nav>

		<main class="content">
			<slot />
		</main>
	</div>
</template>

<script setup>
const appTitle = 'QuyneApp';
</script>