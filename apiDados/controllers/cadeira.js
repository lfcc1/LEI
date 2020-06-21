var Cadeira = module.exports
var Connection = require('./connection')
var Publicacao = require('./publicacao')

var axios = require('axios')

Cadeira.getCadeira = async function(idCadeira){
    try{
        var info = await Cadeira.getCadeiraAtomica(idCadeira)
        var responsaveis = await Cadeira.getResponsaveisFromCadeira(idCadeira)
        var estudantes = await Cadeira.getEstudantesFromCadeira(idCadeira)
        var publicacoes = await Cadeira.getPublicacoesFromCadeira(idCadeira) 

        var cadeira = {
            info : info[0],
            responsaveis : responsaveis,
            estudantes : estudantes,
            publicacoes : publicacoes
        }

        return cadeira
    }
    catch(e){
        throw e
    }
}

Cadeira.getCadeiraAtomica = async function(idCadeira){
    var query = `
    select ?designacao (STRAFTER(STR(?ano), 'UMbook#') as ?idAno) where{
        c:${idCadeira} c:nome ?designacao .
        c:${idCadeira} c:éLecionadaEm ?ano .
        ?ano c:fazParteCurso ?idCurso .
    }
    `

    return Connection.makeQuery(query)
}


Cadeira.getEstudantesFromCadeira = async function(idCadeira){
    var query = `
    select (STRAFTER(STR(?estudante), 'UMbook#') as ?id) ?dataNascimento ?nome ?numeroAluno ?numeroTelemovel ?sexo where{
        c:${idCadeira} c:éLecionadaEm ?idAno .
        ?estudante c:frequenta ?idAno .
        ?estudante c:dataNasc ?dataNascimento . 
        ?estudante c:nome ?nome .
        ?estudante c:numAluno ?numeroAluno .
        ?estudante c:numTelemovel ?numeroTelemovel .
        ?estudante c:sexo ?sexo . 
    }
    `

    return Connection.makeQuery(query)
}

Cadeira.getPublicacoesFromCadeira = async function(idCadeira){
    
    var query = `
    select (STRAFTER(STR(?pub), 'UMbook#') as ?idPub) where{
        ?pub c:éPublicadaEm c:${idCadeira} .
    }
    `

    var idsPublicacoes = await Connection.makeQuery(query)
    
    var publicacoes = []
        console.log(idsPublicacoes)
    for(let i = 0; i < idsPublicacoes.length ; i++ ){
        pub = await Publicacao.getPublicacao(idsPublicacoes[i].idPub)
        var publicacao = {
            idPublicacao : idsPublicacoes[i].idPub,
            dados : pub
        }
        console.log(publicacao)
        publicacoes.push(publicacao)
    }

    return publicacoes

}

Cadeira.getResponsaveisFromCadeira = async function(idCadeira){

    var query = `
    select (STRAFTER(STR(?resp), 'UMbook#') as ?idResp) ?dataNascimento ?nome ?numeroAluno ?numeroTelemovel ?sexo
        where{
            c:${idCadeira} c:éLecionadaEm ?idAno .
            ?resp c:gere ?idAno .
            ?resp c:dataNasc ?dataNascimento . 
            ?resp c:nome ?nome .
            ?resp c:numAluno ?numeroAluno .
            ?resp c:numTelemovel ?numeroTelemovel .
            ?resp c:sexo ?sexo . 
        }
    `

    return Connection.makeQuery(query)
}


Cadeira.insertCadeira = async function(cadeira){
    var id = cadeira.idAno + "_" + cadeira.nome
    var query = `
    insert data {
        c:${id} a owl:NamedIndividual ,
                        c:Cadeira .
        c:${id} c:nome "${cadeira.nome}" . 
        c:${id} c:éLecionadaEm c:${cadeira.idAno} .
    }
    `

    await Connection.makePost(query)
    return {id : id}

}

Cadeira.deleteCadeira = async function(idCadeira){
    var query = `
    delete{
        c:${idCadeira} ?p ?a .
    }
    where{
        c:${idCadeira} ?p ?a .
    }
    `

    return Connection.makePost(query)
}