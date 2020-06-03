<template>
  <transition name="slide-fade" mode="out-in">
    <div class="home">
      <FilterBar />
      <div v-if="!signedIn" key="signed-out" class="intro">
        <h2>Welcome to the new home of your nail polish collection!</h2>
        <p>
          Ever run into this problem - you're out at the store, browsing polishes, as one does. You see a color you LOVE
          - and have that moment of "Wait...do I already have this"?
        </p>

        <p>
          Well wonder no longer! Now, you can keep track of your whole collection, and easily verify if you've already
          got that shade or style!
        </p>

        <p>
          Just sign in above, and be on your way to making your life easier!
        </p>
      </div>
      <div v-else key="signed-in">
        <router-link :to="{ name: 'add-new' }" class="add-new-link">Got something new? Add it here!</router-link>
        <p v-if="swatches.length == 0">Nothing to show yet! Add some items to see them here.</p>
        <p v-else>Click on a swatch to see it's full details!</p>
        <div class="allSwatches">
          <Swatch v-for="swatch in swatches" :key="swatch.id" :swatch="swatch" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex';
  import FilterBar from '../components/FilterBar.vue';
  import Swatch from '../components/Swatch.vue';
  import { db } from '../../firebaseConfig';

  export default {
    components: {
      FilterBar,
      Swatch,
    },
    data() {
      return {
        swatches: [],
      };
    },
    computed: mapState({
      signedIn: (state) => state.signedIn,
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
            const currSwatch = doc.data();
            currSwatch.id = doc.id;
            buildSwatches.push(currSwatch);
          });
        });
      this.swatches = buildSwatches;
    },
  };
</script>

<style>
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  }
  .slide-fade-enter-active {
    transition: all 0.8s cubic-bezier(0.61, 1.59, 0.74, 0.85);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .intro {
    margin: 4%;
    color: var(--dark-font-color);
  }

  .add-new-link {
    color: var(--dark-font-color);
    font-weight: 600;
    margin-left: 15%;
    padding: 1% 2%;
    text-decoration: none;
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 35%, transparent 0, transparent);
  }

  .add-new-link:hover {
    background-image: linear-gradient(0deg, var(--accent) 0, var(--accent) 45%, transparent 0, transparent);
    font-size: 1.025rem;
  }

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
