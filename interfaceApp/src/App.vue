<template>
  <v-app>
      <NavBar/>
    <Toolbar/>
  

    
     <!-- <center>
      <img  src="./assets/um.jpg" style="width: 20%;">
      </center>-->
      

      
     <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
        <v-footer>
    <v-spacer></v-spacer>
      <address>Gerado por UMBook app. </address>
    <div> &copy;  {{ new Date().getFullYear() }}</div>
  </v-footer>

  
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import Toolbar from '@/components/Toolbar.vue'
export default {
    components: {
    NavBar,
    Toolbar
  },
}
</script>


