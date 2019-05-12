<template>
  <div>
    <app-header></app-header>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch("fetchGames");
    //this.$store.dispatch("loadFromLocalTemp");//testing only
  }
};
</script>

<style lang="scss">
@import "assets/_custom.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";

body {
  //this prevents the jump caused by the vertical scrollbar in pages where it's not needed
  padding: 0px;
  margin: 0;
  overflow-y: scroll;
  //Background image
  background: url("https://i.imgur.com/uI9b73V.jpg");
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
