import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import testComponent from '@/components/testComponent/TestComponent.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: testComponent,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
