<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title class="justify-center" primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
            <v-text-field prepend-icon="mdi-account" v-model="email" name="Email" label="Email" ></v-text-field>
            <v-text-field prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block style="background-color: #900000;" @click="login">Login</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

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
        let response = await axios.post(h + "utilizadores/login", {idUtilizador: this.email, password: this.password});
        console.log(response.data)
        if(!response.data.authentication){
          this.password = ""
          alert("Crendenciais erradas, tente novamente.")
        } 
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        //localStorage.removeItem("jwt")
        if (token) {
          alert("Login efetuado com sucesso");
          this.$router.push("/universidade");
        }
      } catch (err) {
        this.password = ""
        alert("Crendenciais erradas tente novamente")
      }
      }
    }
  }
</script>