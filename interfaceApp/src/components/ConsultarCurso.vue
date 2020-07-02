<template>
  <v-card class="ma-8">
      <!--
    <v-card-title class="justify-center white--text" style="background: #900000;" dark>
        {{item.idCurso}} ({{item.info.designacao}}) 
    </v-card-title>
    !-->
    
    <material-card
          color="#900000"
          :title="this.designacao"
        >
    </material-card>
    <v-spacer>
    </v-spacer>
    <div style = "display:flex;">
        <div style="width: 20%;">

            <center v-if="back != false">
                <button @click="backTo"> Voltar </button>
            </center>

            <v-list>
                <v-list-item
                    v-for="ano in anos"
                    :key="ano.id"
                    @click="apresentaAno(ano.id)" 
                >
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="ano.designacao"></v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list>

            <v-list>
                <v-list-item
                    v-for="tipo in tipos"
                    :key="tipo"
                    @click="apresentaEstudantes(tipo)" 
                >
                    <v-list-item-content style="width: 50%;"> 
                        <v-list-item-title v-text="tipo"></v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
            <v-list v-if="atual=='cadeiras'" >
                <v-list-item @click="dialogConteudos = true">
                <v-list-item-content style="width: 50%;">
                    <v-list-item-title > Conteúdos </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
                        <v-dialog
                        v-model="dialogEstudantes"
                        width="500"
                        >
                        <v-card>
                        <v-card-text>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Estudantes 
                        </v-card-title>
                        <v-text-field
                        v-model="filtrar"
                        label="Filtrar"
                        single-line
                        hide-details
                        ></v-text-field>
                        <v-data-table
                            :headers="header_estudantes"
                            :items="this.estudantes"
                            :footer-props="footer_props"
                            :search="filtrar"
                            
                        >
                            <template v-slot:item="row">
                        <tr @click="apresentaUser(row.item)">
                            <td> <v-avatar
                                    slot="offset"
                                    class="mx-auto d-block"
                                >
                                    <img
                                    :src="row.item.imagem"
                                    >
                                </v-avatar></td>
                            <td>{{row.item.numeroAluno}}</td>
                            <td>{{row.item.nome}}</td>
                        </tr>
                    </template>
                    </v-data-table>
                        </v-card-text>
                        </v-card>
                        </v-dialog>
                <v-dialog
                    v-model="dialogConteudos"
                    width="500"
                    v-bind:style="{color:white}"
                >
                <v-card>
                    <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                        Conteúdos Programáticos 
                    </v-card-title>
                    <h4 style="white-space:pre-wrap;" > {{this.conteudos}} </h4>
                </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogResponsaveis"
                    width="500"
                    v-bind:style="{color:white}"
                >
                        <v-card>
                        <v-card-title class="justify-center" style="background: #d6d6c2; color: #900000;" dark>
                            Responsáveis 
                        </v-card-title>
                        <v-card-text>
                        <v-text-field
                        v-model="filtrar"
                        label="Filtrar"
                        single-line
                        hide-details
                         ></v-text-field>
                        <v-data-table
                        :headers="header_responsaveis"
                        :items="responsaveis"
                        :footer-props="footer_props"
                        :search="filtrar"
                        @click:row="apresentaUser"
                        >
                        </v-data-table>
                    </v-card-text>
                        </v-card>
                    </v-dialog>
                    </div>
                    <hr>

        <hr>
        <div style="width:80%;">
             <v-row
            align="center"
            justify="center"
            >
                <v-btn-toggle rounded v-if="atual=='cadeiras'">
                    <v-btn color= "#900000" @click="pubs = true">
                        Publicações
                    </v-btn>
                    <v-btn color= "#900000" @click="pubs = false">
                        Ficheiros
                    </v-btn>
                </v-btn-toggle>
            </v-row>
        <div v-if="pubs">
            <Publicacao :publicacoes="publicacoes" :idGrupo="this.id" :tipoGrupo="this.atual"/>
        </div>
        <div v-else>
            <Files :idCadeira="id" />
        </div>
        </div>
    </div>
  </v-card>
  
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI
const host = require("@/config/hosts").host
export default {
    name: 'Consulta',
    props: ["item"],
    data() {
        return {
    publicacoes: [],
    showModal: false,
    pubs: true,
    conteudos:"",
    dialogConteudos: false,
    showModalResponsaveis: false,
    header_estudantes: [
      {text: "Avatar", value: 'imagem', class: 'subtitle-1'},
      {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'}
    ],
    header_responsaveis: [
      {text: "Ano", sortable: true, value: 'ano', class: 'subtitle-1'},
      {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
      {text: "Nome", value: 'nome', class: 'subtitle-1'}
    ],
    header_anos: [
        {text: "Anos Integrados", sortable: true, value: 'designacao', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 
    filtrar: "",
    id: "",
    designacao: "",
    anos : [],
    estudantes: [],
    responsaveis:[],
    tipos : ["Estudantes", "Responsáveis"],
    pai : "",
    dialogResponsaveis: false,
    dialogEstudantes: false
    }
    }    
    ,
    created: function(){
        this.token = localStorage.getItem("jwt")
        this.anos = this.item.anos
        this.publicacoes = this.item.publicacoes
        this.responsaveis = []
        this.id = this.item.idCurso
        this.designacao = this.item.info.designacao

        this.estudantes = this.item.estudantes
        this.updateResponsaveis(this.item.responsaveis)
        this.updateEstudantes();
        console.log(this.responsaveis)
        this.rota = 'anos/'
        this.atual = 'cursos/'
        this.back = false
  },
    methods: {
        updateEstudantes:function(){
            this.estudantes.forEach(e =>{
                e.imagem = host+"images/"+ e.id
            })
        },
        updateResponsaveis: function(novosResponsaveis){
            this.responsaveis = []
                    novosResponsaveis.forEach(item => {
            var ano = item.ano
            item.responsaveis.forEach(responsavel => {
                var r = {
                    ano : ano ,
                    nome : responsavel.nome,
                    id : responsavel.idResp,
                    numeroAluno : responsavel.numeroAluno
                }
                this.responsaveis.push(r)
            })
        })
        },
        apresentaAno: function(id){
            console.log(this.pai)
            //this.$router.push({name : 'Ano', params:{id : item.id} })
            //alert(JSON.stringify(item))
            this.id = id
            if(this.rota == "cursos/"){
                axios.get(h + this.rota + id + "?token=" + this.token)
                     .then(dados => {
                         this.designacao = dados.data.info.designacao
                         this.back = false
                         this.pai = ""
                         this.anos = dados.data.anos
                         this.estudantes = dados.data.estudantes
                         this.updateResponsaveis(dados.data.responsaveis)
                         this.updateEstudantes()
                         this.publicacoes = dados.data.publicacoes
                         this.header_responsaveis = [
                            {text: "Ano", sortable: true, value: 'ano', class: 'subtitle-1'},
                            {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
                            {text: "Nome", value: 'nome', class: 'subtitle-1'}
                        ];
                        /*
                        this.header_anos = [
                            {text: "Ano", sortable: true, value: 'designacao', class: 'subtitle-1'}
                        ]*/
                        this.rota = "anos/"
                        this.atual = "cursos"
                     })
            }
            else{
            axios.get(h + this.rota + id + "?token=" + this.token )
                 .then(dados => {
                     if(dados.data.cadeiras != null){
                         this.designacao = dados.data.info.nome
                         this.pai = dados.data.info.idCurso
                         this.anos = dados.data.cadeiras
                         this.estudantes = dados.data.estudantes
                         this.responsaveis = dados.data.responsaveis
                         console.log(dados.data)
                         this.header_responsaveis = [
                            {text: "Identificador de Aluno", sortable: true, value: 'numeroAluno', class: 'subtitle-1'},
                            {text: "Nome", value: 'nome', class: 'subtitle-1'}
                        ];
                        /*
                        this.header_anos = [
                            {text: "Cadeiras Lecionadas", sortable: true, value: 'designacao', class: 'subtitle-1'}
                        ]*/
                        this.rota = "cadeiras/"
                        this.atual = "anos"
                     }
                     else {
                         this.conteudos = dados.data.info.conteudo
                         this.designacao = dados.data.info.designacao
                         this.pai = dados.data.info.idAno
                         this.atual = "cadeiras"
                     }
                     this.updateEstudantes()
                    
                    this.back = true
                    this.publicacoes = dados.data.publicacoes
                    })
                .catch(error => {
                    alert(error)
                })
            }
        },
        passagem: function(item){

        },
        apresentaEstudantes: function(item){
            if(item == "Estudantes") this.dialogEstudantes = this.dialogEstudantes = true
            else this.dialogResponsaveis = true
        },
        backTo: function(){
            if(this.atual == "cadeiras") {
                this.rota = "anos/"
                alert(this.rota + this.pai)
                this.apresentaAno(this.pai)
            }
            else{
                this.rota = "cursos/"
                alert(this.rota + this.pai)
                this.apresentaAno(this.pai)
            }
            this.pubs = true
        },
        apresentaUser: function(item){
            this.$router.push({ name: 'UserProfile', params: {id: item.id }})
        }
    }
}

</script>

<style>

</style>