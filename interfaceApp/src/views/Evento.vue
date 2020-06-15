<template>
  <div>
    <v-card>
        <material-card
          color="#900000"
          title="Eventos Gerais"
        >
        </material-card>
        <v-container v-if="this.eventos.length != 0">
        <v-list>
            <v-list-item
            v-for="evento in eventos"
            :key="evento.idEvento" 
            >
            <v-container>
            <v-card width="100%">
                <v-card-title v-text="evento.dados.info.nome">
                    <span class="headline font-weight-bold"></span>
                </v-card-title>
                <v-card-text class="title font-weight-light"   v-text="evento.dados.info.conteudo"/>
                <center> <v-btn color="#C0C0C0" dark @click="addParticipante(evento.idEvento)"> Participar </v-btn> </center>
                <center>   Começa: {{ evento.dados.info.dataInicio }} </center> <p></p>
                <center>   Acaba: {{  evento.dados.info.dataFim }}  </center> 
            </v-card>
            </v-container>
            </v-list-item>
            </v-list>
        </v-container>
        <v-container v-else>
            <center> <h3> Já se marcou como participante em todos os eventos ou ainda não existe nenhum evento agendado! </h3> </center>
        </v-container>
      </v-card>
    </div>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'Evento',
  components: {
  },

  data: () => ({
    item: {},
    eventos: [],
    title: "Eventos Gerais",
    idCurso: "",
    idUtilizador: ""
  }),

  created: async function() {
    try {
        // ir á sessão
      this.idCurso = "MIEI"
      this.idUtilizador = "lguilhermem@hotmail.com"
      await this.getEventos()
      this.ready = true
    } catch (e) {
      return e
    }
  },
  methods:{
        getEventos: async function(){
          this.eventos = []
          var response = await axios.get(h + "eventos/")
          var neweventos = response.data
          response = await axios.get(h+"utilizadores/" + this.idUtilizador +'/eventos')
          var eventosParticipa = response.data
          for(let i = 0; i<neweventos.length; i++){
              var result = false;
              var idEvento = neweventos[i].idEvento

              for(let j = 0; !result && j<eventosParticipa.length; j++){
                if(eventosParticipa[j].idEvento == idEvento) result = true 
              }

              if(!result) this.eventos.push(neweventos[i]) 
          }
          //await this.updateEventos()

        },
        addParticipante: async function(idEvento){
         await axios.put(h + 'utilizadores/evento/', {idEvento: idEvento, idUtilizador: this.idUtilizador} )
         await this.getEventos()
      },
      
  }
}
</script>
