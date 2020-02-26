<template>
  <v-app>

    <NavBar/>
    <div style="padding-left:15%">    
      <center>
      <img  src="./assets/um.jpg" style="width: 20%;">
      </center>
      <hr>

      
      <router-view/>
        <v-footer>
    <v-spacer></v-spacer>
      <address>Gerado por UMBook app. </address>
    <div> &copy;  {{ new Date().getFullYear() }}</div>
  </v-footer>

    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
export default {
    components: {
    NavBar
  },
}
</script>


