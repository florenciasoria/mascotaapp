import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/',
    name: 'Quiero',
    component: () => import('../views/QuieroAlgo.vue')
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
    path: '/Registrar',
    name: 'Registrar',
    component: () => import('../views/Registrar.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/buscar',
    name: 'Buscar',
    component: () => import('../views/Buscar.vue')
  },
  {
    path: '/subir-mascota/',
    component: () => import('../views/SubirMascota.vue')
  },
  {
    path: '/admin',
    name: 'PanelAdministracion',
    component: () => import('../views/PanelAdministracion.vue')
  },
  {
    path: '/Error',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
