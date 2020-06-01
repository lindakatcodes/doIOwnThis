<template>
  <section class="allSwatches">
    <p v-if="swatches.length == 0">Nothing to show yet! Add some items to see them here.</p>
    <figure v-for="swatch in swatches" :key="swatch.id" class="swatch">
      <img :src="swatch.image" class="swatch-img" />
      <figcaption class="swatch-name">{{ swatch.name }}</figcaption>
    </figure>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { db } from '../../firebaseConfig';

  export default {
    data() {
      return {
        swatches: [],
      };
    },
    computed: mapState({
      setUserId: (state) => state.currentUser.userId,
    }),
    mounted() {
      const currentUserId = this.setUserId;
      const buildSwatches = [];

      db.collection('nailPolish')
        .where('addedBy', '==', currentUserId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            buildSwatches.push(doc.data());
          });
        });
      this.swatches = buildSwatches;
    },
  };
</script>

<style scoped>
  .allSwatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.25rem;
    justify-items: center;
    align-items: start;
    margin-top: 7%;
  }

  .swatch {
    width: 100px;
    height: 175px;
    margin: 3% 0;
    padding: 6% 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swatch-img {
    width: 100%;
    height: 57%;
    border: 2px solid var(--dark-font-color);
    object-fit: cover;
  }

  .swatch-name {
    align-self: flex-start;
    margin-top: 5%;
    text-transform: capitalize;
  }
</style>
