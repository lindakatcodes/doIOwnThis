<template>
  <div class="container">
    <form class="search-form" @submit.prevent="getResults">
      <label for="category-select" class="form-label">FILTER ITEMS: </label>
      <select id="category-select" v-model="category" class="form-select">
        <option value="">Show me...</option>
        <option value="brand">Brand</option>
        <option value="subBrand">Sub Brand</option>
        <option value="colorGroup">Color Group</option>
        <option value="finish">Finish</option>
        <option value="name">Name</option>
      </select>
      <input id="category-data-select" v-model.trim="data" type="text" aria-labelledby="category-select" class="form-input" />
      <button class="sortButton" type="submit">SEARCH</button>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        category: '',
        data: '',
      };
    },
    methods: {
      ...mapActions({
        getSearchResults: 'dbStore/searchSwatches',
      }),
      async getResults() {
        await this.getSearchResults([this.category, this.data]);
      },
    },
  };
</script>

<style scoped>
  .container {
    width: 100%;
    padding: 3% 0;
    background-color: var(--accent);
    margin-bottom: 3%;
  }

  .search-form {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .form-label {
    color: var(--dark-font-color);
    font-size: 0.9rem;
    text-align: right;
    margin-right: 1%;
  }

  .form-select {
    width: 27vw;
    padding: 1%;
    margin-right: 3%;
    margin-left: 1%;
  }

  .form-input {
    width: 27vw;
    padding: 1%;
    margin-right: 3%;
  }

  .sortButton {
    background: var(--dark-bg);
    color: var(--light-font-color);
    font-weight: 700;
    letter-spacing: 0.025rem;
    border: none;
    border-radius: 5px;
    padding: 2%;
    margin-right: 4%;
  }
</style>
