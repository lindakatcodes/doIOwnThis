<template>
  <div>
    <p v-if="swatches.length == 0">Nothing to show yet! Add some items to see them here.</p>
    <p v-else>Click on a swatch to see it's full details!</p>
    <div class="allSwatches">
      <Swatch v-for="swatch in swatches" :key="swatch.id" :swatch="swatch" />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Swatch from './Swatch.vue';

  export default {
    components: {
      Swatch,
    },
    computed: {
      ...mapState({
        swatches: (state) => state.dbStore.allSwatches,
      }),
    },
    mounted() {
      this.getAllSwatches()
        .then(() => console.log('Succesfully received swatch data'))
        .catch((error) => console.error('Could not get all swatch data ', error));
    },
    methods: {
      ...mapActions({
        getAllSwatches: 'dbStore/getAllSwatches',
      }),
    },
  };
</script>

<style scoped>
  p {
    margin-top: 3%;
    text-align: center;
  }

  .allSwatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.25rem;
    justify-items: center;
    align-items: start;
    margin-top: 3%;
  }
</style>
