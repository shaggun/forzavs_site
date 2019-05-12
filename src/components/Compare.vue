<template>
  <div class="parentCompare">
    <br>
    <b-button
      :class="showCollapse ? 'collapsed' : null"
      :aria-expanded="showCollapse ? 'true' : 'false'"
      aria-controls="collapse-compare"
      @click="showCollapse = !showCollapse"
      size="sm"
    >Compare ({{comparedCarsNum}})</b-button>
    <b-button size="sm" variant="link" :disabled="true" class="my-2 my-sm-0">Up to 4</b-button>
    <b-collapse id="collapse-compare" v-model="showCollapse" class="mt-2">
      <div class="row" v-if="comparedCarsNum>0">
        <app-car-compare v-for="(carc, index) in carsC" :car="carc" :key="index"></app-car-compare>
      </div>
      <hr>
    </b-collapse>
  </div>
</template>

<script>
import CarCompare from "./CarCompare";
export default {
  data() {
    return {
      showCollapse: false
    };
  },
  computed: {
    comparedCarsNum: function() {
      if (this.$store.getters.comparedCars.length < 1) {
        this.showCollapse = false;
      }
      return this.$store.getters.comparedCars.length;
    },
    carsC: function() {
      return this.$store.getters.comparedCars;
    }
  },
  components: {
    appCarCompare: CarCompare
  }
};
</script>

<style scoped>
.parentCompare {
  position: relative;
}
.comparedNumber {
  position: absolute;
  margin-top: -27px;
  margin-left: 85px;
  text-align: center;
  border-radius: 15px;
  color: #6c757d;
}
</style>
