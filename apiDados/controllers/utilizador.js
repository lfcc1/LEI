var Utilizador = module.exports
var Connection = require('./connection')
var bcrypt = require('bcryptjs')

var axios = require ('axios')


Utilizador.getUtilizador = async function(idUtilizador){
    try{
        var informacao = await Utilizador.getUtilizadorAtomica(idUtilizador)
        var publicacoes = await Utilizador.getPublicacoesFromUtilizador(idUtilizador)
        var anos = await Utilizador.getAnosInscrito(idUtilizador)
        var amigos = await Utilizador.getAmigos(idUtilizador)

        var utilizador = {
            info: informacao[0],
            pubs: publicacoes,
            anosInscrito: anos,
            amigos: amigos
        }

        return utilizador
    }
    catch(e){
        throw e
    }
}


Utilizador.getUtilizadores = async function(){
    var query = `
    select (STRAFTER(STR(?id), 'UMbook#') as ?idUtilizador) ?numAluno ?numTelemovel ?nome ?sexo ?dataNasc (STRAFTER(STR(?curso), 'UMbook#') as ?idCurso) where  {
        ?id c:numAluno ?numAluno .
        ?id c:numTelemovel ?numTelemovel .
        ?id c:nome ?nome .
        ?id c:sexo ?sexo .
        ?id c:dataNasc ?dataNasc .
        ?id c:frequenta ?curso .
        ?curso a c:Curso .
    }
    `
    var utilizadores = await Connection.makeQuery(query)
    for(i in utilizadores){
        var id = utilizadores[i].idUtilizador.replace(/@/,"\\@");
        var queryTipos = `
        select (STRAFTER(STR(?tipo), 'UMbook#') as ?classe) where  {
            c:${id} a ?tipo .
            filter(contains(STR(?tipo), 'UMbook#')) .
        }
        `
        utilizadores[i].classes = await Connection.makeQuery(queryTipos)
    }

    return utilizadores
}



Utilizador.getUtilizadorAtomica = async function(idUtilizador){

    var iduser = idUtilizador.replace(/@/,"\\@");


    var query = `
    select ?numAluno ?numTelemovel ?nome ?sexo ?dataNasc ?curso where{
        c:${iduser} a c:Aluno .
        c:${iduser} c:numAluno ?numAluno .
        c:${iduser} c:numTelemovel ?numTelemovel .
        c:${iduser} c:nome ?nome .
        c:${iduser} c:sexo ?sexo .
        c:${iduser} c:dataNasc ?dataNasc .
        c:${iduser} c:frequenta ?idcurso .
        ?idcurso a c:Curso .
    	?idcurso c:nome ?curso .
    }
    `

    return Connection.makeQuery(query)
}


Utilizador.login = async function(user){

    var iduser = user.idUtilizador.replace(/@/,"\\@");


    var query = `
    select ?email ?password where{
        c:${iduser} a c:Aluno .
        c:${iduser} c:password ?password .
        ?idcurso a c:Curso .
    	?idcurso c:nome ?curso .
    }
    `
    var result = await Connection.makeQuery(query);
    
    if(result.length <= 0) 
        return 0
    
    var password = bcrypt.hashSync(user.password, 10);
    if(result[0].password == password)
        return 1
    else 
        return 0;
}


Utilizador.getPublicacoesFromUtilizador = async function(idUtilizador){

    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    select (STRAFTER(STR(?publicou), 'UMbook#') as ?idPublicacoes) where{
        c:${iduser} a c:Aluno .
        c:${iduser} c:publica ?publicou .
    }
    `

    return Connection.makeQuery(query)
}

Utilizador.getAnosInscrito = async function(idUtilizador){

    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    select (STRAFTER(STR(?anos), 'UMbook#') as ?idAnos) where{
        c:${iduser} a c:Aluno .
    	?anos a c:Ano .
        c:${iduser} c:frequenta ?anos .
    }
    `

    return Connection.makeQuery(query)

}

Utilizador.getAmigos = async function(idUtilizador){

    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    select (STRAFTER(STR(?amigos), 'UMbook#') as ?idAmigo) ?nome where{
        c:${iduser} c:éAmigoDe ?amigos .
        ?amigos c:nome ?nome .
    }
    `

    return Connection.makeQuery(query)
}

Utilizador.getEventos = async function(idUtilizador){
    var iduser = idUtilizador.replace(/@/,"\\@");
    var query = `
    select (STRAFTER(STR(?evento), 'UMbook#') as ?idEvento) where{
        ?evento a c:Evento . 
        ?evento c:temPresenca c:${iduser} .
    }
    `

    return Connection.makeQuery(query)
}

Utilizador.updateUtilizador = async function(idUtilizador, utilizador){
    var iduser = idUtilizador.replace(/@/,"\\@");
    var query = `
    delete{
        c:${iduser} c:numAluno ?numAluno .
        c:${iduser} c:numTelemovel ?numTelemovel .
        c:${iduser} c:sexo ?sexo .
        c:${iduser} c:dataNasc ?dataNasc .
    }
    Insert{
        c:${iduser} c:numAluno "${utilizador.numAluno}" .
        c:${iduser} c:numTelemovel "${utilizador.numTelemovel}" .
        c:${iduser} c:sexo "${utilizador.sexo}" .
        c:${iduser} c:dataNasc "${utilizador.dataNasc}" .
    }
    where{
        c:${iduser} c:numAluno ?numAluno .
        c:${iduser} c:numTelemovel ?numTelemovel .
        c:${iduser} c:sexo ?sexo .
        c:${iduser} c:dataNasc ?dataNasc .
    }
    `

    return Connection.makePost(query)
}

Utilizador.getPedidos = async function(idUtilizador){
    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    select (STRAFTER(STR(?user), 'UMbook#') as ?idUtilizador) ?nome where{
        ?user c:fazPedidoAmizade c:${iduser} .
        ?user c:nome ?nome .
    }
    `

    return Connection.makeQuery(query)
}

Utilizador.rejeitaPedido = async function(id1, id2){
    var iduser1 = id1.replace(/@/,"\\@");
    var iduser2 = id2.replace(/@/,"\\@");

    var query = `
    delete {
        c:${iduser1} c:fazPedidoAmizade c:${iduser2} .
     } where{
        c:${iduser1} c:fazPedidoAmizade c:${iduser2} .
     } 
    `

    return Connection.makePost(query)
}


Utilizador.adicionarAmigo = async function(id1, id2){
    var iduser1 = id1.replace(/@/,"\\@");
    var iduser2 = id2.replace(/@/,"\\@");
    console.log(iduser1)
    console.log(iduser2)

    var query1 = `
    delete {
        c:${iduser2} c:fazPedidoAmizade c:${iduser1} .
     } where{
        c:${iduser2} c:fazPedidoAmizade c:${iduser1} .
     } 
    `

    var query2 = `
    Insert Data {
        c:${iduser1} c:éAmigoDe c:${iduser2} .
    } 
    `

    await Connection.makePost(query1)

    return Connection.makePost(query2)
}

Utilizador.fazPedidoAmizade = async function(id1, id2){
    var iduser1 = id1.replace(/@/,"\\@");
    var iduser2 = id2.replace(/@/,"\\@");
    console.log(iduser1)
    console.log(iduser2)
    var query = `
    Insert Data {
        c:${iduser1} c:fazPedidoAmizade c:${iduser2} .
    } 
    `

    return Connection.makePost(query)
}

Utilizador.adicionarEvento = async function(idUtilizador, idEvento){
    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    Insert Data {
        c:${idEvento} c:temPresenca c:${iduser}.
    } 
    `

    return Connection.makePost(query)
}

Utilizador.removerAmigo = async function(id1, id2){
    var iduser1 = id1.replace(/@/,"\\@");
    var iduser2 = id2.replace(/@/,"\\@");

    var query = `
    Delete {
        c:${iduser1} c:éAmigoDe c:${iduser2} .
        c:${iduser2} c:éAmigoDe c:${iduser1} .
    } 
    Where{
        c:${iduser1} c:éAmigoDe c:${iduser2} .
        c:${iduser2} c:éAmigoDe c:${iduser1} .
    }
    `

    return Connection.makePost(query)
}


Utilizador.insertUtilizador = async function(utilizador){
    var iduser = utilizador.id.replace(/@/,"\\@");
    var newPassword = bcrypt.hashSync(utilizador.password, 10);
    var query = `
    Insert Data {
        c:${iduser} a owl:NamedIndividual ,
                        c:Utilizador .
        c:${iduser} c:numAluno "${utilizador.numeroAluno}" .
        c:${iduser} c:numTelemovel "${utilizador.numeroTelemovel}" .
        c:${iduser} c:nome "${utilizador.nome}" .
        c:${iduser} c:sexo "${utilizador.sexo}" .
        c:${iduser} c:dataNasc "${utilizador.dataNascimento}" .
        c:${iduser} c:frequenta c:${utilizador.idCurso} .
        c:${iduser} c:frequenta c:${utilizador.idAno} . 
        c:${iduser} c:password c:${newPassword} .
    }
    `

    await Connection.makePost(query)
    return { "id" : iduser}
}

Utilizador.deleteUser = async function(idUtilizador){
    var iduser = idUtilizador.replace(/@/,"\\@");

    var query = `
    delete {
        c:${iduser} ?b ?a .
     } where{
        c:${iduser} ?b ?a .
     } 
    `

    return Connection.makePost(query)
}