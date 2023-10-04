import { db } from '../../firebaseConfig';

export default {
  methods: {
    validatePhoto(file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5242880;
      if (file.size < maxSize && validTypes.includes(file.type)) {
        return true;
      }
      return false;
    },
    async checkSwatchExists(brand, name, addedBy) {
      const nameQuery = [];
      const capitalName = await this.titleCase(name);
      let foundMatch = false;

      // run a query that checks to see if any variation of the polish name shows up, & return those results
      await db
        .collection('nailPolish')
        .where('addedBy', '==', addedBy)
        .where('name', '==', capitalName)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            nameQuery.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });

      // then, go over each one and see if any have the same brand name as the provided brand
      nameQuery.forEach((doc) => {
        if (doc.brand === brand) {
          foundMatch = true;
        }
      });
      return foundMatch;
    },
    titleCase(str) {
      const originalArray = str.toString().split(' ');
      const casedResult = [];
      originalArray.forEach((word) => {
        const first = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
        casedResult.push(first.concat(rest));
      });
      return casedResult.join(' ');
    },
    async validateForm(data, photoFile, errors, selectors, type) {
      let formIsValid = false;
      // first, check if an item w/ same brand & name already exists - prevent duplicates
      const docExists = await this.checkSwatchExists(data.brand, data.name, data.addedBy);

      // then, if we have a photo file, make sure it's in our size & file type ranges
      let validPhoto = '';
      if (photoFile) {
        validPhoto = this.validatePhoto(photoFile);
      }

      // check to make sure we have values for all 3 required fields
      if (data.brand && data.name && data.colorGroup) {
        // alright, now if we have a photo file, make sure it's a valid one - good to continue if validPhoto = true or a blank string (meaning no photo)
        if (validPhoto === '' || validPhoto === true) {
          // then, make sure our data doesn't already exist if we're adding a new item or if we've changed the name or brand with an edit
          if (!docExists) {
            // we're all good!
            formIsValid = true;
          }
          // if we're editing, it should already exist anyways
          if (docExists && type === 'edit') {
            formIsValid = true;
          }
        }
      }

      // now, check each field for what the error is, push the error text to our errors array, and add the error border
      if (!data.brand) {
        errors.push('Brand name is required.');
        selectors.brand.classList.add('error-border');
      }
      if (!data.name) {
        errors.push('Name of color is required.');
        selectors.name.classList.add('error-border');
      }
      if (!data.colorGroup) {
        this.errors.push('Color group selection is required.');
        selectors.color.classList.add('error-border');
      }
      if (validPhoto === false) {
        this.errors.push('Please add a file that ends in .jpg, .jpeg, or .png, and is below 5MB in size.');
        selectors.photo.classList.add('error-border');
      }
      if (docExists && type === 'add') {
        this.errors.push(
          'It looks like an item with this name and brand already exists in your collection! Please double check your info or go back to the full collection to verify.'
        );
        selectors.name.classList.add('error-border');
        selectors.brand.classList.add('error-border');
      }

      return [formIsValid, errors];
    },
  },
};
