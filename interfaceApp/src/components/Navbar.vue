<template>
<v-container>
<nav>

  <v-navigation-drawer 
          v-model="drawer"
          :color="color"
          app
          :mini-variant.sync="mini"
          permanent
          dark
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
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title>Filipe Cunha</v-list-item-title>
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
export default {
  data () {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: 'Universidade', icon: 'mdi-view-dashboard',href:"/universidade" },
        { title: 'Meu Curso', icon: 'mdi-image', href:"/curso" },
        { title: 'Meus Eventos', icon: 'mdi-image', href:"/eventos" },
        { title: 'Meu Perfil', icon: 'mdi-image', href:"/userProfile" },
        { title: 'Notificações', icon: 'mdi-image', href:"/notificacoes" },
        { title: 'Grupos-DevelopMode', icon: 'mdi-image', href:"/grupos" },
        { title: 'Users-DevelopMode', icon: 'mdi-logout', href:"/users" },
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
    }
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