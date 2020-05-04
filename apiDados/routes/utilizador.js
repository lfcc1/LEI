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
  


// -------------------------------------------------------------- POST ---------------------------------------------------------------------

// Insere um novo utilizador
router.post('/', function(req, res, next){
  Utilizador.insertUtilizador(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


  module.exports = router;