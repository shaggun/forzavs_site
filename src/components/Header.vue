<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <div class="container">
      <b-navbar-brand>
        <router-link to="/">
          <img viewBox="0 0 50 50" height="48" src="../assets/logo3.svg" alt>
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="GAMES" left>
            <b-dropdown-item @click="onSelectGame('forzahorizon4')">
              <router-link to="/" tag="li">FORZA HORIZON 4</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="https://forzamotorsport.net/en-US/store">STORE</b-nav-item>
          <b-nav-item>
            <router-link to="/about" tag="li">ABOUT</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/feedback" tag="li">FEEDBACK</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-show="itsHomePage">
          <b-nav-form>
            <b-nav-item @click="onFilterOpen">{{filterButtonText}} Filter</b-nav-item>
            <b-form-input v-model="filterTextSearch" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { eventBus } from "../main";
import { mapGetters, mapMutations } from "vuex";
import { SET_PAG_MULTIPLIER } from "../store/mutations";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["filtering", "localCarsObject", "filterOpen"]),
    filterButtonText: function() {
      return this.filterOpen ? "▴" : "▾";
    },
    itsHomePage: function() {
      return this.$route.path == "/" ? true : false;
    },
    filterTextSearch: {
      get() {
        return this.$store.state.filterTextSearch;
      },
      set(value) {
        if (value.length > 1) {
          //we only filter if there are at least 2 chars
          this.SET_FILTER_TEXT(value);
        } else {
          this.SET_FILTER_TEXT(value);
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      "SET_FILTER_TEXT",
      "TOGGLE_FILTER_OPEN",
      "SET_SELECTED_GAME_ID",
      "SET_SELECTED_GAME_TEXT",
      "SET_FILTER_CLASS",
      "SET_FILTER_TYPE",
      "SET_FILTER_MANUFACTURER",
      "CLEAR_CAR_COMPARE",
      "SET_LOADING_DATA",
      "CLOSE_FILTER_OPEN",
      "RESET_SORTING_CRITERIA",
      "SET_PAG_MULTIPLIER"
    ]),
    onFilterOpen() {
      if (this.filterOpen) {
        eventBus.$emit("closeCriteria", true);
      }
      this.TOGGLE_FILTER_OPEN();
    },
    onSelectGame(selectedGameId) {
      //We won't reload if data hasn't been fetched yet
      if (this.localCarsObject) {
        this.SET_SELECTED_GAME_ID(selectedGameId);
        this.SET_SELECTED_GAME_TEXT(event.target.textContent);
        //Let's reset filter criteria and text search
        this.clearFilterCriteria();
        this.SET_PAG_MULTIPLIER(1);
        this.$store.dispatch("reloadCars");
      }
    },
    clearFilterCriteria() {
      this.SET_LOADING_DATA(true);
      if (
        this.filtering.carClass != "All" ||
        this.filtering.type != "All" ||
        this.filtering.manufacturer != "All"
      ) {
        this.SET_FILTER_CLASS("All");
        this.SET_FILTER_TYPE("All");
        this.SET_FILTER_MANUFACTURER("All");
      }
      eventBus.$emit("closeCriteria", true);
      this.SET_FILTER_TEXT("");
      this.CLEAR_CAR_COMPARE();
      this.CLOSE_FILTER_OPEN();
      this.RESET_SORTING_CRITERIA();
    }
  }
};
</script>

<style scoped>
</style>
