<template>
  <div class="home">
    <FilterBar />
    <transition name="slide-fade" mode="out-in">
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
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import FilterBar from '../components/FilterBar.vue';

  export default {
    components: {
      FilterBar,
    },
    computed: mapState({
      signedIn: (state) => state.signedIn,
    }),
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
</style>
