<template>
  <div class="container">
    <form class="search-form">
      <label for="category-select" class="form-label">SORT BY: </label>
      <select id="category-select" class="form-select">
        <option value="" @click="filters('')">First this...</option>
        <option value="brand" @click="filters('brand')">Brand</option>
        <option value="color-group" @click="filters('color-group')">Color Group</option>
      </select>
      <select id="sub-category-select" aria-labelledby="category-select" class="form-select">
        <option value="">...Then this</option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.name }}</option>
      </select>
      <button class="sortButton" type="submit" @click.prevent="sortList($event.target)">SORT</button>
    </form>
  </div>
</template>

<script>
  import { db, auth } from '../../firebaseConfig';

  export default {
    data() {
      return {
        options: [],
      };
    },
    methods: {
      filters(option1) {
        if (option1 === 'brand') {
          this.options = [
            {
              name: 'Color Group',
              value: 'color-group',
            },
            {
              name: 'Sub Brand',
              value: 'sub-brand',
            },
            {
              name: 'Finish',
              value: 'finish',
            },
          ];
        } else if (option1 === 'color-group') {
          this.options = [
            {
              name: 'Brand',
              value: 'brand',
            },
            {
              name: 'Finish',
              value: 'finish',
            },
          ];
        } else {
          this.options = [];
        }
      },
      sortList(options) {
        const catOp = options.form[0].selectedOptions[0].value;
        const subCatOp = options.form[1].selectedOptions[0].value;
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
    align-items: center;
  }

  .form-label {
    color: var(--dark-font-color);
    font-size: 0.9rem;
  }

  .form-select {
    width: 27vw;
    padding: 1%;
  }

  .sortButton {
    background: var(--dark-bg);
    color: var(--light-font-color);
    border: none;
    border-radius: 5px;
    padding: 2%;
  }
</style>
