var Cadeira = module.exports
var Connection = require('./connection')

var axios = require('axios')

Cadeira.getCadeira = async function(idCadeira){
    try{
        var info = await Cadeira.getCadeiraAtomica(idCadeira)
        var responsaveis = await Cadeira.getResponsaveisFromCadeira(idCadeira)
        var estudantes = await Cadeira.getEstudantesFromCadeira(idCadeira)
        //var publicacoes = getPublicacoesFromAno

        var cadeira = {
            info : info[0],
            responsaveis : responsaveis,
            estudantes : estudantes,
        }

        return cadeira
    }
    catch(e){
        throw e
    }
}

Cadeira.getCadeiraAtomica = async function(idCadeira){
    var query = `
    select ?designacao ?curso ?ano where{
        c:${idCadeira} c:nome ?designacao .
        c:${idCadeira} c:éLecionadaEm ?idAno .
        ?idAno c:fazParteCurso/c:nome ?curso .
        ?idAno c:nome ?ano .

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
        pub? éPublicadaEm c:${idCadeira} .
    }
    `

    var resultado = await Connection.makeQuery(query).map(obra => { return Publicacao.getPublicacao()  }) ;

    return resultado

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