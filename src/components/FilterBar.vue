<template>
  <div class="container">
    <form class="search-form">
      <label for="category-select" class="form-label">Sort By: </label>
      <select id="category-select" class="form-select">
        <option>First this...</option>
      </select>
      <select id="sub-category-select" aria-labelledby="category-select" class="form-select">
        <option>...Then this</option>
      </select>
    </form>
  </div>
</template>

<script>
  export default {};
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
  }

  .form-select {
    width: 35vw;
    padding: 1%;
  }
</style>
