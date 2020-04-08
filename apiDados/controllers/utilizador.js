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
    var query = `

    `

    return Connection.makeQuery(query)
}


Utilizador.getPublicacoesFromUtilizador = async function(idUtilizador){
    var query = `

    `

    return Connection.makeQuery(query)
}

Utilizador.getAnosInscrito = async function(idUtilizador){
    var query = `

    `

    return Connection.makeQuery(query)

}