// --------------------------------------- Cadeira -----------------------------------------
var express = require('express');
var router = express.Router();
var host = require('../config/config').host
var apiCadeiras = host+"cadeiras/"
var axios = require('axios')
var passport = require('passport')


// ---------- ROTA   : /api/cadeiras ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a uma cadeira
router.get('/:idCadeira', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "?token=" + req.query.token)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os estudantes de uma determinada cadeira
  router.get('/:idCadeira/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/estudantes" + "?token=" + req.query.token)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os responsaveis de uma determinada cadeira
  router.get('/:idCadeira/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/responsaveis"+ "?token=" + req.query.token)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todas as publicações de uma determinada cadeira
  router.get('/:idCadeira/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/publicacoes" + "?token=" + req.query.token)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 router.get('/:idCadeira/ficheiros', passport.authenticate('jwt', {session: false}), function(req, res, next){
     axios.get(apiCadeiras + req.params.idCadeira + "/ficheiros" + "?token=" + req.query.token)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
   })

 // -------------------------------------------------------------- POST ---------------------------------------------------------------------

 router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.post(apiCadeiras + "?token=" + req.query.token, req.body)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 // -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

 router.delete('/:idCadeira', passport.authenticate('jwt', {session: false}), function(req, res, next){
   axios.delete(apiCadeiras + req.params.idCadeira + "?token=" + req.query.token)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

  module.exports = router;