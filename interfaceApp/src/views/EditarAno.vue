<template>
    <v-container>
        <v-card class="ma-8">
         <v-card-title class = "justify-center"> Editar Ano </v-card-title>
         <v-container style= "width:60%">
         <v-text-field placeholder="Designação do Ano" v-model="designacaoAno" color="#900000"/>
         <v-text-field placeholder="Ano Letivo do Ano" v-model="anoLetivoAno" color="#900000"/>
         <center><v-btn @click="editarAno()" color="#900000"> Confirmar Edição </v-btn></center>
         </v-container>
        </v-card>

        <v-card class="ma-8">
        <v-container style= "width:60%">
            <v-text-field placeholder="Designação da Cadeira" v-model="designacao" color="#900000"/>
            <textarea v-model="conteudosProgramaticos" placeholder="Conteúdos Programáticos da Cadeira" rows="5" style="width:100%; resize: none; "></textarea>
            <center><v-btn @click="insertCadeira()" color="#900000"> Adicionar Cadeira </v-btn> </center>
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
            :headers="header_cadeiras"
            :items="cadeiras"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.designacao}}</td>
                        <td>
                         <v-icon  @click="editarCadeira(row.item.id, row.item.designacao)"> mdi-pencil </v-icon>
                         <v-icon @click="apagarCadeira(row.item.id)"> mdi-delete </v-icon> 
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
  name: 'EditarAno',
  components: {
    
  },

  data: () => ({
    item: {},
    cadeiras: [],
    conteudosProgramaticos: "",
    header_cadeiras: [
      {text: "Identificador da Cadeira", sortable: true, value: 'id', class: 'subtitle-1'},
      {text: "Designação", value: 'designacao', class: 'subtitle-1'},
      {text: "Operações", class: 'subtitle-1'},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    idAno:"",
    designacaoAno:"",
    anoLetivoAno:"",
    designacao:"",
    anoLetivo:"",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      this.idAno = this.$route.params.id
      this.designacaoAno = this.$route.params.designacao
      this.anoLetivoAno = this.$route.params.anoLetivo
      let response = await axios.get(h + "anos/" + this.idAno + "/cadeiras" + "?token=" + this.token )//
      this.cadeiras = response.data
      console.log(response.data)
    } catch (e) {
      return e
    }
  },
  methods:{
      editarCadeira: function(id, designacao, anoLetivo){
          this.$router.push({ name: 'Editar Cadeira', params: {id: id, designacao: designacao}})
      },
      apagarCadeira: function(id){
          if(confirm("De certeza que quer apagar a cadeira?")){
              axios.delete(h + "cadeiras/" + id + "?token=" + this.token)
               .then(()=>{
                    axios.get(h + "anos/" + this.idAno + "/cadeiras" + "?token=" + this.token )
                        .then(dados =>{
                            this.cadeiras = dados.data
                        })

               })
          }
      },
      insertCadeira: function(){
          var r = true
          for(let i = 0; r && i < this.cadeiras.length; i++){
              if(this.designacao == this.cadeiras[i].designacao) r = false
          }
          if(r){
            axios.post(h + "cadeiras?token=" + this.token, {nome: this.designacao, conteudosProgramaticos:this.conteudosProgramaticos, idAno: this.idAno})
                .then(() =>{
                    axios.get(h + "anos/" + this.idAno + "/cadeiras?token=" + this.token )
                         .then(dados =>{
                                this.cadeiras = dados.data
                        })
                })
          }
          else alert("Essa cadeira já existe!")
      },
      editarAno: function(){
          axios.put(h + "anos/" + this.idAno + "?token=" + this.token, {designacao: this.designacaoAno, anoLetivo: this.anoLetivoAno})
      }
  }
}
</script>
