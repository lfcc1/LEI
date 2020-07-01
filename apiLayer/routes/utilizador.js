// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var config = require('../config/config')

var host = config.host
var apiUtilizadores = host+"utilizadores/"
var axios = require('axios')
var passport = require('passport')

// ---------- ROTA   : /api/utilizadores ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.get(apiUtilizadores + "?token=" + req.query.token)
      .then(dados =>{ res.jsonp(dados.data)})
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// Toda a informação relativa a um utilizador
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.get(apiUtilizadores + req.params.id + "?token=" + req.query.token)
      .then(dados =>{ res.jsonp(dados.data)})
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/search/:nome', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiUtilizadores + "search/" + req.params.nome + "?token=" + req.query.token)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/pedidosAmizade', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.get(apiUtilizadores + req.params.id + "/pedidosAmizade" + "?token=" + req.query.token)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/eventos', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.get(apiUtilizadores + req.params.id + "/eventos" + "?token=" + req.query.token)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  router.get('/:id/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiUtilizadores + req.params.id + "/publicacoes" + "?token=" + req.query.token)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
    })

// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

router.put('/evento', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.put(apiUtilizadores + "evento" + "?token=" + req.query.token, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.put(apiUtilizadores + req.params.idUtilizador + "?token=" + req.query.token, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador/amigo', passport.authenticate('jwt', {session: false}), function(req, res, next){
  console.log(req.params.idUtilizador)
  axios.put(apiUtilizadores + req.params.idUtilizador + "/amigo"+ "?token=" + req.query.token, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



// -------------------------------------------------------------- POST ---------------------------------------------------------------------

// Insere um novo utilizador
router.post('/', function(req, res, next){
  axios.post(apiUtilizadores, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/pedidosamizade/:idUtilizador', passport.authenticate('jwt', {session: false}), function(req, res){
  axios.post(apiUtilizadores + "pedidosamizade/" + req.params.idUtilizador + "?token=" + req.query.token, req.body)
            .then(dados => res.jsonp(dados.data))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

router.post('/login', function(req, res){
  axios.post(apiUtilizadores + "login", req.body)
            .then(async dados => { 
              var response = dados.data
              if(dados.data.authentication == true){
                response.token = await config.generateToken(response)
              }
              res.jsonp(response)
            })
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idUtilizador', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.delete(apiUtilizadores + req.params.idUtilizador + "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/amigos/:id1/:id2', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.delete(apiUtilizadores + "amigos/" + req.params.id1 + "/" + req.params.id2 + "?token=" + req.query.token)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/pedidosamizade/:idUtilizador1/:idUtilizador2', passport.authenticate('jwt', {session: false}), function(req, res){
  axios.delete(apiUtilizadores + "pedidosamizade/" + req.params.idUtilizador1 + "/" + req.params.idUtilizador2 + "?token=" + req.query.token)
            .then(dados => res.jsonp(dados.data))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;