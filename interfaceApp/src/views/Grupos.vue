<template>
  <div>
          <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          
        </material-card>
        <p v-if="!ready">A carregar Grupos...</p>
        <Lista v-else :lista="grupos" />
        
    </div>
</template>

<script>
import Lista from '@/components/ListaGrupos.vue'
import axios from "axios"
const h = require("@/config/hosts").host

export default {
  name: 'Grupos',
  components: {
    Lista
  },

  data: () => ({
    grupos: [],
    ready: false
  }),
  created: async function() {
    try {
      let response = await axios.get(h + "/grupos")
      this.grupos = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  }
}

</script>
