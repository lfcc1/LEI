<template>
    <v-card class="ma-8">
      <v-container>
          <center>
        <v-text-field
          class="text--black"
          label="Procurar..."
          color="#900000"
          v-model="searchInput"
          hide-details
          style="max-width: 400px; margin-right: 32px; margin-top:10px;"
        >
          <template
            v-if="$vuetify.breakpoint.mdAndUp"
            v-slot:append-outer
          >
            <v-btn
              class="mt-n2 white"
              elevation="1"
              fab
              small
              @click="searchPessoas()"
            >
            <v-icon color="#900000">mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        </center>
      </v-container>
        <v-container v-if="pessoas.length > 0" style="width:40%">
            <v-list>
                        <v-list-item
                        v-for="pessoa in pessoas"
                        :key="pessoa.idUtilizador"
                        >
                            
                                <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    :src="pessoa.fotoPerfil"
                                ></v-img>
                                </v-list-item-avatar>

                                <a class=" font-weight-bold black--text" v-text="pessoa.nome" @click="apresentaUser(pessoa.idUtilizador)" style="width:50%"></a>
                        </v-list-item>
            </v-list>
            
        </v-container>
        <v-container v-else>
            <center><h4> Não foi possível encontrar nenhum utilizador com esse nome! </h4></center>
        </v-container>
    </v-card>
</template>

<script>
import {
  mapMutations
} from 'vuex'
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode";
const host = require("@/config/hosts").host
const h = require("@/config/hosts").hostAPI

export default {
  name: 'SearchUsers',
  //props:["id"],
  components: {

  },

  data: () => ({
    item: {},
    ready: false,
    pessoas: [],
    idUtilizador: "",    
    searchInput :"",

  }),

  created: async function() {
    try {
      // ir à sessão
      let token = localStorage.getItem("jwt")//.decode('UTF-8');
      this.token = token
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      this.idUtilizador = utilizador.idUtilizador
      var nome = this.$route.params.nome
      let response = await axios.get(h + "utilizadores/search/" + nome + "?token=" + this.token )
      console.log(response.data)
      this.pessoas = response.data
      this.updatePessoas()
      console.log(response.data)
    } catch (e) {
      return e
    }
  },  
  methods:{
      updatePessoas: async function(){
        this.pessoas.forEach(element =>{
            element.fotoPerfil = host+"images/" + element.idUtilizador
        })
      },
      
    apresentaUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      },
    searchPessoas (){
     this.$router.push({ name: 'Pessoas Encontradas',params: {nome: this.searchInput} })
    },
  }
}
</script>
