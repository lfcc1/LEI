<template>
  
    <v-layout row class="text-xs-center" justify-center align-center>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <material-card              
          color="#900000"
          title="Login"
        >
            <v-form>
            <v-text-field prepend-icon="mdi-account" v-model="email" name="Email" label="Email" ></v-text-field>
            <v-text-field prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block style="background-color: #900000;" @click="login">Login</v-btn>
            </v-card-actions>
            </v-form>
          </material-card>
          <center><v-text> Ainda não possuí conta? </v-text> <span class="font-weight-bold black--text" @click="registar()" style="cursor: pointer;" > Registe-se já! </span></center>
        </v-container>
      </v-flex>
    </v-layout>
  
</template>



<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI
const authpath = require("@/config/hosts").auth
import VueJwtDecode from "vue-jwt-decode";

  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: async function () {
        try {
        let response = await axios.post(authpath + "login", {idUtilizador: this.email, password: this.password},{withCredentials: true});
        
        console.log(response.data)
        if(!response.data.authentication){
          this.password = ""
          alert("Crendenciais erradas, tente novamente.")
          return;
        } 
        let token = response.data.token;
        if (token) {
          localStorage.setItem("utilizador", JSON.stringify(response.data.utilizador))
          let utilizador = JSON.parse(localStorage.getItem("utilizador"))
          console.log(utilizador.idUtilizador)
          localStorage.setItem("jwt", token);
          alert("Login efetuado com sucesso");
          this.$emit("refreshLogout")
          this.$router.push("/universidade");
       }} 
       catch (err) {
        this.password = ""
        alert(err)
      }
      },
      registar: function(){
        this.$emit("registar");
      }
    }
  }
</script>