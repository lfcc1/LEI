<template>
  <div>
        <p v-if="!usersReady">A carregar exames...</p>
        <Lista v-else :lista="users" />
        
    </div>
</template>

<script>
import Lista from '@/components/Lista.vue'
import axios from "axios"
const h = require("@/config/hosts").host

export default {
  name: 'listaEMD',
  components: {
    Lista
  },

  data: () => ({
    users: [],
    usersReady: true
  }),
  created: async function() {
    try {
      let response = await axios.get(h + "/users")
      this.users = response.data
      this.usersReady = true
      console.log(users)
    } catch (e) {
      return e
    }
  }
}

</script>
