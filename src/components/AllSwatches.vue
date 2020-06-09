<template>
  <div>
    <p v-if="swatches.length == 0">Nothing to show yet! Add some items to see them here.</p>
    <p v-else>Click on a swatch to see it's full details!</p>
    <div class="allSwatches">
      <Swatch v-for="swatch in swatches" :key="swatch.id" :swatch="swatch" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Swatch from './Swatch.vue';
  import { db } from '../../firebaseConfig';

  export default {
    components: {
      Swatch,
    },
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
        .orderBy('lastUpdated', 'desc')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const currSwatch = doc.data();
            currSwatch.id = doc.id;
            buildSwatches.push(currSwatch);
          });
        });
      this.swatches = buildSwatches;
    },
  };
</script>

<style scoped>
  p {
    margin-top: 3%;
    text-align: center;
  }

  .allSwatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.25rem;
    justify-items: center;
    align-items: start;
    margin-top: 3%;
  }
</style>
