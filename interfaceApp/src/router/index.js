import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../auth/store.js'
import UserProfile from '../views/UserProfile.vue'
import Curso from '../views/Curso.vue'
import Login from '../views/Login.vue'
import Registar from '../views/Registar.vue'
import Universidade from '../views/Universidade.vue'
import Evento from '../views/Evento.vue'
import EventoCurso from '../views/EventoCurso.vue'
import MeusEventos from '../views/MeusEventos.vue'
import PedidosAmizade from '../views/PedidosAmizade.vue'
import GestaoCurso from '../views/GestaoCurso.vue'
import EditarCurso from '../views/EditarCurso.vue'
import EditarAno from '../views/EditarAno.vue'
import SearchResult from '../views/SearchResult.vue'


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
    path: '/userProfile/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      //requiresAuth: true
    }
  },
  {
    path: '/curso/:id',
    name: 'O Meu Curso',
    component: Curso,
    meta: { 
      //requiresAuth: true
    },
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
  },
  {
    name: 'Gestão de cursos',
    path: '/gestaocursos',
    component: GestaoCurso
  },
  {
    name: 'Editar Curso',
    path: '/editarcurso/:id',
    component: EditarCurso
  },
  {
    name: 'Editar Ano',
    path: '/editarano/:id',
    component: EditarAno
  },
  {
    name: 'Resultados da Pesquisa',
    path: '/searchResult/:titulo',
    component: SearchResult
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
