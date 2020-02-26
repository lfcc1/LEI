<template>
  <center>
  <div class="home">
    <v-btn @click="redirect('/users/')">Users</v-btn>
    <br>
    <v-btn @click="redirect('/grupos/')">Grupos</v-btn>
    

     
                  
  </div>
  </center>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
    methods: {
    redirect: function(i) {
      this.$router.push(i);
    }
  }
}

</script>
