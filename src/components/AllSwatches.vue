<template>
  <div>
    <p v-if="swatches.length == 0">Nothing to show yet! Add some items to see them here.</p>
    <p v-else-if="filteredSwatches.length == 0 && !noFilterState" class="noResults">
      Sorry, it looks like there's no match for that search!
    </p>
    <p v-else>Click on a swatch to see it's full details!</p>
    <div v-if="noFilterState">
      <div v-if="loading" class="loading">
        <img src="../assets/loading.svg" alt="Loading..." />
      </div>
      <div v-else class="allSwatches">
        <Swatch v-for="swatch in swatches" :key="swatch.id" :swatch="swatch" />
      </div>
    </div>
    <div v-if="!noFilterState">
      <p class="clearFiltered" @click="clearResults">Clear Filter Results</p>
      <div v-if="loading">
        <img src="../assets/loading.svg" alt="Loading..." class="loading" />
      </div>
      <div v-else class="allSwatches">
        <Swatch v-for="swatch in filteredSwatches" :key="swatch.id" :swatch="swatch" />
      </div>
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
        filteredSwatches: (state) => state.dbStore.filteredSwatches,
        noFilterState: (state) => state.dbStore.noFilter,
        loading: (state) => state.dbStore.loading,
      }),
    },
    mounted() {
      this.getAllSwatches().catch((error) => {
        this.$toasted.global.errorToast({
          message: `Couldn't load swatches: ${error}`,
        });
      });
    },
    methods: {
      ...mapActions({
        getAllSwatches: 'dbStore/getAllSwatches',
        clearResults: 'dbStore/clearFilteredResults',
      }),
    },
  };
</script>

<style scoped>
  p {
    margin-top: 5%;
    text-align: center;
  }

  .loading {
    margin: 0 auto;
    width: 20%;
  }

  .loading img {
    width: 85%;
  }

  .allSwatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0 2%;
    justify-items: center;
    align-items: start;
    margin: 3%;
    clear: both;
  }

  .clearFiltered {
    color: var(--dark-font-color);
    font-family: var(--serif);
    font-weight: 700;
    float: right;
    padding: 1% 2%;
    margin-top: 3%;
    cursor: pointer;
    text-decoration: none;
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 35%, transparent 0, transparent);
  }

  .clearFiltered:hover {
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 45%, transparent 0, transparent);
    font-size: 1.025rem;
  }

  .noResults {
    width: 80%;
    margin: 10% auto 5%;
    color: var(--dark-accent);
    font-weight: 700;
    font-size: 1.1rem;
  }
</style>
