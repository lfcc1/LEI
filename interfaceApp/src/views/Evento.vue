<template>
  <div>
    <v-card>
        <material-card
          color="#900000"
          title="Eventos Gerais"
        >
        </material-card>
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
    title: "Eventos Gerais"
  }),

  created: async function() {
    try {
        // ir á sessão
      var idCurso = "MIEI"
      var response = await axios.get(h + "eventos/")
      this.eventos = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  },
  methods:{
       
  }
}
</script>
