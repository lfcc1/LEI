<template>
<v-container  >
   
  <v-list color="#f0f0f0" class="pa-3">
        <center>
        <h3 class=" font-weight-bold " style="color:black"> Comentários </h3>
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
        <v-icon v-if="getPermissao(comentario.idUtilizador)"  style="height:50%; margin-top:10px" class="mr-1" color="#900000"  @click="deleteComentario(comentario.idComentario)">mdi-close-thick</v-icon>
       <!-- <span class="subheading mr-2 black--text" style="padding-top:11px" >{{comentario.conteudo}}</span>-->
         <v-card-text class="subheading mr-2 black--text" v-text="comentario.conteudo">
        </v-card-text>
        
        </v-row>
        <v-row
            justify="end"
        > 

        </v-row>
        
        <hr v-if="index < comentariosAtuais.length - 1" color="grey" style="width:100%">
        </v-container>
        </v-list-item>
        <textarea  class="black--text pa-3" v-model="conteudo"  placeholder="Comente algo sobre a publicação.."   rows="3" style="width:100%; resize: none; border:1px solid #000000;">
        
        </textarea>
        <v-btn @click="postComentario()" color= "#900000">Comentar</v-btn>
        
    </v-list>
</v-container>
</template>

<script>
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode";
const host = require("@/config/hosts").host
const h = require("@/config/hosts").hostAPI

export default {
    name: 'Comentario',
    props: ["comentarios", "idPublicacao", "isCurso", "idGrupo", "pai"],
    data (){ return{
        publicacoesAtuais: [],
        comentariosAtuais: [],
        conteudo:"",
        idUtilizador:""
    }},
    created: async function(){
      // ir buscar à sessão
      let token = localStorage.getItem("jwt")//.decode('UTF-8');
      this.token = token
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      this.idUtilizador = utilizador.idUtilizador
      this.utilizador = utilizador
      //this.comentariosAtuais = this.comentarios
      var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios?token=' + this.token)
      this.comentariosAtuais = response.data
      this.updateComentarios()
    },
    methods: {
        postComentario: async function(){
            var comentario = {}
            // vai buscar à sessão
            
            comentario.idUtilizador = this.idUtilizador
            comentario.conteudo = this.conteudo
            await axios.post(h + 'publicacoes/' + this.idPublicacao + '/comentario?token=' + this.token, comentario)
            var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios?token=' + this.token)
            this.comentariosAtuais = response.data
            this.updateComentarios()
            this.conteudo = "" 
            this.$emit("refresh",this.comentariosAtuais)
        },
        seeUser: async function(idUser){
            this.$router.push({ name: 'UserProfile', params: {id: idUser }})
        },
        deleteComentario: async function(id){
            axios.delete(h+"publicacoes/comentario/" + id + "?token=" + this.token)
                 .then(async e =>{
                    var response = await axios.get(h+'publicacoes/' + this.idPublicacao + '/comentarios?token=' + this.token)
                    this.comentariosAtuais = response.data
                    this.updateComentarios()
                    this.$emit("refresh",this.comentariosAtuais)
                 })
                 .catch(error => console.log(error))
        },
        updateComentarios: async function(){
            for(let i = 0; i < this.comentariosAtuais.length; i++){
                this.comentariosAtuais[i].fotoPerfil = host+ 'images/'+this.comentariosAtuais[i].idUtilizador
            }
        },
        utilizadorOwner: async function(comentario){
            return this.idUtilizador == comentario.idUtilizador
        }
        ,
      utilizadorTypeEquals: function(tipos, acess){
        var result = false
        tipos.forEach(element=> {
          if (element.classe == acess) result = true
        })
        return result
      },
      getPermissao: function(idUtilizador){
        if(this.idUtilizador == idUtilizador) return true
        if(this.utilizadorTypeEquals(this.utilizador.tipos, "Admin")) return true
        if(this.isCurso && this.utilizadorTypeEquals(this.utilizador.tipos, "Responsavel")){
          if(this.utilizador.ano == this.idGrupo || this.utilizador.ano == this.pai){
            return true
          }
        }
      },
    }
}
</script>