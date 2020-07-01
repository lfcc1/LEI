<template>
  <v-container>
      <center>
      <v-card class="mr-10 mt-3 mb-3 ml-10" width=80%>
            <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                Ficheiros
            </v-card-title>
            
                <div v-if="pasta!= ''" class="form-group files text-center" style="margin-top: 20px">
                    
                        <div class = "flex" style ="width:80%; padding-left:25%;">
                
                            <v-file-input show-size v-model="files" placeholder="Anexar ficheiros" 
                            prepend-icon="mdi-myFileIcon" multiple="multiple" style="width:20%; color:#900000;"/> 

                            <v-btn style="margin-left:18%;" color="#900000" type='submit' @click="postFiles"> Publicar </v-btn>
                        </div>
                </div>
            <div v-if="pastas.length==0"> 
                <center><h2> Ainda não existem ficheiros publicados! </h2></center>
            </div>
            <div v-else>
                <v-card>

                <div
                   style="width:80%"
                >

    <v-list two-line subheader>

      <v-list-item
        v-for="item in pastas"
        :key="item.idPasta"
        @click="showPastaFicheiros(item)"
      >
        <v-list-item-avatar>
          <v-icon class= 'grey lighten-1 white--text'
          >
          mdi-folder</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.nome"></v-list-item-title>
        </v-list-item-content>

      </v-list-item>

      <v-divider inset></v-divider>
       <v-card-title class="justify-center" style=" color: #900000;" dark>
                {{this.pasta.nome}}
            </v-card-title>

      <v-list-item
        v-for="item in ficheiros"
        :key="item.idFicheiro"
      >
        <v-list-item-avatar @click="download(item)" style="cursor:pointer">
          <v-icon color=#900000
          >mdi-file-document</v-icon>
        </v-list-item-avatar>

        <v-list-item-content @click="download(item)" style="cursor:pointer">
          <v-list-item-title v-text="item.nome"></v-list-item-title>
          <v-list-item-subtitle v-text="item.data"></v-list-item-subtitle>
        </v-list-item-content>

                <v-list-item-action>
          <v-btn icon @click="deleteFile(item)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>

      </v-list-item>
    </v-list>
  </div>
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
            pastas: [],
            ficheiros: [],
            idCadeira: "",
            token: "",
            pasta: "",
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
            items: [
                { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
                { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
                { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' },
            ],
            items2: [
                { icon: 'mdi-assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
                { icon: 'mdi-call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' },
            ], 
        }
    },
    created: async function(){
        this.idCadeira = this.idCadeira
        this.token = localStorage.getItem("jwt")
        let response = await axios.get(h + "cadeiras/" + this.idCadeira + "/pastas?token=" + this.token)
        console.log(response.data)
        this.pastas = response.data
    },
    methods:{
        deleteFile : async function (item){
            if(confirm("Tem a certeza que pretende apagar este Ficheiro?")){
            await axios.delete(ficheiroUrl + 'ficheiros/'+item.idFicheiro+'?token=' + this.token)
            let response = await axios.get(h + "cadeiras/pastas/"+this.pasta.idPasta+"/ficheiros/?token=" + this.token)
            this.ficheiros = response.data
            }

        },
        postFiles: async function(){
        if  (this.files.length == 0) return false
        let formData = new FormData();
        
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append("ficheiro", file);
        }
        formData.append("guardadoEm", this.pasta.idPasta)
 
        axios.post(ficheiroUrl + 'ficheiros/pastas?token=' + this.token,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then( async dados => {
            let response = await axios.get(h + "cadeiras/pastas/"+this.pasta.idPasta+"/ficheiros/?token=" + this.token)
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
      showPastaFicheiros: async function(item) {
          let response = await axios.get(h + "cadeiras/pastas/"+item.idPasta+"/ficheiros?token=" + this.token)
          this.ficheiros = response.data
          console.log(this.ficheiros)
          this.pasta = item
      }
    }
}
</script>