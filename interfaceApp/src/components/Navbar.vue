<template>
<v-container>
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
                <v-list-item-title >Filipe Cunha</v-list-item-title>
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
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
</nav>
   
  </v-container>
</template>

<script>
const host = require("@/config/hosts").host
export default {
  data () {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: 'Universidade', icon: 'mdi-view-dashboard',href:"/universidade" },
        // Ir buscar á sessão
        { title: 'Meu Curso', icon: 'mdi-school', href:"/curso/MIEI" },
        { title: 'Eventos Gerais', icon: 'mdi-calendar-clock', href:"/eventos" },
        { title: 'Eventos do teu curso', icon: 'mdi-calendar-clock', href:"/eventoscurso" },
        { title: 'Meus Eventos', icon: 'mdi-calendar-multiple-check', href:"/meuseventos" },
        // Ir buscar á sessão
        { title: 'Meu Perfil', icon: 'mdi-account-circle', href:"/userProfile/lguilhermem@hotmail.com" },
        { title: 'Pedidos de amizade', icon: 'mdi-account-plus-outline', href:"/pedidosamizade" },
        { title: 'Notificações', icon: 'mdi-bell-ring', href:"/notificacoes" },
        { title: 'Gestao Cursos', icon: 'mdi-cog-outline', href:"/gestaocursos" },
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
      idUtilizador:""
    }
  },
  created: function(){
    // ir buscar à sessão
    this.idUtilizador = "lguilhermem@hotmail.com"
    this.srcImage = host+'images/' + this.idUtilizador
  },
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    },
  },
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