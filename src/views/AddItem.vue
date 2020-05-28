<template>
  <div class="add-item-page">
    <router-link :to="{ name: 'Home' }" class="cancel">← Cancel</router-link>
    <h2 class="title">
      Woohoo, new stuff! <br />
      Let's add it to your collection!
    </h2>
    <form class="add-item-form">
      <!-- FUTURE IDEA
      Initially show a category only, allow to pick one that already exists, or go to new page to set up a new category
      Then, once category is picked or set up, populate a form with the category's field options -->
      <!-- TODO
      Make a way to batch add items - select which categories are the same, then only fill out the different fields and submit all together? -->
      <label class="form-label" for="brand" required>Brand name </label>
      <input id="brand" v-model="newBrand" type="text" placeholder="Sally Hansen, Essie, etc" />

      <label class="form-label" for="sub-brand">Is there a sub-brand or collection name?</label>
      <input id="sub-brand" v-model="newSubBrand" type="text" placeholder="Insta-Dri, PixieDust, etc" />

      <label class="form-label" for="item-name">Name of color</label>
      <input id="item-name" v-model="newName" type="text" placeholder="Mint Apple, Apartment for Two, etc" />

      <label class="form-label" for="color-group" required>What color is it?</label>
      <select id="color-group" v-model="newColorGroup" name="colorGroup">
        <option value="">Select which option it's closest to:</option>
        <option value="base">Basics (Base/Top Coat, Strengthener)</option>
        <option value="blue">Blue</option>
        <option value="blueGreen">Blue/Green Mix (Teal, Turquoise)</option>
        <option value="glitter">Glitters</option>
        <option value="green">Green</option>
        <option value="metallic">Metallics (Gold/Silver)</option>
        <option value="neutral">Neutrals (Black/Brown/White/Cream)</option>
        <option value="orange">Orange</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>

      <label class="form-label" for="style" required>What kind of finish does it have?</label>
      <input id="style" v-model="newFinish" type="text" placeholder="Matte, Gloss, Gel, Texture" />

      <label class="form-label" for="pic" required>Pick a picture to show the color</label>
      <input id="pic" type="file" accept=".jpg, .png, .jpeg" />
      <!-- ToDo - on submit, redirect to home page w/ success message on success; show errors and stay on page if errors -->
      <button class="add-item-button" @click="addPolish">Add Item</button>
    </form>
  </div>
</template>

<script>
  import { db, auth, storage } from '../../firebaseConfig';

  export default {
    data() {
      return {
        newBrand: '',
        newSubBrand: '',
        newName: '',
        newColorGroup: '',
        newFinish: '',
        newImage: '',
      };
    },
    firestore() {
      return {
        polishes: {
          ref: db.collection('polishes'),
          resolve: (data) => {
            console.log('Data successfully added! ', data);
          },
          reject: (data) => {
            console.error('Problem with your data: ', data);
          },
        },
      };
    },
    methods: {
      addPolish() {
        this.$firestore.polishes.add({
          brand: this.newBrand,
          subbrand: this.newSubBrand,
          name: this.newName,
          colorgroup: this.newColorGroup,
          finish: this.newFinish,
          image: this.newImage,
        });
      },
    },
  };
</script>

<style scoped>
  .add-item-page {
    margin: 3%;
  }

  .cancel {
    color: var(--dark-font-color);
    font-weight: 600;
    padding: 1% 2%;
    text-decoration: none;
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 35%, transparent 0, transparent);
  }

  .cancel:hover {
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 45%, transparent 0, transparent);
    font-size: 1.025rem;
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

  input,
  select {
    padding: 2%;
    border-radius: 4px;
    margin-bottom: 4%;
    background: var(--light-font-color);
  }

  input {
    width: 90%;
  }

  select {
    width: 95%;
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
