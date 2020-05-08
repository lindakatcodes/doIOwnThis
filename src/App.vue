<template>
  <div id="app">
    <header class="header">
      <headingBar  />
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
import FilterBar from '@/components/FilterBar'
import HeadingBar from '@/components/HeadingBar'

export default {
  components: {
    HeadingBar,
    FilterBar
  }
}
</script>

<style>
:root {
  --heading-bg: #25364f;
  --font-color: #fafbe4;
  --body-bg: #9496a5;
  --accent: #e9b1a8;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--body-bg);
  color: var(--font-color);
}

</style>
