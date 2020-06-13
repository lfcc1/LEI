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
    
                <v-file-input show-size v-model="files" v-on:change="processFile()" ref="files" placeholder="Anexar ficheiros" 
                 prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                <button style="margin-left:58%;" type='submit' @click="inserePublicacao"> Publicar </button>

            </div> 
        </div>
    <!--</form> !-->
    <hr>
    <div v-if="this.publicacoes.length==0">
        <center><h2> Ainda não existem publicações! </h2></center>
    </div>
    <div v-else>
         <v-list>
             <!--<v-list-item-group v-model="this.publicacoes" color="primary">!-->
            <v-list-item
                v-for="item in publicacoes"
                :key="item.idPublicacao"
            >
            
            <v-card
                class="mx-auto"
                color="#C0C0C0"
                dark
                width = "75%"
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
          <v-icon class="mr-1">mdi-comment</v-icon>
          <span class="subheading mr-2">{{item.dados.comentarios.length}}</span>
        </v-row>
        
      </v-list-item>
    </v-card-actions>
  </v-card>
            </v-list-item>
             <!--</v-list-item-group>!-->
        </v-list>
    </div>
  </v-container>
</template>

<script>
import axios from "axios"
var dateFormat = require('dateformat');
var FormData = require('form-data');

const h = require("@/config/hosts").hostAPI

    export default {
    name: 'Publicacao',
    props: ["publicacoes", "idGrupo", "tipoGrupo"],
    data (){ return{
        conteudo: "",
        files : [],
    }},
    created: function(){
      this.updatePubs()
    },
    methods: {
      inserePublicacao: async function(){
        //console.log(this.files)
        var publicacao = {}
        console.log(this.conteudo)
        if(this.conteudo != ""){
          console.log(publicacao)
          publicacao.conteudo = this.conteudo
          //ir buscar à sessão
          publicacao.idUtilizador = "lguilhermem@hotmail.com"
          publicacao.idGrupo = this.idGrupo
          var post = await axios.post(h + "publicacoes/", publicacao)
          var response = await axios.get(h + this.tipoGrupo + "/" + this.idGrupo + "/publicacoes")
          postFiles()
          this.publicacoes = response.data
          this.updatePubs()
        }
      },
      postFiles: function(){
        let formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
          formData.append("idPublicacao", idContainer)
        }

        /*
          Make the request to the POST /multiple-files URL
        */
       /*
        axios.post(h + 'ficheiros/',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )*/
      }
      ,
      makeLike: async function(){

      },
      showComments: async function(){

      },
      seeUser: async function(idUser){
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
      },
      updatePubs: function(){
        this.publicacoes.forEach(element=>{
          console.log(element.dataPublicacao)
          element.dataPublicacao = dateFormat(element.dataPublicacao, "yyyy-mm-dd h:MM:ss");
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

