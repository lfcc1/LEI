var RefreshToken = require('../models/refreshToken')

const RefreshTokens = module.exports

RefreshTokens.listar= () =>{
  return RefreshToken.find().exec()
}

RefreshTokens.findUserTokenAtivo = (id) => {
  return RefreshToken
          .findOne({idUtilizador : id, estado: "Ativo"})
          .exec()
}

RefreshTokens.createToken = (refreshToken) => {
  var newToken = new RefreshToken(refreshToken)
  return newToken.save()
}
