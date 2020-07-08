<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    >
    <v-layout v-if="!utilizadorOwner()"
      justify-center
      wrap
    >
      <v-flex
        xs12
        md9
      >
        <material-card
          :color="colorRed"
          title="Página de Perfil"
          text="Dados do Perfil"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md7
                >
                  <v-text-field
                    label="Curso"
                    prepend-icon="mdi-school"
                    :color="colorRed"
                    v-model="this.user.info.curso"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                     :color="colorRed"
                     prepend-icon="mdi-account-card-details"
                    label="Número de aluno"
                    v-model="this.user.info.numAluno"
                    disabled
                  />
                </v-flex>
                <v-flex
                  xs12
                  md7
                >
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    class="purple-input"
                    v-model="this.idUtilizador"
                    disabled/>
                    
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Sexo"
                    prepend-icon="mdi-gender-male-female"
                    class="purple-input"
                    v-model="this.user.info.sexo"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    prepend-icon="mdi-calendar-question"
                    label="Data Nascimento"
                    class="purple-input"
                    v-model="this.user.info.dataNasc"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Número de Telemóvel"
                    prepend-icon="mdi-cellphone-android"
                    class="purple-input"
                    v-model="this.user.info.numTelemovel"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                </v-flex>
              </v-layout>
              <v-container v-if="isAmigo()">
                 <center><h3> Publicações no grupo geral (UM) </h3></center>
                 <div>
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

                      <span justify="Start"  class=" font-weight-bold black--text" v-text="item.dados.info.titulo"></span>
        <v-row
          justify="end"
        >
            <span justify="end"  class="black--text font-weight-bold ml-9" v-text="item.dados.info.dataPublicacao">
            </span>
        </v-row>
          
    </v-card-actions>

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
          <v-icon v-if="!utilizadorGostou(item.dados.gostos)" color="#900000" class="mr-1" @click="addLike(item.idPublicacao)">mdi-heart-outline</v-icon>
          <v-icon v-else color="#900000" class="mr-1" @click="deleteLike(item.idPublicacao)">mdi-heart</v-icon>
          <span class=" black--text subheading mr-2" @click="mostraLikes(item.dados.gostos)">{{item.dados.gostos.length}}</span>
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
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md3
      >
        <material-card style="width: 95%" >
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              @click="dialogImage = true"
              :src= srcImage
            >
          </v-avatar>
          <v-dialog
          v-model="dialogImage"
          width="500"
          v-bind:style="{color:white}"
          >
              <v-card>
                <v-img
                  :src="srcImage"
                />
              </v-card>
          </v-dialog>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">Estudante MIEI</h6>
            <h4 class="card-title font-weight-light">{{this.user.info.nome}}</h4>
            <p class="card-description font-weight-light">{{this.user.pubs.length}} publicações</p>
            <div v-if="!isAmigo()">
            <v-btn
              color="#900000"
              class="font-weight-light"
              @click="adicionarAmigo()"
            > <v-icon>mdi-account-plus-outline</v-icon> Adicionar Amigo</v-btn>
            </div>
            <div v-else>
            <v-btn
              color="#900000"
              class="font-weight-light"
              @click="removerAmigo()"
            >Remover Amizade</v-btn>
            </div>
            <v-btn class="font-weight-light" color="#900000" @click="dialogAmigos = true" >
              Amigos ({{this.user.amigos.length}})
            </v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
                       <v-dialog
                    v-model="dialogAmigos"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Amigos de {{this.user.info.nome}}
                        </v-card-title>
                        <v-list>
                        <v-list-item
                        v-for="amigo in user.amigos"
                        :key="amigo.idAmigo"
                        @click="seeUser(amigo.idAmigo)" 
                        >
                        <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            :src="amigo.fotoPerfil"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content style="width: 50%;"> 
                            <v-list-item-title v-text="amigo.nome"></v-list-item-title>
                        </v-list-item-content>

                        </v-list-item>
                        
                        </v-list>
                        </v-card>
                    </v-dialog>
    </v-layout>
    <v-layout v-else
      justify-center
      wrap
    >
      <v-flex
        xs12
        md9
      >
        <material-card
          :color="colorRed"
          title="Meu Perfil"
          text="Dados do Perfil"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md7
                >
                  <v-text-field
                    label="Curso"
                    :color="colorRed"
                    prepend-icon="mdi-school"
                    v-model="this.user.info.curso"
                    disabled
                    />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                     :color="colorRed"
                    label="Número de aluno"
                    prepend-icon="mdi-account-card-details"
                    v-model="numAluno"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md7
                >
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    class="purple-input"
                    v-model="this.idUtilizador"
                    disabled/>
                    
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                <v-combobox
                  id="genero"
                  v-model="sexo"
                  prepend-icon="mdi-gender-male-female"
                  :items="['Masculino', 'Feminino', 'Outro']"
                  label="Género"
                ></v-combobox>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    prepend-icon="mdi-calendar-question"
                    label="Data Nascimento"
                    class="purple-input"
                    :formatter="format"
                    v-model="dataNasc"
                    type="date"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Número de Telemóvel"
                    class="purple-input"
                    prepend-icon="mdi-cellphone-android"
                    v-model="numTelemovel"
                    type="number"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                 <v-dialog
                    v-model="dialogAmigos"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Os teus amigos 
                        </v-card-title>
                        <v-list>
                        <v-list-item
                        v-for="amigo in user.amigos"
                        :key="amigo.idAmigo"
                        @click="seeUser(amigo.idAmigo)" 
                        >
                        <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            :src="amigo.fotoPerfil"
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content style="width: 50%;"> 
                            <v-list-item-title v-text="amigo.nome"></v-list-item-title>
                        </v-list-item-content>

                        </v-list-item>
                        
                        </v-list>
                        </v-card>
                    </v-dialog>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="#900000"
                    @click="updateUtilizador()"
                  >
                    Editar Perfil
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>        
      </v-flex>
      <v-flex
        xs12
        md3
      >
        <material-card style="width: 95%" >
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <v-img
              @click="dialogImage = true"
              :src="srcImage"
            />
          </v-avatar>
          <v-dialog
                    v-model="dialogImage"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                          <v-img
                            :src="srcImage"
                          />
                        </v-card>
          </v-dialog>
            <v-card-text class="text-xs-center">
            <label for="file-input" style="display: inline-block; cursor: pointer;">
              <v-icon> mdi-camera </v-icon> Escolha uma foto
            </label>
            <input id="file-input" type="file" @change="processFile($event)" style="display: none;">
            <input/>
            <v-btn @click="uploadImage()" color="#900000"> Confirmar </v-btn>
            <h4 class="card-title font-weight-light">{{this.user.info.nome}}</h4>
            <p class="card-description font-weight-light">{{this.user.pubs.length}} publicações</p>
            <v-btn class="mx-0 font-weight-light" color="#900000" @click="dialogAmigos = true" >
              Amigos ({{this.user.amigos.length}})
            </v-btn>            
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from "axios"
var FormData = require('form-data');
import VueJwtDecode from "vue-jwt-decode";
const h = require("@/config/hosts").hostAPI
const host = require("@/config/hosts").host
const ficheiroUrl = require("@/config/hosts").ficheiros


export default {
    name: 'UserProfile',
    props:["utilizador"],
   data: () => ({
    colorRed: "#900000",
    idUtilizador: "",
    user: {},
    numAluno: "",
    numTelemovel:"",
    dataNasc:"",
    sexo: "",
    userReady: false,
    dialogAmigos: false,
    dialogImage: false,
    files:{},
    srcImage:"",
    publicacoesAtuais: [],
    publicacaoAtual: {dados:{ficheiros:[]}},
    showLikes: false,
    dialog: false,
    likesAtuais:[],
    corComentariosIcon: "#900001",
    editConteudo:"",


  }),
   created: async function() {
    try {
      let token = localStorage.getItem("jwt")//.decode('UTF-8');
      this.token = token
      let utilizador = JSON.parse(localStorage.getItem("utilizador"))
      this.idUtilizador = this.$route.params.id
      // ir buscar à sessão
      this.srcImage = host+'/images/' + this.idUtilizador
      this._id = utilizador.idUtilizador
	    //if (current_time > token.exp) { alert("EXPIRED") }
      let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "?token=" + this.token )//
      console.log(response.data)
      this.user = response.data
      response = await axios.get(h+ "utilizadores/" + this.idUtilizador + "/publicacoes?token=" + this.token)
      this.publicacoesAtuais = response.data
      this.updatePubs()
      console.log(response.data)
      this.initVModels()
      this.updateAmigos()
      this.userReady = true
    } catch (e) {
      return e
    }
  },
  methods:{
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
      updatePubs: function(){
        this.publicacoesAtuais.forEach(element=>{
          console.log(element)
          element.showComments = false;
          element.srcImage = host+'images/'+element.dados.info.idUtilizador
          element.editar = false;
        })
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
          axios.delete(h+"publicacoes/"+id+"?token=" + this.token)
              .then(async r => {
                  var response = await axios.get(h+ "utilizadores/" + this.idUtilizador + "/publicacoes?token=" + this.token)
                  this.publicacoesAtuais = response.data
                  this.updatePubs()
              })
              .catch(e => console.log(e))
        }
      },
      showFiles: async function(pub){
        if(pub.dados.ficheiros.length>0){
          this.publicacaoAtual = pub
          this.dialog = true;
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
        axios.put(h + 'publicacoes/' + idPublicacao + '/gosto?token=' + this.token, {idUtilizador : this._id})
             .then(async dados =>{
                var response = await axios.get(h+ "utilizadores/" + this.idUtilizador + "/publicacoes?token=" + this.token)
                this.publicacoesAtuais = response.data
                this.updatePubs()
             })
      },
      deleteLike : function(idPublicacao){
        axios.put(h + 'publicacoes/' + idPublicacao + '/desgosto?token=' + this.token, {idUtilizador : this._id})
             .then(async dados =>{
                var response = await axios.get(h+ "utilizadores/" + this.idUtilizador + "/publicacoes?token=" + this.token)
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
          if(likes[i].idUtilizador == this._id) result = true
        }
        return result
      },
    seeUser: async function(idUser){
        this.dialogAmigos = false
        this.$router.push({ name: 'UserProfile', params: {id: idUser }})
        this.$router.go(0)
      },
    initVModels: function(){
      this.numAluno = this.user.info.numAluno
      this.numTelemovel = this.user.info.numTelemovel
      this.sexo = this.user.info.sexo
      this.dataNasc = this.user.info.dataNasc
    },
    utilizadorOwner: function(){
      return this._id == this.idUtilizador
    },
    updateUtilizador: async function(){
      if(confirm("Tem a certeza que pretende alterar o seu perfil?")){
        axios.put(h + "utilizadores/" + this.idUtilizador + "?token=" + this.token, {sexo: this.sexo, numAluno: this.numAluno, numTelemovel: this.numTelemovel, dataNasc: this.dataNasc})
            .then(async d =>{
              let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "?token=" + this.token )//
              this.user = response.data
              this.initVModels()
              this.updateAmigos()
            })
            .catch(e => console.log(e))
      }
    },
    isAmigo: function(){
      var result = false
      for(let i = 0; i < this.user.amigos.length; i++){
        if(this._id == this.user.amigos[i].idAmigo) result = true
      }
      console.log(result)
      return result
    },
    updateAmigos: async function(){
      this.user.amigos.forEach(element =>{
        element.fotoPerfil = host+"images/" + element.idAmigo
      })
    }
    ,
    adicionarAmigo: async function(){
      if(confirm("Tem a certeza que pretende enviar pedido de amizade a " + this.user.info.nome +"?")){
        axios.post(h + "utilizadores/pedidosamizade/" + this._id + "?token=" + this.token, {idUtilizador2 : this.idUtilizador})
            .then(async e =>{
                let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "?token=" + this.token )//
                this.user = response.data
                this.updateAmigos()
            })
            .catch(e => console.log(e))
      }
    },
    removerAmigo: async function(){
      if(confirm("Tem a certeza que pretende remover a sua amizade com " + this.user.info.nome +"?")){
        //await axios.put(h + "conversas/")
        //this.$emit('refreshConversas')
        axios.delete(h + "utilizadores/amigos/" + this._id +"/" + this.idUtilizador + "?token=" + this.token)
            .then(async e =>{
                let response = await axios.get(h + "utilizadores/" + this.idUtilizador + "?token=" + this.token )//
                this.user = response.data
                this.updateAmigos()
            })
            .catch(e => console.log(e))
      }
    },
    uploadImage: async function(){
      let formData = new FormData();
      console.log(this.files)
      formData.append("ficheiro", this.files);
      formData.append("idUtilizador", this._id)
      await axios.post(h + "ficheiros/fotoPerfil",
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
      this.$router.go(0)
    },
    processFile(event) {
    this.files = event.target.files[0]
  },
  format(value, event) {
    return moment(value).format('YYYY-MM-DD')
  }
  }
}
</script>


<style>
.image-upload>input {
  display: none;
}
</style>
