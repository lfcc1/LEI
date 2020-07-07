const mongoose = require('mongoose')
var Schema = mongoose.Schema

var TokenSchema = new Schema({
    token: String,
    idUtilizador : String,
    estado : String
  })


module.exports = mongoose.model('refreshTokens', TokenSchema)
