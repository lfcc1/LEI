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
        <v-container>
    <v-layout row class="text-xs-center">
        <v-container style="position: relative;top: 15%; width: 60%;" class="text-xs-center">
          <material-card              
          color="#900000"
          title="Registar novo utilizador"
        >

            <v-combobox
                id="tipo"
                v-model="tipo"
                prepend-icon="mdi-cog-outline"
                :items="tipos"
                label="Tipo de utilizador"
            ></v-combobox>
            <v-text-field prepend-icon="mdi-account-card-details" v-model="numeroAluno" name="Identificador de Aluno" label="Identificador de Aluno" ></v-text-field>
            <v-text-field prepend-icon="mdi-account" v-model="nome" name="Nome" label="Nome" ></v-text-field>
            <v-text-field prepend-icon="mdi-email" v-model="email" name="Email" label="Email" ></v-text-field>
            <v-combobox
                id="curso"
                v-model="curso"
                prepend-icon="mdi-school"
                :items="cursos"
                @change="onCursoChange"
                label="Curso"
            ></v-combobox>
            <v-combobox
                id="ano"
                v-model="ano"
                prepend-icon="mdi-numeric-2-box-outline"
                :items="anos"
                label="Ano"
            ></v-combobox>
            <v-text-field prepend-icon="mdi-calendar-question" v-model="dataNascimento" name="Data de Nascimento" label="Data de Nascimento" type="date"></v-text-field>
            <v-text-field prepend-icon="mdi-cellphone-android" v-model="numeroTelemovel" name="Número de Telemóvel" label="Número de Telemóvel" type="number"></v-text-field>
            <v-combobox
                id="genero"
                v-model="genero"
                prepend-icon="mdi-gender-male-female"
                :items="['Masculino', 'Feminino', 'Outro']"
                label="Género"
            ></v-combobox>
            <v-text-field prepend-icon="mdi-key" v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block style="background-color: #900000;" @click="registar">Confirmar</v-btn>
            </v-card-actions>
              </material-card>
        </v-container>
    </v-layout>
  </v-container>
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
    tipo:"",
    tipos: ["Admin", "Responsavel", "Aluno"],
    nome : "",
    numeroAluno : "",
    numeroTelemovel : "",
    genero : "",
    ano : "",
    curso : "",
    dataNascimento : "",
    cursos : [],
    anos : [],
    idAnos : [],
    email : "",
    password : "",
    password_confirmation : "",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      let response = await axios.get(h + "utilizadores?token=" + this.token )//
      this.utilizadores = response.data
      await this.updateUtilizadores()
      response = await axios.get(h + "cursos/")
      var item = response.data
      for(var i = 0; i < item.length ; i++){
          this.cursos.push(item[i].curso)
      }
    } catch (e) {
      return e
    }
  },
  methods:{
     onCursoChange: async function (item){
          let response = await axios.get(h + "cursos/" + item + "/anos")
          for(var i = 0; i < response.data.length; i++){
              this.anos.push(response.data[i].designacao)
              this.idAnos.push(response.data[i])
          }
      },
    registar: function () {
      
      var idAno = this.idAnos.find(element => element.designacao == this.ano).id
        if (this.numeroAluno != "" && this.email != "" && this.numeroTelemovel != "" && this.ano != "" && this.genero != ""
             && this.curso != "" && this.password != "" && this.dataNascimento != "" && this.nome != "" && this.tipo != ""){ 
            let data = {
            numeroAluno : this.numeroAluno,
            numeroTelemovel : this.numeroTelemovel,
            idAno : idAno,
            idCurso : this.curso,
            sexo : this.genero,
            dataNascimento : this.dataNascimento,
            nome: this.nome,
            id: this.email,
            password: this.password,
            tipo: this.tipo
            }
            
            axios.post(h + "utilizadores/admin", data)
                 .then(()=>{
                   axios.get(h + "utilizadores?token=" + this.token )
                        .then(dados =>{
                            this.utilizadores = dados.data
                            this.updateUtilizadores()
                        })
                 })
            ///this.$store.dispatch('register', data)
            //.then(() => this.$router.push('/universidade'))
            //.catch(err => console.log(err))
        }
        else {
            alert('Ainda possuí campos por preencher!')
        }
      },
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
          this.$router.push({ name: 'Ver Curso', params: {id: id}})
      },
      apagarUtilizador: function(utilizador){
          if(confirm("De certeza que quer apagar o utilizador " + utilizador.nome +"?")){
              axios.delete(h + "utilizadores/" + utilizador.idUtilizador + "?token=" + this.token)
               .then(()=>{
                    axios.get(h + "utilizadores?token=" + this.token )
                        .then(dados =>{
                            this.utilizadores = dados.data
                            this.updateUtilizadores()
                        })

               })
          }
      },
      apresentaUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      }
  }
}
</script>
