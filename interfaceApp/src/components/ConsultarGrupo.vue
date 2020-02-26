<template>
  <v-card class="ma-8">
    <v-card-title class="indigo darken-4 white--text" dark>
      Consulta Grupo
    </v-card-title>

    <v-card-text>
          <p>Identificador: {{item._id}}</p>
          <p>Curso: {{item.curso}}</p>
          <p>Dependencia: {{item.desc_dependencia}}</p>
          <p>Filhos: {{item.gruposFilhos}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
  props: ["item"]
}
</script>