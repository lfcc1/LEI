var Conversa = require('../models/conversas')

const Conversas = module.exports

Conversas.listar = () => {
    return Conversa
            .find()
            .exec()
}
    
Conversas.findByParticipante = (participante) => {
    return Conversa
            .find({ "participantes.idUtilizador": { $in: [ participante ] } })
            .exec()
}

Conversas.findByParticipanteSimple = (participante) => {
    return Conversa
            .find({ $and:[{participantes:{ $size: 2 }},{"participantes": { $in: [ participante ] }}] })
            .exec()
}

Conversas.addParticipante = (idC, email) => {
    return Conversa.update({ "_id" : idC }, { $push: { participantes: email } })
            .exec()
}

Conversas.removeParticipante = (idC, email) => {
    return Conversa.update(
        { "_id" : idC},
        { $pull: { "participantes" : email } },
        { multi: true }
    )
            .exec()
}

Conversas.iniciarConversa = async function (dados) {
    var result = await Conversa.find({ $and:[{"participantes.idUtilizador": { $in: [ dados.participantes[0].idUtilizador] }},{"participantes.idUtilizador": { $in: [ dados.participantes[1].idUtilizador]}}] })
    .exec()
    if(result.length == 0){
    var conversa = new Conversa(dados)
    return conversa.save()
    }
    return result[0];
}  

