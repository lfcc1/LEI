<template>
  <v-card class="ma-8">
        <v-container style= "width:65%">
            <v-text-field placeholder="Nome do Evento" v-model="nome" color="#900000"/>
            <v-text-field placeholder="Informação do Evento" v-model="conteudo" color="#900000"/>
            <label> Data de Início: </label>
            <v-layout wrap>
            <v-flex
                xs12
                md6
                style="padding-right:20px;"
            >
            <v-text-field placeholder="Dia de Início do Evento" type="date" :formatter="format" v-model="dataInicial" color="#900000" />
            </v-flex>
             <v-flex
                xs12
                md6
            >
            <v-text-field placeholder="Hora de Início do Evento" type="time" v-model="horaInicial" color="#900000"/>
             </v-flex>
            </v-layout>
            <label> Data de Fim: </label>
            <v-layout wrap>
            <v-flex
                xs12
                md6
                style="padding-right:20px;"
            >
            <v-text-field placeholder="Dia de Fim do Evento" type="date" :formatter="format" v-model="dataFinal" color="#900000"/>
            </v-flex>
            <v-flex
                xs12
                md6
            >
            <v-text-field placeholder="Hora de Fim do Evento" type="time" v-model="horaFinal" color="#900000"/>
            </v-flex>
            </v-layout>
            <v-combobox
                id="parcerias"
                v-model="parcerias"
                :items="cursos"
                label="Parcerias"
                multiple
            ></v-combobox>
            <center><v-btn @click="insertEvento()" color="#900000"> Adicionar Evento </v-btn> </center>
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
            :headers="header_eventos"
            :items="eventos"
            :footer-props="footer_props"
            :search="filtrar"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.dados.info.nome}}</td>
                        <td>{{row.item.dados.info.dataInicio}}</td>
                        <td>{{row.item.dados.info.dataFim}}</td>
                        <td>
                         <v-icon @click="apagarEvento(row.item.idEvento)"> mdi-delete </v-icon> 
                        </td>
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
  name: 'GestaoEvento',
  components: {
    
  },

  data: () => ({
    item: {},
    cursos: [],
    header_eventos: [
      {text: "Nome do Evento", sortable: true, value: 'dados.info.nome', class: 'subtitle-1'},
      {text: "Data Inicio", value: 'dados.info.dataInicio', class: 'subtitle-1'},
      {text: "Data Fim", value: 'dados.info.dataFim', class: 'subtitle-1'},
      {text: "Operações", class: 'subtitle-1'},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    nome:"",
    conteudo:"",
    dataInicial:"",
    dataFinal:"",
    horaInicial:"",
    horaFinal:"",
    parcerias:[],
    eventos: [],
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      let response = await axios.get(h + "cursos?token=" + this.token )//
      let aux = response.data
      for(var i = 0; i < aux.length; i++){
          this.cursos.push(aux[i].curso)
      }
      response = await axios.get(h + "eventos?token=" + this.token )
      this.eventos = response.data
    } catch (e) {
      return e
    }
  },
  methods:{
      apagarEvento: function(id){
          if(confirm("De certeza que quer apagar o evento?")){
              axios.delete(h + "eventos/" + id + "?token=" + this.token)
               .then(()=>{
                    axios.get(h + "eventos?token=" + this.token )
                        .then(dados =>{
                            this.eventos = dados.data
                        })

               })
          }
      },
      insertEvento: function(){
          if(this.parcerias != [] && this.dataInicial != "" && this.dataFinal != "" && this.horaInicial != "" && this.horaFinal != ""
                && this.nome != "" && this.conteudo != ""){
                    var evento = {
                        nome: this.nome, 
                        conteudo: this.conteudo,
                        dataInicio: this.dataInicial + " " + this.horaInicial,
                        dataFim: this.dataFinal + " " + this.horaFinal,
                        parcerias: this.parcerias
                    }
                    axios.post(h + "eventos?token=" + this.token, evento)

            }
            else{
                alert("Ainda não preencheu os campos todos!")
            }
          /*
            axios.post(h + "eventos?token=" + this.token, {id: this.idCurso, nome: this.designacao})
                .then(() =>{
                    axios.get(h + "cursos?token=" + this.token )
                         .then(dados =>{
                                this.cursos = dados.data
                        })
                })*/
      },
        format(value, event) {
    return moment(value).format('YYYY-MM-DD')
  }
  }
}
</script>
