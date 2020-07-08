module.exports.host = "http://umbook-apidados:3050/api/"
module.exports.hostChat = "http://umbook-apichat:3051/api/"

var jwt = require('jsonwebtoken')

const jwtKey = "LEI-UMbook"
const jwtExpirySeconds = 60 * 60

module.exports.generateToken = function(user){

    const token = jwt.sign({ user }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
    })
    
    return token
}