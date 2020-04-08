var Conversa = module.exports
var Connection = require('./connection')

Conversa.getConversa = async function(idConversa){
    var info = await Conversa.getConversaAtomica(idConversa)
    var mensagens = await Conversa.getMensagens(idConversa)
    
    var conversa = {
        info : info,
        mensagens : mensagens
    }

    return conversa
}

Conversa.getConversaAtomica = async function(idConversa){
    var query = `
    
    `

    return Connection.makeQuery(query)
}

Conversas.getMensagens = async function(idConversa){
    var query = `
    
    `

    return Connection.makeQuery(query)
}

Conversas.getConversasFromParticipante = async function(idParticipante){
    var query = `
    
    `

    return Connection.makeQuery(query)
}