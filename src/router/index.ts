import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SubscribeView from '../views/Subscribe.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Subscribe',
    component: SubscribeView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
