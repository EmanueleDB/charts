import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import testComponent from "@/components/testComponent/TestComponent.vue"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: testComponent,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
