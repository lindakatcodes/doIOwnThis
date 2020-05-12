<template>
  <div class="home">
    <FilterBar />
    <transition name="slide-fade" mode="out-in">
      <div v-if="!signedIn" key="signed-out" class="intro">
        <h2>Ready to keep track of your personal items while out and about?</h2>
        <p>
          Ever run into this problem - you're out at the store, browsing your favorite items. But then you stop to
          wonder - "Do I already own this one?" Or maybe it's "Do I have enough purples?"
        </p>

        <p>
          Well wonder no longer! Now, you can keep track of the items you own for your favorite collections, and easily
          verify if you've already got that shade or style!
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
  .intro {
    margin: 3%;
    color: var(--dark-font-color);
  }

  .add-new-link {
    color: var(--dark-font-color);
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
    font-weight: 600;
    margin-left: 15%;
    margin-top: 5%;
  }

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
</style>
