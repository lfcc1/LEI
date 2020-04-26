<template>
  <v-card class="ma-8">
    <v-card-title class="justify-center white--text" style="background: #900000;" dark>
        {{item.info.designacao}} 
    </v-card-title>
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
        /*
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
        })*/
  },
    methods: {
        apresentaAno: function(item){
            //alert('Cliquei no ano: ' + JSON.stringify(item))
            this.item = {}
            //this.$router.push('ano/'+item.id ) 
        }
    }
}

</script>