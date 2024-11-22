import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import HomeView from "../components/HomeView.vue"
import CurrencyView from '../components/CurrencyView.vue'
import WeatherView from '../components/WeatherView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/currency', component: CurrencyView },
  { path: '/weather', component: WeatherView}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router