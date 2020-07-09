<template>
  <div>
    <v-card class="ma-8">
       <v-container v-if="this.eventos.length != 0">
            <v-list>
            <v-list-item
            v-for="evento in this.eventos"
            :key="evento.idEvento" 
            >
            <v-container>
            <v-card width="100%">
                <v-card-title v-text="evento.dados.info.nome">
                    <span class="headline font-weight-bold"></span>
                </v-card-title>
                <v-card-text class="title font-weight-light"   v-text="evento.dados.info.conteudo"/>
                <center> <v-btn color="#900000" dark @click="showDialog(evento)"> Participantes ({{evento.dados.participantes.length}}) </v-btn> </center> <p></p>
                <center>   Começa: {{ evento.dados.info.dataInicio }} </center> <p></p>
                <center>   Acaba: {{  evento.dados.info.dataFim }}  </center> <p/>
                <center>   Organizadores: </center>
                <v-list>
                <v-list-item v-for="parceria in evento.dados.parcerias" :key="parceria.idCurso" class="ma-0 justify-center">
                  <center>
                  <v-list-item-content>
                    <v-list-item-title v-text="parceria.nome"></v-list-item-title>
                  </v-list-item-content>
                  </center>
                </v-list-item>
                </v-list>
            </v-card>
            
            </v-container>
            </v-list-item>
            </v-list>
            <v-dialog
                    v-model="dialog"
                    width="500"
                >
                        <v-card>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Participantes
                        </v-card-title>
                        <v-list>
                        <v-list-item
                        v-for="participante in eventoAtual.dados.participantes"
                        :key="participante.idUtilizador"
                        @click="seeUser(participante.idUtilizador)" 
                        >

                        <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            :src="participante.srcImage"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content style="width: 50%;"> 
                            <v-list-item-title v-text="participante.nome"></v-list-item-title>
                        </v-list-item-content>

                        </v-list-item>
                        </v-list>
                        </v-card>
                    </v-dialog>
       </v-container>
       <v-container v-else>
         <center> <h3> Ainda não marcou que ia em nenhum evento. </h3> </center>
       </v-container>
      </v-card>
    </div>
</template>

<script>
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode";
const host = require("@/config/hosts").host
const h = require("@/config/hosts").hostAPI

export default {
  name: 'Evento',
  components: {
  },

  data: () => ({
    item: {},
    eventos: [],
    dialog: false,
    eventoAtual : {}
  }),

  created: async function() {
    try {
        // ir á sessão
      let token = localStorage.getItem("jwt")//.decode('UTF-8');
      this.token = token
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      var idUser = utilizador.idUtilizador
      var response = await axios.get(h + "eventos/participante/" + idUser + "?token=" + this.token)
      this.eventos = response.data
      console.log(this.eventos)
      this.eventoAtual = this.eventos[0]
      this.ready = true
      await this.updateEventos()
    } catch (e) {
      return e
    }
  },
  methods:{
      showDialog: function(evento){ 
        if(evento.dados.participantes.length > 0){
          this.eventoAtual = evento
          for(let i = 0; i < evento.dados.participantes.length; i++){
            evento.dados.participantes[i].srcImage = host+'images/' + evento.dados.participantes[i].idUtilizador
          }
          this.dialog = true  
        }
      },
       updateEventos: function(){
           for(let i = 0; i < this.eventosParcerias.length; i++){
               this.dialog.push(false)
           }
       },
      seeUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      }
  }
}
</script>
