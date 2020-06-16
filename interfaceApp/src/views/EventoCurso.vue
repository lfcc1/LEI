<template>
  <div>
    <v-card>
        <material-card
          color="#900000"
          title="Eventos do teu curso"
        >
        </material-card>
          <v-container v-if="this.eventosParcerias.length != 0">
            <v-list>
            <v-list-item
            v-for="(evento, index) in this.eventosParcerias"
            :key="evento.idEvento" 
            >
            <v-container>
            <v-card width="100%">
                <v-card-title v-text="evento.dados.info.nome">
                    <span class="headline font-weight-bold"></span>
                </v-card-title>
                <v-card-text class="title font-weight-light"   v-text="evento.dados.info.conteudo"/>
                <center> <v-btn color="#C0C0C0" dark @click="showDialog(index)"> Participantes ({{evento.dados.participantes.length}}) </v-btn> </center>
                <center> <v-btn color="#C0C0C0" dark @click="addParticipante(evento.idEvento)"> Participar </v-btn> </center>
                <center>   Começa: {{ evento.dados.info.dataInicio }} </center> <p></p>
                <center>   Acaba: {{  evento.dados.info.dataFim }}  </center> <p/>
                <center>   Organizador: {{evento.dados.parcerias[0].nome}} </center>
            </v-card>
            <v-dialog
                    v-if="dialog[index]"
                    width="500"
                >
                        <v-card>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Participantes
                        </v-card-title>
                        <v-list>
                        <v-list-item
                        v-for="participante in evento.dados.participantes"
                        :key="participante.idUtilizador"
                        @click="showUser(participante.idUtilizador)" 
                        >
                        <v-list-item-content style="width: 50%;"> 
                            <v-list-item-title v-text="participante.nome"></v-list-item-title>
                        </v-list-item-content>

                        </v-list-item>
                        </v-list>
                        </v-card>
                    </v-dialog>
            </v-container>
            </v-list-item>
            </v-list>
          </v-container>
          <v-container v-else>
           <center> <h3> Já marcou como participante em todos os eventos ou o seu curso não tem nenhum evento agendado! </h3> </center>
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
    eventosParcerias: [],
    dialog: [],
    idUtilizador: "",
    idCurso: "",
  }),

  created: async function() {
    try {
      // ir á sessão
      this.idUtilizador = "lguilhermem@hotmail.com"
      this.idCurso = "MIEI"
      await this.getEventos()
      this.ready = true
      await this.updateEventos()
    } catch (e) {
      return e
    }
  },
  methods:{
      showDialog: function(index){ 
          console.log(this.eventosParcerias[index].dialog)
          this.dialog[index] = true
          console.log(this.eventosParcerias)
      },
      getEventos: async function(){
        this.eventosParcerias = []
        var response = await axios.get(h + "eventos/parceria/" + this.idCurso)
        var neweventosParcerias = response.data
        response = await axios.get(h+"utilizadores/" + this.idUtilizador +'/eventos')
        var eventosParticipa = response.data
        for(let i = 0; i<neweventosParcerias.length; i++){
          var result = false;
          var idEvento = neweventosParcerias[i].idEvento
          for(let j = 0; !result && j<eventosParticipa.length; j++){
            if(eventosParticipa[j].idEvento == idEvento) result = true 
          }
          if(!result) this.eventosParcerias.push(neweventosParcerias[i])
        }
        await this.updateEventos()

        }
      ,
      addParticipante: async function(idEvento){
         await axios.put(h + 'utilizadores/evento/', {idEvento: idEvento, idUtilizador: this.idUtilizador} )
         await this.getEventos()
      },
       updateEventos: function(){
           for(let i = 0; i < this.eventosParcerias.length; i++){
               this.dialog.push(false)
           }
       }
  }
}
</script>
