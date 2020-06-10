<template>
  <section>
    <router-link :to="{ name: 'Home' }" class="back">← Back to All Items</router-link>
    <div class="swatchWrapper">
      <img :src="swatch.image" class="swatchImage" />
      <h2 class="swatchName">{{ swatch.name }}</h2>
      <table class="swatchDetails">
        <tr>
          <td class="label">Brand:</td>
          <td class="info">{{ swatch.brand }}</td>
        </tr>
        <tr>
          <td class="label">Sub Brand:</td>
          <td v-if="swatch.subBrand != ''" class="info">{{ swatch.subBrand }}</td>
          <td v-else class="info">N/A</td>
        </tr>
        <tr>
          <td class="label">Color Group:</td>
          <td class="info">{{ swatch.colorGroup }}</td>
        </tr>
        <tr>
          <td class="label">Finish:</td>
          <td v-if="swatch.finish != ''" class="info">{{ swatch.finish }}</td>
          <td v-else class="info">N/A</td>
        </tr>
      </table>
    </div>
    <div class="adjustments">
      <button class="edit" @click="editItem">Edit Item Details</button>
      <button class="delete" @click="deleteItem">Delete This Item</button>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        swatch: {},
      };
    },
    computed: {
      ...mapGetters({
        getSwatch: 'dbStore/getSingleSwatch',
      }),
    },
    mounted() {
      this.swatch = this.getSwatch(this.$attrs.id);
    },
    methods: {
      editItem() {
        // call route to edit form w/ swatch info as prop
        this.$router.push({
          name: 'edit',
          props: {
            id: this.$attrs.id,
          },
        });
      },
      ...mapActions({
        deleteFile: 'dbStore/removeSingleSwatch',
        deletePhoto: 'storageStore/removeOldPhoto',
      }),
      deleteItem() {
        const photoToRemove = this.swatch.storageUri;
        if (photoToRemove) {
          this.deletePhoto(photoToRemove)
            .then(() => {
              console.log('Photo deleted successfully!');
            })
            .catch(function (error) {
              console.log('Problem deleting photo ', error);
            });
        }
        this.deleteFile(this.$attrs.id)
          .then(() => {
            console.log('Item deleted successfully!');
            this.$router.push({ name: 'Home' });
          })
          .catch(function (error) {
            console.log('Problem deleting file ', error);
          });
      },
    },
  };
</script>

<style scoped>
  section {
    margin-top: 3%;
    margin-bottom: 10%;
  }

  .back {
    color: var(--dark-font-color);
    font-weight: 600;
    margin-left: 3%;
    padding: 1% 2%;
    text-decoration: none;
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 35%, transparent 0, transparent);
  }

  .back:hover {
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 45%, transparent 0, transparent);
    font-size: 1.025rem;
  }

  .swatchWrapper {
    margin-top: 7%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swatchImage {
    max-width: 90%;
    max-height: 325px;
    border: 2px solid var(--dark-font-color);
    object-fit: cover;
    border-radius: 5px;
  }

  .swatchName {
    width: 80%;
    text-align: center;
    text-transform: capitalize;
  }

  .swatchDetails {
    table-layout: fixed;
    width: 80%;
  }

  td {
    padding: 2%;
  }

  .label {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
    width: 40%;
    text-align: right;
  }

  .info {
    text-transform: capitalize;
  }

  .adjustments {
    margin-top: 3%;
    display: flex;
    justify-content: space-evenly;
  }

  button {
    padding: 3%;
    border-radius: 7px;
    border: none;
    box-shadow: 3px 3px 7px 0 var(--dark-bg);
    cursor: pointer;
  }

  .edit {
    background: var(--accent);
  }

  .delete {
    background: var(--dark-accent);
    color: var(--light-font-color);
  }
</style>
