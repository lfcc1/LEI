var Publicacao = module.exports
var Connection = require('./connection')

var nanoid = require('nanoid')
var dateFormat = require('dateformat')

Publicacao.getPublicacao = async function (idPublicacao){
    var info = await Publicacao.getPublicacaoAtomica(idPublicacao)
    var ficheiros = await Publicacao.getFicheirosFromPublicacao(idPublicacao)
    var comentarios = await Publicacao.getComentariosFromPublicacao(idPublicacao)
    var likes = await Publicacao.getLikesFromPublicacao(idPublicacao)
    
    var publicacao = {
        info : info[0],
        ficheiros : ficheiros,
        comentarios : comentarios,
        gostos : likes
    }

    return publicacao
}



Publicacao.findPublicacaoByTitulo = async function (titulo){

    var query = `
    select (STRAFTER(STR(?idPub), 'UMbook#') as ?idPublicacao) where {
        ?idPub a c:Publicacao .
    	?idPub ?p ?titulo .
    filter(CONTAINS(?titulo,"${titulo}")) .
    } 
    `
    var idPubs = await Connection.makeQuery(query);
    var result = []
    for(i in idPubs){
        var pub = await Publicacao.getPublicacao(idPubs[i].idPublicacao)
        result.push(pub)
    }

    return result

}

Publicacao.getPublicacaoAtomica = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?nomeUtilizador ?likes ?conteudo ?dataPublicacao ?titulo where {
        c:${idPublicacao} c:éPublicadoPor ?utilizador .
        ?utilizador c:nome ?nomeUtilizador .
        c:${idPublicacao} c:gostos ?likes .
        c:${idPublicacao} c:conteudo ?conteudo .
        c:${idPublicacao} c:data ?dataPublicacao .
        c:${idPublicacao} c:titulo ?titulo .
    } 
    `

    return Connection.makeQuery(query);

}


Publicacao.getFicheirosFromPublicacao = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?ficheiro), 'UMbook#') as ?idFicheiro) ?nome ?size ?data ?type where {
        c:${idPublicacao} c:PussuiFicheiro ?ficheiro .
        ?ficheiro c:nome ?nome .
        ?ficheiro c:size ?size .
        ?ficheiro c:data ?data .
        ?ficheiro c:type ?type .
    }
    `

    return Connection.makeQuery(query);
}

Publicacao.getComentariosFromPublicacao = async function (idPublicacao){
    var query = `
    select (STRAFTER(STR(?comentario), 'UMbook#') as ?idComentario) (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?nomeUtilizador ?conteudo ?likes ?data where{
        ?comentario c:comentadoEm c:${idPublicacao} .
        ?comentario c:éComentadoPor ?utilizador .
        ?utilizador c:nome ?nomeUtilizador .
        ?comentario c:conteudo ?conteudo .
        ?comentario c:gostos ?likes .
        ?comentario c:data ?data .
    }
    `
    
    return Connection.makeQuery(query);
}

Publicacao.getLikesFromPublicacao = async function(idPublicacao){
    var query = `
    select (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?nomeUtilizador where{
        ?utilizador c:gostaDe c:${idPublicacao} . 
        ?utilizador c:nome ?nomeUtilizador .
    }
    `

    return Connection.makeQuery(query);
}


Publicacao.insertPublicacao = async function(publicacao){
    var idPublicacao = "pub" + nanoid.nanoid()
    var data = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    var idUtilizador = publicacao.idUtilizador.replace(/@/,"\\@");
    console.log(data)

    var conteudo = publicacao.conteudo.replace(/\n/g, "\\n");
    var query = `
    Insert Data {
        c:${idPublicacao} a owl:NamedIndividual ,
                        c:Publicacao .
        c:${idPublicacao} c:gostos 0 .
        c:${idPublicacao} c:conteudo "${conteudo}" .
        c:${idPublicacao} c:data "${data}" .
        c:${idPublicacao} c:éPublicadoPor c:${idUtilizador} .
        c:${idPublicacao} c:éPublicadaEm c:${publicacao.idGrupo} .
        c:${idPublicacao} c:titulo "${publicacao.titulo}" .
    }
    `

    await Connection.makePost(query)
    return { "id" : idPublicacao}
}

Publicacao.deletePublicacao = async function(idPublicacao){
    var query = `
    delete {
        c:${idPublicacao} ?b ?a .
     } where{
        c:${idPublicacao} ?b ?a .
     } 
    `

    return Connection.makePost(query)
}

Publicacao.updatePublicacao = async function(idPublicacao, publicacaoNova){
    var data = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var query = `
    delete{
        c:${idPublicacao} c:conteudo ?conteudo .
        c:${idPublicacao} c:data ?data .
        c:${idPublicacao} c:titulo ?titulo .
    }
    Insert{
        c:${idPublicacao} c:conteudo "${publicacaoNova.conteudo}" .
        c:${idPublicacao} c:data "${data}" .
        c:${idPublicacao} c:titulo ${publicacaoNova.titulo} .
    }
    where{
        c:${idPublicacao} c:conteudo ?conteudo .
        c:${idPublicacao} c:data ?data .
        c:${idPublicacao} c:titulo ?titulo .
    }
    `
    
    await Connection.makePost(query)
    return idPublicacao
}


Publicacao.adicionaLike = async function(idPublicacao, idUtilizador){
    console.log(idUtilizador)
    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    Insert Data {
        c:${iduser} c:gostaDe c:${idPublicacao} . 
    }
    `

    return Connection.makePost(query)
}

Publicacao.removeLike = async function(idPublicacao, idUtilizador){
    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    Delete {
        c:${iduser} c:gostaDe c:${idPublicacao} . 
    }
    where{
        c:${iduser} c:gostaDe c:${idPublicacao} .
    }
    `

    return Connection.makePost(query)
}

Publicacao.insertComentario = async function(idPublicacao, comentario){
    var idComentario = "com" + nanoid.nanoid()
    var data = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    console.log(data)
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


Publicacao.deleteComentario = async function(idComentario){
    var query = `
    delete {
        c:${idComentario} ?b ?a .
     } where{
        c:${idComentario} ?b ?a .
     } 
    `

    return Connection.makePost(query)
}
