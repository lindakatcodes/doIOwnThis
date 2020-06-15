<template>
  <div class="edit-item-page">
    <router-link :to="{ name: 'single-swatch', params: { id: this.$attrs.id } }" class="cancel">← Cancel</router-link>
    <div v-if="loading" class="loading">
      <img src="../assets/loading.svg" alt="Loading Data..." />
    </div>
    <h2 class="title">
      Edit Item
    </h2>
    <div v-if="errors.length" class="error">
      Oops! There's a few errors. Please correct these:
      <ul v-for="error in errors" :key="error">
        <li>{{ error }}</li>
      </ul>
    </div>
    <form class="edit-item-form" enctype="multipart/form-data" method="post" @submit.prevent="editPolish($event.target)">
      <label class="form-label" for="brand">Brand Name <span class="required">*</span></label>
      <input id="brand" v-model.trim="singleSwatch.brand" type="text" placeholder="Sally Hansen, Essie, etc" />

      <label class="form-label" for="sub-brand">Is there a sub-brand or collection name?</label>
      <input id="sub-brand" v-model.trim="singleSwatch.subBrand" type="text" placeholder="Insta-Dri, PixieDust, etc" />

      <label class="form-label" for="item-name">Name of color <span class="required">*</span></label>
      <input id="item-name" v-model.trim="singleSwatch.name" type="text" placeholder="Mint Apple, Apartment for Two, etc" />

      <label class="form-label" for="color-group">What color group does it best belong to? <span class="required">*</span></label>
      <select id="color-group" v-model="singleSwatch.colorGroup" name="colorGroup">
        <option value="">Select which option it's closest to:</option>
        <option value="Basic">Basics (Base/Top Coat, Strengthener)</option>
        <option value="Blue">Blue</option>
        <option value="Blue Green">Blue/Green Mix (Teal, Turquoise)</option>
        <option value="Glitter">Glitters</option>
        <option value="Green">Green</option>
        <option value="Metallic">Metallics (Gold/Silver)</option>
        <option value="Neutral">Neutrals (Black/Brown/White/Cream)</option>
        <option value="Orange">Orange</option>
        <option value="Pink">Pink</option>
        <option value="Purple">Purple</option>
        <option value="Red">Red</option>
        <option value="Yellow">Yellow</option>
      </select>

      <label class="form-label" for="style">What kind of finish does it have?</label>
      <input id="style" v-model.trim="singleSwatch.finish" type="text" placeholder="Matte, Gloss, Gel, Texture" />

      <label class="form-label" for="pic">
        Pick a new picture, if desired
        <br />
        (if not, your current picture will still be saved)
      </label>
      <input id="pic" type="file" accept="image/*, .jpg, .png, .jpeg" capture="environment" />
      <button class="edit-item-button" type="submit">CONFIRM EDITS</button>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
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
          id: '',
        },
        errors: [],
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.dbStore.loading,
      }),
      getInitData() {
        return this.getSwatch(this.$attrs.id);
      },
    },
    async mounted() {
      const data = await this.getInitData;
      this.singleSwatch.brand = data.brand;
      this.singleSwatch.subBrand = data.subBrand;
      this.singleSwatch.name = data.name;
      this.singleSwatch.colorGroup = data.colorGroup;
      this.singleSwatch.finish = data.finish;
      this.singleSwatch.image = data.image;
      this.singleSwatch.storageUri = data.storageUri;
      this.singleSwatch.id = data.id;
    },
    methods: {
      ...mapActions({
        getSwatch: 'dbStore/getSingleSwatch',
        updateSwatch: 'dbStore/updateExistingSwatch',
        savePhoto: 'storageStore/saveNewPhoto',
        removePhoto: 'storageStore/removeOldPhoto',
        titleCase: 'dbStore/titleCase',
      }),
      async editPolish(formData) {
        // store a few things we'll need in variables
        // first, easy access to a file (if provided) & add new item check
        const file = formData[5].files[0];

        // then, a handful of query selectors
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

        const validatedResult = await this.validateForm(this.singleSwatch, file, this.errors, selectors, 'edit');
        const validated = validatedResult[0];

        // if validation passes, we're good to update the data
        if (validated) {
          // if there's a photo already, we'll need to delete the old one, then add the new one
          if (file) {
            const oldFilePath = this.singleSwatch.storageUri;
            // only attempt removal if there was an old file path - not needed if it's already blank or undefined
            if (oldFilePath !== '' && oldFilePath !== undefined) {
              this.removePhoto(oldFilePath);
            }

            const newImageInfo = await this.savePhoto(file);
            this.singleSwatch.image = newImageInfo[0];
            this.singleSwatch.storageUri = newImageInfo[1];
          }

          // before we add the data to the db, we want to do some basic formatting to ensure our data stays clean & easy to search later
          this.singleSwatch.name = this.titleCase(this.singleSwatch.name);
          this.singleSwatch.brand = this.titleCase(this.singleSwatch.brand);
          this.singleSwatch.subBrand = this.titleCase(this.singleSwatch.subBrand);
          this.singleSwatch.finish = this.titleCase(this.singleSwatch.finish);

          // then, update the db with the new data
          this.updateSwatch(this.singleSwatch)
            .then(() => {
              this.$toasted.global.successToast({
                message: 'Your item has been updated!',
              });
            })
            .then(() => {
              this.$router.push({
                name: 'home',
              });
            })
            .catch(function (error) {
              this.$toasted.global.errorToast({
                message: `Something went wrong while editing your data: ${error}`,
              });
            });
        }
      },
    },
  };
</script>

<style scoped>
  .edit-item-page {
    margin: 3% 3% 10% 3%;
  }

  .cancel {
    color: var(--dark-font-color);
    font-family: var(--serif);
    font-weight: 700;
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
    font-family: var(--serif);
    color: var(--dark-font-color);
  }

  .loading {
    position: absolute;
    top: 14%;
    right: 2%;
    width: 20%;
  }

  .loading img {
    width: 85%;
  }

  .edit-item-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-label {
    color: var(--dark-font-color);
    margin-bottom: 1%;
    margin-left: 1%;
    font-size: 0.9rem;
    line-height: 1.1rem;
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

  .edit-item-button {
    width: 45%;
    padding: 4%;
    border-radius: 4px;
    background: var(--accent);
    color: var(--dark-font-color);
    border-color: var(--light-bg);
    align-self: center;
    font-family: var(--serif);
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.025rem;
    line-height: 1.1rem;
  }

  .required {
    color: var(--dark-accent);
    font-size: 1.3rem;
  }

  .error {
    color: var(--dark-accent);
    font-weight: bold;
  }

  .error-border {
    border: 2px solid var(--dark-accent);
  }
</style>
