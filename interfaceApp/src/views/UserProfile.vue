<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    >
    <v-layout
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
          text="Dados do Meu Perfil"
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
                    v-model="this.user.info.curso"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                     :color="colorRed"
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
                    class="purple-input"
                    v-model="this.user._id"
                    disabled/>
                    
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Sexo"
                    class="purple-input"
                    v-model="this.user.info.sexo"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
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
                    class="purple-input"
                    v-model="this.user.info.numTelemovel"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    class="purple-input"
                    label="Exemplo3"
                    type="number"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn v-if="this._id == this.idUtilizador"
                    class="mx-0 font-weight-light"
                    color="#900000"
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
              src="https://randomuser.me/api/portraits/men/81.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">Estudante MIEI</h6>
            <h4 class="card-title font-weight-light">{{this.user.info.nome}}</h4>
            <p class="card-description font-weight-light">{{this.user.pubs.length}} publicações</p>
            <v-btn v-if="this._id != this.idUtilizador"
              color="#900000"
              round
              class="font-weight-light"
            >Seguir</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
    name: 'UserProfile',
    props:["utilizador"],
    data: () => ({
    colorRed: "#900000",
    ready: false,
    user: {}
  }),
   data: () => ({
    idUtilizador: "utilizador",
    user: {},
    userReady: false
  }),
   created: async function() {
    try {
      this.idUtilizador = this.$route.params.id
      // ir buscar à sessão
      var _id = 'lguilhermem@hotmail.com'
      let response = await axios.get(h + "utilizadores/" + this.idUtilizador )//
      console.log(response.data)
      this.user = response.data
      this.user._id = _id
      this.userReady = true
    } catch (e) {
      return e
    }
  },
}
</script>

