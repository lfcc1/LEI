<template>
<v-container v-if="isLogged()" v-model="reatividade">
<nav>

  <v-navigation-drawer 
          v-model="drawer"
          dark
          app
          :mini-variant.sync="mini"
          permanent
          src="https://cdn.discordapp.com/attachments/717034365611409463/722522710671884408/image.jpg"
          floating
          mobile-break-point="991"
          width="260"
          >
          <v-list
            dense
            nav
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img :src="srcImage">
              </v-list-item-avatar>
                
              <v-list-item-content>
                <v-list-item-title >{{this.nomeUtilizador}}</v-list-item-title>
                <v-list-item-subtitle>Logged in</v-list-item-subtitle>
              </v-list-item-content>

              <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
            </v-list-item>
            
  
            <v-divider></v-divider>
  
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.href"
            >
              <v-list-item-icon>
                <v-icon v-if=" item.title != 'Logout' " >{{ item.icon }}</v-icon>
                <v-icon v-else @click="logout()" style="cursor: pointer;">{{ item.icon }}</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content>
                <v-list-item-title v-if=" item.title != 'Logout' ">{{ item.title }}</v-list-item-title>
                <v-list-item-title v-else @click="logout()" style="cursor: pointer;">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
</nav>
   
  </v-container>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
const host = require("@/config/hosts").host
export default {
  props:[
    'logged'
  ],
  data () {
    return {
      reatividade : "#900000",
      drawer: true,
      mini: true,
      items: [
      ],
      color: '#900000',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      right: false,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      srcImage:"",
      idUtilizador:"",
      nomeUtilizador:"",
      nome:""
    }
  },
  created: async function(){
    // ir buscar à sessão
    let utilizador = JSON.parse(localStorage.getItem("utilizador"))
    console.log(utilizador.ano)
    this.idUtilizador = utilizador.idUtilizador
    this.nomeUtilizador = utilizador.nome
    if(this.getPermissao(utilizador, "Admin"))
    this.items = [
        { title: 'Universidade', icon: 'mdi-view-dashboard',href:"/universidade" },
        { title: 'Meu Curso', icon: 'mdi-school', href:"/curso" },
        { title: 'Eventos Gerais', icon: 'mdi-calendar-clock', href:"/eventos" },
        { title: 'Eventos do teu curso', icon: 'mdi-calendar-heart', href:"/eventoscurso" },
        { title: 'Meus Eventos', icon: 'mdi-calendar-multiple-check', href:"/meuseventos" },
        { title: 'Meu Perfil', icon: 'mdi-account-circle', href:"/userProfile/" + this.idUtilizador },
        { title: 'Pedidos de amizade', icon: 'mdi-account-plus-outline', href:"/pedidosamizade" },
        { title: 'Gestao de Cursos', icon: 'mdi-cog-outline', href:"/gestaocursos" },
        { title: 'Gestao de Utilizadores', icon: 'mdi-cog-outline', href:"/gestaousers" },
        { title: 'Gestao de Eventos', icon: 'mdi-cog-outline', href:"/gestaoeventos" },
        { title: 'Logout', icon: 'mdi-logout'}
    ]

  else if(this.getPermissao(utilizador, "Responsavel")){
      this.items = [
        { title: 'Universidade', icon: 'mdi-view-dashboard',href:"/universidade" },
        { title: 'Meu Curso', icon: 'mdi-school', href:"/curso" },
        { title: 'Eventos Gerais', icon: 'mdi-calendar-clock', href:"/eventos" },
        { title: 'Eventos do teu curso', icon: 'mdi-calendar-heart', href:"/eventoscurso" },
        { title: 'Meus Eventos', icon: 'mdi-calendar-multiple-check', href:"/meuseventos" },
        { title: 'Meu Perfil', icon: 'mdi-account-circle', href:"/userProfile/" + this.idUtilizador },
        { title: 'Pedidos de amizade', icon: 'mdi-account-plus-outline', href:"/pedidosamizade" },
        { title: 'Editar Ano', icon: 'mdi-cog-outline', href:"/editarano/"+utilizador.ano },
        { title: 'Logout', icon: 'mdi-logout'}
      ]
  } else {
      this.items = [
        { title: 'Universidade', icon: 'mdi-view-dashboard',href:"/universidade" },
        { title: 'Meu Curso', icon: 'mdi-school', href:"/curso" },
        { title: 'Eventos Gerais', icon: 'mdi-calendar-clock', href:"/eventos" },
        { title: 'Eventos do teu curso', icon: 'mdi-calendar-heart', href:"/eventoscurso" },
        { title: 'Meus Eventos', icon: 'mdi-calendar-multiple-check', href:"/meuseventos" },
        { title: 'Meu Perfil', icon: 'mdi-account-circle', href:"/userProfile/" + this.idUtilizador },
        { title: 'Pedidos de amizade', icon: 'mdi-account-plus-outline', href:"/pedidosamizade" },
        { title: 'Logout', icon: 'mdi-logout'}
    ]
  }
    this.srcImage = host+'images/' + this.idUtilizador
  },
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    },
  },
  methods:{
    getPermissao(utilizador, acess){
      var result= false
      utilizador.tipos.forEach(element => {
        if(element.classe == acess)
          result = true
      });
      return result;
    },

    logout: function(){
      if(confirm("De certeza que pretende terminar sessão?")){
        localStorage.removeItem("jwt");
        this.$emit('refreshLogout')
        this.color = "#900001"
      }
    },
    isLogged: function(){
      if (localStorage.getItem("jwt") == null) {
      return false
      } else {
      return true
      }
    }
  }
}
</script>


<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>