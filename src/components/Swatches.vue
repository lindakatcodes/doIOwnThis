<template>
  <section class="allSwatches">
    <figure v-for="swatch in swatches" :key="swatch.id">
      <img :src="swatch.image" />
      <figcaption class="caption">{{ swatch.name }}</figcaption>
    </figure>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import { db, auth } from '../../firebaseConfig';

  export default {
    data() {
      return {
        swatches: [],
        user: this.$store.state.currentUser,
      };
    },
    mounted() {
      this.$nextTick(function () {
        let currentUserId;
        if (!this.user) {
          currentUserId = auth.currentUser.uid;
        } else {
          currentUserId = this.user.userId;
        }
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
      });
    },
  };
</script>

<style scoped></style>
