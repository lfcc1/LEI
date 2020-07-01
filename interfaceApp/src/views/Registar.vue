<template>
 <div id="app">
  <v-container>
    <v-layout row class="text-xs-center">
        <v-container style="position: relative;top: 15%; width: 60%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title class="justify-center">
              <h2>Registo</h2>
            </v-card-title>
            <v-form>
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
                multiple
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
            </v-form>
          </v-card>
        </v-container>
    </v-layout>
  </v-container>
</div>
</template>

<script>
  const h = require("@/config/hosts").hostAPI
  import axios from "axios"
  export default {
    data(){
      return {
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
        is_admin : null
      }
    },
    created : async function() {
        try {
        let response = await axios.get(h + "cursos/")
        var item = response.data
        console.log(item)
        for(var i = 0; i < item.length ; i++){
            this.cursos.push(item[i].curso)
        }
        } catch (e) {
        return e
        }
    },
     methods: {
      registar: function () {
        if (this.numeroAluno != "" && this.email != "" && this.numeroTelemovel != "" && this.ano != "" && this.genero != ""
             && this.curso != "" && this.password != "" && this.dataNascimento != "" && this.nome != ""){ 
            let data = {
            numeroAluno : this.numeroAluno,
            numeroTelemovel : this.numeroTelemovel,
            idAno : this.idAnos[this.ano],
            idCurso : this.curso,
            sexo : this.genero,
            dataNascimento : this.dataNascimento,
            nome: this.nome,
            id: this.email,
            password: this.password,
            is_admin: this.is_admin
            }
            axios.post(h + "utilizadores/", data)
                 .then(()=>{
                   this.$router.push('/')
                 })
            ///this.$store.dispatch('register', data)
            //.then(() => this.$router.push('/universidade'))
            //.catch(err => console.log(err))
        }
        else {
            alert('Ainda possuí campos por preencher!')
        }
      },
      onCursoChange: async function (item){
          let response = await axios.get(h + "cursos/" + item + "/anos")
          for(var i = 0; i < response.data.length; i++){
              this.anos.push(response.data[i].designacao)
              this.idAnos.push({ [response.data[i].designacao] :  response.data[i].id })
          }
      }
    }
  }
</script>

