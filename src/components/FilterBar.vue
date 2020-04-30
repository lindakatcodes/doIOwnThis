<template>
  <div class="container">
    <router-link class="add" :to="{ name: 'add-new' }">+ Add New Item</router-link>
    <span>|</span>
    <form class="search-form">
      <label for="category-select" class="form-label">Filter By: </label>
      <select name="category-select" class="form-select">
        <option v-for="choice in choices" :key="choice">{{ choice }}</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choices: [
        'Select One:',
        'category',
        'brand',
        'color-group',
        'name'
      ]
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  padding: 2% 0 2%;
  background-color: var(--white);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.add {
  color: var(--blue);
}

.search-form {
  width: 50%;
  display: flex;
  align-items: center;
}

.form-label {
  color: var(--dark-gray);
  margin-right: 3%;
}

.form-select {
  width: 30vw;
  padding: 1%;
}
</style>
