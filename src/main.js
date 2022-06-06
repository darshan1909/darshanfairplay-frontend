import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Carousel3d from 'vue-carousel-3d';
import store from "./store"
Vue.use(Carousel3d)
Vue.use(Vuelidate);
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
