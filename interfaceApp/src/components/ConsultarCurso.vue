<template>
  <v-card class="ma-8">
    <v-card-title class="justify-center white--text" style="background: #900000;" dark>
        {{item.idCurso}} ({{item.info.designacao}}) 
    </v-card-title>
    <v-spacer></v-spacer>
    <div style = "display:flex;">
        <div style="width: 20%;">
            <v-data-table
                :headers="header_anos"
                :items="item.anos"
                :hide-default-footer="true"
                @click:row="apresentaAno"
                class="elevation-1"       
            >
            </v-data-table>
        </div>
        <hr>
        <div style = " width:80% ; display:flex;">
            <div style="width:50%;">
                <v-card-text>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                        Estudantes do Curso 
                    </v-card-title>
                    <v-text-field
                    v-model="filtrar"
                    label="Filtrar"
                    single-line
                    hide-details
                    dark
                    ></v-text-field>
                    <v-data-table
                        :headers="header_estudantes"
                        :items="item.estudantes"
                        :footer-props="footer_props"
                        :search="filtrar"
                        
                    >
                    </v-data-table>
                </v-card-text>
            </div>
            <v-spacer></v-spacer>
            <hr>
            <v-spacer></v-spacer>
            <div style="width:50%; ">
                <v-card-text>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                        Responsáveis do Curso 
                    </v-card-title>
                    <v-text-field
                        v-model="filtrar"
                        label="Filtrar"
                        single-line
                        hide-details
                        dark
                    ></v-text-field>
                    <v-data-table
                        :headers="header_responsaveis"
                        :items="responsaveis"
                        :footer-props="footer_props"
                        :search="filtrar"
                    >
                    </v-data-table>
                </v-card-text>
            </div>
        </div>
    </div>
    <hr>
    <div>
    </div>
  </v-card>
</template>

<script>
import TopBar from './TopBarCurso.vue'
import axios from "axios"
const h = require("@/config/hosts").hostAPI
export default {
    name: 'Consulta',
    props: ["item"],
    data: () => ({
    header_estudantes: [
      {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'}
    ],
    header_responsaveis: [
      {text: "Ano", sortable: true, value: 'ano', class: 'subtitle-1'},
      {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'}
    ],
    header_anos: [
        {text: "Anos Integrados", sortable: true, value: 'designacao', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
  }),
    created: function(){
        this.responsaveis = []
        this.item.responsaveis.forEach(item => {
            var ano = item.ano
            item.responsaveis.forEach(responsavel => {
                var r = {
                    ano : ano ,
                    nome : responsavel.nome,
                    id : responsavel.id,
                    numeroAluno : responsavel.numeroAluno
                }
                this.responsaveis.push(r)
            })
        })
  },
    methods: {
        apresentaAno: function(item){
            //alert('Cliquei no ano: ' + JSON.stringify(item))
            this.item = {}
            this.$router.push({name : 'ano', params:{id : item.id} }, () => {}) 
        }
    }
}

</script>