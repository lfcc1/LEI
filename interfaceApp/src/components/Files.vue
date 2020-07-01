<template>
  <v-container>
      <center>
      <v-card class="mr-10 mt-3 mb-3 ml-10" width=80%>
            <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                Ficheiros
            </v-card-title>
            
                <div class="form-group files text-center" style="margin-top: 20px">
                        <div class = "flex" style ="width:80%; padding-left:25%;">
                
                            <v-file-input show-size v-model="files" placeholder="Anexar ficheiros" 
                            prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                            <v-btn style="margin-left:18%;" color="#900000" type='submit' @click="postFiles"> Publicar </v-btn>
                        </div>
                </div>
            <div v-if="ficheiros.length==0"> 
                <center><h2> Ainda não existem ficheiros publicados! </h2></center>
            </div>
            <div v-else>
                <v-card>
                    <v-card-text>
                        <v-text-field
                        v-model="filtrar"
                        label="Filtrar"
                        single-line
                        hide-details
                         ></v-text-field>
                        <v-data-table
                        :headers="header_files"
                        :items="ficheiros"
                        :footer-props="footer_props"
                        :search="filtrar"
                        @click:row="download"
                        >
                        </v-data-table>
                    </v-card-text>
                    </v-card>
            </div>
      </v-card>
      </center>
  </v-container>
</template>


<script>
import axios from "axios"
var FormData = require('form-data');
const h = require("@/config/hosts").hostAPI
const host = require("@/config/hosts").host
const ficheiroUrl = require("@/config/hosts").ficheiros

export default {
    props: ["idCadeira"],
    data() {
        return{
            ficheiros: [],
            idCadeira: "",
            token: "",
            files: [],
            filtrar:"",
            header_files: [
            {text: "Nome", value: 'nome', class: 'subtitle-1'},
            {text: "Data", sortable: true, value: 'data', class: 'subtitle-1'},
            ],
            footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, -1],
            "items-per-page-all-text": "Todos"
            }, 
        }
    },
    created: async function(){
        this.idCadeira = this.idCadeira
        this.token = localStorage.getItem("jwt")
        let response = await axios.get(h + "cadeiras/" + this.idCadeira + "/ficheiros?token=" + this.token)
        console.log(response.data)
        this.ficheiros = response.data
    },
    methods:{
        postFiles: async function(){
        if  (this.files.length == 0) return false
        let formData = new FormData();
        
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append("ficheiro", file);
        }
        formData.append("guardadoEm", this.idCadeira)
 
        axios.post(ficheiroUrl + 'ficheiros/ano?token=' + this.token,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then( async dados => {
            let response = await axios.get(h + "cadeiras/" + this.idCadeira + "/ficheiros?token=" + this.token)
            this.ficheiros = response.data
        })
      },
      download: function(item){
         var id = item.idFicheiro 
         var nome = item.nome
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
    }
}
</script>