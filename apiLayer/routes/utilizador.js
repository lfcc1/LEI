// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var host = require('../config/config').host
var apiUtilizadores = host+"utilizadores/"
var axios = require('axios')


// ---------- ROTA   : /api/utilizadores ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/', function(req, res, next){
  axios.get(apiUtilizadores)
      .then(dados =>{ res.jsonp(dados.data)})
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// Toda a informação relativa a um utilizador
router.get('/:id', function(req, res, next){
  axios.get(apiUtilizadores + req.params.id)
      .then(dados =>{ res.jsonp(dados.data)})
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/pedidosAmizade', function(req, res, next){
  axios.get(apiUtilizadores + req.params.id + "/pedidosAmizade")
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/eventos', function(req, res, next){
  axios.get(apiUtilizadores + req.params.id + "/eventos")
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  

// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

router.put('/evento', function(req, res, next){
  axios.put(apiUtilizadores + "evento" , req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador', function(req, res, next){
  axios.put(apiUtilizadores + req.params.idUtilizador, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador/amigo', function(req, res, next){
  console.log(req.params.idUtilizador)
  axios.put(apiUtilizadores + req.params.idUtilizador + "/amigo", req.body)
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

router.post('/pedidosamizade/:idUtilizador', function(req, res){
  axios.post(apiUtilizadores + "pedidosamizade/" + req.params.idUtilizador, req.body)
            .then(dados => res.jsonp(dados.data))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

router.post('/login', function(req, res){
  axios.post(apiUtilizadores + "login", req.body)
            .then(dados => res.jsonp(dados.data))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idUtilizador', function(req, res, next){
  axios.delete(apiUtilizadores + req.params.idUtilizador)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/amigos/:id1/:id2', function(req, res, next){
  axios.delete(apiUtilizadores + "amigos/" + req.params.id1 + "/" + req.params.id2)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/pedidosamizade/:idUtilizador1/:idUtilizador2', function(req, res){
  axios.delete(apiUtilizadores + "pedidosamizade/" + req.params.idUtilizador1 + "/" + req.params.idUtilizador2)
            .then(dados => res.jsonp(dados.data))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;