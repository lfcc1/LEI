// --------------------------------------- Evento -----------------------------------------
var express = require('express');
var router = express.Router();

var host = require('../config/config').host
var apiEventos = host+"eventos/"
var axios = require('axios')
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
// ------------------------------------------------------ GET --------------------------------------------

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiEventos + "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



router.get('/:idEvento', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiEventos + req.params.idEvento + "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/parceria/:idParceria', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiEventos + "parceria/" + req.params.idParceria+ "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data) )
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/participante/:idParticipante', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiEventos + "participante/" + req.params.idParticipante + "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------ POST --------------------------------------------

router.post('/', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
    axios.post(apiEventos + "?token=" + req.query.token, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

module.exports = router;