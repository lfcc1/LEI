<template>
  <v-card class="ma-8">
        <v-container style= "width:60%">
            <v-text-field placeholder="Identificador do Curso" v-model="idCurso" color="#900000"/>
            <v-text-field placeholder="Designação do Curso" v-model="designacao" color="#900000"/>
            <center><v-btn @click="insertCurso()" color="#900000"> Adicionar Curso </v-btn> </center>
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
            :headers="header_cursos"
            :items="cursos"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.curso}}</td>
                        <td>{{row.item.designacao}}</td>
                        <td> <v-icon @click="seeCurso(row.item.curso)"> mdi-eye </v-icon> 
                        <v-icon  @click="editarCurso(row.item.curso, row.item.designacao)"> mdi-pencil </v-icon>
                         <v-icon @click="apagarCurso(row.item.curso)"> mdi-delete </v-icon> </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'GestaoCurso',
  components: {
    
  },

  data: () => ({
    item: {},
    cursos: [],
    header_cursos: [
      {text: "Identificador do Curso", sortable: true, value: 'curso', class: 'subtitle-1'},
      {text: "Designação", value: 'designacao', class: 'subtitle-1'},
      {text: "Operações", class: 'subtitle-1'},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    idCurso:"",
    designacao:"",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      let response = await axios.get(h + "cursos?token=" + this.token )//
      this.cursos = response.data
    } catch (e) {
      return e
    }
  },
  methods:{
      seeCurso: function(id){1
          this.$router.push({ name: 'Ver Curso', params: {id: id}})
      },
      editarCurso: function(id, designacao){
          this.$router.push({ name: 'Editar Curso', params: {id: id, designacao: designacao}})
      },
      apagarCurso: function(id){
          if(confirm("De certeza que quer apagar o curso?")){
              axios.delete(h + "cursos/" + id + "?token=" + this.token)
               .then(()=>{
                    axios.get(h + "cursos?token=" + this.token )
                        .then(dados =>{
                            this.cursos = dados.data
                        })

               })
          }
      },
      insertCurso: function(){
          var r = true
          for(let i = 0; r && i < this.cursos.length; i++){
              if(this.idCurso == this.cursos[i].curso) r = false
          }
          if(r){
            axios.post(h + "cursos?token=" + this.token, {id: this.idCurso, nome: this.designacao})
                .then(() =>{
                    axios.get(h + "cursos?token=" + this.token )
                         .then(dados =>{
                                this.cursos = dados.data
                        })
                })
          }
          else alert("Esse curso já existe!")
      }
  }
}
</script>
