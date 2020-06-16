<template>
<v-container class="white">
   
  <v-list class="white">
        <center>
        <h3 class=" font-weight-bold " style="color:#900000"> Comentários </h3>
        </center>
        <v-list-item
        v-for="(comentario,index) in comentariosAtuais"
        :key="comentario.idComentario" 
        >
         <v-container style="padding: 0px">
        <v-row
          
          justify="start"
        >
        <v-list-item-avatar>
          <v-img
            class="elevation-6"
            :src="comentario.fotoPerfil"
          ></v-img>
        </v-list-item-avatar>
        
        <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px" @click="seeUser(comentario.idUtilizador)" >{{comentario.nomeUtilizador}}</span>
         <span class="subheading mr-2 black--text" style="padding-top:11px" >{{comentario.data}}</span>
        <v-icon v-if="utilizadorOwner(comentario)"  style="height:50%; margin-top:10px" class="mr-1" color="#900000"  @click="deleteComentario(comentario.idComentario)">mdi-close-thick</v-icon>
       <!-- <span class="subheading mr-2 black--text" style="padding-top:11px" >{{comentario.conteudo}}</span>-->
         <v-card-text class="subheading mr-2 black--text" v-text="comentario.conteudo">
        </v-card-text>
        
        </v-row>
        <v-row
            justify="end"
        > 

        </v-row>
        
        <hr v-if="index < comentariosAtuais.length - 1" color="#900000" style="width:100%">
        </v-container>
        </v-list-item>
        <textarea  class="black--text" v-model="conteudo"  placeholder="Comente algo sobre a publicação.."   rows="3" style="width:100%; resize: none; border:1px solid #000000;">
        
        </textarea>
        <v-btn @click="postComentario()" color= "#900000">Comentar</v-btn>
        
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
      this.updateComentarios()
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
            this.updateComentarios()
            this.conteudo = "" 
        },
        seeUser: async function(idUser){
            this.$router.push({ name: 'UserProfile', params: {id: idUser }})
        },
        deleteComentario: async function(id){
            axios.delete(h+"publicacoes/comentario/" + id)
                 .then(async e =>{
                    var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios')
                    this.comentariosAtuais = response.data
                    this.updateComentarios()
                 })
                 .catch(error => console.log(error))
        },
        updateComentarios: async function(){
            for(let i = 0; i < this.comentariosAtuais.length; i++){
                this.comentariosAtuais[i].fotoPerfil = 'http://localhost:3050/images/'+this.comentariosAtuais[i].idUtilizador
                console.log("http://localhost:3050/images/"+this.comentariosAtuais[i].idUtilizador)
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