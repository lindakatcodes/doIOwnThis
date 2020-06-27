<template>
  <div>
    <h2>Collection Stats</h2>
    <div v-if="swatches.length === 0 || !swatches" class="no-data">
      <p>
        It looks like you either don't have any polishes in your collection yet, or the data didn't show up.
      </p>
      <p>
        Please
        <router-link :to="{ name: 'home' }" class="route-link stats-link">go back to the home page</router-link> to refresh or add
        some polishes!
      </p>
    </div>
    <div v-else class="results-container">
      <div class="results total">
        <h3>TOTAL POLISHES:</h3>
        <p>{{ swatches.length }} Polishes</p>
      </div>
      <div class="results brand">
        <h3>BRANDS:</h3>
        <p v-for="(brand, index) in brands" :key="index">{{ brand.name }}: {{ brand.qty }}</p>
      </div>
      <div class="results color">
        <h3>COLOR GROUPS:</h3>
        <p v-for="(color, index) in colors" :key="index">{{ color.name }}: {{ color.qty }}</p>
      </div>
      <div class="results finish">
        <h3>FINISHES:</h3>
        <p v-for="(finish, index) in finishes" :key="index">{{ finish.name }}: {{ finish.qty }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        brands: [],
        colors: [],
        finishes: [],
      };
    },
    computed: {
      ...mapState({
        swatches: (state) => state.dbStore.allSwatches,
      }),
    },
    mounted() {
      this.computeStats();
    },
    methods: {
      computeStats() {
        const allBrands = [];
        const allColors = [];
        const allFinishes = [];

        this.swatches.map((polish) => {
          const thisBrand = polish.brand;
          const thisColor = polish.colorGroup;
          const thisFinish = polish.finish;

          const brandExists = allBrands.some((el) => el.name === thisBrand);
          if (!brandExists) {
            allBrands.push({ name: thisBrand, qty: 1 });
          } else {
            const indexOfBrand = allBrands.findIndex((el) => el.name === thisBrand);
            allBrands[indexOfBrand].qty++;
          }

          const colorExists = allColors.some((el) => el.name === thisColor);
          if (!colorExists) {
            allColors.push({ name: thisColor, qty: 1 });
          } else {
            const indexOfColor = allColors.findIndex((el) => el.name === thisColor);
            allColors[indexOfColor].qty++;
          }

          const FinishExists = allFinishes.some((el) => el.name === thisFinish);
          if (!FinishExists) {
            allFinishes.push({ name: thisFinish, qty: 1 });
          } else {
            const indexOfFinish = allFinishes.findIndex((el) => el.name === thisFinish);
            allFinishes[indexOfFinish].qty++;
          }

          return polish;
        });

        const sortedBrands = this.sortedList(allBrands);
        const sortedColors = this.sortedList(allColors);
        const sortedFinishes = this.sortedList(allFinishes);

        console.log(sortedBrands, sortedColors, sortedFinishes);

        this.brands = sortedBrands;
        this.colors = sortedColors;
        this.finishes = sortedFinishes;
      },
      sortedList(arr) {
        return arr.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      },
    },
  };
</script>

<style scoped>
  .stats-link {
    margin-left: 0;
    font-size: 0.9rem;
  }

  .stats-link:hover {
    font-size: 0.925rem;
  }

  h2 {
    text-align: center;
    font-size: 2rem;
    text-decoration: 4px underline var(--accent);
  }

  h3 {
    font-size: 1.1rem;
  }

  .results-container {
    margin-left: 18%;
    margin-bottom: 6%;
    width: 60%;
  }

  .results {
    margin-bottom: 10%;
  }

  .results p {
    margin-left: 7%;
  }

  @media screen and (min-width: 450px) {
    .results-container {
      margin-left: 22%;
    }
  }

  @media screen and (min-width: 600px) {
    .results-container {
      margin-left: 11%;
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      justify-content: center;
    }

    .results {
      width: 45%;
      margin-bottom: 4%;
      margin-left: 0;
    }

    .total {
      width: 100%;
      text-align: center;
    }

    .total h3 {
      font-size: 1.3rem;
    }

    .total p {
      margin-left: 3%;
      font-size: 1.2rem;
    }

    .brand,
    .color,
    .finish {
      padding-left: 5%;
    }

    .brand p,
    .color p,
    .finish p {
      margin-left: 8%;
    }
  }

  @media screen and (min-width: 750px) {
    .results-container {
      margin-left: 9%;
    }

    .results p {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    .brand,
    .color,
    .finish {
      padding-left: 2%;
      width: 31%;
    }
  }

  @media screen and (min-width: 1000px) {
    .results-container {
      width: 90%;
      margin-left: 6%;
    }

    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    .results p {
      font-size: 1.25rem;
    }

    .results {
      margin-bottom: 2%;
    }

    .total h3 {
      font-size: 1.5rem;
    }

    .total p {
      font-size: 1.35rem;
    }
  }
</style>
