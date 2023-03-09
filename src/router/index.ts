import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestComponent from '@/components/TestComponent/TestComponent.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TestComponent,
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
