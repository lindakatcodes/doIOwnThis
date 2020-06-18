<template>
  <div class="auth-wrapper">
    <div id="auth-container"></div>
  </div>
</template>

<script>
  import { ui, uiConfig } from '../../firebaseConfig';

  export default {
    mounted() {
      if (ui.isPendingRedirect()) {
        ui.start('#auth-container', uiConfig);
      }

      ui.start('#auth-container', uiConfig);
      // ui.disableAutoSignIn();
    },
  };
</script>

<style scoped>
  .auth-wrapper {
    border-radius: 7px;
    width: 85%;
    margin: 3% auto;
    background: var(--dark-bg);
    padding: 3% 0;
  }

  @media screen and (min-width: 750px) {
    .auth-wrapper {
      width: 100%;
    }
  }
</style>
