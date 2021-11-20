import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import Buefy from "buefy";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import App from "./App";
import router from "./router";
import store from "./store"
import Axios from "axios";
import jwt from "jsonwebtoken"

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas'
});
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(jwt);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');