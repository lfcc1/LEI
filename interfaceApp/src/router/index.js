import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../auth/store.js'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import Grupos from '../views/Grupos.vue'
import UserProfile from '../views/UserProfile.vue'
import Grupo from '../views/Grupo.vue'
import Curso from '../views/Curso.vue'
import Ano from '../views/Ano.vue'
import Login from '../views/Login.vue'
import Registar from '../views/Registar.vue'
import Universidade from '../views/Universidade.vue'
import EditUserProfile from '../views/EditUserProfile.vue'
import Evento from '../views/Evento.vue'
import EventoCurso from '../views/EventoCurso.vue'
import MeusEventos from '../views/MeusEventos.vue'
import PedidosAmizade from '../views/PedidosAmizade.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/registar',
    name: 'Registar',
    component: Registar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'lista',
    component: Users,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/userProfile/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/editUserProfile',
    name: 'editUserProfile',
    component: EditUserProfile,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'lista',
    component: Users,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/users/:id',
    name: 'consulta',
    component: User,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/grupos',
    name: 'lista',
    component: Grupos,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/curso',
    name: 'O Meu Curso',
    component: Curso,
    meta: { 
      //requiresAuth: true
    },
  },
  {
    path: '/ano/:id',
    name: 'Ano' ,
    component: Ano,
    meta: { 
      //requiresAuth: true
    }
    /*props: true/*,
    beforeRouteUpdate(to, from, next) { next() },
    beforeEnter: (to, from, next) => {
      next({
        //replace: true
      });
    }*/
  },
  {
    path: '/universidade',
    name: 'Universidade do Minho',
    component: Universidade,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/eventos',
    name: 'Eventos Gerais',
    component: Evento,
    meta: {

    }
  },
  {
    path: '/eventoscurso',
    name: 'Evento do teu Curso',
    component: EventoCurso,
    meta: {

    }
  },
  {
    path: '/meuseventos',
    name: 'Meus Eventos',
    component: MeusEventos,
    meta: {

    }
  },
  {
    path: '/pedidosamizade',
    name: 'Pedidos de Amizade',
    component: PedidosAmizade,
    meta: {

    }
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

/*
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})*/

export default router
