<template>
  <div id="app">
    <header>
      <headingBar />
    </header>

    <main class="swatches">
      <FilterBar />
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import db from './services/db.js';
  import FilterBar from './components/FilterBar.vue';
  import HeadingBar from './components/HeadingBar.vue';

  export default {
    components: {
      HeadingBar,
      FilterBar,
    },
  };
</script>

<style>
  :root {
    --dark-bg: #1a2536;
    --light-bg: #9b9da7;
    --dark-font-color: #1a2536;
    --light-font-color: #fafbe4;
    --accent: #e9a8a8;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background: var(--light-bg);
  }
</style>
