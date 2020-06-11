/* eslint-disable prefer-destructuring */
<template>
  <div class="add-item-page">
    <router-link :to="{ name: 'home' }" class="cancel">← Cancel</router-link>
    <h2 class="title">
      Woohoo, new stuff! <br />
      Let's add it to your collection!
    </h2>
    <div v-if="errors.length" class="error">
      Oops! There's a few errors. Please correct these:
      <ul v-for="error in errors" :key="error">
        <li>{{ error }}</li>
      </ul>
    </div>
    <form class="add-item-form" enctype="multipart/form-data" method="post" @submit.prevent="addPolish($event.target)">
      <!-- FUTURE IDEA
      Initially show a category only, allow to pick one that already exists, or go to new page to set up a new category
      Then, once category is picked or set up, populate a form with the category's field options -->
      <label class="form-label" for="brand">Brand name <span class="required">*</span> </label>
      <input id="brand" v-model.trim="singleSwatch.brand" type="text" placeholder="Sally Hansen, Essie, etc" />

      <label class="form-label" for="sub-brand">Is there a sub-brand or collection name?</label>
      <input id="sub-brand" v-model.trim="singleSwatch.subBrand" type="text" placeholder="Insta-Dri, PixieDust, etc" />

      <label class="form-label" for="item-name">Name of color <span class="required">*</span></label>
      <input id="item-name" v-model.trim="singleSwatch.name" type="text" placeholder="Mint Apple, Apartment for Two, etc" />

      <label class="form-label" for="color-group">What color is it? <span class="required">*</span></label>
      <select id="color-group" v-model="singleSwatch.colorGroup" name="colorGroup">
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

      <label class="form-label" for="style">What kind of finish does it have?</label>
      <input id="style" v-model.trim="singleSwatch.finish" type="text" placeholder="Matte, Gloss, Gel, Texture" />

      <label class="form-label" for="pic">Pick a picture to show the color (recommended)</label>
      <input id="pic" type="file" accept=".jpg, .png, .jpeg" />
      <!-- ToDo - on submit, redirect to home page w/ success message on success; show errors and stay on page if errors -->
      <div class="newItemCheck">
        <input id="addAnother" class="addCheckbox" name="addNewItem" type="checkbox" />
        <label class="form-label addCheckLabel" for="addAnother">Want to add another item?</label>
      </div>

      <button class="add-item-button" type="submit">Add Item</button>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import formValidation from '../mixins/formValidation';

  export default {
    mixins: [formValidation],
    data() {
      return {
        singleSwatch: {
          name: '',
          brand: '',
          subBrand: '',
          colorGroup: '',
          finish: '',
          image: '',
          storageUri: '',
        },
        errors: [],
      };
    },
    methods: {
      ...mapActions({
        addSwatchToDb: 'dbStore/addNewSwatch',
        savePhoto: 'storageStore/saveNewPhoto',
      }),
      async addPolish(formData) {
        // store a few things we'll need in variables
        // first, easy access to a file (if provided) & add new item check
        const file = formData[5].files[0];
        const addNew = formData[6].checked;

        // then, a handful of query selectors
        const formSelector = document.querySelector('.add-item-form');
        const brandSelector = document.querySelector('#brand');
        const nameSelector = document.querySelector('#item-name');
        const colorSelector = document.querySelector('#color-group');
        const picSelector = document.querySelector('#pic');

        // will also need a selectors object, to hold the fields that will need error functionality
        const selectors = {
          brand: brandSelector,
          name: nameSelector,
          color: colorSelector,
          photo: picSelector,
        };

        // okay. first, we need to see if the form data is valid. our validation check needs a few things: the singleSwatch data, our photo file, an empty errors array, and our selectors object. it will return an array with the first item being our truthy validation, and the second item being the final errors array - will be empty if the form is valid, otherwise will contain the errors we need to push to our data's error array
        this.errors = [];
        selectors.brand.classList.remove('error-border');
        selectors.name.classList.remove('error-border');
        selectors.color.classList.remove('error-border');
        selectors.photo.classList.remove('error-border');

        const validatedResult = await this.validateForm(this.singleSwatch, file, this.errors, selectors);
        const validated = validatedResult[0];
        console.log('valid form status: ', validated);

        // if validation passes, we're good to add to our db!
        if (validated) {
          // first, add the photo to storage and add the photo data to our local data
          if (file) {
            const imageInfo = await this.savePhoto(file);

            this.singleSwatch.image = imageInfo[0];
            this.singleSwatch.storageUri = imageInfo[1];
          }

          // then, add the new data to db
          this.addSwatchToDb(this.singleSwatch)
            .then(() => {
              console.log('Item successfully added to your collection!');
              if (addNew) {
                formSelector.reset();
              } else {
                this.$router.push({
                  name: 'Home',
                });
              }
            })
            .catch(function (error) {
              console.error('Problem adding your data: ', error);
            });
        }
      },
    },
  };
</script>

<style scoped>
  .add-item-page {
    margin: 3% 3% 10% 3%;
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

  .newItemCheck {
    margin-left: 7%;
    margin-bottom: 2%;
    width: 85%;
    font-size: 1.05rem;
  }

  .addCheckbox {
    width: 10%;
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

  .required {
    color: var(--dark-accent);
    font-size: 1.1rem;
  }

  .error {
    color: var(--dark-accent);
    font-weight: bold;
  }

  .error-border {
    border: 2px solid var(--dark-accent);
  }
</style>
