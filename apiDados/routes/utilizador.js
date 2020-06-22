// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var Utilizador = require('../controllers/utilizador')


// ---------- ROTA   : /api/utilizadores ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um utilizador
router.get('/:id', function(req, res, next){
    Utilizador.getUtilizador(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/pedidosAmizade', function(req, res, next){
    Utilizador.getPedidos(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/eventos', function(req, res, next){
    Utilizador.getEventos(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  

// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

router.put('/evento', function(req, res, next){
  Utilizador.adicionarEvento(req.body.idUtilizador, req.body.idEvento)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador', function(req, res, next){
  Utilizador.updateUtilizador(req.params.idUtilizador, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador/amigo', function(req, res, next){
  Utilizador.adicionarAmigo(req.params.idUtilizador, req.body.idAmigo)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



// -------------------------------------------------------------- POST ---------------------------------------------------------------------

// Insere um novo utilizador
router.post('/', function(req, res, next){
  Utilizador.insertUtilizador(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/pedidosamizade/:idUtilizador', function(req, res){
  Utilizador.fazPedidoAmizade(req.params.idUtilizador, req.body.idUtilizador2)
            .then(dados => res.jsonp(dados))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

router.post('/login', function(req, res){
  Utilizador.login(req.body)
            .then(dados => res.jsonp(dados))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/amigos/:id1/:id2', function(req, res, next){
  Utilizador.removeAmizade(req.params.id1, req.params.id2)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/pedidosamizade/:idUtilizador1/:idUtilizador2', function(req, res){
  console.log(req.body)
  Utilizador.rejeitaPedido(req.params.idUtilizador1, req.params.idUtilizador2)
            .then(dados => res.jsonp(dados))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;