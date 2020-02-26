import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import Home from '../views/Home.vue'
import Grupos from '../views/Grupos.vue'
import Grupo from '../views/Grupo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lista',
    component: Home
  },
  {
    path: '/users',
    name: 'lista',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'consulta',
    component: User
  },
  {
    path: '/grupos',
    name: 'lista',
    component: Grupos
  },
  {
    path: '/grupos/:id',
    name: 'consulta',
    component: Grupo
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
