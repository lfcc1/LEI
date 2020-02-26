<template>
  <div>
        <p v-if="!usersReady">A carregar Users...</p>
        <ListaUsers v-else :lista="users" />
        
    </div>
</template>

<script>
import ListaUsers from '@/components/ListaUsers.vue'
import axios from "axios"
const h = require("@/config/hosts").host

export default {
  name: 'Users',
  components: {
    ListaUsers
  },

  data: () => ({
    users: [],
    usersReady: false
  }),
  created: async function() {
    try {
      let response = await axios.get(h + "/users")
      this.users = response.data
      this.usersReady = true
    } catch (e) {
      return e
    }
  }
}

</script>
