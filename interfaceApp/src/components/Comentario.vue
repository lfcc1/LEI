<template>
  <v-list>
        <v-list-item
        v-for="comentario in comentariosAtuais"
        :key="comentario.idComentario" 
        >
        <v-list-item-content style="width: 50%;"> 
            <v-list-item-title v-text="comentario.conteudo"></v-list-item-title>
        </v-list-item-content>

        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'Comentario',
    props: ["comentarios", "idPublicacao"],
    data (){ return{
        publicacoesAtuais: [],
        conteudo: "",
        files : [],
    }},
    created: function(){
      this.comentariosAtuais = this.comentarios
    },
    methods: {
        postComentario: function(){
            
        }
    }
}
</script>