<template>
  <div class="container">
    <form class="search-form">
      <label for="category-select" class="form-label">Filter By: </label>
      <select name="category-select" class="form-select">
        <option>Select One:</option>
      </select>
      <select name="sub-category-select" class="form-select">
        <option>Select one:</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  width: 100vw;
  padding: 2% 0 2%;
  background-color: var(--accent);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.search-form {
  width: 100%;
  display: flex;
  align-items: center;
}

.form-label {
  color: var(--heading-bg);
}

.form-select {
  width: 30vw;
  padding: 1%;
}
</style>
