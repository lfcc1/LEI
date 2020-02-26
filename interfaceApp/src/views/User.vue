<template>
  <div>
        <p v-if="!userReady">A ir buscar o User à BD...</p>
        <Consulta v-else :item="user"/>
    </div>
</template>

<script>
import Consulta from '@/components/ConsultaUser.vue'
import axios from "axios"
const h = require("@/config/hosts").host

export default {
  name: 'consultaUser',
  components: {
    Consulta
  },

  data: () => ({
    user: {},
    userReady: false
  }),

  created: async function() {
    try {
      let response = await axios.get(h + "/users/" + this.$route.params.id )//
      console.log(response.data)
      this.user = response.data
      this.userReady = true
    } catch (e) {
      return e
    }
  }
}
</script>
