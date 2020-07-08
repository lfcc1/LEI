// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var Utilizador = require('../controllers/utilizador')
var passport = require('passport')


function getPermissao(acess,utilizador){
  var result= false
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

// ---------- ROTA   : /api/utilizadores ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next){
  Utilizador.getUtilizadores()
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// Toda a informação relativa a um utilizador
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Utilizador.getUtilizador(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/search/:nome', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Utilizador.searchUser(req.params.nome)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/:id/pedidosAmizade', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Utilizador.getPedidos(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

router.get('/:id/eventos', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Utilizador.getEventos(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  router.get('/:id/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Utilizador.getPublicacoesFromUtilizador(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  

// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

router.put('/evento', passport.authenticate('jwt', {session: false}), function(req, res, next){
  Utilizador.adicionarEvento(req.body.idUtilizador, req.body.idEvento)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador', passport.authenticate('jwt', {session: false}), function(req, res, next){
  Utilizador.updateUtilizador(req.params.idUtilizador, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idUtilizador/amigo', passport.authenticate('jwt', {session: false}), function(req, res, next){
  Utilizador.adicionarAmigo(req.params.idUtilizador, req.body.idAmigo)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



// -------------------------------------------------------------- POST ---------------------------------------------------------------------

// Insere um novo utilizador
router.post('/', function(req, res, next){
  Utilizador.insertUtilizador(req.body)
    .then(dados =>{ 
      res.jsonp(dados)
    })
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/pedidosamizade/:idUtilizador', passport.authenticate('jwt', {session: false}), function(req, res){
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

router.delete('/:idUtilizador', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res, next){
  Utilizador.deleteUser(req.params.idUtilizador)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/amigos/:id1/:id2', passport.authenticate('jwt', {session: false}), function(req, res, next){
  Utilizador.removerAmigo(req.params.id1, req.params.id2)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/pedidosamizade/:idUtilizador1/:idUtilizador2', passport.authenticate('jwt', {session: false}), function(req, res){
  console.log(req.body)
  Utilizador.rejeitaPedido(req.params.idUtilizador1, req.params.idUtilizador2)
            .then(dados => res.jsonp(dados))
            .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;