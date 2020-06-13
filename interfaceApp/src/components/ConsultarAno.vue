<template>
  <v-card class="ma-8">
    <material-card
          color="#900000"
          :title="item.info[0].nome"
        >
    </material-card>
    <div style = "display:flex;">
        <div style="width: 20%;">
            <v-data-table
                :headers="header_cadeiras"
                :items="item.cadeiras"
                :hide-default-footer="true"
                @click:row="apresentaCadeiras"
                class="elevation-1"       
            >
            </v-data-table>
        </div>
        <hr>
        <div style = " width:80% ; display:flex;">
            <div style="width:50%;">
                <v-card-text>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                        Estudantes do Ano 
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
                        Responsáveis do Ano 
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
                        :items="item.responsaveis"
                        :footer-props="footer_props"
                        :search="filtrar"
                    >
                    </v-data-table>
                </v-card-text>
            </div>
        </div>
    </div>
    

  </v-card>
</template>


<script>
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
      {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'}
    ],
    header_cadeiras: [
        {text: "Cadeiras Lecionadas", sortable: true, value: 'designacao', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
  }),
    created: function(){
        
  },
    methods: {
        apresentaAno: function(item){
            
            this.$router.push('cadeira/'+item.id ) 
        }
    }
}

</script>