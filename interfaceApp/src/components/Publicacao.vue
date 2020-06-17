<template>
  <v-container>
    <center>
      <v-card class="mr-10 mt-3 mb-3 ml-10" width=80%>
    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
        Publicações
    </v-card-title>
    <!--<form method="post" id="publicacao" enctype="multipart/form-data"> !-->
        <div class="form-group files text-center" style="margin-top: 20px">
            <v-spacer></v-spacer>
            <textarea v-model="conteudo" placeholder="Escreva alguma publicação..." rows="5" style="width:80%; resize: none; border:1px solid #900000; "></textarea>

            <div class = "flex" style ="width:90%; padding-left:10%;">
    
                <v-file-input show-size v-model="files" placeholder="Anexar ficheiros" 
                 prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                <v-btn style="margin-left:58%;" color="#900000" type='submit' @click="inserePublicacao"> Publicar </v-btn>

            </div> 
        </div>
    </v-card>
    </center>
    <!--</form> !-->
    <hr>
    <div v-if="this.publicacoesAtuais.length==0">
        <center><h2> Ainda não existem publicações! </h2></center>
    </div>
    <div v-else >
      
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
            <v-card-text class="black--text" v-text="item.dados.info.dataPublicacao">
            </v-card-text>
    <v-text-field v-if="item.editar" class=" ml-4 black--text" v-model="item.dados.info.conteudo" multi-line autofocus/>

    <v-card-text v-else class="  black--text" v-text="item.dados.info.conteudo">

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
          <a  class="font-weight-bold black--text" v-text="item.dados.info.nomeUtilizador" @click="seeUser(item.dados.info.idUtilizador)"></a>
        </v-list-item-content>

        <v-row
          justify="end"
        >
          <v-icon color="#900000" class="mr-1">mdi-heart</v-icon>
          <span class=" black--text subheading mr-2">{{item.dados.info.likes}}</span>
          <v-icon class="mr-1" :color="corComentariosIcon" @click="openComentarios(item)">mdi-comment</v-icon>
          <span class="black--text subheading mr-2">{{item.dados.comentarios.length}}</span>
          <v-icon  color="#900000" class="mr-1 " @click="showFiles(item)">mdi-file</v-icon>
          <!--<v-btn class="mr-1" @click="showFiles = true" icon="mdi-myFileIcon"></v-btn> v-if="this.idUtilizador == item.dados.info.idUtilizador"  -->
          <span class="black--text subheading mr-2">{{item.dados.ficheiros.length}}</span>
          <v-icon v-if="utilizadorOwner(item.dados.info.idUtilizador)" color="#900000" class="mr-1" @click="item.editar = true">mdi-square-edit-outline</v-icon>
          <v-icon v-if="utilizadorOwner(item.dados.info.idUtilizador)" color="#900000" class="mr-1" @click="deletePub(item.idPublicacao)">mdi-close-thick</v-icon>
        
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
                <Comentario :comentarios="item.dados.comentarios" :idPublicacao="item.idPublicacao"/>
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
                    v-for="file in publicacaoAtual.dados.ficheiros"
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
  </v-container>
</template>

<script>
import axios from "axios"
import Comentario from '@/components/Comentario.vue'
var dateFormat = require('dateformat');
var FormData = require('form-data');

const h = require("@/config/hosts").hostAPI

    export default {
    name: 'Publicacao',
    props: ["publicacoes", "idGrupo", "tipoGrupo"],
    data (){ return{
        publicacoesAtuais: [],
        conteudo: "",
        files : [],
        idUtilizador:"",
        editConteudo:"",
        publicacaoAtual: {dados:{ficherios:[]}},
        dialog: false,
        corComentariosIcon: "#900001"
    }},
    created: function(){
      //ir buscar à sessão 
      this.idUtilizador = "lguilhermem@hotmail.com"
      this.publicacoesAtuais = this.publicacoes
      this.updatePubs()
    },
    methods: {
      inserePublicacao: async function(){
        var publicacao = {}
        if(this.conteudo != ""){
          publicacao.conteudo = this.conteudo
          //ir buscar à sessão
          publicacao.idUtilizador = this.idUtilizador
          publicacao.idGrupo = this.idGrupo
          axios.post(h + "publicacoes/", publicacao)
               .then(async id => {
                  await this.postFiles(id.data.id)
                  var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes")
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
 
        axios.post(h + 'ficheiros/',
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
        if(pub.dados.ficheiros.length>0){
          this.publicacaoAtual = pub
          this.dialog = true;
        }
        
      },
      seeUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      },
      updatePubs: function(){
        this.publicacoesAtuais.forEach(element=>{
          console.log(element)
          element.showComments = false;
          element.srcImage = 'http://localhost:3050/images/'+element.dados.info.idUtilizador
          element.editar = false;
        })
      },
      download: function(id, nome){
         axios({
            method: "get",
            url: h + "ficheiros/" + id + "/download",
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
          axios.delete(h+"publicacoes/"+id)
              .then(async r => {
                  var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes")
                  this.publicacoesAtuais = response.data
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

