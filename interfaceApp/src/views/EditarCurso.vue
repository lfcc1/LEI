<template>
    <v-container>
        <v-card class="ma-8">
         <v-card-title class = "justify-center"> Editar Curso </v-card-title>
         <v-container style= "width:60%">
         <v-text-field placeholder="Designação do Curso" v-model="designacaoCurso" color="#900000"/>
         <center><v-btn @click="editarCurso()" color="#900000"> Confirmar Edição </v-btn></center>
         </v-container>
        </v-card>

        <v-card class="ma-8">
        <v-container style= "width:60%">
            <v-text-field placeholder="Designação do Ano" v-model="designacao" color="#900000"/>
            <v-text-field placeholder="Ano Letivo" v-model="anoLetivo" color="#900000"/>
            <center><v-btn @click="insertAno()" color="#900000"> Adicionar Ano </v-btn> </center>
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
            :headers="header_anos"
            :items="anos"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.designacao}}</td>
                        <td>{{row.item.anoLetivo}}</td>
                        <td>
                         <v-icon  @click="editarAno(row.item.id, row.item.designacao, row.item.anoLetivo)"> mdi-pencil </v-icon>
                         <v-icon @click="apagarAno(row.item.id)"> mdi-delete </v-icon> 
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
  name: 'EditarCurso',
  components: {
    
  },

  data: () => ({
    item: {},
    anos: [],
    header_anos: [
      {text: "Identificador do Ano", sortable: true, value: 'id', class: 'subtitle-1'},
      {text: "Designação", value: 'designacao', class: 'subtitle-1'},
      {text: "Ano Letivo", value: 'anoLetivo', class: 'subtitle-1'},
      {text: "Operações", class: 'subtitle-1'},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    idAno:"",
    designacao:"",
    anoLetivo:"",
    idCurso: "",
    designacaoCurso: "",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      this.idCurso = this.$route.params.id
      this.designacaoCurso = this.$route.params.designacao
      let response = await axios.get(h + "cursos/" + this.idCurso + "/anos" )//
      this.anos = response.data
    } catch (e) {
      return e
    }
  },
  methods:{
      editarAno: function(id, designacao, anoLetivo){
          this.$router.push({ name: 'Editar Ano', params: {id: id, designacao: designacao, anoLetivo: anoLetivo}})
      },
      apagarAno: function(id){
          if(confirm("De certeza que quer apagar o ano?")){
              axios.delete(h + "anos/" + id + "?token=" +  this.token)
               .then(()=>{
                    axios.get(h + "cursos/" + this.idCurso + "/anos?token=" + this.token )
                        .then(dados =>{
                            this.anos = dados.data
                        })

               })
          }
      },
      insertAno: function(){
          var r = true
          for(let i = 0; r && i < this.anos.length; i++){
              if(this.designacao == this.anos[i].designacao) r = false
          }
          if(r){
            axios.post(h + "anos?token=" + this.token, {nome: this.designacao, anoLetivo: this.anoLetivo, idCurso: this.idCurso})
                .then(() =>{
                    axios.get(h + "cursos/" + this.idCurso + "/anos?token=" + this.token )
                         .then(dados =>{
                                this.anos = dados.data
                        })
                })
          }
          else alert("Esse curso já existe!")
      },
      editarCurso: function(){
          axios.put(h + "cursos/" + this.idCurso + "?token=" + this.token, {designacao: this.designacaoCurso})
      }
  }
}
</script>
