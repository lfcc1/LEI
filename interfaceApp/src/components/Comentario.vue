<template>
  <v-list>
        <h5> Comentários </h5>
        <v-list-item
        v-for="comentario in comentariosAtuais"
        :key="comentario.idComentario" 
        >
        <v-row
          
          justify="begin"
        >
        <v-icon class="mr-1">mdi-account-circle</v-icon>
        <span class="subheading mr-2" @click="seeUser(comentario.idUtilizador)" >{{comentario.nomeUtilizador}}</span>
        <span class="subheading mr-2">{{comentario.conteudo}}</span>
        </v-row>
        </v-list-item>
        <input type="text" id="comentario" v-model="conteudo" style="width:80%; heigth:190%;" placeholder="Comente algo sobre a publicação.." />
        <v-btn @click="postComentario()">Comentar</v-btn>
    </v-list>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
    name: 'Comentario',
    props: ["comentarios", "idPublicacao"],
    data (){ return{
        publicacoesAtuais: [],
        comentariosAtuais: [],
        conteudo:""
    }},
    created: function(){
      this.comentariosAtuais = this.comentarios
      console.log(this.comentariosAtuais)
    },
    methods: {
        postComentario: async function(){
            var comentario = {}
            // vai buscar à sessão
            comentario.idUtilizador = "lguilhermem@hotmail.com"
            comentario.conteudo = this.conteudo
            await axios.post(h + 'publicacoes/' + this.idPublicacao + '/comentario', comentario)
            this.comentariosAtuais = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios')
        },
        seeUser: async function(idUser){
            this.$router.push({ name: 'UserProfile', params: {id: idUser }})
        }
    }
}
</script>