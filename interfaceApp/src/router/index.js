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
import GestaoEventos from '../views/GestaoEventos.vue'





Vue.use(VueRouter)

function getPermissao(tipos, acess){
  var result = false
  tipos.forEach(element=> {
    if (element.classe == acess) result = true
  })
  return result
}

const routes = [
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
    name: 'Gestão de Cursos',
    path: '/gestaocursos',
    component: GestaoCurso,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
    }
  },
  {
    name: 'Editar Curso',
    path: '/editarcurso/:id',
    component: EditarCurso,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
    }
  },
  {
    name: 'Editar Ano',
    path: '/editarano/:id',
    component: EditarAno,
    meta:{
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
    }
  },
  {
    name: 'Editar Cadeira',
    path: '/editarcadeira/:id',
    component: EditarCadeira,
    meta:{
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
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
    name: 'Gestão de Utilizadores',
    path: '/gestaousers',
    component: GestaoUsers,
    meta:{
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
    }
  },
  {
    name: 'Gestão de Eventos',
    path: '/gestaoeventos',
    component: GestaoEventos,
    meta:{
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      let tipos = utilizador.tipos
      if(getPermissao(tipos, "Admin")){
        next()
      }
      else{
        next({name: "Universidade do Minho"})
      }
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


export default router
