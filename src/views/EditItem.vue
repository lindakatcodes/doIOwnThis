<template>
  <div class="edit-item-page">
    <router-link :to="{ name: 'single-swatch', params: { id: this.$attrs.id } }" class="cancel">← Cancel</router-link>
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
      <label class="form-label" for="brand">Brand name </label>
      <input id="brand" v-model.trim="Brand" type="text" placeholder="Sally Hansen, Essie, etc" />

      <label class="form-label" for="sub-brand">Is there a sub-brand or collection name?</label>
      <input id="sub-brand" v-model.trim="SubBrand" type="text" placeholder="Insta-Dri, PixieDust, etc" />

      <label class="form-label" for="item-name">Name of color</label>
      <input id="item-name" v-model.trim="Name" type="text" placeholder="Mint Apple, Apartment for Two, etc" />

      <label class="form-label" for="color-group">What color is it?</label>
      <select id="color-group" v-model="ColorGroup" name="colorGroup">
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
      <input id="style" v-model.trim="Finish" type="text" placeholder="Matte, Gloss, Gel, Texture" />

      <label class="form-label" for="pic">Pick a new picture if desired</label>
      <input id="pic" ref="newImage" type="file" accept=".jpg, .png, .jpeg" />
      <button class="edit-item-button" type="submit">Confirm Edits</button>
    </form>
  </div>
</template>

<script>
  import { db, auth, storage, timestamp } from '../../firebaseConfig';

  const polishes = db.collection('nailPolish');

  export default {
    data() {
      return {
        Brand: '',
        SubBrand: '',
        Name: '',
        ColorGroup: '',
        Finish: '',
        Image: '',
        errors: [],
        imageStoragePath: '',
      };
    },
    mounted() {
      const thisRef = this;
      const itemRefer = db.collection('nailPolish').doc(this.$attrs.id);

      itemRefer.get().then(function (doc) {
        const data = doc.data();
        thisRef.Brand = data.brand;
        thisRef.SubBrand = data.subBrand;
        thisRef.Name = data.name;
        thisRef.ColorGroup = data.colorGroup;
        thisRef.Finish = data.finish;
        thisRef.Image = data.image;
        thisRef.imageStoragePath = data.storageUri;
      });
    },
    methods: {
      editPolish(formData) {
        const file = formData[5].files[0];
        let validFile = '';
        const itemRef = polishes.doc(this.$attrs.id);
        const thisRef = this;

        if (file) {
          validFile = this.validateFile(file);
        }

        const validated = this.validForm(validFile);

        if (validated) {
          itemRef
            .update({
              brand: this.Brand,
              subBrand: this.SubBrand,
              name: this.Name,
              colorGroup: this.ColorGroup,
              finish: this.Finish,
              lastUpdated: timestamp,
            })
            .then(function () {
              if (validFile) {
                // first, remove the current file from storage
                const fileToRemove = thisRef.imageStoragePath;

                storage
                  .ref(fileToRemove)
                  .delete()
                  .then(function () {
                    console.log('Old file removed from storage');
                  })
                  .catch(function (error) {
                    console.log('Problem removing old file: ', error);
                  });

                // then, add the new file
                const filePath = `${auth.currentUser.uid}/${file.name}`;
                storage
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
              }
            })
            .then(() => {
              console.log('Item successfully updated!');
              this.$router.push({
                name: 'Home',
              });
            })
            .catch(function (error) {
              console.error('Problem editing your data: ', error);
            });
        }
      },
      validateFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return file ? validTypes.includes(file.type) : false;
      },
      validForm(validFile) {
        if (this.Brand && this.ColorGroup) {
          if (validFile === '' || validFile) {
            return true;
          }
        }

        this.errors = [];
        document.querySelector('#brand').classList.remove('error-border');
        document.querySelector('#color-group').classList.remove('error-border');
        document.querySelector('#pic').classList.remove('error-border');

        if (!this.Brand) {
          this.errors.push('Brand name is required.');
          document.querySelector('#brand').classList.add('error-border');
        }
        if (!this.ColorGroup) {
          this.errors.push('Color group selection is required.');
          document.querySelector('#color-group').classList.add('error-border');
        }
        if (validFile === false) {
          this.errors.push('Please add a file that ends in .jpg, .jpeg, or .png.');
          document.querySelector('#pic').classList.add('error-border');
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

  .edit-item-form {
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

  .edit-item-button {
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