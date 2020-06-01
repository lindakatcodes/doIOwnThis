<template>
  <div class="add-item-page">
    <router-link :to="{ name: 'Home' }" class="cancel">← Cancel</router-link>
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
      <!-- TODO
      Make a way to batch add items - select which categories are the same, then only fill out the different fields and submit all together? -->
      <label class="form-label" for="brand">Brand name </label>
      <input id="brand" v-model.trim="newBrand" type="text" placeholder="Sally Hansen, Essie, etc" />

      <label class="form-label" for="sub-brand">Is there a sub-brand or collection name?</label>
      <input id="sub-brand" v-model.trim="newSubBrand" type="text" placeholder="Insta-Dri, PixieDust, etc" />

      <label class="form-label" for="item-name">Name of color</label>
      <input id="item-name" v-model.trim="newName" type="text" placeholder="Mint Apple, Apartment for Two, etc" />

      <label class="form-label" for="color-group">What color is it?</label>
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

      <label class="form-label" for="style">What kind of finish does it have?</label>
      <input id="style" v-model.trim="newFinish" type="text" placeholder="Matte, Gloss, Gel, Texture" />

      <label class="form-label" for="pic">Pick a picture to show the color</label>
      <input id="pic" ref="newImage" type="file" accept=".jpg, .png, .jpeg" />
      <!-- ToDo - on submit, redirect to home page w/ success message on success; show errors and stay on page if errors -->
      <button class="add-item-button" type="submit">Add Item</button>
    </form>
  </div>
</template>

<script>
  import { db, auth, storage } from '../../firebaseConfig';

  const polishes = db.collection('nailPolish');

  export default {
    data() {
      return {
        newBrand: '',
        newSubBrand: '',
        newName: '',
        newColorGroup: '',
        newFinish: '',
        newImage: '',
        errors: [],
      };
    },
    methods: {
      addPolish(formData) {
        const file = formData[5].files[0];

        const validated = this.validForm(file);

        if (validated) {
          polishes
            .add({
              brand: this.newBrand,
              subBrand: this.newSubBrand,
              name: this.newName,
              colorGroup: this.newColorGroup,
              finish: this.newFinish,
              created: new Date(),
              addedBy: auth.currentUser.uid,
            })
            .then(function (itemRef) {
              const filePath = `${auth.currentUser.uid}/${file.name}`;
              return storage
                .ref(filePath)
                .put(file)
                .then(function (fileSnapshot) {
                  return fileSnapshot.ref.getDownloadURL().then((url) => {
                    itemRef.update({
                      image: url,
                      storageUri: fileSnapshot.metadata.fullPath,
                    });
                  });
                });
            })
            .then(() => {
              console.log('Item successfully added to your collection!');
              this.$router.push({
                name: 'Home',
              });
            })
            .catch(function (error) {
              console.error('Problem adding your data: ', error);
            });
        }
      },
      validForm(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const validFile = file ? validTypes.includes(file.type) : false;

        if (this.newBrand && this.newColorGroup && validFile) {
          return true;
        }

        this.errors = [];
        document.querySelector('#brand').classList.remove('error-border');
        document.querySelector('#color-group').classList.remove('error-border');
        document.querySelector('#pic').classList.remove('error-border');

        if (!this.newBrand) {
          this.errors.push('Brand name is required.');
          document.querySelector('#brand').classList.add('error-border');
        }
        if (!this.newColorGroup) {
          this.errors.push('Color group selection is required.');
          document.querySelector('#color-group').classList.add('error-border');
        }
        if (!validFile) {
          this.errors.push('An image is required. Please add a file that ends in .jpg, .jpeg, or .png.');
          document.querySelector('#pic').classList.add('error-border');
        }
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

  .error {
    color: var(--dark-accent);
    font-weight: bold;
  }

  .error-border {
    border: 2px solid var(--dark-accent);
  }
</style>
