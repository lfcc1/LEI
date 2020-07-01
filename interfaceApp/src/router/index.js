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
import EditarCadeira from '../views/EditarCadeira.vue'
import SearchResult from '../views/SearchResult.vue'
import GestaoUsers from '../views/GestaoUsers.vue'
import SearchUsers from '../views/SearchUsers.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/registar',
    name: 'Registar',
    component: Registar
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/userProfile/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/curso',
    name: 'O Meu Curso',
    component: Curso,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/universidade',
    name: 'Universidade do Minho',
    component: Universidade,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/eventos',
    name: 'Eventos Gerais',
    component: Evento,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/eventoscurso',
    name: 'Evento do teu Curso',
    component: EventoCurso,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meuseventos',
    name: 'Meus Eventos',
    component: MeusEventos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pedidosamizade',
    name: 'Pedidos de Amizade',
    component: PedidosAmizade,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Gestão de cursos',
    path: '/gestaocursos',
    component: GestaoCurso,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Editar Curso',
    path: '/editarcurso/:id',
    component: EditarCurso,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Editar Ano',
    path: '/editarano/:id',
    component: EditarAno,
    meta:{
      requiresAuth: true
    }
  },
  {
    name: 'Editar Cadeira',
    path: '/editarcadeira/:id',
    component: EditarCadeira,
    meta:{
      requiresAuth: true
    }
  },
  {
    name: 'Resultados da Pesquisa',
    path: '/searchResult/:titulo',
    component: SearchResult,
    meta:{
      requiresAuth: true
    }
  },
  {
    name: 'Gestão de utilizadores',
    path: '/gestaousers',
    component: GestaoUsers,
    meta:{
      requiresAuth: true
    }
  },
  {
    name: 'Pessoas Encontradas',
    path: '/searchUsers/:nome',
    component: SearchUsers,
    meta:{
      requiresAuth: true
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
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
