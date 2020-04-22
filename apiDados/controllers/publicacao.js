var Publicacao = module.exports
var Connection = require('./connection')

var nanoid = require('nanoid')

Publicacao.getPublicacao = async function (idPublicacao){
    var info = await Publicacao.getPublicacaoAtomica(idPublicacao)
    var ficheiros = await Publicacao.getFicheirosFromPublicacao(idPublicacao)
    var comentarios = await Publicacao.getComentariosFromPublicacao(idPublicacao)
    
    var publicacao = {
        info : info[0],
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


Publicacao.insertPublicacao = async function(publicacao){
    var idPublicacao = "pub" + nanoid.nanoid()
    var data = new Date()
    var idUtilizador = publicacao.idUtilizador.replace(/@/,"\\@");
    
    var query = `
    Insert Data {
        c:${idPublicacao} a owl:NamedIndividual ,
                        c:Publicacao .
        c:${idPublicacao} c:gostos "0" .
        c:${idPublicacao} c:conteudo "${publicacao.conteudo}" .
        c:${idPublicacao} c:data "${data}" .
        c:${idPublicacao} c:éPublicadoPor c:${idUtilizador} .
        c:${idPublicacao} c:éPublicadaEm c:${publicacao.idGrupo} .
    }
    `

    await Connection.makePost(query)
    return { "id" : idPublicacao}
}

Publicacao.insertComentario = async function(idPublicacao, comentario){
    var idComentario = "com" + nanoid.nanoid()
    var data = new Date()
    var idUtilizador = comentario.idUtilizador.replace(/@/,"\\@");

    var query = `
    Insert Data {
        c:${idComentario} a owl:NamedIndividual ,
                        c:Comentario .
        c:${idComentario} c:conteudo "${comentario.conteudo}" .
        c:${idComentario} c:gostos "0" .
        c:${idComentario} c:data "${data}" .
        c:${idComentario} c:comentadoEm c:${idPublicacao} .
        c:${idComentario} c:éComentadoPor c:${idUtilizador} .
    }
    `

    await Connection.makePost(query)
    return { "id" : idComentario}
}