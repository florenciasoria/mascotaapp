import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/',
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
    path: '/LoginU',
    name: 'LoginUser',
    component: () => import('../views/LoginU.vue')
  },
  {
    path: '/buscar',
    name: 'Buscar',
    component: () => import('../views/Buscar.vue')
  },
  { 
    path: '/form-adopcion/:id',     
    component: () => import('../views/FormAdopcion.vue') 
  },
  {
    path: '/subir-mascota/',     
    component: () => import('../views/SubirMascota.vue') 
  },
  {
    path: '/line',
    name: 'Line',
    component: () => import('../views/Line.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
