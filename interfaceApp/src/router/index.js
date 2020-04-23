import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import Grupos from '../views/Grupos.vue'
import UserProfile from '../views/UserProfile.vue'
import Grupo from '../views/Grupo.vue'
import Universidade from '../views/Universidade.vue'
import EditUserProfile from '../views/EditUserProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lista',
    component: Users
  },
  {
    path: '/userProfile',
    name: 'User Profile',
    component: UserProfile
  },
  {
    path: '/editUserProfile',
    name: 'editUserProfile',
    component: EditUserProfile
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
  },
  {
    path: '/universidade',
    name: 'Universidade',
    component: Universidade
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

export default router
