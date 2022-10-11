<template>
  <transition name="slide-fade" mode="out-in">
    <div class="home">
      <FilterBar />
      <div v-if="!$auth.isAuthenticated" key="signed-out" class="intro">
        <h2>Welcome to the new home of your nail polish collection!</h2>
        <p>
          Ever run into this problem - you're out at the store, browsing polishes, as one does. You see a color you LOVE - and
          have that moment of "Wait...do I already have this"?
        </p>

        <p>
          Well wonder no longer! Now, you can keep track of your whole collection, and easily verify if you've already got that
          shade or style!
        </p>

        <p>
          Just sign in above, and be on your way to making your life easier!
        </p>
      </div>
      <div v-else key="signed-in">
        <router-link :to="{ name: 'add-new' }" class="route-link add-new-link">Got something new? Add it here!</router-link>
        <AllSwatches></AllSwatches>
      </div>
    </div>
  </transition>
</template>

<script>
  // import { mapState } from 'vuex';
  import FilterBar from '../components/FilterBar.vue';
  import AllSwatches from '../components/AllSwatches.vue';

  export default {
    components: {
      FilterBar,
      AllSwatches,
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

  .route-link {
    padding: 1% 1.5%;
    position: relative;
    margin-left: 12%;
    color: var(--dark-font-color);
    font-family: var(--serif);
    font-weight: 700;
    text-decoration: none;
    background-image: linear-gradient(
      0deg,
      transparent 0,
      transparent 15%,
      var(--accent) 15%,
      var(--accent) 40%,
      transparent 40%,
      transparent
    );
    z-index: 1;
    transition: font-size 0.25s cubic-bezier(0.47, 0.01, 0.38, 1.01);
  }

  .route-link::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      0deg,
      transparent 0,
      transparent 15%,
      var(--accent) 15%,
      var(--accent) 50%,
      transparent 50%,
      transparent
    );
    z-index: -1;
    transition: opacity 0.25s cubic-bezier(0.47, 0.01, 0.38, 1.01);
    opacity: 0;
  }

  .route-link:hover {
    font-size: 1.025rem;
  }

  .route-link:hover::before {
    opacity: 1;
  }

  @media screen and (min-width: 450px) {
    .route-link {
      margin-left: 20%;
    }
  }

  @media screen and (min-width: 600px) {
    .route-link {
      margin-left: 27%;
    }
  }

  @media screen and (min-width: 750px) {
    .route-link {
      margin-left: 27%;
      font-size: 1.3rem;
      background-image: linear-gradient(
        0deg,
        transparent 0,
        transparent 25%,
        var(--accent) 25%,
        var(--accent) 45%,
        transparent 45%,
        transparent
      );
    }

    .route-link::before {
      background-image: linear-gradient(
        0deg,
        transparent 0,
        transparent 25%,
        var(--accent) 25%,
        var(--accent) 55%,
        transparent 55%,
        transparent
      );
    }

    .route-link:hover {
      font-size: 1.325rem;
    }
  }

  @media screen and (min-width: 1000px) {
    .route-link {
      font-size: 1.4rem;
      margin-left: 30%;
    }

    .route-link:hover {
      font-size: 1.425rem;
    }
  }
</style>
