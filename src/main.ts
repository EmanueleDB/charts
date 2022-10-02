import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import BootstrapVue from "bootstrap-vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faLanguage,
  faClapperboard,
  faStarHalfStroke,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "bootstrap/dist/css/bootstrap.css"

library.add(faLanguage, faClapperboard, faStarHalfStroke, faNetworkWired)

Vue.use(BootstrapVue)
Vue.component("FontAwesomeIcon", FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
