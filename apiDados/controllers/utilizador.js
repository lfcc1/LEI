var Utilizador = module.exports
var Connection = require('./connection')

var axios = require ('axios')


Utilizador.getUtilizador = async function(idUtilizador){
    try{
        var info = await Utilizador.getUtilizadorAtomica(idUtilizador)
        var publicacoes = await Utilizador.getPublicacoesFromUtilizador(idUtilizador)
        var anos = await Utilizador.getAnosInscrito(idUtilizador)

        return ano
    }
    catch(e){
        throw e
    }
}


Utilizador.getUtilizadorAtomica = async function(idUtilizador){

    var user = idUtilizador
    var iduser = user.replace(/@/,"\\@");
    
    var query = `
    select ?numAluno ?numTelemovel ?nome ?sexo ?dataNasc where{
        c:${iduser} a c:Aluno .
        c:${iduser} c:numAluno ?numAluno .
        c:${iduser} c:numTelemovel ?numTelemovel .
        c:${iduser} c:nome ?nome .
        c:${iduser} c:sexo ?sexo .
        c:${iduser} c:dataNasc ?dataNasc .
    }
    `

    return Connection.makeQuery(query)
}


Utilizador.getPublicacoesFromUtilizador = async function(idUtilizador){

    var user = idUtilizador
    var iduser = user.replace(/@/,"\\@");

    var query = `
    select ?publicou where{
        c:${iduser} a c:Aluno .
        c:${iduser} c:publica ?publicou .
    }
    `

    return Connection.makeQuery(query)
}

Utilizador.getAnosInscrito = async function(idUtilizador){
    var query = `
    select ?anos where{
        c:a82088\@alunos.uminho.pt a c:Aluno .
    	?anos a c:Ano .
        c:a82088\@alunos.uminho.pt c:frequenta ?anos .
    }
    `

    return Connection.makeQuery(query)

}