var Publicacao = module.exports
var Connection = require('./connection')

var axios = require('axios')

Publicacao.getPublicacao = async function (idPublicacao){
    var info = await Publicacao.getPublicacaoAtomica(idPublicacao)
    var ficheiros = await Publicacao.getFicheirosFromPublicacao(idPublicacao)
    var comentarios = await Publicacao.getComentariosFromPublicacao(idPublicacao)
    
    var publicacao = {
        info = info,
        ficheiros : ficheiros,
        comentarios : comentarios
    }

    return publicacao
}


Publicacao.getPublicacaoAtomica = async function (idPublicacao){
    var query = `
    
    
    `

    // return Connection.makeQuery(query);
    return []

}


Publicacao.getFicheirosFromPublicacao = async function (idPublicacao){
    var query = `
    
    
    
    `

    // return Connection.makeQuery(query);
    return []
}

Publicacao.getComentariosFromPublicacao = async function (idPublicacao){
    var query = `
    

    `
    
    // return Connection.makeQuery(query);
    
    return []
}
