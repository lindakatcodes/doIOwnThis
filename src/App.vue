<template>
	<div id="app">
		<header class="header">
			<h1>Do I Own This?</h1>
			<menubar />
		</header>

		<filterbar />
		<main class="swatches">
			<div v-for="swatch in swatches" :key="swatch.id">
				<img :src="swatch.img" />
			</div>
		</main>
	</div>
</template>

<script>
export default {}
</script>
<style>
:root {
	--blue: #020258;
	--white: #faf9f9;
	--dark-gray: #303030;
}

html,
body {
	margin: 0;
	padding: 0;
}

body {
	background: var(--dark-gray);
}

.header {
	width: 100%;
	text-align: center;
	background-color: var(--blue);
	color: var(--white);
	padding: 0.5px;
}
</style>
