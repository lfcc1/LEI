<template>
  <v-app :key="viewKey">
    
    <div v-if="loggedIn">
    <Auth  @refreshLogout="refreshLogout" />
    </div>
    <div v-else>
      <Login @refreshLogout="refreshLogout" />
    </div>
  </v-app>
</template>

<script>

import Auth from '@/views/AuthApp.vue'
import Login from '@/views/Login.vue'
import axios from 'axios'




export default {
    components: {
    Auth,
    Login,
  },
     data() {

        return {
          color :"#eee",
          viewKey: 0,
          loggedIn : false
        }
    },
    created: function(){
      this.loggedIn = this.isLogged();
      var unauthorized =false;

    },
    methods: {
          isLogged: function(){
            console.log(localStorage.getItem("jwt"))
            if (localStorage.getItem("jwt") == null)
               return false
            return true
          },
          refreshLogout: function(){
            this.loggedIn = this.isLogged()
            alert("Forçar Reatividade")
            this.viewKey ++;
          }
    }
}
</script>


<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}

$material-light: (
  'background': #fff
);

</style>

