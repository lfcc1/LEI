<template>
<v-container>
  <v-list>
        <h5> Comentários </h5>
        <v-list-item
        v-for="comentario in comentariosAtuais"
        :key="comentario.idComentario" 
        >
        <v-row
          
          justify="start"
        >
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="comentario.fotoPerfil"
          ></v-img>
        </v-list-item-avatar>
        <span class="subheading mr-2" @click="seeUser(comentario.idUtilizador)" >{{comentario.nomeUtilizador}}</span>
        <span class="subheading mr-2">{{comentario.conteudo}}</span>
        </v-row>
        <v-row
            justify="end"
        >
        <v-icon v-if="utilizadorOwner(comentario)" class="mr-1" @click="deleteComentario(comentario.idComentario)">mdi-close-thick</v-icon>
        </v-row>

        </v-list-item>
        <input type="text" v-model="conteudo" style="width:80%; heigth:190%;" placeholder="Comente algo sobre a publicação.." />
        <v-btn @click="postComentario()">Comentar</v-btn>
    </v-list>
</v-container>
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
        conteudo:"",
        idUtilizador:""
    }},
    created: function(){
      // ir buscar à sessão
      this.idUtilizador = "lguilhermem@hotmail.com"
      
      this.comentariosAtuais = this.comentarios
      console.log(this.comentariosAtuais)
    },
    methods: {
        postComentario: async function(){
            var comentario = {}
            // vai buscar à sessão
            comentario.idUtilizador = this.idUtilizador
            comentario.conteudo = this.conteudo
            await axios.post(h + 'publicacoes/' + this.idPublicacao + '/comentario', comentario)
            var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios')
            this.comentariosAtuais = response.data
        },
        seeUser: async function(idUser){
            this.$router.push({ name: 'UserProfile', params: {id: idUser }})
        },
        deleteComentario: async function(id){
            axios.delete(h+"publicacoes/comentario/" + id)
                 .then(async e =>{
                    var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios')
                    this.comentariosAtuais = response.data
                 })
                 .catch(error => console.log(error))
        },
        updateComentarios: async function(){
            for(let i = 0; i < this.comentariosAtuais.length < 0; i++){
                this.comentariosAtuais[i].fotoPerfil = 'http://localhost:3050/images/'+this.comentariosAtuais[i].idUtilizador
            }
        },
        utilizadorOwner: async function(comentario){
            console.log(comentario.idUtilizador)
            console.log(this.idUtilizador)
            return this.idUtilizador == comentario.idUtilizador
        }
    }
}
</script>