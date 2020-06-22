const mongoose = require('mongoose')
var Schema = mongoose.Schema

var participante = new Schema({
    nome: String,
    idUtilizador : String
  })

var conversaSchema = new Schema({
  participantes : [participante],
  ativo: Boolean,
  visto: Boolean,
  mensagens:[],
})

module.exports = mongoose.model('conversas', conversaSchema)
