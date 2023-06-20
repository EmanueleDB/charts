import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { BootstrapVueNext } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const pinia = createPinia()

createApp(App).use(pinia).use(BootstrapVueNext).mount('#app')
