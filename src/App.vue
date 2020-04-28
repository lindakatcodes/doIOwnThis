<template>
  <div id="app">
    <header class="header">
      <h1>Do I Own This?</h1>
      <!-- <menubar /> -->
    </header>

    <main class="swatches">
      <FilterBar />
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import db from '@/services/db.js'
import FilterBar from '@/components/FilterBar.vue'

export default {
  components: {
    FilterBar
  }
}
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
