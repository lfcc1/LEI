<template>
  <v-card class="ma-8">
    <v-card-title class="red darken-4 white--text" dark>
      Lista de Grupos
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="mylista"
        class="elevation-1"
        :footer-props="footer_props"
      >
        <template v-slot:item="props">
          <tr>
            <td v-for="(campo, index) in props.item" :key="index">
                {{ campo }}
            </td>
            <td>
              <v-icon
                    @click="showItem(props.item._id)"
                    color="indigo darken-2"
                    >mdi-tennis</v-icon
                  >
            </td>
          </tr>
        </template>

        <template v-slot:pageText="props">
          Resultados: {{ props.pageStart }} - {{ props.pageStop }} de
          {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
  name: 'Lista',
  props: ["lista"],
  data: () => ({

    headers: [
        {text: "Identificador", value: "_id"},
        {text:"Curso", value: "curso"},
        {text:"Dependencia", value: "desc_dependencia"},
        {text:"Filhos", value: "gruposFilhos"},
    ],
    mylista: [],
    footer_props: {
      "items-per-page-options": [3, 5, -1],
      "items-per-page-text": "Mostrar"
    }
  }),


  created: function(){
      this.mylista = this.lista.map(item => {
          return {
              _id: item._id,
              curso: item.curso,
              desc_dependencia: item.desc_dependencia,
              gruposFilhos: item.gruposFilhos,
          }
      })
  },

  methods: {
    showItem: function(i) {
      this.$router.push("/grupos/" + i);
    }
  }
}
</script>
