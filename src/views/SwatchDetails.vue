<template>
  <section>
    <router-link :to="{ name: 'home' }" class="route-link back">← Back to All Items</router-link>
    <div class="swatchWrapper">
      <img v-if="loading" src="../assets/loading.svg" alt="Loading..." class="loading" />
      <div v-else class="swatchWrapper">
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
        <div class="adjustments">
          <button class="edit" @click="editItem">EDIT ITEM DETAILS</button>
          <button class="delete" @click="deleteItem">DELETE THIS ITEM</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        swatch: {},
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.dbStore.loading,
      }),
    },
    async mounted() {
      this.swatch = await this.getSwatch(this.$attrs.id);
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
        getSwatch: 'dbStore/getSingleSwatch',
        deleteFile: 'dbStore/removeSingleSwatch',
        deletePhoto: 'storageStore/removeOldPhoto',
      }),
      deleteItem() {
        const photoToRemove = this.swatch.storageUri;
        if (photoToRemove) {
          this.deletePhoto(photoToRemove)
            .then(() => {
              this.$toasted.global.successToast({
                message: 'Photo removed from storage successfully.',
              });
            })
            .catch(function (error) {
              this.$toasted.global.errorToast({
                message: `Problem deleting photo for this item: ${error}`,
              });
            });
        }
        this.deleteFile(this.$attrs.id)
          .then(() => {
            this.$toasted.global.successToast({
              message: 'This item has been removed!',
            });
          })
          .then(() => {
            this.$router.push({ name: 'home' });
          })
          .catch(function (error) {
            this.$toasted.global.errorToast({
              message: `Hmm, something happened while deleting this item: ${error}`,
            });
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
    margin-left: 3%;
  }

  .loading {
    margin: 0 auto;
    width: 20%;
  }

  .loading img {
    width: 85%;
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
    font-family: var(--serif);
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
    letter-spacing: 0.025rem;
    font-weight: 700;
    width: 40%;
    text-align: right;
    vertical-align: bottom;
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
    width: 40%;
    border-radius: 7px;
    border: none;
    box-shadow: 3px 3px 7px 0 var(--dark-bg);
    cursor: pointer;
    font-family: var(--serif);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.025rem;
  }

  .edit {
    background: var(--accent);
  }

  .delete {
    background: var(--dark-accent);
    color: var(--light-font-color);
  }

  @media screen and (min-width: 750px) {
    .swatchName {
      font-size: 1.8rem;
    }

    .swatchDetails {
      width: 65%;
    }

    td {
      width: 50%;
    }

    .label {
      width: 52%;
      font-size: 0.9rem;
    }

    .info {
      font-size: 1.1rem;
    }

    button {
      width: 50%;
      font-size: 1rem;
    }

    .edit {
      margin-right: 6%;
      margin-left: 2%;
    }

    .delete {
      margin-left: 2%;
    }
  }

  @media screen and (min-width: 1000px) {
    .swatchWrapper {
      margin-top: 3.5%;
    }
  }
</style>
