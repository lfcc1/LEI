var Publicacao = module.exports
var Connection = require('./connection')

var axios = require('axios')

Publicacao.getPublicacao = async function (idPublicacao){
    var info = await Publicacao.getPublicacaoAtomica(idPublicacao)
    var ficheiros = await Publicacao.getFicheirosFromPublicacao(idPublicacao)
    var comentarios = await Publicacao.getComentariosFromPublicacao(idPublicacao)
    
    var publicacao = {
        info : info,
        ficheiros : ficheiros,
        comentarios : comentarios
    }

    return publicacao
}


Publicacao.getPublicacaoAtomica = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?likes ?conteudo ?dataPublicacao where {
        c:${idPublicacao} c:éPublicadoPor ?utilizador .
        c:${idPublicacao} c:gostos ?likes .
        c:${idPublicacao} c:conteudo ?conteudo .
        c:${idPublicacao} c:data ?dataPublicacao .
    } 
    `

    return Connection.makeQuery(query);

}


Publicacao.getFicheirosFromPublicacao = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?ficheiro), 'UMbook#') as ?idFicheiro) where {
        c:${idPublicacao} c:PussuiFicheiro ?ficheiro .
    }
    `

    return Connection.makeQuery(query);
}

Publicacao.getComentariosFromPublicacao = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?comentario), 'UMbook#') as ?idComentario) (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?conteudo ?likes ?data where{
        ?comentario c:comentadoEm c:${idPublicacao} .
        ?comentario c:éComentadoPor ?utilizador .
        ?comentario c:conteudo ?conteudo .
        ?comentario c:gostos ?likes .
        ?comentario c:data ?data .
    }
    `
    
    return Connection.makeQuery(query);
}
