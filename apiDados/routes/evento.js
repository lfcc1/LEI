// --------------------------------------- Evento -----------------------------------------
var express = require('express');
var router = express.Router();

var Evento = require('../controllers/evento')
var passport = require('passport')

function getPermissao(acess,utilizador){
  var result= false
  console.log(utilizador.tipos)
  utilizador.tipos.forEach(element => {
    if(element.classe == acess)
      result = true
  })
  return result;
}

function verifyAcess(acess){
  return  function(req, res, next) {
    var u = req.user.user
    var x = getPermissao(acess,u)
    if(x){
      next()
  }
  else{
    console.log("Não tem permissão")
    res.status(403).jsonp("Não tem permissão")
  }
  }
}

// ---------- ROTA   : /api/eventos ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
    Evento.getEventos()
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



router.get('/:idEvento', passport.authenticate('jwt', {session: false}), function(req, res){
    Evento.getEvento(req.params.idEvento)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/parceria/:idParceria', passport.authenticate('jwt', {session: false}), function(req, res){
    Evento.getEventosFromParceria(req.params.idParceria)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/participante/:idParticipante', passport.authenticate('jwt', {session: false}), function(req, res){
    Evento.getEventosFromParticipante(req.params.idParticipante)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------ POST --------------------------------------------

router.post('/', passport.authenticate('jwt', {session: false}),  verifyAcess("Admin"), function(req, res){
    Evento.insertEvento(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

module.exports = router;