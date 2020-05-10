<template>
  <div class="home">
    <div v-if="!signedIn" class="intro">
      <h2>Ready to keep track of your personal items while out and about?</h2>
      <p>
        Ever run into this problem - you're out at the store, browsing your favorite items. But then you stop to wonder
        - "Do I already own this one?" Or maybe it's "Do I have enough purples?"
      </p>

      <p>
        Well wonder no longer! Now, you can keep track of the items you own for your favorite collections, and easily
        verify if you've already got that shade or style!
      </p>

      <p>
        Just sign in above, and be on your way to making your life easier!
      </p>
    </div>
    <!-- <ItemSwatch v-for="swatch in swatches" :key="swatch.id">
      <figure>
        <img :src="swatch.img" alt="" />
        <figcaption>{{ swatch.name }}</figcaption>
      </figure>
    </ItemSwatch> -->
  </div>
</template>

<script>
  // import ItemSwatch from '@/components/ItemSwatch.vue'

  export default {
    data() {
      return {
        signedIn: false,
      };
    },
    // components: {
    //   ItemSwatch
    // }
    created() {
      if (this.$store.state.currentUser.userId) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    },
  };
</script>

<style>
  .intro {
    margin: 3%;
    color: var(--dark-font-color);
  }
</style>
