<template>
  <div>
    <div class="sortingDiv">
      <div class="totalResults" v-show="cars.length>0">{{carsTotal.length}} results</div>
      <b-button-group>
        <b-button variant="link" :disabled="true">Sort by:</b-button>
        <b-dropdown class="some" left variant="link" :text="dropdownCategory">
          <b-dropdown-item
            v-for="(category, index) in categories"
            :key="index"
            @click="onSortingCategoryChange"
          >{{category}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown left variant="link" :text="dropdownOrder | threeChars">
          <b-dropdown-item @click="onSortingOrderChange">Ascending</b-dropdown-item>
          <b-dropdown-item @click="onSortingOrderChange">Descending</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </div>
    <div class="row">
      <app-car v-for="(car, index) in cars" :car="car" :key="index"></app-car>
    </div>
    <div v-if="cars.length<1 && !loadingData" class="row">
      <div class="col-xl-12 centered text-center">
        <h4>CHECKPOINT MISSED</h4>
        <h6>YOUR SEARCH DID NOT MATCH ANY CAR</h6>
      </div>
    </div>
    <div class="row" v-if="showLoadMoreCars">
      <div class="col-xl-12 centered text-center">
        <b-button variant="link" @click="onLoadMoreCars">LOAD MORE CARS...</b-button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Car from "./Car";
import usort from "../utils/sorting.js";
import { pagMultiplier, pagElements } from "../store/getters";
import { SET_PAG_MULTIPLIER, SET_PAG_ELEMENTS } from "../store/mutations";
export default {
  data() {
    return {
      categories: [
        "Manufacturer",
        "Speed",
        "Handling",
        "Acceleration",
        "Launch",
        "Braking",
        "Performance Index"
      ]
    };
  },
  computed: {
    ...mapGetters([
      "sorting",
      "filtering",
      "filterTextSearch",
      "results",
      "resultsJson",
      "loadingData",
      "pagMultiplier",
      "pagElements"
    ]),
    dropdownCategory: function() {
      return this.sorting.category;
    },
    dropdownOrder: function() {
      return this.sorting.order;
    },
    showLoadMoreCars: function() {
      if (this.pagMultiplier * 40 >= this.carsTotal.length) {
        return false;
      } else {
        return true;
      }
    },
    cars: function() {
      let tempCars = [...this.carsTotal];
      //this.SET_PAG_ELEMENTS(this.pagMultiplier*40);
      if (this.pagMultiplier * 40 >= this.carsTotal.length) {
        return tempCars;
      } else {
        tempCars.length = this.pagMultiplier * 40;
        return tempCars;
      }
    },
    carsTotal: function() {
      //sorting cars
      this.resetPagMultiplier();
      if (this.dropdownOrder == "Ascending") {
        switch (this.dropdownCategory) {
          case "Performance Index":
            return this.filteredResults.sort(usort.byPropAscending("pi"));
          default:
            return this.filteredResults.sort(
              usort.byPropAscending(this.dropdownCategory.toLowerCase())
            );
        }
      } else {
        switch (this.dropdownCategory) {
          case "Performance Index":
            return this.filteredResults.sort(usort.byPropDescending("pi"));
          default:
            return this.filteredResults.sort(
              usort.byPropDescending(this.dropdownCategory.toLowerCase())
            );
        }
      }
    },
    filteredResults: function() {
      this.resetPagMultiplier();
      if (this.filterTextSearch.length > 1) {
        let val = this.filterTextSearch.toString().toLowerCase();
        //filtering by text search
        let filteredResults = this.resultsJson.filter(element => {
          return element.name.toLowerCase().match(val);
        });
        //filtering by criteria
        if (this.filtering.carClass != "All") {
          filteredResults = filteredResults.filter(element => {
            return element.class == this.filtering.carClass;
          });
        }
        if (this.filtering.manufacturer != "All") {
          filteredResults = filteredResults.filter(element => {
            return (
              element.manufacturer.toLowerCase() ==
              this.filtering.manufacturer.toLowerCase()
            );
          });
        }
        if (this.filtering.type != "All") {
          filteredResults = filteredResults.filter(element => {
            return (
              element.type.toLowerCase() == this.filtering.type.toLowerCase()
            );
          });
        }
        return filteredResults;
      } else {
        //there's no search by text but the results might be filtered by criteria
        let filteredResults = this.resultsJson;
        if (this.filtering.carClass != "All") {
          filteredResults = filteredResults.filter(element => {
            return element.class == this.filtering.carClass;
          });
        }
        if (this.filtering.manufacturer != "All") {
          filteredResults = filteredResults.filter(element => {
            return (
              element.manufacturer.toLowerCase() ==
              this.filtering.manufacturer.toLowerCase()
            );
          });
        }
        if (this.filtering.type != "All") {
          filteredResults = filteredResults.filter(element => {
            return (
              element.type.toLowerCase() == this.filtering.type.toLowerCase()
            );
          });
        }
        return filteredResults;
      }
    }
  },
  methods: {
    ...mapMutations([
      "SET_SORT_CATEGORY",
      "SET_SORT_ORDER",
      "SET_RESULTS",
      "SET_RESULTS_JSON",
      "SET_LOADING_DATA",
      "SET_PAG_MULTIPLIER",
      "SET_PAG_ELEMENTS"
    ]),
    ...mapActions(["reloadCars"]),
    onSortingCategoryChange(event) {
      this.SET_SORT_CATEGORY(event.target.text);
    },
    onSortingOrderChange(event) {
      this.SET_SORT_ORDER(event.target.text);
    },
    onLoadMoreCars() {
      this.SET_PAG_MULTIPLIER(this.pagMultiplier + 1);
    },
    resetPagMultiplier() {
      this.SET_PAG_MULTIPLIER(1);
    }
  },
  filters: {
    threeChars(value) {
      return value.substring(0, 3);
    }
  },
  components: {
    appCar: Car
  }
};
</script>

<style scoped>
.sortingDiv {
  position: relative;
}
.totalResults {
  position: absolute;
  margin-top: 7px;
  right: 0;
  color: #6c757d;
}
</style>
