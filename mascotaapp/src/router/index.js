import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/quieroAdoptar',
    name: 'Quiero',
    component: () => import( '../views/QuieroAlgo.vue')
  },
  {
    path: '/misSolicitudes',
    name: 'Solicitudes',
    component: () => import('../views/MisSolicitudes.vue')
  }
  ,
  {
    path: '/misPublicaciones',
    name: 'Publicaciones',
    component: () => import('../views/MisPublicaciones.vue')
  },
  {
    path: '/LoginF',
    name: 'Login',
    component: () => import('../views/LoginF.vue')
  },
  {
    path: '/buscar',
    name: 'Buscar',
    component: () => import('../views/Buscar.vue')
  },
  { 
    path: '/mascotas/:id',     
    component: () => import('../views/Mascota.vue') 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
