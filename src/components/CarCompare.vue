<template>
  <div id="card" class="col-md-6 col-xl-3">
    <div class="btnHolder" style="max-width: 20rem;">
      <b-button @click="removeCompare" variant="link" size="sm" class="my-2 my-sm-0 removeBtn">✖</b-button>
    </div>
    <b-card style="max-width: 20rem;" class="mb-2 cardFrame" bg-variant="dark" text-variant="white">
      <h6 class="manufacturer" slot="header">{{car.manufacturer | toUpperCase}}</h6>
      <h6 class="year">{{car.year}}</h6>
      <h5 class="vehicle" :class="{vehicleLongText: animText}">{{car.vehicle | toUpperCase}}</h5>
      <h6 class="type">{{car.type | toUpperCase}}</h6>
      <h6 class="rarity" :style="rarityColor">{{car.rarity | toUpperCase}}</h6>
      <h6 slot="footer">{{car.value}}</h6>
      <div class="specs">
        <div class="specBar">
          <app-progress height="8px">
            <app-progress-bar :value="car.speed*10"></app-progress-bar>
          </app-progress>
          <div class="specName">SPEED</div>
          <div class="specVal">{{car.speed}}</div>
        </div>
        <div class="specBar">
          <app-progress height="8px">
            <app-progress-bar :value="car.handling*10"></app-progress-bar>
          </app-progress>
          <div class="specName">HANDLING</div>
          <div class="specVal">{{car.handling}}</div>
        </div>
        <div class="specBar">
          <app-progress height="8px">
            <app-progress-bar :value="car.acceleration*10"></app-progress-bar>
          </app-progress>
          <div class="specName">ACCELERATION</div>
          <div class="specVal">{{car.acceleration}}</div>
        </div>
        <div class="specBar">
          <app-progress height="8px">
            <app-progress-bar :value="car.launch*10"></app-progress-bar>
          </app-progress>
          <div class="specName">LAUNCH</div>
          <div class="specVal">{{car.launch}}</div>
        </div>
        <div class="specBar">
          <app-progress height="8px">
            <app-progress-bar :value="car.braking*10"></app-progress-bar>
          </app-progress>
          <div class="specName">BRAKING</div>
          <div class="specVal">{{car.braking}}</div>
        </div>
      </div>
      <div class="classRow">
        <div class="classCategoryBox" :style="classColor">
          <div class="classCategoryLetter">{{car.class}}</div>
          <div class="classPIBox">{{car.pi}}</div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import progress from "bootstrap-vue/es/components/progress/progress";
import progressBar from "bootstrap-vue/es/components/progress/progress-bar";
export default {
  props: ["car"],
  methods: {
    removeCompare() {
      this.$store.commit("REMOVE_CAR_COMPARE", this.car);
    }
  },
  computed: {
    classColor: function() {
      switch (this.car.class) {
        case "D": //skyblue
          return { backgroundColor: "#2c9fe5" };
        case "C": //yellow
          return { backgroundColor: "#FFC107" };
        case "B": //orange
          return { backgroundColor: "#f1591c" };
        case "A": //red
          return { backgroundColor: "#F44336" };
        case "S1": //purple
          return { backgroundColor: "#9533f8" };
        case "S2": //blue
          return { backgroundColor: "#4157e9" };
        case "X": //green
          return { backgroundColor: "#1c9b4f" };
      }
    },
    rarityColor: function() {
      switch (this.car.rarity.toLowerCase()) {
        case "common": //green
          return { backgroundColor: "#1c9b4f" };
        case "epic": //purple
          return { backgroundColor: "#6f26bc" };
        case "forza":
          return {
            //from pink to blue
            backgroundImage: "linear-gradient(90deg,#e83bdd, #446efe"
          };
        case "legendary": //orange
          return { backgroundColor: "#ff9d00" };
        case "rare": //skyblue
          return { backgroundColor: "#2c9fe5" };
      }
    },
    animText: function() {
      return this.car.vehicle.length > 20 ? true : false;
    }
  },
  filters: {
    toUpperCase(value) {
      if (isNaN(value)) {
        return value.toUpperCase();
      } else {
        return value;
      }
    }
  },
  components: {
    appProgress: progress,
    appProgressBar: progressBar
  }
};
</script>

<style scoped>
#card {
  margin-bottom: 20px;
  text-align: -webkit-center;
  text-align: -moz-center;
}
.cardFrame {
  overflow: hidden;
}
.manufacturer {
  white-space: nowrap;
}
.card-header {
  text-align: center;
  background-color: rgb(25, 189, 150);
}
.card-footer {
  text-align: center;
  background-color: rgb(25, 189, 150);
}
.year {
  text-align: center;
  margin-top: -15px;
}
.rarity {
  text-align: center;
  background-color: rgb(243, 152, 34);
  position: absolute;
  padding-top: 2px;
  padding-bottom: 2px;
  left: 0;
  right: 0;
}
.vehicle {
  text-align: center;
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-shadow: 2px 1px 2px #929292;
  white-space: nowrap;
}
.vehicleLongText {
  animation: animVehicleText 8s linear infinite alternate;
}
@keyframes animVehicleText {
  0% {
    -moz-transform: translateX(100%); /* Firefox bug fix */
    -webkit-transform: translateX(100%); /* Firefox bug fix */
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Firefox bug fix */
    -webkit-transform: translateX(-100%); /* Firefox bug fix */
    transform: translateX(-100%);
  }
}
.type {
  text-align: center;
}
.specs {
  margin-top: 55px;
  margin-left: -5px;
}
.specBar {
  position: relative;
  margin-left: -10px;
  margin-right: 15px;
  margin-top: 30px;
}
.specName {
  position: absolute;
  font-weight: 500;
  margin-top: -30px;
}
.specVal {
  position: absolute;
  background-color: white;
  color: #6c757d;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  padding: 1px;
  width: 26px;
  font-weight: 700;
  margin-top: -17px;
  margin-right: -31px;
  right: 0;
}
.classRow {
  position: relative;
  margin-top: 10px;
  margin-bottom: 30px;
}
.classCategoryBox {
  position: absolute;
  background-color: blue;
  max-width: 70px;
  min-width: 70px;
  padding-left: 7px;
  padding-top: 4px;
  margin-left: -10px;
  height: 30px;
  border-radius: 5px 5px 5px 5px;
}
.classCategoryLetter {
  position: absolute;
  font-weight: 500;
}
.classPIBox {
  position: absolute;
  background-color: white;
  color: #343a40;
  text-align: center;
  font-weight: 700;
  max-width: 40px;
  min-width: 40px;
  margin-top: -1px;
  margin-left: 20px;
  border-radius: 0px 3px 3px 0px;
}
.addCompareBtn {
  position: absolute;
  font-weight: 500;
  right: 0;
  margin-right: -12px;
}
.cboxCompare {
  position: absolute;
  font-weight: 500;
  right: 0;
  margin-right: -12px;
  margin-top: 3px;
}
.progress {
  background-color: #6c757d;
}
.progress .progress-bar {
  background-color: white;
}
.topSpeed {
  text-align: center;
  margin-top: 50px;
  margin-left: -10px;
  margin-bottom: -5px;
}
.topSpeedBtn {
  font-weight: 500;
  width: 150px;
  margin: 0 auto;
}
.removeBtn {
  display: block;
  position: absolute;
  margin-top: -30px !important;
  font-weight: 900;
  width: 30px;
}
.btnHolder {
  position: relative;
  margin-top: 25px;
}
</style>
