<template>
  <v-container>
    <v-container>
    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
        Publicações
    </v-card-title>
    </v-container>
    <!--<form method="post" id="publicacao" enctype="multipart/form-data"> !-->
        <div class="form-group files text-center">
            <v-spacer></v-spacer>
            <textarea v-model="conteudo" placeholder="Escreva alguma publicação..." rows="5" style="width:80%; resize: none; border:1px solid #900000; "></textarea>

            <div class = "flex" style ="width:90%; padding-left:10%;">
    
                <v-file-input show-size v-model="files" placeholder="Anexar ficheiros" 
                 prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                <button style="margin-left:58%;" type='submit' @click="inserePublicacao"> Publicar </button>

            </div> 
        </div>
    <!--</form> !-->
    <hr>
    <div v-if="this.publicacoesAtuais.length==0">
        <center><h2> Ainda não existem publicações! </h2></center>
    </div>
    <div v-else>
         <v-list v-model="publicacoesAtuais" >
            <!--<v-list-item-group disabled v-model="publicacoesAtuais" color="primary"> -->
            <v-list-item
                v-for="item in publicacoesAtuais"
                :key="item.idPublicacao"
            >
            <v-container>
            <v-card
                class="mx-auto"
                color="#C0C0C0"
                dark
                width = "80%"
            >
            <v-card-title v-text="item.dados.info.dataPublicacao">
            <span class="title font-weight-light"></span>
            </v-card-title>

    <v-card-text class="headline font-weight-bold" v-text="item.dados.info.conteudo">
      
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.dados.info.nomeUtilizador" @click="seeUser(item.dados.info.idUtilizador)"></v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">{{item.dados.info.likes}}</span>
          <v-icon class="mr-1" @click="item.showComments = true">mdi-comment</v-icon>
          <span class="subheading mr-2">{{item.dados.comentarios.length}}</span>
          <v-icon class="mr-1" @click="showFiles(item)">mdi-myFileIcon</v-icon>
          <!--<v-btn class="mr-1" @click="showFiles = true" icon="mdi-myFileIcon"></v-btn>-->
          <span class="subheading mr-2">{{item.dados.ficheiros.length}}</span>

        </v-row>
                  <v-dialog
                    v-if="item.dados.ficheiros.length != 0"
                    v-model="item.showFiles"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-list>
                    <v-list-item
                    v-for="file in item.dados.ficheiros"
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
        
      </v-list-item>
    </v-card-actions>
  </v-card>
          <v-container
                    v-if="item.showComments"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <!--<v-list v-if="item,dados.comentarios.length != 0" >-->
                  <Comentario :comentarios="item.dados.comentarios" :idPublicacao="item.idPublicacao"/>
                </v-container>
            </v-container>
            </v-list-item>
            <!--</v-list-item-group> -->
        </v-list>
    </div>
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
    }},
    created: function(){
      this.publicacoesAtuais = this.publicacoes
      this.updatePubs()
    },
    methods: {
      inserePublicacao: async function(){
        var publicacao = {}
        if(this.conteudo != ""){
          publicacao.conteudo = this.conteudo
          //ir buscar à sessão
          publicacao.idUtilizador = "lguilhermem@hotmail.com"
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
        pub.showFiles = true;
      },
      seeUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      },
      updatePubs: function(){
        this.publicacoesAtuais.forEach(element=>{
          console.log(element)
          element.showFiles = false;
          element.showComments = false;
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

