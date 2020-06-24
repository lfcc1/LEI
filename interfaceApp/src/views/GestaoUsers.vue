<template>
  <v-card class="ma-8">
       <v-card-text>
            <v-text-field
            v-model="filtrar"
            label="Filtrar"
            single-line
            hide-details
            dark
            ></v-text-field>
            <v-data-table
            :headers="header_utilizadores"
            :items="utilizadores"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.tipos}}</td>
                        <td>{{row.item.idUtilizador}}</td>
                        <td>{{row.item.nome}}</td>
                        <td>{{row.item.numAluno}}</td>
                        <td>{{row.item.sexo}}</td>
                        <td>{{row.item.numTelemovel}}</td>
                        <td>{{row.item.dataNasc}}</td>
                        <td @click="seeCurso(row.item.idCurso)" style="cursor: pointer;">{{row.item.idCurso}}</td>
                        <td> <v-icon @click="apresentaUser(row.item.idUtilizador)"> mdi-eye </v-icon> 
                         <v-icon @click="apagarUtilizador(row.item)"> mdi-delete </v-icon> </td>
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
    utilizadores: [],
    header_utilizadores: [
      {text: "Tipos", value: 'tipos', class: 'subtitle-1'},
      {text: "Email", value: 'idUtilizador', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'},
      {text: "Número de Aluno", value: 'numAluno', class: 'subtitle-1'},
      {text: "Sexo", value: 'sexo', class: 'subtitle-1'},
      {text: "Telemóvel", value: 'numTelemovel', class: 'subtitle-1'},
      {text: "Data de Nascimento", value: 'dataNasc', class: 'subtitle-1'},
      {text: "Curso", sortable: true, value: 'idCurso', class: 'subtitle-1'},
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
      let response = await axios.get(h + "utilizadores" )//
      this.utilizadores = response.data
      await this.updateUtilizadores()
      console.log(response.data)
    } catch (e) {
      return e
    }
  },
  methods:{
      updateUtilizadores: function(){
          for(let i = 0; i < this.utilizadores.length; i++){
              this.utilizadores[i].tipos = ""
              for(let j = 0; j < this.utilizadores[i].classes.length; j++){
                  if(this.utilizadores[i].tipos != "") this.utilizadores[i].tipos += ", "
                  this.utilizadores[i].tipos += this.utilizadores[i].classes[j].classe
              }
          }
      },
      seeCurso: function(id){1
          this.$router.push({ name: 'O Meu Curso', params: {id: id}})
      },
      apagarUtilizador: function(utilizador){
          if(confirm("De certeza que quer apagar o utilizador " + utilizador.nome +"?")){
              axios.delete(h + "utilizadores/" + utilizador.idUtilizador)
               .then(()=>{
                    axios.get(h + "utilizadores" )
                        .then(dados =>{
                            this.utilizadores = dados.data
                            this.updateUtilizadores()
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
            axios.post(h + "cursos", {id: this.idCurso, nome: this.designacao})
                .then(() =>{
                    axios.get(h + "cursos" )
                         .then(dados =>{
                                this.cursos = dados.data
                        })
                })
          }
          else alert("Esse curso já existe!")
      },
      apresentaUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      }
  }
}
</script>
