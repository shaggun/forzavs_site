import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "./components/Home.vue";
import AboutPage from "./components/About.vue";
import FeedbackPage from "./components/Feedback.vue";
import GaragePage from "./components/Garage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/feedback", component: FeedbackPage },
  { path: "/garage", component: GaragePage },
  { path: "*", redirect: "/" }
];

export default new VueRouter({
  mode: "history",
  routes
});
