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
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md3
      >
        <material-card style="width: 75%" >
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              :src="srcImage"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">Estudante MIEI</h6>
            <h4 class="card-title font-weight-light">{{this.user.info.nome}}</h4>
            <p class="card-description font-weight-light">{{this.user.pubs.length}} publicações</p>
            <div v-if="isnotAmigo()">
            <v-btn
              color="#900000"
              round
              class="font-weight-light"
              @click="adicionarAmigo()"
            >Adicionar Amigo</v-btn>
            </div>
            <div v-else>
            <v-btn
              color="#900000"
              round
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
        <material-card style="width: 75%" >
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              :src="srcImage"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            
            <h6 class="category text-gray font-weight-thin mb-3">Estudante MIEI</h6>
            <h4 class="card-title font-weight-light">{{this.user.info.nome}}</h4>
            <p class="card-description font-weight-light">{{this.user.pubs.length}} publicações</p>
            <v-btn class="mx-0 font-weight-light" color="#900000" @click="dialogAmigos = true" >
              Amigos ({{this.user.amigos.length}})
            </v-btn>
            <input type="file" @change="processFile($event)">
            <v-btn @click="uploadImage()" color="#900000"> Upload Image </v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from "axios"
var FormData = require('form-data');
const h = require("@/config/hosts").hostAPI

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
    files:{},
    srcImage:""
  }),
   created: async function() {
    try {
      this.idUtilizador = this.$route.params.id
      // ir buscar à sessão
      this.srcImage = 'http://localhost:3050/images/' + this.idUtilizador
      this._id = 'lguilhermem@hotmail.com'
      let response = await axios.get(h + "utilizadores/" + this.idUtilizador )//
      console.log(response.data)
      this.user = response.data
      this.initVModels()
      this.updateAmigos()
      this.userReady = true
    } catch (e) {
      return e
    }
  },
  methods:{
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
        axios.put(h + "utilizadores/" + this.idUtilizador, {sexo: this.sexo, numAluno: this.numAluno, numTelemovel: this.numTelemovel, dataNasc: this.dataNasc})
            .then(async d =>{
              let response = await axios.get(h + "utilizadores/" + this.idUtilizador )//
              this.user = response.data
              this.initVModels()
              this.updateAmigos()
            })
            .catch(e => console.log(e))
      }
    },
    isnotAmigo: async function(){
      var result = true
      for(let i = 0; i < this.user.amigos.length; i++){
        if(this._id == this.user.amigos[i].idAmigo) result = false
      }
      return result
    },
    updateAmigos: async function(){
      this.user.amigos.forEach(element =>{
        element.fotoPerfil = "http://localhost:3050/images/" + element.idAmigo
      })
    }
    ,
    adicionarAmigo: async function(){
      if(confirm("Tem a certeza que pretende enviar pedido de amizade a " + this.user.info.nome +"?")){
        axios.post(h + "utilizadores/pedidosamizade/" + this._id, {idUtilizador2 : this.idUtilizador})
            .then(async e =>{
                let response = await axios.get(h + "utilizadores/" + this.idUtilizador )//
                this.user = response.data
            })
            .catch(e => console.log(e))
      }
    },
    removeAmigo: async function(){
      if(confirm("Tem a certeza que pretende remover a sua amizade com " + this.user.info.nome +"?")){
        axios.delete(h + "utilizadores/" + this._id +"/" + this.idUtilizador)
            .then(async e =>{
                let response = await axios.get(h + "utilizadores/" + this.idUtilizador )//
                this.user = response.data
            })
            .catch(e => console.log(e))
      }
    },
    uploadImage: async function(){
      let formData = new FormData();
      formData.append("ficheiro", this.files);
      await axios.post(h + "ficheiros/fotoPerfil",
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
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

