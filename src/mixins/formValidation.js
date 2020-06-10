import { db, auth } from '../../firebaseConfig';

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
    async checkSwatchExists(brand, name) {
      const nameQuery = [];
      const capitalName = this.titleCase(name);
      const nameVariations = [name.toLowerCase(), name.toUpperCase(), capitalName];
      let foundMatch = false;

      // run a query that checks to see if any variation of the polish name shows up, & return those results
      await db
        .collection('nailPolish')
        .where('addedBy', '==', auth.currentUser.uid)
        .where('name', 'in', nameVariations)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            nameQuery.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });

      // then, go over each one and see if any have the same brand name as the provided bran
      nameQuery.forEach((doc) => {
        if (doc.brand === brand) {
          foundMatch = true;
        }
      });
      return foundMatch;
    },
    titleCase(string) {
      const firstLetter = string.charAt(0).toUpperCase();
      const restOfWord = string.slice(1).toLowerCase;
      const fullWord = firstLetter + restOfWord;
      return fullWord;
    },
    async validateForm(data, photoFile, errors, selectors) {
      let formIsValid = false;
      // first, check if an item w/ same brand & name already exists - prevent duplicates
      const docExists = await this.checkSwatchExists(data.brand, data.name);

      // then, if we have a photo file, make sure it's in our size & file type ranges
      let validPhoto = '';
      if (photoFile) {
        validPhoto = this.validatePhoto(photoFile);
      }

      // check to make sure we have values for all 3 required fields
      if (data.brand && data.name && data.colorGroup) {
        // alright, now if we have a photo file, make sure it's a valid one - good to continue if validPhoto = true or a blank string (meaning no photo)
        if (validPhoto === '' || validPhoto === true) {
          // then, make sure our data doesn't already exist
          if (!docExists) {
            // we're all good!
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
      if (docExists) {
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
