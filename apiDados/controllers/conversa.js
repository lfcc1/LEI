var Conversa = module.exports
var Connection = require('./connection')

var nanoid = require('nanoid')

Conversa.getConversa = async function(idConversa){

    var participantes = await Conversa.getParticipantesFromConversa(idConversa)
    var mensagens = await Conversa.getMensagensFromConversa(idConversa)
    
    var conversa = {
        participantes : participantes,
        mensagens : mensagens
    }

    return conversa
}

Conversa.getParticipantesFromConversa = async function(idConversa){
    var query = `
    select (STRAFTER(STR(?p), 'UMbook#') as ?participante)  ?nome where{
        c:${idConversa} c:pussuiParticipantes ?p .
        ?p c:nome ?nome .
    }
    `

    return Connection.makeQuery(query)
}


Conversa.getMensagensFromConversa = async function(idConversa){
    var query = `
    select (STRAFTER(STR(?mensagem), 'UMbook#') as ?idMensagem ) (STRAFTER(STR(?enviou), 'UMbook#') as ?remetente) ?texto ?dataEnvio where{
        c:${idConversa} c:pussuiMensagem ?mensagem .
        ?mensagem c:éEnviada ?enviou .
        ?mensagem c:conteudo ?texto .
        ?mensagem c:data ?dataEnvio .
    }
    `

    var conversa = await Connection.makeQuery(query)


    return conversa
}

Conversa.getMensagem = async function(idMensagem){
    var query = `
    select (STRAFTER(STR(?enviou), 'UMbook#') as ?remetente) ?texto ?dataEnvio{
        c:${idMensagem} c:éEnviada ?enviou .
        c:${idMensagem} c:conteudo ?texto .
        c:${idMensagem} c:data ?dataEnvio .
    }
    `

    return Connection.makeQuery(query)
}

Conversa.getConversasFromParticipante = async function(idParticipante){
    var iduser = idParticipante.replace(/@/,"\\@");

    var query = `
    select (STRAFTER(STR(?conversa), 'UMbook#') as ?idConversa) {
        c:${iduser} c:participa ?conversa .
    }
    `
    var ids = await Connection.makeQuery(query);
    var conversas = [];
    for (e in ids){
        var c = await Conversa.getMensagensFromConversa(ids[e].idConversa)
     //   console.log(c)
        var participantes = await Conversa.getParticipantesFromConversa(ids[e].idConversa)
      //  console.log(participantes)
        var aux = {idConversa: ids[e].idConversa, participantes:participantes ,mensagens:c}
        conversas.push(aux)
    }
    console.log("OWOW")
    return conversas
}


Conversa.insertConversa = async function(conversa){
    var id = nanoid.nanoid()
    var participantes = conversa.participantes
    let queryParticipantes = ""

    for(i = 0; i < participantes.length; i++){
        var iduser = participantes[i].replace(/@/,"\\@");
        queryParticipantes = queryParticipantes + `
        c:${id} c:pussuiParticipantes c:${iduser} .
        `
    }

    var query =  `
    insert data {
        c:${id} a owl:NamedIndividual ,
                        c:Conversa . 
    ` + queryParticipantes + '}'

    await Connection.makePost(query)

    return {"id" : id}
}

Conversa.insertMensagem = async function(idConversa, mensagem){
    var idMensagem = "m"+ nanoid.nanoid()
    var iduser = mensagem.idUtilizador.replace(/@/,"\\@");
    var data = new Date()

    var query =  `
    insert data {
        c:${idMensagem} a owl:NamedIndividual ,
                        c:Mensagem . 
        c:${idMensagem} c:éEnviada c:${iduser} .
        c:${idMensagem} c:conteudo "${mensagem.conteudo}" .
        c:${idMensagem} c:data "${data}" .
        c:${idConversa} c:pussuiMensagem c:${idMensagem} .
    }`

    await Connection.makePost(query)
    return {"id" : idMensagem}
}