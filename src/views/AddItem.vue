<template>
  <div class="add-item-page">
    <router-link :to="{ name: 'Home' }" class="cancel">← Cancel</router-link>
    <h2 class="title">
      Woohoo, new stuff! <br />
      Let's add it to your collection!
    </h2>
    <form class="add-item-form">
      <!-- ToDo
      * category - show possibile ones, plus option to add new - will need a new page for that, so user can select needed fields
      * on category selection, slide in needed fields w/ labels
      * if required field, show that on form
      * helpful hints on each class, especially style, to show what it's about
      * extra buttons will need dynamically filled label fields -->
      <label class="form-label" for="category">What category does this belong to?</label>
      <input id="category" type="text" required />

      <label class="form-label" for="brand" required>Brand: </label>
      <input id="brand" type="text" />

      <label class="form-label" for="sub-brand">Is there a sub-brand name?</label>
      <input id="sub-brand" type="text" />

      <label class="form-label" for="item-name">Does it have a name?</label>
      <input id="item-name" type="text" />

      <label class="form-label" for="color-group" required>What color is it?</label>
      <input id="color-group" type="text" />

      <label class="form-label" for="style" required>What style is it?</label>
      <input id="style" type="text" />

      <label class="form-label" for="extra-one">Extra One</label>
      <input id="extra-one" type="text" />

      <label class="form-label" for="extra-two">Extra Two</label>
      <input id="extra-two" type="text" />
      <!-- ToDo - on submit, redirect to home page w/ success message on success; show errors and stay on page if errors -->
      <button class="add-item-button">Add Item</button>
    </form>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .add-item-page {
    margin: 3%;
  }

  .cancel {
    color: var(--dark-font-color);
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
    font-weight: 600;
  }
  .title {
    text-align: center;
    color: var(--dark-font-color);
  }

  .add-item-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-label {
    color: var(--dark-font-color);
    margin-bottom: 1%;
  }

  .add-item-form input {
    padding: 2%;
    border-radius: 4px;
    width: 90%;
    margin-bottom: 4%;
  }

  .add-item-button {
    width: 45%;
    padding: 4%;
    border-radius: 4px;
    background: var(--accent);
    color: var(--dark-font-color);
    border-color: var(--light-bg);
    align-self: center;
  }
</style>
