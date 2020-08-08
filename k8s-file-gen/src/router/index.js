import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Deployment from '../views/Deployment'
import Service from '../views/Service'
import Ingress from '../views/Ingress'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/deployment',
    name: 'Deployment',
    component: Deployment
  },
  {
    path: '/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/ingress',
    name: 'Ingress',
    component: Ingress
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
