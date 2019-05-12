import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localGames: null,
    remoteGames: null,
    selectedGameText: "FORZA HORIZON 4",
    selectedGameKey: "forzahorizon4",
    defaultGame: "forzahorizon4",
    localCarsObject: null, //this is a copy if local storage is lost live
    loadingData: true,
    filterOpen: false,
    filterTextSearch: "",
    resultsJson: [],
    results: [],
    comparedCars: [],
    sortCategory: "Manufacturer",
    sortOrder: "Ascending",
    filterClass: "All",
    filterType: "All",
    filterManufacturer: "All",
    pagMultiplier: 1,
    pagElements: 40
  },
  actions,
  getters,
  mutations
});
