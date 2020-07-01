<template>
  <v-container>
    <center>
    </center>
    <!--</form> !-->
    <hr>
    <div v-if="this.publicacoesAtuais.length==0">
        <center><h2> Não foram encontrados resultados para a sua Pesquisa! </h2></center>
    </div>
    <div v-else >
          <h2 class="ml-10 mt-3 mb-3 mr-10 justify-center" > Resultados da Pesquisa: </h2>
         <v-list v-model="publicacoesAtuais" color="transparent" class="justify-center">
            <!--<v-list-item-group disabled v-model="publicacoesAtuais" color="primary"> -->
            <v-list-item class="justify-center"
                v-for="item in publicacoesAtuais"
                :key="item.idPublicacao"
            >
            
            <v-card
                class="ml-10 mt-3 mb-3 mr-10 justify-center"
                color="white"
                dark
                width = "83%"
            
            >

            <v-card-actions>

                      <span justify="Start"  class=" font-weight-bold black--text" v-text="item.info.titulo"></span>
        <v-row
          justify="end"
        >
            <span justify="end"  class="black--text font-weight-bold ml-9" v-text="item.info.dataPublicacao">
            </span>
        </v-row>
          
    </v-card-actions>

    <v-text-field v-if="item.editar" class=" ml-4 black--text" v-model="item.info.conteudo" multi-line autofocus/>

    <v-card-text v-else class="  black--text" v-text="item.info.conteudo">

    </v-card-text>

    <v-card-actions>
      <v-list-item class>
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="item.srcImage"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <a  class="font-weight-bold black--text" v-text="item.info.nomeUtilizador" @click="seeUser(item.info.idUtilizador)"></a>
        </v-list-item-content>

        <v-row
          justify="end"
        >
          <v-icon v-if="!utilizadorGostou(item.gostos)" color="#900000" class="mr-1" @click="addLike(item.idPublicacao)">mdi-heart-outline</v-icon>
          <v-icon v-else color="#900000" class="mr-1" @click="deleteLike(item.idPublicacao)">mdi-heart</v-icon>
          <span class=" black--text subheading mr-2" @click="mostraLikes(item.gostos)">{{item.gostos.length}}</span>
          <v-icon class="mr-1" :color="corComentariosIcon" @click="openComentarios(item)">mdi-comment</v-icon>
          <span class="black--text subheading mr-2">{{item.comentarios.length}}</span>
          <v-icon  color="#900000" class="mr-1 " @click="showFiles(item)">mdi-file</v-icon>
          <!--<v-btn class="mr-1" @click="showFiles = true" icon="mdi-myFileIcon"></v-btn> v-if="this.idUtilizador == item.dados.info.idUtilizador"  -->
          <span class="black--text subheading mr-2">{{item.ficheiros.length}}</span>
          <v-icon v-if="utilizadorOwner(item.info.idUtilizador)" color="#900000" class="mr-1" @click="item.editar = true">mdi-square-edit-outline</v-icon>
          <v-icon v-if="utilizadorOwner(item.info.idUtilizador)" color="#900000" class="mr-1" @click="deletePub(item.idPublicacao)">mdi-close-thick</v-icon>
        
        </v-row>
            <v-spacer/>
      </v-list-item>
    </v-card-actions>
            <v-container
              v-if="item.showComments"
              width="70%"
              background-color="#e0e0e0"
            >
             <hr color="#900000" style="width:100%">
                        <!--<v-list v-if="item,dados.comentarios.length != 0" >-->
                <Comentario :comentarios="item.comentarios" :idPublicacao="item.idPublicacao"/>
            </v-container>
  </v-card>
            </v-list-item>
            <!--</v-list-item-group> -->
        </v-list>
    </div>
                      <v-dialog
                    v-model="dialog"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-list>
                    <v-list-item
                    v-for="file in publicacaoAtual.ficheiros"
                    :key="file.idFicheiro"
                    @click="download(file.idFicheiro, file.nome)" 
                    >
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="file.nome"></v-list-item-title>
                    </v-list-item-content>

                    </v-list-item>
                    
                    </v-list>
                    </v-card>
                    </v-dialog>
                  <v-dialog
                    v-model="showLikes"
                    width="500"
                    v-bind:style="{color:white}"
                  >
                    <v-card>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Gostos
                    </v-card-title>
                    <v-list>
                    <v-list-item
                    v-for="gosto in likesAtuais"
                    :key="gosto.idUtilizador"
                    @click="seeUser(gosto.idUtilizador)" 
                    >

                    <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            :src="gosto.fotoPerfil"
                          ></v-img>
                        </v-list-item-avatar>
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="gosto.nomeUtilizador"></v-list-item-title>
                    </v-list-item-content>

                    </v-list-item>
                    
                    </v-list>
                    </v-card>
                    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios"
import Comentario from '@/components/Comentario.vue'
import VueJwtDecode from "vue-jwt-decode";
var dateFormat = require('dateformat');
var FormData = require('form-data');

const host = require("@/config/hosts").host
const h = require("@/config/hosts").hostAPI
const ficheiroUrl = require("@/config/hosts").ficheiros

    export default {
    name: 'SearchResult',
    data (){ return{
        publicacoesAtuais: [],
        conteudo: "",
        titulo:"",
        files : [],
        idUtilizador:"",
        editConteudo:"",
        publicacaoAtual: {ficheiros:[]},
        dialog: false,
        showLikes: false,
        likesAtuais: [],
        corComentariosIcon: "#900001"
    }},
    created:async function(){
      //ir buscar à sessão 
      try{
      let token = localStorage.getItem("jwt")//.decode('UTF-8');
      this.token = token
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      var titulo = this.$route.params.titulo
      this.idUtilizador = utilizador.idUtilizador
      let res = await axios.get(h + "utilizadores/search/"+titulo + "?token=" + this.token)
      console.log(res)
      this.publicacoesAtuais = res.data

      console.log(this.publicacoesAtuais.length)
      this.updatePubs()
      }
     catch (e) {
        console.log(e)
    }

    },
    methods: {
      inserePublicacao: async function(){
        var publicacao = {}
        if(this.conteudo != ""){
          publicacao.conteudo = this.conteudo
          //ir buscar à sessão
          publicacao.idUtilizador = this.idUtilizador
          publicacao.idGrupo = this.idGrupo
          publicacao.titulo = this.titulo
          axios.post(h + "publicacoes?token=" + this.token, publicacao)
               .then(async id => {
                  await this.postFiles(id.data.id)
                  var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes?token=" + this.token)
                  this.publicacoesAtuais = response.data
                  this.conteudo = "";
                  this.files = []
                  this.updatePubs()
               })
               .catch(error => console.log(error))

          //this.updatePubs()
        }
      },
      openComentarios: function(item){
        if(item.showComments == false){
        item.showComments = true
        this.corComentariosIcon = "#900000"
        }
        else{
            item.showComments = false
            this.corComentariosIcon = "#900001"
        }
      },
      postFiles: function(id){
        if  (this.files.length == 0) return false
        let formData = new FormData();
        
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append("ficheiro", file);
        }
        formData.append("guardadoEm", id)
 
        axios.post(ficheiroUrl + 'ficheiros?token=' + this.token,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(() => {
          return true
        })
      }
      ,
      makeLike: async function(){

      },
      showComments: async function(){

      },
      showFiles: async function(pub){
        if(pub.ficheiros.length>0){
          this.publicacaoAtual = pub
          this.dialog = true;
        }
        
      },
      seeUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      },
      updatePubs: function(){
        console.log(this.publicacoesAtuais)
        this.publicacoesAtuais.forEach(element=>{
          console.log(element)
          element.showComments = false;
          element.srcImage = host+'images/'+element.info.idUtilizador
          element.editar = false;
        })
        console.log(this.publicacoesAtuais)
      },
      download: function(id, nome){
         axios({
            method: "get",
            url: ficheiroUrl + "ficheiros/" + id + "/download?token=" + this.token,
            responseType: 'arraybuffer'
          })
             .then(function (response) {

                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');

                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', nome);
                     document.body.appendChild(fileLink);

                     fileLink.click();
                })
      },
      deletePub: function(id){
        if(confirm("Tem a certeza que pretende eliminar esta publicação?")){
          axios.delete(h+"publicacoes/"+id + "?token=" + this.token)
              .then(async r => {
                  var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes?token=" + this.token)
                  this.publicacoesAtuais = response.data
                  this.updatePubs()
              })
              .catch(e => console.log(e))
        }
      },
      modoEditar: function(publicacao){
        /*
        var publicacaoNova = {}
        publicacaoNova.gostos = publicacao.gostos;
        publicacaoNova.conteudo = "Foi editada!"
        axios.put(h+"publicacoes/"+id, {publicacaoNova:publicacaoNova})
             .then(async r => {
                var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes")
                this.publicacoesAtuais = response.data
             })
             .catch(erro => console.log(erro))
             */
          
      },
      utilizadorOwner: function(idUtilizador){
        return this.idUtilizador == idUtilizador
      },
      addLike : function(idPublicacao){
        axios.put(h + 'publicacoes/' + idPublicacao + '/gosto?token=' + this.token, {idUtilizador : this.idUtilizador})
             .then(async dados =>{
                var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes?token=" + this.token)
                this.publicacoesAtuais = response.data
                this.updatePubs()
             })
      },
      deleteLike : function(idPublicacao){
        axios.put(h + 'publicacoes/' + idPublicacao + '/desgosto?token=' + this.token, {idUtilizador : this.idUtilizador})
             .then(async dados =>{
                var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes?token=" + this.token)
                this.publicacoesAtuais = response.data
                this.updatePubs()
             })
      },
      updateLikes : function(){
        this.likesAtuais.forEach(element =>{
          element.fotoPerfil = host+'images/'+element.idUtilizador
        })
      },
      mostraLikes: async function(likes){
        if(likes.length > 0){
          this.likesAtuais = likes
          await this.updateLikes()
          this.showLikes = true
        }
      },
      utilizadorGostou : function(likes){
        var result = false
        for(let i = 0; i < likes.length; i++){
          if(likes[i].idUtilizador == this.idUtilizador) result = true
        }
        return result
      }
    }
}
</script>

<style>
.mdi-myFileIcon::before {
  content: "\F39A";
  color: #900000;
}
.flex {
    display: flex;
}
</style>

