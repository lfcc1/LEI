module.exports.host = "http://localhost:3050/api/"
module.exports.hostChat = "http://localhost:3051/api/"

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