<template>
  <v-card class="ma-8">
    <v-card-title class="indigo darken-4 white--text" dark>
      Consulta Utilizador
    </v-card-title>

    <v-card-text>
          <p>Email: {{item._id}}</p>
          <p>Número: {{item.info.numAluno}}</p>
          <p>Curso: {{item.info.curso}}</p>
          <p>Nome: {{item.info.nome}}</p>
          <p>Sexo: {{item.info.sexo}}</p>
          <p>Telemóvel: {{item.info.numTelemovel}}</p>
          <p>Data de Nascimento: {{item.info.dataNasc}}</p>
          <p>Nivel Acesso: {{item.nAcess}}</p>
          <p>Token: {{item.token}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
  props: ["item"]
}
</script>