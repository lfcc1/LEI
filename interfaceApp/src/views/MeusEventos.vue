<template>
  <div>
    <v-card>
        <material-card
          color="#900000"
          title="Meus Eventos"
        >
        </material-card>
            <v-list>
            <v-list-item
            v-for="(evento, index) in this.eventos"
            :key="evento.idEvento" 
            >
            <v-container>
            <v-card width="100%">
                <v-card-title v-text="evento.dados.info.nome">
                    <span class="headline font-weight-bold"></span>
                </v-card-title>
                <v-card-text class="title font-weight-light"   v-text="evento.dados.info.conteudo"/>
                <center> <v-btn color="#C0C0C0" dark @click="showDialog(index)"> Participantes ({{evento.dados.participantes.length}}) </v-btn> </center>
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
    dialog: []
  }),

  created: async function() {
    try {
        // ir á sessão
      var idUser = "lguilhermem@hotmail.com"
      var response = await axios.get(h + "eventos/participante/" + idUser)
      this.eventos = response.data
      console.log(this.eventos)
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
       updateEventos: function(){
           for(let i = 0; i < this.eventosParcerias.length; i++){
               this.dialog.push(false)
           }
       }
  }
}
</script>
