<template>
  <div>
        <p v-if="!ready">A ir buscar o Grupo à BD...</p>
        <Consulta v-else :item="item"/>
    </div>
</template>

<script>
import Consulta from '@/components/ConsultarGrupo.vue'
import axios from "axios"
const h = require("@/config/hosts").host

export default {
  name: 'consulta',
  components: {
    Consulta
  },

  data: () => ({
    item: {},
    ready: false
  }),

  created: async function() {
    try {
      let response = await axios.get(h + "/grupos/" + this.$route.params.id )//
      console.log(response.data)
      this.item = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  }
}
</script>
