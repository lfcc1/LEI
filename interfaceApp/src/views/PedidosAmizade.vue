<template>
    <v-card class="ma-8">
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
import axios from "axios"
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
    idUtilizador: ""
  }),

  created: async function() {
    try {
      // ir à sessão
      this.idUtilizador = "joniboy@hotmail.com"
      let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade" )
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
                nome: "Joni Boy"
              }
            ],
            ativo: true,
            visto: true
          }
          await axios.post(h + "conversas", conversa)
          this.$emit('refreshConversas')
          await axios.put(h + "utilizadores/" + this.idUtilizador + "/amigo", {idAmigo: pedido.idUtilizador})
          let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade" )
          this.pedidosAmizade = response.data
          this.updatePedidos()
          
      },
      rejeitaPedido: async function(pedido){
          await axios.delete(h + "utilizadores/pedidosamizade/" + pedido.idUtilizador + "/" + this.idUtilizador )
          let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "/pedidosamizade" )
          this.pedidosAmizade = response.data
          this.updatePedidos()

      },
    apresentaUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      }
  }
}
</script>
