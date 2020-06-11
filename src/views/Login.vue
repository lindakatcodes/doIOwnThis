<template>
  <div id="auth-container"></div>
</template>

<script>
  import { ui, uiConfig } from '../../firebaseConfig';

  export default {
    mounted() {
      ui.start('#auth-container', uiConfig);

      if (ui.isPendingRedirect()) {
        ui.start('#auth-container', uiConfig);
      }
    },
  };
</script>

<style scoped></style>
