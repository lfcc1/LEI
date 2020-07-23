<template>
    <v-container>
        <v-card class="ma-8">
         <v-card-title class = "justify-center"> Editar Cadeira </v-card-title>
         <v-container style= "width:60%">
         <v-text-field placeholder="Designação da Cadeira" v-model="designacaoCadeira" color="#900000"/>
         <center><v-btn @click="editarCadeira()" color="#900000"> Confirmar Edição </v-btn></center>
         </v-container>
        </v-card>

        <v-card class="ma-8">
        <v-container style= "width:60%">
            <v-text-field placeholder="Designação da Pasta" v-model="designacao" color="#900000"/>
            <center><v-btn @click="insertPasta()" color="#900000"> Adicionar Pasta </v-btn> </center>
        </v-container>
       <v-card-text>
            <v-text-field
            v-model="filtrar"
            label="Filtrar"
            single-line
            hide-details
            dark
            ></v-text-field>
            <v-data-table
            :headers="header_pastas"
            :items="pastas"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.idPasta}}</td>
                        <td>{{row.item.nome}}</td>
                        <td>
                         <v-icon @click="apagarPasta(row.item.idPasta)"> mdi-delete </v-icon> 
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    </v-container>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'EditarCadeira',
  components: {
    
  },

  data: () => ({
    item: {},
    pastas: [],
    header_pastas: [
      {text: "Identificador da Pasta", sortable: true, value: 'idPasta', class: 'subtitle-1'},
      {text: "Designação", value: 'nome', class: 'subtitle-1'},
      {text: "Operações", class: 'subtitle-1'},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    idCadeira:"",
    idAno:"",
    designacaoCadeira:"",
    designacao:"",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      this.idAno = this.$route.params.idAno
      this.idCadeira = this.$route.params.id
      this.designacaoCadeira = this.$route.params.designacao
      let response = await axios.get(h + "cadeiras/" + this.idCadeira + "/pastas" + "?token=" + this.token )//
      this.pastas = response.data
    } catch (e) {
      return e
    }
  },
  methods:{
      apagarPasta: function(id){
          if(confirm("De certeza que quer apagar a Pasta?")){
              axios.delete(h + "cadeiras/pastas/" + id + "?token=" + this.token + "&idAno=" + this.idAno)
               .then(()=>{
                    axios.get(h + "cadeiras/" + this.idCadeira + "/pastas" + "?token=" + this.token )
                        .then(dados =>{
                            this.pastas = dados.data
                        })

               })
          }
      },
      insertPasta: function(){
          var r = true
          for(let i = 0; r && i < this.pastas.length; i++){
              if(this.designacao == this.pastas[i].designacao) r = false
          }
          if(r){
            axios.post(h + "cadeiras/pastas?token=" + this.token, {nome: this.designacao, idCadeira: this.idCadeira, idAno: this.idAno})
                .then(() =>{
                    axios.get(h + "cadeiras/" + this.idCadeira + "/pastas?token=" + this.token )
                         .then(dados =>{
                                this.pastas = dados.data
                        })
                })
          }
          else alert("Essa pasta já existe!")
      },
      editarCadeira: function(){
          axios.put(h + "cadeiras/" + this.idCadeira + "?token=" + this.token, {designacao: this.designacaoCadeira, idAno: this.idAno})
      }
  }
}
</script>
