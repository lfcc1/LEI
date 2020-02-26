<template>
  <v-card class="ma-8" >
    <v-card-title class="red darken-4 white--text" dark>
      Lista de Utilizadores
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
                    @click="showUser(props.item._id)"
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
        {text: "Email", value: "_id"},
        {text:"Numero Aluno", value: "numAluno"},
        {text:"Curso", value: "curso"},
        {text:"Nome", value: "nome"},
        {text:"Sexo", value: "sexo"},
        {text:"Telemovel", value: "numTelemovel"},
        {text:"Acesso", value: "nAcess"},
        {text:"Token", value: "token"},
        {text: "Operações"}
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
              numAluno: item.numAluno,
              curso: item.curso,
              nome: item.nome,
              sexo: item.sexo,
              numTelemovel: item.numTelemovel,
              nAcess: item.nAcess,
              token: item.token
          }
      })
  },

  methods: {
    showUser: function(i) {
      this.$router.push("/users/" + i);
    }
  }
}
</script>
