<template>
  <div id="app">
    <header>
      <headingBar />
    </header>

    <main v-if="!$auth0.loading">
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
    font-family: var(--sans-serif);
  }

  @media screen and (min-width: 1000px) {
    body,
    html {
      height: 100%;
    }

    #app {
      max-width: 1000px;
      margin: 0 auto;
    }
  }
</style>
