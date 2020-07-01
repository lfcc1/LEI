<template>
    <v-card class="ma-8">
      <v-container>
        <center>
        <v-text-field
          class="text--black"
          label="Procurar por pessoas..."
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
        <v-container v-if="pedidosAmizade.length > 0" style="width:60%">
            <v-list>
                        <v-list-item
                        v-for="pedido in pedidosAmizade"
                        :key="pedido.idUtilizador"
                        >
                            
                                <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    :src="pedido.fotoPerfil"
                                ></v-img>
                                </v-list-item-avatar>

                                <a class=" font-weight-bold black--text" v-text="pedido.nome" @click="apresentaUser(pedido.idUtilizador)" style="width:50%"></a>
                        <v-card-actions>
                                <v-row
                                justify="end"
                                >
                                    <v-btn justify="end" color="#900000" @click="aceitaPedido(pedido)" > Aceitar </v-btn>
                                    <v-btn justify="end" color="#900000" @click="rejeitaPedido(pedido)" > Rejeitar </v-btn>
                                </v-row>
          
                            </v-card-actions>
                        </v-list-item>
            </v-list>
        </v-container>
        <v-container v-else>
            <center><h4> Não possuí nenhum pedido de amizade atualmente! </h4></center>
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
  name: 'PedidoAmizade',
  //props:["id"],
  components: {

  },

  data: () => ({
    item: {},
    ready: false,
    pedidosAmizade:[],
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
      this.nomeUtilizador = utilizador.nome
      let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade?token=" + this.token )
      this.pedidosAmizade = response.data
      this.updatePedidos()
      console.log(response.data)
    } catch (e) {
      return e
    }
  },  
  methods:{
      updatePedidos: async function(){
        this.pedidosAmizade.forEach(element =>{
            element.fotoPerfil = host+"images/" + element.idUtilizador
        })
      },
      aceitaPedido: async function(pedido){
          var conversa = {
            participantes:[
              {
                idUtilizador: pedido.idUtilizador,
                nome: pedido.nome
              },
              {
                idUtilizador: this.idUtilizador,
                nome: this.nomeUtilizador
              }
            ],
            ativo: true,
            visto: true
          }
          await axios.post(h + "conversas?token=" + this.token, conversa)
          this.$emit('refreshConversas')
          await axios.put(h + "utilizadores/" + this.idUtilizador + "/amigo?token=" + this.token, {idAmigo: pedido.idUtilizador})
          let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade?token=" + this.token )
          this.pedidosAmizade = response.data
          this.updatePedidos()
          
      },
      rejeitaPedido: async function(pedido){
          await axios.delete(h + "utilizadores/pedidosamizade/" + pedido.idUtilizador + "/" + this.idUtilizador + "?token=" + this.token )
          let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade?token=" + this.token )
          this.pedidosAmizade = response.data
          this.updatePedidos()

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
