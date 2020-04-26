<template>
    <div>
        <p v-if="!ready">A ir buscar o Ano à BD...</p>
        <ConsultaAno v-else :item="item"/>
    </div>
</template>

<script>
import ConsultaAno from '@/components/ConsultarAno.vue'
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'Ano',
  //props:["id"],
  components: {
    ConsultaAno
  },

  data: () => ({
    item: {},
    ready: false
  }),

  created: async function() {
    try {
      let response = await axios.get(h + "ano/" + props.id )
      this.item = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  },  
  beforeRouteUpdate(to, from, next) {
    console.log(`Updating slug from ${from} to ${to}`)
    next('/') //make sure you always call next()
  },
  beforeRouteLeave (to, from, next) {
    next('/')
  }
}
</script>
