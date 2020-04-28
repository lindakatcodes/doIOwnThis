<template>
  <div class="home">
    <ItemSwatch v-for="swatch in swatches" :key="swatch.id">
      <figure>
        <img :src="swatch.img" alt="" />
        <figcaption>{{ swatch.name }}</figcaption>
      </figure>
    </ItemSwatch>
  </div>
</template>

<script>
import ItemSwatch from '@/components/ItemSwatch.vue'

export default {
  components: {
    ItemSwatch
  }
}
</script>
