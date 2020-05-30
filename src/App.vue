<template>
  <div id="app">
    <header>
      <headingBar />
    </header>

    <main class="swatches">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
  import HeadingBar from './components/HeadingBar.vue';

  export default {
    components: {
      HeadingBar,
    },
  };
</script>

<style>
  body {
    background: var(--light-bg);
    color: var(--dark-font-color);
  }
</style>
