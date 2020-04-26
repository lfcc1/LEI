import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import Grupos from '../views/Grupos.vue'
import UserProfile from '../views/UserProfile.vue'
import Grupo from '../views/Grupo.vue'
import Curso from '../views/Curso.vue'
import Ano from '../views/Curso.vue'
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
    path: '/curso',
    name: 'Curso',
    component: Curso,
    beforeRouteLeave (to, from, next) {
      // do stuff
      // call next() when done
      next()
    }
  },
  {
    path: '/ano/:id',
    name: 'ano',
    component: Ano,
    props: true/*,
    beforeRouteUpdate(to, from, next) { next() },
    beforeEnter: (to, from, next) => {
      next({
        //replace: true
      });
    }*/
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
  },
  /*
  beforeRouteUpdate(to, from, next) {
    /*
    something...
    
  
    next(to) // DO IT!
  }*/
})

export default router
