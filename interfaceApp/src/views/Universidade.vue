<template>
  <div>
        <p v-if="!ready">A ir buscar o Grupo à BD...</p>
        <div v-else> 
            <v-card class="ma-8">
              <v-container style="width:76%">
                <Publicacao :publicacoes="this.item.publicacoes" :idGrupo="this.idUniversidade" :tipoGrupo="this.tipoGrupo" />
              </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'consulta',
  components: {
    
  },

  data: () => ({
    item: {},
    idUniversidade: "",
    tipoGrupo: "",
    ready: false
  }),

  created: async function() {
    try {
      this.idUniversidade = "UM"
      this.tipoGrupo = "cursos"
      let response = await axios.get(h + "cursos/" + this.idUniversidade )//
      console.log(response.data)
      this.item = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  }
}
</script>
