var Curso = module.exports
var Connection = require('./connection')
var Publicacao = require('./publicacao')
var Ano = require('./ano')



Curso.getCurso = async function(idCurso){
    try{
        var info = await Curso.getCursoAtomica(idCurso)
        var anos = await Curso.getAnosFromCurso(idCurso)
        var estudantes = await Curso.getEstudantesFromCurso(idCurso)
        var responsaveis = await Curso.getResponsaveisFromCurso(idCurso)
        var publicacoes = await Curso.getPublicacoesFromCurso(idCurso)

        var curso = {
            info : info[0], 
            anos : anos,
            estudantes : estudantes,
            responsaveis : responsaveis,
            publicacoes : publicacoes
        }

        return curso
    }
    catch(e){
        throw e
    }

}



Curso.getCursoAtomica = async function(idCurso){
    var query = `
    select ?designacao where{
        c:${idCurso} c:nome ?designacao .
    }
    `

    return Connection.makeQuery(query)
}

Curso.getCursos = async function(){
    var query = `
    select (STRAFTER(STR(?cours), 'UMbook#') as ?curso) ?designacao where{
        ?cours a c:Curso .
        ?cours c:nome ?designacao .
    }
    `
    return Connection.makeQuery(query)
    
}

Curso.getAnosFromCurso = async function(idCurso){
    var query = `
    select (STRAFTER(STR(?years), 'UMbook#') as ?id) ?designacao ?anoLetivo where{
        c:${idCurso} c:pussuiAno ?years .
        ?years c:nome ?designacao .
        ?years c:anoLetivo ?anoLetivo .
    }
    `

    return Connection.makeQuery(query)

}

Curso.getEstudantesFromCurso = async function(idCurso){
    var query = `
    select (STRAFTER(STR(?estudante), 'UMbook#') as ?id) ?dataNascimento ?nome ?numeroAluno ?numeroTelemovel ?sexo where{
        ?estudante c:frequenta c:${idCurso} .
        ?estudante c:dataNasc ?dataNascimento . 
        ?estudante c:nome ?nome .
        ?estudante c:numAluno ?numeroAluno .
        ?estudante c:numTelemovel ?numeroTelemovel .
        ?estudante c:sexo ?sexo . 
    }
    `

    return Connection.makeQuery(query)

}

getResponsaveisAnos = async function(anos){
    responsaveisAnos = []
    for(let i = 0; i < anos.length ; i++ ){
        responsaveis = await Ano.getResponsaveisFromAno(anos[i].id)
        var resp = {
            ano : anos[i].designacao,
            responsaveis : responsaveis
        }
        responsaveisAnos.push(resp)
    }

    return responsaveisAnos
}

Curso.getResponsaveisFromCurso = async function(idCurso){

    var anos = await Curso.getAnosFromCurso(idCurso)
    var responsaveisAnos = await getResponsaveisAnos(anos)

    return responsaveisAnos
}

Curso.getPublicacoesFromCurso = async function(idCurso){
    var query = `
    select (STRAFTER(STR(?pub), 'UMbook#') as ?idPub) where{
        ?pub c:éPublicadaEm c:${idCurso} .
        ?pub c:data ?dataPub .
    } Order by DESC(?dataPub) 
    `

    var idsPublicacoes = await Connection.makeQuery(query)
    
    var publicacoes = []

    for(let i = 0; i < idsPublicacoes.length ; i++ ){
        pub = await Publicacao.getPublicacao(idsPublicacoes[i].idPub)
        var publicacao = {
            idPublicacao : idsPublicacoes[i].idPub,
            dados : pub
        }
        publicacoes.push(publicacao)
    }

    return publicacoes

}

Curso.insertCurso = async function(curso){
    var id = curso.id
    var query = `
    insert data {
        c:${id} a owl:NamedIndividual ,
                        c:Curso .
        c:${id} c:nome "${curso.nome}" . 
    }
    `

    await Connection.makePost(query)
    return id
}

Curso.editarCurso = async function(idCurso, designacao){
    var query = `
    delete{
        c:${idCurso} c:nome ?designacao .
    }
    insert{
        c:${idCurso} c:nome "${designacao}" .
    }
    where{
        c:${idCurso} c:nome ?designacao .
    }
    `

    return Connection.makePost(query)
}

Curso.deleteCurso = async function(idCurso){
    var query = `
    delete{
        c:${idCurso} ?p ?a .
    }
    where{
        c:${idCurso} ?p ?a .
    }
    `

    return Connection.makePost(query)
}