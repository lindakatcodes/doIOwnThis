<template>
  <router-link class="link" :to="{ name: 'single-swatch', params: { id: swatch.id } }">
    <figure class="swatch">
      <img :src="swatch.image" class="swatch-img" alt="Picture showing color of polish named in caption" />
      <figcaption class="swatch-name">{{ swatch.name }}</figcaption>
    </figure>
  </router-link>
</template>

<script>
  export default {
    props: {
      // eslint-disable-next-line vue/require-default-prop
      swatch: Object,
    },
  };
</script>

<style scoped>
  .swatch {
    width: 100px;
    height: 175px;
    margin: 3% 0;
    padding: 6% 1% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swatch-img {
    width: 100%;
    height: 57%;
    border: 2px solid var(--dark-font-color);
    border-radius: 5px;
    object-fit: cover;
  }

  .swatch-name {
    align-self: flex-start;
    margin-top: 5%;
    margin-left: 2%;
    text-transform: capitalize;
    color: var(--dark-font-color);
  }

  .link {
    text-decoration: none;
    color: var(--dark-font-color);
  }

  .link:hover {
    text-decoration: underline var(--accent);
    text-decoration-thickness: 3px;
  }

  @media screen and (min-width: 750px) {
    .swatch {
      width: 150px;
      height: 225px;
    }

    .swatch-name {
      font-size: 1.1rem;
    }
  }
</style>
