var Ano = module.exports
var Connection = require('./connection')

var axios = require('axios')

Ano.getAno = async function(idAno){
    try{
        var info = await Ano.getAnoAtomica(idAno)
        var responsaveis = await Ano.getResponsaveisFromAno(idAno)
        var estudantes = await Ano.getEstudantesFromAno(idAno)
        var cadeiras = await Ano.getCadeirasFromAno(idAno)
        //var publicacoes = getPublicacoesFromAno

        var ano = {
            info : info,
            responsaveis : responsaveis,
            estudantes : estudantes,
            cadeiras : cadeiras
        }

        return ano
    }
    catch(e){
        throw e
    }
}



Ano.getAnoAtomica = async function(idAno){
    var query = `
    select ?nome ?curso ?anoLetivo where{
        c:${idAno} c:nome ?nome . 
        c:${idAno} c:anoLetivo ?anoLetivo .
        c:${idAno} c:fazParteCurso ?idCurso .
        ?idCurso c:nome ?curso .
    }
    `

    return Connection.makeQuery(query)
}


Ano.getEstudantesFromAno = async function(idAno){
    var query = `
    select (STRAFTER(STR(?estudante), 'UMbook#') as ?id) ?dataNascimento ?nome ?numeroAluno ?numeroTelemovel ?sexo where{
        ?estudante c:frequenta c:${idAno} .
        ?estudante c:dataNasc ?dataNascimento . 
        ?estudante c:nome ?nome .
        ?estudante c:numAluno ?numeroAluno .
        ?estudante c:numTelemovel ?numeroTelemovel .
        ?estudante c:sexo ?sexo . 
    }
    `

    return Connection.makeQuery(query)
}

Ano.getCadeirasFromAno = async function(idAno){
    var query = `
    select (STRAFTER(STR(?cadeira), 'UMbook#') as ?id) where{
        c:${idAno} a c:Ano .
        c:${idAno} c:leciona ?cadeira .
    }
    `

    return Connection.makeQuery(query)
}

Ano.getPublicacoesFromAno = async function(idAno){
    
    var query = `
    select (STRAFTER(STR(?pub), 'UMbook#') as ?idPub) where{
        pub? éPublicadaEm c:${idAno} .
    }
    `

    var resultado = await Connection.makeQuery(query).map(obra => { return Publicacao.getPublicacao()  }) ;

    return resultado

}

Ano.getResponsaveisFromAno = async function(idAno){

    var query = `
    select (STRAFTER(STR(?resp), 'UMbook#') as ?idResp) ?dataNascimento ?nome ?numeroAluno ?numeroTelemovel ?sexo
        where{
            c:${idAno} a c:Ano .
            ?resp c:gere c:${idAno} .
            ?resp c:dataNasc ?dataNascimento . 
            ?resp c:nome ?nome .
            ?resp c:numAluno ?numeroAluno .
            ?resp c:numTelemovel ?numeroTelemovel .
            ?resp c:sexo ?sexo . 
        }
    `

    return Connection.makeQuery(query)
}