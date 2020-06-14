var Evento = module.exports
var Connection = require('./connection')

var nanoid = require('nanoid')

Evento.getEventos = async function(){
    try{
        var query = `
        select (STRAFTER(STR(?evento), 'UMbook#') as ?idEvento) where{
            ?evento a c:Evento . 
            ?evento c:dataInicio ?dataInicio . 
        } ORDER BY DESC(?dataInicio)
        `

        var ids = await Connection.makeQuery(query)
        var eventos = []

        for(let i = 0; i < ids.length ; i++ ){
            var event = await Evento.getEvento(ids[i].idEvento)
            var evento = {
                idEvento : ids[i].idEvento,
                dados : event
            }
            eventos.push(evento)
        }

        return eventos
    }
    catch(e){
        throw e
    }
}

Evento.getEventosFromParceria = async function(idParceria){
    try{
        var query = `
        select (STRAFTER(STR(?evento), 'UMbook#') as ?idEvento) where{
            ?evento a c:Evento . 
            ?evento c:dataInicio ?dataInicio . 
            ?evento c:parceriaCom c:${idParceria} .
        } ORDER BY DESC(?dataInicio)
        `

        var ids = await Connection.makeQuery(query)
        var eventos = []

        for(let i = 0; i < ids.length ; i++ ){
            var event = await Evento.getEvento(ids[i].idEvento)
            var evento = {
                idEvento : ids[i].idEvento,
                dados : event
            }
            eventos.push(evento)
        }

        return eventos
    }
    catch(e){
        throw e
    }
}

Evento.getEventosFromParticipante = async function(idParticipante){
    try{
        var iduser = idParticipante.replace(/@/,"\\@");

        var query = `
        select (STRAFTER(STR(?evento), 'UMbook#') as ?idEvento) where{
            ?evento a c:Evento . 
            ?evento c:dataInicio ?dataInicio . 
            ?evento c:temPresenca c:${iduser} .
        } ORDER BY ASC(?dataInicio)
        `

        var ids = await Connection.makeQuery(query)
        var eventos = []

        for(let i = 0; i < ids.length ; i++ ){
            var event = await Evento.getEvento(ids[i].idEvento)
            var evento = {
                idEvento : ids[i].idEvento,
                dados : event
            }
            eventos.push(evento)
        }

        return eventos
    }
    catch(e){
        throw e
    }
}

Evento.getEvento = async function(idEvento){
    try{
        var info = await Evento.getEventoAtomica(idEvento)
        var participantes = await Evento.getParticipantesFromEvento(idEvento)
        var parcerias = await Evento.getParceriasFromEvento(idEvento)

        var evento = {
            info : info[0], 
            participantes : participantes,
            parcerias : parcerias
        }

        return evento
    }
    catch(e){
        throw e
    }

}



Evento.getEventoAtomica = async function(idEvento){
    var query = `
    select ?nome ?conteudo ?dataInicio ?dataFim where{
        c:${idEvento} c:nome ?nome .
        c:${idEvento} c:conteudo ?conteudo .
        c:${idEvento} c:dataInicio ?dataInicio .
        c:${idEvento} c:dataFim ?dataFim .
    } 
    `

    return Connection.makeQuery(query)
}

Evento.getParticipantesFromEvento = async function(idEvento){
    
    var query = `
    select (STRAFTER(STR(?utilizador), 'UMbook#') as ?idUtilizador) ?nome where{
        ?utilizador c:vai c:${idEvento} .
        ?utilizador c:nome ?nome .
    }
    `
    return Connection.makeQuery(query)
    
}

Evento.getParceriasFromEvento = async function(idEvento){
    var query = `
    select (STRAFTER(STR(?parceria), 'UMbook#') as ?idCurso) ?nome where{
        c:${idEvento} c:parceriaCom ?parceria .
        ?parceria c:nome ?nome .
    }
    `

    return Connection.makeQuery(query)

}



Evento.insertEvento = async function(evento){
    var id = 'ev' + nanoid.nanoid()
    var query = `
    insert data {
        c:${id} a owl:NamedIndividual ,
                        c:Evento .
        c:${id} c:nome "${evento.nome}" . 
        c:${id} c:conteudo "${evento.conteudo}" . 
        c:${id} c:dataInicio "${evento.dataInicio}" . 
        c:${id} c:dataFim "${evento.dataFim}" . 
    }
    `

    return Connection.makePost(query)

}