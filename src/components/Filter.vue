<template>
  <div>
    <br>
    <br>
    <form class="form-row justify-content-md-center">
      <div class="form-group col-xg-2">
        <b-button
          id="classBtn"
          :class="(openClass || openManufacturer || openType) ? 'collapsed' : null"
          :aria-expanded="(openClass || openManufacturer || openType) ? 'true' : 'false'"
          aria-controls="collapse-container"
          @click="toggleCollapse"
          variant="link"
        >{{ddTextClass}}</b-button>
      </div>
      <div class="form-group col-xg-2">
        <b-button
          id="typeBtn"
          :class="(openClass || openManufacturer || openType) ? 'collapsed' : null"
          :aria-expanded="(openClass || openManufacturer || openType) ? 'true' : 'false'"
          aria-controls="collapse-container"
          @click="toggleCollapse"
          variant="link"
        >{{ddTextType}}</b-button>
      </div>
      <div class="form-group col-xg-2">
        <b-button
          id="manuBtn"
          :class="(openClass || openManufacturer || openType) ? 'collapsed' : null"
          :aria-expanded="(openClass || openManufacturer || openType) ? 'true' : 'false'"
          aria-controls="collapse-container"
          @click="toggleCollapse"
          variant="link"
        >{{ddTextManufacturer}}</b-button>
        <b-button :disabled="false" variant="link" @click="onClearFilter">CLEAR</b-button>
      </div>
    </form>
    <div class="row justify-content-md-center">
      <b-collapse id="collapse-container" :visible="collapseGlobal">
        <div class="row" v-show="openClass">
          <div class="col-xl-12 centered text-center">
            <b-button
              variant="outline-secondary"
              class="buttonClass"
              v-for="(carClass, index) in carClasses"
              :key="index"
              @click="onFilterClass"
            >{{carClass}}</b-button>
          </div>
        </div>
        <div class="row" v-show="openType">
          <div class="col-xl-12 centered text-center">
            <b-button
              variant="outline-secondary"
              class="buttonType"
              v-for="(type, index) in types"
              :key="index"
              @click="onFilterType"
            >{{type | toUpperCase}}</b-button>
          </div>
        </div>
        <div class="row" v-show="openManufacturer">
          <div class="col-xl-12 centered text-center">
            <b-button
              variant="outline-secondary"
              class="buttonManu"
              v-for="(manufacturer, index) in manufacturers"
              :key="index"
              @click="onFilterManufacturer"
            >{{manufacturer | toUpperCase}}</b-button>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      openClass: false,
      openType: false,
      openManufacturer: false,
      openClassDiv: false,
      openManuDiv: false,
      openTypeDiv: false,
      carClasses: ["D", "C", "B", "A", "S1", "S2", "X"]
    };
  },
  methods: {
    ...mapMutations([
      "SET_FILTER_CLASS",
      "SET_FILTER_TYPE",
      "SET_FILTER_MANUFACTURER"
    ]),
    toggleCollapse() {
      this.toggleDivs(event.target.id);
      this.toggleBtns(event.target.id);
    },
    toggleDivs(val) {
      //this always keep the filter div already pre-rendered to avoid the weird jump caused by collapsing
      this.openClassDiv = true;
      this.openTypeDiv = true;
      this.openManuDiv = true;
      switch (val) {
        case "classBtn":
          this.openTypeDiv = false;
          this.openManuDiv = false;
          break;
        case "typeBtn":
          this.openClassDiv = false;
          this.openManuDiv = false;
          break;
        case "manuBtn":
          this.openClassDiv = false;
          this.openTypeDiv = false;
          break;
      }
    },
    toggleBtns(val) {
      switch (val) {
        case "classBtn":
          if (!this.openClass) {
            this.openType = false;
            this.openManufacturer = false;
          }
          this.openClass = !this.openClass;
          break;
        case "typeBtn":
          if (!this.openType) {
            this.openClass = false;
            this.openManufacturer = false;
          }
          this.openType = !this.openType;
          break;
        case "manuBtn":
          if (!this.openManufacturer) {
            this.openClass = false;
            this.openType = false;
          }
          this.openManufacturer = !this.openManufacturer;
          break;
      }
    },
    onFilterClass() {
      this.SET_FILTER_CLASS(event.target.textContent);
      this.closeFilterCriteria();
    },
    onFilterType() {
      this.SET_FILTER_TYPE(event.target.textContent);
      this.closeFilterCriteria();
    },
    onFilterManufacturer() {
      this.SET_FILTER_MANUFACTURER(event.target.textContent);
      this.closeFilterCriteria();
    },
    onClearFilter() {
      //Let's not commit if the filter criteria is already cleared
      if (
        this.filtering.carClass != "All" ||
        this.filtering.type != "All" ||
        this.filtering.manufacturer != "All"
      ) {
        this.SET_FILTER_CLASS("All");
        this.SET_FILTER_TYPE("All");
        this.SET_FILTER_MANUFACTURER("All");
      }
      this.closeFilterCriteria();
    },
    closeFilterCriteria() {
      this.openClass = this.openType = this.openManufacturer = false;
    }
  },
  computed: {
    ...mapGetters(["filtering", "localCarsObject"]),
    types: function() {
      if (this.localCarsObject) {
        return Object.values(this.localCarsObject.types).sort();
      } else {
        return null;
      }
    },
    manufacturers: function() {
      if (this.localCarsObject) {
        return Object.values(this.localCarsObject.manufacturers).sort();
      } else {
        return null;
      }
    },
    collapseGlobal: function() {
      return this.openClass || this.openType || this.openManufacturer;
    },
    ddTextClass: function() {
      return this.filtering.carClass == "All"
        ? "CLASS▾"
        : `${this.filtering.carClass}▾`;
    },
    ddTextType: function() {
      return this.filtering.type == "All" ? "TYPE▾" : `${this.filtering.type}▾`;
    },
    ddTextManufacturer: function() {
      return this.filtering.manufacturer == "All"
        ? "MANUFACTURER▾"
        : `${this.filtering.manufacturer}▾`;
    }
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
  },
  created() {
    eventBus.$on("closeCriteria", () => {
      this.closeFilterCriteria();
    });
  }
};
</script>

<style scoped>
button.btn.btn-secondary.btn-sm {
  background-color: transparent;
  border-color: transparent;
  color: #343a40;
}
button.btn.btn-secondary.btn-sm:hover {
  background-color: transparent;
  border-color: transparent;
  color: #adadad;
}
.clearButton {
  color: #343a40;
}
.clearButton:hover {
  color: #adadad;
  text-decoration: none;
}
.buttonClass {
  margin: 1px;
  width: 50px;
}
.buttonType {
  margin: 1px;
  width: 250px;
}
.buttonManu {
  margin: 1px;
  width: 250px;
}
</style>
