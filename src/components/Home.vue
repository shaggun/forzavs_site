<template>
  <div class="container">
    <span class="selectedGame">
      <h6 class="selectedGameText">{{selectedGameText}}</h6>
    </span>
    <b-collapse id="collapse-filter" :visible="filterOpen">
      <app-filter></app-filter>
    </b-collapse>
    <br>
    <hr>
    <b-collapse id="collapse-compare" :visible="compareOpen">
      <app-compare></app-compare>
    </b-collapse>
    <br>
    <div class="row spinnerContainer" v-show="loadingData">
      <b-spinner class="spinner" label="Spinning"></b-spinner>
    </div>
    <app-cars></app-cars>
  </div>
</template>
 
<script>
import Filter from "./Filter";
import Cars from "./Cars";
import Compare from "./Compare";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "filterOpen",
      "selectedGameText",
      "loadingData",
      "comparedCars"
    ]),
    compareOpen: function() {
      return this.comparedCars.length > 0 ? true : false;
    }
  },
  components: {
    appFilter: Filter,
    appCars: Cars,
    appCompare: Compare
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 1);
}
.selectedGame {
  position: relative;
}
.selectedGameText {
  position: absolute;
  margin-top: 10px;
  white-space: nowrap;
  text-shadow: 1px 1px 1px rgb(190, 190, 190);
}
.spinnerContainer {
  text-align: center;
}
.spinner {
  margin: auto;
}
</style>

