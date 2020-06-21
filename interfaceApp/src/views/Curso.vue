<template>
  <div>
      
      <p v-if="!ready">A ir buscar o Curso à BD...</p>
      <Consulta v-else :item="item"/>
    </div>
</template>

<script>
import Consulta from '@/components/ConsultarCurso.vue'
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'Curso',
  components: {
    Consulta
  },

  data: () => ({
    item: {},
    ready: false
  }),

  created: async function() {
    try {
      // ir á sessão
      var idCurso = this.$route.params.id
      let response = await axios.get(h + "cursos/" + idCurso )
      this.item = response.data
      this.item.idCurso = idCurso
      this.ready = true
    } catch (e) {
      return e
    }
  },
  methods:{
       
  }
}
</script>
